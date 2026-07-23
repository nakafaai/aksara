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
      translations: {
        en: {
          title: "Addition and Subtraction of Polynomials",
        },
        id: {
          title: "Penjumlahan dan Pengurangan Polinomial",
        },
      },
    },
    {
      routeSlugs: { en: "division-polynomial", id: "pembagian-polinomial" },
      slug: "division-polynomial",
      translations: {
        en: {
          title: "Division of Polynomials",
        },
        id: {
          title: "Pembagian Polinomial",
        },
      },
    },
    {
      routeSlugs: { en: "factor-theorem", id: "teorema-faktor" },
      slug: "factor-theorem",
      translations: {
        en: {
          title: "Factor Theorem",
        },
        id: {
          title: "Teorema Faktor",
        },
      },
    },
    {
      routeSlugs: { en: "horner-method", id: "metode-horner" },
      slug: "horner-method",
      translations: {
        en: {
          title: "Horner's Method",
        },
        id: {
          title: "Metode Horner",
        },
      },
    },
    {
      routeSlugs: {
        en: "multiplication-polynomial",
        id: "perkalian-polinomial",
      },
      slug: "multiplication-polynomial",
      translations: {
        en: {
          title: "Multiplication of Polynomials",
        },
        id: {
          title: "Perkalian Polinomial",
        },
      },
    },
    {
      routeSlugs: { en: "polynomial-concept", id: "konsep-polinomial" },
      slug: "polynomial-concept",
      translations: {
        en: {
          title: "Polynomial Concept",
        },
        id: {
          title: "Konsep Polinomial",
        },
      },
    },
    {
      routeSlugs: { en: "polynomial-degree", id: "derajat-polinomial" },
      slug: "polynomial-degree",
      translations: {
        en: {
          title: "Polynomial Degree",
        },
        id: {
          title: "Derajat Polinomial",
        },
      },
    },
    {
      routeSlugs: {
        en: "polynomial-factorization",
        id: "faktorisasi-penuh-polinomial",
      },
      slug: "polynomial-factorization",
      translations: {
        en: {
          title: "Complete Polynomial Factorization",
        },
        id: {
          title: "Faktorisasi Penuh Polinomial",
        },
      },
    },
    {
      routeSlugs: { en: "polynomial-function", id: "fungsi-polinomial" },
      slug: "polynomial-function",
      translations: {
        en: {
          title: "Polynomial Function",
        },
        id: {
          title: "Fungsi Polinomial",
        },
      },
    },
    {
      routeSlugs: { en: "polynomial-graph", id: "grafik-fungsi-polinomial" },
      slug: "polynomial-graph",
      translations: {
        en: {
          title: "Polynomial Graph",
        },
        id: {
          title: "Grafik Fungsi Polinomial",
        },
      },
    },
    {
      routeSlugs: { en: "polynomial-identity", id: "identitas-polinomial" },
      slug: "polynomial-identity",
      translations: {
        en: {
          title: "Polynomial Identity",
        },
        id: {
          title: "Identitas Polinomial",
        },
      },
    },
    {
      routeSlugs: { en: "rational-zero", id: "pembuat-nol-rasional" },
      slug: "rational-zero",
      translations: {
        en: {
          title: "Rational Zero Theorem",
        },
        id: {
          title: "Pembuat Nol Rasional",
        },
      },
    },
    {
      routeSlugs: { en: "remainder-theorem", id: "teorema-sisa" },
      slug: "remainder-theorem",
      translations: {
        en: {
          title: "Remainder Theorem",
        },
        id: {
          title: "Teorema Sisa",
        },
      },
    },
    {
      routeSlugs: { en: "synthetic-division", id: "pembagian-bersusun" },
      slug: "synthetic-division",
      translations: {
        en: {
          title: "Polynomial Long Division",
        },
        id: {
          title: "Pembagian Bersusun",
        },
      },
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
