import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/physics/renewable-energy",
  domain: "physics",
  key: "lesson.physics.renewable-energy",
  kind: "lesson",
  routeSlugs: {
    en: "renewable-energy",
    id: "energi-terbarukan",
    de: "erneuerbare-energien",
    ms: "tenaga-boleh-baharu",
  },
  sections: [
    "energy",
    "energy-conservation",
    "energy-forms",
    "energy-impact",
    "energy-solutions",
    "energy-sources",
    "energy-transformation",
    "energy-urgency",
    "non-renewable-sources",
    "renewable-sources",
  ],
  slug: "renewable-energy",
  translations: {
    en: {
      description: "Connect energy, work, power, and electricity use.",
      title: "Renewable Energy",
    },
    id: {
      description: "Hubungkan energi, usaha, daya, dan listrik harian.",
      title: "Energi Terbarukan",
    },
    de: {
      description: "Verbinde Energie, Arbeit, Leistung und Stromverbrauch.",
      title: "Erneuerbare Energien",
    },
    ms: {
      description: "Kaitkan tenaga, kerja, kuasa dan penggunaan elektrik.",
      title: "Tenaga Boleh Baharu",
    },
  },
};

export default lesson;
