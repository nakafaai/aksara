import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonBiologyGeneticTechnologyMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/biology/genetic-technology",
  domain: "biology",
  key: "lesson.biology.genetic-technology",
  kind: "lesson",
  routeSlugs: {
    de: "gentechnik",
    en: "genetic-technology",
    id: "teknologi-genetika",
    ms: "teknologi-genetik",
  },
  sections: [
    {
      evidenceUrls: [
        "https://openstax.org/books/biology-2e/pages/17-1-biotechnology",
        "https://openstax.org/books/concepts-biology/pages/10-1-cloning-and-genetic-engineering",
        "https://openstax.org/books/concepts-biology/pages/10-2-biotechnology-in-medicine-and-agriculture",
        "https://www.genome.gov/about-genomics/educational-resources/fact-sheets/human-genomic-variation",
      ],
      routeSlugs: {
        de: "gentechnik-und-biotechnologie",
        en: "genetic-engineering-and-biotechnology",
        id: "rekayasa-genetika-dan-bioteknologi",
        ms: "kejuruteraan-genetik-dan-bioteknologi",
      },
      slug: "genetic-engineering",
    },
  ],
  slug: "genetic-technology",
  translations: {
    de: {
      description: "Stell Insulin mit Bakterien her und lies DNA-Profile.",
      title: "Gentechnik",
    },
    en: {
      description: "Make insulin with bacteria and read DNA profiles.",
      title: "Genetic Technology",
    },
    id: {
      description: "Buat insulin dengan bakteri dan baca profil DNA.",
      title: "Teknologi Genetika",
    },
    ms: {
      description: "Hasilkan insulin dengan bakteria dan baca profil DNA.",
      title: "Teknologi Genetik",
    },
  },
});
