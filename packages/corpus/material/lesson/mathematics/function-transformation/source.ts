import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/mathematics/function-transformation",
  domain: "mathematics",
  key: "lesson.mathematics.function-transformation",
  kind: "lesson",
  routeSlugs: {
    en: "function-transformation",
    id: "transformasi-fungsi",
    de: "funktionstransformationen",
    ms: "penjelmaan-fungsi",
  },
  sections: [
    "combined-transformation-function",
    "horizontal-dilation",
    "horizontal-reflection",
    "horizontal-translation",
    "rotation",
    "vertical-dilation",
    "vertical-reflection",
    "vertical-translation",
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
    de: {
      description: "Ordne Verschiebungen, Streckungen und Spiegelungen.",
      title: "Funktionstransformationen",
    },
    ms: {
      description: "Gabungkan translasi, regangan dan pantulan ikut urutan.",
      title: "Penjelmaan Fungsi",
    },
  },
};

export default lesson;
