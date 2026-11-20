import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/biology/biodiversity",
  domain: "biology",
  key: "lesson.biology.biodiversity",
  kind: "lesson",
  routeSlugs: {
    en: "biodiversity",
    id: "keanekaragaman-makhluk-hidup",
    de: "vielfalt-der-lebewesen",
    ms: "biodiversiti",
  },
  sections: [
    "bacteria",
    "classification",
    "fungi",
    "levels",
    "living-organisms",
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
    de: {
      description: "Untersuche Vielfalt, Ökosysteme, Bakterien und Pilze.",
      title: "Vielfalt der Lebewesen",
    },
    ms: {
      description: "Kaitkan bentuk dan bahagian bakteria dengan peranannya.",
      title: "Biodiversiti",
    },
  },
};

export default lesson;
