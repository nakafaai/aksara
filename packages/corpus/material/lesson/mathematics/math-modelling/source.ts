import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/mathematics/math-modelling",
  domain: "mathematics",
  key: "lesson.mathematics.math-modelling",
  kind: "lesson",
  routeSlugs: {
    de: "mathematisches-modellieren",
    en: "mathematical-modelling",
    id: "pemodelan-matematika",
    ms: "pemodelan-matematik",
  },
  sections: ["process"],
  slug: "math-modelling",
  translations: {
    de: {
      description: "Stelle Modelle aus Daten auf und prüfe sie.",
      title: "Mathematisches Modellieren",
    },
    en: {
      description: "Build models from data and verify them.",
      title: "Mathematical Modelling",
    },
    id: {
      description: "Susun model dari data lalu uji modelnya.",
      title: "Pemodelan Matematika",
    },
    ms: {
      description: "Bina model daripada data dan sahkannya.",
      title: "Pemodelan Matematik",
    },
  },
};

export default lesson;
