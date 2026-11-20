import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/mathematics/derivative-function",
  domain: "mathematics",
  key: "lesson.mathematics.derivative-function",
  kind: "lesson",
  routeSlugs: {
    en: "derivative-function",
    id: "turunan-fungsi",
    de: "ableitungen",
    ms: "pembezaan",
  },
  sections: [
    "application-of-derivative",
    "chain-rule-in-derivative",
    "concept-of-derivative-function",
    "derivative-of-algebraic-function",
    "derivative-of-trigonometric-function",
    "equation-of-a-tangent-line-to-a-curve",
    "extrema-maximum-and-minimum-value",
    "increasing-decreasing-and-stationary-function",
    "properties-of-derivative-function",
    "writing-the-derivative-function",
  ],
  slug: "derivative-function",
  translations: {
    en: {
      description: "Use derivatives for velocity, acceleration, and height.",
      title: "Derivative Functions",
    },
    id: {
      description: "Gunakan turunan untuk kecepatan, percepatan, dan tinggi.",
      title: "Turunan Fungsi",
    },
    de: {
      description: "Untersuche Änderungsraten, Tangenten und Extremwerte.",
      title: "Ableitungen",
    },
    ms: {
      description: "Guna terbitan untuk halaju, pecutan dan ketinggian.",
      title: "Pembezaan",
    },
  },
};

export default lesson;
