import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsSequenceSeriesMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/mathematics/sequence-series",
  domain: "mathematics",
  key: "lesson.mathematics.sequence-series",
  kind: "lesson",
  routeSlugs: {
    de: "folgen-und-reihen",
    en: "sequence-series",
    id: "barisan-dan-deret",
    ms: "jujukan-dan-siri",
  },
  sections: [
    {
      routeSlugs: {
        de: "begriff-der-folge",
        en: "sequence-concept",
        id: "konsep-barisan",
        ms: "konsep-jujukan",
      },
      slug: "sequence-concept",
    },
    {
      routeSlugs: {
        de: "arithmetische-folge",
        en: "arithmetic-sequence",
        id: "barisan-aritmetika",
        ms: "janjang-aritmetik",
      },
      slug: "arithmetic-sequence",
    },
    {
      routeSlugs: {
        de: "geometrische-folge",
        en: "geometric-sequence",
        id: "barisan-geometri",
        ms: "janjang-geometri",
      },
      slug: "geometric-sequence",
    },
    {
      routeSlugs: {
        de: "arithmetische-und-geometrische-folgen",
        en: "difference-arithmetic-geometric-sequence",
        id: "perbedaan-barisan-aritmetika-dan-geometri",
        ms: "beza-janjang-aritmetik-dan-geometri",
      },
      slug: "difference-arithmetic-geometric-sequence",
    },
    {
      routeSlugs: {
        de: "folge-und-reihe-im-vergleich",
        en: "difference-sequence-series",
        id: "perbedaan-barisan-dan-deret",
        ms: "beza-jujukan-dan-siri",
      },
      slug: "difference-sequence-series",
    },
    {
      routeSlugs: {
        de: "begriff-der-reihe",
        en: "series-concept",
        id: "konsep-deret",
        ms: "konsep-siri",
      },
      slug: "series-concept",
    },
    {
      routeSlugs: {
        de: "arithmetische-reihe",
        en: "arithmetic-series",
        id: "deret-aritmetika",
        ms: "siri-aritmetik",
      },
      slug: "arithmetic-series",
    },
    {
      routeSlugs: {
        de: "geometrische-reihe",
        en: "geometric-series",
        id: "deret-geometri",
        ms: "siri-geometri",
      },
      slug: "geometric-series",
    },
    {
      routeSlugs: {
        de: "unendliche-geometrische-reihe",
        en: "infinite-geometric-series",
        id: "deret-geometri-tak-hingga",
        ms: "siri-geometri-tak-terhingga",
      },
      slug: "infinite-geometric-series",
    },
    {
      routeSlugs: {
        de: "arithmetische-und-geometrische-reihen",
        en: "difference-arithmetic-geometric-series",
        id: "perbedaan-deret-aritmetika-dan-geometri",
        ms: "beza-siri-aritmetik-dan-geometri",
      },
      slug: "difference-arithmetic-geometric-series",
    },
    {
      routeSlugs: {
        de: "konvergenz-und-divergenz",
        en: "convergence-divergence",
        id: "perbedaan-konvergen-dan-divergen",
        ms: "penumpuan-dan-pencapahan",
      },
      slug: "convergence-divergence",
    },
  ],
  slug: "sequence-series",
  translations: {
    de: {
      description: "Finde Muster, Folgenglieder und Summen.",
      title: "Folgen und Reihen",
    },
    en: {
      description: "Find arithmetic patterns, terms, and sums.",
      title: "Sequence and Series",
    },
    id: {
      description: "Temukan pola, suku, dan jumlah barisan aritmetika.",
      title: "Barisan dan Deret",
    },
    ms: {
      description: "Cari pola aritmetik, sebutan dan hasil tambah.",
      title: "Jujukan dan Siri",
    },
  },
});
