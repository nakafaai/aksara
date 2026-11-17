import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonBiologyEcosystemMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/biology/ecosystem",
  domain: "biology",
  key: "lesson.biology.ecosystem",
  kind: "lesson",
  routeSlugs: {
    de: "oekosystem",
    en: "ecosystem",
    id: "ekosistem",
    ms: "ekosistem",
  },
  sections: [
    {
      evidenceUrls: [
        "https://openstax.org/books/biology-2e/pages/46-1-ecology-of-ecosystems",
        "https://openstax.org/books/biology-2e/pages/46-2-energy-flow-through-ecosystems",
        "https://openstax.org/books/biology-2e/pages/46-3-biogeochemical-cycles",
        "https://openstax.org/books/biology-2e/pages/45-1-population-demography",
        "https://openstax.org/books/biology-2e/pages/45-3-environmental-limits-to-population-growth",
        "https://openstax.org/books/biology-2e/pages/45-6-community-ecology",
        "https://pubs.usgs.gov/publication/70098419",
        "https://pmc.ncbi.nlm.nih.gov/articles/PMC8689078",
      ],
      routeSlugs: {
        de: "gemeinschaft-und-population",
        en: "community-and-population",
        id: "komunitas-dan-populasi",
        ms: "komuniti-dan-populasi",
      },
      slug: "community-population",
    },
  ],
  slug: "ecosystem",
  translations: {
    de: {
      description: "Berechne Energieflüsse und schätze Populationen.",
      title: "Ökosystem",
    },
    en: {
      description: "Calculate energy flow and estimate populations.",
      title: "Ecosystem",
    },
    id: {
      description: "Hitung aliran energi dan taksir ukuran populasi.",
      title: "Ekosistem",
    },
    ms: {
      description: "Kira aliran tenaga dan anggar saiz populasi.",
      title: "Ekosistem",
    },
  },
});
