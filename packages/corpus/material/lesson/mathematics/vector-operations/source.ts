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
      translations: {
        en: {
          title: "Column and Row Vectors",
        },
        id: {
          title: "Vektor Kolom dan Vektor Baris",
        },
      },
    },
    {
      routeSlugs: { en: "equivalent-vector", id: "vektor-ekuivalen" },
      slug: "equivalent-vector",
      translations: {
        en: {
          title: "Equivalent Vectors",
        },
        id: {
          title: "Vektor Ekuivalen",
        },
      },
    },
    {
      routeSlugs: { en: "opposite-vector", id: "vektor-berkebalikan" },
      slug: "opposite-vector",
      translations: {
        en: {
          title: "Reciprocal Vector",
        },
        id: {
          title: "Vektor Berkebalikan",
        },
      },
    },
    {
      routeSlugs: { en: "position-vector", id: "vektor-posisi" },
      slug: "position-vector",
      translations: {
        en: {
          title: "Position Vector",
        },
        id: {
          title: "Vektor Posisi",
        },
      },
    },
    {
      routeSlugs: {
        en: "scalar-multiplication",
        id: "perkalian-skalar-vektor",
      },
      slug: "scalar-multiplication",
      translations: {
        en: {
          title: "Scalar Vector Multiplication",
        },
        id: {
          title: "Perkalian Skalar Vektor",
        },
      },
    },
    {
      routeSlugs: { en: "three-dimensional-vector", id: "vektor-tiga-dimensi" },
      slug: "three-dimensional-vector",
      translations: {
        en: {
          title: "Three-Dimensional Vector",
        },
        id: {
          title: "Vektor Tiga Dimensi",
        },
      },
    },
    {
      routeSlugs: { en: "two-dimensional-vector", id: "vektor-dua-dimensi" },
      slug: "two-dimensional-vector",
      translations: {
        en: {
          title: "Two-Dimensional Vector",
        },
        id: {
          title: "Vektor Dua Dimensi",
        },
      },
    },
    {
      routeSlugs: { en: "unit-vector", id: "vektor-satuan-dari-suatu-vektor" },
      slug: "unit-vector",
      translations: {
        en: {
          title: "Unit Vector from a Vector",
        },
        id: {
          title: "Vektor Satuan dari Suatu Vektor",
        },
      },
    },
    {
      routeSlugs: { en: "vector-addition", id: "penjumlahan-vektor" },
      slug: "vector-addition",
      translations: {
        en: {
          title: "Vector Addition",
        },
        id: {
          title: "Penjumlahan Vektor",
        },
      },
    },
    {
      routeSlugs: { en: "vector-components", id: "komponen-vektor" },
      slug: "vector-components",
      translations: {
        en: {
          title: "Vector Components",
        },
        id: {
          title: "Komponen Vektor",
        },
      },
    },
    {
      routeSlugs: { en: "vector-concept", id: "konsep-vektor" },
      slug: "vector-concept",
      translations: {
        en: {
          title: "Vector Concept",
        },
        id: {
          title: "Konsep Vektor",
        },
      },
    },
    {
      routeSlugs: {
        en: "vector-coordinate-system",
        id: "vektor-dan-sistem-koordinat",
      },
      slug: "vector-coordinate-system",
      translations: {
        en: {
          title: "Vectors and Coordinate System",
        },
        id: {
          title: "Vektor dan Sistem Koordinat",
        },
      },
    },
    {
      routeSlugs: { en: "vector-subtraction", id: "pengurangan-vektor" },
      slug: "vector-subtraction",
      translations: {
        en: {
          title: "Vector Subtraction",
        },
        id: {
          title: "Pengurangan Vektor",
        },
      },
    },
    {
      routeSlugs: { en: "vector-types", id: "jenis-jenis-vektor" },
      slug: "vector-types",
      translations: {
        en: {
          title: "Vector Types",
        },
        id: {
          title: "Jenis-jenis Vektor",
        },
      },
    },
    {
      routeSlugs: { en: "zero-vector", id: "vektor-nol" },
      slug: "zero-vector",
      translations: {
        en: {
          title: "Zero Vector",
        },
        id: {
          title: "Vektor Nol",
        },
      },
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
