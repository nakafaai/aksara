import {
  mathematicsBookXI,
  merdekaLearningOutcomes,
} from "#corpus/curriculum/merdeka/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** Kurikulum Merdeka Kelas 11 Matematika, Bab 1 Analisis Data Bivariat. */
export const merdekaClass11BivariateDataUnit = unitNode({
  children: [
    materialNode({
      key: "class-11-mathematics-statistics-regression-material",
      level: "lesson",
      materialKeys: ["lesson.mathematics.statistics-regression"],
      order: 10,
      outcomes: [
        {
          code: "Matematika, Fase F, elemen Analisis Data dan Peluang",
          ...merdekaLearningOutcomes,
        },
        { code: "Bab 1 Analisis Data Bivariat", ...mathematicsBookXI },
      ],
    }),
  ],
  key: "class-11-mathematics-statistics-regression",
  materialCard: {
    de: {
      description: "Lies ab, welchen Anteil der Streuung ein Modell erklärt.",
      title: "Bivariate Datenanalyse",
    },
    en: {
      description: "Read how models explain variation.",
      title: "Bivariate Data Analysis",
    },
    id: {
      description: "Baca cara model menjelaskan variasi.",
      title: "Analisis Data Bivariat",
    },
    ms: {
      description: "Baca cara model menerangkan variasi.",
      title: "Analisis Data Bivariat",
    },
  },
  order: 10,
  translations: {
    de: {
      routeSlug: "bivariate-datenanalyse",
      title: "Bivariate Datenanalyse",
    },
    en: {
      routeSlug: "bivariate-data-analysis",
      title: "Bivariate Data Analysis",
    },
    id: {
      routeSlug: "analisis-data-bivariat",
      title: "Analisis Data Bivariat",
    },
    ms: {
      routeSlug: "analisis-data-bivariat",
      title: "Analisis Data Bivariat",
    },
  },
});
