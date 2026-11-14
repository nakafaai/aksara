import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** The Kurikulum Merdeka class 12 mathematics unit `combinatorics`. */
export const merdekaClass12CombinatoricsUnit = unitNode({
  children: [
    materialNode({
      key: "class-12-mathematics-combinatorics-material",
      level: "lesson",
      materialKeys: ["lesson.mathematics.combinatorics"],
      order: 10,
    }),
  ],
  key: "class-12-mathematics-combinatorics",
  materialCard: {
    de: {
      description: "Entwickle Potenzen mit Binomialkoeffizienten.",
      title: "Kombinatorik",
    },
    en: {
      description: "Expand powers with binomial coefficients.",
      title: "Combinatorics",
    },
    id: {
      description: "Kembangkan pangkat dengan koefisien binomial.",
      title: "Kombinatorika",
    },
    ms: {
      description: "Kembangkan kuasa dengan pekali binomial.",
      title: "Kombinatorik",
    },
  },
  order: 30,
  translations: {
    de: { routeSlug: "kombinatorik", title: "Kombinatorik" },
    en: { routeSlug: "combinatorics", title: "Combinatorics" },
    id: { routeSlug: "kombinatorik", title: "Kombinatorika" },
    ms: { routeSlug: "kombinatorik", title: "Kombinatorik" },
  },
});

/** The Kurikulum Merdeka class 12 mathematics unit `data-analysis-probability`. */
export const merdekaClass12DataAnalysisProbabilityUnit = unitNode({
  children: [
    materialNode({
      key: "class-12-mathematics-data-analysis-probability-material",
      level: "lesson",
      materialKeys: ["lesson.mathematics.data-analysis-probability"],
      order: 10,
    }),
  ],
  key: "class-12-mathematics-data-analysis-probability",
  materialCard: {
    de: {
      description: "Modelliere wiederholte Erfolge mit Wahrscheinlichkeiten.",
      title: "Datenanalyse und Wahrscheinlichkeit",
    },
    en: {
      description: "Model repeated success with probability.",
      title: "Data Analysis and Probability",
    },
    id: {
      description: "Modelkan keberhasilan berulang dengan peluang.",
      title: "Analisis Data dan Peluang",
    },
    ms: {
      description: "Modelkan kejayaan berulang dengan kebarangkalian.",
      title: "Analisis Data dan Kebarangkalian",
    },
  },
  order: 40,
  translations: {
    de: {
      routeSlug: "datenanalyse-und-wahrscheinlichkeit",
      title: "Datenanalyse und Wahrscheinlichkeit",
    },
    en: {
      routeSlug: "data-analysis-probability",
      title: "Data Analysis and Probability",
    },
    id: {
      routeSlug: "analisis-data-dan-peluang",
      title: "Analisis Data dan Peluang",
    },
    ms: {
      routeSlug: "analisis-data-dan-kebarangkalian",
      title: "Analisis Data dan Kebarangkalian",
    },
  },
});
