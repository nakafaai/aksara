import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
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
  sections: ["flower-fertilisation"],
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
};

export default lesson;
