import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/biology/cell-organisation",
  domain: "biology",
  key: "lesson.biology.cell-organisation",
  kind: "lesson",
  routeSlugs: {
    en: "cell-and-organisation",
    id: "sel-dan-organisasi",
    de: "zelle-und-organisation",
    ms: "sel-dan-organisasi",
  },
  sections: ["cell-structure"],
  slug: "cell-organisation",
  translations: {
    en: {
      description: "Identify organelles and specialised cells.",
      title: "Cells and Organisation",
    },
    id: {
      description: "Kenali organel dan sel khusus.",
      title: "Sel dan Organisasi Kehidupan",
    },
    de: {
      description: "Erkenne Organellen und spezialisierte Zellen.",
      title: "Zelle und Organisation",
    },
    ms: {
      description: "Kenal pasti organel dan sel khusus.",
      title: "Sel dan Organisasi Sel",
    },
  },
};

export default lesson;
