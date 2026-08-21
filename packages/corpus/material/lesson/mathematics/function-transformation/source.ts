import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsFunctionTransformationMaterial =
  defineLessonMaterial({
    assetRoot: "material/lesson/mathematics/function-transformation",
    domain: "mathematics",
    key: "lesson.mathematics.function-transformation",
    kind: "lesson",
    routeSlugs: {
      de: "funktionstransformationen",
      en: "function-transformation",
      id: "transformasi-fungsi",
    },
    sections: [
      {
        routeSlugs: {
          de: "kombinierte-funktionstransformationen",
          en: "combined-transformation-function",
          id: "kombinasi-transformasi-fungsi",
        },
        slug: "combined-transformation-function",
      },
      {
        routeSlugs: {
          de: "horizontale-streckung-und-stauchung",
          en: "horizontal-dilation",
          id: "dilatasi-horizontal",
        },
        slug: "horizontal-dilation",
      },
      {
        routeSlugs: {
          de: "spiegelung-an-der-y-achse",
          en: "horizontal-reflection",
          id: "refleksi-horizontal",
        },
        slug: "horizontal-reflection",
      },
      {
        routeSlugs: {
          de: "horizontale-verschiebung",
          en: "horizontal-translation",
          id: "translasi-horizontal",
        },
        slug: "horizontal-translation",
      },
      {
        routeSlugs: { de: "rotation", en: "rotation", id: "rotasi" },
        slug: "rotation",
      },
      {
        routeSlugs: {
          de: "vertikale-streckung-und-stauchung",
          en: "vertical-dilation",
          id: "dilatasi-vertikal",
        },
        slug: "vertical-dilation",
      },
      {
        routeSlugs: {
          de: "spiegelung-an-der-x-achse",
          en: "vertical-reflection",
          id: "refleksi-vertikal",
        },
        slug: "vertical-reflection",
      },
      {
        routeSlugs: {
          de: "vertikale-verschiebung",
          en: "vertical-translation",
          id: "translasi-vertikal",
        },
        slug: "vertical-translation",
      },
    ],
    slug: "function-transformation",
    translations: {
      de: {
        description: "Ordne Verschiebungen, Streckungen und Spiegelungen.",
        title: "Funktionstransformationen",
      },
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
