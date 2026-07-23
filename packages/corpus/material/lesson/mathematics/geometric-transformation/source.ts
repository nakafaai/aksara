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
        translations: {
          en: {
            title: "Composite Transformation Matrix",
          },
          id: {
            title: "Matriks Transformasi Komposisi",
          },
        },
      },
      {
        routeSlugs: { en: "dilation", id: "dilatasi" },
        slug: "dilation",
        translations: {
          en: {
            title: "Dilation",
          },
          id: {
            title: "Dilatasi",
          },
        },
      },
      {
        routeSlugs: { en: "dilation-matrix", id: "matriks-dilatasi" },
        slug: "dilation-matrix",
        translations: {
          en: {
            title: "Dilation Matrix",
          },
          id: {
            title: "Matriks Dilatasi",
          },
        },
      },
      {
        routeSlugs: {
          en: "matrix-transformation",
          id: "kaitan-matriks-dengan-transformasi",
        },
        slug: "matrix-transformation",
        translations: {
          en: {
            title: "Matrix and Transformation Connection",
          },
          id: {
            title: "Kaitan Matriks dengan Transformasi",
          },
        },
      },
      {
        routeSlugs: { en: "reflection-matrix", id: "matriks-pencerminan" },
        slug: "reflection-matrix",
        translations: {
          en: {
            title: "Reflection Matrix",
          },
          id: {
            title: "Matriks Pencerminan",
          },
        },
      },
      {
        routeSlugs: {
          en: "reflection-matrix-arbitrary-point",
          id: "matriks-pencerminan-terhadap-sebarang-titik",
        },
        slug: "reflection-matrix-arbitrary-point",
        translations: {
          en: {
            title: "Reflection Matrix over Arbitrary Point",
          },
          id: {
            title: "Matriks Pencerminan terhadap Sebarang Titik",
          },
        },
      },
      {
        routeSlugs: {
          en: "reflection-matrix-center",
          id: "matriks-pencerminan-terhadap-titik-pusat",
        },
        slug: "reflection-matrix-center",
        translations: {
          en: {
            title: "Reflection Matrix over Center Point",
          },
          id: {
            title: "Matriks Pencerminan terhadap Titik Pusat",
          },
        },
      },
      {
        routeSlugs: {
          en: "reflection-over-line",
          id: "pencerminan-terhadap-garis",
        },
        slug: "reflection-over-line",
        translations: {
          en: {
            title: "Reflection over a Line",
          },
          id: {
            title: "Pencerminan terhadap Garis",
          },
        },
      },
      {
        routeSlugs: {
          en: "reflection-over-point",
          id: "pencerminan-terhadap-titik",
        },
        slug: "reflection-over-point",
        translations: {
          en: {
            title: "Reflection over Point",
          },
          id: {
            title: "Pencerminan terhadap Titik",
          },
        },
      },
      {
        routeSlugs: {
          en: "reflection-over-x-axis",
          id: "pencerminan-terhadap-sumbu-horizontal",
        },
        slug: "reflection-over-x-axis",
        translations: {
          en: {
            title: "Reflection over the Horizontal Axis",
          },
          id: {
            title: "Pencerminan terhadap Sumbu Horizontal",
          },
        },
      },
      {
        routeSlugs: {
          en: "reflection-over-x-equals-k",
          id: "pencerminan-terhadap-garis-vertikal",
        },
        slug: "reflection-over-x-equals-k",
        translations: {
          en: {
            title: "Reflection over a Vertical Line",
          },
          id: {
            title: "Pencerminan terhadap Garis Vertikal",
          },
        },
      },
      {
        routeSlugs: {
          en: "reflection-over-y-axis",
          id: "pencerminan-terhadap-sumbu-vertikal",
        },
        slug: "reflection-over-y-axis",
        translations: {
          en: {
            title: "Reflection over the Vertical Axis",
          },
          id: {
            title: "Pencerminan terhadap Sumbu Vertikal",
          },
        },
      },
      {
        routeSlugs: {
          en: "reflection-over-y-equals-h",
          id: "pencerminan-terhadap-garis-horizontal",
        },
        slug: "reflection-over-y-equals-h",
        translations: {
          en: {
            title: "Reflection over a Horizontal Line",
          },
          id: {
            title: "Pencerminan terhadap Garis Horizontal",
          },
        },
      },
      {
        routeSlugs: {
          en: "reflection-over-y-equals-minus-x",
          id: "pencerminan-terhadap-garis-diagonal-negatif",
        },
        slug: "reflection-over-y-equals-minus-x",
        translations: {
          en: {
            title: "Reflection over the Negative Diagonal Line",
          },
          id: {
            title: "Pencerminan terhadap Garis Diagonal Negatif",
          },
        },
      },
      {
        routeSlugs: {
          en: "reflection-over-y-equals-x",
          id: "pencerminan-terhadap-garis-diagonal-utama",
        },
        slug: "reflection-over-y-equals-x",
        translations: {
          en: {
            title: "Reflection over the Main Diagonal Line",
          },
          id: {
            title: "Pencerminan terhadap Garis Diagonal Utama",
          },
        },
      },
      {
        routeSlugs: { en: "rotation", id: "rotasi" },
        slug: "rotation",
        translations: {
          en: {
            title: "Rotation",
          },
          id: {
            title: "Rotasi",
          },
        },
      },
      {
        routeSlugs: { en: "rotation-matrix", id: "matriks-rotasi" },
        slug: "rotation-matrix",
        translations: {
          en: {
            title: "Rotation Matrix",
          },
          id: {
            title: "Matriks Rotasi",
          },
        },
      },
      {
        routeSlugs: { en: "translation", id: "translasi" },
        slug: "translation",
        translations: {
          en: {
            title: "Translation",
          },
          id: {
            title: "Translasi",
          },
        },
      },
      {
        routeSlugs: { en: "translation-matrix", id: "matriks-translasi" },
        slug: "translation-matrix",
        translations: {
          en: {
            title: "Translation Matrix",
          },
          id: {
            title: "Matriks Translasi",
          },
        },
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
