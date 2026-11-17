import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonBiologyPlantTissueMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/biology/plant-tissue",
  domain: "biology",
  key: "lesson.biology.plant-tissue",
  kind: "lesson",
  routeSlugs: {
    de: "pflanzengewebe",
    en: "plant-tissues",
    id: "jaringan-tumbuhan",
    ms: "tisu-tumbuhan",
  },
  sections: [
    {
      evidenceUrls: [
        "https://openstax.org/books/biology-2e/pages/30-1-the-plant-body",
        "https://openstax.org/books/biology-2e/pages/30-2-stems",
        "https://openstax.org/books/biology-2e/pages/30-3-roots",
        "https://openstax.org/books/biology-2e/pages/32-3-asexual-reproduction",
        "https://openstax.org/books/biology-2e/pages/5-2-passive-transport",
      ],
      routeSlugs: {
        de: "gewebe-und-wachstum",
        en: "tissues-and-growth",
        id: "jaringan-dan-pertumbuhan",
        ms: "tisu-dan-pertumbuhan",
      },
      slug: "tissue-growth",
    },
  ],
  slug: "plant-tissue",
  translations: {
    de: {
      description: "Erkenne Pflanzengewebe und lies Wachstumskurven.",
      title: "Pflanzengewebe und Wachstum",
    },
    en: {
      description: "Identify plant tissues and read growth curves.",
      title: "Plant Tissues and Growth",
    },
    id: {
      description: "Kenali jaringan tumbuhan dan baca kurva pertumbuhan.",
      title: "Jaringan Tumbuhan dan Pertumbuhan",
    },
    ms: {
      description: "Kenali tisu tumbuhan dan tafsir lengkung pertumbuhan.",
      title: "Tisu Tumbuhan dan Pertumbuhan",
    },
  },
});
