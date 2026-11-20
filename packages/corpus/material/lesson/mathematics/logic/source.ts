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
  sections: ["statement", "implication", "argument"],
  slug: "logic",
  translations: {
    de: {
      description:
        "Prüfe Aussagen und Implikationen und ziehe gültige Schlüsse.",
      title: "Logisches Schließen",
    },
    en: {
      description:
        "Check statements, test implications and build valid arguments.",
      title: "Logical Reasoning",
    },
    id: {
      description:
        "Cek pernyataan, uji implikasi, dan susun penalaran yang sah.",
      title: "Logika Matematika",
    },
    ms: {
      description: "Semak pernyataan, uji implikasi dan bina hujah yang sah.",
      title: "Penaakulan Logik",
    },
  },
};

export default lesson;
