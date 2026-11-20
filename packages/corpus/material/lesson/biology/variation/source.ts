import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/biology/variation",
  domain: "biology",
  key: "lesson.biology.variation",
  kind: "lesson",
  routeSlugs: {
    de: "variation",
    en: "variation",
    id: "variasi",
    ms: "variasi",
  },
  sections: ["types-mutation"],
  slug: "variation",
  translations: {
    de: {
      description: "Unterscheide Variationsformen und erkläre Mutationen.",
      title: "Variation",
    },
    en: {
      description: "Tell variation types apart and explain mutations.",
      title: "Variation",
    },
    id: {
      description: "Bedakan jenis variasi dan jelaskan mutasi.",
      title: "Variasi",
    },
    ms: {
      description: "Bezakan jenis variasi dan terangkan mutasi.",
      title: "Variasi",
    },
  },
};

export default lesson;
