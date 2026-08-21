import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonBiologyClimateChangeMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/biology/climate-change",
  domain: "biology",
  key: "lesson.biology.climate-change",
  kind: "lesson",
  routeSlugs: {
    de: "klimawandel",
    en: "climate-change",
    id: "perubahan-iklim",
  },
  sections: [
    {
      routeSlugs: {
        de: "ursachen",
        en: "causes",
        id: "penyebab-perubahan-iklim",
      },
      slug: "causes",
    },
    {
      routeSlugs: {
        de: "internationale-zusammenarbeit",
        en: "global-cooperation",
        id: "kerja-sama-global-untuk-mengatasi-perubahan-iklim",
      },
      slug: "global-cooperation",
    },
    {
      routeSlugs: { de: "folgen", en: "impact", id: "dampak-perubahan-iklim" },
      slug: "impact",
    },
    {
      routeSlugs: {
        de: "klimaschutz-und-anpassung",
        en: "mitigation-adaptation",
        id: "upaya-mitigasi-dan-adaptasi-terhadap-perubahan-iklim",
      },
      slug: "mitigation-adaptation",
    },
    {
      routeSlugs: {
        de: "anzeichen",
        en: "symptoms",
        id: "gejala-perubahan-iklim",
      },
      slug: "symptoms",
    },
  ],
  slug: "climate-change",
  translations: {
    de: {
      description: "Untersuche Ursachen, Anzeichen, Folgen und Antworten.",
      title: "Klimawandel",
    },
    en: {
      description: "Trace how human activity traps heat on Earth.",
      title: "Climate Change",
    },
    id: {
      description: "Telusuri aktivitas manusia yang memerangkap panas bumi.",
      title: "Perubahan Iklim",
    },
  },
});
