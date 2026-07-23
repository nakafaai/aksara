import { ContentLocaleSchema } from "@nakafa/aksara-contracts/content";
import { Effect, Schema } from "effect";

import {
  PublicRouteSegmentSchema,
  PublicRouteSlugMapSchema,
} from "#corpus/route/schema";

const TRYOUT_KEY_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;
const COUNTRY_CODE_PATTERN = /^[A-Z]{2}$/u;
const TRYOUT_SOURCE_PATH_PATTERN =
  /^question-bank\/tryout\/[a-z0-9]+(?:-[a-z0-9]+)*\/[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/u;
const DEFAULT_SECTION_VISIBILITY = "visible";

const TryoutKeySchema = Schema.String.pipe(
  Schema.pattern(TRYOUT_KEY_PATTERN, {
    description: "Lowercase kebab-case try-out source key.",
    identifier: "TryoutKey",
    message: () => "Invalid try-out key.",
  })
);

const CountryCodeSchema = Schema.String.pipe(
  Schema.pattern(COUNTRY_CODE_PATTERN, {
    description: "Uppercase ISO 3166-1 alpha-2 country code.",
    identifier: "CountryCode",
    message: () => "Invalid country code.",
  })
);

const TryoutSourcePathSchema = Schema.String.pipe(
  Schema.pattern(TRYOUT_SOURCE_PATH_PATTERN, {
    description: "Question source path rooted at question-bank/tryout.",
    identifier: "TryoutSourcePath",
    message: () => "Invalid try-out question source path.",
  })
);

const TryoutTranslationMapSchema = Schema.Record({
  key: ContentLocaleSchema,
  value: Schema.Struct({
    description: Schema.optional(Schema.String),
    title: Schema.String,
  }),
});

const TryoutSectionVisibilitySchema = Schema.Literal(
  "internal-entry",
  DEFAULT_SECTION_VISIBILITY
);
type TryoutSectionVisibility = typeof TryoutSectionVisibilitySchema.Type;

const TryoutSectionSourceSchema = Schema.Struct({
  key: TryoutKeySchema,
  order: Schema.Int.pipe(Schema.positive()),
  questionCount: Schema.Int.pipe(Schema.positive()),
  questionSourcePath: TryoutSourcePathSchema,
  routeSlugs: PublicRouteSlugMapSchema,
  timeLimitSeconds: Schema.Int.pipe(Schema.positive()),
  translations: TryoutTranslationMapSchema,
  visibility: Schema.optionalWith(TryoutSectionVisibilitySchema, {
    default: () => DEFAULT_SECTION_VISIBILITY,
  }),
});

/** Requires visible sections or one direct-entry section in a try-out set. */
function hasReachableTryoutSections(source: {
  readonly sections: readonly {
    readonly visibility: TryoutSectionVisibility;
  }[];
}): boolean {
  const internalEntryCount = source.sections.filter(
    (section) => section.visibility === "internal-entry"
  ).length;
  if (internalEntryCount === 0) {
    return true;
  }
  return internalEntryCount === 1 && source.sections.length === 1;
}

const TryoutSetSourceSchema = Schema.Struct({
  key: TryoutKeySchema,
  order: Schema.Int.pipe(Schema.positive()),
  routeSlugs: PublicRouteSlugMapSchema,
  sections: Schema.Array(TryoutSectionSourceSchema),
  translations: TryoutTranslationMapSchema,
}).pipe(
  Schema.filter(hasReachableTryoutSections, {
    message: () =>
      "Internal-entry try-out sections must be the only section in a set.",
  })
);

const TryoutTrackSourceSchema = Schema.Struct({
  key: TryoutKeySchema,
  kind: Schema.Literal("subject", "year"),
  order: Schema.Int.pipe(Schema.positive()),
  routeSlugs: PublicRouteSlugMapSchema,
  sets: Schema.Array(TryoutSetSourceSchema),
  translations: TryoutTranslationMapSchema,
});

/** Complete authoring contract for one imported try-out exam source. */
export const TryoutExamSourceSchema = Schema.Struct({
  countryCode: CountryCodeSchema,
  countryKey: TryoutKeySchema,
  countryRouteSlugs: PublicRouteSlugMapSchema,
  countryTranslations: TryoutTranslationMapSchema,
  examKey: TryoutKeySchema,
  examRouteSlugs: PublicRouteSlugMapSchema,
  examTranslations: TryoutTranslationMapSchema,
  scoringStrategy: Schema.Literal("irt", "raw"),
  sourceRevision: PublicRouteSegmentSchema,
  tracks: Schema.Array(TryoutTrackSourceSchema),
});
type TryoutExamSourceInput = typeof TryoutExamSourceSchema.Encoded;

/** One authored try-out catalog failed strict schema decoding. */
export class TryoutDecodeError extends Schema.TaggedError<TryoutDecodeError>()(
  "TryoutDecodeError",
  { cause: Schema.Unknown, message: Schema.NonEmptyTrimmedString }
) {}

/** One authored try-out scope contains the same stable key twice. */
export class TryoutDuplicateError extends Schema.TaggedError<TryoutDuplicateError>()(
  "TryoutDuplicateError",
  {
    key: TryoutKeySchema,
    scope: Schema.NonEmptyTrimmedString,
  }
) {}

/** Returns the first duplicated key in one ordered authored scope. */
function findDuplicateKey(
  entries: readonly { readonly key: string }[]
): string | undefined {
  const keys = new Set<string>();
  for (const entry of entries) {
    if (keys.has(entry.key)) {
      return entry.key;
    }
    keys.add(entry.key);
  }
}

/** Rejects duplicate stable keys within one authored try-out scope. */
function validateUniqueKeys(
  entries: readonly { readonly key: string }[],
  scope: string
) {
  const duplicate = findDuplicateKey(entries);
  if (duplicate === undefined) {
    return Effect.void;
  }
  return new TryoutDuplicateError({ key: duplicate, scope });
}

/** Strictly decodes one authored try-out exam and validates stable identities. */
export const defineTryoutExamSource = Effect.fn(
  "AksaraCorpus.defineTryoutExamSource"
)(function* (input: TryoutExamSourceInput) {
  const source = yield* Schema.decodeUnknown(TryoutExamSourceSchema)(input, {
    onExcessProperty: "error",
  }).pipe(
    Effect.mapError(
      (cause) =>
        new TryoutDecodeError({
          cause,
          message: "Try-out source decoding failed.",
        })
    )
  );
  yield* validateUniqueKeys(source.tracks, `${source.examKey}:tracks`);
  for (const track of source.tracks) {
    yield* validateUniqueKeys(
      track.sets,
      `${source.examKey}:${track.key}:sets`
    );
    for (const set of track.sets) {
      yield* validateUniqueKeys(
        set.sections,
        `${source.examKey}:${track.key}:${set.key}:sections`
      );
    }
  }
  return source;
});
