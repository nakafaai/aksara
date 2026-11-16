import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonChemistryAcidBaseSaltMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/chemistry/acid-base-salt",
  domain: "chemistry",
  key: "lesson.chemistry.acid-base-salt",
  kind: "lesson",
  routeSlugs: {
    de: "saeuren-basen-und-salze",
    en: "acid-base-and-salt",
    id: "asam-basa-dan-garam",
    ms: "asid-bes-dan-garam",
  },
  sections: [
    {
      evidenceUrls: [
        "https://openstax.org/books/chemistry-2e/pages/14-1-bronsted-lowry-acids-and-bases",
        "https://openstax.org/books/chemistry-2e/pages/14-2-ph-and-poh",
        "https://openstax.org/books/chemistry-2e/pages/14-3-relative-strengths-of-acids-and-bases",
        "https://openstax.org/books/chemistry-2e/pages/14-7-acid-base-titrations",
        "https://openstax.org/books/chemistry-2e/pages/4-2-classifying-chemical-reactions",
      ],
      routeSlugs: {
        de: "saeuren-laugen-und-salze",
        en: "acids-alkalis-and-salts",
        id: "asam-basa-ph-dan-garam",
        ms: "asid-alkali-dan-garam",
      },
      slug: "acid-alkali",
    },
  ],
  slug: "acid-base-salt",
  translations: {
    de: {
      description: "Miss den pH-Wert, titriere und stelle Salze her.",
      title: "Säuren, Basen und Salze",
    },
    en: {
      description: "Measure pH, run titrations and prepare salts.",
      title: "Acid, Base and Salt",
    },
    id: {
      description: "Ukur pH, lakukan titrasi, dan buat garam.",
      title: "Asam, Basa, dan Garam",
    },
    ms: {
      description: "Ukur pH, jalankan pentitratan dan sediakan garam.",
      title: "Asid, Bes dan Garam",
    },
  },
});
