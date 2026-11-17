import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonPhysicsElectronicsMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/physics/electronics",
  domain: "physics",
  key: "lesson.physics.electronics",
  kind: "lesson",
  routeSlugs: {
    de: "elektronik",
    en: "electronics",
    id: "elektronika",
    ms: "elektronik",
  },
  sections: [
    {
      evidenceUrls: [
        "https://openstax.org/books/college-physics-2e/pages/19-1-electric-potential-energy-potential-difference",
        "https://openstax.org/books/college-physics-2e/pages/30-2-discovery-of-the-parts-of-the-atom-electrons-and-nuclei",
        "https://openstax.org/books/university-physics-volume-3/pages/9-6-semiconductors-and-doping",
        "https://openstax.org/books/university-physics-volume-3/pages/9-7-semiconductor-devices",
      ],
      routeSlugs: {
        de: "elektronen-dioden-und-transistoren",
        en: "electrons-diodes-and-transistors",
        id: "elektron-dioda-dan-transistor",
        ms: "elektron-diod-dan-transistor",
      },
      slug: "diode-transistor",
    },
  ],
  slug: "electronics",
  translations: {
    de: {
      description: "Nutze Dioden und Transistoren in Schaltungen.",
      title: "Elektronik",
    },
    en: {
      description: "Use diodes and transistors in circuits.",
      title: "Electronics",
    },
    id: {
      description: "Pakai dioda dan transistor dalam rangkaian.",
      title: "Elektronika",
    },
    ms: {
      description: "Guna diod dan transistor dalam litar.",
      title: "Elektronik",
    },
  },
});
