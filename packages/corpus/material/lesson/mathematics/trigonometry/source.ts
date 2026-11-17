import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/mathematics/trigonometry",
  domain: "mathematics",
  key: "lesson.mathematics.trigonometry",
  kind: "lesson",
  routeSlugs: {
    en: "trigonometry",
    id: "trigonometri",
    de: "trigonometrie",
    ms: "trigonometri",
  },
  sections: [
    "right-triangle-naming",
    "trigonometric-comparison-sin-cos",
    "trigonometric-comparison-special-angle",
    "trigonometric-comparison-tan",
    "trigonometric-comparison-tan-usage",
    "trigonometric-comparison-three-primary",
    "trigonometry-concept",
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
    de: {
      description: "Ordne Dreiecksseiten den Winkelfunktionen zu.",
      title: "Trigonometrie",
    },
    ms: {
      description: "Gunakan nisbah sisi untuk mengira sudut dan jarak.",
      title: "Trigonometri",
    },
  },
};

export default lesson;
