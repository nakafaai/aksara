import {
  courseNode,
  defineCurriculum,
  stageNode,
} from "#corpus/curriculum/schema";
import { hannoverMedicalBiologyUnitNodes } from "#corpus/curriculum/studienkolleg/hannover/medical/biology";
import { hannoverMedicalChemistryUnitNodes } from "#corpus/curriculum/studienkolleg/hannover/medical/chemistry";
import { hannoverMedicalMathematicsUnitNodes } from "#corpus/curriculum/studienkolleg/hannover/medical/mathematics";
import { hannoverMedicalPhysicsUnitNodes } from "#corpus/curriculum/studienkolleg/hannover/medical/physics";
import { hannoverTechnicalChemistryUnitNodes } from "#corpus/curriculum/studienkolleg/hannover/technical/chemistry";
import { hannoverTechnicalMathematicsUnitNodes } from "#corpus/curriculum/studienkolleg/hannover/technical/mathematics";
import { hannoverTechnicalPhysicsUnitNodes } from "#corpus/curriculum/studienkolleg/hannover/technical/physics";
import { sachsenMedicalMathematicsUnitNodes } from "#corpus/curriculum/studienkolleg/sachsen/medical/mathematics";
import { sachsenTechnicalMathematicsUnitNodes } from "#corpus/curriculum/studienkolleg/sachsen/technical/mathematics";
import { tuDarmstadtTechnicalChemistryUnitNodes } from "#corpus/curriculum/studienkolleg/tu-darmstadt/chemistry";
import { tuDarmstadtTechnicalMathematicsUnitNodes } from "#corpus/curriculum/studienkolleg/tu-darmstadt/mathematics";
import { tuDarmstadtTechnicalPhysicsUnitNodes } from "#corpus/curriculum/studienkolleg/tu-darmstadt/physics";
import { LEARNING_PROGRAM_KEYS } from "#corpus/program/keys";

/** The group every Kolleg stands in, named in each locale. */
const KOLLEGS = {
  de: { title: "Studienkollegs" },
  en: { title: "Studienkollegs" },
  id: { title: "Studienkolleg" },
  ms: { title: "Studienkolleg" },
};

/** Mathematik of the T-Kurs, the Schwerpunktkurs for technical and science degrees. */
const TECHNICAL_MATHEMATICS = {
  de: { routeSlug: "mathematik-t-kurs", title: "Mathematik im T-Kurs" },
  en: { routeSlug: "t-kurs-mathematics", title: "T-Kurs Mathematics" },
  id: { routeSlug: "matematika-t-kurs", title: "Matematika T-Kurs" },
  ms: { routeSlug: "matematik-t-kurs", title: "Matematik T-Kurs" },
};

/** Mathematik of the M-Kurs, the Schwerpunktkurs for medical and biology degrees. */
const MEDICAL_MATHEMATICS = {
  de: { routeSlug: "mathematik-m-kurs", title: "Mathematik im M-Kurs" },
  en: { routeSlug: "m-kurs-mathematics", title: "M-Kurs Mathematics" },
  id: { routeSlug: "matematika-m-kurs", title: "Matematika M-Kurs" },
  ms: { routeSlug: "matematik-m-kurs", title: "Matematik M-Kurs" },
};

/** Physik of the T-Kurs. */
const TECHNICAL_PHYSICS = {
  de: { routeSlug: "physik-t-kurs", title: "Physik im T-Kurs" },
  en: { routeSlug: "t-kurs-physics", title: "T-Kurs Physics" },
  id: { routeSlug: "fisika-t-kurs", title: "Fisika T-Kurs" },
  ms: { routeSlug: "fizik-t-kurs", title: "Fizik T-Kurs" },
};

