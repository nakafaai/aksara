import { Schema } from "effect";

import { CountryCodeSchema } from "#contracts/country";
import { DateOnlySchema } from "#contracts/date";
import { APP_LOCALE_CODES, AppLocaleSchema } from "#contracts/locale";
import { isHttpsUrl, isLowerKebab } from "#contracts/text/syntax";

/** Canonical language-neutral identity for one learning program. */
export const LearningProgramKeySchema = Schema.String.pipe(
  Schema.check(
    Schema.makeFilter(isLowerKebab, {
      description: "Lowercase kebab-case canonical learning program key.",
      identifier: "LearningProgramKey",
      message: "Invalid learning program key. Expected lowercase kebab-case.",
    })
  ),
  Schema.brand("@NakafaAI/AksaraLearningProgramKey")
);
export type LearningProgramKey = typeof LearningProgramKeySchema.Type;

/** Product role of one reviewed learning program. */
export const LearningProgramKindSchema = Schema.Literals([
  "admission-exam",
  "assessment",
  "custom-program",
  "institution-program",
  "school-curriculum",
]);

/** Navigation model rendered by one learning program surface. */
export const ProgramNavigationModelSchema = Schema.Literals([
  "course-unit-lesson",
  "curriculum-tree",
  "exam-domain-set",
  "track-topic",
]);

/** Complete level vocabulary used by reviewed curriculum and exam sources. */
export const ProgramNavigationLevelSchema = Schema.Literals([
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
  "unit",
]);
export type ProgramNavigationLevel = typeof ProgramNavigationLevelSchema.Type;

/** Complete icon vocabulary referenced by learning program sources. */
export const ProgramNavigationIconKeySchema = Schema.Literals([
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
  "state",
]);
export type ProgramNavigationIconKey =
  typeof ProgramNavigationIconKeySchema.Type;

/** Publication state derived from reviewed source coverage. */
export const ProgramCoverageSchema = Schema.Literals([
  "archived",
  "available",
  "hidden",
  "partial",
  "planned",
]);

/** Reviewed organization class behind one program. */
export const ProgramProviderKindSchema = Schema.Literals([
  "institution",
  "learner",
  "nakafa",
  "official",
]);

/** Provenance role of one cited program source. */
export const ProgramSourceKindSchema = Schema.Literals([
  "institution-document",
  "nakafa-editorial",
  "official-blueprint",
  "official-policy",
  "official-portal",
]);

const ProgramSlugSchema = Schema.String.pipe(
  Schema.check(Schema.makeFilter(isLowerKebab))
);
/** One localized title and public slug owned by a learning program. */
export const ProgramTranslationSchema = Schema.Struct({
  appLocale: AppLocaleSchema,
  publicSlug: ProgramSlugSchema,
  title: Schema.Trimmed.check(Schema.isNonEmpty()),
});
export type ProgramTranslation = typeof ProgramTranslationSchema.Type;

/** Checks translations for unique canonical application-locale order. */
function hasCanonicalTranslations(translations: readonly ProgramTranslation[]) {
  return translations.every((translation, index) => {
    const previous = translations[index - 1];
    return (
      previous === undefined ||
      APP_LOCALE_CODES.indexOf(previous.appLocale) <
        APP_LOCALE_CODES.indexOf(translation.appLocale)
    );
  });
}

const ProgramTranslationListSchema = Schema.NonEmptyArray(
  ProgramTranslationSchema
).pipe(
  Schema.check(
    Schema.makeFilter(hasCanonicalTranslations, {
      message:
        "Program translations must use unique canonical app-locale order.",
    })
  )
);

/** Reviewed provider identity attached to one learning program. */
export const ProgramProviderSchema = Schema.Struct({
  homeCountry: Schema.optional(CountryCodeSchema),
  kind: ProgramProviderKindSchema,
  name: Schema.Trimmed.check(Schema.isNonEmpty()),
});

/** Exact official or editorial source used by one program registry row. */
export const ProgramSourceSchema = Schema.Struct({
  label: Schema.Trimmed.check(Schema.isNonEmpty()),
  retrievedAt: DateOnlySchema,
  reviewAfter: Schema.optional(DateOnlySchema),
  type: ProgramSourceKindSchema,
  url: Schema.String.pipe(Schema.check(Schema.makeFilter(isHttpsUrl))),
});

/** Version label and optional inclusive availability window. */
export const ProgramVersionSchema = Schema.Struct({
  endsAt: Schema.optional(DateOnlySchema),
  label: Schema.Trimmed.check(Schema.isNonEmpty()),
  startsAt: Schema.optional(DateOnlySchema),
}).pipe(
  Schema.check(
    Schema.makeFilter(
      ({ endsAt, startsAt }) =>
        endsAt === undefined || startsAt === undefined || startsAt <= endsAt,
      { message: "Expected a coherent learning program date window." }
    )
  )
);

/** Complete source-controlled wire contract for one learning program. */
export const LearningProgramSchema = Schema.Struct({
  defaultCoverageStatus: ProgramCoverageSchema,
  displayOrder: Schema.Int.pipe(Schema.check(Schema.isGreaterThan(0))),
  iconKey: ProgramNavigationIconKeySchema,
  key: LearningProgramKeySchema,
  kind: LearningProgramKindSchema,
  navigation: Schema.Struct({
    levels: Schema.NonEmptyArray(ProgramNavigationLevelSchema),
    model: ProgramNavigationModelSchema,
  }),
  provider: ProgramProviderSchema,
  recommendedCountry: Schema.optional(CountryCodeSchema),
  sources: Schema.NonEmptyArray(ProgramSourceSchema),
  translations: ProgramTranslationListSchema,
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
    translations: program.translations.map((translation) => ({
      appLocale: translation.appLocale,
      publicSlug: translation.publicSlug,
      title: translation.title,
    })),
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
