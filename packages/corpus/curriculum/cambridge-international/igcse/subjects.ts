import { igcseMathematicsUnitNodes } from "#corpus/curriculum/cambridge-international/igcse/units/mathematics";
import {
  igcseBiologyUnitNodes,
  igcseChemistryUnitNodes,
  igcsePhysicsUnitNodes,
} from "#corpus/curriculum/cambridge-international/igcse/units/science";
import { courseNode } from "#corpus/curriculum/schema";

export const igcseCourseNodes = [
  courseNode({
    children: igcseMathematicsUnitNodes,
    iconKey: "mathematics",
    key: "mathematics-0580",
    materialDomain: "mathematics",
    order: 10,
    translations: {
      en: {
        routeSlug: "mathematics-0580",
        title: "Mathematics 0580",
      },
      id: {
        routeSlug: "mathematics-0580",
        title: "Mathematics 0580",
      },
    },
  }),
  courseNode({
    children: igcseBiologyUnitNodes,
    iconKey: "science",
    key: "biology-0610",
    materialDomain: "biology",
    order: 20,
    translations: {
      en: {
        routeSlug: "biology-0610",
        title: "Biology 0610",
      },
      id: {
        routeSlug: "biology-0610",
        title: "Biology 0610",
      },
    },
  }),
  courseNode({
    children: igcseChemistryUnitNodes,
    iconKey: "science",
    key: "chemistry-0620",
    materialDomain: "chemistry",
    order: 30,
    translations: {
      en: {
        routeSlug: "chemistry-0620",
        title: "Chemistry 0620",
      },
      id: {
        routeSlug: "chemistry-0620",
        title: "Chemistry 0620",
      },
    },
  }),
  courseNode({
    children: igcsePhysicsUnitNodes,
    iconKey: "science",
    key: "physics-0625",
    materialDomain: "physics",
    order: 40,
    translations: {
      en: {
        routeSlug: "physics-0625",
        title: "Physics 0625",
      },
      id: {
        routeSlug: "physics-0625",
        title: "Physics 0625",
      },
    },
  }),
];
