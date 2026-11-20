import { chemistrySyllabus } from "#corpus/curriculum/cambridge-international/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** Cambridge IGCSE Chemistry 0620, topic 8 The Periodic Table. */
export const igcsePeriodicTableUnit = unitNode({
  children: [
    materialNode({
      key: "chemistry-0620-periodic-table-groups",
      level: "lesson",
      materialKeys: ["lesson.chemistry.periodic-groups"],
      order: 10,
      outcomes: [
        { code: "8.2 Group I properties", ...chemistrySyllabus },
        { code: "8.3 Group VII properties", ...chemistrySyllabus },
        { code: "8.4 Transition elements", ...chemistrySyllabus },
        { code: "8.5 Noble gases", ...chemistrySyllabus },
        { code: "7.2 Oxides", ...chemistrySyllabus },
      ],
    }),
  ],
  key: "chemistry-0620-periodic-table",
  materialCard: {
    de: {
      description: "Sage Eigenschaften aus Gruppen und Perioden vorher.",
      title: "Das Periodensystem",
    },
    en: {
      description: "Predict properties from groups and periods.",
      title: "The Periodic Table",
    },
    id: {
      description: "Ramalkan sifat dari golongan dan periode.",
      title: "Tabel periodik",
    },
    ms: {
      description: "Ramal sifat daripada kumpulan dan kala.",
      title: "Jadual Berkala",
    },
  },
  order: 80,
  translations: {
    de: { routeSlug: "das-periodensystem", title: "Das Periodensystem" },
    en: { routeSlug: "the-periodic-table", title: "The Periodic Table" },
    id: { routeSlug: "tabel-periodik", title: "Tabel periodik" },
    ms: { routeSlug: "jadual-berkala", title: "Jadual Berkala" },
  },
});

/** Cambridge IGCSE Chemistry 0620, topic 9 Metals. */
export const igcseMetalsUnit = unitNode({
  children: [
    materialNode({
      key: "chemistry-0620-metals-alloys",
      level: "lesson",
      materialKeys: ["lesson.chemistry.manufactured-substances"],
      order: 10,
      outcomes: [
        { code: "9.2 Uses of metals", ...chemistrySyllabus },
        { code: "9.3 Alloys and their properties", ...chemistrySyllabus },
      ],
    }),
  ],
  key: "chemistry-0620-metals",
  materialCard: {
    de: {
      description: "Vergleiche reine Metalle mit ihren Legierungen.",
      title: "Metalle",
    },
    en: {
      description: "Compare pure metals with their alloys.",
      title: "Metals",
    },
    id: {
      description: "Bandingkan logam murni dengan aloinya.",
      title: "Logam",
    },
    ms: {
      description: "Bandingkan logam tulen dengan aloinya.",
      title: "Logam",
    },
  },
  order: 90,
  translations: {
    de: { routeSlug: "metalle", title: "Metalle" },
    en: { routeSlug: "metals", title: "Metals" },
    id: { routeSlug: "logam", title: "Logam" },
    ms: { routeSlug: "logam", title: "Logam" },
  },
});

/** Cambridge IGCSE Chemistry 0620, topic 11 Organic chemistry. */
export const igcseOrganicUnit = unitNode({
  children: [
    materialNode({
      key: "chemistry-0620-organic-chemistry-carbon-compounds",
      level: "lesson",
      materialKeys: ["lesson.chemistry.carbon-compound"],
      order: 10,
      outcomes: [
        {
          code: "11.1 Formulae, functional groups and terminology",
          ...chemistrySyllabus,
        },
        { code: "11.2 Naming organic compounds", ...chemistrySyllabus },
        { code: "11.4 Alkanes", ...chemistrySyllabus },
        { code: "11.5 Alkenes", ...chemistrySyllabus },
        { code: "11.6 Alcohols", ...chemistrySyllabus },
        { code: "11.7 Carboxylic acids", ...chemistrySyllabus },
      ],
    }),
    materialNode({
      key: "chemistry-0620-organic-chemistry-polymers",
      level: "lesson",
      materialKeys: ["lesson.chemistry.polymer"],
      order: 20,
      outcomes: [{ code: "11.8 Polymers", ...chemistrySyllabus }],
    }),
  ],
  key: "chemistry-0620-organic-chemistry",
  materialCard: {
    de: {
      description: "Benenne Kohlenstoffverbindungen und baue Polymere.",
      title: "Organische Chemie",
    },
    en: {
      description: "Name carbon compounds and build polymers.",
      title: "Organic chemistry",
    },
    id: {
      description: "Namai senyawa karbon dan susun polimer.",
      title: "Kimia organik",
    },
    ms: {
      description: "Namakan sebatian karbon dan bina polimer.",
      title: "Kimia organik",
    },
  },
  order: 110,
  translations: {
    de: { routeSlug: "organische-chemie", title: "Organische Chemie" },
    en: { routeSlug: "organic-chemistry", title: "Organic chemistry" },
    id: { routeSlug: "kimia-organik", title: "Kimia organik" },
    ms: { routeSlug: "kimia-organik", title: "Kimia organik" },
  },
});

/** Cambridge IGCSE Chemistry 0620, topic 12 Experimental techniques and chemical analysis. */
export const igcseTechniquesUnit = unitNode({
  children: [
    materialNode({
      key: "chemistry-0620-experimental-techniques-lab-work",
      level: "lesson",
      materialKeys: ["lesson.chemistry.chemistry-introduction"],
      order: 10,
      outcomes: [{ code: "12.1 Experimental design", ...chemistrySyllabus }],
    }),
  ],
  key: "chemistry-0620-experimental-techniques",
  materialCard: {
    de: {
      description: "Plane ein sicheres und faires Experiment.",
      title: "Experimentelle Methoden und chemische Analyse",
    },
    en: {
      description: "Plan a safe and fair experiment.",
      title: "Experimental techniques and chemical analysis",
    },
    id: {
      description: "Rancang percobaan yang aman dan adil.",
      title: "Teknik eksperimen dan analisis kimia",
    },
    ms: {
      description: "Rancang eksperimen yang selamat dan adil.",
      title: "Teknik eksperimen dan analisis kimia",
    },
  },
  order: 120,
  translations: {
    de: {
      routeSlug: "experimentelle-methoden-und-chemische-analyse",
      title: "Experimentelle Methoden und chemische Analyse",
    },
    en: {
      routeSlug: "experimental-techniques-and-chemical-analysis",
      title: "Experimental techniques and chemical analysis",
    },
    id: {
      routeSlug: "teknik-eksperimen-dan-analisis-kimia",
      title: "Teknik eksperimen dan analisis kimia",
    },
    ms: {
      routeSlug: "teknik-eksperimen-dan-analisis-kimia",
      title: "Teknik eksperimen dan analisis kimia",
    },
  },
});
