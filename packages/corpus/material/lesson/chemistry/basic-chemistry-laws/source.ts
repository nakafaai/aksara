import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonChemistryBasicChemistryLawsMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/chemistry/basic-chemistry-laws",
  domain: "chemistry",
  key: "lesson.chemistry.basic-chemistry-laws",
  kind: "lesson",
  routeSlugs: { en: "basic-chemistry-laws", id: "hukum-dasar-kimia" },
  sections: [
    {
      routeSlugs: {
        en: "chemical-reaction-characteristics",
        id: "ciri-ciri-reaksi-kimia",
      },
      slug: "chemical-reaction-characteristics",
    },
    {
      routeSlugs: {
        en: "chemistry-law-applications",
        id: "aplikasi-hukum-kimia",
      },
      slug: "chemistry-law-applications",
    },
    {
      routeSlugs: {
        en: "combining-volumes-law",
        id: "hukum-perbandingan-volume",
      },
      slug: "combining-volumes-law",
    },
    {
      routeSlugs: {
        en: "constant-composition-law",
        id: "hukum-perbandingan-tetap",
      },
      slug: "constant-composition-law",
    },
    {
      routeSlugs: { en: "mass-conservation-law", id: "hukum-kekekalan-massa" },
      slug: "mass-conservation-law",
    },
    {
      routeSlugs: {
        en: "multiple-proportions-law",
        id: "hukum-perbandingan-berganda",
      },
      slug: "multiple-proportions-law",
    },
    {
      routeSlugs: { en: "types-chemical-reaction", id: "jenis-reaksi-kimia" },
      slug: "types-chemical-reaction",
    },
    {
      routeSlugs: {
        en: "writing-chemical-reactions",
        id: "cara-menuliskan-reaksi-kimia",
      },
      slug: "writing-chemical-reactions",
    },
  ],
  slug: "basic-chemistry-laws",
  translations: {
    en: {
      description: "Spot chemical changes from observable evidence.",
      title: "Basic Laws of Chemistry",
    },
    id: {
      description: "Kenali perubahan kimia dari bukti yang terlihat.",
      title: "Hukum Dasar Kimia",
    },
  },
});
