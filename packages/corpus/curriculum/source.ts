import { LearningProgramKeySchema } from "@nakafa/aksara-contracts/program/spec";
import { Effect, Schema } from "effect";

import { cambridgeInternationalCurriculum } from "#corpus/curriculum/cambridge-international/source";
import { merdekaCurriculum } from "#corpus/curriculum/merdeka/source";
import type { CurriculumSource } from "#corpus/curriculum/schema";
import { singaporeMoeCurriculum } from "#corpus/curriculum/singapore-moe/source";
import { unitedStatesCurriculum } from "#corpus/curriculum/united-states/source";

const curriculumSourcePrograms = [
  cambridgeInternationalCurriculum,
  merdekaCurriculum,
  singaporeMoeCurriculum,
  unitedStatesCurriculum,
];

/** Two curriculum trees claim the same stable learning-program identity. */
export class CurriculumCatalogError extends Schema.TaggedError<CurriculumCatalogError>()(
  "CurriculumCatalogError",
  { programKey: LearningProgramKeySchema }
) {}

/** Rejects duplicate program ownership and returns canonical key order. */
export const validateCurriculumCatalog = Effect.fn(
  "AksaraCorpus.validateCurriculumCatalog"
)(function* (curricula: readonly CurriculumSource[]) {
  const programKeys = new Set<string>();
  for (const curriculum of curricula) {
    if (programKeys.has(curriculum.programKey)) {
      return yield* new CurriculumCatalogError({
        programKey: curriculum.programKey,
      });
    }
    programKeys.add(curriculum.programKey);
  }
  return [...curricula].sort((left, right) =>
    left.programKey < right.programKey ? -1 : 1
  );
});

/** Resolves and validates every real authored curriculum source program. */
export const decodeCurriculumCatalog = Effect.fn(
  "AksaraCorpus.decodeCurriculumCatalog"
)(function* () {
  const curricula = yield* Effect.all(curriculumSourcePrograms);
  return yield* validateCurriculumCatalog(curricula);
});
