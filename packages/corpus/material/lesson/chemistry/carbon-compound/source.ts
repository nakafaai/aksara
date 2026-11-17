import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonChemistryCarbonCompoundMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/chemistry/carbon-compound",
  domain: "chemistry",
  key: "lesson.chemistry.carbon-compound",
  kind: "lesson",
  routeSlugs: {
    de: "kohlenstoffverbindungen",
    en: "carbon-compound",
    id: "senyawa-karbon",
    ms: "sebatian-karbon",
  },
  sections: [
    {
      evidenceUrls: [
        "https://openstax.org/books/chemistry-2e/pages/20-1-hydrocarbons",
        "https://openstax.org/books/chemistry-2e/pages/20-2-alcohols-and-ethers",
        "https://openstax.org/books/chemistry-2e/pages/20-3-aldehydes-ketones-carboxylic-acids-and-esters",
      ],
      routeSlugs: {
        de: "homologe-reihen-und-isomere",
        en: "homologous-series-and-isomers",
        id: "deret-homolog-dan-isomer",
        ms: "siri-homolog-dan-isomer",
      },
      slug: "homologous-series",
    },
  ],
  slug: "carbon-compound",
  translations: {
    de: {
      description: "Erkenne homologe Reihen, Reaktionen und Isomere.",
      title: "Kohlenstoffverbindungen",
    },
    en: {
      description: "Identify homologous series, reactions and isomers.",
      title: "Carbon Compound",
    },
    id: {
      description: "Kenali deret homolog, reaksinya, dan isomer.",
      title: "Senyawa Karbon",
    },
    ms: {
      description: "Kenal pasti siri homolog, tindak balas dan isomer.",
      title: "Sebatian Karbon",
    },
  },
});
