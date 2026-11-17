import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonBiologyMetabolismEnzymeMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/biology/metabolism-enzyme",
  domain: "biology",
  key: "lesson.biology.metabolism-enzyme",
  kind: "lesson",
  routeSlugs: {
    de: "stoffwechsel-und-enzyme",
    en: "metabolism-and-enzymes",
    id: "metabolisme-dan-enzim",
    ms: "metabolisme-dan-enzim",
  },
  sections: [
    {
      evidenceUrls: [
        "https://openstax.org/books/biology-2e/pages/6-1-energy-and-metabolism",
        "https://openstax.org/books/biology-2e/pages/6-2-potential-kinetic-free-and-activation-energy",
        "https://openstax.org/books/biology-2e/pages/6-5-enzymes",
        "https://openstax.org/books/biology-2e/pages/4-4-the-endomembrane-system-and-proteins",
        "https://openstax.org/books/anatomy-and-physiology-2e/pages/23-7-chemical-digestion-and-absorption-a-closer-look",
        "https://pmc.ncbi.nlm.nih.gov/articles/PMC3962110/",
      ],
      routeSlugs: {
        de: "wie-enzyme-arbeiten",
        en: "how-enzymes-work",
        id: "cara-kerja-enzim",
        ms: "cara-enzim-bertindak",
      },
      slug: "enzyme-action",
    },
  ],
  slug: "metabolism-enzyme",
  translations: {
    de: {
      description: "Erkläre, wie Enzyme den Stoffwechsel beschleunigen.",
      title: "Stoffwechsel und Enzyme",
    },
    en: {
      description: "Explain metabolism and how enzymes speed up reactions.",
      title: "Metabolism and Enzymes",
    },
    id: {
      description: "Jelaskan metabolisme dan cara enzim mempercepat reaksi.",
      title: "Metabolisme dan Enzim",
    },
    ms: {
      description: "Terangkan metabolisme dan cara enzim bertindak.",
      title: "Metabolisme dan Enzim",
    },
  },
});
