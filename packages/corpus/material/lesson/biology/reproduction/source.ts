import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/biology/reproduction",
  domain: "biology",
  key: "lesson.biology.reproduction",
  kind: "lesson",
  routeSlugs: {
    de: "fortpflanzung-und-wachstum",
    en: "reproduction-and-growth",
    id: "reproduksi-dan-pertumbuhan",
    ms: "pembiakan-dan-pertumbuhan",
  },
  sections: ["cycle-growth"],
  slug: "reproduction",
  translations: {
    de: {
      description: "Erkläre Zyklus, Befruchtung und Wachstum.",
      title: "Fortpflanzung und Wachstum",
    },
    en: {
      description: "Explain the cycle, fertilisation and growth.",
      title: "Reproduction and Growth",
    },
    id: {
      description: "Jelaskan siklus, fertilisasi, dan pertumbuhan.",
      title: "Reproduksi dan Pertumbuhan",
    },
    ms: {
      description: "Terangkan kitar, persenyawaan dan pertumbuhan.",
      title: "Pembiakan dan Pertumbuhan",
    },
  },
};

export default lesson;
