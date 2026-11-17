import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonPhysicsNuclearPhysicsMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/physics/nuclear-physics",
  domain: "physics",
  key: "lesson.physics.nuclear-physics",
  kind: "lesson",
  routeSlugs: {
    de: "kernphysik",
    en: "nuclear-physics",
    id: "fisika-inti",
    ms: "fizik-nuklear",
  },
  sections: [
    {
      evidenceUrls: [
        "https://openstax.org/books/college-physics-2e/pages/31-1-nuclear-radioactivity",
        "https://openstax.org/books/college-physics-2e/pages/31-4-nuclear-decay-and-conservation-laws",
        "https://openstax.org/books/college-physics-2e/pages/31-5-half-life-and-activity",
        "https://openstax.org/books/college-physics-2e/pages/31-6-binding-energy",
        "https://openstax.org/books/college-physics-2e/pages/32-5-fusion",
        "https://openstax.org/books/college-physics-2e/pages/32-6-fission",
      ],
      routeSlugs: {
        de: "radioaktiver-zerfall-und-kernenergie",
        en: "radioactive-decay-and-nuclear-energy",
        id: "peluruhan-radioaktif-dan-energi-nuklir",
        ms: "reputan-radioaktif-dan-tenaga-nuklear",
      },
      slug: "radioactive-decay",
    },
  ],
  slug: "nuclear-physics",
  translations: {
    de: {
      description: "Stell Zerfallsgleichungen auf und berechne Kernenergie.",
      title: "Kernphysik",
    },
    en: {
      description: "Write decay equations and calculate nuclear energy.",
      title: "Nuclear Physics",
    },
    id: {
      description: "Tulis persamaan peluruhan dan hitung energi nuklir.",
      title: "Fisika Inti",
    },
    ms: {
      description: "Tulis persamaan reputan dan kira tenaga nuklear.",
      title: "Fizik Nuklear",
    },
  },
});
