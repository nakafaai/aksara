import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonBiologyPlantReproductionMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/biology/plant-reproduction",
  domain: "biology",
  key: "lesson.biology.plant-reproduction",
  kind: "lesson",
  routeSlugs: {
    de: "fortpflanzung-der-bluetenpflanzen",
    en: "reproduction-in-flowering-plants",
    id: "reproduksi-tumbuhan-berbunga",
    ms: "pembiakan-tumbuhan-berbunga",
  },
  sections: [
    {
      evidenceUrls: [
        "https://openstax.org/books/biology-2e/pages/32-1-reproductive-development-and-structure",
        "https://openstax.org/books/biology-2e/pages/32-2-pollination-and-fertilization",
        "https://openstax.org/books/concepts-biology/pages/14-4-seed-plants-angiosperms",
      ],
      routeSlugs: {
        de: "bluete-und-doppelte-befruchtung",
        en: "flowers-and-double-fertilisation",
        id: "bunga-dan-pembuahan-ganda",
        ms: "bunga-dan-persenyawaan-ganda",
      },
      slug: "flower-fertilisation",
    },
  ],
  slug: "plant-reproduction",
  translations: {
    de: {
      description: "Verfolge Bestäubung und doppelte Befruchtung.",
      title: "Fortpflanzung der Blütenpflanzen",
    },
    en: {
      description: "Follow pollination and double fertilisation.",
      title: "Reproduction in Flowering Plants",
    },
    id: {
      description: "Ikuti penyerbukan dan pembuahan ganda.",
      title: "Reproduksi Tumbuhan Berbunga",
    },
    ms: {
      description: "Ikuti pendebungaan dan persenyawaan ganda.",
      title: "Pembiakan Tumbuhan Berbunga",
    },
  },
});
