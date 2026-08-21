import { ACTIVE_APP_LOCALES } from "@nakafa/aksara-contracts/locale";
import {
  type LearningProgram,
  LearningProgramSchema,
} from "@nakafa/aksara-contracts/program/spec";
import { Schema } from "effect";

/** Checks exact active locale closure for one program source. */
function hasActiveProgramTranslations(
  translations: LearningProgram["translations"]
) {
  return (
    translations.length === ACTIVE_APP_LOCALES.length &&
    translations.every(
      ({ appLocale }, index) => appLocale === ACTIVE_APP_LOCALES[index]
    )
  );
}

/** Learning program source with complete canonical EN, ID, and DE copy. */
export const LearningProgramSourceSchema = LearningProgramSchema.pipe(
  Schema.check(
    Schema.makeFilter(
      ({ translations }) => hasActiveProgramTranslations(translations),
      { identifier: "ActiveProgramTranslations" }
    )
  )
);
export type LearningProgramSource = typeof LearningProgramSourceSchema.Type;
