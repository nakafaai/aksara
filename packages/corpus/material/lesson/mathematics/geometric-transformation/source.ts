import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsGeometricTransformationMaterial =
  defineLessonMaterial({
    assetRoot: "material/lesson/mathematics/geometric-transformation",
    domain: "mathematics",
    key: "lesson.mathematics.geometric-transformation",
    kind: "lesson",
    routeSlugs: {
      de: "geometrische-transformationen",
      en: "geometric-transformation",
      id: "transformasi-geometri",
    },
    sections: [
      {
        routeSlugs: {
          de: "zusammengesetzte-transformationen-mit-matrizen",
          en: "composite-transformation-matrix",
          id: "matriks-transformasi-komposisi",
        },
        slug: "composite-transformation-matrix",
      },
      {
        routeSlugs: { de: "streckung", en: "dilation", id: "dilatasi" },
        slug: "dilation",
      },
      {
        routeSlugs: {
          de: "streckungsmatrix",
          en: "dilation-matrix",
          id: "matriks-dilatasi",
        },
        slug: "dilation-matrix",
      },
      {
        routeSlugs: {
          de: "transformationsmatrix",
          en: "matrix-transformation",
          id: "kaitan-matriks-dengan-transformasi",
        },
        slug: "matrix-transformation",
      },
      {
        routeSlugs: {
          de: "spiegelungsmatrix",
          en: "reflection-matrix",
          id: "matriks-pencerminan",
        },
        slug: "reflection-matrix",
      },
      {
        routeSlugs: {
          de: "spiegelungsmatrix-an-beliebigem-punkt",
          en: "reflection-matrix-arbitrary-point",
          id: "matriks-pencerminan-terhadap-sebarang-titik",
        },
        slug: "reflection-matrix-arbitrary-point",
      },
      {
        routeSlugs: {
          de: "spiegelungsmatrix-um-den-ursprung",
          en: "reflection-matrix-center",
          id: "matriks-pencerminan-terhadap-titik-pusat",
        },
        slug: "reflection-matrix-center",
      },
      {
        routeSlugs: {
          de: "spiegelung-an-einer-geraden",
          en: "reflection-over-line",
          id: "pencerminan-terhadap-garis",
        },
        slug: "reflection-over-line",
      },
      {
        routeSlugs: {
          de: "punktspiegelung",
          en: "reflection-over-point",
          id: "pencerminan-terhadap-titik",
        },
        slug: "reflection-over-point",
      },
      {
        routeSlugs: {
          de: "spiegelung-an-der-x-achse",
          en: "reflection-over-x-axis",
          id: "pencerminan-terhadap-sumbu-horizontal",
        },
        slug: "reflection-over-x-axis",
      },
      {
        routeSlugs: {
          de: "spiegelung-an-x-gleich-k",
          en: "reflection-over-x-equals-k",
          id: "pencerminan-terhadap-garis-vertikal",
        },
        slug: "reflection-over-x-equals-k",
      },
      {
        routeSlugs: {
          de: "spiegelung-an-der-y-achse",
          en: "reflection-over-y-axis",
          id: "pencerminan-terhadap-sumbu-vertikal",
        },
        slug: "reflection-over-y-axis",
      },
      {
        routeSlugs: {
          de: "spiegelung-an-y-gleich-h",
          en: "reflection-over-y-equals-h",
          id: "pencerminan-terhadap-garis-horizontal",
        },
        slug: "reflection-over-y-equals-h",
      },
      {
        routeSlugs: {
          de: "spiegelung-an-y-gleich-minus-x",
          en: "reflection-over-y-equals-minus-x",
          id: "pencerminan-terhadap-garis-diagonal-negatif",
        },
        slug: "reflection-over-y-equals-minus-x",
      },
      {
        routeSlugs: {
          de: "spiegelung-an-y-gleich-x",
          en: "reflection-over-y-equals-x",
          id: "pencerminan-terhadap-garis-diagonal-utama",
        },
        slug: "reflection-over-y-equals-x",
      },
      {
        routeSlugs: { de: "rotation", en: "rotation", id: "rotasi" },
        slug: "rotation",
      },
      {
        routeSlugs: {
          de: "rotationsmatrix",
          en: "rotation-matrix",
          id: "matriks-rotasi",
        },
        slug: "rotation-matrix",
      },
      {
        routeSlugs: { de: "translation", en: "translation", id: "translasi" },
        slug: "translation",
      },
      {
        routeSlugs: {
          de: "translationsmatrix",
          en: "translation-matrix",
          id: "matriks-translasi",
        },
        slug: "translation-matrix",
      },
    ],
    slug: "geometric-transformation",
    translations: {
      de: {
        description: "Verknüpfe geometrische Transformationen mit Matrizen.",
        title: "Geometrische Transformationen",
      },
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
