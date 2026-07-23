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
      translations: {
        en: {
          title: "Causes of Climate Change",
        },
        id: {
          title: "Penyebab Perubahan Iklim",
        },
      },
    },
    {
      routeSlugs: {
        en: "global-cooperation",
        id: "kerja-sama-global-untuk-mengatasi-perubahan-iklim",
      },
      slug: "global-cooperation",
      translations: {
        en: {
          title: "Global Cooperation to Address Climate Change",
        },
        id: {
          title: "Kerja Sama Global untuk Mengatasi Perubahan Iklim",
        },
      },
    },
    {
      routeSlugs: { en: "impact", id: "dampak-perubahan-iklim" },
      slug: "impact",
      translations: {
        en: {
          title: "Impact of Climate Change",
        },
        id: {
          title: "Dampak Perubahan Iklim",
        },
      },
    },
    {
      routeSlugs: {
        en: "mitigation-adaptation",
        id: "upaya-mitigasi-dan-adaptasi-terhadap-perubahan-iklim",
      },
      slug: "mitigation-adaptation",
      translations: {
        en: {
          title: "Mitigation and Adaptation Efforts for Climate Change",
        },
        id: {
          title: "Upaya Mitigasi dan Adaptasi terhadap Perubahan Iklim",
        },
      },
    },
    {
      routeSlugs: { en: "symptoms", id: "gejala-perubahan-iklim" },
      slug: "symptoms",
      translations: {
        en: {
          title: "Symptoms of Climate Change",
        },
        id: {
          title: "Gejala Perubahan Iklim",
        },
      },
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
