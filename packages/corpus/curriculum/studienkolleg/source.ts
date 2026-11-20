import {
  courseNode,
  defineCurriculum,
  stageNode,
} from "#corpus/curriculum/schema";
import { hannoverMedicalMathematicsUnitNodes } from "#corpus/curriculum/studienkolleg/hannover/medical/mathematics";
import { hannoverTechnicalMathematicsUnitNodes } from "#corpus/curriculum/studienkolleg/hannover/technical/mathematics";
import { sachsenMedicalMathematicsUnitNodes } from "#corpus/curriculum/studienkolleg/sachsen/medical/mathematics";
import { sachsenTechnicalMathematicsUnitNodes } from "#corpus/curriculum/studienkolleg/sachsen/technical/mathematics";
import { tuDarmstadtTechnicalMathematicsUnitNodes } from "#corpus/curriculum/studienkolleg/tu-darmstadt/mathematics";
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

/**
 * The Studienkolleg tree: one stage per Kolleg that publishes its Mathematik
 * topics, one course per Schwerpunktkurs, and one unit per published topic a
 * lesson teaches. The Feststellungsprüfung stands for the Hochschulreife, so
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
          order: 20,
          translations: MEDICAL_MATHEMATICS,
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
