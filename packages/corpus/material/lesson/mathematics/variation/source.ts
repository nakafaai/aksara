import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/mathematics/variation",
  domain: "mathematics",
  key: "lesson.mathematics.variation",
  kind: "lesson",
  routeSlugs: {
    de: "proportionalitaet",
    en: "variation",
    id: "variasi",
    ms: "ubahan",
  },
  sections: ["proportion"],
  slug: "variation",
  translations: {
    de: {
      description: "Bestimme den Faktor und löse Aufgaben.",
      title: "Proportionalität",
    },
    en: {
      description: "Find the constant of variation and solve problems.",
      title: "Variation",
    },
    id: {
      description: "Tentukan konstanta variasi dan selesaikan soal.",
      title: "Variasi",
    },
    ms: {
      description: "Cari pemalar ubahan dan selesaikan masalah.",
      title: "Ubahan",
    },
  },
};

export default lesson;
