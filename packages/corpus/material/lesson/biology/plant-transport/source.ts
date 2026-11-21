import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/biology/plant-transport",
  domain: "biology",
  key: "lesson.biology.plant-transport",
  kind: "lesson",
  routeSlugs: {
    de: "transport-in-pflanzen",
    en: "transport-in-plants",
    id: "transportasi-pada-tumbuhan",
    ms: "pengangkutan-dalam-tumbuhan",
  },
  sections: ["xylem-phloem"],
  slug: "plant-transport",
  translations: {
    de: {
      description: "Erkläre Xylem, Phloem, Wasseraufstieg und Translokation.",
      title: "Transport in Pflanzen",
    },
    en: {
      description: "Explain xylem, phloem, transpiration and translocation.",
      title: "Transport in Plants",
    },
    id: {
      description: "Jelaskan xilem, floem, transpirasi, dan translokasi.",
      title: "Transportasi pada Tumbuhan",
    },
    ms: {
      description: "Terangkan xilem, floem, transpirasi dan translokasi.",
      title: "Pengangkutan dalam Tumbuhan",
    },
  },
};

export default lesson;
