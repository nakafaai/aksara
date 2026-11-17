import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonPhysicsMomentumMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/physics/momentum",
  domain: "physics",
  key: "lesson.physics.momentum",
  kind: "lesson",
  routeSlugs: {
    de: "impuls-und-newtonsche-gesetze",
    en: "momentum-and-newton-laws",
    id: "momentum-dan-hukum-newton",
    ms: "momentum-dan-hukum-newton",
  },
  sections: [
    {
      evidenceUrls: [
        "https://openstax.org/books/university-physics-volume-1/pages/5-2-newtons-first-law",
        "https://openstax.org/books/university-physics-volume-1/pages/5-3-newtons-second-law",
        "https://openstax.org/books/university-physics-volume-1/pages/9-2-impulse-and-collisions",
        "https://openstax.org/books/university-physics-volume-1/pages/9-3-conservation-of-linear-momentum",
        "https://openstax.org/books/university-physics-volume-1/pages/9-4-types-of-collisions",
      ],
      routeSlugs: {
        de: "traegheit-impuls-und-kraftstoss",
        en: "inertia-momentum-and-impulse",
        id: "kelembaman-momentum-dan-impuls",
        ms: "inersia-momentum-dan-impuls",
      },
      slug: "newton-laws",
    },
  ],
  slug: "momentum",
  translations: {
    de: {
      description: "Nutze Trägheit, Impulserhaltung und Kraftstoß.",
      title: "Impuls und newtonsche Gesetze",
    },
    en: {
      description: "Use inertia, momentum conservation and impulse.",
      title: "Momentum and Newton's Laws",
    },
    id: {
      description: "Pakai kelembaman, kekekalan momentum, dan impuls.",
      title: "Momentum dan Hukum Newton",
    },
    ms: {
      description: "Guna inersia, keabadian momentum dan impuls.",
      title: "Momentum dan Hukum Newton",
    },
  },
});
