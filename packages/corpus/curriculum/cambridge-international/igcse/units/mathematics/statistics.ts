import { mathematicsSyllabus } from "#corpus/curriculum/cambridge-international/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** Cambridge IGCSE Mathematics 0580, topic 8 Probability. */
export const igcseProbabilityUnit = unitNode({
  children: [
    materialNode({
      key: "mathematics-0580-probability-events",
      level: "lesson",
      materialKeys: ["lesson.mathematics.probability"],
      order: 10,
      outcomes: [
        { code: "E8.1 Introduction to probability", ...mathematicsSyllabus },
        { code: "E8.3 Probability of combined events", ...mathematicsSyllabus },
        { code: "E8.4 Conditional probability", ...mathematicsSyllabus },
      ],
    }),
    materialNode({
      key: "mathematics-0580-probability-combined-events",
      level: "lesson",
      materialKeys: ["lesson.mathematics.combinatorics"],
      order: 20,
      outcomes: [
        { code: "E8.3 Probability of combined events", ...mathematicsSyllabus },
        { code: "E8.4 Conditional probability", ...mathematicsSyllabus },
      ],
    }),
  ],
  key: "mathematics-0580-probability",
  materialCard: {
    de: {
      description: "Verknüpfe Ereignisse mit Baumdiagrammen.",
      title: "Wahrscheinlichkeit",
    },
    en: {
      description: "Combine events with trees and conditional chance.",
      title: "Probability",
    },
    id: {
      description: "Gabungkan kejadian lewat diagram pohon.",
      title: "Peluang",
    },
    ms: {
      description: "Gabungkan peristiwa dengan gambar rajah pokok.",
      title: "Kebarangkalian",
    },
  },
  order: 80,
  translations: {
    de: { routeSlug: "wahrscheinlichkeit", title: "Wahrscheinlichkeit" },
    en: { routeSlug: "probability", title: "Probability" },
    id: { routeSlug: "peluang", title: "Peluang" },
    ms: { routeSlug: "kebarangkalian", title: "Kebarangkalian" },
  },
});

/** Cambridge IGCSE Mathematics 0580, topic 9 Statistics. */
export const igcseStatisticsUnit = unitNode({
  children: [
    materialNode({
      key: "mathematics-0580-statistics-summary-statistics",
      level: "lesson",
      materialKeys: ["lesson.mathematics.statistics-foundations"],
      order: 10,
      outcomes: [
        { code: "E9.2 Interpreting statistical data", ...mathematicsSyllabus },
        {
          code: "E9.3 Averages and measures of spread",
          ...mathematicsSyllabus,
        },
        {
          code: "E9.4 Statistical charts and diagrams",
          ...mathematicsSyllabus,
        },
        { code: "E9.7 Histograms", ...mathematicsSyllabus },
      ],
    }),
    materialNode({
      key: "mathematics-0580-statistics-scatter-diagrams",
      level: "lesson",
      materialKeys: ["lesson.mathematics.statistics-regression"],
      order: 20,
      outcomes: [{ code: "E9.5 Scatter diagrams", ...mathematicsSyllabus }],
    }),
  ],
  key: "mathematics-0580-statistics",
  materialCard: {
    de: {
      description: "Fasse Daten zusammen und lies Streudiagramme.",
      title: "Statistik",
    },
    en: {
      description: "Summarise data and read scatter diagrams.",
      title: "Statistics",
    },
    id: {
      description: "Ringkas data dan baca diagram pencar.",
      title: "Statistika",
    },
    ms: {
      description: "Ringkaskan data dan baca gambar rajah serakan.",
      title: "Statistik",
    },
  },
  order: 90,
  translations: {
    de: { routeSlug: "statistik", title: "Statistik" },
    en: { routeSlug: "statistics", title: "Statistics" },
    id: { routeSlug: "statistika", title: "Statistika" },
    ms: { routeSlug: "statistik", title: "Statistik" },
  },
});
