import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsTrigonometryMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/mathematics/trigonometry",
  domain: "mathematics",
  key: "lesson.mathematics.trigonometry",
  kind: "lesson",
  routeSlugs: { de: "trigonometrie", en: "trigonometry", id: "trigonometri" },
  sections: [
    {
      routeSlugs: {
        de: "bezeichnungen-am-rechtwinkligen-dreieck",
        en: "right-triangle-naming",
        id: "penamaan-sisi-segitiga-siku-siku",
      },
      slug: "right-triangle-naming",
    },
    {
      routeSlugs: {
        de: "sinus-und-kosinus-vergleichen",
        en: "trigonometric-comparison-sin-cos",
        id: "perbandingan-trigonometri-sinus-dan-cosinus",
      },
      slug: "trigonometric-comparison-sin-cos",
    },
    {
      routeSlugs: {
        de: "werte-besonderer-winkel",
        en: "trigonometric-comparison-special-angle",
        id: "sudut-istimewa-perbandingan-trigonometri",
      },
      slug: "trigonometric-comparison-special-angle",
    },
    {
      routeSlugs: {
        de: "tangens-vergleichen",
        en: "trigonometric-comparison-tan",
        id: "perbandingan-trigonometri-tangen",
      },
      slug: "trigonometric-comparison-tan",
    },
    {
      routeSlugs: {
        de: "tangens-anwenden",
        en: "trigonometric-comparison-tan-usage",
        id: "kegunaan-perbandingan-trigonometri-tangen",
      },
      slug: "trigonometric-comparison-tan-usage",
    },
    {
      routeSlugs: {
        de: "sinus-kosinus-und-tangens-vergleichen",
        en: "trigonometric-comparison-three-primary",
        id: "tiga-serangkai-perbandingan-trigonometri",
      },
      slug: "trigonometric-comparison-three-primary",
    },
    {
      routeSlugs: {
        de: "grundidee-der-trigonometrie",
        en: "trigonometry-concept",
        id: "konsep-trigonometri",
      },
      slug: "trigonometry-concept",
    },
  ],
  slug: "trigonometry",
  translations: {
    de: {
      description: "Ordne Dreiecksseiten den Winkelfunktionen zu.",
      title: "Trigonometrie",
    },
    en: {
      description: "Match right-triangle sides to trigonometric ratios.",
      title: "Trigonometry",
    },
    id: {
      description: "Cocokkan sisi segitiga dengan rasio trigonometri.",
      title: "Trigonometri",
    },
  },
});
