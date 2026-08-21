import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsStatisticsFoundationsMaterial =
  defineLessonMaterial({
    assetRoot: "material/lesson/mathematics/statistics-foundations",
    domain: "mathematics",
    key: "lesson.mathematics.statistics-foundations",
    kind: "lesson",
    routeSlugs: {
      de: "grundlagen-der-statistik",
      en: "statistics-foundations",
      id: "statistika-dasar",
    },
    sections: [
      {
        routeSlugs: {
          de: "lageparameter-richtig-waehlen",
          en: "central-tendency-usage",
          id: "penggunaan-ukuran-pemusatan",
        },
        slug: "central-tendency-usage",
      },
      {
        routeSlugs: { de: "histogramme", en: "histogram", id: "histogram" },
        slug: "histogram",
      },
      {
        routeSlugs: {
          de: "interquartilsabstand",
          en: "interquartile-range",
          id: "jangkauan-interkuartil",
        },
        slug: "interquartile-range",
      },
      {
        routeSlugs: {
          de: "arithmetisches-mittel",
          en: "mean",
          id: "mean-rerata-atau-rata-rata",
        },
        slug: "mean",
      },
      {
        routeSlugs: {
          de: "mittelwert-gruppierter-daten",
          en: "mean-group-data",
          id: "mean-rata-rata-data-kelompok",
        },
        slug: "mean-group-data",
      },
      {
        routeSlugs: {
          de: "median-und-modalwert-gruppierter-daten",
          en: "median-mode-group-data",
          id: "median-dan-kelas-modus-data-kelompok",
        },
        slug: "median-mode-group-data",
      },
      {
        routeSlugs: {
          de: "modalwert-und-median",
          en: "mode-median",
          id: "modus-dan-median",
        },
        slug: "mode-median",
      },
      {
        routeSlugs: {
          de: "perzentile-gruppierter-daten",
          en: "percentile-data-group",
          id: "persentil-data-kelompok",
        },
        slug: "percentile-data-group",
      },
      {
        routeSlugs: {
          de: "quartile-gruppierter-daten",
          en: "quartile-data-group",
          id: "kuartil-data-kelompok",
        },
        slug: "quartile-data-group",
      },
      {
        routeSlugs: {
          de: "quartile-einzelner-daten",
          en: "quartile-data-single",
          id: "kuartil-data-tunggal",
        },
        slug: "quartile-data-single",
      },
      {
        routeSlugs: {
          de: "relative-haeufigkeit",
          en: "relative-frequency",
          id: "frekuensi-relatif",
        },
        slug: "relative-frequency",
      },
      {
        routeSlugs: {
          de: "varianz-und-standardabweichung-gruppierter-daten",
          en: "variance-standard-deviation-data-group",
          id: "varian-dan-simpangan-baku-data-kelompok",
        },
        slug: "variance-standard-deviation-data-group",
      },
      {
        routeSlugs: {
          de: "varianz-und-standardabweichung-einzelner-daten",
          en: "variance-standard-deviation-data-single",
          id: "varian-dan-simpangan-baku-data-tunggal",
        },
        slug: "variance-standard-deviation-data-single",
      },
    ],
    slug: "statistics-foundations",
    translations: {
      de: {
        description: "Beschreibe Daten mit Kennwerten und Histogrammen.",
        title: "Grundlagen der Statistik",
      },
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
