import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsMatrixMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/mathematics/matrix",
  domain: "mathematics",
  key: "lesson.mathematics.matrix",
  kind: "lesson",
  routeSlugs: { de: "matrizen", en: "matrix", id: "matriks" },
  sections: [
    {
      routeSlugs: {
        de: "kofaktorentwicklung",
        en: "cofactor-expansion-method",
        id: "metode-ekspansi-kofaktor",
      },
      slug: "cofactor-expansion-method",
    },
    {
      routeSlugs: {
        de: "matrixaddition",
        en: "matrix-addition",
        id: "penjumlahan-matriks",
      },
      slug: "matrix-addition",
    },
    {
      routeSlugs: {
        de: "grundidee-von-matrizen",
        en: "matrix-concept",
        id: "konsep-matriks",
      },
      slug: "matrix-concept",
    },
    {
      routeSlugs: {
        de: "determinante-einer-matrix",
        en: "matrix-determinant",
        id: "determinan-matriks",
      },
      slug: "matrix-determinant",
    },
    {
      routeSlugs: {
        de: "gleichheit-von-matrizen",
        en: "matrix-equality",
        id: "kesamaan-dua-matriks",
      },
      slug: "matrix-equality",
    },
    {
      routeSlugs: {
        de: "inverse-matrix",
        en: "matrix-inverse",
        id: "invers-matriks",
      },
      slug: "matrix-inverse",
    },
    {
      routeSlugs: {
        de: "matrixmultiplikation",
        en: "matrix-multiplication",
        id: "perkalian-matriks",
      },
      slug: "matrix-multiplication",
    },
    {
      routeSlugs: {
        de: "skalare-multiplikation-von-matrizen",
        en: "matrix-scalar-multiplication",
        id: "perkalian-matriks-dengan-skalar",
      },
      slug: "matrix-scalar-multiplication",
    },
    {
      routeSlugs: {
        de: "matrixsubtraktion",
        en: "matrix-subtraction",
        id: "pengurangan-matriks",
      },
      slug: "matrix-subtraction",
    },
    {
      routeSlugs: {
        de: "transponierte-matrix",
        en: "matrix-transpose",
        id: "matriks-transpos",
      },
      slug: "matrix-transpose",
    },
    {
      routeSlugs: {
        de: "matrixtypen",
        en: "matrix-types",
        id: "jenis-jenis-matriks",
      },
      slug: "matrix-types",
    },
    {
      routeSlugs: {
        de: "eigenschaften-von-determinanten",
        en: "properties-determinant-matrix",
        id: "sifat-determinan-matriks",
      },
      slug: "properties-determinant-matrix",
    },
    {
      routeSlugs: {
        de: "satz-von-sarrus",
        en: "sarrus-method",
        id: "metode-sarrus",
      },
      slug: "sarrus-method",
    },
  ],
  slug: "matrix",
  translations: {
    de: {
      description: "Lies, verknüpfe und untersuche Matrizen sicher.",
      title: "Matrizen",
    },
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
