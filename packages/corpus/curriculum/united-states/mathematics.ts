import { courseNode } from "#corpus/curriculum/schema";
import { usMathematicsUnitNodes } from "#corpus/curriculum/united-states/units/mathematics/mathematics";

/** United States high school mathematics, organised by the CCSS conceptual categories. */
export const usHighSchoolMathematicsCourseNode = courseNode({
  children: usMathematicsUnitNodes,
  iconKey: "mathematics",
  key: "high-school-mathematics",
  materialDomain: "mathematics",
  order: 10,
  translations: {
    de: { routeSlug: "mathematik", title: "Mathematik" },
    en: { routeSlug: "mathematics", title: "Mathematics" },
    id: { routeSlug: "matematika", title: "Matematika" },
    ms: { routeSlug: "matematik", title: "Matematik" },
  },
});
