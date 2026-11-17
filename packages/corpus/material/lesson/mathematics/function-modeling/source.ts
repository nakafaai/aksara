import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/mathematics/function-modeling",
  domain: "mathematics",
  key: "lesson.mathematics.function-modeling",
  kind: "lesson",
  routeSlugs: {
    en: "function-modeling",
    id: "fungsi-dan-pemodelannya",
    de: "funktionen-und-modelle",
    ms: "fungsi-dan-pemodelannya",
  },
  sections: [
    "absolute-value-function",
    "asymptote",
    "exponential-function",
    "logarithmic-function-concept",
    "logarithmic-function-graph",
    "logarithmic-function-identity",
    "piecewise-function-modeling",
    "rational-function",
    "square-root-function",
    "step-function-modeling",
    "trigonometric-function-arbitrary-angle",
    "trigonometric-function-graph",
    "trigonometric-identity",
  ],
  slug: "function-modeling",
  translations: {
    en: {
      description: "Model absolute value behavior with graphs and equations.",
      title: "Functions and Their Modeling",
    },
    id: {
      description: "Modelkan nilai mutlak lewat grafik dan persamaan.",
      title: "Fungsi dan Pemodelannya",
    },
    de: {
      description: "Untersuche Funktionen, Graphen und passende Modelle.",
      title: "Funktionen und ihre Modelle",
    },
    ms: {
      description: "Modelkan nilai mutlak dengan graf dan persamaan.",
      title: "Fungsi dan Pemodelannya",
    },
  },
};

export default lesson;
