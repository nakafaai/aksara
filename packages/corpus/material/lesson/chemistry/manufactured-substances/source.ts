import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/chemistry/manufactured-substances",
  domain: "chemistry",
  key: "lesson.chemistry.manufactured-substances",
  kind: "lesson",
  routeSlugs: {
    en: "manufactured-substances-in-industry",
    id: "bahan-buatan-dalam-industri",
    de: "industriell-hergestellte-stoffe",
    ms: "bahan-buatan-dalam-industri",
  },
  sections: ["alloy-glass-ceramic"],
  slug: "manufactured-substances",
  translations: {
    en: {
      description: "See why alloys, glass and ceramics behave as they do.",
      title: "Manufactured Substances in Industry",
    },
    id: {
      description: "Lihat alasan sifat paduan logam, kaca, dan keramik.",
      title: "Bahan Buatan dalam Industri",
    },
    de: {
      description: "Sieh, warum Legierungen, Glas und Keramik so wirken.",
      title: "Industriell hergestellte Stoffe",
    },
    ms: {
      description: "Lihat sebab sifat aloi, kaca dan seramik berbeza.",
      title: "Bahan Buatan dalam Industri",
    },
  },
};

export default lesson;
