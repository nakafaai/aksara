import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/biology/ecosystem",
  domain: "biology",
  key: "lesson.biology.ecosystem",
  kind: "lesson",
  routeSlugs: {
    de: "oekosystem",
    en: "ecosystem",
    id: "ekosistem",
    ms: "ekosistem",
  },
  sections: ["community-population"],
  slug: "ecosystem",
  translations: {
    de: {
      description: "Berechne Energieflüsse und schätze Populationen.",
      title: "Ökosystem",
    },
    en: {
      description: "Calculate energy flow and estimate populations.",
      title: "Ecosystem",
    },
    id: {
      description: "Hitung aliran energi dan taksir ukuran populasi.",
      title: "Ekosistem",
    },
    ms: {
      description: "Kira aliran tenaga dan anggar saiz populasi.",
      title: "Ekosistem",
    },
  },
};

export default lesson;
