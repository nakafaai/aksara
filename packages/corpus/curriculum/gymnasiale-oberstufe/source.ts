import { introductoryPhaseBiologyUnitNodes } from "#corpus/curriculum/gymnasiale-oberstufe/introductory-phase/biology";
import { introductoryPhaseChemistryUnitNodes } from "#corpus/curriculum/gymnasiale-oberstufe/introductory-phase/chemistry";
import { introductoryPhaseMathematicsUnitNodes } from "#corpus/curriculum/gymnasiale-oberstufe/introductory-phase/mathematics";
import { introductoryPhasePhysicsUnitNodes } from "#corpus/curriculum/gymnasiale-oberstufe/introductory-phase/physics";
import { qualificationPhase1ChemistryUnitNodes } from "#corpus/curriculum/gymnasiale-oberstufe/qualification-phase-1/chemistry";
import { qualificationPhase1MathematicsUnitNodes } from "#corpus/curriculum/gymnasiale-oberstufe/qualification-phase-1/mathematics";
import { qualificationPhase2BiologyUnitNodes } from "#corpus/curriculum/gymnasiale-oberstufe/qualification-phase-2/biology";
import { qualificationPhase2ChemistryUnitNodes } from "#corpus/curriculum/gymnasiale-oberstufe/qualification-phase-2/chemistry";
import { qualificationPhase2MathematicsUnitNodes } from "#corpus/curriculum/gymnasiale-oberstufe/qualification-phase-2/mathematics";
import { qualificationPhase2PhysicsUnitNodes } from "#corpus/curriculum/gymnasiale-oberstufe/qualification-phase-2/physics";
import { qualificationPhase3ChemistryUnitNodes } from "#corpus/curriculum/gymnasiale-oberstufe/qualification-phase-3/chemistry";
import { qualificationPhase3MathematicsUnitNodes } from "#corpus/curriculum/gymnasiale-oberstufe/qualification-phase-3/mathematics";
import { qualificationPhase3PhysicsUnitNodes } from "#corpus/curriculum/gymnasiale-oberstufe/qualification-phase-3/physics";
import { qualificationPhase4BiologyUnitNodes } from "#corpus/curriculum/gymnasiale-oberstufe/qualification-phase-4/biology";
import { qualificationPhase4ChemistryUnitNodes } from "#corpus/curriculum/gymnasiale-oberstufe/qualification-phase-4/chemistry";
import { qualificationPhase4MathematicsUnitNodes } from "#corpus/curriculum/gymnasiale-oberstufe/qualification-phase-4/mathematics";
import { qualificationPhase4PhysicsUnitNodes } from "#corpus/curriculum/gymnasiale-oberstufe/qualification-phase-4/physics";
import {
  classNode,
  defineCurriculum,
  subjectNode,
} from "#corpus/curriculum/schema";
import { LEARNING_PROGRAM_KEYS } from "#corpus/program/keys";

/** The Einführungsphase as the Kerncurriculum heads its overview, in each locale. */
const INTRODUCTORY_PHASE = {
  de: { title: "Einführungsphase" },
  en: { title: "Introductory Phase" },
  id: { title: "Fase Pengenalan" },
  ms: { title: "Fasa Pengenalan" },
};

/** The Qualifikationsphase as the Kerncurriculum heads its overview, in each locale. */
const QUALIFICATION_PHASE = {
  de: { title: "Qualifikationsphase" },
  en: { title: "Qualification Phase" },
  id: { title: "Fase Kualifikasi" },
  ms: { title: "Fasa Kelayakan" },
};

/** Mathematik, named in each locale. */
const MATHEMATICS = {
  de: { routeSlug: "mathematik", title: "Mathematik" },
  en: { routeSlug: "mathematics", title: "Mathematics" },
  id: { routeSlug: "matematika", title: "Matematika" },
  ms: { routeSlug: "matematik", title: "Matematik" },
};

