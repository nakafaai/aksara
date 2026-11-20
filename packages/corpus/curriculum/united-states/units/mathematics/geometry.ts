import { materialNode, unitNode } from "#corpus/curriculum/schema";
import { mathematicsStandards } from "#corpus/curriculum/united-states/documents";

/** United States high school, CCSS conceptual category Geometry. */
export const usGeometryUnit = unitNode({
  children: [
    materialNode({
      key: "us-high-school-mathematics-geometry-transformations",
      level: "lesson",
      materialKeys: ["lesson.mathematics.geometric-transformation"],
      order: 10,
      outcomes: [{ code: "G-CO Congruence", ...mathematicsStandards }],
    }),
    materialNode({
      key: "us-high-school-mathematics-geometry-trigonometry",
      level: "lesson",
      materialKeys: ["lesson.mathematics.trigonometry"],
      order: 20,
      outcomes: [
        {
          code: "G-SRT Similarity, Right Triangles, and Trigonometry",
          ...mathematicsStandards,
        },
      ],
    }),
    materialNode({
      key: "us-high-school-mathematics-geometry-any-triangle",
      level: "lesson",
      materialKeys: ["lesson.mathematics.triangle-solution"],
      order: 30,
      outcomes: [
        {
          code: "G-SRT Similarity, Right Triangles, and Trigonometry",
          ...mathematicsStandards,
        },
      ],
    }),
    materialNode({
      key: "us-high-school-mathematics-geometry-circle",
      level: "lesson",
      materialKeys: ["lesson.mathematics.circle"],
      order: 40,
      outcomes: [{ code: "G-C Circles", ...mathematicsStandards }],
    }),
    materialNode({
      key: "us-high-school-mathematics-geometry-arcs-sectors",
      level: "lesson",
      materialKeys: ["lesson.mathematics.circle-arc-sector"],
      order: 50,
      outcomes: [{ code: "G-C Circles", ...mathematicsStandards }],
    }),
    materialNode({
      key: "us-high-school-mathematics-geometry-coordinate",
      level: "lesson",
      materialKeys: ["lesson.mathematics.analytic-geometry"],
      order: 60,
      outcomes: [
        {
          code: "G-GPE Expressing Geometric Properties with Equations",
          ...mathematicsStandards,
        },
      ],
    }),
    materialNode({
      key: "us-high-school-mathematics-geometry-lines",
      level: "lesson",
      materialKeys: ["lesson.mathematics.coordinate-geometry"],
      order: 70,
      outcomes: [
        {
          code: "G-GPE Expressing Geometric Properties with Equations",
          ...mathematicsStandards,
        },
      ],
    }),
  ],
  key: "high-school-mathematics-geometry",
  materialCard: {
    de: {
      description: "Arbeite mit Kreisen, Koordinaten und Trigonometrie.",
      title: "Geometrie",
    },
    en: {
      description: "Use circles, coordinates, and trigonometry.",
      title: "Geometry",
    },
    id: {
      description: "Gunakan lingkaran, koordinat, dan trigonometri.",
      title: "Geometri",
    },
    ms: {
      description: "Guna bulatan, koordinat dan trigonometri.",
      title: "Geometri",
    },
  },
  order: 40,
  translations: {
    de: { routeSlug: "geometrie", title: "Geometrie" },
    en: { routeSlug: "geometry", title: "Geometry" },
    id: { routeSlug: "geometri", title: "Geometri" },
    ms: { routeSlug: "geometri", title: "Geometri" },
  },
});
