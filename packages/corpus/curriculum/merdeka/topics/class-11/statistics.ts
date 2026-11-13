import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** The Kurikulum Merdeka class 11 mathematics unit `statistics-regression`. */
export const merdekaClass11StatisticsRegressionUnit = unitNode({
  children: [
    materialNode({
      key: "class-11-mathematics-statistics-regression-material",
      level: "lesson",
      materialKeys: ["lesson.mathematics.statistics-regression"],
      order: 10,
    }),
  ],
  key: "class-11-mathematics-statistics-regression",
  materialCard: {
    de: {
      description: "Lies ab, welchen Anteil der Streuung ein Modell erklärt.",
      title: "Regressionsanalyse",
    },
    en: {
      description: "Read how models explain variation.",
      title: "Regression Statistics",
    },
    id: {
      description: "Baca cara model menjelaskan variasi.",
      title: "Statistika Regresi",
    },
    ms: {
      description: "Baca cara model menerangkan variasi.",
      title: "Statistik Regresi",
    },
  },
  order: 80,
  translations: {
    de: { routeSlug: "regressionsanalyse", title: "Regressionsanalyse" },
    en: {
      routeSlug: "statistics-regression",
      title: "Regression Statistics",
    },
    id: { routeSlug: "regresi-statistik", title: "Statistika Regresi" },
    ms: { routeSlug: "statistik-regresi", title: "Statistik Regresi" },
  },
});
