import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsSequenceSeriesMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/mathematics/sequence-series",
  domain: "mathematics",
  key: "lesson.mathematics.sequence-series",
  kind: "lesson",
  routeSlugs: { en: "sequence-series", id: "barisan-dan-deret" },
  sections: [
    {
      routeSlugs: { en: "sequence-concept", id: "konsep-barisan" },
      slug: "sequence-concept",
      translations: {
        en: {
          title: "Sequence Concept",
        },
        id: {
          title: "Konsep Barisan",
        },
      },
    },
    {
      routeSlugs: { en: "arithmetic-sequence", id: "barisan-aritmetika" },
      slug: "arithmetic-sequence",
      translations: {
        en: {
          title: "Arithmetic Sequence",
        },
        id: {
          title: "Barisan Aritmetika",
        },
      },
    },
    {
      routeSlugs: { en: "geometric-sequence", id: "barisan-geometri" },
      slug: "geometric-sequence",
      translations: {
        en: {
          title: "Geometric Sequence",
        },
        id: {
          title: "Barisan Geometri",
        },
      },
    },
    {
      routeSlugs: {
        en: "difference-arithmetic-geometric-sequence",
        id: "perbedaan-barisan-aritmetika-dan-geometri",
      },
      slug: "difference-arithmetic-geometric-sequence",
      translations: {
        en: {
          title: "Difference between Arithmetic and Geometric Sequence",
        },
        id: {
          title: "Perbedaan Barisan Aritmetika dan Geometri",
        },
      },
    },
    {
      routeSlugs: {
        en: "difference-sequence-series",
        id: "perbedaan-barisan-dan-deret",
      },
      slug: "difference-sequence-series",
      translations: {
        en: {
          title: "Difference between Sequence and Series",
        },
        id: {
          title: "Perbedaan Barisan dan Deret",
        },
      },
    },
    {
      routeSlugs: { en: "series-concept", id: "konsep-deret" },
      slug: "series-concept",
      translations: {
        en: {
          title: "Series Concept",
        },
        id: {
          title: "Konsep Deret",
        },
      },
    },
    {
      routeSlugs: { en: "arithmetic-series", id: "deret-aritmetika" },
      slug: "arithmetic-series",
      translations: {
        en: {
          title: "Arithmetic Series",
        },
        id: {
          title: "Deret Aritmetika",
        },
      },
    },
    {
      routeSlugs: { en: "geometric-series", id: "deret-geometri" },
      slug: "geometric-series",
      translations: {
        en: {
          title: "Geometric Series",
        },
        id: {
          title: "Deret Geometri",
        },
      },
    },
    {
      routeSlugs: {
        en: "infinite-geometric-series",
        id: "deret-geometri-tak-hingga",
      },
      slug: "infinite-geometric-series",
      translations: {
        en: {
          title: "Infinite Geometric Series",
        },
        id: {
          title: "Deret Geometri Tak Hingga",
        },
      },
    },
    {
      routeSlugs: {
        en: "difference-arithmetic-geometric-series",
        id: "perbedaan-deret-aritmetika-dan-geometri",
      },
      slug: "difference-arithmetic-geometric-series",
      translations: {
        en: {
          title: "Difference between Arithmetic and Geometric Series",
        },
        id: {
          title: "Perbedaan Deret Aritmetika dan Geometri",
        },
      },
    },
    {
      routeSlugs: {
        en: "convergence-divergence",
        id: "perbedaan-konvergen-dan-divergen",
      },
      slug: "convergence-divergence",
      translations: {
        en: {
          title: "Difference Between Convergence and Divergence",
        },
        id: {
          title: "Perbedaan Konvergen dan Divergen",
        },
      },
    },
  ],
  slug: "sequence-series",
  translations: {
    en: {
      description: "Find arithmetic patterns, terms, and sums.",
      title: "Sequence and Series",
    },
    id: {
      description: "Temukan pola, suku, dan jumlah barisan aritmetika.",
      title: "Barisan dan Deret",
    },
  },
});
