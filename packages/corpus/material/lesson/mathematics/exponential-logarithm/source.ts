import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsExponentialLogarithmMaterial =
  defineLessonMaterial({
    assetRoot: "material/lesson/mathematics/exponential-logarithm",
    domain: "mathematics",
    key: "lesson.mathematics.exponential-logarithm",
    kind: "lesson",
    routeSlugs: { en: "exponential-logarithm", id: "eksponen-dan-logaritma" },
    sections: [
      {
        routeSlugs: { en: "basic-concept", id: "konsep-eksponen" },
        slug: "basic-concept",
        translations: {
          en: {
            title: "Exponent Concepts",
          },
          id: {
            title: "Konsep Eksponen",
          },
        },
      },
      {
        routeSlugs: { en: "exponential-decay", id: "peluruhan-eksponen" },
        slug: "exponential-decay",
        translations: {
          en: {
            title: "Exponential Decay",
          },
          id: {
            title: "Peluruhan Eksponen",
          },
        },
      },
      {
        routeSlugs: { en: "exponential-growth", id: "pertumbuhan-eksponen" },
        slug: "exponential-growth",
        translations: {
          en: {
            title: "Exponential Growth",
          },
          id: {
            title: "Pertumbuhan Eksponen",
          },
        },
      },
      {
        routeSlugs: { en: "function-definition", id: "definisi-fungsi" },
        slug: "function-definition",
        translations: {
          en: {
            title: "Function Definition",
          },
          id: {
            title: "Definisi Fungsi",
          },
        },
      },
      {
        routeSlugs: { en: "function-exploration", id: "eksplorasi-fungsi" },
        slug: "function-exploration",
        translations: {
          en: {
            title: "Function Exploration",
          },
          id: {
            title: "Eksplorasi Fungsi",
          },
        },
      },
      {
        routeSlugs: { en: "logarithm-definition", id: "definisi-logaritma" },
        slug: "logarithm-definition",
        translations: {
          en: {
            title: "Logarithm Definition",
          },
          id: {
            title: "Definisi Logaritma",
          },
        },
      },
      {
        routeSlugs: { en: "logarithm-properties", id: "sifat-logaritma" },
        slug: "logarithm-properties",
        translations: {
          en: {
            title: "Logarithm Properties",
          },
          id: {
            title: "Sifat Logaritma",
          },
        },
      },
      {
        routeSlugs: { en: "proof-properties", id: "pembuktian-sifat" },
        slug: "proof-properties",
        translations: {
          en: {
            title: "Property Proofs",
          },
          id: {
            title: "Pembuktian Sifat",
          },
        },
      },
      {
        routeSlugs: { en: "properties", id: "sifat-eksponen" },
        slug: "properties",
        translations: {
          en: {
            title: "Exponent Properties",
          },
          id: {
            title: "Sifat Eksponen",
          },
        },
      },
      {
        routeSlugs: { en: "radical-form", id: "bentuk-akar" },
        slug: "radical-form",
        translations: {
          en: {
            title: "Radical Form",
          },
          id: {
            title: "Bentuk Akar",
          },
        },
      },
      {
        routeSlugs: { en: "rationalizing-radicals", id: "merasionalkan-akar" },
        slug: "rationalizing-radicals",
        translations: {
          en: {
            title: "Rationalizing Radicals",
          },
          id: {
            title: "Merasionalkan Akar",
          },
        },
      },
    ],
    slug: "exponential-logarithm",
    translations: {
      en: {
        description: "Connect repeated multiplication to exponent patterns.",
        title: "Exponents and Logarithms",
      },
      id: {
        description: "Hubungkan perkalian berulang dengan pola eksponen.",
        title: "Eksponen dan Logaritma",
      },
    },
  });
