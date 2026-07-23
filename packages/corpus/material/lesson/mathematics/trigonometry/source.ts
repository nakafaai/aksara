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
      translations: {
        en: {
          title: "Right Triangle Side Naming",
        },
        id: {
          title: "Penamaan Sisi Segitiga Siku-siku",
        },
      },
    },
    {
      routeSlugs: {
        en: "trigonometric-comparison-sin-cos",
        id: "perbandingan-trigonometri-sinus-dan-cosinus",
      },
      slug: "trigonometric-comparison-sin-cos",
      translations: {
        en: {
          title: "Trigonometric Comparison: Sine and Cosine",
        },
        id: {
          title: "Perbandingan Trigonometri: Sinus dan Cosinus",
        },
      },
    },
    {
      routeSlugs: {
        en: "trigonometric-comparison-special-angle",
        id: "sudut-istimewa-perbandingan-trigonometri",
      },
      slug: "trigonometric-comparison-special-angle",
      translations: {
        en: {
          title: "Special Angles in Trigonometric Comparisons",
        },
        id: {
          title: "Sudut Istimewa Perbandingan Trigonometri",
        },
      },
    },
    {
      routeSlugs: {
        en: "trigonometric-comparison-tan",
        id: "perbandingan-trigonometri-tangen",
      },
      slug: "trigonometric-comparison-tan",
      translations: {
        en: {
          title: "Trigonometric Comparison: Tangent",
        },
        id: {
          title: "Perbandingan Trigonometri: Tangen",
        },
      },
    },
    {
      routeSlugs: {
        en: "trigonometric-comparison-tan-usage",
        id: "kegunaan-perbandingan-trigonometri-tangen",
      },
      slug: "trigonometric-comparison-tan-usage",
      translations: {
        en: {
          title: "Applications of the Tangent Ratio",
        },
        id: {
          title: "Kegunaan Perbandingan Trigonometri Tangen",
        },
      },
    },
    {
      routeSlugs: {
        en: "trigonometric-comparison-three-primary",
        id: "tiga-serangkai-perbandingan-trigonometri",
      },
      slug: "trigonometric-comparison-three-primary",
      translations: {
        en: {
          title: "The Three Primary Trigonometric Comparisons",
        },
        id: {
          title: "Tiga Serangkai Perbandingan Trigonometri",
        },
      },
    },
    {
      routeSlugs: { en: "trigonometry-concept", id: "konsep-trigonometri" },
      slug: "trigonometry-concept",
      translations: {
        en: {
          title: "Trigonometry Concept",
        },
        id: {
          title: "Konsep Trigonometri",
        },
      },
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
