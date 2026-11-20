import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/physics/vector",
  domain: "physics",
  key: "lesson.physics.vector",
  kind: "lesson",
  routeSlugs: {
    en: "vector",
    id: "vektor",
    de: "vektoren",
    ms: "vektor",
  },
  sections: [
    "analytical-addition-subtraction",
    "component",
    "concept",
    "cosine-rule",
    "graphical-addition-subtraction",
    "multiplication",
    "notation",
    "property",
    "sine-rule",
    "trigonometry-decomposition",
  ],
  slug: "vector",
  translations: {
    en: {
      description: "Build resultants from components and direction.",
      title: "Vector",
    },
    id: {
      description: "Susun resultan dari komponen dan arah.",
      title: "Vektor",
    },
    de: {
      description: "Bestimme Resultierende aus Komponenten und Richtung.",
      title: "Vektoren",
    },
    ms: {
      description: "Bina vektor paduan daripada komponen dan arah.",
      title: "Vektor",
    },
  },
};

export default lesson;
