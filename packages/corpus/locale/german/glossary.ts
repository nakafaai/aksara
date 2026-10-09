import { compareCodeUnits } from "@nakafa/aksara-contracts/text/order";
import { isHttpsUrl, isLowerKebab } from "@nakafa/aksara-contracts/text/syntax";
import { Array as Arr, Effect, Option, Order, Schema } from "effect";

import { germanEducationGlossarySource } from "#corpus/locale/german/education";
import { germanProductGlossarySource } from "#corpus/locale/german/product";
import { PublicRouteSegmentSchema } from "#corpus/route/schema";

export const GermanGlossaryKeySchema = Schema.String.pipe(
  Schema.check(Schema.makeFilter(isLowerKebab)),
  Schema.brand("@NakafaAI/AksaraGermanGlossaryKey")
);

const GermanGlossaryScopeSchema = Schema.Literals([
  "accessibility",
  "account",
  "billing",
  "education",
  "exam",
  "mathematics",
  "navigation",
  "quran",
  "science",
]);

/** One evidence-backed German product term and its exact usage boundary. */
const GermanGlossaryEntrySchema = Schema.Struct({
  key: GermanGlossaryKeySchema,
  note: Schema.optional(Schema.Trimmed.check(Schema.isNonEmpty())),
  preferred: Schema.Trimmed.check(Schema.isNonEmpty()),
  routeSlug: Schema.optional(PublicRouteSegmentSchema),
  scope: GermanGlossaryScopeSchema,
  sourceUrl: Schema.String.pipe(Schema.check(Schema.makeFilter(isHttpsUrl))),
});
type GermanGlossaryEntry = typeof GermanGlossaryEntrySchema.Type;

/** Glossary entries must stay unique and canonical for stable review evidence. */
function hasCanonicalKeys(entries: readonly GermanGlossaryEntry[]) {
  return Arr.every(entries, (entry, index) => {
    const previous = entries[index - 1];
    return (
      previous === undefined || compareCodeUnits(previous.key, entry.key) < 0
    );
  });
}

const GermanGlossarySchema = Schema.NonEmptyArray(
  GermanGlossaryEntrySchema
).pipe(
  Schema.check(
    Schema.makeFilter(hasCanonicalKeys, {
      message: "German glossary keys must be unique and canonical.",
    })
  )
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
    input: unknown = Arr.sortWith(
      [...germanEducationGlossarySource, ...germanProductGlossarySource],
      (entry) => entry.key,
      Order.String
    )
  ) =>
    Schema.decodeUnknownEffect(GermanGlossarySchema)(input, {
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
  const entry = Arr.findFirst(glossary, (candidate) => candidate.key === key);
  if (Option.isNone(entry)) {
    return yield* new GermanGlossaryTermError({ key });
  }
  return entry.value;
});
