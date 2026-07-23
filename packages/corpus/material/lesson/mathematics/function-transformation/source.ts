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
        translations: {
          en: {
            title: "Combined Function Transformations",
          },
          id: {
            title: "Kombinasi Transformasi Fungsi",
          },
        },
      },
      {
        routeSlugs: { en: "horizontal-dilation", id: "dilatasi-horizontal" },
        slug: "horizontal-dilation",
        translations: {
          en: {
            title: "Horizontal Dilation",
          },
          id: {
            title: "Dilatasi Horizontal",
          },
        },
      },
      {
        routeSlugs: { en: "horizontal-reflection", id: "refleksi-horizontal" },
        slug: "horizontal-reflection",
        translations: {
          en: {
            title: "Horizontal Reflection",
          },
          id: {
            title: "Refleksi Horizontal",
          },
        },
      },
      {
        routeSlugs: {
          en: "horizontal-translation",
          id: "translasi-horizontal",
        },
        slug: "horizontal-translation",
        translations: {
          en: {
            title: "Horizontal Translation",
          },
          id: {
            title: "Translasi Horizontal",
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
        routeSlugs: { en: "vertical-dilation", id: "dilatasi-vertikal" },
        slug: "vertical-dilation",
        translations: {
          en: {
            title: "Vertical Dilation",
          },
          id: {
            title: "Dilatasi Vertikal",
          },
        },
      },
      {
        routeSlugs: { en: "vertical-reflection", id: "refleksi-vertikal" },
        slug: "vertical-reflection",
        translations: {
          en: {
            title: "Vertical Reflection",
          },
          id: {
            title: "Refleksi Vertikal",
          },
        },
      },
      {
        routeSlugs: { en: "vertical-translation", id: "translasi-vertikal" },
        slug: "vertical-translation",
        translations: {
          en: {
            title: "Vertical Translation",
          },
          id: {
            title: "Translasi Vertikal",
          },
        },
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
