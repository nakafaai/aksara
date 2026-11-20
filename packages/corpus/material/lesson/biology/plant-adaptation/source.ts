import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
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
  sections: ["habitats"],
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
};

export default lesson;
