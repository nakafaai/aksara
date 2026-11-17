import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot:
    "material/lesson/mathematics/function-composition-inverse-function",
  domain: "mathematics",
  key: "lesson.mathematics.function-composition-inverse-function",
  kind: "lesson",
  routeSlugs: {
    en: "function-composition-inverse-function",
    id: "fungsi-komposisi-dan-fungsi-invers",
    de: "funktionskomposition-und-umkehrfunktion",
    ms: "fungsi-gubahan-dan-fungsi-songsang",
  },
  sections: [
    "addition-subtraction-function",
    "domain-codomain-range",
    "function-and-non-function",
    "function-composition",
    "function-concept",
    "injective-surjective-bijective-function",
    "inverse-function",
    "multiplication-division-function",
    "properties-of-function-composition",
    "properties-of-inverse-function",
  ],
  slug: "function-composition-inverse-function",
  translations: {
    en: {
      description: "Operate on functions while tracking shared domains.",
      title: "Function Composition and Inverse Function",
    },
    id: {
      description: "Operasikan fungsi sambil menjaga domain bersama.",
      title: "Fungsi Komposisi dan Fungsi Invers",
    },
    de: {
      description: "Verknüpfe Funktionen mit passenden Definitionsbereichen.",
      title: "Funktionskomposition und Umkehrfunktion",
    },
    ms: {
      description: "Kendalikan fungsi sambil menjejak domain sepunya.",
      title: "Fungsi Gubahan dan Fungsi Songsang",
    },
  },
};

export default lesson;
