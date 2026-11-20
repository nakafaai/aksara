import { materialNode, unitNode } from "#corpus/curriculum/schema";
import { hannoverChemistry } from "#corpus/curriculum/studienkolleg/documents";

/** Hannover T-Kurs Chemie: Allgemeine Chemie. */
const hannoverTechnicalChemistryUnit1 = unitNode({
  children: [
    materialNode({
      key: "hannover-t-chemistry-general-structure-matter",
      level: "lesson",
      materialKeys: ["lesson.chemistry.structure-matter"],
      order: 10,
      outcomes: [
        {
          code: "Allgemeine Chemie: Atombau und Periodensystem",
          ...hannoverChemistry,
        },
      ],
    }),
    materialNode({
      key: "hannover-t-chemistry-general-periodic-groups",
      level: "lesson",
      materialKeys: ["lesson.chemistry.periodic-groups"],
      order: 20,
      outcomes: [
        {
          code: "Allgemeine Chemie: Atombau und Periodensystem",
          ...hannoverChemistry,
        },
      ],
    }),
    materialNode({
      key: "hannover-t-chemistry-general-chemical-bond",
      level: "lesson",
      materialKeys: ["lesson.chemistry.chemical-bond"],
      order: 30,
      outcomes: [
        {
          code: "Allgemeine Chemie: Chemische Bindungen",
          ...hannoverChemistry,
        },
      ],
    }),
    materialNode({
      key: "hannover-t-chemistry-general-basic-chemistry-laws",
      level: "lesson",
      materialKeys: ["lesson.chemistry.basic-chemistry-laws"],
      order: 40,
      outcomes: [
        {
          code: "Allgemeine Chemie: Formulierung und Berechnung chemische Reaktionen",
          ...hannoverChemistry,
        },
        {
          code: "Allgemeine Chemie: Reaktionsprinzipien",
          ...hannoverChemistry,
        },
      ],
    }),
    materialNode({
      key: "hannover-t-chemistry-general-mole-concept",
      level: "lesson",
      materialKeys: ["lesson.chemistry.mole-concept"],
      order: 50,
      outcomes: [
        {
          code: "Allgemeine Chemie: Formulierung und Berechnung chemische Reaktionen",
          ...hannoverChemistry,
        },
      ],
    }),
    materialNode({
      key: "hannover-t-chemistry-general-chemistry-introduction",
      level: "lesson",
      materialKeys: ["lesson.chemistry.chemistry-introduction"],
      order: 60,
      outcomes: [
        {
          code: "Allgemeine Chemie: Beschreibung und Auswertung von Experimenten",
          ...hannoverChemistry,
        },
        { code: "Allgemeine Chemie: Arbeitssicherheit", ...hannoverChemistry },
      ],
    }),
    materialNode({
      key: "hannover-t-chemistry-general-green-chemistry",
      level: "lesson",
      materialKeys: ["lesson.chemistry.green-chemistry"],
      order: 70,
      outcomes: [
        {
          code: "Allgemeine Chemie: ökologische Einflüsse durch Chemikalien",
          ...hannoverChemistry,
        },
      ],
    }),
  ],
  key: "hannover-t-chemistry-general",
  materialCard: {
    de: {
      description: "Atome, Bindungen und das Rechnen mit Stoffmengen.",
      title: "Allgemeine Chemie",
    },
    en: {
      description: "Atoms, bonds and counting particles in moles.",
      title: "General chemistry",
    },
    id: {
      description: "Atom, ikatan, dan menghitung partikel dalam mol.",
      title: "Kimia umum",
    },
    ms: {
      description: "Atom, ikatan dan mengira zarah dalam mol.",
      title: "Kimia am",
    },
  },
  order: 10,
  translations: {
    de: { routeSlug: "allgemeine-chemie", title: "Allgemeine Chemie" },
    en: { routeSlug: "general-chemistry", title: "General chemistry" },
    id: { routeSlug: "kimia-umum", title: "Kimia umum" },
    ms: { routeSlug: "kimia-am", title: "Kimia am" },
  },
});

