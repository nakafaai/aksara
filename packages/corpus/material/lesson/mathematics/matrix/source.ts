import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsMatrixMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/mathematics/matrix",
  domain: "mathematics",
  key: "lesson.mathematics.matrix",
  kind: "lesson",
  routeSlugs: { de: "matrizen", en: "matrix", id: "matriks", ms: "matriks" },
  sections: [
    {
      routeSlugs: {
        de: "kofaktorentwicklung",
        en: "cofactor-expansion-method",
        id: "metode-ekspansi-kofaktor",
        ms: "kaedah-kembangan-kofaktor",
      },
      slug: "cofactor-expansion-method",
    },
    {
      routeSlugs: {
        de: "matrixaddition",
        en: "matrix-addition",
        id: "penjumlahan-matriks",
        ms: "penambahan-matriks",
      },
      slug: "matrix-addition",
    },
    {
      routeSlugs: {
        de: "grundidee-von-matrizen",
        en: "matrix-concept",
        id: "konsep-matriks",
        ms: "konsep-matriks",
      },
      slug: "matrix-concept",
    },
    {
      routeSlugs: {
        de: "determinante-einer-matrix",
        en: "matrix-determinant",
        id: "determinan-matriks",
        ms: "penentu-matriks",
      },
      slug: "matrix-determinant",
    },
    {
      routeSlugs: {
        de: "gleichheit-von-matrizen",
        en: "matrix-equality",
        id: "kesamaan-dua-matriks",
        ms: "kesamaan-matriks",
      },
      slug: "matrix-equality",
    },
    {
      routeSlugs: {
        de: "inverse-matrix",
        en: "matrix-inverse",
        id: "invers-matriks",
        ms: "matriks-songsang",
      },
      slug: "matrix-inverse",
    },
    {
      routeSlugs: {
        de: "matrixmultiplikation",
        en: "matrix-multiplication",
        id: "perkalian-matriks",
        ms: "pendaraban-matriks",
      },
      slug: "matrix-multiplication",
    },
    {
      routeSlugs: {
        de: "skalare-multiplikation-von-matrizen",
        en: "matrix-scalar-multiplication",
        id: "perkalian-matriks-dengan-skalar",
        ms: "pendaraban-skalar-matriks",
      },
      slug: "matrix-scalar-multiplication",
    },
    {
      routeSlugs: {
        de: "matrixsubtraktion",
        en: "matrix-subtraction",
        id: "pengurangan-matriks",
        ms: "penolakan-matriks",
      },
      slug: "matrix-subtraction",
    },
    {
      routeSlugs: {
        de: "transponierte-matrix",
        en: "matrix-transpose",
        id: "matriks-transpos",
        ms: "transpos-matriks",
      },
      slug: "matrix-transpose",
    },
    {
      routeSlugs: {
        de: "matrixtypen",
        en: "matrix-types",
        id: "jenis-jenis-matriks",
        ms: "jenis-jenis-matriks",
      },
      slug: "matrix-types",
    },
    {
      routeSlugs: {
        de: "eigenschaften-von-determinanten",
        en: "properties-determinant-matrix",
        id: "sifat-determinan-matriks",
        ms: "sifat-sifat-penentu-matriks",
      },
      slug: "properties-determinant-matrix",
    },
    {
      routeSlugs: {
        de: "satz-von-sarrus",
        en: "sarrus-method",
        id: "metode-sarrus",
        ms: "kaedah-sarrus",
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
    ms: {
      description: "Kira penentu melalui minor dan kofaktor.",
      title: "Matriks",
    },
  },
});
