import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/physics/electricity",
  domain: "physics",
  key: "lesson.physics.electricity",
  kind: "lesson",
  routeSlugs: {
    en: "electricity",
    id: "listrik",
    de: "elektrizitaet",
    ms: "elektrik",
  },
  sections: ["current-resistance"],
  slug: "electricity",
  translations: {
    en: {
      description: "Work out resistance, e.m.f. and electrical power.",
      title: "Electricity",
    },
    id: {
      description: "Hitung hambatan, GGL, dan daya listrik.",
      title: "Listrik",
    },
    de: {
      description: "Berechne Widerstände, Quellenspannung und Leistung.",
      title: "Elektrizität",
    },
    ms: {
      description: "Kira rintangan, d.g.e. dan kuasa elektrik.",
      title: "Elektrik",
    },
  },
};

export default lesson;
