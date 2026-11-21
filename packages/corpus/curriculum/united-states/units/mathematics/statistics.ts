import { materialNode, unitNode } from "#corpus/curriculum/schema";
import { mathematicsStandards } from "#corpus/curriculum/united-states/documents";

/** United States high school, CCSS conceptual category Statistics and Probability. */
export const usStatisticsProbabilityUnit = unitNode({
  children: [
    materialNode({
      key: "us-high-school-mathematics-statistics-probability-statistics",
      level: "lesson",
      materialKeys: ["lesson.mathematics.statistics-foundations"],
      order: 10,
      outcomes: [
        {
          code: "S-ID Interpreting Categorical and Quantitative Data",
          ...mathematicsStandards,
        },
      ],
    }),
    materialNode({
      key: "us-high-school-mathematics-statistics-probability-regression",
      level: "lesson",
      materialKeys: ["lesson.mathematics.statistics-regression"],
      order: 20,
      outcomes: [
        {
          code: "S-ID Interpreting Categorical and Quantitative Data",
          ...mathematicsStandards,
        },
      ],
    }),
    materialNode({
      key: "us-high-school-mathematics-statistics-probability-probability",
      level: "lesson",
      materialKeys: ["lesson.mathematics.probability"],
      order: 30,
      outcomes: [
        {
          code: "S-CP Conditional Probability and the Rules of Probability",
          ...mathematicsStandards,
        },
      ],
    }),
    materialNode({
      key: "us-high-school-mathematics-statistics-probability-counting",
      level: "lesson",
      materialKeys: ["lesson.mathematics.combinatorics"],
      order: 40,
      outcomes: [
        {
          code: "S-CP Conditional Probability and the Rules of Probability",
          ...mathematicsStandards,
        },
      ],
    }),
    materialNode({
      key: "us-high-school-mathematics-statistics-probability-distributions",
      level: "lesson",
      materialKeys: ["lesson.mathematics.data-analysis-probability"],
      order: 50,
      outcomes: [
        {
          code: "S-MD Using Probability to Make Decisions",
          ...mathematicsStandards,
        },
        {
          code: "S-ID Interpreting Categorical and Quantitative Data",
          ...mathematicsStandards,
        },
      ],
    }),
  ],
  key: "high-school-mathematics-statistics-probability",
  materialCard: {
    de: {
      description: "Werte Daten, Zufall und Regressionsmodelle aus.",
      title: "Statistik und Wahrscheinlichkeit",
    },
    en: {
      description: "Read data, chance, and regression models.",
      title: "Statistics and Probability",
    },
    id: {
      description: "Baca data, peluang, dan model regresi.",
      title: "Statistika dan Peluang",
    },
    ms: {
      description: "Baca data, kebarangkalian dan model regresi.",
      title: "Statistik dan Kebarangkalian",
    },
  },
  order: 50,
  translations: {
    de: {
      routeSlug: "statistik-und-wahrscheinlichkeit",
      title: "Statistik und Wahrscheinlichkeit",
    },
    en: {
      routeSlug: "statistics-and-probability",
      title: "Statistics and Probability",
    },
    id: {
      routeSlug: "statistika-dan-peluang",
      title: "Statistika dan Peluang",
    },
    ms: {
      routeSlug: "statistik-dan-kebarangkalian",
      title: "Statistik dan Kebarangkalian",
    },
  },
});
