import { materialNode, unitNode } from "#corpus/curriculum/schema";

export const igcseMathematicsUnitNodes = [
  unitNode({
    children: [
      materialNode({
        key: "mathematics-0580-algebra-graphs-linear-equations",
        level: "lesson",
        materialKeys: ["lesson.mathematics.linear-equation-inequality"],
        order: 10,
      }),
      materialNode({
        key: "mathematics-0580-algebra-graphs-quadratics",
        level: "lesson",
        materialKeys: ["lesson.mathematics.quadratic-function"],
        order: 20,
      }),
      materialNode({
        key: "mathematics-0580-algebra-graphs-sequences",
        level: "lesson",
        materialKeys: ["lesson.mathematics.sequence-series"],
        order: 30,
      }),
      materialNode({
        key: "mathematics-0580-algebra-graphs-functions",
        level: "lesson",
        materialKeys: ["lesson.mathematics.function-modeling"],
        order: 40,
      }),
    ],
    key: "mathematics-0580-algebra-graphs",
    materialCard: {
      de: {
        description: "Stelle Gleichungen, Graphen, Folgen und Funktionen auf.",
        title: "Algebra und Graphen",
      },
      en: {
        description: "Build equations, graphs, sequences, and functions.",
        title: "Algebra and graphs",
      },
      id: {
        description: "Bangun persamaan, grafik, barisan, dan fungsi.",
        title: "Aljabar dan grafik",
      },
    },
    order: 20,
    translations: {
      de: { routeSlug: "algebra-und-graphen", title: "Algebra und Graphen" },
      en: {
        routeSlug: "algebra-and-graphs",
        title: "Algebra and graphs",
      },
      id: {
        routeSlug: "aljabar-dan-grafik",
        title: "Aljabar dan grafik",
      },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "mathematics-0580-geometry-circles",
        level: "lesson",
        materialKeys: ["lesson.mathematics.circle"],
        order: 10,
      }),
      materialNode({
        key: "mathematics-0580-geometry-arcs-sectors",
        level: "lesson",
        materialKeys: ["lesson.mathematics.circle-arc-sector"],
        order: 20,
      }),
      materialNode({
        key: "mathematics-0580-geometry-coordinate-geometry",
        level: "lesson",
        materialKeys: ["lesson.mathematics.analytic-geometry"],
        order: 30,
      }),
      materialNode({
        key: "mathematics-0580-geometry-trigonometry",
        level: "lesson",
        materialKeys: ["lesson.mathematics.trigonometry"],
        order: 40,
      }),
    ],
    key: "mathematics-0580-geometry",
    materialCard: {
      de: {
        description: "Arbeite mit Kreisen, Koordinaten und Trigonometrie.",
        title: "Geometrie, Größenberechnung und Trigonometrie",
      },
      en: {
        description: "Work with circles, coordinates, and trigonometry.",
        title: "Geometry, mensuration, and trigonometry",
      },
      id: {
        description: "Latih lingkaran, koordinat, dan trigonometri.",
        title: "Geometri, pengukuran, dan trigonometri",
      },
    },
    order: 30,
    translations: {
      de: {
        routeSlug: "geometrie-groessenberechnung-und-trigonometrie",
        title: "Geometrie, Größenberechnung und Trigonometrie",
      },
      en: {
        routeSlug: "geometry-mensuration-and-trigonometry",
        title: "Geometry, mensuration, and trigonometry",
      },
      id: {
        routeSlug: "geometri-pengukuran-dan-trigonometri",
        title: "Geometri, pengukuran, dan trigonometri",
      },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "mathematics-0580-transformations-vectors-transformations",
        level: "lesson",
        materialKeys: ["lesson.mathematics.geometric-transformation"],
        order: 10,
      }),
      materialNode({
        key: "mathematics-0580-transformations-vectors-vectors",
        level: "lesson",
        materialKeys: ["lesson.mathematics.vector-operations"],
        order: 20,
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
    },
    order: 40,
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
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "mathematics-0580-probability-statistics-probability",
        level: "lesson",
        materialKeys: ["lesson.mathematics.probability"],
        order: 10,
      }),
      materialNode({
        key: "mathematics-0580-probability-statistics-summary-statistics",
        level: "lesson",
        materialKeys: ["lesson.mathematics.statistics-foundations"],
        order: 20,
      }),
    ],
    key: "mathematics-0580-probability-statistics",
    materialCard: {
      de: {
        description: "Berechne Wahrscheinlichkeiten und werte Daten aus.",
        title: "Wahrscheinlichkeit und Statistik",
      },
      en: {
        description: "Read chance and data with clear calculations.",
        title: "Probability and statistics",
      },
      id: {
        description: "Baca peluang dan data lewat perhitungan.",
        title: "Peluang dan statistika",
      },
    },
    order: 50,
    translations: {
      de: {
        routeSlug: "wahrscheinlichkeit-und-statistik",
        title: "Wahrscheinlichkeit und Statistik",
      },
      en: {
        routeSlug: "probability-and-statistics",
        title: "Probability and statistics",
      },
      id: {
        routeSlug: "peluang-dan-statistika",
        title: "Peluang dan statistika",
      },
    },
  }),
];
