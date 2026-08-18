import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsVectorOperationsMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/mathematics/vector-operations",
  domain: "mathematics",
  key: "lesson.mathematics.vector-operations",
  kind: "lesson",
  routeSlugs: { en: "vector-operations", id: "vektor-dan-operasinya" },
  sections: [
    {
      routeSlugs: {
        en: "column-row-vector",
        id: "vektor-kolom-dan-vektor-baris",
      },
      slug: "column-row-vector",
    },
    {
      routeSlugs: { en: "equivalent-vector", id: "vektor-ekuivalen" },
      slug: "equivalent-vector",
    },
    {
      routeSlugs: { en: "opposite-vector", id: "vektor-berkebalikan" },
      slug: "opposite-vector",
    },
    {
      routeSlugs: { en: "position-vector", id: "vektor-posisi" },
      slug: "position-vector",
    },
    {
      routeSlugs: {
        en: "scalar-multiplication",
        id: "perkalian-skalar-vektor",
      },
      slug: "scalar-multiplication",
    },
    {
      routeSlugs: { en: "three-dimensional-vector", id: "vektor-tiga-dimensi" },
      slug: "three-dimensional-vector",
    },
    {
      routeSlugs: { en: "two-dimensional-vector", id: "vektor-dua-dimensi" },
      slug: "two-dimensional-vector",
    },
    {
      routeSlugs: { en: "unit-vector", id: "vektor-satuan-dari-suatu-vektor" },
      slug: "unit-vector",
    },
    {
      routeSlugs: { en: "vector-addition", id: "penjumlahan-vektor" },
      slug: "vector-addition",
    },
    {
      routeSlugs: { en: "vector-components", id: "komponen-vektor" },
      slug: "vector-components",
    },
    {
      routeSlugs: { en: "vector-concept", id: "konsep-vektor" },
      slug: "vector-concept",
    },
    {
      routeSlugs: {
        en: "vector-coordinate-system",
        id: "vektor-dan-sistem-koordinat",
      },
      slug: "vector-coordinate-system",
    },
    {
      routeSlugs: { en: "vector-subtraction", id: "pengurangan-vektor" },
      slug: "vector-subtraction",
    },
    {
      routeSlugs: { en: "vector-types", id: "jenis-jenis-vektor" },
      slug: "vector-types",
    },
    {
      routeSlugs: { en: "zero-vector", id: "vektor-nol" },
      slug: "zero-vector",
    },
  ],
  slug: "vector-operations",
  translations: {
    en: {
      description: "Work with vector notation, transpose, and unit vectors.",
      title: "Vector and Operations",
    },
    id: {
      description: "Olah notasi vektor, transpos, dan vektor satuan.",
      title: "Vektor dan Operasinya",
    },
  },
});
