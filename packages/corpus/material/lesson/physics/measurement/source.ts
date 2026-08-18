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
    },
    {
      routeSlugs: { en: "notation", id: "notasi-ilmiah" },
      slug: "notation",
    },
    {
      routeSlugs: { en: "quantity", id: "besaran" },
      slug: "quantity",
    },
    {
      routeSlugs: { en: "significant-figures", id: "aturan-angka-penting" },
      slug: "significant-figures",
    },
    {
      routeSlugs: { en: "tools", id: "macam-macam-alat-ukur" },
      slug: "tools",
    },
    {
      routeSlugs: {
        en: "uncertainty",
        id: "nilai-ketidakpastian-pada-pengukuran-berulang",
      },
      slug: "uncertainty",
    },
    {
      routeSlugs: { en: "unit", id: "sistem-satuan" },
      slug: "unit",
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
