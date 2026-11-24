import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/biology/plant-tissue",
  domain: "biology",
  key: "lesson.biology.plant-tissue",
  kind: "lesson",
  routeSlugs: {
    de: "pflanzengewebe",
    en: "plant-tissues",
    id: "jaringan-tumbuhan",
    ms: "tisu-tumbuhan",
  },
  sections: ["tissue-growth"],
  slug: "plant-tissue",
  translations: {
    de: {
      description: "Erkenne Pflanzengewebe und lies Wachstumskurven.",
      title: "Pflanzengewebe und Wachstum",
    },
    en: {
      description: "Identify plant tissues and read growth curves.",
      title: "Plant Tissues and Growth",
    },
    id: {
      description: "Kenali jaringan tumbuhan dan baca kurva pertumbuhan.",
      title: "Jaringan Tumbuhan dan Pertumbuhan",
    },
    ms: {
      description: "Kenali tisu tumbuhan dan tafsir lengkung pertumbuhan.",
      title: "Tisu Tumbuhan dan Pertumbuhan",
    },
  },
};

export default lesson;
