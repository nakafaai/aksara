import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsDataAnalysisProbabilityMaterial =
  defineLessonMaterial({
    assetRoot: "material/lesson/mathematics/data-analysis-probability",
    domain: "mathematics",
    key: "lesson.mathematics.data-analysis-probability",
    kind: "lesson",
    routeSlugs: {
      en: "data-analysis-probability",
      id: "analisis-data-dan-peluang",
    },
    sections: [
      {
        routeSlugs: {
          en: "binomial-distribution-function",
          id: "fungsi-distribusi-binomial",
        },
        slug: "binomial-distribution-function",
      },
      {
        routeSlugs: {
          en: "expected-value-of-binomial-distribution",
          id: "nilai-harapan-distribusi-binomial",
        },
        slug: "expected-value-of-binomial-distribution",
      },
      {
        routeSlugs: {
          en: "expected-value-of-normal-distribution",
          id: "nilai-harapan-distribusi-normal",
        },
        slug: "expected-value-of-normal-distribution",
      },
      {
        routeSlugs: {
          en: "normal-distribution-function",
          id: "fungsi-distribusi-normal",
        },
        slug: "normal-distribution-function",
      },
      {
        routeSlugs: { en: "uniform-distribution", id: "distribusi-seragam" },
        slug: "uniform-distribution",
      },
    ],
    slug: "data-analysis-probability",
    translations: {
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
