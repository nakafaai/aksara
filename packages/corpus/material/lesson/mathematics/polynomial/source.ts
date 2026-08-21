import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsPolynomialMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/mathematics/polynomial",
  domain: "mathematics",
  key: "lesson.mathematics.polynomial",
  kind: "lesson",
  routeSlugs: { de: "polynome", en: "polynomial", id: "polinomial" },
  sections: [
    {
      routeSlugs: {
        de: "addition-und-subtraktion-von-polynomen",
        en: "addition-subtraction-polynomial",
        id: "penjumlahan-dan-pengurangan-polinomial",
      },
      slug: "addition-subtraction-polynomial",
    },
    {
      routeSlugs: {
        de: "polynomdivision",
        en: "division-polynomial",
        id: "pembagian-polinomial",
      },
      slug: "division-polynomial",
    },
    {
      routeSlugs: {
        de: "faktorsatz",
        en: "factor-theorem",
        id: "teorema-faktor",
      },
      slug: "factor-theorem",
    },
    {
      routeSlugs: {
        de: "horner-schema",
        en: "horner-method",
        id: "metode-horner",
      },
      slug: "horner-method",
    },
    {
      routeSlugs: {
        de: "multiplikation-von-polynomen",
        en: "multiplication-polynomial",
        id: "perkalian-polinomial",
      },
      slug: "multiplication-polynomial",
    },
    {
      routeSlugs: {
        de: "grundidee-von-polynomen",
        en: "polynomial-concept",
        id: "konsep-polinomial",
      },
      slug: "polynomial-concept",
    },
    {
      routeSlugs: {
        de: "grad-eines-polynoms",
        en: "polynomial-degree",
        id: "derajat-polinomial",
      },
      slug: "polynomial-degree",
    },
    {
      routeSlugs: {
        de: "faktorisierung-von-polynomen",
        en: "polynomial-factorization",
        id: "faktorisasi-penuh-polinomial",
      },
      slug: "polynomial-factorization",
    },
    {
      routeSlugs: {
        de: "polynomfunktionen",
        en: "polynomial-function",
        id: "fungsi-polinomial",
      },
      slug: "polynomial-function",
    },
    {
      routeSlugs: {
        de: "graphen-von-polynomfunktionen",
        en: "polynomial-graph",
        id: "grafik-fungsi-polinomial",
      },
      slug: "polynomial-graph",
    },
    {
      routeSlugs: {
        de: "polynomidentitaeten",
        en: "polynomial-identity",
        id: "identitas-polinomial",
      },
      slug: "polynomial-identity",
    },
    {
      routeSlugs: {
        de: "rationale-nullstellen",
        en: "rational-zero",
        id: "pembuat-nol-rasional",
      },
      slug: "rational-zero",
    },
    {
      routeSlugs: {
        de: "restsatz",
        en: "remainder-theorem",
        id: "teorema-sisa",
      },
      slug: "remainder-theorem",
    },
    {
      routeSlugs: {
        de: "polynomdivision-schritt-fuer-schritt",
        en: "synthetic-division",
        id: "pembagian-bersusun",
      },
      slug: "synthetic-division",
    },
  ],
  slug: "polynomial",
  translations: {
    de: {
      description: "Untersuche Polynome, ihre Nullstellen und Graphen.",
      title: "Polynome",
    },
    en: {
      description: "Combine like terms with polynomial operations.",
      title: "Polynomial",
    },
    id: {
      description: "Gabungkan suku sejenis dalam operasi polinomial.",
      title: "Polinomial",
    },
  },
});
