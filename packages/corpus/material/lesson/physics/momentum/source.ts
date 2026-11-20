import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/physics/momentum",
  domain: "physics",
  key: "lesson.physics.momentum",
  kind: "lesson",
  routeSlugs: {
    en: "momentum-and-newton-laws",
    id: "momentum-dan-hukum-newton",
    de: "impuls-und-newtonsche-gesetze",
    ms: "momentum-dan-hukum-newton",
  },
  sections: ["newton-laws"],
  slug: "momentum",
  translations: {
    en: {
      description: "Use inertia, momentum conservation and impulse.",
      title: "Momentum and Newton's Laws",
    },
    id: {
      description: "Pakai kelembaman, kekekalan momentum, dan impuls.",
      title: "Momentum dan Hukum Newton",
    },
    de: {
      description: "Nutze Trägheit, Impulserhaltung und Kraftstoß.",
      title: "Impuls und newtonsche Gesetze",
    },
    ms: {
      description: "Guna inersia, keabadian momentum dan impuls.",
      title: "Momentum dan Hukum Newton",
    },
  },
};

export default lesson;
