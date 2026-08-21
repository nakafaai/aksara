import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonChemistryBasicChemistryLawsMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/chemistry/basic-chemistry-laws",
  domain: "chemistry",
  key: "lesson.chemistry.basic-chemistry-laws",
  kind: "lesson",
  routeSlugs: {
    de: "grundgesetze-der-chemie",
    en: "basic-chemistry-laws",
    id: "hukum-dasar-kimia",
  },
  sections: [
    {
      routeSlugs: {
        de: "merkmale-chemischer-reaktionen",
        en: "chemical-reaction-characteristics",
        id: "ciri-ciri-reaksi-kimia",
      },
      slug: "chemical-reaction-characteristics",
    },
    {
      routeSlugs: {
        de: "anwendungen-chemischer-gesetze",
        en: "chemistry-law-applications",
        id: "aplikasi-hukum-kimia",
      },
      slug: "chemistry-law-applications",
    },
    {
      routeSlugs: {
        de: "gesetz-der-gasvolumina",
        en: "combining-volumes-law",
        id: "hukum-perbandingan-volume",
      },
      slug: "combining-volumes-law",
    },
    {
      routeSlugs: {
        de: "gesetz-der-konstanten-proportionen",
        en: "constant-composition-law",
        id: "hukum-perbandingan-tetap",
      },
      slug: "constant-composition-law",
    },
    {
      routeSlugs: {
        de: "gesetz-der-massenerhaltung",
        en: "mass-conservation-law",
        id: "hukum-kekekalan-massa",
      },
      slug: "mass-conservation-law",
    },
    {
      routeSlugs: {
        de: "gesetz-der-multiplen-proportionen",
        en: "multiple-proportions-law",
        id: "hukum-perbandingan-berganda",
      },
      slug: "multiple-proportions-law",
    },
    {
      routeSlugs: {
        de: "arten-chemischer-reaktionen",
        en: "types-chemical-reaction",
        id: "jenis-reaksi-kimia",
      },
      slug: "types-chemical-reaction",
    },
    {
      routeSlugs: {
        de: "chemische-reaktionen-formulieren",
        en: "writing-chemical-reactions",
        id: "cara-menuliskan-reaksi-kimia",
      },
      slug: "writing-chemical-reactions",
    },
  ],
  slug: "basic-chemistry-laws",
  translations: {
    de: {
      description: "Erkenne chemische Veränderungen an Beobachtungen.",
      title: "Grundgesetze der Chemie",
    },
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