/** Physik of the M-Kurs. */
const MEDICAL_PHYSICS = {
  de: { routeSlug: "physik-m-kurs", title: "Physik im M-Kurs" },
  en: { routeSlug: "m-kurs-physics", title: "M-Kurs Physics" },
  id: { routeSlug: "fisika-m-kurs", title: "Fisika M-Kurs" },
  ms: { routeSlug: "fizik-m-kurs", title: "Fizik M-Kurs" },
};

/** Chemie of the T-Kurs. */
const TECHNICAL_CHEMISTRY = {
  de: { routeSlug: "chemie-t-kurs", title: "Chemie im T-Kurs" },
  en: { routeSlug: "t-kurs-chemistry", title: "T-Kurs Chemistry" },
  id: { routeSlug: "kimia-t-kurs", title: "Kimia T-Kurs" },
  ms: { routeSlug: "kimia-t-kurs", title: "Kimia T-Kurs" },
};

/** Chemie of the M-Kurs. */
const MEDICAL_CHEMISTRY = {
  de: { routeSlug: "chemie-m-kurs", title: "Chemie im M-Kurs" },
  en: { routeSlug: "m-kurs-chemistry", title: "M-Kurs Chemistry" },
  id: { routeSlug: "kimia-m-kurs", title: "Kimia M-Kurs" },
  ms: { routeSlug: "kimia-m-kurs", title: "Kimia M-Kurs" },
};

/** Biologie of the M-Kurs; no T-Kurs teaches it. */
const MEDICAL_BIOLOGY = {
  de: { routeSlug: "biologie-m-kurs", title: "Biologie im M-Kurs" },
  en: { routeSlug: "m-kurs-biology", title: "M-Kurs Biology" },
  id: { routeSlug: "biologi-m-kurs", title: "Biologi M-Kurs" },
  ms: { routeSlug: "biologi-m-kurs", title: "Biologi M-Kurs" },
};

/**
 * The Studienkolleg tree: one stage per Kolleg that publishes its topics, one
 * course per subject of a Schwerpunktkurs, and one unit per published topic or
 * heading a lesson teaches. The Feststellungsprüfung stands for the Hochschulreife, so
 * every Kolleg is upper-secondary. Kaiserslautern publishes no Mathematik
 * topics, so it has no node until it does.
 */
