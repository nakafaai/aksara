import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsFunctionCompositionInverseFunctionMaterial =
  defineLessonMaterial({
    assetRoot:
      "material/lesson/mathematics/function-composition-inverse-function",
    domain: "mathematics",
    key: "lesson.mathematics.function-composition-inverse-function",
    kind: "lesson",
    routeSlugs: {
      en: "function-composition-inverse-function",
      id: "fungsi-komposisi-dan-fungsi-invers",
    },
    sections: [
      {
        routeSlugs: {
          en: "addition-subtraction-function",
          id: "penjumlahan-dan-pengurangan-fungsi",
        },
        slug: "addition-subtraction-function",
      },
      {
        routeSlugs: {
          en: "domain-codomain-range",
          id: "domain-kodomain-dan-range",
        },
        slug: "domain-codomain-range",
      },
      {
        routeSlugs: {
          en: "function-and-non-function",
          id: "fungsi-dan-bukan-fungsi",
        },
        slug: "function-and-non-function",
      },
      {
        routeSlugs: { en: "function-composition", id: "komposisi-fungsi" },
        slug: "function-composition",
      },
      {
        routeSlugs: { en: "function-concept", id: "konsep-fungsi" },
        slug: "function-concept",
      },
      {
        routeSlugs: {
          en: "injective-surjective-bijective-function",
          id: "fungsi-injektif-surjektif-dan-bijektif",
        },
        slug: "injective-surjective-bijective-function",
      },
      {
        routeSlugs: { en: "inverse-function", id: "fungsi-invers" },
        slug: "inverse-function",
      },
      {
        routeSlugs: {
          en: "multiplication-division-function",
          id: "perkalian-dan-pembagian-fungsi",
        },
        slug: "multiplication-division-function",
      },
      {
        routeSlugs: {
          en: "properties-of-function-composition",
          id: "sifat-komposisi-fungsi",
        },
        slug: "properties-of-function-composition",
      },
      {
        routeSlugs: {
          en: "properties-of-inverse-function",
          id: "sifat-fungsi-invers",
        },
        slug: "properties-of-inverse-function",
      },
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
    },
  });
