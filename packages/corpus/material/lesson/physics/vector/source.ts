import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonPhysicsVectorMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/physics/vector",
  domain: "physics",
  key: "lesson.physics.vector",
  kind: "lesson",
  routeSlugs: { de: "vektoren", en: "vector", id: "vektor" },
  sections: [
    {
      routeSlugs: {
        de: "analytische-addition-und-subtraktion",
        en: "analytical-addition-subtraction",
        id: "penjumlahan-dan-pengurangan-vektor-dengan-metode-analitis",
      },
      slug: "analytical-addition-subtraction",
    },
    {
      routeSlugs: { de: "komponenten", en: "component", id: "komponen-vektor" },
      slug: "component",
    },
    {
      routeSlugs: { de: "grundbegriff", en: "concept", id: "konsep-vektor" },
      slug: "concept",
    },
    {
      routeSlugs: {
        de: "kosinussatz",
        en: "cosine-rule",
        id: "penentuan-resultan-vektor-dengan-rumus-kosinus",
      },
      slug: "cosine-rule",
    },
    {
      routeSlugs: {
        de: "graphische-addition-und-subtraktion",
        en: "graphical-addition-subtraction",
        id: "penjumlahan-dan-pengurangan-vektor-dengan-metode-grafis",
      },
      slug: "graphical-addition-subtraction",
    },
    {
      routeSlugs: {
        de: "multiplikation",
        en: "multiplication",
        id: "perkalian-vektor",
      },
      slug: "multiplication",
    },
    {
      routeSlugs: {
        de: "schreibweise",
        en: "notation",
        id: "lambang-dan-notasi-vektor",
      },
      slug: "notation",
    },
    {
      routeSlugs: {
        de: "eigenschaften",
        en: "property",
        id: "sifat-sifat-vektor",
      },
      slug: "property",
    },
    {
      routeSlugs: {
        de: "sinussatz",
        en: "sine-rule",
        id: "penentuan-arah-resultan-vektor-dengan-rumus-sinus",
      },
      slug: "sine-rule",
    },
    {
      routeSlugs: {
        de: "trigonometrische-zerlegung",
        en: "trigonometry-decomposition",
        id: "penguraian-vektor-berdasarkan-aturan-trigonometri",
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
  },
});
