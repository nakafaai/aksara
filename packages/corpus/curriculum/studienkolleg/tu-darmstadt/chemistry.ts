import { materialNode, unitNode } from "#corpus/curriculum/schema";
import { darmstadtChemistry } from "#corpus/curriculum/studienkolleg/documents";

/** Darmstadt T-Kurs Chemie: Stöchiometrie und Gasgesetze. */
const tuDarmstadtTechnicalChemistryUnit1 = unitNode({
  children: [
    materialNode({
      key: "tu-darmstadt-t-chemistry-stoichiometry-mole-concept",
      level: "lesson",
      materialKeys: ["lesson.chemistry.mole-concept"],
      order: 10,
      outcomes: [
        {
          code: "Themenbereich: Stöchiometrie und Gasgesetze",
          ...darmstadtChemistry,
        },
      ],
    }),
    materialNode({
      key: "tu-darmstadt-t-chemistry-stoichiometry-basic-chemistry-laws",
      level: "lesson",
      materialKeys: ["lesson.chemistry.basic-chemistry-laws"],
      order: 20,
      outcomes: [
        {
          code: "Themenbereich: Stöchiometrie und Gasgesetze",
          ...darmstadtChemistry,
        },
      ],
    }),
  ],
  key: "tu-darmstadt-t-chemistry-stoichiometry",
  materialCard: {
    de: {
      description: "Zähle Teilchen in Mol und wiege die Reaktion ab.",
      title: "Stöchiometrie und Gasgesetze",
    },
    en: {
      description: "Count particles in moles and balance the reaction.",
      title: "Stoichiometry and gas laws",
    },
    id: {
      description: "Hitung partikel dalam mol dan setarakan reaksi.",
      title: "Stoikiometri dan hukum gas",
    },
    ms: {
      description: "Kira zarah dalam mol dan seimbangkan tindak balas.",
      title: "Stoikiometri dan hukum gas",
    },
  },
  order: 10,
  translations: {
    de: {
      routeSlug: "stoechiometrie-und-gasgesetze",
      title: "Stöchiometrie und Gasgesetze",
    },
    en: {
      routeSlug: "stoichiometry-and-gas-laws",
      title: "Stoichiometry and gas laws",
    },
    id: {
      routeSlug: "stoikiometri-dan-hukum-gas",
      title: "Stoikiometri dan hukum gas",
    },
    ms: {
      routeSlug: "stoikiometri-dan-hukum-gas",
      title: "Stoikiometri dan hukum gas",
    },
  },
});

/** Darmstadt T-Kurs Chemie: Atommodelle. */
const tuDarmstadtTechnicalChemistryUnit2 = unitNode({
  children: [
    materialNode({
      key: "tu-darmstadt-t-chemistry-atomic-models-structure-matter",
      level: "lesson",
      materialKeys: ["lesson.chemistry.structure-matter"],
      order: 10,
      outcomes: [{ code: "Themenbereich: Atommodelle", ...darmstadtChemistry }],
    }),
  ],
  key: "tu-darmstadt-t-chemistry-atomic-models",
  materialCard: {
    de: {
      description: "Vom Kügelchen zur Elektronenwolke.",
      title: "Atommodelle",
    },
    en: {
      description: "From a tiny ball to an electron cloud.",
      title: "Atomic models",
    },
    id: {
      description: "Dari bola kecil ke awan elektron.",
      title: "Model atom",
    },
    ms: {
      description: "Daripada bola kecil ke awan elektron.",
      title: "Model atom",
    },
  },
  order: 20,
  translations: {
    de: { routeSlug: "atommodelle", title: "Atommodelle" },
    en: { routeSlug: "atomic-models", title: "Atomic models" },
    id: { routeSlug: "model-atom", title: "Model atom" },
    ms: { routeSlug: "model-atom", title: "Model atom" },
  },
});

