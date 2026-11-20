import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/mathematics/geometric-transformation",
  domain: "mathematics",
  key: "lesson.mathematics.geometric-transformation",
  kind: "lesson",
  routeSlugs: {
    en: "geometric-transformation",
    id: "transformasi-geometri",
    de: "geometrische-transformationen",
    ms: "transformasi-geometri",
  },
  sections: [
    "composite-transformation-matrix",
    "dilation",
    "dilation-matrix",
    "matrix-transformation",
    "reflection-matrix",
    "reflection-matrix-arbitrary-point",
    "reflection-matrix-center",
    "reflection-over-line",
    "reflection-over-point",
    "reflection-over-x-axis",
    "reflection-over-x-equals-k",
    "reflection-over-y-axis",
    "reflection-over-y-equals-h",
    "reflection-over-y-equals-minus-x",
    "reflection-over-y-equals-x",
    "rotation",
    "rotation-matrix",
    "translation",
    "translation-matrix",
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
    de: {
      description: "Verknüpfe geometrische Transformationen mit Matrizen.",
      title: "Geometrische Transformationen",
    },
    ms: {
      description: "Gabungkan transformasi dengan matriks.",
      title: "Transformasi Geometri",
    },
  },
};

export default lesson;
