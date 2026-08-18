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
      },
      {
        routeSlugs: { en: "exponential-decay", id: "peluruhan-eksponen" },
        slug: "exponential-decay",
      },
      {
        routeSlugs: { en: "exponential-growth", id: "pertumbuhan-eksponen" },
        slug: "exponential-growth",
      },
      {
        routeSlugs: { en: "function-definition", id: "definisi-fungsi" },
        slug: "function-definition",
      },
      {
        routeSlugs: { en: "function-exploration", id: "eksplorasi-fungsi" },
        slug: "function-exploration",
      },
      {
        routeSlugs: { en: "logarithm-definition", id: "definisi-logaritma" },
        slug: "logarithm-definition",
      },
      {
        routeSlugs: { en: "logarithm-properties", id: "sifat-logaritma" },
        slug: "logarithm-properties",
      },
      {
        routeSlugs: { en: "proof-properties", id: "pembuktian-sifat" },
        slug: "proof-properties",
      },
      {
        routeSlugs: { en: "properties", id: "sifat-eksponen" },
        slug: "properties",
      },
      {
        routeSlugs: { en: "radical-form", id: "bentuk-akar" },
        slug: "radical-form",
      },
      {
        routeSlugs: { en: "rationalizing-radicals", id: "merasionalkan-akar" },
        slug: "rationalizing-radicals",
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
