import { courseNode } from "#corpus/curriculum/schema";
import { singaporeBiologyUnitNodes } from "#corpus/curriculum/singapore-moe/units/biology/biology";
import { singaporeChemistryUnitNodes } from "#corpus/curriculum/singapore-moe/units/chemistry/chemistry";
import { singaporePhysicsUnitNodes } from "#corpus/curriculum/singapore-moe/units/physics/physics";

/**
 * Singapore SEC G3 Physics (K323), the successor of O-Level 6091. SEAB
 * examines Physics, Chemistry and Biology as separate G3 subjects, so each is
 * its own course; combined Science is a different set of syllabuses.
 */
export const singaporeSecondaryPhysicsCourseNode = courseNode({
  children: singaporePhysicsUnitNodes,
  iconKey: "science",
  key: "secondary-physics",
  levelBand: "upper-secondary",
  materialDomain: "physics",
  order: 30,
  translations: {
    de: { routeSlug: "physik", title: "Physik" },
    en: { routeSlug: "physics", title: "Physics" },
    id: { routeSlug: "fisika", title: "Fisika" },
    ms: { routeSlug: "fizik", title: "Fizik" },
  },
});

/** Singapore SEC G3 Chemistry (K324), the successor of O-Level 6092. */
export const singaporeSecondaryChemistryCourseNode = courseNode({
  children: singaporeChemistryUnitNodes,
  iconKey: "science",
  key: "secondary-chemistry",
  levelBand: "upper-secondary",
  materialDomain: "chemistry",
  order: 40,
  translations: {
    de: { routeSlug: "chemie", title: "Chemie" },
    en: { routeSlug: "chemistry", title: "Chemistry" },
    id: { routeSlug: "kimia", title: "Kimia" },
    ms: { routeSlug: "kimia", title: "Kimia" },
  },
});

/** Singapore SEC G3 Biology (K325), the successor of O-Level 6093. */
export const singaporeSecondaryBiologyCourseNode = courseNode({
  children: singaporeBiologyUnitNodes,
  iconKey: "science",
  key: "secondary-biology",
  levelBand: "upper-secondary",
  materialDomain: "biology",
  order: 50,
  translations: {
    de: { routeSlug: "biologie", title: "Biologie" },
    en: { routeSlug: "biology", title: "Biology" },
    id: { routeSlug: "biologi", title: "Biologi" },
    ms: { routeSlug: "biologi", title: "Biologi" },
  },
});
