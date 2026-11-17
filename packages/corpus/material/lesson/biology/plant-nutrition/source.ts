import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonBiologyPlantNutritionMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/biology/plant-nutrition",
  domain: "biology",
  key: "lesson.biology.plant-nutrition",
  kind: "lesson",
  routeSlugs: {
    de: "ernaehrung-der-pflanzen",
    en: "nutrition-in-plants",
    id: "nutrisi-pada-tumbuhan",
    ms: "nutrisi-dalam-tumbuhan",
  },
  sections: [
    {
      evidenceUrls: [
        "https://openstax.org/books/biology-2e/pages/31-1-nutritional-requirements-of-plants",
        "https://openstax.org/books/biology-2e/pages/31-2-the-soil",
        "https://openstax.org/books/biology-2e/pages/31-3-nutritional-adaptations-of-plants",
        "https://openstax.org/books/biology-2e/pages/30-3-roots",
        "https://openstax.org/books/biology-2e/pages/5-3-active-transport",
        "https://openstax.org/books/chemistry-2e/pages/11-4-colligative-properties",
      ],
      routeSlugs: {
        de: "makro-und-mikronaehrstoffe",
        en: "macronutrients-and-micronutrients",
        id: "unsur-hara-makro-dan-mikro",
        ms: "makronutrien-dan-mikronutrien",
      },
      slug: "mineral-nutrients",
    },
  ],
  slug: "plant-nutrition",
  translations: {
    de: {
      description: "Erkenne Nährstoffmangel und die Aufnahme durch Wurzeln.",
      title: "Ernährung der Pflanzen",
    },
    en: {
      description: "Spot nutrient deficiencies and explain uptake by roots.",
      title: "Nutrition in Plants",
    },
    id: {
      description: "Kenali kekurangan unsur hara dan cara akar menyerapnya.",
      title: "Nutrisi pada Tumbuhan",
    },
    ms: {
      description: "Kenali kekurangan nutrien dan cara akar menyerapnya.",
      title: "Nutrisi dalam Tumbuhan",
    },
  },
});
