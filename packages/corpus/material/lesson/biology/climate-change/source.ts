import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonBiologyClimateChangeMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/biology/climate-change",
  domain: "biology",
  key: "lesson.biology.climate-change",
  kind: "lesson",
  routeSlugs: { en: "climate-change", id: "perubahan-iklim" },
  sections: [
    {
      routeSlugs: { en: "causes", id: "penyebab-perubahan-iklim" },
      slug: "causes",
    },
    {
      routeSlugs: {
        en: "global-cooperation",
        id: "kerja-sama-global-untuk-mengatasi-perubahan-iklim",
      },
      slug: "global-cooperation",
    },
    {
      routeSlugs: { en: "impact", id: "dampak-perubahan-iklim" },
      slug: "impact",
    },
    {
      routeSlugs: {
        en: "mitigation-adaptation",
        id: "upaya-mitigasi-dan-adaptasi-terhadap-perubahan-iklim",
      },
      slug: "mitigation-adaptation",
    },
    {
      routeSlugs: { en: "symptoms", id: "gejala-perubahan-iklim" },
      slug: "symptoms",
    },
  ],
  slug: "climate-change",
  translations: {
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
