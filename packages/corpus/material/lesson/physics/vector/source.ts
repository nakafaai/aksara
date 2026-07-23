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
      translations: {
        en: {
          title: "Vector Addition and Subtraction with Analytical Method",
        },
        id: {
          title: "Penjumlahan dan Pengurangan Vektor dengan Metode Analitis",
        },
      },
    },
    {
      routeSlugs: { en: "component", id: "komponen-vektor" },
      slug: "component",
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
      routeSlugs: { en: "concept", id: "konsep-vektor" },
      slug: "concept",
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
        en: "cosine-rule",
        id: "penentuan-resultan-vektor-dengan-rumus-kosinus",
      },
      slug: "cosine-rule",
      translations: {
        en: {
          title: "Determining Vector Resultant with Cosine Rule",
        },
        id: {
          title: "Penentuan Resultan Vektor dengan Rumus Kosinus",
        },
      },
    },
    {
      routeSlugs: {
        en: "graphical-addition-subtraction",
        id: "penjumlahan-dan-pengurangan-vektor-dengan-metode-grafis",
      },
      slug: "graphical-addition-subtraction",
      translations: {
        en: {
          title: "Vector Addition and Subtraction with Graphical Method",
        },
        id: {
          title: "Penjumlahan dan Pengurangan Vektor dengan Metode Grafis",
        },
      },
    },
    {
      routeSlugs: { en: "multiplication", id: "perkalian-vektor" },
      slug: "multiplication",
      translations: {
        en: {
          title: "Vector Multiplication",
        },
        id: {
          title: "Perkalian Vektor",
        },
      },
    },
    {
      routeSlugs: { en: "notation", id: "lambang-dan-notasi-vektor" },
      slug: "notation",
      translations: {
        en: {
          title: "Vector Symbols and Notation",
        },
        id: {
          title: "Lambang dan Notasi Vektor",
        },
      },
    },
    {
      routeSlugs: { en: "property", id: "sifat-sifat-vektor" },
      slug: "property",
      translations: {
        en: {
          title: "Vector Properties",
        },
        id: {
          title: "Sifat-sifat Vektor",
        },
      },
    },
    {
      routeSlugs: {
        en: "sine-rule",
        id: "penentuan-arah-resultan-vektor-dengan-rumus-sinus",
      },
      slug: "sine-rule",
      translations: {
        en: {
          title: "Determining Vector Resultant Direction with Sine Rule",
        },
        id: {
          title: "Penentuan Arah Resultan Vektor dengan Rumus Sinus",
        },
      },
    },
    {
      routeSlugs: {
        en: "trigonometry-decomposition",
        id: "penguraian-vektor-berdasarkan-aturan-trigonometri",
      },
      slug: "trigonometry-decomposition",
      translations: {
        en: {
          title: "Vector Decomposition Using Trigonometry Rules",
        },
        id: {
          title: "Penguraian Vektor Berdasarkan Aturan Trigonometri",
        },
      },
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
