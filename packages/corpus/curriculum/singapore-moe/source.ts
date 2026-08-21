import { defineCurriculum, stageNode } from "#corpus/curriculum/schema";
import {
  singaporeSecondaryAdditionalMathematicsCourseNode,
  singaporeSecondaryMathematicsCourseNode,
} from "#corpus/curriculum/singapore-moe/mathematics";
import { singaporeSecondaryScienceCourseNode } from "#corpus/curriculum/singapore-moe/science";
import { LEARNING_PROGRAM_KEYS } from "#corpus/program/keys";

/** Lazily validates the complete authored Singapore MOE curriculum tree. */
export const singaporeMoeCurriculum = defineCurriculum({
  programKey: LEARNING_PROGRAM_KEYS.singaporeMoe,
  tree: [
    stageNode({
      displayGroup: {
        de: { title: "Schulstufen" },
        en: { title: "School stages" },
        id: { title: "Tahap sekolah" },
      },
      displayGroupIconKey: "school",
      iconKey: "primary-school",
      key: "primary",
      order: 10,
      translations: {
        de: { routeSlug: "grundschule", title: "Grundschule" },
        en: {
          routeSlug: "primary",
          title: "Primary",
        },
        id: {
          routeSlug: "primary",
          title: "Primary",
        },
      },
    }),
    stageNode({
      children: [
        singaporeSecondaryMathematicsCourseNode,
        singaporeSecondaryAdditionalMathematicsCourseNode,
        singaporeSecondaryScienceCourseNode,
      ],
      displayGroup: {
        de: { title: "Schulstufen" },
        en: { title: "School stages" },
        id: { title: "Tahap sekolah" },
      },
      displayGroupIconKey: "school",
      iconKey: "middle-school",
      key: "secondary",
      order: 20,
      translations: {
        de: { routeSlug: "sekundarstufe", title: "Sekundarstufe" },
        en: {
          routeSlug: "secondary",
          title: "Secondary",
        },
        id: {
          routeSlug: "secondary",
          title: "Secondary",
        },
      },
    }),
    stageNode({
      displayGroup: {
        de: { title: "Schulstufen" },
        en: { title: "School stages" },
        id: { title: "Tahap sekolah" },
      },
      displayGroupIconKey: "school",
      iconKey: "advanced",
      key: "pre-university",
      order: 30,
      translations: {
        de: { routeSlug: "studienvorbereitung", title: "Studienvorbereitung" },
        en: {
          routeSlug: "pre-university",
          title: "Pre-university",
        },
        id: {
          routeSlug: "pre-university",
          title: "Pre-university",
        },
      },
    }),
  ],
});
