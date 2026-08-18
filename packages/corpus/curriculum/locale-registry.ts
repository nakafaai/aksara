import { cambridgeInternationalGermanCurriculum } from "#corpus/curriculum/cambridge-international/locale/de";
import type { CurriculumLocaleSourceInput } from "#corpus/curriculum/locale-source";
import { merdekaGermanCurriculum } from "#corpus/curriculum/merdeka/locale/de";
import { singaporeMoeGermanCurriculum } from "#corpus/curriculum/singapore-moe/locale/de";
import { unitedStatesGermanCurriculum } from "#corpus/curriculum/united-states/locale/de";

/** Permanent locale-owned curriculum rows imported by the authoring registry. */
export const curriculumLocaleSources: readonly CurriculumLocaleSourceInput[] = [
  ...cambridgeInternationalGermanCurriculum,
  ...merdekaGermanCurriculum,
  ...singaporeMoeGermanCurriculum,
  ...unitedStatesGermanCurriculum,
];
