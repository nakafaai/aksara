import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonPhysicsGravitationMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/physics/gravitation",
  domain: "physics",
  key: "lesson.physics.gravitation",
  kind: "lesson",
  routeSlugs: {
    de: "gravitation",
    en: "gravitation",
    id: "gravitasi",
    ms: "kegravitian",
  },
  sections: [
    {
      evidenceUrls: [
        "https://openstax.org/books/university-physics-volume-1/pages/13-1-newtons-law-of-universal-gravitation",
        "https://openstax.org/books/university-physics-volume-1/pages/13-2-gravitation-near-earths-surface",
        "https://openstax.org/books/university-physics-volume-1/pages/13-3-gravitational-potential-energy-and-total-energy",
        "https://openstax.org/books/university-physics-volume-1/pages/13-4-satellite-orbits-and-energy",
        "https://openstax.org/books/university-physics-volume-1/pages/13-5-keplers-laws-of-planetary-motion",
        "https://nssdc.gsfc.nasa.gov/planetary/factsheet/",
      ],
      routeSlugs: {
        de: "gravitationsgesetz-und-satelliten",
        en: "universal-gravitation-and-satellites",
        id: "gravitasi-universal-dan-satelit",
        ms: "kegravitian-semesta-dan-satelit",
      },
      slug: "universal-gravitation",
    },
  ],
  slug: "gravitation",
  translations: {
    de: {
      description: "Berechne Schwerkraft, Bahnen und Fluchtgeschwindigkeit.",
      title: "Gravitation",
    },
    en: {
      description: "Calculate gravity, satellite orbits and escape velocity.",
      title: "Gravitation",
    },
    id: {
      description: "Hitung gravitasi, orbit satelit, dan kecepatan lepas.",
      title: "Gravitasi",
    },
    ms: {
      description: "Kira daya graviti, orbit satelit dan halaju lepas.",
      title: "Kegravitian",
    },
  },
});
