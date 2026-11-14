import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonPhysicsVectorMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/physics/vector",
  domain: "physics",
  key: "lesson.physics.vector",
  kind: "lesson",
  routeSlugs: { de: "vektoren", en: "vector", id: "vektor", ms: "vektor" },
  sections: [
    {
      routeSlugs: {
        de: "analytische-addition-und-subtraktion",
        en: "analytical-addition-subtraction",
        id: "penjumlahan-dan-pengurangan-vektor-dengan-metode-analitis",
        ms: "penambahan-dan-penolakan-vektor-secara-analitik",
      },
      slug: "analytical-addition-subtraction",
    },
    {
      routeSlugs: {
        de: "komponenten",
        en: "component",
        id: "komponen-vektor",
        ms: "komponen-vektor",
      },
      slug: "component",
    },
    {
      routeSlugs: {
        de: "grundbegriff",
        en: "concept",
        id: "konsep-vektor",
        ms: "konsep-vektor",
      },
      slug: "concept",
    },
    {
      routeSlugs: {
        de: "kosinussatz",
        en: "cosine-rule",
        id: "penentuan-resultan-vektor-dengan-rumus-kosinus",
        ms: "vektor-paduan-dengan-petua-kosinus",
      },
      slug: "cosine-rule",
    },
    {
      routeSlugs: {
        de: "graphische-addition-und-subtraktion",
        en: "graphical-addition-subtraction",
        id: "penjumlahan-dan-pengurangan-vektor-dengan-metode-grafis",
        ms: "penambahan-dan-penolakan-vektor-secara-grafik",
      },
      slug: "graphical-addition-subtraction",
    },
    {
      routeSlugs: {
        de: "multiplikation",
        en: "multiplication",
        id: "perkalian-vektor",
        ms: "pendaraban-vektor",
      },
      slug: "multiplication",
    },
    {
      routeSlugs: {
        de: "schreibweise",
        en: "notation",
        id: "lambang-dan-notasi-vektor",
        ms: "simbol-dan-tatatanda-vektor",
      },
      slug: "notation",
    },
    {
      routeSlugs: {
        de: "eigenschaften",
        en: "property",
        id: "sifat-sifat-vektor",
        ms: "sifat-sifat-vektor",
      },
      slug: "property",
    },
    {
      routeSlugs: {
        de: "sinussatz",
        en: "sine-rule",
        id: "penentuan-arah-resultan-vektor-dengan-rumus-sinus",
        ms: "arah-vektor-paduan-dengan-petua-sinus",
      },
      slug: "sine-rule",
    },
    {
      routeSlugs: {
        de: "trigonometrische-zerlegung",
        en: "trigonometry-decomposition",
        id: "penguraian-vektor-berdasarkan-aturan-trigonometri",
        ms: "leraian-vektor-secara-trigonometri",
      },
      slug: "trigonometry-decomposition",
    },
  ],
  slug: "vector",
  translations: {
    de: {
      description: "Bestimme Resultierende aus Komponenten und Richtung.",
      title: "Vektoren",
    },
    en: {
      description: "Build resultants from components and direction.",
      title: "Vector",
    },
    id: {
      description: "Susun resultan dari komponen dan arah.",
      title: "Vektor",
    },
    ms: {
      description: "Bina vektor paduan daripada komponen dan arah.",
      title: "Vektor",
    },
  },
});
