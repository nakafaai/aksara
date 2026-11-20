import {
  chemistryCoreCurriculum,
  chemistryEducationStandards,
} from "#corpus/curriculum/gymnasiale-oberstufe/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** Q1 Chemie: Chemische Bindung und Strukturen ausgewählter anorganischer und organischer Stoffe. */
const qualificationPhase1ChemistryUnit1 = unitNode({
  children: [
    materialNode({
      key: "qualification-phase-1-chemistry-bonding-chemical-bond",
      level: "lesson",
      materialKeys: ["lesson.chemistry.chemical-bond"],
      order: 10,
      outcomes: [
        {
          code: "Chemie Q1.1 Chemische Bindung und Strukturen ausgewählter anorganischer und organischer Stoffe",
          ...chemistryCoreCurriculum,
        },
        {
          code: "Inhaltsbereich 2.6.1 Stoffe, Strukturen, Eigenschaften (Chemische Bindung)",
          ...chemistryEducationStandards,
        },
      ],
    }),
    materialNode({
      key: "qualification-phase-1-chemistry-bonding-carbon-compound",
      level: "lesson",
      materialKeys: ["lesson.chemistry.carbon-compound"],
      order: 20,
      outcomes: [
        {
          code: "Chemie Q1.1 (Alkane, Alkene, Alkine)",
          ...chemistryCoreCurriculum,
        },
        {
          code: "Chemie Q1.2 Alkanole und Carbonylverbindungen (Alkanole)",
          ...chemistryCoreCurriculum,
        },
        {
          code: "Chemie Q1.3 Alkansäuren und ihre Derivate (Ester)",
          ...chemistryCoreCurriculum,
        },
        {
          code: "Inhaltsbereich 2.6.1 Stoffe, Strukturen, Eigenschaften (Verbindungen mit funktionellen Gruppen)",
          ...chemistryEducationStandards,
        },
      ],
    }),
  ],
  key: "qualification-phase-1-chemistry-bonding",
  materialCard: {
    de: {
      description: "Bindungen bestimmen, wie sich ein Stoff verhält.",
      title:
        "Chemische Bindung und Strukturen ausgewählter anorganischer und organischer Stoffe",
    },
    en: {
      description: "Bonds decide how a substance behaves.",
      title: "Chemical bonding and the structures of selected substances",
    },
    id: {
      description: "Ikatan menentukan sifat suatu zat.",
      title: "Ikatan kimia dan struktur zat terpilih",
    },
    ms: {
      description: "Ikatan menentukan sifat sesuatu bahan.",
      title: "Ikatan kimia dan struktur bahan terpilih",
    },
  },
  order: 10,
  translations: {
    de: {
      routeSlug: "chemische-bindung-und-strukturen",
      title:
        "Chemische Bindung und Strukturen ausgewählter anorganischer und organischer Stoffe",
    },
    en: {
      routeSlug: "chemical-bonding-and-structures",
      title: "Chemical bonding and the structures of selected substances",
    },
    id: {
      routeSlug: "ikatan-kimia-dan-struktur",
      title: "Ikatan kimia dan struktur zat terpilih",
    },
    ms: {
      routeSlug: "ikatan-kimia-dan-struktur",
      title: "Ikatan kimia dan struktur bahan terpilih",
    },
  },
});

/** Q1 Chemie: Seifen. */
const qualificationPhase1ChemistryUnit2 = unitNode({
  children: [
    materialNode({
      key: "qualification-phase-1-chemistry-soaps-consumer-industrial-chemistry",
      level: "lesson",
      materialKeys: ["lesson.chemistry.consumer-industrial-chemistry"],
      order: 10,
      outcomes: [
        { code: "Chemie Q1.4 Seifen", ...chemistryCoreCurriculum },
        {
          code: "Chemie Q1.5 Konservierungsstoffe",
          ...chemistryCoreCurriculum,
        },
        {
          code: "Inhaltsbereich 2.6.4 Lebenswelt und Gesellschaft (Aktuelle Technologien und chemische Produkte)",
          ...chemistryEducationStandards,
        },
      ],
    }),
  ],
  key: "qualification-phase-1-chemistry-soaps",
  materialCard: {
    de: {
      description: "Wie Seife Fett vom Teller in Wasser löst.",
      title: "Seifen",
    },
    en: {
      description: "How soap lifts grease off a plate into water.",
      title: "Soaps",
    },
    id: {
      description: "Cara sabun melepas lemak dari piring ke air.",
      title: "Sabun",
    },
    ms: {
      description: "Cara sabun menanggalkan lemak dari pinggan ke air.",
      title: "Sabun",
    },
  },
  order: 20,
  translations: {
    de: { routeSlug: "seifen", title: "Seifen" },
    en: { routeSlug: "soaps", title: "Soaps" },
    id: { routeSlug: "sabun", title: "Sabun" },
    ms: { routeSlug: "sabun", title: "Sabun" },
  },
});

/** Q1 Chemie: the Themenfelder of the Hessen Kerncurriculum Chemie that a lesson teaches, in its order */
export const qualificationPhase1ChemistryUnitNodes = [
  qualificationPhase1ChemistryUnit1,
  qualificationPhase1ChemistryUnit2,
];
