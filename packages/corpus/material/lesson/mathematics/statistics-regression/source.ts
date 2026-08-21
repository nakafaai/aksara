import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsStatisticsRegressionMaterial =
  defineLessonMaterial({
    assetRoot: "material/lesson/mathematics/statistics-regression",
    domain: "mathematics",
    key: "lesson.mathematics.statistics-regression",
    kind: "lesson",
    routeSlugs: {
      de: "regression-und-korrelation",
      en: "statistics-regression",
      id: "regresi-statistik",
    },
    sections: [
      {
        routeSlugs: {
          de: "bestimmtheitsmass",
          en: "coefficient-of-determination",
          id: "koefisien-determinasi",
        },
        slug: "coefficient-of-determination",
      },
      {
        routeSlugs: {
          de: "grundidee-der-korrelationsanalyse",
          en: "correlation-analysis-concept",
          id: "konsep-analisis-korelasi",
        },
        slug: "correlation-analysis-concept",
      },
      {
        routeSlugs: {
          de: "methode-der-kleinsten-quadrate",
          en: "least-squares-method",
          id: "metode-kuadrat-terkecil",
        },
        slug: "least-squares-method",
      },
      {
        routeSlugs: {
          de: "grundidee-der-linearen-regression",
          en: "linear-regression-concept",
          id: "konsep-regresi-linear",
        },
        slug: "linear-regression-concept",
      },
      {
        routeSlugs: {
          de: "produkt-moment-korrelation",
          en: "product-moment-correlation",
          id: "korelasi-product-moment",
        },
        slug: "product-moment-correlation",
      },
      {
        routeSlugs: {
          de: "streudiagramm",
          en: "scatter-diagram",
          id: "diagram-pencar-atau-diagram-scatter",
        },
        slug: "scatter-diagram",
      },
    ],
    slug: "statistics-regression",
    translations: {
      de: {
        description: "Lies am Bestimmtheitsmaß die erklärte Streuung ab.",
        title: "Regression und Korrelation",
      },
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
