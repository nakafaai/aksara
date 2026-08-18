import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsPolynomialMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/mathematics/polynomial",
  domain: "mathematics",
  key: "lesson.mathematics.polynomial",
  kind: "lesson",
  routeSlugs: { en: "polynomial", id: "polinomial" },
  sections: [
    {
      routeSlugs: {
        en: "addition-subtraction-polynomial",
        id: "penjumlahan-dan-pengurangan-polinomial",
      },
      slug: "addition-subtraction-polynomial",
    },
    {
      routeSlugs: { en: "division-polynomial", id: "pembagian-polinomial" },
      slug: "division-polynomial",
    },
    {
      routeSlugs: { en: "factor-theorem", id: "teorema-faktor" },
      slug: "factor-theorem",
    },
    {
      routeSlugs: { en: "horner-method", id: "metode-horner" },
      slug: "horner-method",
    },
    {
      routeSlugs: {
        en: "multiplication-polynomial",
        id: "perkalian-polinomial",
      },
      slug: "multiplication-polynomial",
    },
    {
      routeSlugs: { en: "polynomial-concept", id: "konsep-polinomial" },
      slug: "polynomial-concept",
    },
    {
      routeSlugs: { en: "polynomial-degree", id: "derajat-polinomial" },
      slug: "polynomial-degree",
    },
    {
      routeSlugs: {
        en: "polynomial-factorization",
        id: "faktorisasi-penuh-polinomial",
      },
      slug: "polynomial-factorization",
    },
    {
      routeSlugs: { en: "polynomial-function", id: "fungsi-polinomial" },
      slug: "polynomial-function",
    },
    {
      routeSlugs: { en: "polynomial-graph", id: "grafik-fungsi-polinomial" },
      slug: "polynomial-graph",
    },
    {
      routeSlugs: { en: "polynomial-identity", id: "identitas-polinomial" },
      slug: "polynomial-identity",
    },
    {
      routeSlugs: { en: "rational-zero", id: "pembuat-nol-rasional" },
      slug: "rational-zero",
    },
    {
      routeSlugs: { en: "remainder-theorem", id: "teorema-sisa" },
      slug: "remainder-theorem",
    },
    {
      routeSlugs: { en: "synthetic-division", id: "pembagian-bersusun" },
      slug: "synthetic-division",
    },
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
  },
});
