import {
  chemistryCoreCurriculum,
  chemistryEducationStandards,
} from "#corpus/curriculum/gymnasiale-oberstufe/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** Einführungsphase Chemie: Redoxreaktionen. */
const introductoryPhaseChemistryUnit1 = unitNode({
  children: [
    materialNode({
      key: "introductory-phase-chemistry-redox-redox-equilibrium",
      level: "lesson",
      materialKeys: ["lesson.chemistry.redox-equilibrium"],
      order: 10,
      outcomes: [
        { code: "Chemie E.1 Redoxreaktionen", ...chemistryCoreCurriculum },
        {
          code: "Inhaltsbereich 2.6.2 Chemische Reaktionen (Elektronenübergänge)",
          ...chemistryEducationStandards,
        },
      ],
    }),
  ],
  key: "introductory-phase-chemistry-redox",
  materialCard: {
    de: {
      description: "Verfolge, wohin die Elektronen wandern.",
      title: "Redoxreaktionen",
    },
    en: {
      description: "Follow where the electrons go.",
      title: "Redox reactions",
    },
    id: {
      description: "Ikuti ke mana elektron berpindah.",
      title: "Reaksi redoks",
    },
    ms: {
      description: "Ikuti ke mana elektron berpindah.",
      title: "Tindak balas redoks",
    },
  },
  order: 10,
  translations: {
    de: { routeSlug: "redoxreaktionen", title: "Redoxreaktionen" },
    en: { routeSlug: "redox-reactions", title: "Redox reactions" },
    id: { routeSlug: "reaksi-redoks", title: "Reaksi redoks" },
    ms: { routeSlug: "tindak-balas-redoks", title: "Tindak balas redoks" },
  },
});

/** Einführungsphase Chemie: Protolysereaktionen. */
const introductoryPhaseChemistryUnit2 = unitNode({
  children: [
    materialNode({
      key: "introductory-phase-chemistry-protolysis-mole-concept",
      level: "lesson",
      materialKeys: ["lesson.chemistry.mole-concept"],
      order: 10,
      outcomes: [
        {
          code: "Chemie E.2 Protolysereaktionen (Masse, molare Masse, Stoffmenge, Konzentration)",
          ...chemistryCoreCurriculum,
        },
      ],
    }),
    materialNode({
      key: "introductory-phase-chemistry-protolysis-acid-base-salt",
      level: "lesson",
      materialKeys: ["lesson.chemistry.acid-base-salt"],
      order: 20,
      outcomes: [
        { code: "Chemie E.2 Protolysereaktionen", ...chemistryCoreCurriculum },
        {
          code: "Inhaltsbereich 2.6.2 Chemische Reaktionen (Protonenübergänge)",
          ...chemistryEducationStandards,
        },
        {
          code: "Inhaltsbereich 2.6.3 Arbeitsweisen (Säure-Base-Titration)",
          ...chemistryEducationStandards,
        },
      ],
    }),
  ],
  key: "introductory-phase-chemistry-protolysis",
  materialCard: {
    de: {
      description: "Miss den pH-Wert und titriere eine Säure.",
      title: "Protolysereaktionen",
    },
    en: {
      description: "Measure pH and titrate an acid step by step.",
      title: "Proton-transfer reactions",
    },
    id: {
      description: "Ukur pH dan titrasi asam langkah demi langkah.",
      title: "Reaksi protolisis",
    },
    ms: {
      description: "Sukat pH dan titratkan asid langkah demi langkah.",
      title: "Tindak balas protolisis",
    },
  },
  order: 20,
  translations: {
    de: { routeSlug: "protolysereaktionen", title: "Protolysereaktionen" },
    en: {
      routeSlug: "proton-transfer-reactions",
      title: "Proton-transfer reactions",
    },
    id: { routeSlug: "reaksi-protolisis", title: "Reaksi protolisis" },
    ms: {
      routeSlug: "tindak-balas-protolisis",
      title: "Tindak balas protolisis",
    },
  },
});

/** Einführungsphase Chemie: Einführung in die Chemie organischer Verbindungen. */
const introductoryPhaseChemistryUnit3 = unitNode({
  children: [
    materialNode({
      key: "introductory-phase-chemistry-organic-chemical-bond",
      level: "lesson",
      materialKeys: ["lesson.chemistry.chemical-bond"],
      order: 10,
      outcomes: [
        {
          code: "Chemie E.3 Einführung in die Chemie organischer Verbindungen (Elektronenpaarbindung, Polarität, Wasserstoffbrücken)",
          ...chemistryCoreCurriculum,
        },
        {
          code: "Inhaltsbereich 2.6.1 Stoffe, Strukturen, Eigenschaften (Chemische Bindung)",
          ...chemistryEducationStandards,
        },
      ],
    }),
    materialNode({
      key: "introductory-phase-chemistry-organic-carbon-compound",
      level: "lesson",
      materialKeys: ["lesson.chemistry.carbon-compound"],
      order: 20,
      outcomes: [
        {
          code: "Chemie E.3 Einführung in die Chemie organischer Verbindungen",
          ...chemistryCoreCurriculum,
        },
        {
          code: "Inhaltsbereich 2.6.1 Stoffe, Strukturen, Eigenschaften (Verbindungen mit funktionellen Gruppen)",
          ...chemistryEducationStandards,
        },
      ],
    }),
  ],
  key: "introductory-phase-chemistry-organic",
  materialCard: {
    de: {
      description: "Lerne Kohlenstoffketten benennen und vergleichen.",
      title: "Einführung in die Chemie organischer Verbindungen",
    },
    en: {
      description: "Name carbon chains and compare how they behave.",
      title: "Introduction to organic compounds",
    },
    id: {
      description: "Beri nama rantai karbon dan bandingkan sifatnya.",
      title: "Pengantar senyawa organik",
    },
    ms: {
      description: "Namakan rantai karbon dan bandingkan sifatnya.",
      title: "Pengenalan sebatian organik",
    },
  },
  order: 30,
  translations: {
    de: {
      routeSlug: "einfuehrung-organische-verbindungen",
      title: "Einführung in die Chemie organischer Verbindungen",
    },
    en: {
      routeSlug: "introduction-to-organic-compounds",
      title: "Introduction to organic compounds",
    },
    id: {
      routeSlug: "pengantar-senyawa-organik",
      title: "Pengantar senyawa organik",
    },
    ms: {
      routeSlug: "pengenalan-sebatian-organik",
      title: "Pengenalan sebatian organik",
    },
  },
});

/** Einführungsphase Chemie: the Themenfelder of the Hessen Kerncurriculum Chemie that a lesson teaches, in its order */
export const introductoryPhaseChemistryUnitNodes = [
  introductoryPhaseChemistryUnit1,
  introductoryPhaseChemistryUnit2,
  introductoryPhaseChemistryUnit3,
];
