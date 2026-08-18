import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsCombinatoricsMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/mathematics/combinatorics",
  domain: "mathematics",
  key: "lesson.mathematics.combinatorics",
  kind: "lesson",
  routeSlugs: { en: "combinatorics", id: "kombinatorik" },
  sections: [
    {
      routeSlugs: { en: "binomial-newton", id: "binomial-newton" },
      slug: "binomial-newton",
    },
    {
      routeSlugs: { en: "circular-permutation", id: "permutasi-siklis" },
      slug: "circular-permutation",
    },
    {
      routeSlugs: { en: "combination", id: "kombinasi" },
      slug: "combination",
    },
    {
      routeSlugs: { en: "filling-place-rule", id: "aturan-pengisian-tempat" },
      slug: "filling-place-rule",
    },
    {
      routeSlugs: {
        en: "permutation-of-n-items-from-n-objects",
        id: "permutasi-semua-objek",
      },
      slug: "permutation-of-n-items-from-n-objects",
    },
    {
      routeSlugs: {
        en: "permutation-with-identical-objects",
        id: "permutasi-dengan-objek-yang-sama",
      },
      slug: "permutation-with-identical-objects",
    },
    {
      routeSlugs: {
        en: "probability-of-an-event",
        id: "peluang-suatu-kejadian",
      },
      slug: "probability-of-an-event",
    },
    {
      routeSlugs: {
        en: "probability-of-compound-events",
        id: "peluang-kejadian-majemuk",
      },
      slug: "probability-of-compound-events",
    },
    {
      routeSlugs: {
        en: "probability-of-independent-conditional-events",
        id: "peluang-kejadian-majemuk-saling-bebas-bersyarat",
      },
      slug: "probability-of-independent-conditional-events",
    },
    {
      routeSlugs: {
        en: "probability-of-independent-events",
        id: "peluang-kejadian-majemuk-saling-bebas",
      },
      slug: "probability-of-independent-events",
    },
    {
      routeSlugs: {
        en: "probability-of-mutually-exclusive-events",
        id: "peluang-kejadian-majemuk-saling-lepas",
      },
      slug: "probability-of-mutually-exclusive-events",
    },
  ],
  slug: "combinatorics",
  translations: {
    en: {
      description: "Expand powers quickly with binomial coefficients.",
      title: "Combinatorics",
    },
    id: {
      description: "Kembangkan pangkat cepat dengan koefisien binomial.",
      title: "Kombinatorik",
    },
  },
});
