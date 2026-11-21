import { materialNode, unitNode } from "#corpus/curriculum/schema";
import { additionalMathematicsSyllabus } from "#corpus/curriculum/singapore-moe/documents";

/** Singapore SEC G3 Additional Mathematics (K341), strand Geometry and Trigonometry. */
export const singaporeAdditionalGeometryUnit = unitNode({
  children: [
    materialNode({
      key: "singapore-secondary-additional-mathematics-geometry-trigonometry-trigonometric-functions",
      level: "lesson",
      materialKeys: ["lesson.mathematics.trigonometric-function"],
      order: 10,
      outcomes: [
        {
          code: "G1 Trigonometric functions, identities and equations",
          ...additionalMathematicsSyllabus,
        },
      ],
    }),
    materialNode({
      key: "singapore-secondary-additional-mathematics-geometry-trigonometry-coordinate-geometry",
      level: "lesson",
      materialKeys: ["lesson.mathematics.coordinate-geometry"],
      order: 20,
      outcomes: [
        {
          code: "G2 Coordinate geometry in two dimensions",
          ...additionalMathematicsSyllabus,
        },
      ],
    }),
    materialNode({
      key: "singapore-secondary-additional-mathematics-geometry-trigonometry-circles-curves",
      level: "lesson",
      materialKeys: ["lesson.mathematics.analytic-geometry"],
      order: 30,
      outcomes: [
        {
          code: "G2 Coordinate geometry in two dimensions",
          ...additionalMathematicsSyllabus,
        },
        {
          code: "A2 Equations and inequalities",
          ...additionalMathematicsSyllabus,
        },
      ],
    }),
    materialNode({
      key: "singapore-secondary-additional-mathematics-geometry-trigonometry-linear-law",
      level: "lesson",
      materialKeys: ["lesson.mathematics.linear-law"],
      order: 40,
      outcomes: [
        {
          code: "G2 Coordinate geometry in two dimensions",
          ...additionalMathematicsSyllabus,
        },
      ],
    }),
  ],
  key: "secondary-additional-mathematics-geometry-trigonometry",
  materialCard: {
    de: {
      description: "Löse Winkelgleichungen und rechne mit Geraden.",
      title: "Geometrie und Trigonometrie",
    },
    en: {
      description: "Solve trigonometric equations and work with lines.",
      title: "Geometry and trigonometry",
    },
    id: {
      description: "Selesaikan persamaan trigonometri dan olah garis.",
      title: "Geometri dan trigonometri",
    },
    ms: {
      description: "Selesaikan persamaan trigonometri dan olah garis.",
      title: "Geometri dan trigonometri",
    },
  },
  order: 20,
  translations: {
    de: {
      routeSlug: "geometrie-und-trigonometrie",
      title: "Geometrie und Trigonometrie",
    },
    en: {
      routeSlug: "geometry-and-trigonometry",
      title: "Geometry and trigonometry",
    },
    id: {
      routeSlug: "geometri-dan-trigonometri",
      title: "Geometri dan trigonometri",
    },
    ms: {
      routeSlug: "geometri-dan-trigonometri",
      title: "Geometri dan trigonometri",
    },
  },
});
