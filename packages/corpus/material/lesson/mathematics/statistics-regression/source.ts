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
      ms: "regresi-dan-korelasi",
    },
    sections: [
      {
        routeSlugs: {
          de: "bestimmtheitsmass",
          en: "coefficient-of-determination",
          id: "koefisien-determinasi",
          ms: "pekali-penentuan",
        },
        slug: "coefficient-of-determination",
      },
      {
        routeSlugs: {
          de: "grundidee-der-korrelationsanalyse",
          en: "correlation-analysis-concept",
          id: "konsep-analisis-korelasi",
          ms: "konsep-analisis-korelasi",
        },
        slug: "correlation-analysis-concept",
      },
      {
        routeSlugs: {
          de: "methode-der-kleinsten-quadrate",
          en: "least-squares-method",
          id: "metode-kuadrat-terkecil",
          ms: "kaedah-kuasa-dua-terkecil",
        },
        slug: "least-squares-method",
      },
      {
        routeSlugs: {
          de: "grundidee-der-linearen-regression",
          en: "linear-regression-concept",
          id: "konsep-regresi-linear",
          ms: "konsep-regresi-linear",
        },
        slug: "linear-regression-concept",
      },
      {
        routeSlugs: {
          de: "produkt-moment-korrelation",
          en: "product-moment-correlation",
          id: "korelasi-product-moment",
          ms: "korelasi-momen-hasil-darab",
        },
        slug: "product-moment-correlation",
      },
      {
        routeSlugs: {
          de: "streudiagramm",
          en: "scatter-diagram",
          id: "diagram-pencar-atau-diagram-scatter",
          ms: "gambar-rajah-serakan",
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
      ms: {
        description: "Tafsirkan pekali penentuan sesuatu model.",
        title: "Statistik",
      },
    },
  });
