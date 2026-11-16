import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonPhysicsHeatMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/physics/heat",
  domain: "physics",
  key: "lesson.physics.heat",
  kind: "lesson",
  routeSlugs: {
    de: "waerme",
    en: "heat",
    id: "kalor",
    ms: "haba",
  },
  sections: [
    {
      evidenceUrls: [
        "https://openstax.org/books/college-physics-2e/pages/14-2-temperature-change-and-heat-capacity",
        "https://openstax.org/books/college-physics-2e/pages/14-3-phase-change-and-latent-heat",
        "https://openstax.org/books/college-physics-2e/pages/13-3-the-ideal-gas-law",
        "https://openstax.org/books/college-physics-2e/pages/13-1-temperature",
      ],
      routeSlugs: {
        de: "waermekapazitaet-und-gasgesetze",
        en: "heat-capacity-and-gas-laws",
        id: "kalor-jenis-dan-hukum-gas",
        ms: "muatan-haba-dan-hukum-gas",
      },
      slug: "heat-gas-laws",
    },
  ],
  slug: "heat",
  translations: {
    de: {
      description: "Berechne Wärme, latente Wärme und Gasgesetze.",
      title: "Wärme",
    },
    en: {
      description: "Calculate heat, latent heat and the gas laws.",
      title: "Heat",
    },
    id: {
      description: "Hitung kalor, kalor laten, dan hukum gas.",
      title: "Kalor",
    },
    ms: {
      description: "Kira haba, haba pendam dan hukum gas.",
      title: "Haba",
    },
  },
});