/** Physik, named in each locale. */
const PHYSICS = {
  de: { routeSlug: "physik", title: "Physik" },
  en: { routeSlug: "physics", title: "Physics" },
  id: { routeSlug: "fisika", title: "Fisika" },
  ms: { routeSlug: "fizik", title: "Fizik" },
};

/** Chemie, named in each locale. */
const CHEMISTRY = {
  de: { routeSlug: "chemie", title: "Chemie" },
  en: { routeSlug: "chemistry", title: "Chemistry" },
  id: { routeSlug: "kimia", title: "Kimia" },
  ms: { routeSlug: "kimia", title: "Kimia" },
};

/** Biologie, named in each locale. */
const BIOLOGY = {
  de: { routeSlug: "biologie", title: "Biologie" },
  en: { routeSlug: "biology", title: "Biology" },
  id: { routeSlug: "biologi", title: "Biologi" },
  ms: { routeSlug: "biologi", title: "Biologi" },
};

/**
 * The Gymnasiale Oberstufe tree: the Einführungsphase and the four Kurshalbjahre
 * Q1 to Q4 of the Hessen Kerncurriculum, each with Mathematik. A unit is one
 * Themenfeld that a Nakafa lesson teaches. A lesson stands once per class,
 * under the Themenfeld it teaches most, and its mapping cites every Themenfeld
 * of that class and every KMK standard it meets; a Themenfeld no lesson stands
 * under has no node.
 */
