import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/biology/homeostasis",
  domain: "biology",
  key: "lesson.biology.homeostasis",
  kind: "lesson",
  routeSlugs: {
    de: "homoeostase",
    en: "homeostasis",
    id: "homeostasis",
    ms: "homeostasis",
  },
  sections: ["kidney-feedback"],
  slug: "homeostasis",
  translations: {
    de: {
      description: "Erkläre Rückkopplung, Blutzucker und Nephron.",
      title: "Homöostase und Harnsystem",
    },
    en: {
      description: "Explain feedback, blood glucose and the nephron.",
      title: "Homeostasis and the Urinary System",
    },
    id: {
      description: "Jelaskan umpan balik, glukosa darah, dan nefron.",
      title: "Homeostasis dan Sistem Ekskresi",
    },
    ms: {
      description: "Terangkan suap balik, glukosa darah dan nefron.",
      title: "Homeostasis dan Sistem Urinari",
    },
  },
};

export default lesson;
