import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsLimitMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/mathematics/limit",
  domain: "mathematics",
  key: "lesson.mathematics.limit",
  kind: "lesson",
  routeSlugs: { en: "limit", id: "limit" },
  sections: [
    {
      routeSlugs: {
        en: "application-of-limit-function",
        id: "aplikasi-limit-fungsi",
      },
      slug: "application-of-limit-function",
    },
    {
      routeSlugs: {
        en: "concept-of-limit-function",
        id: "konsep-limit-fungsi",
      },
      slug: "concept-of-limit-function",
    },
    {
      routeSlugs: {
        en: "limit-of-algebraic-function",
        id: "limit-fungsi-aljabar",
      },
      slug: "limit-of-algebraic-function",
    },
    {
      routeSlugs: {
        en: "limit-of-trigonometric-function",
        id: "limit-fungsi-trigonometri",
      },
      slug: "limit-of-trigonometric-function",
    },
    {
      routeSlugs: {
        en: "properties-of-limit-function",
        id: "sifat-limit-fungsi",
      },
      slug: "properties-of-limit-function",
    },
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
  },
});
