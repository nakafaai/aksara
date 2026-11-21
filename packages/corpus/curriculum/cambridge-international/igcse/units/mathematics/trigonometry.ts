import { mathematicsSyllabus } from "#corpus/curriculum/cambridge-international/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** Cambridge IGCSE Mathematics 0580, topic 6 Trigonometry. */
export const igcseTrigonometryUnit = unitNode({
  children: [
    materialNode({
      key: "mathematics-0580-trigonometry-right-triangles",
      level: "lesson",
      materialKeys: ["lesson.mathematics.trigonometry"],
      order: 10,
      outcomes: [
        { code: "E6.2 Right-angled triangles", ...mathematicsSyllabus },
        { code: "E6.3 Exact trigonometric values", ...mathematicsSyllabus },
      ],
    }),
    materialNode({
      key: "mathematics-0580-trigonometry-functions",
      level: "lesson",
      materialKeys: ["lesson.mathematics.trigonometric-function"],
      order: 20,
      outcomes: [
        { code: "E6.4 Trigonometric functions", ...mathematicsSyllabus },
      ],
    }),
    materialNode({
      key: "mathematics-0580-trigonometry-any-triangle",
      level: "lesson",
      materialKeys: ["lesson.mathematics.triangle-solution"],
      order: 30,
      outcomes: [
        { code: "E6.5 Non-right-angled triangles", ...mathematicsSyllabus },
      ],
    }),
  ],
  key: "mathematics-0580-trigonometry",
  materialCard: {
    de: {
      description: "Löse Dreiecke und zeichne Winkelfunktionen.",
      title: "Trigonometrie",
    },
    en: {
      description: "Solve triangles and graph trigonometric functions.",
      title: "Trigonometry",
    },
    id: {
      description: "Selesaikan segitiga dan gambar fungsi trigonometri.",
      title: "Trigonometri",
    },
    ms: {
      description: "Selesaikan segi tiga dan lakar fungsi trigonometri.",
      title: "Trigonometri",
    },
  },
  order: 60,
  translations: {
    de: { routeSlug: "trigonometrie", title: "Trigonometrie" },
    en: { routeSlug: "trigonometry", title: "Trigonometry" },
    id: { routeSlug: "trigonometri", title: "Trigonometri" },
    ms: { routeSlug: "trigonometri", title: "Trigonometri" },
  },
});

/** Cambridge IGCSE Mathematics 0580, topic 7 Transformations and vectors. */
export const igcseTransformationsVectorsUnit = unitNode({
  children: [
    materialNode({
      key: "mathematics-0580-transformations-vectors-transformations",
      level: "lesson",
      materialKeys: ["lesson.mathematics.geometric-transformation"],
      order: 10,
      outcomes: [{ code: "E7.1 Transformations", ...mathematicsSyllabus }],
    }),
    materialNode({
      key: "mathematics-0580-transformations-vectors-vectors",
      level: "lesson",
      materialKeys: ["lesson.mathematics.vector-operations"],
      order: 20,
      outcomes: [
        { code: "E7.2 Vectors in two dimensions", ...mathematicsSyllabus },
        { code: "E7.3 Magnitude of a vector", ...mathematicsSyllabus },
        { code: "E7.4 Vector geometry", ...mathematicsSyllabus },
      ],
    }),
  ],
  key: "mathematics-0580-transformations-vectors",
  materialCard: {
    de: {
      description: "Nutze Transformationen und Vektoren in der Geometrie.",
      title: "Transformationen und Vektoren",
    },
    en: {
      description: "Use transformations and vectors in geometry.",
      title: "Transformations and vectors",
    },
    id: {
      description: "Gunakan transformasi dan vektor dalam geometri.",
      title: "Transformasi dan vektor",
    },
    ms: {
      description: "Guna transformasi dan vektor dalam geometri.",
      title: "Transformasi dan vektor",
    },
  },
  order: 70,
  translations: {
    de: {
      routeSlug: "transformationen-und-vektoren",
      title: "Transformationen und Vektoren",
    },
    en: {
      routeSlug: "transformations-and-vectors",
      title: "Transformations and vectors",
    },
    id: {
      routeSlug: "transformasi-dan-vektor",
      title: "Transformasi dan vektor",
    },
    ms: {
      routeSlug: "transformasi-dan-vektor",
      title: "Transformasi dan vektor",
    },
  },
});
