import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/physics/thermodynamics",
  domain: "physics",
  key: "lesson.physics.thermodynamics",
  kind: "lesson",
  routeSlugs: {
    en: "thermodynamics",
    id: "termodinamika",
    de: "thermodynamik",
    ms: "termodinamik",
  },
  sections: ["gas-first-law-engine"],
  slug: "thermodynamics",
  translations: {
    en: {
      description: "Use the first law, gas processes and heat engines.",
      title: "Thermodynamics",
    },
    id: {
      description: "Pakai hukum pertama, proses gas, dan mesin kalor.",
      title: "Termodinamika",
    },
    de: {
      description: "Nutze den ersten Hauptsatz, Gasprozesse und Maschinen.",
      title: "Thermodynamik",
    },
    ms: {
      description: "Guna hukum pertama, proses gas dan enjin haba.",
      title: "Termodinamik",
    },
  },
};

export default lesson;
