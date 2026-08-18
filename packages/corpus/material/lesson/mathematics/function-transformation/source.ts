import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsFunctionTransformationMaterial =
  defineLessonMaterial({
    assetRoot: "material/lesson/mathematics/function-transformation",
    domain: "mathematics",
    key: "lesson.mathematics.function-transformation",
    kind: "lesson",
    routeSlugs: { en: "function-transformation", id: "transformasi-fungsi" },
    sections: [
      {
        routeSlugs: {
          en: "combined-transformation-function",
          id: "kombinasi-transformasi-fungsi",
        },
        slug: "combined-transformation-function",
      },
      {
        routeSlugs: { en: "horizontal-dilation", id: "dilatasi-horizontal" },
        slug: "horizontal-dilation",
      },
      {
        routeSlugs: { en: "horizontal-reflection", id: "refleksi-horizontal" },
        slug: "horizontal-reflection",
      },
      {
        routeSlugs: {
          en: "horizontal-translation",
          id: "translasi-horizontal",
        },
        slug: "horizontal-translation",
      },
      {
        routeSlugs: { en: "rotation", id: "rotasi" },
        slug: "rotation",
      },
      {
        routeSlugs: { en: "vertical-dilation", id: "dilatasi-vertikal" },
        slug: "vertical-dilation",
      },
      {
        routeSlugs: { en: "vertical-reflection", id: "refleksi-vertikal" },
        slug: "vertical-reflection",
      },
      {
        routeSlugs: { en: "vertical-translation", id: "translasi-vertikal" },
        slug: "vertical-translation",
      },
    ],
    slug: "function-transformation",
    translations: {
      en: {
        description: "Combine shifts, stretches, and reflections in order.",
        title: "Function Transformation",
      },
      id: {
        description: "Gabungkan geser, regang, dan cermin sesuai urutan.",
        title: "Transformasi Fungsi",
      },
    },
  });
