import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/mathematics/statistics-foundations",
  domain: "mathematics",
  key: "lesson.mathematics.statistics-foundations",
  kind: "lesson",
  routeSlugs: {
    en: "statistics-foundations",
    id: "statistika-dasar",
    de: "grundlagen-der-statistik",
    ms: "statistik-asas",
  },
  sections: [
    "central-tendency-usage",
    "histogram",
    "interquartile-range",
    "mean",
    "mean-group-data",
    "median-mode-group-data",
    "mode-median",
    "percentile-data-group",
    "quartile-data-group",
    "quartile-data-single",
    "relative-frequency",
    "variance-standard-deviation-data-group",
    "variance-standard-deviation-data-single",
  ],
  slug: "statistics-foundations",
  translations: {
    en: {
      description: "Choose mean, median, or mode for real data.",
      title: "Statistics",
    },
    id: {
      description: "Pilih mean, median, atau modus untuk data nyata.",
      title: "Statistika",
    },
    de: {
      description: "Beschreibe Daten mit Kennwerten und Histogrammen.",
      title: "Grundlagen der Statistik",
    },
    ms: {
      description: "Pilih min, median, atau mod untuk data sebenar.",
      title: "Statistik",
    },
  },
};

export default lesson;
