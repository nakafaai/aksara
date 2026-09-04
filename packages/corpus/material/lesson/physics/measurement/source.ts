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
      evidenceUrls: [
        "https://openstax.org/books/university-physics-volume-1/pages/1-4-dimensional-analysis",
      ],
      routeSlugs: { de: "dimension", en: "dimension", id: "dimensi" },
      slug: "dimension",
    },
    {
      evidenceUrls: [
        "https://www.nist.gov/pml/special-publication-811/nist-guide-si-chapter-7-rules-and-style-conventions-expressing-values",
        "https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors",
        "https://openstax.org/books/university-physics-volume-1/pages/1-6-significant-figures",
      ],
      routeSlugs: { de: "schreibweise", en: "notation", id: "notasi-ilmiah" },
      slug: "notation",
    },
    {
      evidenceUrls: ["https://jcgm.bipm.org/vim/en/1.19.html"],
      routeSlugs: {
        de: "physikalische-groesse",
        en: "quantity",
        id: "besaran",
      },
      slug: "quantity",
    },
    {
      evidenceUrls: [
        "https://www.nist.gov/document/2023-nist-hb130-uniform-packaging-and-labeling-regulation",
        "https://openstax.org/books/university-physics-volume-1/pages/1-6-significant-figures",
      ],
      routeSlugs: {
        de: "signifikante-stellen",
        en: "significant-figures",
        id: "aturan-angka-penting",
      },
      slug: "significant-figures",
    },
    {
      evidenceUrls: [
        "https://jcgm.bipm.org/vim/en/2.1.html",
        "https://jcgm.bipm.org/vim/en/1.19.html",
      ],
      routeSlugs: {
        de: "messgeraete",
        en: "tools",
        id: "macam-macam-alat-ukur",
      },
      slug: "tools",
    },
    {
      evidenceUrls: [
        "https://www.nist.gov/pml/nist-technical-note-1297/nist-tn-1297-3-type-evaluation-standard-uncertainty",
        "https://www.bipm.org/documents/20126/2071204/JCGM_100_2008_E.pdf",
      ],
      routeSlugs: {
        de: "messunsicherheit",
        en: "uncertainty",
        id: "nilai-ketidakpastian-pada-pengukuran-berulang",
      },
      slug: "uncertainty",
    },
    {
      evidenceUrls: [
        "https://www.bipm.org/en/measurement-units",
        "https://www.bipm.org/en/measurement-units/si-prefixes",
      ],
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
