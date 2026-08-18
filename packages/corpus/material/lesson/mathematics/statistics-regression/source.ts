import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsStatisticsRegressionMaterial =
  defineLessonMaterial({
    assetRoot: "material/lesson/mathematics/statistics-regression",
    domain: "mathematics",
    key: "lesson.mathematics.statistics-regression",
    kind: "lesson",
    routeSlugs: { en: "statistics-regression", id: "regresi-statistik" },
    sections: [
      {
        routeSlugs: {
          en: "coefficient-of-determination",
          id: "koefisien-determinasi",
        },
        slug: "coefficient-of-determination",
      },
      {
        routeSlugs: {
          en: "correlation-analysis-concept",
          id: "konsep-analisis-korelasi",
        },
        slug: "correlation-analysis-concept",
      },
      {
        routeSlugs: {
          en: "least-squares-method",
          id: "metode-kuadrat-terkecil",
        },
        slug: "least-squares-method",
      },
      {
        routeSlugs: {
          en: "linear-regression-concept",
          id: "konsep-regresi-linear",
        },
        slug: "linear-regression-concept",
      },
      {
        routeSlugs: {
          en: "product-moment-correlation",
          id: "korelasi-product-moment",
        },
        slug: "product-moment-correlation",
      },
      {
        routeSlugs: {
          en: "scatter-diagram",
          id: "diagram-pencar-atau-diagram-scatter",
        },
        slug: "scatter-diagram",
      },
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
    },
  });
