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
      ms: "analisis-data-dan-kebarangkalian",
    },
    sections: [
      {
        routeSlugs: {
          de: "binomialverteilung",
          en: "binomial-distribution-function",
          id: "fungsi-distribusi-binomial",
          ms: "fungsi-taburan-binomial",
        },
        slug: "binomial-distribution-function",
      },
      {
        routeSlugs: {
          de: "erwartungswert-der-binomialverteilung",
          en: "expected-value-of-binomial-distribution",
          id: "nilai-harapan-distribusi-binomial",
          ms: "nilai-jangkaan-taburan-binomial",
        },
        slug: "expected-value-of-binomial-distribution",
      },
      {
        routeSlugs: {
          de: "erwartungswert-der-normalverteilung",
          en: "expected-value-of-normal-distribution",
          id: "nilai-harapan-distribusi-normal",
          ms: "nilai-jangkaan-taburan-normal",
        },
        slug: "expected-value-of-normal-distribution",
      },
      {
        routeSlugs: {
          de: "normalverteilung",
          en: "normal-distribution-function",
          id: "fungsi-distribusi-normal",
          ms: "taburan-normal-dan-skor-z",
        },
        slug: "normal-distribution-function",
      },
      {
        routeSlugs: {
          de: "gleichverteilung",
          en: "uniform-distribution",
          id: "distribusi-seragam",
          ms: "taburan-seragam",
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
      ms: {
        description: "Modelkan kejayaan berulang dengan taburan binomial.",
        title: "Analisis Data dan Kebarangkalian",
      },
    },
  });
