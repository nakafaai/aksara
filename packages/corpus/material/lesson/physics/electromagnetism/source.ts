import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonPhysicsElectromagnetismMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/physics/electromagnetism",
  domain: "physics",
  key: "lesson.physics.electromagnetism",
  kind: "lesson",
  routeSlugs: {
    de: "elektromagnetismus",
    en: "electromagnetism",
    id: "elektromagnetisme",
    ms: "keelektromagnetan",
  },
  sections: [
    {
      evidenceUrls: [
        "https://openstax.org/books/college-physics-2e/pages/22-7-magnetic-force-on-a-current-carrying-conductor",
        "https://openstax.org/books/college-physics-2e/pages/22-8-torque-on-a-current-loop-motors-and-meters",
        "https://openstax.org/books/college-physics-2e/pages/23-1-induced-emf-and-magnetic-flux",
        "https://openstax.org/books/college-physics-2e/pages/23-2-faradays-law-of-induction-lenzs-law",
        "https://openstax.org/books/college-physics-2e/pages/23-5-electric-generators",
        "https://openstax.org/books/college-physics-2e/pages/23-7-transformers",
      ],
      routeSlugs: {
        de: "kraft-induktion-und-transformator",
        en: "force-induction-and-transformers",
        id: "gaya-induksi-dan-transformator",
        ms: "daya-aruhan-dan-transformer",
      },
      slug: "induction-transformer",
    },
  ],
  slug: "electromagnetism",
  translations: {
    de: {
      description: "Erklär Motor, Generator und Transformator.",
      title: "Elektromagnetismus",
    },
    en: {
      description: "Explain motors, generators and transformers.",
      title: "Electromagnetism",
    },
    id: {
      description: "Jelaskan motor, generator, dan transformator.",
      title: "Elektromagnetisme",
    },
    ms: {
      description: "Terangkan motor, penjana dan transformer.",
      title: "Keelektromagnetan",
    },
  },
});
