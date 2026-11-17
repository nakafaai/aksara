import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/chemistry/carbon-compound",
  domain: "chemistry",
  key: "lesson.chemistry.carbon-compound",
  kind: "lesson",
  routeSlugs: {
    en: "carbon-compound",
    id: "senyawa-karbon",
    de: "kohlenstoffverbindungen",
    ms: "sebatian-karbon",
  },
  sections: ["homologous-series"],
  slug: "carbon-compound",
  translations: {
    en: {
      description: "Identify homologous series, reactions and isomers.",
      title: "Carbon Compound",
    },
    id: {
      description: "Kenali deret homolog, reaksinya, dan isomer.",
      title: "Senyawa Karbon",
    },
    de: {
      description: "Erkenne homologe Reihen, Reaktionen und Isomere.",
      title: "Kohlenstoffverbindungen",
    },
    ms: {
      description: "Kenal pasti siri homolog, tindak balas dan isomer.",
      title: "Sebatian Karbon",
    },
  },
};

export default lesson;
