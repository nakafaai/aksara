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
  sections: ["ideal-gas", "first-law", "second-law-engines"],
  slug: "thermodynamics",
  translations: {
    en: {
      description: "Use the ideal gas law, both laws and heat engines.",
      title: "Thermodynamics",
    },
    id: {
      description: "Pakai gas ideal, hukum pertama dan kedua, mesin kalor.",
      title: "Termodinamika",
    },
    de: {
      description: "Nutze ideale Gase, Hauptsätze und Wärmekraftmaschinen.",
      title: "Thermodynamik",
    },
    ms: {
      description: "Guna gas unggul, hukum pertama dan kedua, enjin haba.",
      title: "Termodinamik",
    },
  },
};

export default lesson;
