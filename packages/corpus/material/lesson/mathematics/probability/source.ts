import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsProbabilityMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/mathematics/probability",
  domain: "mathematics",
  key: "lesson.mathematics.probability",
  kind: "lesson",
  routeSlugs: { en: "probability", id: "peluang" },
  sections: [
    {
      routeSlugs: { en: "addition-rule", id: "aturan-penjumlahan" },
      slug: "addition-rule",
      translations: {
        en: {
          title: "Addition Rule",
        },
        id: {
          title: "Aturan Penjumlahan",
        },
      },
    },
    {
      routeSlugs: { en: "probability-distribution", id: "distribusi-peluang" },
      slug: "probability-distribution",
      translations: {
        en: {
          title: "Probability Distribution",
        },
        id: {
          title: "Distribusi Peluang",
        },
      },
    },
    {
      routeSlugs: {
        en: "two-events-mutually-exclusive",
        id: "dua-kejadian-a-dan-b-saling-lepas",
      },
      slug: "two-events-mutually-exclusive",
      translations: {
        en: {
          title: "Mutually Exclusive Events A and B",
        },
        id: {
          title: "Dua Kejadian A dan B Saling Lepas",
        },
      },
    },
    {
      routeSlugs: {
        en: "two-events-not-mutually-exclusive",
        id: "dua-kejadian-a-dan-b-tidak-saling-lepas",
      },
      slug: "two-events-not-mutually-exclusive",
      translations: {
        en: {
          title: "Non-Mutually Exclusive Events A and B",
        },
        id: {
          title: "Dua Kejadian A dan B Tidak Saling Lepas",
        },
      },
    },
  ],
  slug: "probability",
  translations: {
    en: {
      description: "Use addition rules for overlapping and separate events.",
      title: "Probability",
    },
    id: {
      description: "Gunakan aturan penjumlahan untuk kejadian beririsan.",
      title: "Peluang",
    },
  },
});
