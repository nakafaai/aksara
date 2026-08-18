import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsStatisticsFoundationsMaterial =
  defineLessonMaterial({
    assetRoot: "material/lesson/mathematics/statistics-foundations",
    domain: "mathematics",
    key: "lesson.mathematics.statistics-foundations",
    kind: "lesson",
    routeSlugs: { en: "statistics-foundations", id: "statistika-dasar" },
    sections: [
      {
        routeSlugs: {
          en: "central-tendency-usage",
          id: "penggunaan-ukuran-pemusatan",
        },
        slug: "central-tendency-usage",
      },
      {
        routeSlugs: { en: "histogram", id: "histogram" },
        slug: "histogram",
      },
      {
        routeSlugs: { en: "interquartile-range", id: "jangkauan-interkuartil" },
        slug: "interquartile-range",
      },
      {
        routeSlugs: { en: "mean", id: "mean-rerata-atau-rata-rata" },
        slug: "mean",
      },
      {
        routeSlugs: {
          en: "mean-group-data",
          id: "mean-rata-rata-data-kelompok",
        },
        slug: "mean-group-data",
      },
      {
        routeSlugs: {
          en: "median-mode-group-data",
          id: "median-dan-kelas-modus-data-kelompok",
        },
        slug: "median-mode-group-data",
      },
      {
        routeSlugs: { en: "mode-median", id: "modus-dan-median" },
        slug: "mode-median",
      },
      {
        routeSlugs: {
          en: "percentile-data-group",
          id: "persentil-data-kelompok",
        },
        slug: "percentile-data-group",
      },
      {
        routeSlugs: { en: "quartile-data-group", id: "kuartil-data-kelompok" },
        slug: "quartile-data-group",
      },
      {
        routeSlugs: { en: "quartile-data-single", id: "kuartil-data-tunggal" },
        slug: "quartile-data-single",
      },
      {
        routeSlugs: { en: "relative-frequency", id: "frekuensi-relatif" },
        slug: "relative-frequency",
      },
      {
        routeSlugs: {
          en: "variance-standard-deviation-data-group",
          id: "varian-dan-simpangan-baku-data-kelompok",
        },
        slug: "variance-standard-deviation-data-group",
      },
      {
        routeSlugs: {
          en: "variance-standard-deviation-data-single",
          id: "varian-dan-simpangan-baku-data-tunggal",
        },
        slug: "variance-standard-deviation-data-single",
      },
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
    },
  });
