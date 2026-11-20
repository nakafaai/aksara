import { additionalMathematicsStandards } from "#corpus/curriculum/kssm/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** The KSSM Form 4 Additional Mathematics geometry chapters, coordinate geometry to the solution of triangles, in the order of their DSKP. */
export const kssmForm4AdditionalMathematicsGeometryNodes = [
  unitNode({
    children: [
      materialNode({
        key: "form-4-additional-mathematics-coordinate-geometry-coordinate-geometry",
        level: "lesson",
        materialKeys: ["lesson.mathematics.coordinate-geometry"],
        order: 10,
        outcomes: [
          {
            code: "Form 4, Content Standards 7.1 to 7.4",
            ...additionalMathematicsStandards,
          },
        ],
      }),
    ],
    key: "form-4-additional-mathematics-coordinate-geometry",
    materialCard: {
      de: {
        description: "Teile Strecken, berechne Flächen, finde Ortslinien.",
        title: "Koordinatengeometrie",
      },
      en: {
        description: "Divide segments, find areas and build loci.",
        title: "Coordinate Geometry",
      },
      id: {
        description: "Bagi ruas garis, hitung luas, dan susun lokus.",
        title: "Geometri Koordinat",
      },
      ms: {
        description: "Bahagi tembereng, kira luas dan bina lokus.",
        title: "Geometri Koordinat",
      },
    },
    order: 70,
    translations: {
      de: { routeSlug: "koordinatengeometrie", title: "Koordinatengeometrie" },
      en: { routeSlug: "coordinate-geometry", title: "Coordinate Geometry" },
      id: { routeSlug: "geometri-koordinat", title: "Geometri Koordinat" },
      ms: { routeSlug: "geometri-koordinat", title: "Geometri Koordinat" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-4-additional-mathematics-vectors-vector-operations",
        level: "lesson",
        materialKeys: ["lesson.mathematics.vector-operations"],
        order: 10,
        outcomes: [
          {
            code: "Form 4, Content Standards 8.1 to 8.3",
            ...additionalMathematicsStandards,
          },
        ],
      }),
    ],
    key: "form-4-additional-mathematics-vectors",
    materialCard: {
      de: {
        description: "Addiere, subtrahiere und skaliere Vektoren.",
        title: "Vektoren",
      },
      en: {
        description: "Add, subtract and scale vectors.",
        title: "Vectors",
      },
      id: {
        description: "Jumlahkan, kurangkan, dan skalakan vektor.",
        title: "Vektor",
      },
      ms: {
        description: "Tambah, tolak dan darab vektor dengan skalar.",
        title: "Vektor",
      },
    },
    order: 80,
    translations: {
      de: { routeSlug: "vektoren", title: "Vektoren" },
      en: { routeSlug: "vectors", title: "Vectors" },
      id: { routeSlug: "vektor", title: "Vektor" },
      ms: { routeSlug: "vektor", title: "Vektor" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-4-additional-mathematics-solution-of-triangles-triangle-solution",
        level: "lesson",
        materialKeys: ["lesson.mathematics.triangle-solution"],
        order: 10,
        outcomes: [
          {
            code: "Form 4, Content Standards 9.1 to 9.4",
            ...additionalMathematicsStandards,
          },
        ],
      }),
    ],
    key: "form-4-additional-mathematics-solution-of-triangles",
    materialCard: {
      de: {
        description: "Nutze Sinussatz, Kosinussatz und Flächenformeln.",
        title: "Dreiecksberechnung",
      },
      en: {
        description: "Use the sine rule, cosine rule and area formulas.",
        title: "Solution of Triangles",
      },
      id: {
        description: "Pakai aturan sinus, kosinus, dan rumus luas.",
        title: "Penyelesaian Segitiga",
      },
      ms: {
        description: "Guna petua sinus, petua kosinus dan rumus luas.",
        title: "Penyelesaian Segi Tiga",
      },
    },
    order: 90,
    translations: {
      de: { routeSlug: "dreiecksberechnung", title: "Dreiecksberechnung" },
      en: {
        routeSlug: "solution-of-triangles",
        title: "Solution of Triangles",
      },
      id: {
        routeSlug: "penyelesaian-segitiga",
        title: "Penyelesaian Segitiga",
      },
      ms: {
        routeSlug: "penyelesaian-segi-tiga",
        title: "Penyelesaian Segi Tiga",
      },
    },
  }),
];
