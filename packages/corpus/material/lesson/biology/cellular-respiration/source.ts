import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonBiologyCellularRespirationMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/biology/cellular-respiration",
  domain: "biology",
  key: "lesson.biology.cellular-respiration",
  kind: "lesson",
  routeSlugs: {
    de: "zellatmung",
    en: "cellular-respiration",
    id: "respirasi-sel",
    ms: "respirasi-sel",
  },
  sections: [
    {
      evidenceUrls: [
        "https://openstax.org/books/biology-2e/pages/7-1-energy-in-living-systems",
        "https://openstax.org/books/biology-2e/pages/7-2-glycolysis",
        "https://openstax.org/books/biology-2e/pages/7-4-oxidative-phosphorylation",
        "https://openstax.org/books/biology-2e/pages/7-5-metabolism-without-oxygen",
        "https://openstax.org/books/concepts-biology/pages/4-2-glycolysis",
        "https://openstax.org/books/anatomy-and-physiology-2e/pages/10-3-muscle-fiber-contraction-and-relaxation",
        "https://www.ncbi.nlm.nih.gov/books/NBK26882/",
      ],
      routeSlugs: {
        de: "zellatmung-und-gaerung",
        en: "aerobic-respiration-and-fermentation",
        id: "respirasi-aerob-dan-fermentasi",
        ms: "respirasi-aerob-dan-fermentasi",
      },
      slug: "aerobic-fermentation",
    },
  ],
  slug: "cellular-respiration",
  translations: {
    de: {
      description: "Vergleiche Zellatmung, Gärung und Sauerstoffschuld.",
      title: "Zellatmung",
    },
    en: {
      description: "Compare respiration, fermentation and oxygen debt.",
      title: "Cellular Respiration",
    },
    id: {
      description: "Bandingkan respirasi, fermentasi, dan utang oksigen.",
      title: "Respirasi Sel",
    },
    ms: {
      description: "Bandingkan respirasi, fermentasi dan hutang oksigen.",
      title: "Respirasi Sel",
    },
  },
});
