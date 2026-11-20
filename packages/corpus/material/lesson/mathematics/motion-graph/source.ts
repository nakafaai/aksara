import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/mathematics/motion-graph",
  domain: "mathematics",
  key: "lesson.mathematics.motion-graph",
  kind: "lesson",
  routeSlugs: {
    de: "bewegungsdiagramme",
    en: "graphs-of-motion",
    id: "grafik-gerak",
    ms: "graf-gerakan",
  },
  sections: ["distance-speed"],
  slug: "motion-graph",
  translations: {
    de: {
      description: "Lies Geschwindigkeit und Weg aus Diagrammen ab.",
      title: "Bewegungsdiagramme",
    },
    en: {
      description: "Read speed and distance from motion graphs.",
      title: "Graphs of Motion",
    },
    id: {
      description: "Baca kelajuan dan jarak dari grafik gerak.",
      title: "Grafik Gerak",
    },
    ms: {
      description: "Baca laju dan jarak daripada graf gerakan.",
      title: "Graf Gerakan",
    },
  },
};

export default lesson;
