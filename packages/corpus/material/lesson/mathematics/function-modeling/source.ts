import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsFunctionModelingMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/mathematics/function-modeling",
  domain: "mathematics",
  key: "lesson.mathematics.function-modeling",
  kind: "lesson",
  routeSlugs: {
    de: "funktionen-und-modelle",
    en: "function-modeling",
    id: "fungsi-dan-pemodelannya",
  },
  sections: [
    {
      routeSlugs: {
        de: "betragsfunktion",
        en: "absolute-value-function",
        id: "fungsi-nilai-mutlak",
      },
      slug: "absolute-value-function",
    },
    {
      routeSlugs: { de: "asymptoten", en: "asymptote", id: "asimtot" },
      slug: "asymptote",
    },
    {
      routeSlugs: {
        de: "exponentialfunktion",
        en: "exponential-function",
        id: "fungsi-eksponensial",
      },
      slug: "exponential-function",
    },
    {
      routeSlugs: {
        de: "begriff-der-logarithmusfunktion",
        en: "logarithmic-function-concept",
        id: "konsep-fungsi-logaritma",
      },
      slug: "logarithmic-function-concept",
    },
    {
      routeSlugs: {
        de: "graph-der-logarithmusfunktion",
        en: "logarithmic-function-graph",
        id: "grafik-fungsi-logaritma",
      },
      slug: "logarithmic-function-graph",
    },
    {
      routeSlugs: {
        de: "identitaeten-der-logarithmusfunktion",
        en: "logarithmic-function-identity",
        id: "identitas-fungsi-logaritma",
      },
      slug: "logarithmic-function-identity",
    },
    {
      routeSlugs: {
        de: "stueckweise-definierte-funktionen",
        en: "piecewise-function-modeling",
        id: "pemodelan-fungsi-piecewise",
      },
      slug: "piecewise-function-modeling",
    },
    {
      routeSlugs: {
        de: "gebrochen-rationale-funktion",
        en: "rational-function",
        id: "fungsi-rasional",
      },
      slug: "rational-function",
    },
    {
      routeSlugs: {
        de: "quadratwurzelfunktion",
        en: "square-root-function",
        id: "fungsi-akar",
      },
      slug: "square-root-function",
    },
    {
      routeSlugs: {
        de: "treppenfunktionen",
        en: "step-function-modeling",
        id: "pemodelan-fungsi-tangga",
      },
      slug: "step-function-modeling",
    },
    {
      routeSlugs: {
        de: "trigonometrische-funktionen-beliebiger-winkel",
        en: "trigonometric-function-arbitrary-angle",
        id: "fungsi-trigonometri-sebarang-sudut",
      },
      slug: "trigonometric-function-arbitrary-angle",
    },
    {
      routeSlugs: {
        de: "graphen-trigonometrischer-funktionen",
        en: "trigonometric-function-graph",
        id: "grafik-fungsi-trigonometri",
      },
      slug: "trigonometric-function-graph",
    },
    {
      routeSlugs: {
        de: "trigonometrische-identitaeten",
        en: "trigonometric-identity",
        id: "identitas-trigonometri",
      },
      slug: "trigonometric-identity",
    },
  ],
  slug: "function-modeling",
  translations: {
    de: {
      description: "Untersuche Funktionen, Graphen und passende Modelle.",
      title: "Funktionen und ihre Modelle",
    },
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
