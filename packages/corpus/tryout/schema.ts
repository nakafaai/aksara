import { ContentLocaleSchema } from "@nakafa/aksara-contracts/content";
import {
  TryoutCountryCodeSchema,
  TryoutKeySchema,
  TryoutScoringSchema,
  TryoutTrackKindSchema,
  TryoutVisibilitySchema,
} from "@nakafa/aksara-contracts/tryout/spec";
import { Effect, Schema } from "effect";

import {
  PublicRouteSegmentSchema,
  PublicRouteSlugMapSchema,
} from "#corpus/route/schema";

const TRYOUT_SOURCE_PATH_PATTERN =
  /^question-bank\/tryout\/[a-z0-9]+(?:-[a-z0-9]+)*\/[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/u;
const DEFAULT_SECTION_VISIBILITY = "visible";

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

type TryoutSectionVisibility = typeof TryoutVisibilitySchema.Type;

const TryoutSectionSourceSchema = Schema.Struct({
  key: TryoutKeySchema,
  order: Schema.Int.pipe(Schema.positive()),
  questionCount: Schema.Int.pipe(Schema.positive()),
  questionSourcePath: TryoutSourcePathSchema,
  routeSlugs: PublicRouteSlugMapSchema,
  timeLimitSeconds: Schema.Int.pipe(Schema.positive()),
  translations: TryoutTranslationMapSchema,
  visibility: Schema.optionalWith(TryoutVisibilitySchema, {
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
  kind: TryoutTrackKindSchema,
  order: Schema.Int.pipe(Schema.positive()),
  routeSlugs: PublicRouteSlugMapSchema,
  sets: Schema.Array(TryoutSetSourceSchema),
  translations: TryoutTranslationMapSchema,
});

/** Complete authoring contract for one imported try-out exam source. */
export const TryoutExamSourceSchema = Schema.Struct({
  countryCode: TryoutCountryCodeSchema,
  countryKey: TryoutKeySchema,
  countryRouteSlugs: PublicRouteSlugMapSchema,
  countryTranslations: TryoutTranslationMapSchema,
  examKey: TryoutKeySchema,
  examRouteSlugs: PublicRouteSlugMapSchema,
  examTranslations: TryoutTranslationMapSchema,
  scoringStrategy: TryoutScoringSchema,
  sourceRevision: PublicRouteSegmentSchema,
  tracks: Schema.Array(TryoutTrackSourceSchema),
});
type TryoutExamSourceInput = typeof TryoutExamSourceSchema.Encoded;
export type TryoutExamSource = typeof TryoutExamSourceSchema.Type;

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
