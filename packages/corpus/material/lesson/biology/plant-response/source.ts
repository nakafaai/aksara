import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/biology/plant-response",
  domain: "biology",
  key: "lesson.biology.plant-response",
  kind: "lesson",
  routeSlugs: {
    de: "reaktionen-der-pflanzen",
    en: "response-in-plants",
    id: "respons-tumbuhan",
    ms: "gerak-balas-tumbuhan",
  },
  sections: ["tropism-hormone"],
  slug: "plant-response",
  translations: {
    de: {
      description: "Unterscheide Tropismen und Nastien, erkläre Auxin.",
      title: "Reaktionen der Pflanzen",
    },
    en: {
      description: "Tell tropisms from nastic responses and explain auxin.",
      title: "Response in Plants",
    },
    id: {
      description: "Bedakan tropisme dan nasti, lalu pahami auksin.",
      title: "Respons pada Tumbuhan",
    },
    ms: {
      description: "Bezakan tropisme dengan nasti dan fahami auksin.",
      title: "Gerak Balas dalam Tumbuhan",
    },
  },
};

export default lesson;
