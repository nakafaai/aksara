import {
  chemistryCoreCurriculum,
  chemistryEducationStandards,
} from "#corpus/curriculum/gymnasiale-oberstufe/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** Q3 Chemie: Redoxgleichgewichte. */
const qualificationPhase3ChemistryUnit1 = unitNode({
  children: [
    materialNode({
      key: "qualification-phase-3-chemistry-redox-redox-equilibrium",
      level: "lesson",
      materialKeys: ["lesson.chemistry.redox-equilibrium"],
      order: 10,
      outcomes: [
        { code: "Chemie Q3.3 Redoxgleichgewichte", ...chemistryCoreCurriculum },
        {
          code: "Inhaltsbereich 2.6.2 Chemische Reaktionen (Elektronenübergänge)",
          ...chemistryEducationStandards,
        },
      ],
    }),
  ],
  key: "qualification-phase-3-chemistry-redox",
  materialCard: {
    de: {
      description: "Baue eine Zelle, elektrolysiere und stoppe Rost.",
      title: "Redoxgleichgewichte",
    },
    en: {
      description: "Build a cell, run electrolysis and stop rust.",
      title: "Redox equilibria",
    },
    id: {
      description: "Rakit sel, jalankan elektrolisis, dan cegah karat.",
      title: "Kesetimbangan redoks",
    },
    ms: {
      description: "Bina sel, jalankan elektrolisis dan cegah karat.",
      title: "Keseimbangan redoks",
    },
  },
  order: 10,
  translations: {
    de: { routeSlug: "redoxgleichgewichte", title: "Redoxgleichgewichte" },
    en: { routeSlug: "redox-equilibria", title: "Redox equilibria" },
    id: { routeSlug: "kesetimbangan-redoks", title: "Kesetimbangan redoks" },
    ms: { routeSlug: "keseimbangan-redoks", title: "Keseimbangan redoks" },
  },
});

/** Q3 Chemie: Geschwindigkeit chemischer Reaktionen. */
const qualificationPhase3ChemistryUnit2 = unitNode({
  children: [
    materialNode({
      key: "qualification-phase-3-chemistry-rate-reaction-rate",
      level: "lesson",
      materialKeys: ["lesson.chemistry.reaction-rate"],
      order: 10,
      outcomes: [
        {
          code: "Chemie Q3.5 Geschwindigkeit chemischer Reaktionen",
          ...chemistryCoreCurriculum,
        },
        {
          code: "Inhaltsbereich 2.6.2 Chemische Reaktionen (Energetische und kinetische Aspekte)",
          ...chemistryEducationStandards,
        },
      ],
    }),
  ],
  key: "qualification-phase-3-chemistry-rate",
  materialCard: {
    de: {
      description: "Warum Wärme und Katalysatoren Reaktionen beschleunigen.",
      title: "Geschwindigkeit chemischer Reaktionen",
    },
    en: {
      description: "Why heat and catalysts make reactions faster.",
      title: "Rates of chemical reactions",
    },
    id: {
      description: "Mengapa panas dan katalis mempercepat reaksi.",
      title: "Laju reaksi kimia",
    },
    ms: {
      description: "Mengapa haba dan mangkin mempercepat tindak balas.",
      title: "Kadar tindak balas kimia",
    },
  },
  order: 20,
  translations: {
    de: {
      routeSlug: "geschwindigkeit-chemischer-reaktionen",
      title: "Geschwindigkeit chemischer Reaktionen",
    },
    en: {
      routeSlug: "rates-of-chemical-reactions",
      title: "Rates of chemical reactions",
    },
    id: { routeSlug: "laju-reaksi-kimia", title: "Laju reaksi kimia" },
    ms: {
      routeSlug: "kadar-tindak-balas-kimia",
      title: "Kadar tindak balas kimia",
    },
  },
});

/** Q3 Chemie: the Themenfelder of the Hessen Kerncurriculum Chemie that a lesson teaches, in its order */
export const qualificationPhase3ChemistryUnitNodes = [
  qualificationPhase3ChemistryUnit1,
  qualificationPhase3ChemistryUnit2,
];
