import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/biology/inheritance",
  domain: "biology",
  key: "lesson.biology.inheritance",
  kind: "lesson",
  routeSlugs: {
    de: "vererbung",
    en: "inheritance",
    id: "pewarisan-sifat",
    ms: "pewarisan",
  },
  sections: ["mendelian-human"],
  slug: "inheritance",
  translations: {
    de: {
      description: "Rechne Erbgänge nach Mendel und beim Menschen.",
      title: "Vererbung",
    },
    en: {
      description: "Work out Mendel's crosses and human inheritance.",
      title: "Inheritance",
    },
    id: {
      description: "Hitung persilangan Mendel dan pewarisan pada manusia.",
      title: "Pewarisan Sifat",
    },
    ms: {
      description: "Selesaikan kacukan Mendel dan pewarisan manusia.",
      title: "Pewarisan",
    },
  },
};

export default lesson;
