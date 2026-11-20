import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/mathematics/sequence-series",
  domain: "mathematics",
  key: "lesson.mathematics.sequence-series",
  kind: "lesson",
  routeSlugs: {
    en: "sequence-series",
    id: "barisan-dan-deret",
    de: "folgen-und-reihen",
    ms: "jujukan-dan-siri",
  },
  sections: [
    "sequence-concept",
    "arithmetic-sequence",
    "geometric-sequence",
    "difference-arithmetic-geometric-sequence",
    "difference-sequence-series",
    "series-concept",
    "arithmetic-series",
    "geometric-series",
    "infinite-geometric-series",
    "difference-arithmetic-geometric-series",
    "convergence-divergence",
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
    de: {
      description: "Finde Muster, Folgenglieder und Summen.",
      title: "Folgen und Reihen",
    },
    ms: {
      description: "Cari pola aritmetik, sebutan dan hasil tambah.",
      title: "Jujukan dan Siri",
    },
  },
};

export default lesson;
