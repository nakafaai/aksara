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
    ms: "vektor-dan-operasinya",
  },
  sections: [
    {
      routeSlugs: {
        de: "spalten-und-zeilenvektoren",
        en: "column-row-vector",
        id: "vektor-kolom-dan-vektor-baris",
        ms: "vektor-lajur-dan-vektor-baris",
      },
      slug: "column-row-vector",
    },
    {
      routeSlugs: {
        de: "aequivalente-vektoren",
        en: "equivalent-vector",
        id: "vektor-ekuivalen",
        ms: "vektor-setara",
      },
      slug: "equivalent-vector",
    },
    {
      routeSlugs: {
        de: "gegenvektoren",
        en: "opposite-vector",
        id: "vektor-berkebalikan",
        ms: "vektor-bertentangan",
      },
      slug: "opposite-vector",
    },
    {
      routeSlugs: {
        de: "ortsvektoren",
        en: "position-vector",
        id: "vektor-posisi",
        ms: "vektor-kedudukan",
      },
      slug: "position-vector",
    },
    {
      routeSlugs: {
        de: "skalare-multiplikation",
        en: "scalar-multiplication",
        id: "perkalian-skalar-vektor",
        ms: "pendaraban-vektor-dengan-skalar",
      },
      slug: "scalar-multiplication",
    },
    {
      routeSlugs: {
        de: "dreidimensionale-vektoren",
        en: "three-dimensional-vector",
        id: "vektor-tiga-dimensi",
        ms: "vektor-tiga-dimensi",
      },
      slug: "three-dimensional-vector",
    },
    {
      routeSlugs: {
        de: "zweidimensionale-vektoren",
        en: "two-dimensional-vector",
        id: "vektor-dua-dimensi",
        ms: "vektor-dua-dimensi",
      },
      slug: "two-dimensional-vector",
    },
    {
      routeSlugs: {
        de: "einheitsvektoren",
        en: "unit-vector",
        id: "vektor-satuan-dari-suatu-vektor",
        ms: "vektor-unit",
      },
      slug: "unit-vector",
    },
    {
      routeSlugs: {
        de: "vektoraddition",
        en: "vector-addition",
        id: "penjumlahan-vektor",
        ms: "penambahan-vektor",
      },
      slug: "vector-addition",
    },
    {
      routeSlugs: {
        de: "vektorkomponenten",
        en: "vector-components",
        id: "komponen-vektor",
        ms: "komponen-vektor",
      },
      slug: "vector-components",
    },
    {
      routeSlugs: {
        de: "grundidee-von-vektoren",
        en: "vector-concept",
        id: "konsep-vektor",
        ms: "konsep-vektor",
      },
      slug: "vector-concept",
    },
    {
      routeSlugs: {
        de: "vektoren-im-koordinatensystem",
        en: "vector-coordinate-system",
        id: "vektor-dan-sistem-koordinat",
        ms: "vektor-dan-sistem-koordinat",
      },
      slug: "vector-coordinate-system",
    },
    {
      routeSlugs: {
        de: "vektorsubtraktion",
        en: "vector-subtraction",
        id: "pengurangan-vektor",
        ms: "penolakan-vektor",
      },
      slug: "vector-subtraction",
    },
    {
      routeSlugs: {
        de: "vektortypen",
        en: "vector-types",
        id: "jenis-jenis-vektor",
        ms: "jenis-vektor",
      },
      slug: "vector-types",
    },
    {
      routeSlugs: {
        de: "nullvektor",
        en: "zero-vector",
        id: "vektor-nol",
        ms: "vektor-sifar",
      },
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
    ms: {
      description: "Guna tatatanda vektor, transpos dan vektor unit.",
      title: "Vektor dan Operasinya",
    },
  },
});
