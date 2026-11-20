import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
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
  sections: ["enzyme-action"],
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
};

export default lesson;
