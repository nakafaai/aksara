import { courseNode } from "#corpus/curriculum/schema";
import { usScienceUnitNodes } from "#corpus/curriculum/united-states/units/science/science";

/** United States high school science, organised by the NGSS disciplines. */
export const usHighSchoolScienceCourseNode = courseNode({
  children: usScienceUnitNodes,
  iconKey: "science",
  key: "high-school-science",
  order: 20,
  translations: {
    de: { routeSlug: "naturwissenschaften", title: "Naturwissenschaften" },
    en: { routeSlug: "science", title: "Science" },
    id: { routeSlug: "sains", title: "Sains" },
    ms: { routeSlug: "sains", title: "Sains" },
  },
});
