import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsLimitMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/mathematics/limit",
  domain: "mathematics",
  key: "lesson.mathematics.limit",
  kind: "lesson",
  routeSlugs: { de: "grenzwerte", en: "limit", id: "limit" },
  sections: [
    {
      routeSlugs: {
        de: "anwendungen-von-grenzwerten",
        en: "application-of-limit-function",
        id: "aplikasi-limit-fungsi",
      },
      slug: "application-of-limit-function",
    },
    {
      routeSlugs: {
        de: "begriff-des-grenzwerts",
        en: "concept-of-limit-function",
        id: "konsep-limit-fungsi",
      },
      slug: "concept-of-limit-function",
    },
    {
      routeSlugs: {
        de: "grenzwerte-algebraischer-funktionen",
        en: "limit-of-algebraic-function",
        id: "limit-fungsi-aljabar",
      },
      slug: "limit-of-algebraic-function",
    },
    {
      routeSlugs: {
        de: "grenzwerte-trigonometrischer-funktionen",
        en: "limit-of-trigonometric-function",
        id: "limit-fungsi-trigonometri",
      },
      slug: "limit-of-trigonometric-function",
    },
    {
      routeSlugs: {
        de: "eigenschaften-von-grenzwerten",
        en: "properties-of-limit-function",
        id: "sifat-limit-fungsi",
      },
      slug: "properties-of-limit-function",
    },
  ],
  slug: "limit",
  translations: {
    de: {
      description: "Nutze Grenzwerte, um Veränderungen zu beschreiben.",
      title: "Grenzwerte",
    },
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
