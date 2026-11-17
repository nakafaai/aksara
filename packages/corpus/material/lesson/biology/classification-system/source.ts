import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonBiologyClassificationSystemMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/biology/classification-system",
  domain: "biology",
  key: "lesson.biology.classification-system",
  kind: "lesson",
  routeSlugs: {
    de: "klassifikation-und-benennung",
    en: "classification-and-naming",
    id: "sistem-klasifikasi-dan-tata-nama",
    ms: "sistem-pengelasan-dan-penamaan",
  },
  sections: [
    {
      evidenceUrls: [
        "https://openstax.org/books/biology-2e/pages/20-1-organizing-life-on-earth",
        "https://doi.org/10.1371/journal.pbio.1001127",
        "https://openstax.org/books/biology-2e/pages/23-2-characteristics-of-protists",
        "https://openstax.org/books/biology-2e/pages/23-3-groups-of-protists",
        "https://openstax.org/books/biology-2e/pages/23-4-ecology-of-protists",
        "https://openstax.org/books/biology-2e/pages/44-4-aquatic-biomes",
        "https://www.cdc.gov/dpdx/malaria/index.html",
        "https://pmc.ncbi.nlm.nih.gov/articles/PMC3623376/",
      ],
      routeSlugs: {
        de: "sechs-reiche-und-protisten",
        en: "six-kingdoms-and-protists",
        id: "enam-kingdom-dan-protista",
        ms: "enam-alam-dan-protista",
      },
      slug: "kingdoms-protists",
    },
  ],
  slug: "classification-system",
  translations: {
    de: {
      description: "Ordne Reiche, benenne Arten, bestimme Protisten.",
      title: "Klassifikation und Benennung",
    },
    en: {
      description: "Sort six kingdoms, name species and key out protists.",
      title: "Classification and Naming",
    },
    id: {
      description: "Kelompokkan enam kingdom dan namai spesies.",
      title: "Sistem Klasifikasi dan Tata Nama",
    },
    ms: {
      description: "Kelaskan enam alam, namakan spesies, kenal protista.",
      title: "Pengelasan dan Penamaan Organisma",
    },
  },
});
