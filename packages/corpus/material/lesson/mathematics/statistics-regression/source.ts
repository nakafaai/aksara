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
        translations: {
          en: {
            title: "Coefficient of Determination",
          },
          id: {
            title: "Koefisien Determinasi",
          },
        },
      },
      {
        routeSlugs: {
          en: "correlation-analysis-concept",
          id: "konsep-analisis-korelasi",
        },
        slug: "correlation-analysis-concept",
        translations: {
          en: {
            title: "Correlation Analysis Concept",
          },
          id: {
            title: "Konsep Analisis Korelasi",
          },
        },
      },
      {
        routeSlugs: {
          en: "least-squares-method",
          id: "metode-kuadrat-terkecil",
        },
        slug: "least-squares-method",
        translations: {
          en: {
            title: "Least Squares Method",
          },
          id: {
            title: "Metode Kuadrat Terkecil",
          },
        },
      },
      {
        routeSlugs: {
          en: "linear-regression-concept",
          id: "konsep-regresi-linear",
        },
        slug: "linear-regression-concept",
        translations: {
          en: {
            title: "Linear Regression Concept",
          },
          id: {
            title: "Konsep Regresi Linear",
          },
        },
      },
      {
        routeSlugs: {
          en: "product-moment-correlation",
          id: "korelasi-product-moment",
        },
        slug: "product-moment-correlation",
        translations: {
          en: {
            title: "Product Moment Correlation",
          },
          id: {
            title: "Korelasi Product Moment",
          },
        },
      },
      {
        routeSlugs: {
          en: "scatter-diagram",
          id: "diagram-pencar-atau-diagram-scatter",
        },
        slug: "scatter-diagram",
        translations: {
          en: {
            title: "Scatter Diagram",
          },
          id: {
            title: "Diagram Pencar atau Diagram Scatter",
          },
        },
      },
    ],
    slug: "statistics-regression",
    translations: {
      en: {
        description: "Read how r² shows variation explained by a model.",
        title: "Statistics",
      },
      id: {
        description: "Baca r² sebagai ukuran variasi yang terjelaskan.",
        title: "Statistika",
      },
    },
  });
