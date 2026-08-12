import { Schema } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import { APP_LOCALE_CODES, AppLocaleSchema } from "#contracts/locale";
import {
  CurriculumRouteV4Schema,
  canonicalizeCurriculumRoute,
} from "#contracts/program/curriculum";
import { LearningProgramSchema } from "#contracts/program/spec";

const ProgramSlugSchema = Schema.NonEmptyTrimmedString.pipe(
  Schema.pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/u)
);

/** One current localized title and public slug owned by a program. */
export const ProgramTranslationV4Schema = Schema.Struct({
  appLocale: AppLocaleSchema,
  publicSlug: ProgramSlugSchema,
  title: Schema.NonEmptyTrimmedString,
});
export type ProgramTranslationV4 = typeof ProgramTranslationV4Schema.Type;

/** Checks translations for unique canonical application-locale order. */
function hasCanonicalTranslations(
  translations: readonly ProgramTranslationV4[]
) {
  return translations.every((translation, index) => {
    const previous = translations[index - 1];
    return (
      previous === undefined ||
      APP_LOCALE_CODES.indexOf(previous.appLocale) <
        APP_LOCALE_CODES.indexOf(translation.appLocale)
    );
  });
}

const ProgramTranslationV4ListSchema = Schema.NonEmptyArray(
  ProgramTranslationV4Schema
).pipe(
  Schema.filter(hasCanonicalTranslations, {
    message: () =>
      "Program translations must use unique canonical app-locale order.",
  })
);

/** Current program catalog row with an explicit localized translation set. */
export const LearningProgramV4Schema = Schema.Struct({
  ...LearningProgramSchema.fields,
  translations: ProgramTranslationV4ListSchema,
});
export type LearningProgramV4 = typeof LearningProgramV4Schema.Type;

/** Hashed current learning-program catalog record. */
export const LearningProgramV4RecordSchema = Schema.Struct({
  kind: Schema.Literal("program-v4"),
  row: LearningProgramV4Schema,
  rowHash: Sha256HashSchema,
});

/** Hashed current localized curriculum-route record. */
export const CurriculumRouteV4RecordSchema = Schema.Struct({
  kind: Schema.Literal("curriculum-v4"),
  row: CurriculumRouteV4Schema,
  rowHash: Sha256HashSchema,
});

/** Complete row vocabulary owned by a program-v4 snapshot. */
export const ProgramSnapshotV4RowSchema = Schema.Union(
  LearningProgramV4RecordSchema,
  CurriculumRouteV4RecordSchema
);
export type ProgramSnapshotV4Row = typeof ProgramSnapshotV4RowSchema.Type;
export type ProgramSnapshotV4RowInput =
  | Pick<typeof LearningProgramV4RecordSchema.Type, "kind" | "row">
  | Pick<typeof CurriculumRouteV4RecordSchema.Type, "kind" | "row">;

/** Serializes a current program in stable signed field order. */
export function canonicalizeLearningProgramV4(program: LearningProgramV4) {
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

/** Serializes one current program snapshot row without its derived hash. */
export function canonicalizeProgramSnapshotV4Row(
  record: ProgramSnapshotV4RowInput
) {
  if (record.kind === "program-v4") {
    return `{"kind":"program-v4","row":${canonicalizeLearningProgramV4(record.row)}}`;
  }
  return `{"kind":"curriculum-v4","row":${canonicalizeCurriculumRoute(record.row)}}`;
}
