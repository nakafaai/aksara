import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonBiologyBiologyIntroductionMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/biology/biology-introduction",
  domain: "biology",
  key: "lesson.biology.biology-introduction",
  kind: "lesson",
  routeSlugs: {
    de: "einfuehrung-in-die-biologie",
    en: "introduction-to-biology",
    id: "pengantar-biologi",
    ms: "pengenalan-kepada-biologi",
  },
  sections: [
    {
      evidenceUrls: [
        "https://openstax.org/books/biology-2e/pages/1-1-the-science-of-biology",
        "https://openstax.org/books/biology-2e/pages/1-2-themes-and-concepts-of-biology",
        "https://openstax.org/books/biology-2e/pages/17-1-biotechnology",
        "https://www.ncbi.nlm.nih.gov/nuccore/NM_000207.3",
        "https://openstax.org/books/microbiology/pages/9-1-how-microbes-grow",
        "https://www.who.int/publications/i/item/9789240011311",
        "https://www.ncbi.nlm.nih.gov/books/NBK55878/",
        "https://www.cdc.gov/infection-control/hcp/disinfection-sterilization/steam-sterilization.html",
        "https://openstax.org/books/biology-2e/pages/8-3-using-light-energy-to-make-organic-molecules",
        "https://openstax.org/books/anatomy-and-physiology-2e/pages/1-6-anatomical-terminology",
      ],
      routeSlugs: {
        de: "fachgebiete-laborregeln-und-forschen",
        en: "biology-fields-and-laboratory-rules",
        id: "bidang-biologi-dan-tata-tertib-laboratorium",
        ms: "bidang-biologi-dan-peraturan-makmal",
      },
      slug: "laboratory-rules",
    },
  ],
  slug: "biology-introduction",
  translations: {
    de: {
      description: "Kenne Fachgebiete, Laborregeln und faire Versuche.",
      title: "Einführung in die Biologie",
    },
    en: {
      description: "Explore biology fields, lab safety and investigations.",
      title: "Introduction to Biology",
    },
    id: {
      description: "Kenali bidang biologi, aturan lab, dan metode ilmiah.",
      title: "Pengantar Biologi",
    },
    ms: {
      description: "Kenali bidang biologi, peraturan makmal dan penyiasatan.",
      title: "Pengenalan kepada Biologi",
    },
  },
});
