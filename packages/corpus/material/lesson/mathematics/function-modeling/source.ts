import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsFunctionModelingMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/mathematics/function-modeling",
  domain: "mathematics",
  key: "lesson.mathematics.function-modeling",
  kind: "lesson",
  routeSlugs: { en: "function-modeling", id: "fungsi-dan-pemodelannya" },
  sections: [
    {
      routeSlugs: { en: "absolute-value-function", id: "fungsi-nilai-mutlak" },
      slug: "absolute-value-function",
    },
    {
      routeSlugs: { en: "asymptote", id: "asimtot" },
      slug: "asymptote",
    },
    {
      routeSlugs: { en: "exponential-function", id: "fungsi-eksponensial" },
      slug: "exponential-function",
    },
    {
      routeSlugs: {
        en: "logarithmic-function-concept",
        id: "konsep-fungsi-logaritma",
      },
      slug: "logarithmic-function-concept",
    },
    {
      routeSlugs: {
        en: "logarithmic-function-graph",
        id: "grafik-fungsi-logaritma",
      },
      slug: "logarithmic-function-graph",
    },
    {
      routeSlugs: {
        en: "logarithmic-function-identity",
        id: "identitas-fungsi-logaritma",
      },
      slug: "logarithmic-function-identity",
    },
    {
      routeSlugs: {
        en: "piecewise-function-modeling",
        id: "pemodelan-fungsi-piecewise",
      },
      slug: "piecewise-function-modeling",
    },
    {
      routeSlugs: { en: "rational-function", id: "fungsi-rasional" },
      slug: "rational-function",
    },
    {
      routeSlugs: { en: "square-root-function", id: "fungsi-akar" },
      slug: "square-root-function",
    },
    {
      routeSlugs: {
        en: "step-function-modeling",
        id: "pemodelan-fungsi-tangga",
      },
      slug: "step-function-modeling",
    },
    {
      routeSlugs: {
        en: "trigonometric-function-arbitrary-angle",
        id: "fungsi-trigonometri-sebarang-sudut",
      },
      slug: "trigonometric-function-arbitrary-angle",
    },
    {
      routeSlugs: {
        en: "trigonometric-function-graph",
        id: "grafik-fungsi-trigonometri",
      },
      slug: "trigonometric-function-graph",
    },
    {
      routeSlugs: {
        en: "trigonometric-identity",
        id: "identitas-trigonometri",
      },
      slug: "trigonometric-identity",
    },
  ],
  slug: "function-modeling",
  translations: {
    en: {
      description: "Model absolute value behavior with graphs and equations.",
      title: "Functions and Their Modeling",
    },
    id: {
      description: "Modelkan nilai mutlak lewat grafik dan persamaan.",
      title: "Fungsi dan Pemodelannya",
    },
  },
});
