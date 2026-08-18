import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonBiologyBiodiversityMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/biology/biodiversity",
  domain: "biology",
  key: "lesson.biology.biodiversity",
  kind: "lesson",
  routeSlugs: { en: "biodiversity", id: "keanekaragaman-makhluk-hidup" },
  sections: [
    {
      routeSlugs: { en: "bacteria", id: "bakteri" },
      slug: "bacteria",
    },
    {
      routeSlugs: { en: "classification", id: "klasifikasi-makhluk-hidup" },
      slug: "classification",
    },
    {
      routeSlugs: { en: "fungi", id: "fungi" },
      slug: "fungi",
    },
    {
      routeSlugs: { en: "levels", id: "keanekaragaman-hayati" },
      slug: "levels",
    },
    {
      routeSlugs: {
        en: "living-organisms",
        id: "makhluk-hidup-dalam-ekosistem",
      },
      slug: "living-organisms",
    },
  ],
  slug: "biodiversity",
  translations: {
    en: {
      description: "Connect bacterial shapes and parts to life roles.",
      title: "Biodiversity of Living Organisms",
    },
    id: {
      description: "Kenali bentuk bakteri dan perannya dalam hidup.",
      title: "Keanekaragaman Makhluk Hidup",
    },
  },
});
