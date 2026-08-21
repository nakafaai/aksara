import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsVectorOperationsMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/mathematics/vector-operations",
  domain: "mathematics",
  key: "lesson.mathematics.vector-operations",
  kind: "lesson",
  routeSlugs: {
    de: "vektoren-und-operationen",
    en: "vector-operations",
    id: "vektor-dan-operasinya",
  },
  sections: [
    {
      routeSlugs: {
        de: "spalten-und-zeilenvektoren",
        en: "column-row-vector",
        id: "vektor-kolom-dan-vektor-baris",
      },
      slug: "column-row-vector",
    },
    {
      routeSlugs: {
        de: "aequivalente-vektoren",
        en: "equivalent-vector",
        id: "vektor-ekuivalen",
      },
      slug: "equivalent-vector",
    },
    {
      routeSlugs: {
        de: "gegenvektoren",
        en: "opposite-vector",
        id: "vektor-berkebalikan",
      },
      slug: "opposite-vector",
    },
    {
      routeSlugs: {
        de: "ortsvektoren",
        en: "position-vector",
        id: "vektor-posisi",
      },
      slug: "position-vector",
    },
    {
      routeSlugs: {
        de: "skalare-multiplikation",
        en: "scalar-multiplication",
        id: "perkalian-skalar-vektor",
      },
      slug: "scalar-multiplication",
    },
    {
      routeSlugs: {
        de: "dreidimensionale-vektoren",
        en: "three-dimensional-vector",
        id: "vektor-tiga-dimensi",
      },
      slug: "three-dimensional-vector",
    },
    {
      routeSlugs: {
        de: "zweidimensionale-vektoren",
        en: "two-dimensional-vector",
        id: "vektor-dua-dimensi",
      },
      slug: "two-dimensional-vector",
    },
    {
      routeSlugs: {
        de: "einheitsvektoren",
        en: "unit-vector",
        id: "vektor-satuan-dari-suatu-vektor",
      },
      slug: "unit-vector",
    },
    {
      routeSlugs: {
        de: "vektoraddition",
        en: "vector-addition",
        id: "penjumlahan-vektor",
      },
      slug: "vector-addition",
    },
    {
      routeSlugs: {
        de: "vektorkomponenten",
        en: "vector-components",
        id: "komponen-vektor",
      },
      slug: "vector-components",
    },
    {
      routeSlugs: {
        de: "grundidee-von-vektoren",
        en: "vector-concept",
        id: "konsep-vektor",
      },
      slug: "vector-concept",
    },
    {
      routeSlugs: {
        de: "vektoren-im-koordinatensystem",
        en: "vector-coordinate-system",
        id: "vektor-dan-sistem-koordinat",
      },
      slug: "vector-coordinate-system",
    },
    {
      routeSlugs: {
        de: "vektorsubtraktion",
        en: "vector-subtraction",
        id: "pengurangan-vektor",
      },
      slug: "vector-subtraction",
    },
    {
      routeSlugs: {
        de: "vektortypen",
        en: "vector-types",
        id: "jenis-jenis-vektor",
      },
      slug: "vector-types",
    },
    {
      routeSlugs: { de: "nullvektor", en: "zero-vector", id: "vektor-nol" },
      slug: "zero-vector",
    },
  ],
  slug: "vector-operations",
  translations: {
    de: {
      description: "Arbeite mit Vektoren, Koordinaten und Einheitsvektoren.",
      title: "Vektoren und Operationen",
    },
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
