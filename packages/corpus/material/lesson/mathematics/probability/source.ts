import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsProbabilityMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/mathematics/probability",
  domain: "mathematics",
  key: "lesson.mathematics.probability",
  kind: "lesson",
  routeSlugs: {
    de: "wahrscheinlichkeit",
    en: "probability",
    id: "peluang",
    ms: "kebarangkalian",
  },
  sections: [
    {
      routeSlugs: {
        de: "additionssatz",
        en: "addition-rule",
        id: "aturan-penjumlahan",
        ms: "petua-tambah",
      },
      slug: "addition-rule",
    },
    {
      routeSlugs: {
        de: "wahrscheinlichkeitsverteilung",
        en: "probability-distribution",
        id: "distribusi-peluang",
        ms: "taburan-kebarangkalian",
      },
      slug: "probability-distribution",
    },
    {
      routeSlugs: {
        de: "zwei-unvereinbare-ereignisse",
        en: "two-events-mutually-exclusive",
        id: "dua-kejadian-a-dan-b-saling-lepas",
        ms: "peristiwa-saling-eksklusif",
      },
      slug: "two-events-mutually-exclusive",
    },
    {
      routeSlugs: {
        de: "zwei-vereinbare-ereignisse",
        en: "two-events-not-mutually-exclusive",
        id: "dua-kejadian-a-dan-b-tidak-saling-lepas",
        ms: "peristiwa-tidak-saling-eksklusif",
      },
      slug: "two-events-not-mutually-exclusive",
    },
  ],
  slug: "probability",
  translations: {
    de: {
      description: "Nutze Additionsregeln für überlappende Ereignisse.",
      title: "Wahrscheinlichkeit",
    },
    en: {
      description: "Use addition rules for overlapping and separate events.",
      title: "Probability",
    },
    id: {
      description: "Gunakan aturan penjumlahan untuk kejadian beririsan.",
      title: "Peluang",
    },
    ms: {
      description: "Kira kebarangkalian peristiwa daripada ruang sampelnya.",
      title: "Kebarangkalian",
    },
  },
});
