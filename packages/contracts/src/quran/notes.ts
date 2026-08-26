import { Effect, Schema } from "effect";

import { QuranMeaningfulTextSchema } from "#contracts/quran/text";

const QuranTranslationNoteNumberSchema = Schema.Int.pipe(
  Schema.check(Schema.isGreaterThan(0))
);
const QuranTranslationOffsetSchema = Schema.Int.pipe(
  Schema.check(Schema.isGreaterThanOrEqualTo(0))
);

const QuranTranslationSegmentSchema = Schema.Union([
  Schema.Struct({
    kind: Schema.Literal("text"),
    offset: QuranTranslationOffsetSchema,
    value: Schema.String,
  }),
  Schema.Struct({
    kind: Schema.Literal("note"),
    number: QuranTranslationNoteNumberSchema,
    offset: QuranTranslationOffsetSchema,
  }),
]);

const QuranTranslationNoteSchema = Schema.Struct({
  number: QuranTranslationNoteNumberSchema,
  referenceOffset: QuranTranslationOffsetSchema,
  text: Schema.String,
});

/** Semantic translation text and its exact source-authored notes. */
export const QuranTranslationDocumentSchema = Schema.Struct({
  notes: Schema.Array(QuranTranslationNoteSchema),
  segments: Schema.Array(QuranTranslationSegmentSchema),
});
export type QuranTranslationDocument =
  typeof QuranTranslationDocumentSchema.Type;

/** The translation and note markers do not form one exact projection. */
export class QuranTranslationNotesError extends Schema.TaggedError<QuranTranslationNotesError>()(
  "QuranTranslationNotesError",
  {
    reason: Schema.Literals([
      "empty-note",
      "invalid-marker",
      "invalid-source",
      "mismatched-markers",
    ]),
  }
) {}

interface Marker {
  readonly end: number;
  readonly number: number;
  readonly start: number;
}

type TranslationAnalysis =
  | {
      readonly _tag: "Failure";
      readonly reason: QuranTranslationNotesError["reason"];
    }
  | {
      readonly _tag: "Success";
      readonly document: QuranTranslationDocument;
    };

const QuranTranslationSourceSchema = Schema.Struct({
  footnotes: Schema.String,
  text: QuranMeaningfulTextSchema,
});
type QuranTranslationSource = typeof QuranTranslationSourceSchema.Type;

/** Reads every numeric marker without treating editorial brackets as notes. */
function readMarkers(
  source: string
):
  | { readonly _tag: "Failure" }
  | { readonly _tag: "Success"; readonly markers: readonly Marker[] } {
  const markers: Marker[] = [];
  for (const match of source.matchAll(/\[(\d+)\]/gu)) {
    const rawNumber = match[0].slice(1, -1);
    const start = match.index;
    const number = Number(rawNumber);
    if (
      rawNumber !== String(number) ||
      !Schema.is(QuranTranslationNoteNumberSchema)(number)
    ) {
      return { _tag: "Failure" };
    }
    markers.push({ end: start + match[0].length, number, start });
  }
  return { _tag: "Success", markers };
}

/** Converts the translation body to text and note-reference segments. */
function segmentTranslation(source: string, markers: readonly Marker[]) {
  const segments: QuranTranslationDocument["segments"][number][] = [];
  let start = 0;
  for (const marker of markers) {
    if (marker.start > start) {
      segments.push({
        kind: "text",
        offset: start,
        value: source.slice(start, marker.start),
      });
    }
    segments.push({
      kind: "note",
      number: marker.number,
      offset: marker.start,
    });
    start = marker.end;
  }
  if (start < source.length || segments.length === 0) {
    segments.push({ kind: "text", offset: start, value: source.slice(start) });
  }
  return segments;
}

/** Analyzes one source translation through the canonical note grammar. */
function analyzeTranslation(
  source: QuranTranslationSource
): TranslationAnalysis {
  const referencesResult = readMarkers(source.text);
  const definitionsResult = readMarkers(source.footnotes);
  if (
    referencesResult._tag === "Failure" ||
    definitionsResult._tag === "Failure"
  ) {
    return { _tag: "Failure", reason: "invalid-marker" };
  }

  const references = referencesResult.markers;
  const definitions = definitionsResult.markers;
  const uniqueReferences = references.filter(
    (reference, index) =>
      references.findIndex(({ number }) => number === reference.number) ===
      index
  );
  const noteCandidates = definitions.map((definition, index) => ({
    definition,
    referenceOffset: uniqueReferences[index]?.start ?? -1,
  }));
  const definitionNumbers = definitions.map(({ number }) => number);
  const hasDuplicateDefinition = definitionNumbers.some(
    (number, index) => definitionNumbers.indexOf(number) !== index
  );
  const hasMismatchedMarkers =
    hasDuplicateDefinition ||
    uniqueReferences.length !== definitionNumbers.length ||
    noteCandidates.some(
      ({ definition, referenceOffset }, index) =>
        referenceOffset < 0 ||
        definition.number !== uniqueReferences[index]?.number
    ) ||
    (definitions[0] === undefined
      ? source.footnotes.trim().length > 0
      : source.footnotes.slice(0, definitions[0].start).trim().length > 0);
  if (hasMismatchedMarkers) {
    return { _tag: "Failure", reason: "mismatched-markers" };
  }

  const notes = noteCandidates.map(
    ({ definition, referenceOffset }, index) => ({
      number: definition.number,
      referenceOffset,
      text: source.footnotes
        .slice(definition.end, definitions[index + 1]?.start)
        .trim(),
    })
  );
  if (notes.some(({ text }) => text.length === 0)) {
    return { _tag: "Failure", reason: "empty-note" };
  }

  return {
    _tag: "Success",
    document: QuranTranslationDocumentSchema.make({
      notes,
      segments: segmentTranslation(source.text, references),
    }),
  };
}

/** Checks that every source marker resolves to one exact non-empty note. */
export function hasConsistentQuranTranslationNotes(
  source: QuranTranslationSource
) {
  return analyzeTranslation(source)._tag === "Success";
}

/** One verbatim QuranEnc translation with a consistent note relationship. */
export const QuranTranslationSchema = QuranTranslationSourceSchema.pipe(
  Schema.check(
    Schema.makeFilter(hasConsistentQuranTranslationNotes, {
      message:
        "Quran translation markers must resolve to exact non-empty source notes.",
    })
  )
);
export type QuranTranslation = typeof QuranTranslationSchema.Type;

/** Parses one exact source translation into linked reference-ready semantics. */
export const parseQuranTranslation = Effect.fn(
  "AksaraContracts.parseQuranTranslation"
)(function* (input: unknown) {
  const source = yield* Schema.decodeUnknownEffect(
    QuranTranslationSourceSchema
  )(input, { onExcessProperty: "error" }).pipe(
    Effect.mapError(
      () => new QuranTranslationNotesError({ reason: "invalid-source" })
    )
  );
  const result = analyzeTranslation(source);
  if (result._tag === "Failure") {
    return yield* new QuranTranslationNotesError({ reason: result.reason });
  }
  return result.document;
});
