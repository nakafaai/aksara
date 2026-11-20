import {
  chemistryCoreCurriculum,
  chemistryEducationStandards,
} from "#corpus/curriculum/gymnasiale-oberstufe/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** Q4 Chemie: Energetische und kinetische Aspekte chemischer Reaktionen. */
const qualificationPhase4ChemistryUnit1 = unitNode({
  children: [
    materialNode({
      key: "qualification-phase-4-chemistry-energetics-thermochemistry",
      level: "lesson",
      materialKeys: ["lesson.chemistry.thermochemistry"],
      order: 10,
      outcomes: [
        {
          code: "Chemie Q4.1 Energetische und kinetische Aspekte chemischer Reaktionen",
          ...chemistryCoreCurriculum,
        },
        {
          code: "Inhaltsbereich 2.6.2 Chemische Reaktionen (Energetische und kinetische Aspekte)",
          ...chemistryEducationStandards,
        },
      ],
    }),
  ],
  key: "qualification-phase-4-chemistry-energetics",
  materialCard: {
    de: {
      description: "Miss die Wärme, die eine Reaktion abgibt oder aufnimmt.",
      title: "Energetische und kinetische Aspekte chemischer Reaktionen",
    },
    en: {
      description: "Measure the heat a reaction gives out or takes in.",
      title: "Energy and kinetics of chemical reactions",
    },
    id: {
      description: "Ukur kalor yang dilepas atau diserap reaksi.",
      title: "Energi dan kinetika reaksi kimia",
    },
    ms: {
      description: "Sukat haba yang dibebaskan atau diserap tindak balas.",
      title: "Tenaga dan kinetik tindak balas kimia",
    },
  },
  order: 10,
  translations: {
    de: {
      routeSlug: "energetische-und-kinetische-aspekte",
      title: "Energetische und kinetische Aspekte chemischer Reaktionen",
    },
    en: {
      routeSlug: "energy-and-kinetics-of-reactions",
      title: "Energy and kinetics of chemical reactions",
    },
    id: {
      routeSlug: "energi-dan-kinetika-reaksi",
      title: "Energi dan kinetika reaksi kimia",
    },
    ms: {
      routeSlug: "tenaga-dan-kinetik-tindak-balas",
      title: "Tenaga dan kinetik tindak balas kimia",
    },
  },
});

/** Q4 Chemie: the Themenfelder of the Hessen Kerncurriculum Chemie that a lesson teaches, in its order */
export const qualificationPhase4ChemistryUnitNodes = [
  qualificationPhase4ChemistryUnit1,
];
