import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/biology/cellular-respiration",
  domain: "biology",
  key: "lesson.biology.cellular-respiration",
  kind: "lesson",
  routeSlugs: {
    en: "cellular-respiration",
    id: "respirasi-sel",
    de: "zellatmung",
    ms: "respirasi-sel",
  },
  sections: ["aerobic-fermentation"],
  slug: "cellular-respiration",
  translations: {
    en: {
      description: "Compare respiration, fermentation and oxygen debt.",
      title: "Cellular Respiration",
    },
    id: {
      description: "Bandingkan respirasi, fermentasi, dan utang oksigen.",
      title: "Respirasi Sel",
    },
    de: {
      description: "Vergleiche Zellatmung, Gärung und Sauerstoffschuld.",
      title: "Zellatmung",
    },
    ms: {
      description: "Bandingkan respirasi, fermentasi dan hutang oksigen.",
      title: "Respirasi Sel",
    },
  },
};

export default lesson;
