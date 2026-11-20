import {
  mathematicsBookX,
  merdekaLearningOutcomes,
} from "#corpus/curriculum/merdeka/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** Kurikulum Merdeka Kelas 10 Matematika, Bab 6 Representasi dan Interpretasi Data. */
export const merdekaClass10DataUnit = unitNode({
  children: [
    materialNode({
      key: "class-10-mathematics-statistics-foundations-material",
      level: "lesson",
      materialKeys: ["lesson.mathematics.statistics-foundations"],
      order: 10,
      outcomes: [
        {
          code: "Matematika, Fase E, elemen Analisis Data dan Peluang",
          ...merdekaLearningOutcomes,
        },
        {
          code: "Bab 6 Representasi dan Interpretasi Data",
          ...mathematicsBookX,
        },
      ],
    }),
  ],
  key: "class-10-mathematics-statistics-foundations",
  materialCard: {
    de: {
      description: "Wähle passende Lageparameter für einen Datensatz.",
      title: "Daten darstellen und interpretieren",
    },
    en: {
      description: "Choose the right center for data.",
      title: "Representing and Interpreting Data",
    },
    id: {
      description: "Pilih ukuran pusat data yang tepat.",
      title: "Representasi dan Interpretasi Data",
    },
    ms: {
      description: "Pilih sukatan kecenderungan memusat yang sesuai.",
      title: "Perwakilan dan Tafsiran Data",
    },
  },
  order: 60,
  translations: {
    de: {
      routeSlug: "daten-darstellen-und-interpretieren",
      title: "Daten darstellen und interpretieren",
    },
    en: {
      routeSlug: "representing-and-interpreting-data",
      title: "Representing and Interpreting Data",
    },
    id: {
      routeSlug: "representasi-dan-interpretasi-data",
      title: "Representasi dan Interpretasi Data",
    },
    ms: {
      routeSlug: "perwakilan-dan-tafsiran-data",
      title: "Perwakilan dan Tafsiran Data",
    },
  },
});

/** Kurikulum Merdeka Kelas 10 Matematika, Bab 7 Peluang. */
export const merdekaClass10ProbabilityUnit = unitNode({
  children: [
    materialNode({
      key: "class-10-mathematics-probability-material",
      level: "lesson",
      materialKeys: ["lesson.mathematics.probability"],
      order: 10,
      outcomes: [{ code: "Bab 7 Peluang", ...mathematicsBookX }],
    }),
  ],
  key: "class-10-mathematics-probability",
  materialCard: {
    de: {
      description: "Nutze die Additionsregel für Wahrscheinlichkeiten.",
      title: "Wahrscheinlichkeit",
    },
    en: { description: "Use addition rules for chance.", title: "Probability" },
    id: {
      description: "Gunakan aturan penjumlahan peluang.",
      title: "Peluang",
    },
    ms: {
      description: "Guna hukum penambahan untuk kebarangkalian.",
      title: "Kebarangkalian",
    },
  },
  order: 70,
  translations: {
    de: { routeSlug: "wahrscheinlichkeit", title: "Wahrscheinlichkeit" },
    en: { routeSlug: "probability", title: "Probability" },
    id: { routeSlug: "peluang", title: "Peluang" },
    ms: { routeSlug: "kebarangkalian", title: "Kebarangkalian" },
  },
});
