import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsGeometricTransformationMaterial =
  defineLessonMaterial({
    assetRoot: "material/lesson/mathematics/geometric-transformation",
    domain: "mathematics",
    key: "lesson.mathematics.geometric-transformation",
    kind: "lesson",
    routeSlugs: { en: "geometric-transformation", id: "transformasi-geometri" },
    sections: [
      {
        routeSlugs: {
          en: "composite-transformation-matrix",
          id: "matriks-transformasi-komposisi",
        },
        slug: "composite-transformation-matrix",
      },
      {
        routeSlugs: { en: "dilation", id: "dilatasi" },
        slug: "dilation",
      },
      {
        routeSlugs: { en: "dilation-matrix", id: "matriks-dilatasi" },
        slug: "dilation-matrix",
      },
      {
        routeSlugs: {
          en: "matrix-transformation",
          id: "kaitan-matriks-dengan-transformasi",
        },
        slug: "matrix-transformation",
      },
      {
        routeSlugs: { en: "reflection-matrix", id: "matriks-pencerminan" },
        slug: "reflection-matrix",
      },
      {
        routeSlugs: {
          en: "reflection-matrix-arbitrary-point",
          id: "matriks-pencerminan-terhadap-sebarang-titik",
        },
        slug: "reflection-matrix-arbitrary-point",
      },
      {
        routeSlugs: {
          en: "reflection-matrix-center",
          id: "matriks-pencerminan-terhadap-titik-pusat",
        },
        slug: "reflection-matrix-center",
      },
      {
        routeSlugs: {
          en: "reflection-over-line",
          id: "pencerminan-terhadap-garis",
        },
        slug: "reflection-over-line",
      },
      {
        routeSlugs: {
          en: "reflection-over-point",
          id: "pencerminan-terhadap-titik",
        },
        slug: "reflection-over-point",
      },
      {
        routeSlugs: {
          en: "reflection-over-x-axis",
          id: "pencerminan-terhadap-sumbu-horizontal",
        },
        slug: "reflection-over-x-axis",
      },
      {
        routeSlugs: {
          en: "reflection-over-x-equals-k",
          id: "pencerminan-terhadap-garis-vertikal",
        },
        slug: "reflection-over-x-equals-k",
      },
      {
        routeSlugs: {
          en: "reflection-over-y-axis",
          id: "pencerminan-terhadap-sumbu-vertikal",
        },
        slug: "reflection-over-y-axis",
      },
      {
        routeSlugs: {
          en: "reflection-over-y-equals-h",
          id: "pencerminan-terhadap-garis-horizontal",
        },
        slug: "reflection-over-y-equals-h",
      },
      {
        routeSlugs: {
          en: "reflection-over-y-equals-minus-x",
          id: "pencerminan-terhadap-garis-diagonal-negatif",
        },
        slug: "reflection-over-y-equals-minus-x",
      },
      {
        routeSlugs: {
          en: "reflection-over-y-equals-x",
          id: "pencerminan-terhadap-garis-diagonal-utama",
        },
        slug: "reflection-over-y-equals-x",
      },
      {
        routeSlugs: { en: "rotation", id: "rotasi" },
        slug: "rotation",
      },
      {
        routeSlugs: { en: "rotation-matrix", id: "matriks-rotasi" },
        slug: "rotation-matrix",
      },
      {
        routeSlugs: { en: "translation", id: "translasi" },
        slug: "translation",
      },
      {
        routeSlugs: { en: "translation-matrix", id: "matriks-translasi" },
        slug: "translation-matrix",
      },
    ],
    slug: "geometric-transformation",
    translations: {
      en: {
        description: "Combine transformations with matrices.",
        title: "Geometric Transformation",
      },
      id: {
        description: "Gabungkan transformasi menggunakan matriks.",
        title: "Transformasi Geometri",
      },
    },
  });
