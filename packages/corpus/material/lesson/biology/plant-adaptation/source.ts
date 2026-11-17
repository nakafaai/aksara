import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonBiologyPlantAdaptationMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/biology/plant-adaptation",
  domain: "biology",
  key: "lesson.biology.plant-adaptation",
  kind: "lesson",
  routeSlugs: {
    de: "angepasstheit-der-pflanzen",
    en: "plant-adaptations",
    id: "adaptasi-tumbuhan",
    ms: "penyesuaian-tumbuhan",
  },
  sections: [
    {
      evidenceUrls: [
        "https://openstax.org/books/biology-2e/pages/30-4-leaves",
        "https://openstax.org/books/biology-2e/pages/30-5-transport-of-water-and-solutes-in-plants",
        "https://openstax.org/books/biology-2e/pages/30-3-roots",
        "https://openstax.org/books/biology-2e/pages/8-3-using-light-energy-to-make-organic-molecules",
        "https://openstax.org/books/biology-2e/pages/44-4-aquatic-biomes",
        "https://www.floridamuseum.ufl.edu/southflorida/habitats/mangroves/adaptations",
      ],
      routeSlugs: {
        de: "verschiedene-lebensraeume",
        en: "different-habitats",
        id: "habitat-berbeda",
        ms: "habitat-berlainan",
      },
      slug: "habitats",
    },
  ],
  slug: "plant-adaptation",
  translations: {
    de: {
      description: "Vergleiche Pflanzen in Wasser, Salzsumpf und Wüste.",
      title: "Angepasstheit der Pflanzen",
    },
    en: {
      description: "Compare plants of water, salty swamps and deserts.",
      title: "Plant Adaptations",
    },
    id: {
      description: "Bandingkan tumbuhan air, hutan bakau, dan gurun.",
      title: "Adaptasi Tumbuhan",
    },
    ms: {
      description: "Bandingkan tumbuhan air, paya bakau dan gurun.",
      title: "Penyesuaian Tumbuhan",
    },
  },
});
