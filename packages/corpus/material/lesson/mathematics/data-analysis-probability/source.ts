import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/mathematics/data-analysis-probability",
  domain: "mathematics",
  key: "lesson.mathematics.data-analysis-probability",
  kind: "lesson",
  routeSlugs: {
    en: "data-analysis-probability",
    id: "analisis-data-dan-peluang",
    de: "datenanalyse-und-wahrscheinlichkeit",
    ms: "analisis-data-dan-kebarangkalian",
  },
  sections: [
    "binomial-distribution-function",
    "expected-value-of-binomial-distribution",
    "expected-value-of-normal-distribution",
    "normal-distribution-function",
    "uniform-distribution",
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
    de: {
      description: "Modelliere Wiederholungen mit Binomialverteilungen.",
      title: "Datenanalyse und Wahrscheinlichkeit",
    },
    ms: {
      description: "Modelkan kejayaan berulang dengan taburan binomial.",
      title: "Analisis Data dan Kebarangkalian",
    },
  },
};

export default lesson;
