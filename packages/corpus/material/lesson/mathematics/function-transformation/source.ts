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
      ms: "penjelmaan-fungsi",
    },
    sections: [
      {
        routeSlugs: {
          de: "kombinierte-funktionstransformationen",
          en: "combined-transformation-function",
          id: "kombinasi-transformasi-fungsi",
          ms: "gabungan-penjelmaan-fungsi",
        },
        slug: "combined-transformation-function",
      },
      {
        routeSlugs: {
          de: "horizontale-streckung-und-stauchung",
          en: "horizontal-dilation",
          id: "dilatasi-horizontal",
          ms: "regangan-mengufuk",
        },
        slug: "horizontal-dilation",
      },
      {
        routeSlugs: {
          de: "spiegelung-an-der-y-achse",
          en: "horizontal-reflection",
          id: "refleksi-horizontal",
          ms: "pantulan-pada-paksi-y",
        },
        slug: "horizontal-reflection",
      },
      {
        routeSlugs: {
          de: "horizontale-verschiebung",
          en: "horizontal-translation",
          id: "translasi-horizontal",
          ms: "translasi-mengufuk",
        },
        slug: "horizontal-translation",
      },
      {
        routeSlugs: {
          de: "rotation",
          en: "rotation",
          id: "rotasi",
          ms: "putaran-graf-fungsi",
        },
        slug: "rotation",
      },
      {
        routeSlugs: {
          de: "vertikale-streckung-und-stauchung",
          en: "vertical-dilation",
          id: "dilatasi-vertikal",
          ms: "regangan-mencancang",
        },
        slug: "vertical-dilation",
      },
      {
        routeSlugs: {
          de: "spiegelung-an-der-x-achse",
          en: "vertical-reflection",
          id: "refleksi-vertikal",
          ms: "pantulan-pada-paksi-x",
        },
        slug: "vertical-reflection",
      },
      {
        routeSlugs: {
          de: "vertikale-verschiebung",
          en: "vertical-translation",
          id: "translasi-vertikal",
          ms: "translasi-mencancang",
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
      ms: {
        description: "Gabungkan translasi, regangan dan pantulan ikut urutan.",
        title: "Penjelmaan Fungsi",
      },
    },
  });
