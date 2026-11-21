import { chemistrySyllabus } from "#corpus/curriculum/cambridge-international/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** Cambridge IGCSE Chemistry 0620, topic 4 Electrochemistry. */
export const igcseElectrochemistryUnit = unitNode({
  children: [
    materialNode({
      key: "chemistry-0620-electrochemistry-electrolysis-redox",
      level: "lesson",
      materialKeys: ["lesson.chemistry.redox-equilibrium"],
      order: 10,
      outcomes: [
        { code: "4.1 Electrolysis", ...chemistrySyllabus },
        { code: "6.4 Redox", ...chemistrySyllabus },
        { code: "9.4 Reactivity series", ...chemistrySyllabus },
        { code: "9.5 Corrosion of metals", ...chemistrySyllabus },
        { code: "9.6 Extraction of metals", ...chemistrySyllabus },
      ],
    }),
  ],
  key: "chemistry-0620-electrochemistry",
  materialCard: {
    de: {
      description: "Verfolge Elektronen bei Elektrolyse und Korrosion.",
      title: "Elektrochemie",
    },
    en: {
      description: "Follow electrons through electrolysis and corrosion.",
      title: "Electrochemistry",
    },
    id: {
      description: "Ikuti elektron dalam elektrolisis dan korosi.",
      title: "Elektrokimia",
    },
    ms: {
      description: "Ikuti elektron dalam elektrolisis dan kakisan.",
      title: "Elektrokimia",
    },
  },
  order: 40,
  translations: {
    de: { routeSlug: "elektrochemie", title: "Elektrochemie" },
    en: { routeSlug: "electrochemistry", title: "Electrochemistry" },
    id: { routeSlug: "elektrokimia", title: "Elektrokimia" },
    ms: { routeSlug: "elektrokimia", title: "Elektrokimia" },
  },
});

/** Cambridge IGCSE Chemistry 0620, topic 5 Chemical energetics. */
export const igcseEnergeticsUnit = unitNode({
  children: [
    materialNode({
      key: "chemistry-0620-chemical-energetics-enthalpy",
      level: "lesson",
      materialKeys: ["lesson.chemistry.thermochemistry"],
      order: 10,
      outcomes: [
        {
          code: "5.1 Exothermic and endothermic reactions",
          ...chemistrySyllabus,
        },
      ],
    }),
  ],
  key: "chemistry-0620-chemical-energetics",
  materialCard: {
    de: {
      description: "Lies Energiediagramme exothermer Reaktionen.",
      title: "Energetik chemischer Reaktionen",
    },
    en: {
      description: "Read energy profiles of exothermic reactions.",
      title: "Chemical energetics",
    },
    id: {
      description: "Baca diagram energi reaksi eksoterm.",
      title: "Energetika kimia",
    },
    ms: {
      description: "Baca profil tenaga tindak balas eksotermik.",
      title: "Tenaga kimia",
    },
  },
  order: 50,
  translations: {
    de: {
      routeSlug: "energetik-chemischer-reaktionen",
      title: "Energetik chemischer Reaktionen",
    },
    en: { routeSlug: "chemical-energetics", title: "Chemical energetics" },
    id: { routeSlug: "energetika-kimia", title: "Energetika kimia" },
    ms: { routeSlug: "tenaga-kimia", title: "Tenaga kimia" },
  },
});

/** Cambridge IGCSE Chemistry 0620, topic 6 Chemical reactions. */
export const igcseReactionsUnit = unitNode({
  children: [
    materialNode({
      key: "chemistry-0620-chemical-reactions-rates",
      level: "lesson",
      materialKeys: ["lesson.chemistry.reaction-rate"],
      order: 10,
      outcomes: [
        { code: "6.2 Rate of reaction", ...chemistrySyllabus },
        {
          code: "5.1 Exothermic and endothermic reactions",
          ...chemistrySyllabus,
        },
      ],
    }),
  ],
  key: "chemistry-0620-chemical-reactions",
  materialCard: {
    de: {
      description: "Verändere die Geschwindigkeit einer Reaktion.",
      title: "Chemische Reaktionen",
    },
    en: {
      description: "Change how fast a reaction goes.",
      title: "Chemical reactions",
    },
    id: {
      description: "Ubah seberapa cepat reaksi berlangsung.",
      title: "Reaksi kimia",
    },
    ms: {
      description: "Ubah kadar sesuatu tindak balas.",
      title: "Tindak balas kimia",
    },
  },
  order: 60,
  translations: {
    de: { routeSlug: "chemische-reaktionen", title: "Chemische Reaktionen" },
    en: { routeSlug: "chemical-reactions", title: "Chemical reactions" },
    id: { routeSlug: "reaksi-kimia", title: "Reaksi kimia" },
    ms: { routeSlug: "tindak-balas-kimia", title: "Tindak balas kimia" },
  },
});

/** Cambridge IGCSE Chemistry 0620, topic 7 Acids, bases and salts. */
export const igcseAcidsUnit = unitNode({
  children: [
    materialNode({
      key: "chemistry-0620-acids-bases-salts-acids",
      level: "lesson",
      materialKeys: ["lesson.chemistry.acid-base-salt"],
      order: 10,
      outcomes: [
        {
          code: "7.1 The characteristic properties of acids and bases",
          ...chemistrySyllabus,
        },
        { code: "7.3 Preparation of salts", ...chemistrySyllabus },
        { code: "12.2 Acid-base titrations", ...chemistrySyllabus },
        {
          code: "3.3 The mole and the Avogadro constant",
          ...chemistrySyllabus,
        },
      ],
    }),
  ],
  key: "chemistry-0620-acids-bases-salts",
  materialCard: {
    de: {
      description: "Neutralisiere Säuren und stelle Salze her.",
      title: "Säuren, Basen und Salze",
    },
    en: {
      description: "Neutralise acids and prepare salts.",
      title: "Acids, bases and salts",
    },
    id: {
      description: "Netralkan asam dan buat garam.",
      title: "Asam, basa, dan garam",
    },
    ms: {
      description: "Neutralkan asid dan sediakan garam.",
      title: "Asid, bes dan garam",
    },
  },
  order: 70,
  translations: {
    de: {
      routeSlug: "saeuren-basen-und-salze",
      title: "Säuren, Basen und Salze",
    },
    en: { routeSlug: "acids-bases-and-salts", title: "Acids, bases and salts" },
    id: { routeSlug: "asam-basa-dan-garam", title: "Asam, basa, dan garam" },
    ms: { routeSlug: "asid-bes-dan-garam", title: "Asid, bes dan garam" },
  },
});
