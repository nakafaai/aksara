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
      ms: "statistik-asas",
    },
    sections: [
      {
        routeSlugs: {
          de: "lageparameter-richtig-waehlen",
          en: "central-tendency-usage",
          id: "penggunaan-ukuran-pemusatan",
          ms: "penggunaan-sukatan-kecenderungan-memusat",
          ms: "histogram",
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
          ms: "julat-antara-kuartil",
        },
        slug: "interquartile-range",
      },
      {
        routeSlugs: {
          de: "arithmetisches-mittel",
          en: "mean",
          id: "mean-rerata-atau-rata-rata",
          ms: "min",
        },
        slug: "mean",
      },
      {
        routeSlugs: {
          de: "mittelwert-gruppierter-daten",
          en: "mean-group-data",
          id: "mean-rata-rata-data-kelompok",
          ms: "min-data-terkumpul",
        },
        slug: "mean-group-data",
      },
      {
        routeSlugs: {
          de: "median-und-modalwert-gruppierter-daten",
          en: "median-mode-group-data",
          id: "median-dan-kelas-modus-data-kelompok",
          ms: "median-dan-mod-data-terkumpul",
        },
        slug: "median-mode-group-data",
      },
      {
        routeSlugs: {
          de: "modalwert-und-median",
          en: "mode-median",
          id: "modus-dan-median",
          ms: "mod-dan-median",
        },
        slug: "mode-median",
      },
      {
        routeSlugs: {
          de: "perzentile-gruppierter-daten",
          en: "percentile-data-group",
          id: "persentil-data-kelompok",
          ms: "persentil-data-terkumpul",
        },
        slug: "percentile-data-group",
      },
      {
        routeSlugs: {
          de: "quartile-gruppierter-daten",
          en: "quartile-data-group",
          id: "kuartil-data-kelompok",
          ms: "kuartil-data-terkumpul",
        },
        slug: "quartile-data-group",
      },
      {
        routeSlugs: {
          de: "quartile-einzelner-daten",
          en: "quartile-data-single",
          id: "kuartil-data-tunggal",
          ms: "kuartil-data-tak-terkumpul",
        },
        slug: "quartile-data-single",
      },
      {
        routeSlugs: {
          de: "relative-haeufigkeit",
          en: "relative-frequency",
          id: "frekuensi-relatif",
          ms: "kekerapan-relatif",
        },
        slug: "relative-frequency",
      },
      {
        routeSlugs: {
          de: "varianz-und-standardabweichung-gruppierter-daten",
          en: "variance-standard-deviation-data-group",
          id: "varian-dan-simpangan-baku-data-kelompok",
          ms: "varians-dan-sisihan-piawai-data-terkumpul",
        },
        slug: "variance-standard-deviation-data-group",
      },
      {
        routeSlugs: {
          de: "varianz-und-standardabweichung-einzelner-daten",
          en: "variance-standard-deviation-data-single",
          id: "varian-dan-simpangan-baku-data-tunggal",
          ms: "varians-dan-sisihan-piawai-data-tak-terkumpul",
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
      ms: {
        description: "Pilih min, median, atau mod untuk data sebenar.",
        title: "Statistik",
      },
    },
  });
