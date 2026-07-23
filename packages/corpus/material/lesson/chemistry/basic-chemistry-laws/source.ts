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
      translations: {
        en: {
          title: "Characteristics of Chemical Reactions",
        },
        id: {
          title: "Ciri-Ciri Reaksi Kimia",
        },
      },
    },
    {
      routeSlugs: {
        en: "chemistry-law-applications",
        id: "aplikasi-hukum-kimia",
      },
      slug: "chemistry-law-applications",
      translations: {
        en: {
          title: "Law Applications",
        },
        id: {
          title: "Aplikasi Hukum Kimia",
        },
      },
    },
    {
      routeSlugs: {
        en: "combining-volumes-law",
        id: "hukum-perbandingan-volume",
      },
      slug: "combining-volumes-law",
      translations: {
        en: {
          title: "Combining Volumes",
        },
        id: {
          title: "Hukum Perbandingan Volume",
        },
      },
    },
    {
      routeSlugs: {
        en: "constant-composition-law",
        id: "hukum-perbandingan-tetap",
      },
      slug: "constant-composition-law",
      translations: {
        en: {
          title: "Constant Composition",
        },
        id: {
          title: "Hukum Perbandingan Tetap",
        },
      },
    },
    {
      routeSlugs: { en: "mass-conservation-law", id: "hukum-kekekalan-massa" },
      slug: "mass-conservation-law",
      translations: {
        en: {
          title: "Mass Conservation",
        },
        id: {
          title: "Hukum Kekekalan Massa",
        },
      },
    },
    {
      routeSlugs: {
        en: "multiple-proportions-law",
        id: "hukum-perbandingan-berganda",
      },
      slug: "multiple-proportions-law",
      translations: {
        en: {
          title: "Multiple Proportions",
        },
        id: {
          title: "Hukum Perbandingan Berganda",
        },
      },
    },
    {
      routeSlugs: { en: "types-chemical-reaction", id: "jenis-reaksi-kimia" },
      slug: "types-chemical-reaction",
      translations: {
        en: {
          title: "Types of Chemical Reactions",
        },
        id: {
          title: "Jenis Reaksi Kimia",
        },
      },
    },
    {
      routeSlugs: {
        en: "writing-chemical-reactions",
        id: "cara-menuliskan-reaksi-kimia",
      },
      slug: "writing-chemical-reactions",
      translations: {
        en: {
          title: "Writing Chemical Reactions",
        },
        id: {
          title: "Cara Menuliskan Reaksi Kimia",
        },
      },
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
