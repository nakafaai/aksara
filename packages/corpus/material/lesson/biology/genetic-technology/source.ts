import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/biology/genetic-technology",
  domain: "biology",
  key: "lesson.biology.genetic-technology",
  kind: "lesson",
  routeSlugs: {
    de: "gentechnik",
    en: "genetic-technology",
    id: "teknologi-genetika",
    ms: "teknologi-genetik",
  },
  sections: ["genetic-engineering"],
  slug: "genetic-technology",
  translations: {
    de: {
      description: "Stell Insulin mit Bakterien her und lies DNA-Profile.",
      title: "Gentechnik",
    },
    en: {
      description: "Make insulin with bacteria and read DNA profiles.",
      title: "Genetic Technology",
    },
    id: {
      description: "Buat insulin dengan bakteri dan baca profil DNA.",
      title: "Teknologi Genetika",
    },
    ms: {
      description: "Hasilkan insulin dengan bakteria dan baca profil DNA.",
      title: "Teknologi Genetik",
    },
  },
};

export default lesson;
