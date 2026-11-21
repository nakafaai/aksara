import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/mathematics/probability",
  domain: "mathematics",
  key: "lesson.mathematics.probability",
  kind: "lesson",
  routeSlugs: {
    en: "probability",
    id: "peluang",
    de: "wahrscheinlichkeit",
    ms: "kebarangkalian",
  },
  sections: [
    "addition-rule",
    "independent-dependent-events",
    "probability-distribution",
    "two-events-mutually-exclusive",
    "two-events-not-mutually-exclusive",
  ],
  slug: "probability",
  translations: {
    en: {
      description: "Use addition rules for overlapping and separate events.",
      title: "Probability",
    },
    id: {
      description: "Gunakan aturan penjumlahan untuk kejadian beririsan.",
      title: "Peluang",
    },
    de: {
      description: "Nutze Additionsregeln für überlappende Ereignisse.",
      title: "Wahrscheinlichkeit",
    },
    ms: {
      description: "Kira kebarangkalian peristiwa daripada ruang sampelnya.",
      title: "Kebarangkalian",
    },
  },
};

export default lesson;
