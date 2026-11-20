import { introductoryPhaseMathematicsUnitNodes } from "#corpus/curriculum/gymnasiale-oberstufe/introductory-phase/mathematics";
import { qualificationPhase1MathematicsUnitNodes } from "#corpus/curriculum/gymnasiale-oberstufe/qualification-phase-1/mathematics";
import { qualificationPhase2MathematicsUnitNodes } from "#corpus/curriculum/gymnasiale-oberstufe/qualification-phase-2/mathematics";
import { qualificationPhase3MathematicsUnitNodes } from "#corpus/curriculum/gymnasiale-oberstufe/qualification-phase-3/mathematics";
import { qualificationPhase4MathematicsUnitNodes } from "#corpus/curriculum/gymnasiale-oberstufe/qualification-phase-4/mathematics";
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

/** The one subject of every Kurshalbjahr so far, named in each locale. */
const MATHEMATICS = {
  de: { routeSlug: "mathematik", title: "Mathematik" },
  en: { routeSlug: "mathematics", title: "Mathematics" },
  id: { routeSlug: "matematika", title: "Matematika" },
  ms: { routeSlug: "matematik", title: "Matematik" },
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