export const studienkollegCurriculum = defineCurriculum({
  programKey: LEARNING_PROGRAM_KEYS.studienkolleg,
  tree: [
    stageNode({
      children: [
        courseNode({
          children: tuDarmstadtTechnicalMathematicsUnitNodes,
          iconKey: "mathematics",
          key: "tu-darmstadt-t-mathematics",
          materialDomain: "mathematics",
          order: 10,
          translations: TECHNICAL_MATHEMATICS,
        }),
        courseNode({
          children: tuDarmstadtTechnicalPhysicsUnitNodes,
          iconKey: "science",
          key: "tu-darmstadt-t-physics",
          materialDomain: "physics",
          order: 20,
          translations: TECHNICAL_PHYSICS,
        }),
        courseNode({
          children: tuDarmstadtTechnicalChemistryUnitNodes,
          iconKey: "science",
          key: "tu-darmstadt-t-chemistry",
          materialDomain: "chemistry",
          order: 30,
          translations: TECHNICAL_CHEMISTRY,
        }),
      ],
      displayGroup: KOLLEGS,
      displayGroupIconKey: "school",
      iconKey: "high-school",
      key: "tu-darmstadt",
      levelBand: "upper-secondary",
      order: 10,
      translations: {
        de: {
          routeSlug: "studienkolleg-der-tu-darmstadt",
          title: "Studienkolleg der TU Darmstadt",
        },
        en: {
          routeSlug: "tu-darmstadt-studienkolleg",
          title: "TU Darmstadt Studienkolleg",
        },
        id: {
          routeSlug: "studienkolleg-tu-darmstadt",
          title: "Studienkolleg TU Darmstadt",
        },
        ms: {
          routeSlug: "studienkolleg-tu-darmstadt",
          title: "Studienkolleg TU Darmstadt",
        },
      },
    }),
    stageNode({
      children: [
        courseNode({
          children: hannoverTechnicalMathematicsUnitNodes,
          iconKey: "mathematics",
          key: "hannover-t-mathematics",
          materialDomain: "mathematics",
          order: 10,
          translations: TECHNICAL_MATHEMATICS,
        }),
        courseNode({
          children: hannoverMedicalMathematicsUnitNodes,
          iconKey: "mathematics",
          key: "hannover-m-mathematics",
          materialDomain: "mathematics",
          order: 40,
          translations: MEDICAL_MATHEMATICS,
        }),
        courseNode({
          children: hannoverTechnicalPhysicsUnitNodes,
          iconKey: "science",
          key: "hannover-t-physics",
          materialDomain: "physics",
          order: 20,
          translations: TECHNICAL_PHYSICS,
        }),
        courseNode({
          children: hannoverMedicalPhysicsUnitNodes,
          iconKey: "science",
          key: "hannover-m-physics",
          materialDomain: "physics",
          order: 50,
          translations: MEDICAL_PHYSICS,
        }),
        courseNode({
          children: hannoverTechnicalChemistryUnitNodes,
          iconKey: "science",
          key: "hannover-t-chemistry",
          materialDomain: "chemistry",
          order: 30,
          translations: TECHNICAL_CHEMISTRY,
        }),
        courseNode({
          children: hannoverMedicalChemistryUnitNodes,
          iconKey: "science",
          key: "hannover-m-chemistry",
          materialDomain: "chemistry",
          order: 60,
          translations: MEDICAL_CHEMISTRY,
        }),
        courseNode({
          children: hannoverMedicalBiologyUnitNodes,
          iconKey: "science",
          key: "hannover-m-biology",
          materialDomain: "biology",
          order: 70,
          translations: MEDICAL_BIOLOGY,
        }),
      ],
      displayGroup: KOLLEGS,
      displayGroupIconKey: "school",
      iconKey: "high-school",
      key: "hannover",
      levelBand: "upper-secondary",
      order: 20,
      translations: {
        de: {
          routeSlug: "niedersaechsisches-studienkolleg",
          title: "Niedersächsisches Studienkolleg",
        },
        en: {
          routeSlug: "hannover-studienkolleg",
          title: "Hannover Studienkolleg",
        },
        id: {
          routeSlug: "studienkolleg-hannover",
          title: "Studienkolleg Hannover",
        },
        ms: {
          routeSlug: "studienkolleg-hannover",
          title: "Studienkolleg Hannover",
        },
      },
    }),
    stageNode({
      children: [
        courseNode({
          children: sachsenTechnicalMathematicsUnitNodes,
          iconKey: "mathematics",
          key: "sachsen-t-mathematics",
          materialDomain: "mathematics",
          order: 10,
          translations: TECHNICAL_MATHEMATICS,
        }),
        courseNode({
          children: sachsenMedicalMathematicsUnitNodes,
          iconKey: "mathematics",
          key: "sachsen-m-mathematics",
          materialDomain: "mathematics",
          order: 20,
          translations: MEDICAL_MATHEMATICS,
        }),
      ],
      displayGroup: KOLLEGS,
      displayGroupIconKey: "school",
      iconKey: "high-school",
      key: "sachsen",
      levelBand: "upper-secondary",
      order: 30,
      translations: {
        de: {
          routeSlug: "studienkolleg-sachsen",
          title: "Studienkolleg Sachsen",
        },
        en: {
          routeSlug: "studienkolleg-sachsen",
          title: "Studienkolleg Sachsen",
        },
        id: {
          routeSlug: "studienkolleg-sachsen",
          title: "Studienkolleg Sachsen",
        },
        ms: {
          routeSlug: "studienkolleg-sachsen",
          title: "Studienkolleg Sachsen",
        },
      },
    }),
  ],
});
