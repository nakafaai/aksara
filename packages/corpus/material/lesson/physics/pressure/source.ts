import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/physics/pressure",
  domain: "physics",
  key: "lesson.physics.pressure",
  kind: "lesson",
  routeSlugs: {
    en: "pressure",
    id: "tekanan",
    de: "druck",
    ms: "tekanan",
  },
  sections: ["fluid-pressure"],
  slug: "pressure",
  translations: {
    en: {
      description: "Work out liquid pressure, hydraulics and buoyancy.",
      title: "Pressure",
    },
    id: {
      description: "Hitung tekanan hidrostatis, hidrolik, dan gaya apung.",
      title: "Tekanan",
    },
    de: {
      description: "Berechne Schweredruck, Hydraulik und Auftrieb.",
      title: "Druck",
    },
    ms: {
      description: "Kira tekanan cecair, hidraulik dan keapungan.",
      title: "Tekanan",
    },
  },
};

export default lesson;
