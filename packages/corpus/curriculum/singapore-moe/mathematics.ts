import { courseNode } from "#corpus/curriculum/schema";
import { singaporeAdditionalMathematicsUnitNodes } from "#corpus/curriculum/singapore-moe/units/additional/additional";
import { singaporeMathematicsUnitNodes } from "#corpus/curriculum/singapore-moe/units/mathematics/mathematics";

/** Singapore SEC G3 Mathematics (K310), the successor of O-Level 4052. */
export const singaporeSecondaryMathematicsCourseNode = courseNode({
  children: singaporeMathematicsUnitNodes,
  iconKey: "advanced",
  key: "secondary-mathematics",
  levelBand: "upper-secondary",
  materialDomain: "mathematics",
  order: 10,
  translations: {
    de: { routeSlug: "mathematik", title: "Mathematik" },
    en: { routeSlug: "mathematics", title: "Mathematics" },
    id: { routeSlug: "matematika", title: "Matematika" },
    ms: { routeSlug: "matematik", title: "Matematik" },
  },
});

/** Singapore SEC G3 Additional Mathematics (K341), the successor of O-Level 4049. */
export const singaporeSecondaryAdditionalMathematicsCourseNode = courseNode({
  children: singaporeAdditionalMathematicsUnitNodes,
  iconKey: "mathematics",
  key: "secondary-additional-mathematics",
  levelBand: "upper-secondary",
  materialDomain: "mathematics",
  order: 20,
  translations: {
    de: {
      routeSlug: "vertiefende-mathematik",
      title: "Vertiefende Mathematik",
    },
    en: {
      routeSlug: "additional-mathematics",
      title: "Additional Mathematics",
    },
    id: {
      routeSlug: "additional-mathematics",
      title: "Additional Mathematics",
    },
    ms: { routeSlug: "matematik-tambahan", title: "Matematik Tambahan" },
  },
});
