import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/biology/respiratory-system",
  domain: "biology",
  key: "lesson.biology.respiratory-system",
  kind: "lesson",
  routeSlugs: {
    de: "atmungssystem",
    en: "respiratory-system",
    id: "sistem-pernapasan",
    ms: "sistem-respirasi",
  },
  sections: ["gas-exchange"],
  slug: "respiratory-system",
  translations: {
    de: {
      description: "Erkläre Atembewegung und Gasaustausch.",
      title: "Atmungssysteme bei Mensch und Tier",
    },
    en: {
      description: "Explain breathing and gas exchange.",
      title: "Respiratory Systems",
    },
    id: {
      description: "Jelaskan mekanisme bernapas dan pertukaran gas.",
      title: "Sistem Pernapasan",
    },
    ms: {
      description: "Terangkan mekanisme pernafasan dan pertukaran gas.",
      title: "Sistem Respirasi",
    },
  },
};

export default lesson;
