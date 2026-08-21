import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonBiologyBiodiversityMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/biology/biodiversity",
  domain: "biology",
  key: "lesson.biology.biodiversity",
  kind: "lesson",
  routeSlugs: {
    de: "vielfalt-der-lebewesen",
    en: "biodiversity",
    id: "keanekaragaman-makhluk-hidup",
  },
  sections: [
    {
      routeSlugs: { de: "bakterien", en: "bacteria", id: "bakteri" },
      slug: "bacteria",
    },
    {
      routeSlugs: {
        de: "klassifikation",
        en: "classification",
        id: "klasifikasi-makhluk-hidup",
      },
      slug: "classification",
    },
    {
      routeSlugs: { de: "pilze", en: "fungi", id: "fungi" },
      slug: "fungi",
    },
    {
      routeSlugs: {
        de: "ebenen-der-vielfalt",
        en: "levels",
        id: "keanekaragaman-hayati",
      },
      slug: "levels",
    },
    {
      routeSlugs: {
        de: "lebewesen",
        en: "living-organisms",
        id: "makhluk-hidup-dalam-ekosistem",
      },
      slug: "living-organisms",
    },
  ],
  slug: "biodiversity",
  translations: {
    de: {
      description: "Untersuche Vielfalt, Ökosysteme, Bakterien und Pilze.",
      title: "Vielfalt der Lebewesen",
    },
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
