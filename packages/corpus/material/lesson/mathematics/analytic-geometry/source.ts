import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/mathematics/analytic-geometry",
  domain: "mathematics",
  key: "lesson.mathematics.analytic-geometry",
  kind: "lesson",
  routeSlugs: {
    en: "analytic-geometry",
    id: "geometri-analitik",
    de: "analytische-geometrie",
    ms: "geometri-analitik",
  },
  sections: [
    "definition-of-circle",
    "ellipse",
    "equation-of-a-tangent-line-to-a-circle",
    "equation-of-circle",
    "hyperbola",
    "parabola",
    "position-of-a-line-to-a-circle",
    "position-of-a-point-to-a-circle",
    "position-of-a-tangent-line-to-a-circle",
    "position-of-two-circles",
    "tangent-line-to-conic-sections",
  ],
  slug: "analytic-geometry",
  translations: {
    en: {
      description: "Derive circle equations from center and radius.",
      title: "Analytic Geometry",
    },
    id: {
      description: "Turunkan persamaan lingkaran dari pusat dan jari-jari.",
      title: "Geometri Analitik",
    },
    de: {
      description: "Untersuche Kreise, Kegelschnitte und ihre Tangenten.",
      title: "Analytische Geometrie",
    },
    ms: {
      description: "Terbitkan persamaan bulatan daripada pusat dan jejari.",
      title: "Geometri Analitik",
    },
  },
};

export default lesson;
