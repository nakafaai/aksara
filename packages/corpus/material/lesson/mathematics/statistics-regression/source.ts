import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/mathematics/statistics-regression",
  domain: "mathematics",
  key: "lesson.mathematics.statistics-regression",
  kind: "lesson",
  routeSlugs: {
    en: "statistics-regression",
    id: "regresi-statistik",
    de: "regression-und-korrelation",
    ms: "regresi-dan-korelasi",
  },
  sections: [
    "coefficient-of-determination",
    "correlation-analysis-concept",
    "least-squares-method",
    "linear-regression-concept",
    "product-moment-correlation",
    "scatter-diagram",
  ],
  slug: "statistics-regression",
  translations: {
    en: {
      description: "Interpret a model's coefficient of determination.",
      title: "Statistics",
    },
    id: {
      description: "Tafsirkan koefisien determinasi suatu model.",
      title: "Statistika",
    },
    de: {
      description: "Lies am Bestimmtheitsmaß die erklärte Streuung ab.",
      title: "Regression und Korrelation",
    },
    ms: {
      description: "Tafsirkan pekali penentuan sesuatu model.",
      title: "Statistik",
    },
  },
};

export default lesson;
