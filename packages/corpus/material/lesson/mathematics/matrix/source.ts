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
    },
    {
      routeSlugs: { en: "matrix-addition", id: "penjumlahan-matriks" },
      slug: "matrix-addition",
    },
    {
      routeSlugs: { en: "matrix-concept", id: "konsep-matriks" },
      slug: "matrix-concept",
    },
    {
      routeSlugs: { en: "matrix-determinant", id: "determinan-matriks" },
      slug: "matrix-determinant",
    },
    {
      routeSlugs: { en: "matrix-equality", id: "kesamaan-dua-matriks" },
      slug: "matrix-equality",
    },
    {
      routeSlugs: { en: "matrix-inverse", id: "invers-matriks" },
      slug: "matrix-inverse",
    },
    {
      routeSlugs: { en: "matrix-multiplication", id: "perkalian-matriks" },
      slug: "matrix-multiplication",
    },
    {
      routeSlugs: {
        en: "matrix-scalar-multiplication",
        id: "perkalian-matriks-dengan-skalar",
      },
      slug: "matrix-scalar-multiplication",
    },
    {
      routeSlugs: { en: "matrix-subtraction", id: "pengurangan-matriks" },
      slug: "matrix-subtraction",
    },
    {
      routeSlugs: { en: "matrix-transpose", id: "matriks-transpos" },
      slug: "matrix-transpose",
    },
    {
      routeSlugs: { en: "matrix-types", id: "jenis-jenis-matriks" },
      slug: "matrix-types",
    },
    {
      routeSlugs: {
        en: "properties-determinant-matrix",
        id: "sifat-determinan-matriks",
      },
      slug: "properties-determinant-matrix",
    },
    {
      routeSlugs: { en: "sarrus-method", id: "metode-sarrus" },
      slug: "sarrus-method",
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
