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
      translations: {
        en: {
          title: "Binomial Newton",
        },
        id: {
          title: "Binomial Newton",
        },
      },
    },
    {
      routeSlugs: { en: "circular-permutation", id: "permutasi-siklis" },
      slug: "circular-permutation",
      translations: {
        en: {
          title: "Circular Permutation",
        },
        id: {
          title: "Permutasi Siklis",
        },
      },
    },
    {
      routeSlugs: { en: "combination", id: "kombinasi" },
      slug: "combination",
      translations: {
        en: {
          title: "Combination",
        },
        id: {
          title: "Kombinasi",
        },
      },
    },
    {
      routeSlugs: { en: "filling-place-rule", id: "aturan-pengisian-tempat" },
      slug: "filling-place-rule",
      translations: {
        en: {
          title: "Slot Filling Rule",
        },
        id: {
          title: "Aturan Pengisian Tempat",
        },
      },
    },
    {
      routeSlugs: {
        en: "permutation-of-n-items-from-n-objects",
        id: "permutasi-semua-objek",
      },
      slug: "permutation-of-n-items-from-n-objects",
      translations: {
        en: {
          title: "Permutation of All Objects",
        },
        id: {
          title: "Permutasi Semua Objek",
        },
      },
    },
    {
      routeSlugs: {
        en: "permutation-with-identical-objects",
        id: "permutasi-dengan-objek-yang-sama",
      },
      slug: "permutation-with-identical-objects",
      translations: {
        en: {
          title: "Permutation with Identical Objects",
        },
        id: {
          title: "Permutasi dengan Objek yang Sama",
        },
      },
    },
    {
      routeSlugs: {
        en: "probability-of-an-event",
        id: "peluang-suatu-kejadian",
      },
      slug: "probability-of-an-event",
      translations: {
        en: {
          title: "Probability of an Event",
        },
        id: {
          title: "Peluang Suatu Kejadian",
        },
      },
    },
    {
      routeSlugs: {
        en: "probability-of-compound-events",
        id: "peluang-kejadian-majemuk",
      },
      slug: "probability-of-compound-events",
      translations: {
        en: {
          title: "Probability of Compound Events",
        },
        id: {
          title: "Peluang Kejadian Majemuk",
        },
      },
    },
    {
      routeSlugs: {
        en: "probability-of-independent-conditional-events",
        id: "peluang-kejadian-majemuk-saling-bebas-bersyarat",
      },
      slug: "probability-of-independent-conditional-events",
      translations: {
        en: {
          title: "Probability of Independent Conditional Events",
        },
        id: {
          title: "Peluang Kejadian Majemuk Saling Bebas Bersyarat",
        },
      },
    },
    {
      routeSlugs: {
        en: "probability-of-independent-events",
        id: "peluang-kejadian-majemuk-saling-bebas",
      },
      slug: "probability-of-independent-events",
      translations: {
        en: {
          title: "Probability of Independent Events",
        },
        id: {
          title: "Peluang Kejadian Majemuk Saling Bebas",
        },
      },
    },
    {
      routeSlugs: {
        en: "probability-of-mutually-exclusive-events",
        id: "peluang-kejadian-majemuk-saling-lepas",
      },
      slug: "probability-of-mutually-exclusive-events",
      translations: {
        en: {
          title: "Probability of Mutually Exclusive Events",
        },
        id: {
          title: "Peluang Kejadian Majemuk Saling Lepas",
        },
      },
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
