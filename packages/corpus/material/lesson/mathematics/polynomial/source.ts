import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/mathematics/polynomial",
  domain: "mathematics",
  key: "lesson.mathematics.polynomial",
  kind: "lesson",
  routeSlugs: {
    en: "polynomial",
    id: "polinomial",
    de: "polynome",
    ms: "polinomial",
  },
  sections: [
    "addition-subtraction-polynomial",
    "division-polynomial",
    "factor-theorem",
    "horner-method",
    "multiplication-polynomial",
    "polynomial-concept",
    "polynomial-degree",
    "polynomial-factorization",
    "polynomial-function",
    "polynomial-graph",
    "polynomial-identity",
    "rational-zero",
    "remainder-theorem",
    "synthetic-division",
  ],
  slug: "polynomial",
  translations: {
    en: {
      description: "Combine like terms with polynomial operations.",
      title: "Polynomial",
    },
    id: {
      description: "Gabungkan suku sejenis dalam operasi polinomial.",
      title: "Polinomial",
    },
    de: {
      description: "Untersuche Polynome, ihre Nullstellen und Graphen.",
      title: "Polynome",
    },
    ms: {
      description: "Gabungkan sebutan serupa dalam operasi polinomial.",
      title: "Polinomial",
    },
  },
};

export default lesson;
