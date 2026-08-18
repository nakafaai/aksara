import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonPhysicsVectorMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/physics/vector",
  domain: "physics",
  key: "lesson.physics.vector",
  kind: "lesson",
  routeSlugs: { en: "vector", id: "vektor" },
  sections: [
    {
      routeSlugs: {
        en: "analytical-addition-subtraction",
        id: "penjumlahan-dan-pengurangan-vektor-dengan-metode-analitis",
      },
      slug: "analytical-addition-subtraction",
    },
    {
      routeSlugs: { en: "component", id: "komponen-vektor" },
      slug: "component",
    },
    {
      routeSlugs: { en: "concept", id: "konsep-vektor" },
      slug: "concept",
    },
    {
      routeSlugs: {
        en: "cosine-rule",
        id: "penentuan-resultan-vektor-dengan-rumus-kosinus",
      },
      slug: "cosine-rule",
    },
    {
      routeSlugs: {
        en: "graphical-addition-subtraction",
        id: "penjumlahan-dan-pengurangan-vektor-dengan-metode-grafis",
      },
      slug: "graphical-addition-subtraction",
    },
    {
      routeSlugs: { en: "multiplication", id: "perkalian-vektor" },
      slug: "multiplication",
    },
    {
      routeSlugs: { en: "notation", id: "lambang-dan-notasi-vektor" },
      slug: "notation",
    },
    {
      routeSlugs: { en: "property", id: "sifat-sifat-vektor" },
      slug: "property",
    },
    {
      routeSlugs: {
        en: "sine-rule",
        id: "penentuan-arah-resultan-vektor-dengan-rumus-sinus",
      },
      slug: "sine-rule",
    },
    {
      routeSlugs: {
        en: "trigonometry-decomposition",
        id: "penguraian-vektor-berdasarkan-aturan-trigonometri",
      },
      slug: "trigonometry-decomposition",
    },
  ],
  slug: "vector",
  translations: {
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
