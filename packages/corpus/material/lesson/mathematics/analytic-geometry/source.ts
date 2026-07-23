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
      translations: {
        en: {
          title: "Definition of Circle",
        },
        id: {
          title: "Definisi Lingkaran",
        },
      },
    },
    {
      routeSlugs: { en: "ellipse", id: "elips" },
      slug: "ellipse",
      translations: {
        en: {
          title: "Ellipse",
        },
        id: {
          title: "Elips",
        },
      },
    },
    {
      routeSlugs: {
        en: "equation-of-a-tangent-line-to-a-circle",
        id: "persamaan-garis-singgung-lingkaran",
      },
      slug: "equation-of-a-tangent-line-to-a-circle",
      translations: {
        en: {
          title: "Equation of a Tangent Line to a Circle",
        },
        id: {
          title: "Persamaan Garis Singgung Lingkaran",
        },
      },
    },
    {
      routeSlugs: { en: "equation-of-circle", id: "persamaan-lingkaran" },
      slug: "equation-of-circle",
      translations: {
        en: {
          title: "Equation of Circle",
        },
        id: {
          title: "Persamaan Lingkaran",
        },
      },
    },
    {
      routeSlugs: { en: "hyperbola", id: "hiperbola" },
      slug: "hyperbola",
      translations: {
        en: {
          title: "Hyperbola",
        },
        id: {
          title: "Hiperbola",
        },
      },
    },
    {
      routeSlugs: { en: "parabola", id: "parabola" },
      slug: "parabola",
      translations: {
        en: {
          title: "Parabola",
        },
        id: {
          title: "Parabola",
        },
      },
    },
    {
      routeSlugs: {
        en: "position-of-a-line-to-a-circle",
        id: "kedudukan-garis-terhadap-lingkaran",
      },
      slug: "position-of-a-line-to-a-circle",
      translations: {
        en: {
          title: "Position of a Line to a Circle",
        },
        id: {
          title: "Kedudukan Garis Terhadap Lingkaran",
        },
      },
    },
    {
      routeSlugs: {
        en: "position-of-a-point-to-a-circle",
        id: "kedudukan-suatu-titik-terhadap-lingkaran",
      },
      slug: "position-of-a-point-to-a-circle",
      translations: {
        en: {
          title: "Position of a Point to a Circle",
        },
        id: {
          title: "Kedudukan Suatu Titik Terhadap Lingkaran",
        },
      },
    },
    {
      routeSlugs: {
        en: "position-of-a-tangent-line-to-a-circle",
        id: "kedudukan-garis-singgung-lingkaran",
      },
      slug: "position-of-a-tangent-line-to-a-circle",
      translations: {
        en: {
          title: "Position of a Tangent Line to a Circle",
        },
        id: {
          title: "Kedudukan Garis Singgung Lingkaran",
        },
      },
    },
    {
      routeSlugs: {
        en: "position-of-two-circles",
        id: "kedudukan-dua-lingkaran",
      },
      slug: "position-of-two-circles",
      translations: {
        en: {
          title: "Position of Two Circles",
        },
        id: {
          title: "Kedudukan Dua Lingkaran",
        },
      },
    },
    {
      routeSlugs: {
        en: "tangent-line-to-conic-sections",
        id: "garis-singgung-pada-irisan-kerucut",
      },
      slug: "tangent-line-to-conic-sections",
      translations: {
        en: {
          title: "Tangent Line to Conic Sections",
        },
        id: {
          title: "Garis Singgung pada Irisan Kerucut",
        },
      },
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
