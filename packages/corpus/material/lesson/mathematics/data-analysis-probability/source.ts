import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsDataAnalysisProbabilityMaterial =
  defineLessonMaterial({
    assetRoot: "material/lesson/mathematics/data-analysis-probability",
    domain: "mathematics",
    key: "lesson.mathematics.data-analysis-probability",
    kind: "lesson",
    routeSlugs: {
      de: "datenanalyse-und-wahrscheinlichkeit",
      en: "data-analysis-probability",
      id: "analisis-data-dan-peluang",
    },
    sections: [
      {
        routeSlugs: {
          de: "binomialverteilung",
          en: "binomial-distribution-function",
          id: "fungsi-distribusi-binomial",
        },
        slug: "binomial-distribution-function",
      },
      {
        routeSlugs: {
          de: "erwartungswert-der-binomialverteilung",
          en: "expected-value-of-binomial-distribution",
          id: "nilai-harapan-distribusi-binomial",
        },
        slug: "expected-value-of-binomial-distribution",
      },
      {
        routeSlugs: {
          de: "erwartungswert-der-normalverteilung",
          en: "expected-value-of-normal-distribution",
          id: "nilai-harapan-distribusi-normal",
        },
        slug: "expected-value-of-normal-distribution",
      },
      {
        routeSlugs: {
          de: "normalverteilung",
          en: "normal-distribution-function",
          id: "fungsi-distribusi-normal",
        },
        slug: "normal-distribution-function",
      },
      {
        routeSlugs: {
          de: "gleichverteilung",
          en: "uniform-distribution",
          id: "distribusi-seragam",
        },
        slug: "uniform-distribution",
      },
    ],
    slug: "data-analysis-probability",
    translations: {
      de: {
        description: "Modelliere Wiederholungen mit Binomialverteilungen.",
        title: "Datenanalyse und Wahrscheinlichkeit",
      },
      en: {
        description: "Model repeated success with binomial probabilities.",
        title: "Data Analysis and Probability",
      },
      id: {
        description: "Modelkan keberhasilan berulang dengan peluang binomial.",
        title: "Analisis Data dan Peluang",
      },
    },
  });
