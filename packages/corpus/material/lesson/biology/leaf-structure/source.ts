import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/biology/leaf-structure",
  domain: "biology",
  key: "lesson.biology.leaf-structure",
  kind: "lesson",
  routeSlugs: {
    de: "blatt",
    en: "leaf",
    id: "daun",
    ms: "daun",
  },
  sections: ["leaf-function"],
  slug: "leaf-structure",
  translations: {
    de: {
      description: "Versteh Blattbau, Gasaustausch und Fotosynthese.",
      title: "Bau und Funktion des Blattes",
    },
    en: {
      description: "Link leaf structure to gas exchange and photosynthesis.",
      title: "Leaf Structure and Function",
    },
    id: {
      description: "Pahami struktur daun, pertukaran gas, dan fotosintesis.",
      title: "Struktur dan Fungsi Daun",
    },
    ms: {
      description: "Fahami struktur daun, pertukaran gas dan fotosintesis.",
      title: "Struktur dan Fungsi Daun",
    },
  },
};

export default lesson;
