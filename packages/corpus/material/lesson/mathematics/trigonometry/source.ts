import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsTrigonometryMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/mathematics/trigonometry",
  domain: "mathematics",
  key: "lesson.mathematics.trigonometry",
  kind: "lesson",
  routeSlugs: { en: "trigonometry", id: "trigonometri" },
  sections: [
    {
      routeSlugs: {
        en: "right-triangle-naming",
        id: "penamaan-sisi-segitiga-siku-siku",
      },
      slug: "right-triangle-naming",
    },
    {
      routeSlugs: {
        en: "trigonometric-comparison-sin-cos",
        id: "perbandingan-trigonometri-sinus-dan-cosinus",
      },
      slug: "trigonometric-comparison-sin-cos",
    },
    {
      routeSlugs: {
        en: "trigonometric-comparison-special-angle",
        id: "sudut-istimewa-perbandingan-trigonometri",
      },
      slug: "trigonometric-comparison-special-angle",
    },
    {
      routeSlugs: {
        en: "trigonometric-comparison-tan",
        id: "perbandingan-trigonometri-tangen",
      },
      slug: "trigonometric-comparison-tan",
    },
    {
      routeSlugs: {
        en: "trigonometric-comparison-tan-usage",
        id: "kegunaan-perbandingan-trigonometri-tangen",
      },
      slug: "trigonometric-comparison-tan-usage",
    },
    {
      routeSlugs: {
        en: "trigonometric-comparison-three-primary",
        id: "tiga-serangkai-perbandingan-trigonometri",
      },
      slug: "trigonometric-comparison-three-primary",
    },
    {
      routeSlugs: { en: "trigonometry-concept", id: "konsep-trigonometri" },
      slug: "trigonometry-concept",
    },
  ],
  slug: "trigonometry",
  translations: {
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
