import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/mathematics/exponential-logarithm",
  domain: "mathematics",
  key: "lesson.mathematics.exponential-logarithm",
  kind: "lesson",
  routeSlugs: {
    en: "exponential-logarithm",
    id: "eksponen-dan-logaritma",
    de: "potenzen-und-logarithmen",
    ms: "indeks-dan-logaritma",
  },
  sections: [
    "basic-concept",
    "exponential-decay",
    "exponential-growth",
    "function-definition",
    "function-exploration",
    "logarithm-definition",
    "logarithm-properties",
    "proof-properties",
    "properties",
    "radical-form",
    "rationalizing-radicals",
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
    de: {
      description: "Von Potenzen und Wurzeln zu Funktionen und Logarithmen.",
      title: "Potenzen und Logarithmen",
    },
    ms: {
      description: "Kaitkan pendaraban berulang dengan pola indeks.",
      title: "Indeks dan Logaritma",
    },
  },
};

export default lesson;
