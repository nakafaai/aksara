import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonChemistryManufacturedSubstancesMaterial =
  defineLessonMaterial({
    assetRoot: "material/lesson/chemistry/manufactured-substances",
    domain: "chemistry",
    key: "lesson.chemistry.manufactured-substances",
    kind: "lesson",
    routeSlugs: {
      de: "industriell-hergestellte-stoffe",
      en: "manufactured-substances-in-industry",
      id: "bahan-buatan-dalam-industri",
      ms: "bahan-buatan-dalam-industri",
    },
    sections: [
      {
        evidenceUrls: [
          "https://openstax.org/books/chemistry-2e/pages/10-5-the-solid-state-of-matter",
          "https://en.wikipedia.org/wiki/Soda%E2%80%93lime_glass",
          "https://en.wikipedia.org/wiki/Borosilicate_glass",
          "https://en.wikipedia.org/wiki/Fused_quartz",
          "https://en.wikipedia.org/wiki/Aluminium_oxide",
          "https://en.wikipedia.org/wiki/Magnesium_oxide",
        ],
        routeSlugs: {
          de: "legierungen-glas-und-keramik",
          en: "alloys-glass-ceramics-and-composites",
          id: "paduan-logam-kaca-keramik-dan-komposit",
          ms: "aloi-kaca-seramik-dan-komposit",
        },
        slug: "alloy-glass-ceramic",
      },
    ],
    slug: "manufactured-substances",
    translations: {
      de: {
        description: "Sieh, warum Legierungen, Glas und Keramik so wirken.",
        title: "Industriell hergestellte Stoffe",
      },
      en: {
        description: "See why alloys, glass and ceramics behave as they do.",
        title: "Manufactured Substances in Industry",
      },
      id: {
        description: "Lihat alasan sifat paduan logam, kaca, dan keramik.",
        title: "Bahan Buatan dalam Industri",
      },
      ms: {
        description: "Lihat sebab sifat aloi, kaca dan seramik berbeza.",
        title: "Bahan Buatan dalam Industri",
      },
    },
  });
