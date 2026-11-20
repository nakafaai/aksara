import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/chemistry/chemistry-introduction",
  domain: "chemistry",
  key: "lesson.chemistry.chemistry-introduction",
  kind: "lesson",
  routeSlugs: {
    en: "introduction-to-chemistry",
    id: "pengantar-kimia",
    de: "einfuehrung-in-die-chemie",
    ms: "pengenalan-kepada-kimia",
  },
  sections: ["scientific-method"],
  slug: "chemistry-introduction",
  translations: {
    en: {
      description: "Investigate like a chemist and work safely in the lab.",
      title: "Introduction to Chemistry",
    },
    id: {
      description: "Selidiki seperti ahli kimia dan bekerja aman di lab.",
      title: "Pengantar Kimia",
    },
    de: {
      description: "Forsche wie ein Chemiker und arbeite sicher im Labor.",
      title: "Einführung in die Chemie",
    },
    ms: {
      description: "Siasat seperti ahli kimia dan bekerja selamat di makmal.",
      title: "Pengenalan kepada Kimia",
    },
  },
};

export default lesson;
