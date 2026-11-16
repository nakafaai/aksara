import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonChemistryReactionRateMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/chemistry/reaction-rate",
  domain: "chemistry",
  key: "lesson.chemistry.reaction-rate",
  kind: "lesson",
  routeSlugs: {
    de: "reaktionsgeschwindigkeit",
    en: "rate-of-reaction",
    id: "laju-reaksi",
    ms: "kadar-tindak-balas",
  },
  sections: [
    {
      evidenceUrls: [
        "https://openstax.org/books/chemistry-2e/pages/12-1-chemical-reaction-rates",
        "https://openstax.org/books/chemistry-2e/pages/12-2-factors-affecting-reaction-rates",
        "https://openstax.org/books/chemistry-2e/pages/12-5-collision-theory",
        "https://openstax.org/books/chemistry-2e/pages/12-7-catalysis",
      ],
      routeSlugs: {
        de: "einflussfaktoren-und-stosstheorie",
        en: "rate-factors-and-collision-theory",
        id: "faktor-laju-dan-teori-tumbukan",
        ms: "faktor-kadar-dan-teori-perlanggaran",
      },
      slug: "rate-factors",
    },
  ],
  slug: "reaction-rate",
  translations: {
    de: {
      description: "Miss, wie schnell Stoffe reagieren, und warum.",
      title: "Reaktionsgeschwindigkeit",
    },
    en: {
      description: "Measure how fast reactions go, and explain why.",
      title: "Rate of Reaction",
    },
    id: {
      description: "Ukur seberapa cepat reaksi berjalan dan alasannya.",
      title: "Laju Reaksi",
    },
    ms: {
      description: "Ukur kelajuan tindak balas dan terangkan sebabnya.",
      title: "Kadar Tindak Balas",
    },
  },
});
