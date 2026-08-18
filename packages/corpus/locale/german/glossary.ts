import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { compareCodeUnits } from "@nakafa/aksara-contracts/text/order";
import { isHttpsUrl, isLowerKebab } from "@nakafa/aksara-contracts/text/syntax";
import { Effect, Schema } from "effect";

import { germanEducationGlossarySource } from "#corpus/locale/german/education";
import { germanProductGlossarySource } from "#corpus/locale/german/product";
import { PublicRouteSegmentSchema } from "#corpus/route/schema";

/** Exact authored glossary sources bound into every German review record. */
export const GERMAN_GLOSSARY_SOURCE_PATHS = Object.freeze([
  CorpusSourcePathSchema.make("packages/corpus/locale/german/education.ts"),
  CorpusSourcePathSchema.make("packages/corpus/locale/german/product.ts"),
]);

export const GermanGlossaryKeySchema = Schema.String.pipe(
  Schema.filter(isLowerKebab),
  Schema.brand("@NakafaAI/AksaraGermanGlossaryKey")
);

const GermanGlossaryScopeSchema = Schema.Literal(
  "accessibility",
  "account",
  "billing",
  "education",
  "exam",
  "mathematics",
  "navigation",
  "quran",
  "science"
);

/** One evidence-backed German product term and its exact usage boundary. */
export const GermanGlossaryEntrySchema = Schema.Struct({
  key: GermanGlossaryKeySchema,
  note: Schema.optional(Schema.NonEmptyTrimmedString),
  preferred: Schema.NonEmptyTrimmedString,
  routeSlug: Schema.optional(PublicRouteSegmentSchema),
  scope: GermanGlossaryScopeSchema,
  sourceUrl: Schema.String.pipe(Schema.filter(isHttpsUrl)),
});
export type GermanGlossaryEntry = typeof GermanGlossaryEntrySchema.Type;

/** Glossary entries must stay unique and canonical for stable review evidence. */
function hasCanonicalKeys(entries: readonly GermanGlossaryEntry[]) {
  return entries.every((entry, index) => {
    const previous = entries[index - 1];
    return (
      previous === undefined || compareCodeUnits(previous.key, entry.key) < 0
    );
  });
}

const GermanGlossarySchema = Schema.NonEmptyArray(
  GermanGlossaryEntrySchema
).pipe(
  Schema.filter(hasCanonicalKeys, {
    message: () => "German glossary keys must be unique and canonical.",
  })
);

/** The source-controlled German terminology glossary is invalid. */
export class GermanGlossaryError extends Schema.TaggedError<GermanGlossaryError>()(
  "GermanGlossaryError",
  { cause: Schema.Unknown }
) {}

/** Decodes the reviewed German terminology sources of truth. */
export const decodeGermanGlossary = Effect.fn(
  "AksaraCorpus.decodeGermanGlossary"
)(
  (
    input: unknown = [
      ...germanEducationGlossarySource,
      ...germanProductGlossarySource,
    ].sort((left, right) => compareCodeUnits(left.key, right.key))
  ) =>
    Schema.decodeUnknown(GermanGlossarySchema)(input, {
      onExcessProperty: "error",
    }).pipe(Effect.mapError((cause) => new GermanGlossaryError({ cause })))
);

/** One required glossary term is absent from the reviewed source. */
export class GermanGlossaryTermError extends Schema.TaggedError<GermanGlossaryTermError>()(
  "GermanGlossaryTermError",
  { key: GermanGlossaryKeySchema }
) {}

/** Resolves one reviewed term without guessing or manufacturing a translation. */
export const requireGermanGlossaryTerm = Effect.fn(
  "AksaraCorpus.requireGermanGlossaryTerm"
)(function* (key: typeof GermanGlossaryKeySchema.Type) {
  const glossary = yield* decodeGermanGlossary();
  const entry = glossary.find((candidate) => candidate.key === key);
  if (entry === undefined) {
    return yield* new GermanGlossaryTermError({ key });
  }
  return entry;
});
