import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/biology/plant-nutrition",
  domain: "biology",
  key: "lesson.biology.plant-nutrition",
  kind: "lesson",
  routeSlugs: {
    de: "ernaehrung-der-pflanzen",
    en: "nutrition-in-plants",
    id: "nutrisi-pada-tumbuhan",
    ms: "nutrisi-dalam-tumbuhan",
  },
  sections: ["mineral-nutrients"],
  slug: "plant-nutrition",
  translations: {
    de: {
      description: "Erkenne Nährstoffmangel und die Aufnahme durch Wurzeln.",
      title: "Ernährung der Pflanzen",
    },
    en: {
      description: "Spot nutrient deficiencies and explain uptake by roots.",
      title: "Nutrition in Plants",
    },
    id: {
      description: "Kenali kekurangan unsur hara dan cara akar menyerapnya.",
      title: "Nutrisi pada Tumbuhan",
    },
    ms: {
      description: "Kenali kekurangan nutrien dan cara akar menyerapnya.",
      title: "Nutrisi dalam Tumbuhan",
    },
  },
};

export default lesson;
