import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonPhysicsMeasurementMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/physics/measurement",
  domain: "physics",
  key: "lesson.physics.measurement",
  kind: "lesson",
  routeSlugs: { en: "measurement", id: "pengukuran-dalam-kerja-ilmiah" },
  sections: [
    {
      routeSlugs: { en: "dimension", id: "dimensi" },
      slug: "dimension",
      translations: {
        en: {
          title: "Dimensions",
        },
        id: {
          title: "Dimensi",
        },
      },
    },
    {
      routeSlugs: { en: "notation", id: "notasi-ilmiah" },
      slug: "notation",
      translations: {
        en: {
          title: "Scientific Notation",
        },
        id: {
          title: "Notasi Ilmiah",
        },
      },
    },
    {
      routeSlugs: { en: "quantity", id: "besaran" },
      slug: "quantity",
      translations: {
        en: {
          title: "Physical Quantities",
        },
        id: {
          title: "Besaran",
        },
      },
    },
    {
      routeSlugs: { en: "significant-figures", id: "aturan-angka-penting" },
      slug: "significant-figures",
      translations: {
        en: {
          title: "Significant Figures Rules",
        },
        id: {
          title: "Aturan Angka Penting",
        },
      },
    },
    {
      routeSlugs: { en: "tools", id: "macam-macam-alat-ukur" },
      slug: "tools",
      translations: {
        en: {
          title: "Types of Measurement Tools",
        },
        id: {
          title: "Macam-macam Alat Ukur",
        },
      },
    },
    {
      routeSlugs: {
        en: "uncertainty",
        id: "nilai-ketidakpastian-pada-pengukuran-berulang",
      },
      slug: "uncertainty",
      translations: {
        en: {
          title: "Uncertainty in Repeated Measurements",
        },
        id: {
          title: "Nilai Ketidakpastian pada Pengukuran Berulang",
        },
      },
    },
    {
      routeSlugs: { en: "unit", id: "sistem-satuan" },
      slug: "unit",
      translations: {
        en: {
          title: "Unit Systems",
        },
        id: {
          title: "Sistem Satuan",
        },
      },
    },
  ],
  slug: "measurement",
  translations: {
    en: {
      description: "Use dimensions to check quantities and formulas.",
      title: "Measurement in Scientific Work",
    },
    id: {
      description: "Gunakan dimensi untuk mengecek besaran dan rumus.",
      title: "Pengukuran dalam Kerja Ilmiah",
    },
  },
});
