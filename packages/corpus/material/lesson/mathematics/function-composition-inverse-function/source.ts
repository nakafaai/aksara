import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsFunctionCompositionInverseFunctionMaterial =
  defineLessonMaterial({
    assetRoot:
      "material/lesson/mathematics/function-composition-inverse-function",
    domain: "mathematics",
    key: "lesson.mathematics.function-composition-inverse-function",
    kind: "lesson",
    routeSlugs: {
      de: "funktionskomposition-und-umkehrfunktion",
      en: "function-composition-inverse-function",
      id: "fungsi-komposisi-dan-fungsi-invers",
      ms: "fungsi-gubahan-dan-fungsi-songsang",
    },
    sections: [
      {
        routeSlugs: {
          de: "addition-und-subtraktion-von-funktionen",
          en: "addition-subtraction-function",
          id: "penjumlahan-dan-pengurangan-fungsi",
          ms: "penambahan-dan-penolakan-fungsi",
        },
        slug: "addition-subtraction-function",
      },
      {
        routeSlugs: {
          de: "definitionsmenge-zielmenge-und-wertebereich",
          en: "domain-codomain-range",
          id: "domain-kodomain-dan-range",
          ms: "domain-kodomain-dan-julat",
        },
        slug: "domain-codomain-range",
      },
      {
        routeSlugs: {
          de: "funktion-und-nichtfunktion",
          en: "function-and-non-function",
          id: "fungsi-dan-bukan-fungsi",
          ms: "fungsi-dan-hubungan-lain",
        },
        slug: "function-and-non-function",
      },
      {
        routeSlugs: {
          de: "funktionskomposition",
          en: "function-composition",
          id: "komposisi-fungsi",
          ms: "fungsi-gubahan",
        },
        slug: "function-composition",
      },
      {
        routeSlugs: {
          de: "funktionsbegriff",
          en: "function-concept",
          id: "konsep-fungsi",
          ms: "konsep-fungsi",
        },
        slug: "function-concept",
      },
      {
        routeSlugs: {
          de: "injektive-surjektive-und-bijektive-funktionen",
          en: "injective-surjective-bijective-function",
          id: "fungsi-injektif-surjektif-dan-bijektif",
          ms: "fungsi-injektif-surjektif-dan-bijektif",
        },
        slug: "injective-surjective-bijective-function",
      },
      {
        routeSlugs: {
          de: "umkehrfunktion",
          en: "inverse-function",
          id: "fungsi-invers",
          ms: "fungsi-songsang",
        },
        slug: "inverse-function",
      },
      {
        routeSlugs: {
          de: "multiplikation-und-division-von-funktionen",
          en: "multiplication-division-function",
          id: "perkalian-dan-pembagian-fungsi",
          ms: "pendaraban-dan-pembahagian-fungsi",
        },
        slug: "multiplication-division-function",
      },
      {
        routeSlugs: {
          de: "eigenschaften-der-funktionskomposition",
          en: "properties-of-function-composition",
          id: "sifat-komposisi-fungsi",
          ms: "sifat-fungsi-gubahan",
        },
        slug: "properties-of-function-composition",
      },
      {
        routeSlugs: {
          de: "eigenschaften-der-umkehrfunktion",
          en: "properties-of-inverse-function",
          id: "sifat-fungsi-invers",
          ms: "sifat-fungsi-songsang",
        },
        slug: "properties-of-inverse-function",
      },
    ],
    slug: "function-composition-inverse-function",
    translations: {
      de: {
        description: "Verknüpfe Funktionen mit passenden Definitionsbereichen.",
        title: "Funktionskomposition und Umkehrfunktion",
      },
      en: {
        description: "Operate on functions while tracking shared domains.",
        title: "Function Composition and Inverse Function",
      },
      id: {
        description: "Operasikan fungsi sambil menjaga domain bersama.",
        title: "Fungsi Komposisi dan Fungsi Invers",
      },
      ms: {
        description: "Kendalikan fungsi sambil menjejak domain sepunya.",
        title: "Fungsi Gubahan dan Fungsi Songsang",
      },
    },
  });
