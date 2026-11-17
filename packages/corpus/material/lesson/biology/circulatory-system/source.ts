import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/biology/circulatory-system",
  domain: "biology",
  key: "lesson.biology.circulatory-system",
  kind: "lesson",
  routeSlugs: {
    de: "blutkreislauf",
    en: "circulatory-system",
    id: "sistem-peredaran-darah",
    ms: "sistem-peredaran-darah",
  },
  sections: ["heart-blood"],
  slug: "circulatory-system",
  translations: {
    de: {
      description: "Erkläre Herzzyklus, Blut und Blutdruck.",
      title: "Stofftransport bei Mensch und Tier",
    },
    en: {
      description: "Explain the cardiac cycle, blood and blood pressure.",
      title: "Transport in Humans and Animals",
    },
    id: {
      description: "Jelaskan siklus jantung, darah, dan tekanan darah.",
      title: "Sistem Transportasi",
    },
    ms: {
      description: "Terangkan kitar jantung, darah dan tekanan darah.",
      title: "Pengangkutan dalam Manusia dan Haiwan",
    },
  },
};

export default lesson;
