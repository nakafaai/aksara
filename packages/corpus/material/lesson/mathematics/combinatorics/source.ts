import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsCombinatoricsMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/mathematics/combinatorics",
  domain: "mathematics",
  key: "lesson.mathematics.combinatorics",
  kind: "lesson",
  routeSlugs: { de: "kombinatorik", en: "combinatorics", id: "kombinatorik" },
  sections: [
    {
      routeSlugs: {
        de: "newtonscher-binomialsatz",
        en: "binomial-newton",
        id: "binomial-newton",
      },
      slug: "binomial-newton",
    },
    {
      routeSlugs: {
        de: "kreispermutation",
        en: "circular-permutation",
        id: "permutasi-siklis",
      },
      slug: "circular-permutation",
    },
    {
      routeSlugs: { de: "kombination", en: "combination", id: "kombinasi" },
      slug: "combination",
    },
    {
      routeSlugs: {
        de: "zaehlprinzipien",
        en: "filling-place-rule",
        id: "aturan-pengisian-tempat",
      },
      slug: "filling-place-rule",
    },
    {
      routeSlugs: {
        de: "permutation-aller-objekte",
        en: "permutation-of-n-items-from-n-objects",
        id: "permutasi-semua-objek",
      },
      slug: "permutation-of-n-items-from-n-objects",
    },
    {
      routeSlugs: {
        de: "permutation-mit-wiederholungen",
        en: "permutation-with-identical-objects",
        id: "permutasi-dengan-objek-yang-sama",
      },
      slug: "permutation-with-identical-objects",
    },
    {
      routeSlugs: {
        de: "wahrscheinlichkeit-eines-ereignisses",
        en: "probability-of-an-event",
        id: "peluang-suatu-kejadian",
      },
      slug: "probability-of-an-event",
    },
    {
      routeSlugs: {
        de: "wahrscheinlichkeit-zusammengesetzter-ereignisse",
        en: "probability-of-compound-events",
        id: "peluang-kejadian-majemuk",
      },
      slug: "probability-of-compound-events",
    },
    {
      routeSlugs: {
        de: "bedingte-wahrscheinlichkeit",
        en: "probability-of-independent-conditional-events",
        id: "peluang-kejadian-majemuk-saling-bebas-bersyarat",
      },
      slug: "probability-of-independent-conditional-events",
    },
    {
      routeSlugs: {
        de: "unabhaengige-ereignisse",
        en: "probability-of-independent-events",
        id: "peluang-kejadian-majemuk-saling-bebas",
      },
      slug: "probability-of-independent-events",
    },
    {
      routeSlugs: {
        de: "unvereinbare-ereignisse",
        en: "probability-of-mutually-exclusive-events",
        id: "peluang-kejadian-majemuk-saling-lepas",
      },
      slug: "probability-of-mutually-exclusive-events",
    },
  ],
  slug: "combinatorics",
  translations: {
    de: {
      description: "Zähle Anordnungen und berechne Wahrscheinlichkeiten.",
      title: "Kombinatorik",
    },
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
