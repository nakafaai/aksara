import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import type { AppLocale } from "@nakafa/aksara-contracts/locale";
import {
  type LearningProgram,
  LearningProgramKeySchema,
} from "@nakafa/aksara-contracts/program/spec";
import { Effect, Schema } from "effect";

/** Curriculum routes cannot be derived from the supplied source ownership. */
export class CurriculumRouteError extends Schema.TaggedError<CurriculumRouteError>()(
  "CurriculumRouteError",
  {
    code: Schema.Literal("curriculum", "program", "translation"),
    programKey: LearningProgramKeySchema,
    value: Schema.String,
  }
) {}

/** Finds a curriculum-tree program or fails with its missing ownership. */
export const requireCurriculumProgram = Effect.fn(
  "AksaraCorpus.requireCurriculumProgram"
)(function* (
  programByKey: ReadonlyMap<string, LearningProgram>,
  programKey: typeof LearningProgramKeySchema.Type
) {
  const program = programByKey.get(programKey);
  if (program?.navigation.model === "curriculum-tree") {
    return program;
  }
  return yield* new CurriculumRouteError({
    code: "program",
    programKey,
    value: program?.navigation.model ?? "missing",
  });
});

/** Resolves one required locale translation from a decoded program row. */
export const requireProgramTranslation = Effect.fn(
  "AksaraCorpus.requireProgramTranslation"
)(function* (program: LearningProgram, appLocale: AppLocale) {
  const translation = program.translations.find(
    (candidate) => candidate.appLocale === appLocale
  );
  if (translation !== undefined) {
    return translation;
  }
  return yield* new CurriculumRouteError({
    code: "translation",
    programKey: program.key,
    value: appLocale,
  });
});

/** Derives the reviewed corpus directory owned by one program tree. */
export function curriculumSourcePath(
  programKey: typeof LearningProgramKeySchema.Type
) {
  return CorpusSourcePathSchema.make(
    `packages/corpus/curriculum/${programKey}`
  );
}
