import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/mathematics/quadratic-function",
  domain: "mathematics",
  key: "lesson.mathematics.quadratic-function",
  kind: "lesson",
  routeSlugs: {
    en: "quadratic-function",
    id: "persamaan-dan-fungsi-kuadrat",
    de: "quadratische-funktionen",
    ms: "fungsi-kuadratik",
  },
  sections: [
    "quadratic-equation",
    "quadratic-equation-factorization",
    "quadratic-equation-formula",
    "quadratic-equation-imaginary-root",
    "quadratic-equation-perfect-square",
    "quadratic-equation-types-of-root",
    "quadratic-function-characteristics",
    "quadratic-function-construction",
    "quadratic-function-maximum-area",
    "quadratic-function-minimum-area",
  ],
  slug: "quadratic-function",
  translations: {
    en: {
      description: "Solve quadratics with factors, squares, and formulas.",
      title: "Quadratic Functions",
    },
    id: {
      description: "Selesaikan kuadrat dengan faktor dan rumus.",
      title: "Persamaan dan Fungsi Kuadrat",
    },
    de: {
      description: "Löse Gleichungen und prüfe quadratische Modelle.",
      title: "Quadratische Funktionen",
    },
    ms: {
      description: "Selesaikan kuadratik dengan faktor dan rumus.",
      title: "Fungsi Kuadratik",
    },
  },
};

export default lesson;
