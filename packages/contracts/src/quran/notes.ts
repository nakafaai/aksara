import { Array as Arr, Effect, MutableList, Option, Schema } from "effect";

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

const MarkerSchema = Schema.Struct({
  end: Schema.Finite,
  number: Schema.Finite,
  start: Schema.Finite,
});
type Marker = typeof MarkerSchema.Type;

const TranslationAnalysisSchema = Schema.Union([
  Schema.TaggedStruct("Failure", {
    reason: QuranTranslationNotesError.fields.reason,
  }),
  Schema.TaggedStruct("Success", {
    document: QuranTranslationDocumentSchema,
  }),
]);
type TranslationAnalysis = typeof TranslationAnalysisSchema.Type;

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
  const markers = MutableList.make<Marker>();
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
    MutableList.append(markers, {
      end: start + match[0].length,
      number,
      start,
    });
  }
  return { _tag: "Success", markers: MutableList.toArray(markers) };
}

/** Converts the translation body to text and note-reference segments. */
function segmentTranslation(source: string, markers: readonly Marker[]) {
  const segments =
    MutableList.make<QuranTranslationDocument["segments"][number]>();
  let start = 0;
  for (const marker of markers) {
    if (marker.start > start) {
      MutableList.append(segments, {
        kind: "text",
        offset: start,
        value: source.slice(start, marker.start),
      });
    }
    MutableList.append(segments, {
      kind: "note",
      number: marker.number,
      offset: marker.start,
    });
    start = marker.end;
  }
  if (start < source.length || segments.length === 0) {
    MutableList.append(segments, {
      kind: "text",
      offset: start,
      value: source.slice(start),
    });
  }
  return MutableList.toArray(segments);
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
  const uniqueReferences = Arr.filter(references, (reference, index) =>
    Option.contains(
      Arr.findFirstIndex(
        references,
        ({ number }) => number === reference.number
      ),
      index
    )
  );
  const noteCandidates = Arr.map(definitions, (definition, index) => ({
    definition,
    referenceOffset: uniqueReferences[index]?.start ?? -1,
  }));
  const definitionNumbers = Arr.map(definitions, ({ number }) => number);
  const hasDuplicateDefinition = Arr.some(
    definitionNumbers,
    (number, index) =>
      Option.getOrUndefined(
        Arr.findFirstIndex(definitionNumbers, (value) => value === number)
      ) !== index
  );
  const hasMismatchedMarkers =
    hasDuplicateDefinition ||
    uniqueReferences.length !== definitionNumbers.length ||
    Arr.some(
      noteCandidates,
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

  const notes = Arr.map(
    noteCandidates,
    ({ definition, referenceOffset }, index) => ({
      number: definition.number,
      referenceOffset,
      text: source.footnotes
        .slice(definition.end, definitions[index + 1]?.start)
        .trim(),
    })
  );
  if (Arr.some(notes, ({ text }) => text.length === 0)) {
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
