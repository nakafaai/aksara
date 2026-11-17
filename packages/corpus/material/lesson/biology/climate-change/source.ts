import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/biology/climate-change",
  domain: "biology",
  key: "lesson.biology.climate-change",
  kind: "lesson",
  routeSlugs: {
    en: "climate-change",
    id: "perubahan-iklim",
    de: "klimawandel",
    ms: "perubahan-iklim",
  },
  sections: [
    "causes",
    "global-cooperation",
    "impact",
    "mitigation-adaptation",
    "symptoms",
  ],
  slug: "climate-change",
  translations: {
    en: {
      description: "Trace how human activity traps heat on Earth.",
      title: "Climate Change",
    },
    id: {
      description: "Telusuri aktivitas manusia yang memerangkap panas bumi.",
      title: "Perubahan Iklim",
    },
    de: {
      description: "Untersuche Ursachen, Anzeichen, Folgen und Antworten.",
      title: "Klimawandel",
    },
    ms: {
      description: "Jejaki cara aktiviti manusia memerangkap haba di Bumi.",
      title: "Perubahan Iklim",
    },
  },
};

export default lesson;
