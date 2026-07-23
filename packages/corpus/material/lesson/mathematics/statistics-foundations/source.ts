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
        translations: {
          en: {
            title: "Applications of Measures of Central Tendency",
          },
          id: {
            title: "Penggunaan Ukuran Pemusatan",
          },
        },
      },
      {
        routeSlugs: { en: "histogram", id: "histogram" },
        slug: "histogram",
        translations: {
          en: {
            title: "Histogram",
          },
          id: {
            title: "Histogram",
          },
        },
      },
      {
        routeSlugs: { en: "interquartile-range", id: "jangkauan-interkuartil" },
        slug: "interquartile-range",
        translations: {
          en: {
            title: "Interquartile Range",
          },
          id: {
            title: "Jangkauan Interkuartil",
          },
        },
      },
      {
        routeSlugs: { en: "mean", id: "mean-rerata-atau-rata-rata" },
        slug: "mean",
        translations: {
          en: {
            title: "Mean (Average)",
          },
          id: {
            title: "Mean (Rerata atau Rata-rata)",
          },
        },
      },
      {
        routeSlugs: {
          en: "mean-group-data",
          id: "mean-rata-rata-data-kelompok",
        },
        slug: "mean-group-data",
        translations: {
          en: {
            title: "Mean for Grouped Data",
          },
          id: {
            title: "Mean/Rata-Rata Data Kelompok",
          },
        },
      },
      {
        routeSlugs: {
          en: "median-mode-group-data",
          id: "median-dan-kelas-modus-data-kelompok",
        },
        slug: "median-mode-group-data",
        translations: {
          en: {
            title: "Median and Modal Class for Grouped Data",
          },
          id: {
            title: "Median dan Kelas Modus Data Kelompok",
          },
        },
      },
      {
        routeSlugs: { en: "mode-median", id: "modus-dan-median" },
        slug: "mode-median",
        translations: {
          en: {
            title: "Mode and Median",
          },
          id: {
            title: "Modus dan Median",
          },
        },
      },
      {
        routeSlugs: {
          en: "percentile-data-group",
          id: "persentil-data-kelompok",
        },
        slug: "percentile-data-group",
        translations: {
          en: {
            title: "Percentiles for Grouped Data",
          },
          id: {
            title: "Persentil Data Kelompok",
          },
        },
      },
      {
        routeSlugs: { en: "quartile-data-group", id: "kuartil-data-kelompok" },
        slug: "quartile-data-group",
        translations: {
          en: {
            title: "Quartiles for Grouped Data",
          },
          id: {
            title: "Kuartil Data Kelompok",
          },
        },
      },
      {
        routeSlugs: { en: "quartile-data-single", id: "kuartil-data-tunggal" },
        slug: "quartile-data-single",
        translations: {
          en: {
            title: "Quartiles for Ungrouped Data",
          },
          id: {
            title: "Kuartil Data Tunggal",
          },
        },
      },
      {
        routeSlugs: { en: "relative-frequency", id: "frekuensi-relatif" },
        slug: "relative-frequency",
        translations: {
          en: {
            title: "Relative Frequency",
          },
          id: {
            title: "Frekuensi Relatif",
          },
        },
      },
      {
        routeSlugs: {
          en: "variance-standard-deviation-data-group",
          id: "varian-dan-simpangan-baku-data-kelompok",
        },
        slug: "variance-standard-deviation-data-group",
        translations: {
          en: {
            title: "Variance and Standard Deviation for Grouped Data",
          },
          id: {
            title: "Varian dan Simpangan Baku Data Kelompok",
          },
        },
      },
      {
        routeSlugs: {
          en: "variance-standard-deviation-data-single",
          id: "varian-dan-simpangan-baku-data-tunggal",
        },
        slug: "variance-standard-deviation-data-single",
        translations: {
          en: {
            title: "Variance and Standard Deviation for Ungrouped Data",
          },
          id: {
            title: "Varian dan Simpangan Baku Data Tunggal",
          },
        },
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
