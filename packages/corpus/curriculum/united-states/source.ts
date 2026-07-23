import { defineCurriculum, stageNode } from "#corpus/curriculum/schema";
import { usHighSchoolMathematicsCourseNode } from "#corpus/curriculum/united-states/mathematics";
import { usHighSchoolScienceCourseNode } from "#corpus/curriculum/united-states/science";
import { LEARNING_PROGRAM_KEYS } from "#corpus/program/keys";

export const unitedStatesCurriculum = defineCurriculum({
  programKey: LEARNING_PROGRAM_KEYS.unitedStates,
  tree: [
    stageNode({
      children: [
        usHighSchoolMathematicsCourseNode,
        usHighSchoolScienceCourseNode,
      ],
      displayGroup: {
        en: { title: "School stages" },
        id: { title: "Tahap sekolah" },
      },
      displayGroupIconKey: "school",
      iconKey: "high-school",
      key: "high-school",
      order: 10,
      translations: {
        en: {
          routeSlug: "high-school",
          title: "High School",
        },
        id: {
          routeSlug: "sma",
          title: "SMA",
        },
      },
    }),
  ],
});
