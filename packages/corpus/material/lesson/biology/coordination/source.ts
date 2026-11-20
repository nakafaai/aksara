import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/biology/coordination",
  domain: "biology",
  key: "lesson.biology.coordination",
  kind: "lesson",
  routeSlugs: {
    de: "koordination",
    en: "coordination",
    id: "sistem-koordinasi",
    ms: "koordinasi",
  },
  sections: ["nerve-hormone"],
  slug: "coordination",
  translations: {
    de: {
      description: "Erkläre Nervenzellen, Reflexe und Hormone.",
      title: "Koordination und Reaktion",
    },
    en: {
      description: "Explain neurones, reflexes and hormones.",
      title: "Coordination and Response",
    },
    id: {
      description: "Jelaskan neuron, refleks, dan hormon.",
      title: "Sistem Koordinasi",
    },
    ms: {
      description: "Terangkan neuron, refleks dan hormon.",
      title: "Koordinasi dan Gerak Balas",
    },
  },
};

export default lesson;
