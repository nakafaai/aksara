import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsExponentialLogarithmMaterial =
  defineLessonMaterial({
    assetRoot: "material/lesson/mathematics/exponential-logarithm",
    domain: "mathematics",
    key: "lesson.mathematics.exponential-logarithm",
    kind: "lesson",
    routeSlugs: {
      de: "potenzen-und-logarithmen",
      en: "exponential-logarithm",
      id: "eksponen-dan-logaritma",
    },
    sections: [
      {
        routeSlugs: {
          de: "grundlagen",
          en: "basic-concept",
          id: "konsep-eksponen",
        },
        slug: "basic-concept",
      },
      {
        routeSlugs: {
          de: "exponentieller-zerfall",
          en: "exponential-decay",
          id: "peluruhan-eksponen",
        },
        slug: "exponential-decay",
      },
      {
        routeSlugs: {
          de: "exponentielles-wachstum",
          en: "exponential-growth",
          id: "pertumbuhan-eksponen",
        },
        slug: "exponential-growth",
      },
      {
        routeSlugs: {
          de: "exponentialfunktionen",
          en: "function-definition",
          id: "definisi-fungsi",
        },
        slug: "function-definition",
      },
      {
        routeSlugs: {
          de: "exponentialfunktionen-untersuchen",
          en: "function-exploration",
          id: "eksplorasi-fungsi",
        },
        slug: "function-exploration",
      },
      {
        routeSlugs: {
          de: "definition-des-logarithmus",
          en: "logarithm-definition",
          id: "definisi-logaritma",
        },
        slug: "logarithm-definition",
      },
      {
        routeSlugs: {
          de: "logarithmengesetze",
          en: "logarithm-properties",
          id: "sifat-logaritma",
        },
        slug: "logarithm-properties",
      },
      {
        routeSlugs: {
          de: "potenzgesetze-begruenden",
          en: "proof-properties",
          id: "pembuktian-sifat",
        },
        slug: "proof-properties",
      },
      {
        routeSlugs: {
          de: "potenzgesetze",
          en: "properties",
          id: "sifat-eksponen",
        },
        slug: "properties",
      },
      {
        routeSlugs: {
          de: "wurzel-und-potenzschreibweise",
          en: "radical-form",
          id: "bentuk-akar",
        },
        slug: "radical-form",
      },
      {
        routeSlugs: {
          de: "nenner-rationalisieren",
          en: "rationalizing-radicals",
          id: "merasionalkan-akar",
        },
        slug: "rationalizing-radicals",
      },
    ],
    slug: "exponential-logarithm",
    translations: {
      de: {
        description: "Von Potenzen und Wurzeln zu Funktionen und Logarithmen.",
        title: "Potenzen und Logarithmen",
      },
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
