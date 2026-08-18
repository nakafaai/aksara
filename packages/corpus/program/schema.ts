import {
  LearningProgramSchema,
  ProgramTranslationSchema,
} from "@nakafa/aksara-contracts/program/spec";
import { Schema } from "effect";

import {
  EMBEDDED_APP_LOCALE_CODES,
  EmbeddedAppLocaleSchema,
} from "#corpus/locale/source";

/** Checks exact embedded locale closure for one base program source. */
function hasEmbeddedProgramTranslations(
  translations: readonly (typeof ProgramTranslationSchema.Type)[]
) {
  return (
    translations.length === EMBEDDED_APP_LOCALE_CODES.length &&
    translations.every(
      ({ appLocale }, index) => appLocale === EMBEDDED_APP_LOCALE_CODES[index]
    )
  );
}

/** Learning program source whose localized copy remains embedded in en and id. */
export const LearningProgramSourceSchema = Schema.Struct({
  ...LearningProgramSchema.fields,
  translations: Schema.NonEmptyArray(
    Schema.Struct({
      ...ProgramTranslationSchema.fields,
      appLocale: EmbeddedAppLocaleSchema,
    })
  ).pipe(
    Schema.filter(hasEmbeddedProgramTranslations, {
      identifier: "EmbeddedProgramTranslations",
    })
  ),
});
export type LearningProgramSource = typeof LearningProgramSourceSchema.Type;
