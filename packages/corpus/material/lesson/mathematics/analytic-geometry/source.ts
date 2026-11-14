import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsAnalyticGeometryMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/mathematics/analytic-geometry",
  domain: "mathematics",
  key: "lesson.mathematics.analytic-geometry",
  kind: "lesson",
  routeSlugs: {
    de: "analytische-geometrie",
    en: "analytic-geometry",
    id: "geometri-analitik",
    ms: "geometri-analitik",
  },
  sections: [
    {
      routeSlugs: {
        de: "kreisdefinition",
        en: "definition-of-circle",
        id: "definisi-lingkaran",
        ms: "definisi-bulatan",
      },
      slug: "definition-of-circle",
    },
    {
      routeSlugs: { de: "ellipse", en: "ellipse", id: "elips", ms: "elips" },
      slug: "ellipse",
    },
    {
      routeSlugs: {
        de: "tangentengleichung-am-kreis",
        en: "equation-of-a-tangent-line-to-a-circle",
        id: "persamaan-garis-singgung-lingkaran",
        ms: "persamaan-tangen-kepada-bulatan",
      },
      slug: "equation-of-a-tangent-line-to-a-circle",
    },
    {
      routeSlugs: {
        de: "kreisgleichung",
        en: "equation-of-circle",
        id: "persamaan-lingkaran",
        ms: "persamaan-bulatan",
      },
      slug: "equation-of-circle",
    },
    {
      routeSlugs: {
        de: "hyperbel",
        en: "hyperbola",
        id: "hiperbola",
        ms: "hiperbola",
      },
      slug: "hyperbola",
    },
    {
      routeSlugs: {
        de: "parabel",
        en: "parabola",
        id: "parabola",
        ms: "parabola",
      },
      slug: "parabola",
    },
    {
      routeSlugs: {
        de: "lage-einer-geraden-zum-kreis",
        en: "position-of-a-line-to-a-circle",
        id: "kedudukan-garis-terhadap-lingkaran",
        ms: "kedudukan-garis-terhadap-bulatan",
      },
      slug: "position-of-a-line-to-a-circle",
    },
    {
      routeSlugs: {
        de: "lage-eines-punktes-zum-kreis",
        en: "position-of-a-point-to-a-circle",
        id: "kedudukan-suatu-titik-terhadap-lingkaran",
        ms: "kedudukan-titik-terhadap-bulatan",
      },
      slug: "position-of-a-point-to-a-circle",
    },
    {
      routeSlugs: {
        de: "lage-einer-tangente-zum-kreis",
        en: "position-of-a-tangent-line-to-a-circle",
        id: "kedudukan-garis-singgung-lingkaran",
        ms: "kedudukan-tangen-bulatan",
      },
      slug: "position-of-a-tangent-line-to-a-circle",
    },
    {
      routeSlugs: {
        de: "lage-zweier-kreise",
        en: "position-of-two-circles",
        id: "kedudukan-dua-lingkaran",
        ms: "kedudukan-dua-bulatan",
      },
      slug: "position-of-two-circles",
    },
    {
      routeSlugs: {
        de: "tangenten-an-kegelschnitte",
        en: "tangent-line-to-conic-sections",
        id: "garis-singgung-pada-irisan-kerucut",
        ms: "tangen-kepada-keratan-kon",
      },
      slug: "tangent-line-to-conic-sections",
    },
  ],
  slug: "analytic-geometry",
  translations: {
    de: {
      description: "Untersuche Kreise, Kegelschnitte und ihre Tangenten.",
      title: "Analytische Geometrie",
    },
    en: {
      description: "Derive circle equations from center and radius.",
      title: "Analytic Geometry",
    },
    id: {
      description: "Turunkan persamaan lingkaran dari pusat dan jari-jari.",
      title: "Geometri Analitik",
    },
    ms: {
      description: "Terbitkan persamaan bulatan daripada pusat dan jejari.",
      title: "Geometri Analitik",
    },
  },
});