/** Darmstadt T-Kurs Chemie: Die chemische Bindung. */
const tuDarmstadtTechnicalChemistryUnit3 = unitNode({
  children: [
    materialNode({
      key: "tu-darmstadt-t-chemistry-bonding-chemical-bond",
      level: "lesson",
      materialKeys: ["lesson.chemistry.chemical-bond"],
      order: 10,
      outcomes: [
        { code: "Themenbereich: die chemische Bindung", ...darmstadtChemistry },
      ],
    }),
  ],
  key: "tu-darmstadt-t-chemistry-bonding",
  materialCard: {
    de: {
      description: "Warum Atome Elektronen teilen oder abgeben.",
      title: "Die chemische Bindung",
    },
    en: {
      description: "Why atoms share or hand over electrons.",
      title: "Chemical bonding",
    },
    id: {
      description: "Mengapa atom berbagi atau menyerahkan elektron.",
      title: "Ikatan kimia",
    },
    ms: {
      description: "Mengapa atom berkongsi atau menyerahkan elektron.",
      title: "Ikatan kimia",
    },
  },
  order: 30,
  translations: {
    de: { routeSlug: "die-chemische-bindung", title: "Die chemische Bindung" },
    en: { routeSlug: "chemical-bonding", title: "Chemical bonding" },
    id: { routeSlug: "ikatan-kimia", title: "Ikatan kimia" },
    ms: { routeSlug: "ikatan-kimia", title: "Ikatan kimia" },
  },
});

/** Darmstadt T-Kurs Chemie: Säure-Base-Theorien, pH-Wert-Berechnungen. */
const tuDarmstadtTechnicalChemistryUnit4 = unitNode({
  children: [
    materialNode({
      key: "tu-darmstadt-t-chemistry-acids-bases-acid-base-salt",
      level: "lesson",
      materialKeys: ["lesson.chemistry.acid-base-salt"],
      order: 10,
      outcomes: [
        {
          code: "Themenbereich: Säure-Base-Theorien, pH-Wert-Berechnungen",
          ...darmstadtChemistry,
        },
      ],
    }),
  ],
  key: "tu-darmstadt-t-chemistry-acids-bases",
  materialCard: {
    de: {
      description: "Rechne den pH-Wert einer Säure aus.",
      title: "Säure-Base-Theorien, pH-Wert-Berechnungen",
    },
    en: {
      description: "Work out the pH of an acid.",
      title: "Acid-base theories and pH calculations",
    },
    id: {
      description: "Hitung pH suatu asam.",
      title: "Teori asam-basa dan perhitungan pH",
    },
    ms: {
      description: "Kira pH sesuatu asid.",
      title: "Teori asid-bes dan pengiraan pH",
    },
  },
  order: 40,
  translations: {
    de: {
      routeSlug: "saeure-base-theorien",
      title: "Säure-Base-Theorien, pH-Wert-Berechnungen",
    },
    en: {
      routeSlug: "acid-base-theories",
      title: "Acid-base theories and pH calculations",
    },
    id: {
      routeSlug: "teori-asam-basa",
      title: "Teori asam-basa dan perhitungan pH",
    },
    ms: {
      routeSlug: "teori-asid-bes",
      title: "Teori asid-bes dan pengiraan pH",
    },
  },
});

/** Darmstadt T-Kurs Chemie: Elektrochemie. */
const tuDarmstadtTechnicalChemistryUnit5 = unitNode({
  children: [
    materialNode({
      key: "tu-darmstadt-t-chemistry-electrochemistry-redox-equilibrium",
      level: "lesson",
      materialKeys: ["lesson.chemistry.redox-equilibrium"],
      order: 10,
      outcomes: [
        { code: "Themenbereich: Elektrochemie", ...darmstadtChemistry },
      ],
    }),
  ],
  key: "tu-darmstadt-t-chemistry-electrochemistry",
  materialCard: {
    de: {
      description: "Strom aus Reaktionen, Reaktionen aus Strom.",
      title: "Elektrochemie",
    },
    en: {
      description: "Current from reactions, reactions from current.",
      title: "Electrochemistry",
    },
    id: {
      description: "Arus dari reaksi, reaksi dari arus.",
      title: "Elektrokimia",
    },
    ms: {
      description: "Arus daripada tindak balas, tindak balas daripada arus.",
      title: "Elektrokimia",
    },
  },
  order: 50,
  translations: {
    de: { routeSlug: "elektrochemie", title: "Elektrochemie" },
    en: { routeSlug: "electrochemistry", title: "Electrochemistry" },
    id: { routeSlug: "elektrokimia", title: "Elektrokimia" },
    ms: { routeSlug: "elektrokimia", title: "Elektrokimia" },
  },
});

/** Darmstadt T-Kurs Chemie: the Themenbereiche its Chemie page names, each with the lessons that teach it */
export const tuDarmstadtTechnicalChemistryUnitNodes = [
  tuDarmstadtTechnicalChemistryUnit1,
  tuDarmstadtTechnicalChemistryUnit2,
  tuDarmstadtTechnicalChemistryUnit3,
  tuDarmstadtTechnicalChemistryUnit4,
  tuDarmstadtTechnicalChemistryUnit5,
];
