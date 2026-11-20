import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/biology/support-movement",
  domain: "biology",
  key: "lesson.biology.support-movement",
  kind: "lesson",
  routeSlugs: {
    de: "stuetze-und-bewegung",
    en: "support-and-movement",
    id: "sistem-gerak",
    ms: "sokongan-dan-pergerakan",
  },
  sections: ["skeleton-muscle"],
  slug: "support-movement",
  translations: {
    de: {
      description: "Erkläre Skelett, Gelenke und Muskelhebel.",
      title: "Stütze und Bewegung",
    },
    en: {
      description: "Explain the skeleton, joints and muscle levers.",
      title: "Support and Movement",
    },
    id: {
      description: "Jelaskan rangka, sendi, dan tuas otot.",
      title: "Sistem Gerak",
    },
    ms: {
      description: "Terangkan rangka, sendi dan tuas otot.",
      title: "Sokongan dan Pergerakan",
    },
  },
};

export default lesson;
