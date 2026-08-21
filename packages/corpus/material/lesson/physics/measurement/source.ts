import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonPhysicsMeasurementMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/physics/measurement",
  domain: "physics",
  key: "lesson.physics.measurement",
  kind: "lesson",
  routeSlugs: {
    de: "messen-im-naturwissenschaftlichen-arbeiten",
    en: "measurement",
    id: "pengukuran-dalam-kerja-ilmiah",
  },
  sections: [
    {
      routeSlugs: { de: "dimension", en: "dimension", id: "dimensi" },
      slug: "dimension",
    },
    {
      routeSlugs: { de: "schreibweise", en: "notation", id: "notasi-ilmiah" },
      slug: "notation",
    },
    {
      routeSlugs: {
        de: "physikalische-groesse",
        en: "quantity",
        id: "besaran",
      },
      slug: "quantity",
    },
    {
      routeSlugs: {
        de: "signifikante-stellen",
        en: "significant-figures",
        id: "aturan-angka-penting",
      },
      slug: "significant-figures",
    },
    {
      routeSlugs: {
        de: "messgeraete",
        en: "tools",
        id: "macam-macam-alat-ukur",
      },
      slug: "tools",
    },
    {
      routeSlugs: {
        de: "messunsicherheit",
        en: "uncertainty",
        id: "nilai-ketidakpastian-pada-pengukuran-berulang",
      },
      slug: "uncertainty",
    },
    {
      routeSlugs: { de: "einheit", en: "unit", id: "sistem-satuan" },
      slug: "unit",
    },
  ],
  slug: "measurement",
  translations: {
    de: {
      description: "Ordne Messgrößen, Einheiten und Unsicherheiten ein.",
      title: "Messen im naturwissenschaftlichen Arbeiten",
    },
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
