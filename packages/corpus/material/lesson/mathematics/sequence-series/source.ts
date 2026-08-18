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
    },
    {
      routeSlugs: { en: "arithmetic-sequence", id: "barisan-aritmetika" },
      slug: "arithmetic-sequence",
    },
    {
      routeSlugs: { en: "geometric-sequence", id: "barisan-geometri" },
      slug: "geometric-sequence",
    },
    {
      routeSlugs: {
        en: "difference-arithmetic-geometric-sequence",
        id: "perbedaan-barisan-aritmetika-dan-geometri",
      },
      slug: "difference-arithmetic-geometric-sequence",
    },
    {
      routeSlugs: {
        en: "difference-sequence-series",
        id: "perbedaan-barisan-dan-deret",
      },
      slug: "difference-sequence-series",
    },
    {
      routeSlugs: { en: "series-concept", id: "konsep-deret" },
      slug: "series-concept",
    },
    {
      routeSlugs: { en: "arithmetic-series", id: "deret-aritmetika" },
      slug: "arithmetic-series",
    },
    {
      routeSlugs: { en: "geometric-series", id: "deret-geometri" },
      slug: "geometric-series",
    },
    {
      routeSlugs: {
        en: "infinite-geometric-series",
        id: "deret-geometri-tak-hingga",
      },
      slug: "infinite-geometric-series",
    },
    {
      routeSlugs: {
        en: "difference-arithmetic-geometric-series",
        id: "perbedaan-deret-aritmetika-dan-geometri",
      },
      slug: "difference-arithmetic-geometric-series",
    },
    {
      routeSlugs: {
        en: "convergence-divergence",
        id: "perbedaan-konvergen-dan-divergen",
      },
      slug: "convergence-divergence",
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
