import { materialNode, unitNode } from "#corpus/curriculum/schema";
import { hannoverChemistry } from "#corpus/curriculum/studienkolleg/documents";

/** Hannover M-Kurs Chemie: Allgemeine Chemie. */
const hannoverMedicalChemistryUnit1 = unitNode({
  children: [
    materialNode({
      key: "hannover-m-chemistry-general-structure-matter",
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
      key: "hannover-m-chemistry-general-periodic-groups",
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
      key: "hannover-m-chemistry-general-chemical-bond",
      level: "lesson",
      materialKeys: ["lesson.chemistry.chemical-bond"],
      order: 30,
      outcomes: [
        {
          code: "Allgemeine Chemie: Chemische Bindungen",
          ...hannoverChemistry,
        },
        {
          code: "Allgemeine Chemie: Komplexe Bindungen (M)",
          ...hannoverChemistry,
        },
      ],
    }),
    materialNode({
      key: "hannover-m-chemistry-general-basic-chemistry-laws",
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
      key: "hannover-m-chemistry-general-mole-concept",
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
      key: "hannover-m-chemistry-general-chemistry-introduction",
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
      key: "hannover-m-chemistry-general-green-chemistry",
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
  key: "hannover-m-chemistry-general",
  materialCard: {
    de: {
      description: "Vom Atombau bis zur Komplexbindung.",
      title: "Allgemeine Chemie",
    },
    en: {
      description: "From atomic structure to complex bonds.",
      title: "General chemistry",
    },
    id: {
      description: "Dari struktur atom hingga ikatan kompleks.",
      title: "Kimia umum",
    },
    ms: {
      description: "Daripada struktur atom hingga ikatan kompleks.",
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

/** Hannover M-Kurs Chemie: Anorganische Chemie. */
const hannoverMedicalChemistryUnit2 = unitNode({
  children: [
    materialNode({
      key: "hannover-m-chemistry-inorganic-redox-equilibrium",
      level: "lesson",
      materialKeys: ["lesson.chemistry.redox-equilibrium"],
      order: 10,
      outcomes: [
        {
          code: "Anorganische Chemie: Reduktions- und Oxidationsreaktionen",
          ...hannoverChemistry,
        },
        { code: "Anorganische Chemie: Elektrochemie", ...hannoverChemistry },
      ],
    }),
    materialNode({
      key: "hannover-m-chemistry-inorganic-acid-base-salt",
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
  key: "hannover-m-chemistry-inorganic",
  materialCard: {
    de: {
      description: "Redox, Säuren und Basen, wie sie im Körper wirken.",
      title: "Anorganische Chemie",
    },
    en: {
      description: "Redox, acids and bases, as the body uses them.",
      title: "Inorganic chemistry",
    },
    id: {
      description: "Redoks, asam, dan basa seperti dipakai tubuh.",
      title: "Kimia anorganik",
    },
    ms: {
      description: "Redoks, asid dan bes seperti digunakan badan.",
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

/** Hannover M-Kurs Chemie: Organische Chemie. */
const hannoverMedicalChemistryUnit3 = unitNode({
  children: [
    materialNode({
      key: "hannover-m-chemistry-organic-carbon-compound",
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
  ],
  key: "hannover-m-chemistry-organic",
  materialCard: {
    de: {
      description: "Alkohole, Säuren und Ester, Schritt für Schritt.",
      title: "Organische Chemie",
    },
    en: {
      description: "Alcohols, acids and esters, step by step.",
      title: "Organic chemistry",
    },
    id: {
      description: "Alkohol, asam, dan ester langkah demi langkah.",
      title: "Kimia organik",
    },
    ms: {
      description: "Alkohol, asid dan ester langkah demi langkah.",
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

/** Hannover M-Kurs Chemie: the headings of its Prüfungsinhalte list, each with the lessons that teach its M-Kurs items */
export const hannoverMedicalChemistryUnitNodes = [
  hannoverMedicalChemistryUnit1,
  hannoverMedicalChemistryUnit2,
  hannoverMedicalChemistryUnit3,
];
