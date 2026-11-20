import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/mathematics/financial-planning",
  domain: "mathematics",
  key: "lesson.mathematics.financial-planning",
  kind: "lesson",
  routeSlugs: {
    de: "finanzplanung",
    en: "financial-management",
    id: "pengelolaan-keuangan",
    ms: "pengurusan-kewangan",
  },
  sections: ["budget"],
  slug: "financial-planning",
  translations: {
    de: {
      description: "Stelle ein Budget auf und plane ein Sparziel.",
      title: "Finanzplanung",
    },
    en: {
      description: "Build a budget and plan a savings goal.",
      title: "Financial Management",
    },
    id: {
      description: "Susun anggaran dan rencanakan target tabungan.",
      title: "Pengelolaan Keuangan",
    },
    ms: {
      description: "Bina belanjawan dan rancang sasaran simpanan.",
      title: "Pengurusan Kewangan",
    },
  },
};

export default lesson;
