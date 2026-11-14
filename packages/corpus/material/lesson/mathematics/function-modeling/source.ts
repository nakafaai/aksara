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
    ms: "fungsi-dan-pemodelannya",
  },
  sections: [
    {
      routeSlugs: {
        de: "betragsfunktion",
        en: "absolute-value-function",
        id: "fungsi-nilai-mutlak",
        ms: "fungsi-nilai-mutlak",
      },
      slug: "absolute-value-function",
    },
    {
      routeSlugs: {
        de: "asymptoten",
        en: "asymptote",
        id: "asimtot",
        ms: "asimptot",
      },
      slug: "asymptote",
    },
    {
      routeSlugs: {
        de: "exponentialfunktion",
        en: "exponential-function",
        id: "fungsi-eksponensial",
        ms: "fungsi-eksponen",
      },
      slug: "exponential-function",
    },
    {
      evidenceUrls: [
        "https://kemkes.go.id/id/positif-covid-19-usai-kontak-dengan-wn-jepang",
        "https://kemkes.go.id/id/pasien-positif-covid-19-capai-10-ribu",
      ],
      routeSlugs: {
        de: "begriff-der-logarithmusfunktion",
        en: "logarithmic-function-concept",
        id: "konsep-fungsi-logaritma",
        ms: "konsep-fungsi-logaritma",
      },
      slug: "logarithmic-function-concept",
    },
    {
      routeSlugs: {
        de: "graph-der-logarithmusfunktion",
        en: "logarithmic-function-graph",
        id: "grafik-fungsi-logaritma",
        ms: "graf-fungsi-logaritma",
      },
      slug: "logarithmic-function-graph",
    },
    {
      routeSlugs: {
        de: "identitaeten-der-logarithmusfunktion",
        en: "logarithmic-function-identity",
        id: "identitas-fungsi-logaritma",
        ms: "identiti-fungsi-logaritma",
      },
      slug: "logarithmic-function-identity",
    },
    {
      routeSlugs: {
        de: "stueckweise-definierte-funktionen",
        en: "piecewise-function-modeling",
        id: "pemodelan-fungsi-piecewise",
        ms: "pemodelan-fungsi-cebis-demi-cebis",
      },
      slug: "piecewise-function-modeling",
    },
    {
      routeSlugs: {
        de: "gebrochen-rationale-funktion",
        en: "rational-function",
        id: "fungsi-rasional",
        ms: "fungsi-rasional",
      },
      slug: "rational-function",
    },
    {
      routeSlugs: {
        de: "quadratwurzelfunktion",
        en: "square-root-function",
        id: "fungsi-akar",
        ms: "fungsi-punca-kuasa-dua",
      },
      slug: "square-root-function",
    },
    {
      routeSlugs: {
        de: "treppenfunktionen",
        en: "step-function-modeling",
        id: "pemodelan-fungsi-tangga",
        ms: "pemodelan-fungsi-tangga",
      },
      slug: "step-function-modeling",
    },
    {
      routeSlugs: {
        de: "trigonometrische-funktionen-beliebiger-winkel",
        en: "trigonometric-function-arbitrary-angle",
        id: "fungsi-trigonometri-sebarang-sudut",
        ms: "fungsi-trigonometri-sebarang-sudut",
      },
      slug: "trigonometric-function-arbitrary-angle",
    },
    {
      routeSlugs: {
        de: "graphen-trigonometrischer-funktionen",
        en: "trigonometric-function-graph",
        id: "grafik-fungsi-trigonometri",
        ms: "graf-fungsi-trigonometri",
      },
      slug: "trigonometric-function-graph",
    },
    {
      routeSlugs: {
        de: "trigonometrische-identitaeten",
        en: "trigonometric-identity",
        id: "identitas-trigonometri",
        ms: "identiti-trigonometri",
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
    ms: {
      description: "Modelkan nilai mutlak dengan graf dan persamaan.",
      title: "Fungsi dan Pemodelannya",
    },
  },
});
