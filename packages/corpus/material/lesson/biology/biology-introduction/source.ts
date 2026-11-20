import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/biology/biology-introduction",
  domain: "biology",
  key: "lesson.biology.biology-introduction",
  kind: "lesson",
  routeSlugs: {
    en: "introduction-to-biology",
    id: "pengantar-biologi",
    de: "einfuehrung-in-die-biologie",
    ms: "pengenalan-kepada-biologi",
  },
  sections: ["laboratory-rules"],
  slug: "biology-introduction",
  translations: {
    en: {
      description: "Explore biology fields, lab safety and investigations.",
      title: "Introduction to Biology",
    },
    id: {
      description: "Kenali bidang biologi, aturan lab, dan metode ilmiah.",
      title: "Pengantar Biologi",
    },
    de: {
      description: "Kenne Fachgebiete, Laborregeln und faire Versuche.",
      title: "Einführung in die Biologie",
    },
    ms: {
      description: "Kenali bidang biologi, peraturan makmal dan penyiasatan.",
      title: "Pengenalan kepada Biologi",
    },
  },
};

export default lesson;