export const gymnasialeOberstufeCurriculum = defineCurriculum({
  programKey: LEARNING_PROGRAM_KEYS.gymnasialeOberstufe,
  tree: [
    classNode({
      children: [
        subjectNode({
          children: introductoryPhaseMathematicsUnitNodes,
          key: "introductory-phase-mathematics",
          materialDomain: "mathematics",
          order: 10,
          translations: MATHEMATICS,
        }),
        subjectNode({
          children: introductoryPhasePhysicsUnitNodes,
          key: "introductory-phase-physics",
          materialDomain: "physics",
          order: 20,
          translations: PHYSICS,
        }),
        subjectNode({
          children: introductoryPhaseChemistryUnitNodes,
          key: "introductory-phase-chemistry",
          materialDomain: "chemistry",
          order: 30,
          translations: CHEMISTRY,
        }),
        subjectNode({
          children: introductoryPhaseBiologyUnitNodes,
          key: "introductory-phase-biology",
          materialDomain: "biology",
          order: 40,
          translations: BIOLOGY,
        }),
      ],
      displayGroup: INTRODUCTORY_PHASE,
      displayGroupIconKey: "school",
      iconKey: "course",
      key: "introductory-phase",
      levelBand: "upper-secondary",
      order: 10,
      translations: {
        de: {
          routeSlug: "einfuehrungsphase",
          title: "Einführungsphase (E1/E2)",
        },
        en: {
          routeSlug: "introductory-phase",
          title: "Introductory Phase (E1/E2)",
        },
        id: { routeSlug: "fase-pengenalan", title: "Fase Pengenalan (E1/E2)" },
        ms: { routeSlug: "fasa-pengenalan", title: "Fasa Pengenalan (E1/E2)" },
      },
    }),
    classNode({
      children: [
        subjectNode({
          children: qualificationPhase1MathematicsUnitNodes,
          key: "qualification-phase-1-mathematics",
          materialDomain: "mathematics",
          order: 10,
          translations: MATHEMATICS,
        }),
        subjectNode({
          children: qualificationPhase1ChemistryUnitNodes,
          key: "qualification-phase-1-chemistry",
          materialDomain: "chemistry",
          order: 30,
          translations: CHEMISTRY,
        }),
      ],
      displayGroup: QUALIFICATION_PHASE,
      displayGroupIconKey: "high-school",
      iconKey: "advanced",
      key: "qualification-phase-1",
      levelBand: "upper-secondary",
      order: 20,
      translations: {
        de: { routeSlug: "q1", title: "Q1" },
        en: { routeSlug: "q1", title: "Q1" },
        id: { routeSlug: "q1", title: "Q1" },
        ms: { routeSlug: "q1", title: "Q1" },
      },
    }),
    classNode({
      children: [
        subjectNode({
          children: qualificationPhase2MathematicsUnitNodes,
          key: "qualification-phase-2-mathematics",
          materialDomain: "mathematics",
          order: 10,
          translations: MATHEMATICS,
        }),
        subjectNode({
          children: qualificationPhase2PhysicsUnitNodes,
          key: "qualification-phase-2-physics",
          materialDomain: "physics",
          order: 20,
          translations: PHYSICS,
        }),
        subjectNode({
          children: qualificationPhase2ChemistryUnitNodes,
          key: "qualification-phase-2-chemistry",
          materialDomain: "chemistry",
          order: 30,
          translations: CHEMISTRY,
        }),
        subjectNode({
          children: qualificationPhase2BiologyUnitNodes,
          key: "qualification-phase-2-biology",
          materialDomain: "biology",
          order: 40,
          translations: BIOLOGY,
        }),
      ],
      displayGroup: QUALIFICATION_PHASE,
      displayGroupIconKey: "high-school",
      iconKey: "standards",
      key: "qualification-phase-2",
      levelBand: "upper-secondary",
      order: 30,
      translations: {
        de: { routeSlug: "q2", title: "Q2" },
        en: { routeSlug: "q2", title: "Q2" },
        id: { routeSlug: "q2", title: "Q2" },
        ms: { routeSlug: "q2", title: "Q2" },
      },
    }),
    classNode({
      children: [
        subjectNode({
          children: qualificationPhase3MathematicsUnitNodes,
          key: "qualification-phase-3-mathematics",
          materialDomain: "mathematics",
          order: 10,
          translations: MATHEMATICS,
        }),
        subjectNode({
          children: qualificationPhase3PhysicsUnitNodes,
          key: "qualification-phase-3-physics",
          materialDomain: "physics",
          order: 20,
          translations: PHYSICS,
        }),
        subjectNode({
          children: qualificationPhase3ChemistryUnitNodes,
          key: "qualification-phase-3-chemistry",
          materialDomain: "chemistry",
          order: 30,
          translations: CHEMISTRY,
        }),
      ],
      displayGroup: QUALIFICATION_PHASE,
      displayGroupIconKey: "high-school",
      iconKey: "certificate",
      key: "qualification-phase-3",
      levelBand: "upper-secondary",
      order: 40,
      translations: {
        de: { routeSlug: "q3", title: "Q3" },
        en: { routeSlug: "q3", title: "Q3" },
        id: { routeSlug: "q3", title: "Q3" },
        ms: { routeSlug: "q3", title: "Q3" },
      },
    }),
    classNode({
      children: [
        subjectNode({
          children: qualificationPhase4MathematicsUnitNodes,
          key: "qualification-phase-4-mathematics",
          materialDomain: "mathematics",
          order: 10,
          translations: MATHEMATICS,
        }),
        subjectNode({
          children: qualificationPhase4PhysicsUnitNodes,
          key: "qualification-phase-4-physics",
          materialDomain: "physics",
          order: 20,
          translations: PHYSICS,
        }),
        subjectNode({
          children: qualificationPhase4ChemistryUnitNodes,
          key: "qualification-phase-4-chemistry",
          materialDomain: "chemistry",
          order: 30,
          translations: CHEMISTRY,
        }),
        subjectNode({
          children: qualificationPhase4BiologyUnitNodes,
          key: "qualification-phase-4-biology",
          materialDomain: "biology",
          order: 40,
          translations: BIOLOGY,
        }),
      ],
      displayGroup: QUALIFICATION_PHASE,
      displayGroupIconKey: "high-school",
      iconKey: "diploma",
      key: "qualification-phase-4",
      levelBand: "upper-secondary",
      order: 50,
      translations: {
        de: { routeSlug: "q4", title: "Q4" },
        en: { routeSlug: "q4", title: "Q4" },
        id: { routeSlug: "q4", title: "Q4" },
        ms: { routeSlug: "q4", title: "Q4" },
      },
    }),
  ],
});
