import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonChemistryPeriodicGroupsMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/chemistry/periodic-groups",
  domain: "chemistry",
  key: "lesson.chemistry.periodic-groups",
  kind: "lesson",
  routeSlugs: {
    de: "gruppen-des-periodensystems",
    en: "periodic-table-groups",
    id: "golongan-sistem-periodik",
    ms: "kumpulan-jadual-berkala",
  },
  sections: [
    {
      evidenceUrls: [
        "https://openstax.org/books/chemistry-2e/pages/18-1-periodicity",
        "https://openstax.org/books/chemistry-2e/pages/18-11-occurrence-preparation-and-properties-of-halogens",
        "https://openstax.org/books/chemistry-2e/pages/18-12-occurrence-preparation-and-properties-of-the-noble-gases",
        "https://openstax.org/books/chemistry-2e/pages/19-1-occurrence-preparation-and-properties-of-transition-metals-and-their-compounds",
        "https://pubchem.ncbi.nlm.nih.gov/periodic-table/",
      ],
      routeSlugs: {
        de: "edelgase-alkalimetalle-und-halogene",
        en: "noble-gases-alkali-metals-and-halogens",
        id: "gas-mulia-alkali-dan-halogen",
        ms: "gas-adi-logam-alkali-dan-halogen",
      },
      slug: "group-properties",
    },
  ],
  slug: "periodic-groups",
  translations: {
    de: {
      description: "Vergleich Edelgase, Alkalimetalle und Halogene.",
      title: "Gruppen des Periodensystems",
    },
    en: {
      description: "Compare noble gases, alkali metals and halogens.",
      title: "Groups of the Periodic Table",
    },
    id: {
      description: "Bandingkan gas mulia, logam alkali, dan halogen.",
      title: "Golongan dalam Sistem Periodik",
    },
    ms: {
      description: "Bandingkan gas adi, logam alkali dan halogen.",
      title: "Kumpulan dalam Jadual Berkala",
    },
  },
});
