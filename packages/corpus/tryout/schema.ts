import { ContentLocaleSchema } from "@nakafa/aksara-contracts/content";
import { CountryCodeSchema } from "@nakafa/aksara-contracts/country";
import {
  QuestionSetKeySchema,
  questionSetKeyParts,
} from "@nakafa/aksara-contracts/question/identity";
import { RendererDomainSchema } from "@nakafa/aksara-contracts/renderer/domain";
import { TryoutKeySchema } from "@nakafa/aksara-contracts/tryout/key";
import {
  TryoutScoringSchema,
  TryoutTrackKindSchema,
  TryoutVisibilitySchema,
} from "@nakafa/aksara-contracts/tryout/spec";
import { Effect, Schema } from "effect";

import {
  PublicRouteSegmentSchema,
  PublicRouteSlugMapSchema,
} from "#corpus/route/schema";

const DEFAULT_SECTION_VISIBILITY = "visible";

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
  questionSourcePath: QuestionSetKeySchema,
  rendererDomain: RendererDomainSchema,
  routeSlugs: PublicRouteSlugMapSchema,
  timeLimitSeconds: Schema.Int.pipe(Schema.positive()),
  translations: TryoutTranslationMapSchema,
  visibility: Schema.optionalWith(TryoutVisibilitySchema, {
    default: () => DEFAULT_SECTION_VISIBILITY,
  }),
});
export type TryoutSectionSourceInput = typeof TryoutSectionSourceSchema.Encoded;

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

const TryoutCountrySourceSchema = Schema.Struct({
  countryCode: CountryCodeSchema,
  countryKey: TryoutKeySchema,
  countryOrder: Schema.Int.pipe(Schema.positive()),
  countryRevision: PublicRouteSegmentSchema,
  countryRouteSlugs: PublicRouteSlugMapSchema,
  countryTranslations: TryoutTranslationMapSchema,
});
export type TryoutCountrySourceInput = typeof TryoutCountrySourceSchema.Encoded;

const TryoutExamSourceFieldsSchema = Schema.Struct({
  ...TryoutCountrySourceSchema.fields,
  examKey: TryoutKeySchema,
  examOrder: Schema.Int.pipe(Schema.positive()),
  examRouteSlugs: PublicRouteSlugMapSchema,
  examTranslations: TryoutTranslationMapSchema,
  scoringStrategy: TryoutScoringSchema,
  sourceRevision: PublicRouteSegmentSchema,
  tracks: Schema.Array(TryoutTrackSourceSchema),
});

type TryoutExamSourceFields = typeof TryoutExamSourceFieldsSchema.Type;

/** Checks every section path against its exact country, exam, section, and set. */
function hasOwnedQuestionSources(source: TryoutExamSourceFields) {
  return source.tracks.every((track) =>
    track.sets.every((set) =>
      set.sections.every((section) => {
        const parts = questionSetKeyParts(section.questionSourcePath);
        return (
          parts.countryKey === source.countryKey &&
          parts.examKey === source.examKey &&
          parts.sectionKey === section.key &&
          parts.setKey === set.key
        );
      })
    )
  );
}

/** Complete authoring contract for one imported try-out exam source. */
export const TryoutExamSourceSchema = TryoutExamSourceFieldsSchema.pipe(
  Schema.filter(hasOwnedQuestionSources, {
    message: () =>
      "Question sources must match their country, exam, section, and set.",
  })
);
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
