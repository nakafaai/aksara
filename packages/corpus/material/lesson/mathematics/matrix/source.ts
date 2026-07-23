import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsMatrixMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/mathematics/matrix",
  domain: "mathematics",
  key: "lesson.mathematics.matrix",
  kind: "lesson",
  routeSlugs: { en: "matrix", id: "matriks" },
  sections: [
    {
      routeSlugs: {
        en: "cofactor-expansion-method",
        id: "metode-ekspansi-kofaktor",
      },
      slug: "cofactor-expansion-method",
      translations: {
        en: {
          title: "Cofactor Expansion Method",
        },
        id: {
          title: "Metode Ekspansi Kofaktor",
        },
      },
    },
    {
      routeSlugs: { en: "matrix-addition", id: "penjumlahan-matriks" },
      slug: "matrix-addition",
      translations: {
        en: {
          title: "Matrix Addition",
        },
        id: {
          title: "Penjumlahan Matriks",
        },
      },
    },
    {
      routeSlugs: { en: "matrix-concept", id: "konsep-matriks" },
      slug: "matrix-concept",
      translations: {
        en: {
          title: "Matrix Concept",
        },
        id: {
          title: "Konsep Matriks",
        },
      },
    },
    {
      routeSlugs: { en: "matrix-determinant", id: "determinan-matriks" },
      slug: "matrix-determinant",
      translations: {
        en: {
          title: "Matrix Determinant",
        },
        id: {
          title: "Determinan Matriks",
        },
      },
    },
    {
      routeSlugs: { en: "matrix-equality", id: "kesamaan-dua-matriks" },
      slug: "matrix-equality",
      translations: {
        en: {
          title: "Matrix Equality",
        },
        id: {
          title: "Kesamaan Dua Matriks",
        },
      },
    },
    {
      routeSlugs: { en: "matrix-inverse", id: "invers-matriks" },
      slug: "matrix-inverse",
      translations: {
        en: {
          title: "Matrix Inverse",
        },
        id: {
          title: "Invers Matriks",
        },
      },
    },
    {
      routeSlugs: { en: "matrix-multiplication", id: "perkalian-matriks" },
      slug: "matrix-multiplication",
      translations: {
        en: {
          title: "Matrix Multiplication",
        },
        id: {
          title: "Perkalian Matriks",
        },
      },
    },
    {
      routeSlugs: {
        en: "matrix-scalar-multiplication",
        id: "perkalian-matriks-dengan-skalar",
      },
      slug: "matrix-scalar-multiplication",
      translations: {
        en: {
          title: "Matrix Scalar Multiplication",
        },
        id: {
          title: "Perkalian Matriks dengan Skalar",
        },
      },
    },
    {
      routeSlugs: { en: "matrix-subtraction", id: "pengurangan-matriks" },
      slug: "matrix-subtraction",
      translations: {
        en: {
          title: "Matrix Subtraction",
        },
        id: {
          title: "Pengurangan Matriks",
        },
      },
    },
    {
      routeSlugs: { en: "matrix-transpose", id: "matriks-transpos" },
      slug: "matrix-transpose",
      translations: {
        en: {
          title: "Matrix Transpose",
        },
        id: {
          title: "Matriks Transpos",
        },
      },
    },
    {
      routeSlugs: { en: "matrix-types", id: "jenis-jenis-matriks" },
      slug: "matrix-types",
      translations: {
        en: {
          title: "Matrix Types",
        },
        id: {
          title: "Jenis-Jenis Matriks",
        },
      },
    },
    {
      routeSlugs: {
        en: "properties-determinant-matrix",
        id: "sifat-determinan-matriks",
      },
      slug: "properties-determinant-matrix",
      translations: {
        en: {
          title: "Properties of Matrix Determinant",
        },
        id: {
          title: "Sifat Determinan Matriks",
        },
      },
    },
    {
      routeSlugs: { en: "sarrus-method", id: "metode-sarrus" },
      slug: "sarrus-method",
      translations: {
        en: {
          title: "Sarrus Method",
        },
        id: {
          title: "Metode Sarrus",
        },
      },
    },
  ],
  slug: "matrix",
  translations: {
    en: {
      description: "Compute determinants through minors and cofactors.",
      title: "Matrix",
    },
    id: {
      description: "Hitung determinan lewat minor dan kofaktor.",
      title: "Matriks",
    },
  },
});
