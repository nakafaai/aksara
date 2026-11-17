import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/physics/heat",
  domain: "physics",
  key: "lesson.physics.heat",
  kind: "lesson",
  routeSlugs: {
    en: "heat",
    id: "kalor",
    de: "waerme",
    ms: "haba",
  },
  sections: ["heat-gas-laws"],
  slug: "heat",
  translations: {
    en: {
      description: "Calculate heat, latent heat and the gas laws.",
      title: "Heat",
    },
    id: {
      description: "Hitung kalor, kalor laten, dan hukum gas.",
      title: "Kalor",
    },
    de: {
      description: "Berechne Wärme, latente Wärme und Gasgesetze.",
      title: "Wärme",
    },
    ms: {
      description: "Kira haba, haba pendam dan hukum gas.",
      title: "Haba",
    },
  },
};

export default lesson;
