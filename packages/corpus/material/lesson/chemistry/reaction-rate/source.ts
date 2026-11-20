import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/chemistry/reaction-rate",
  domain: "chemistry",
  key: "lesson.chemistry.reaction-rate",
  kind: "lesson",
  routeSlugs: {
    en: "rate-of-reaction",
    id: "laju-reaksi",
    de: "reaktionsgeschwindigkeit",
    ms: "kadar-tindak-balas",
  },
  sections: ["rate-factors"],
  slug: "reaction-rate",
  translations: {
    en: {
      description: "Measure how fast reactions go, and explain why.",
      title: "Rate of Reaction",
    },
    id: {
      description: "Ukur seberapa cepat reaksi berjalan dan alasannya.",
      title: "Laju Reaksi",
    },
    de: {
      description: "Miss, wie schnell Stoffe reagieren, und warum.",
      title: "Reaktionsgeschwindigkeit",
    },
    ms: {
      description: "Ukur kelajuan tindak balas dan terangkan sebabnya.",
      title: "Kadar Tindak Balas",
    },
  },
};

export default lesson;