/** Hannover T-Kurs Chemie: Anorganische Chemie. */
const hannoverTechnicalChemistryUnit2 = unitNode({
  children: [
    materialNode({
      key: "hannover-t-chemistry-inorganic-redox-equilibrium",
      level: "lesson",
      materialKeys: ["lesson.chemistry.redox-equilibrium"],
      order: 10,
      outcomes: [
        {
          code: "Anorganische Chemie: Reduktions- und Oxidationsreaktionen",
          ...hannoverChemistry,
        },
        { code: "Anorganische Chemie: Elektrochemie", ...hannoverChemistry },
        {
          code: "Anorganische Chemie: Elektrolyse und Korrosion (T)",
          ...hannoverChemistry,
        },
      ],
    }),
    materialNode({
      key: "hannover-t-chemistry-inorganic-acid-base-salt",
      level: "lesson",
      materialKeys: ["lesson.chemistry.acid-base-salt"],
      order: 20,
      outcomes: [
        {
          code: "Anorganische Chemie: Säure-Base-Reaktionen",
          ...hannoverChemistry,
        },
        { code: "Anorganische Chemie: Titrationen", ...hannoverChemistry },
        {
          code: "Allgemeine Chemie: Herstellung definierter Lösungen",
          ...hannoverChemistry,
        },
      ],
    }),
  ],
  key: "hannover-t-chemistry-inorganic",
  materialCard: {
    de: {
      description: "Elektronen und Protonen wechseln den Partner.",
      title: "Anorganische Chemie",
    },
    en: {
      description: "Electrons and protons change partners.",
      title: "Inorganic chemistry",
    },
    id: {
      description: "Elektron dan proton berpindah pasangan.",
      title: "Kimia anorganik",
    },
    ms: {
      description: "Elektron dan proton bertukar pasangan.",
      title: "Kimia tak organik",
    },
  },
  order: 20,
  translations: {
    de: { routeSlug: "anorganische-chemie", title: "Anorganische Chemie" },
    en: { routeSlug: "inorganic-chemistry", title: "Inorganic chemistry" },
    id: { routeSlug: "kimia-anorganik", title: "Kimia anorganik" },
    ms: { routeSlug: "kimia-tak-organik", title: "Kimia tak organik" },
  },
});

/** Hannover T-Kurs Chemie: Organische Chemie. */
const hannoverTechnicalChemistryUnit3 = unitNode({
  children: [
    materialNode({
      key: "hannover-t-chemistry-organic-carbon-compound",
      level: "lesson",
      materialKeys: ["lesson.chemistry.carbon-compound"],
      order: 10,
      outcomes: [
        {
          code: "Organische Chemie: Alkane und ihre Oxidationsprodukte",
          ...hannoverChemistry,
        },
        { code: "Organische Chemie: Nomenklaturregeln", ...hannoverChemistry },
        { code: "Organische Chemie: Ether und Ester", ...hannoverChemistry },
      ],
    }),
    materialNode({
      key: "hannover-t-chemistry-organic-polymer",
      level: "lesson",
      materialKeys: ["lesson.chemistry.polymer"],
      order: 20,
      outcomes: [
        { code: "Organische Chemie: Kunststoffe (T)", ...hannoverChemistry },
      ],
    }),
  ],
  key: "hannover-t-chemistry-organic",
  materialCard: {
    de: {
      description: "Ketten aus Kohlenstoff, vom Alkan bis zum Kunststoff.",
      title: "Organische Chemie",
    },
    en: {
      description: "Carbon chains, from alkanes to plastics.",
      title: "Organic chemistry",
    },
    id: {
      description: "Rantai karbon, dari alkana sampai plastik.",
      title: "Kimia organik",
    },
    ms: {
      description: "Rantai karbon, daripada alkana hingga plastik.",
      title: "Kimia organik",
    },
  },
  order: 30,
  translations: {
    de: { routeSlug: "organische-chemie", title: "Organische Chemie" },
    en: { routeSlug: "organic-chemistry", title: "Organic chemistry" },
    id: { routeSlug: "kimia-organik", title: "Kimia organik" },
    ms: { routeSlug: "kimia-organik", title: "Kimia organik" },
  },
});

/** Hannover T-Kurs Chemie: the headings of its Prüfungsinhalte list, each with the lessons that teach its T-Kurs items */
export const hannoverTechnicalChemistryUnitNodes = [
  hannoverTechnicalChemistryUnit1,
  hannoverTechnicalChemistryUnit2,
  hannoverTechnicalChemistryUnit3,
];
