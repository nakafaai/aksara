import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/physics/electronics",
  domain: "physics",
  key: "lesson.physics.electronics",
  kind: "lesson",
  routeSlugs: {
    en: "electronics",
    id: "elektronika",
    de: "elektronik",
    ms: "elektronik",
  },
  sections: ["diode-transistor"],
  slug: "electronics",
  translations: {
    en: {
      description: "Use diodes and transistors in circuits.",
      title: "Electronics",
    },
    id: {
      description: "Pakai dioda dan transistor dalam rangkaian.",
      title: "Elektronika",
    },
    de: {
      description: "Nutze Dioden und Transistoren in Schaltungen.",
      title: "Elektronik",
    },
    ms: {
      description: "Guna diod dan transistor dalam litar.",
      title: "Elektronik",
    },
  },
};

export default lesson;
