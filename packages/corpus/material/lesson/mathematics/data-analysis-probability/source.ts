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
        translations: {
          en: {
            title: "Binomial Distribution Function",
          },
          id: {
            title: "Fungsi Distribusi Binomial",
          },
        },
      },
      {
        routeSlugs: {
          en: "expected-value-of-binomial-distribution",
          id: "nilai-harapan-distribusi-binomial",
        },
        slug: "expected-value-of-binomial-distribution",
        translations: {
          en: {
            title: "Expected Value of Binomial Distribution",
          },
          id: {
            title: "Nilai Harapan Distribusi Binomial",
          },
        },
      },
      {
        routeSlugs: {
          en: "expected-value-of-normal-distribution",
          id: "nilai-harapan-distribusi-normal",
        },
        slug: "expected-value-of-normal-distribution",
        translations: {
          en: {
            title: "Expected Value of Normal Distribution",
          },
          id: {
            title: "Nilai Harapan Distribusi Normal",
          },
        },
      },
      {
        routeSlugs: {
          en: "normal-distribution-function",
          id: "fungsi-distribusi-normal",
        },
        slug: "normal-distribution-function",
        translations: {
          en: {
            title: "Normal Distribution Function",
          },
          id: {
            title: "Fungsi Distribusi Normal",
          },
        },
      },
      {
        routeSlugs: { en: "uniform-distribution", id: "distribusi-seragam" },
        slug: "uniform-distribution",
        translations: {
          en: {
            title: "Uniform Distribution",
          },
          id: {
            title: "Distribusi Seragam",
          },
        },
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
