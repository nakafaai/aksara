import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonBiologyLeafStructureMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/biology/leaf-structure",
  domain: "biology",
  key: "lesson.biology.leaf-structure",
  kind: "lesson",
  routeSlugs: {
    de: "blatt",
    en: "leaf",
    id: "daun",
    ms: "daun",
  },
  sections: [
    {
      evidenceUrls: [
        "https://openstax.org/books/biology-2e/pages/30-4-leaves",
        "https://openstax.org/books/biology-2e/pages/30-5-transport-of-water-and-solutes-in-plants",
        "https://openstax.org/books/biology-2e/pages/8-1-overview-of-photosynthesis",
        "https://openstax.org/books/biology-2e/pages/8-2-the-light-dependent-reactions-of-photosynthesis",
        "https://openstax.org/books/biology-2e/pages/8-3-using-light-energy-to-make-organic-molecules",
        "https://www.fao.org/4/x0490e/x0490e07.htm",
      ],
      routeSlugs: {
        de: "bau-und-funktion",
        en: "structure-and-function",
        id: "struktur-dan-fungsi",
        ms: "struktur-dan-fungsi",
      },
      slug: "leaf-function",
    },
  ],
  slug: "leaf-structure",
  translations: {
    de: {
      description: "Versteh Blattbau, Gasaustausch und Fotosynthese.",
      title: "Bau und Funktion des Blattes",
    },
    en: {
      description: "Link leaf structure to gas exchange and photosynthesis.",
      title: "Leaf Structure and Function",
    },
    id: {
      description: "Pahami struktur daun, pertukaran gas, dan fotosintesis.",
      title: "Struktur dan Fungsi Daun",
    },
    ms: {
      description: "Fahami struktur daun, pertukaran gas dan fotosintesis.",
      title: "Struktur dan Fungsi Daun",
    },
  },
});
