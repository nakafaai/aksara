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
      translations: {
        en: {
          title: "Bacteria",
        },
        id: {
          title: "Bakteri",
        },
      },
    },
    {
      routeSlugs: { en: "classification", id: "klasifikasi-makhluk-hidup" },
      slug: "classification",
      translations: {
        en: {
          title: "Classification of Living Organisms",
        },
        id: {
          title: "Klasifikasi Makhluk Hidup",
        },
      },
    },
    {
      routeSlugs: { en: "fungi", id: "fungi" },
      slug: "fungi",
      translations: {
        en: {
          title: "Fungi",
        },
        id: {
          title: "Fungi",
        },
      },
    },
    {
      routeSlugs: { en: "levels", id: "keanekaragaman-hayati" },
      slug: "levels",
      translations: {
        en: {
          title: "Biological Diversity",
        },
        id: {
          title: "Keanekaragaman Hayati",
        },
      },
    },
    {
      routeSlugs: {
        en: "living-organisms",
        id: "makhluk-hidup-dalam-ekosistem",
      },
      slug: "living-organisms",
      translations: {
        en: {
          title: "Living Organisms in Ecosystems",
        },
        id: {
          title: "Makhluk Hidup dalam Ekosistem",
        },
      },
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
