import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/biology/digestive-system",
  domain: "biology",
  key: "lesson.biology.digestive-system",
  kind: "lesson",
  routeSlugs: {
    de: "verdauungssystem",
    en: "digestive-system",
    id: "sistem-pencernaan",
    ms: "sistem-pencernaan",
  },
  sections: ["digestion-absorption"],
  slug: "digestive-system",
  translations: {
    de: {
      description: "Erkläre Verdauung, Aufnahme und Energiegehalt.",
      title: "Ernährung und Verdauung",
    },
    en: {
      description: "Explain digestion, absorption and food energy.",
      title: "Nutrition and Digestion",
    },
    id: {
      description: "Jelaskan pencernaan, penyerapan, dan energi makanan.",
      title: "Nutrisi dan Pencernaan",
    },
    ms: {
      description: "Terangkan pencernaan, penyerapan dan tenaga makanan.",
      title: "Nutrisi dan Pencernaan",
    },
  },
};

export default lesson;
