import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/mathematics/limit",
  domain: "mathematics",
  key: "lesson.mathematics.limit",
  kind: "lesson",
  routeSlugs: {
    en: "limit",
    id: "limit",
    de: "grenzwerte",
    ms: "had",
  },
  sections: [
    "application-of-limit-function",
    "concept-of-limit-function",
    "limit-of-algebraic-function",
    "limit-of-trigonometric-function",
    "properties-of-limit-function",
  ],
  slug: "limit",
  translations: {
    en: {
      description: "Use limits to read change in real situations.",
      title: "Limits",
    },
    id: {
      description: "Gunakan limit untuk membaca perubahan nyata.",
      title: "Limit",
    },
    de: {
      description: "Nutze Grenzwerte, um Veränderungen zu beschreiben.",
      title: "Grenzwerte",
    },
    ms: {
      description: "Guna had untuk membaca perubahan dalam situasi sebenar.",
      title: "Had",
    },
  },
};

export default lesson;
