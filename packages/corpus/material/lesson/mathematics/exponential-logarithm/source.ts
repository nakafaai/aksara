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
      ms: "indeks-dan-logaritma",
    },
    sections: [
      {
        routeSlugs: {
          de: "grundlagen",
          en: "basic-concept",
          id: "konsep-eksponen",
          ms: "konsep-indeks",
        },
        slug: "basic-concept",
      },
      {
        routeSlugs: {
          de: "exponentieller-zerfall",
          en: "exponential-decay",
          id: "peluruhan-eksponen",
          ms: "susutan-eksponen",
        },
        slug: "exponential-decay",
      },
      {
        routeSlugs: {
          de: "exponentielles-wachstum",
          en: "exponential-growth",
          id: "pertumbuhan-eksponen",
          ms: "pertumbuhan-eksponen",
        },
        slug: "exponential-growth",
      },
      {
        routeSlugs: {
          de: "exponentialfunktionen",
          en: "function-definition",
          id: "definisi-fungsi",
          ms: "definisi-fungsi-eksponen",
        },
        slug: "function-definition",
      },
      {
        routeSlugs: {
          de: "exponentialfunktionen-untersuchen",
          en: "function-exploration",
          id: "eksplorasi-fungsi",
          ms: "model-fungsi-eksponen",
        },
        slug: "function-exploration",
      },
      {
        routeSlugs: {
          de: "definition-des-logarithmus",
          en: "logarithm-definition",
          id: "definisi-logaritma",
          ms: "definisi-logaritma",
        },
        slug: "logarithm-definition",
      },
      {
        routeSlugs: {
          de: "logarithmengesetze",
          en: "logarithm-properties",
          id: "sifat-logaritma",
          ms: "hukum-logaritma",
        },
        slug: "logarithm-properties",
      },
      {
        routeSlugs: {
          de: "potenzgesetze-begruenden",
          en: "proof-properties",
          id: "pembuktian-sifat",
          ms: "pembuktian-hukum-indeks",
        },
        slug: "proof-properties",
      },
      {
        routeSlugs: {
          de: "potenzgesetze",
          en: "properties",
          id: "sifat-eksponen",
          ms: "hukum-indeks",
        },
        slug: "properties",
      },
      {
        routeSlugs: {
          de: "wurzel-und-potenzschreibweise",
          en: "radical-form",
          id: "bentuk-akar",
          ms: "bentuk-surd",
        },
        slug: "radical-form",
      },
      {
        routeSlugs: {
          de: "nenner-rationalisieren",
          en: "rationalizing-radicals",
          id: "merasionalkan-akar",
          ms: "merasionalkan-surd",
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
      ms: {
        description: "Kaitkan pendaraban berulang dengan pola indeks.",
        title: "Indeks dan Logaritma",
      },
    },
  });
