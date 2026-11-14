import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** The Kurikulum Merdeka class 10 mathematics unit `probability`. */
export const merdekaClass10ProbabilityUnit = unitNode({
  children: [
    materialNode({
      key: "class-10-mathematics-probability-material",
      level: "lesson",
      materialKeys: ["lesson.mathematics.probability"],
      order: 10,
    }),
  ],
  key: "class-10-mathematics-probability",
  materialCard: {
    de: {
      description: "Nutze die Additionsregel für Wahrscheinlichkeiten.",
      title: "Wahrscheinlichkeit",
    },
    en: {
      description: "Use addition rules for chance.",
      title: "Probability",
    },
    id: {
      description: "Gunakan aturan penjumlahan peluang.",
      title: "Peluang",
    },
    ms: {
      description: "Guna hukum penambahan untuk kebarangkalian.",
      title: "Kebarangkalian",
    },
  },
  order: 30,
  translations: {
    de: { routeSlug: "wahrscheinlichkeit", title: "Wahrscheinlichkeit" },
    en: { routeSlug: "probability", title: "Probability" },
    id: { routeSlug: "peluang", title: "Peluang" },
    ms: { routeSlug: "kebarangkalian", title: "Kebarangkalian" },
  },
});

/** The Kurikulum Merdeka class 10 mathematics unit `statistics-foundations`. */
export const merdekaClass10StatisticsFoundationsUnit = unitNode({
  children: [
    materialNode({
      key: "class-10-mathematics-statistics-foundations-material",
      level: "lesson",
      materialKeys: ["lesson.mathematics.statistics-foundations"],
      order: 10,
    }),
  ],
  key: "class-10-mathematics-statistics-foundations",
  materialCard: {
    de: {
      description: "Wähle passende Lageparameter für einen Datensatz.",
      title: "Statistik",
    },
    en: {
      description: "Choose the right center for data.",
      title: "Statistics",
    },
    id: {
      description: "Pilih ukuran pusat data yang tepat.",
      title: "Statistika",
    },
    ms: {
      description: "Pilih sukatan kecenderungan memusat yang sesuai.",
      title: "Statistik",
    },
  },
  order: 60,
  translations: {
    de: { routeSlug: "grundlagen-der-statistik", title: "Statistik" },
    en: { routeSlug: "statistics-foundations", title: "Statistics" },
    id: { routeSlug: "statistika-dasar", title: "Statistika" },
    ms: { routeSlug: "statistik", title: "Statistik" },
  },
});
