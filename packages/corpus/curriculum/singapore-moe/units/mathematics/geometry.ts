import { materialNode, unitNode } from "#corpus/curriculum/schema";
import { mathematicsSyllabus } from "#corpus/curriculum/singapore-moe/documents";

/** Singapore SEC G3 Mathematics (K310), strand Geometry and Measurement. */
export const singaporeGeometryMeasurementUnit = unitNode({
  children: [
    materialNode({
      key: "singapore-secondary-mathematics-geometry-measurement-circles",
      level: "lesson",
      materialKeys: ["lesson.mathematics.circle"],
      order: 10,
      outcomes: [{ code: "G3 Properties of circles", ...mathematicsSyllabus }],
    }),
    materialNode({
      key: "singapore-secondary-mathematics-geometry-measurement-trigonometry",
      level: "lesson",
      materialKeys: ["lesson.mathematics.trigonometry"],
      order: 20,
      outcomes: [
        {
          code: "G4 Pythagoras' theorem and trigonometry",
          ...mathematicsSyllabus,
        },
      ],
    }),
    materialNode({
      key: "singapore-secondary-mathematics-geometry-measurement-any-triangle",
      level: "lesson",
      materialKeys: ["lesson.mathematics.triangle-solution"],
      order: 30,
      outcomes: [
        {
          code: "G4 Pythagoras' theorem and trigonometry",
          ...mathematicsSyllabus,
        },
      ],
    }),
    materialNode({
      key: "singapore-secondary-mathematics-geometry-measurement-arcs-sectors",
      level: "lesson",
      materialKeys: ["lesson.mathematics.circle-arc-sector"],
      order: 40,
      outcomes: [{ code: "G5 Mensuration", ...mathematicsSyllabus }],
    }),
    materialNode({
      key: "singapore-secondary-mathematics-geometry-measurement-coordinate-geometry",
      level: "lesson",
      materialKeys: ["lesson.mathematics.coordinate-geometry"],
      order: 50,
      outcomes: [{ code: "G6 Coordinate geometry", ...mathematicsSyllabus }],
    }),
    materialNode({
      key: "singapore-secondary-mathematics-geometry-measurement-vectors",
      level: "lesson",
      materialKeys: ["lesson.mathematics.vector-operations"],
      order: 60,
      outcomes: [
        { code: "G7 Vectors in two dimensions", ...mathematicsSyllabus },
      ],
    }),
  ],
  key: "secondary-mathematics-geometry-measurement",
  materialCard: {
    de: {
      description: "Miss Winkel, Kreise, Dreiecke und Vektoren.",
      title: "Geometrie und Messen",
    },
    en: {
      description: "Measure angles, circles, triangles, and vectors.",
      title: "Geometry and measurement",
    },
    id: {
      description: "Ukur sudut, lingkaran, segitiga, dan vektor.",
      title: "Geometri dan pengukuran",
    },
    ms: {
      description: "Ukur sudut, bulatan, segi tiga dan vektor.",
      title: "Geometri dan pengukuran",
    },
  },
  order: 20,
  translations: {
    de: { routeSlug: "geometrie-und-messen", title: "Geometrie und Messen" },
    en: {
      routeSlug: "geometry-and-measurement",
      title: "Geometry and measurement",
    },
    id: {
      routeSlug: "geometri-dan-pengukuran",
      title: "Geometri dan pengukuran",
    },
    ms: {
      routeSlug: "geometri-dan-pengukuran",
      title: "Geometri dan pengukuran",
    },
  },
});
