import { Schema } from "effect";

import { ContentLocaleSchema } from "#contracts/content";
import { DateOnlySchema } from "#contracts/date";

const PROGRAM_KEY_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;
const PROGRAM_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;
const COUNTRY_CODE_PATTERN = /^[A-Z]{2}$/u;
const HTTPS_URL_PATTERN = /^https:\/\/\S+$/u;

/** Canonical language-neutral identity for one learning program. */
export const LearningProgramKeySchema = Schema.String.pipe(
  Schema.pattern(PROGRAM_KEY_PATTERN, {
    description: "Lowercase kebab-case canonical learning program key.",
    identifier: "LearningProgramKey",
    message: () =>
      "Invalid learning program key. Expected lowercase kebab-case.",
  }),
  Schema.brand("@NakafaAI/AksaraLearningProgramKey")
);
export type LearningProgramKey = typeof LearningProgramKeySchema.Type;

/** Product role of one reviewed learning program. */
export const LearningProgramKindSchema = Schema.Literal(
  "admission-exam",
  "assessment",
  "custom-program",
  "institution-program",
  "school-curriculum"
);

/** Navigation model rendered by one learning program surface. */
export const ProgramNavigationModelSchema = Schema.Literal(
  "course-unit-lesson",
  "curriculum-tree",
  "exam-domain-set",
  "track-topic"
);

/** Complete level vocabulary used by reviewed curriculum and exam sources. */
export const ProgramNavigationLevelSchema = Schema.Literal(
  "class",
  "course",
  "domain",
  "lesson",
  "phase",
  "section",
  "set",
  "stage",
  "subject",
  "topic",
  "track",
  "unit"
);
export type ProgramNavigationLevel = typeof ProgramNavigationLevelSchema.Type;

/** Complete icon vocabulary referenced by learning program sources. */
export const ProgramNavigationIconKeySchema = Schema.Literal(
  "advanced",
  "assessment",
  "certificate",
  "course",
  "diploma",
  "early-years",
  "global-education",
  "grade-1",
  "grade-10",
  "grade-11",
  "grade-12",
  "grade-2",
  "grade-3",
  "grade-4",
  "grade-5",
  "grade-6",
  "grade-7",
  "grade-8",
  "grade-9",
  "high-school",
  "mathematics",
  "middle-school",
  "primary-school",
  "science",
  "school",
  "standards",
  "state"
);
export type ProgramNavigationIconKey =
  typeof ProgramNavigationIconKeySchema.Type;

/** Publication state derived from reviewed source coverage. */
export const ProgramCoverageSchema = Schema.Literal(
  "archived",
  "available",
  "hidden",
  "partial",
  "planned"
);

/** Reviewed organization class behind one program. */
export const ProgramProviderKindSchema = Schema.Literal(
  "institution",
  "learner",
  "nakafa",
  "official"
);

/** Provenance role of one cited program source. */
export const ProgramSourceKindSchema = Schema.Literal(
  "institution-document",
  "nakafa-editorial",
  "official-blueprint",
  "official-policy",
  "official-portal"
);

const ProgramCountrySchema = Schema.String.pipe(
  Schema.pattern(COUNTRY_CODE_PATTERN)
);
const ProgramSlugSchema = Schema.String.pipe(
  Schema.pattern(PROGRAM_SLUG_PATTERN)
);
const ProgramTranslationSchema = Schema.Struct({
  publicSlug: ProgramSlugSchema,
  title: Schema.NonEmptyTrimmedString,
});
const ProgramTranslationsSchema = Schema.Record({
  key: ContentLocaleSchema,
  value: ProgramTranslationSchema,
});

/** Reviewed provider identity attached to one learning program. */
export const ProgramProviderSchema = Schema.Struct({
  homeCountry: Schema.optional(ProgramCountrySchema),
  kind: ProgramProviderKindSchema,
  name: Schema.NonEmptyTrimmedString,
});

/** Exact official or editorial source used by one program registry row. */
export const ProgramSourceSchema = Schema.Struct({
  label: Schema.NonEmptyTrimmedString,
  retrievedAt: DateOnlySchema,
  reviewAfter: Schema.optional(DateOnlySchema),
  type: ProgramSourceKindSchema,
  url: Schema.String.pipe(Schema.pattern(HTTPS_URL_PATTERN)),
});

/** Version label and optional inclusive availability window. */
export const ProgramVersionSchema = Schema.Struct({
  endsAt: Schema.optional(DateOnlySchema),
  label: Schema.NonEmptyTrimmedString,
  startsAt: Schema.optional(DateOnlySchema),
}).pipe(
  Schema.filter(
    ({ endsAt, startsAt }) =>
      endsAt === undefined || startsAt === undefined || startsAt <= endsAt,
    { message: () => "Expected a coherent learning program date window." }
  )
);

/** Complete source-controlled wire contract for one learning program. */
export const LearningProgramSchema = Schema.Struct({
  defaultCoverageStatus: ProgramCoverageSchema,
  displayOrder: Schema.Int.pipe(Schema.positive()),
  iconKey: ProgramNavigationIconKeySchema,
  key: LearningProgramKeySchema,
  kind: LearningProgramKindSchema,
  navigation: Schema.Struct({
    levels: Schema.NonEmptyArray(ProgramNavigationLevelSchema),
    model: ProgramNavigationModelSchema,
  }),
  provider: ProgramProviderSchema,
  recommendedCountry: Schema.optional(ProgramCountrySchema),
  sources: Schema.NonEmptyArray(ProgramSourceSchema),
  translations: ProgramTranslationsSchema,
  version: ProgramVersionSchema,
});
export type LearningProgram = typeof LearningProgramSchema.Type;

/** Serializes one program in stable signed field order. */
export function canonicalizeLearningProgram(program: LearningProgram) {
  return JSON.stringify({
    defaultCoverageStatus: program.defaultCoverageStatus,
    displayOrder: program.displayOrder,
    iconKey: program.iconKey,
    key: program.key,
    kind: program.kind,
    navigation: {
      levels: program.navigation.levels,
      model: program.navigation.model,
    },
    provider: {
      ...(program.provider.homeCountry === undefined
        ? {}
        : { homeCountry: program.provider.homeCountry }),
      kind: program.provider.kind,
      name: program.provider.name,
    },
    ...(program.recommendedCountry === undefined
      ? {}
      : { recommendedCountry: program.recommendedCountry }),
    sources: program.sources.map((source) => ({
      label: source.label,
      retrievedAt: source.retrievedAt,
      ...(source.reviewAfter === undefined
        ? {}
        : { reviewAfter: source.reviewAfter }),
      type: source.type,
      url: source.url,
    })),
    translations: program.translations,
    version: {
      ...(program.version.endsAt === undefined
        ? {}
        : { endsAt: program.version.endsAt }),
      label: program.version.label,
      ...(program.version.startsAt === undefined
        ? {}
        : { startsAt: program.version.startsAt }),
    },
  });
}
