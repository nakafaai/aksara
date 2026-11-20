import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/mathematics/logic",
  domain: "mathematics",
  key: "lesson.mathematics.logic",
  kind: "lesson",
  routeSlugs: {
    de: "logisches-schliessen",
    en: "logical-reasoning",
    id: "logika-matematika",
    ms: "penaakulan-logik",
  },
  sections: ["argument"],
  slug: "logic",
  translations: {
    de: {
      description: "Prüfe Implikationen und ziehe gültige Schlüsse.",
      title: "Logisches Schließen",
    },
    en: {
      description: "Test implications and build valid arguments.",
      title: "Logical Reasoning",
    },
    id: {
      description: "Uji implikasi dan susun penalaran yang sah.",
      title: "Logika Matematika",
    },
    ms: {
      description: "Uji implikasi dan bina hujah yang sah.",
      title: "Penaakulan Logik",
    },
  },
};

export default lesson;
