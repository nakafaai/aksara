import { materialNode, unitNode } from "#corpus/curriculum/schema";
import { chemistrySyllabus } from "#corpus/curriculum/singapore-moe/documents";

/** Singapore SEC G3 Chemistry (K324), section II Chemical Reactions. */
export const singaporeReactionsUnit = unitNode({
  children: [
    materialNode({
      key: "singapore-secondary-chemistry-reactions-formulae",
      level: "lesson",
      materialKeys: ["lesson.chemistry.basic-chemistry-laws"],
      order: 10,
      outcomes: [
        { code: "4.1 Formulae and Equation Writing", ...chemistrySyllabus },
      ],
    }),
    materialNode({
      key: "singapore-secondary-chemistry-reactions-moles",
      level: "lesson",
      materialKeys: ["lesson.chemistry.mole-concept"],
      order: 20,
      outcomes: [
        {
          code: "4.2 The Mole Concept and Stoichiometry",
          ...chemistrySyllabus,
        },
      ],
    }),
    materialNode({
      key: "singapore-secondary-chemistry-reactions-acids-salts",
      level: "lesson",
      materialKeys: ["lesson.chemistry.acid-base-salt"],
      order: 30,
      outcomes: [
        { code: "5.1 Acids and Bases", ...chemistrySyllabus },
        { code: "5.2 Salts", ...chemistrySyllabus },
        {
          code: "4.2 The Mole Concept and Stoichiometry",
          ...chemistrySyllabus,
        },
      ],
    }),
    materialNode({
      key: "singapore-secondary-chemistry-reactions-redox",
      level: "lesson",
      materialKeys: ["lesson.chemistry.redox-equilibrium"],
      order: 40,
      outcomes: [
        { code: "7.1 Oxidation and Reduction", ...chemistrySyllabus },
        { code: "7.2 Electrochemistry", ...chemistrySyllabus },
        { code: "8.4 Reactivity Series", ...chemistrySyllabus },
      ],
    }),
    materialNode({
      key: "singapore-secondary-chemistry-reactions-periodic-groups",
      level: "lesson",
      materialKeys: ["lesson.chemistry.periodic-groups"],
      order: 50,
      outcomes: [
        { code: "8.2 Group Properties", ...chemistrySyllabus },
        { code: "8.3 Transition Elements", ...chemistrySyllabus },
        { code: "5.1 Acids and Bases", ...chemistrySyllabus },
      ],
    }),
    materialNode({
      key: "singapore-secondary-chemistry-reactions-energetics",
      level: "lesson",
      materialKeys: ["lesson.chemistry.thermochemistry"],
      order: 60,
      outcomes: [{ code: "9 Chemical Energetics", ...chemistrySyllabus }],
    }),
    materialNode({
      key: "singapore-secondary-chemistry-reactions-rates",
      level: "lesson",
      materialKeys: ["lesson.chemistry.reaction-rate"],
      order: 70,
      outcomes: [{ code: "10 Rate of Reactions", ...chemistrySyllabus }],
    }),
  ],
  key: "secondary-chemistry-reactions",
  materialCard: {
    de: {
      description: "Rechne Reaktionen durch und sage ihren Verlauf voraus.",
      title: "Chemische Reaktionen",
    },
    en: {
      description: "Calculate reactions and predict how they run.",
      title: "Chemical reactions",
    },
    id: {
      description: "Hitung reaksi dan ramalkan jalannya.",
      title: "Reaksi kimia",
    },
    ms: {
      description: "Kira tindak balas dan ramal perjalanannya.",
      title: "Tindak balas kimia",
    },
  },
  order: 20,
  translations: {
    de: { routeSlug: "chemische-reaktionen", title: "Chemische Reaktionen" },
    en: { routeSlug: "chemical-reactions", title: "Chemical reactions" },
    id: { routeSlug: "reaksi-kimia", title: "Reaksi kimia" },
    ms: { routeSlug: "tindak-balas-kimia", title: "Tindak balas kimia" },
  },
});

/** Singapore SEC G3 Chemistry (K324), section III Chemistry in a Sustainable World. */
export const singaporeSustainableUnit = unitNode({
  children: [
    materialNode({
      key: "singapore-secondary-chemistry-sustainable-world-organic",
      level: "lesson",
      materialKeys: ["lesson.chemistry.carbon-compound"],
      order: 10,
      outcomes: [
        { code: "11.2 Hydrocarbons", ...chemistrySyllabus },
        {
          code: "11.3 Alcohols, Carboxylic Acids and Esters",
          ...chemistrySyllabus,
        },
      ],
    }),
    materialNode({
      key: "singapore-secondary-chemistry-sustainable-world-polymers",
      level: "lesson",
      materialKeys: ["lesson.chemistry.polymer"],
      order: 20,
      outcomes: [{ code: "11.4 Polymers", ...chemistrySyllabus }],
    }),
  ],
  key: "secondary-chemistry-sustainable-world",
  materialCard: {
    de: {
      description: "Benenne organische Stoffe und vergleiche Polymere.",
      title: "Chemie für eine nachhaltige Welt",
    },
    en: {
      description: "Name organic compounds and compare polymers.",
      title: "Chemistry in a sustainable world",
    },
    id: {
      description: "Namai senyawa organik dan bandingkan polimer.",
      title: "Kimia untuk dunia berkelanjutan",
    },
    ms: {
      description: "Namakan sebatian organik dan bandingkan polimer.",
      title: "Kimia dalam dunia lestari",
    },
  },
  order: 30,
  translations: {
    de: {
      routeSlug: "chemie-fuer-eine-nachhaltige-welt",
      title: "Chemie für eine nachhaltige Welt",
    },
    en: {
      routeSlug: "chemistry-in-a-sustainable-world",
      title: "Chemistry in a sustainable world",
    },
    id: {
      routeSlug: "kimia-untuk-dunia-berkelanjutan",
      title: "Kimia untuk dunia berkelanjutan",
    },
    ms: {
      routeSlug: "kimia-dalam-dunia-lestari",
      title: "Kimia dalam dunia lestari",
    },
  },
});
