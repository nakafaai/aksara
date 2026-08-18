import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsAnalyticGeometryMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/mathematics/analytic-geometry",
  domain: "mathematics",
  key: "lesson.mathematics.analytic-geometry",
  kind: "lesson",
  routeSlugs: { en: "analytic-geometry", id: "geometri-analitik" },
  sections: [
    {
      routeSlugs: { en: "definition-of-circle", id: "definisi-lingkaran" },
      slug: "definition-of-circle",
    },
    {
      routeSlugs: { en: "ellipse", id: "elips" },
      slug: "ellipse",
    },
    {
      routeSlugs: {
        en: "equation-of-a-tangent-line-to-a-circle",
        id: "persamaan-garis-singgung-lingkaran",
      },
      slug: "equation-of-a-tangent-line-to-a-circle",
    },
    {
      routeSlugs: { en: "equation-of-circle", id: "persamaan-lingkaran" },
      slug: "equation-of-circle",
    },
    {
      routeSlugs: { en: "hyperbola", id: "hiperbola" },
      slug: "hyperbola",
    },
    {
      routeSlugs: { en: "parabola", id: "parabola" },
      slug: "parabola",
    },
    {
      routeSlugs: {
        en: "position-of-a-line-to-a-circle",
        id: "kedudukan-garis-terhadap-lingkaran",
      },
      slug: "position-of-a-line-to-a-circle",
    },
    {
      routeSlugs: {
        en: "position-of-a-point-to-a-circle",
        id: "kedudukan-suatu-titik-terhadap-lingkaran",
      },
      slug: "position-of-a-point-to-a-circle",
    },
    {
      routeSlugs: {
        en: "position-of-a-tangent-line-to-a-circle",
        id: "kedudukan-garis-singgung-lingkaran",
      },
      slug: "position-of-a-tangent-line-to-a-circle",
    },
    {
      routeSlugs: {
        en: "position-of-two-circles",
        id: "kedudukan-dua-lingkaran",
      },
      slug: "position-of-two-circles",
    },
    {
      routeSlugs: {
        en: "tangent-line-to-conic-sections",
        id: "garis-singgung-pada-irisan-kerucut",
      },
      slug: "tangent-line-to-conic-sections",
    },
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
  },
});
