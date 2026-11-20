import { materialNode, unitNode } from "#corpus/curriculum/schema";
import { mathematicsSyllabus } from "#corpus/curriculum/singapore-moe/documents";

/** Singapore SEC G3 Mathematics (K310), strand Statistics and Probability. */
export const singaporeStatisticsProbabilityUnit = unitNode({
  children: [
    materialNode({
      key: "singapore-secondary-mathematics-statistics-probability-statistics",
      level: "lesson",
      materialKeys: ["lesson.mathematics.statistics-foundations"],
      order: 10,
      outcomes: [
        { code: "S1 Data handling and analysis", ...mathematicsSyllabus },
      ],
    }),
    materialNode({
      key: "singapore-secondary-mathematics-statistics-probability-probability",
      level: "lesson",
      materialKeys: ["lesson.mathematics.probability"],
      order: 20,
      outcomes: [{ code: "S2 Probability", ...mathematicsSyllabus }],
    }),
    materialNode({
      key: "singapore-secondary-mathematics-statistics-probability-combined-events",
      level: "lesson",
      materialKeys: ["lesson.mathematics.combinatorics"],
      order: 30,
      outcomes: [{ code: "S2 Probability", ...mathematicsSyllabus }],
    }),
  ],
  key: "secondary-mathematics-statistics-probability",
  materialCard: {
    de: {
      description: "Fasse Daten zusammen und berechne Chancen.",
      title: "Statistik und Wahrscheinlichkeit",
    },
    en: {
      description: "Summarise data and work out chances.",
      title: "Statistics and probability",
    },
    id: {
      description: "Ringkas data dan hitung peluang.",
      title: "Statistika dan peluang",
    },
    ms: {
      description: "Ringkaskan data dan kira kebarangkalian.",
      title: "Statistik dan kebarangkalian",
    },
  },
  order: 30,
  translations: {
    de: {
      routeSlug: "statistik-und-wahrscheinlichkeit",
      title: "Statistik und Wahrscheinlichkeit",
    },
    en: {
      routeSlug: "statistics-and-probability",
      title: "Statistics and probability",
    },
    id: {
      routeSlug: "statistika-dan-peluang",
      title: "Statistika dan peluang",
    },
    ms: {
      routeSlug: "statistik-dan-kebarangkalian",
      title: "Statistik dan kebarangkalian",
    },
  },
});
