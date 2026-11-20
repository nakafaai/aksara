import {
  advancedMathematicsBookXI,
  merdekaLearningOutcomes,
} from "#corpus/curriculum/merdeka/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** Kurikulum Merdeka Kelas 11 Matematika Tingkat Lanjut, Bab 3 Fungsi Trigonometri. */
export const merdekaClass11TrigonometricFunctionUnit = unitNode({
  children: [
    materialNode({
      key: "class-11-advanced-mathematics-trigonometric-function-material",
      level: "lesson",
      materialKeys: ["lesson.mathematics.trigonometric-function"],
      order: 10,
      outcomes: [
        {
          code: "Matematika Tingkat Lanjut, Fase F, elemen Aljabar dan Fungsi",
          ...merdekaLearningOutcomes,
        },
        {
          code: "Bab 3 Fungsi Trigonometri, A sampai C",
          ...advancedMathematicsBookXI,
        },
      ],
    }),
  ],
  key: "class-11-advanced-mathematics-trigonometric-function",
  materialCard: {
    de: {
      description: "Erweitere Sinus und Kosinus auf beliebige Winkel.",
      title: "Trigonometrische Funktionen",
    },
    en: {
      description: "Extend sine and cosine to any angle.",
      title: "Trigonometric Functions",
    },
    id: {
      description: "Perluas sinus dan kosinus ke sudut apa pun.",
      title: "Fungsi Trigonometri",
    },
    ms: {
      description: "Lanjutkan sinus dan kosinus kepada sebarang sudut.",
      title: "Fungsi Trigonometri",
    },
  },
  order: 30,
  translations: {
    de: {
      routeSlug: "trigonometrische-funktionen",
      title: "Trigonometrische Funktionen",
    },
    en: {
      routeSlug: "trigonometric-functions",
      title: "Trigonometric Functions",
    },
    id: { routeSlug: "fungsi-trigonometri", title: "Fungsi Trigonometri" },
    ms: { routeSlug: "fungsi-trigonometri", title: "Fungsi Trigonometri" },
  },
});

/** Kurikulum Merdeka Kelas 11 Matematika Tingkat Lanjut, Bab 4 Vektor. */
export const merdekaClass11VectorUnit = unitNode({
  children: [
    materialNode({
      key: "class-11-advanced-mathematics-vector-operations-material",
      level: "lesson",
      materialKeys: ["lesson.mathematics.vector-operations"],
      order: 10,
      outcomes: [
        {
          code: "Matematika Tingkat Lanjut, Fase F, elemen Geometri",
          ...merdekaLearningOutcomes,
        },
        { code: "Bab 4 Vektor", ...advancedMathematicsBookXI },
      ],
    }),
  ],
  key: "class-11-advanced-mathematics-vector-operations",
  materialCard: {
    de: {
      description: "Arbeite mit Vektorschreibweise, Betrag und Richtung.",
      title: "Vektoren",
    },
    en: {
      description: "Work with vector notation and direction.",
      title: "Vectors",
    },
    id: { description: "Olah notasi dan arah vektor.", title: "Vektor" },
    ms: { description: "Guna tatatanda dan arah vektor.", title: "Vektor" },
  },
  order: 40,
  translations: {
    de: { routeSlug: "vektoren", title: "Vektoren" },
    en: { routeSlug: "vectors", title: "Vectors" },
    id: { routeSlug: "vektor", title: "Vektor" },
    ms: { routeSlug: "vektor", title: "Vektor" },
  },
});

/** Kurikulum Merdeka Kelas 11 Matematika Tingkat Lanjut, Bab 5 Transformasi Geometri. */
export const merdekaClass11GeometricTransformationUnit = unitNode({
  children: [
    materialNode({
      key: "class-11-advanced-mathematics-geometric-transformation-material",
      level: "lesson",
      materialKeys: ["lesson.mathematics.geometric-transformation"],
      order: 10,
      outcomes: [
        {
          code: "Matematika Tingkat Lanjut, Fase F, elemen Aljabar dan Fungsi",
          ...merdekaLearningOutcomes,
        },
        { code: "Bab 5 Transformasi Geometri", ...advancedMathematicsBookXI },
      ],
    }),
  ],
  key: "class-11-advanced-mathematics-geometric-transformation",
  materialCard: {
    de: {
      description: "Verbinde geometrische Transformationen mit Matrizen.",
      title: "Geometrische Transformationen",
    },
    en: {
      description: "Combine transformations with matrices.",
      title: "Geometric Transformations",
    },
    id: {
      description: "Gabungkan transformasi dengan matriks.",
      title: "Transformasi Geometri",
    },
    ms: {
      description: "Gabungkan transformasi dengan matriks.",
      title: "Transformasi Geometri",
    },
  },
  order: 50,
  translations: {
    de: {
      routeSlug: "geometrische-transformationen",
      title: "Geometrische Transformationen",
    },
    en: {
      routeSlug: "geometric-transformation",
      title: "Geometric Transformations",
    },
    id: { routeSlug: "transformasi-geometri", title: "Transformasi Geometri" },
    ms: { routeSlug: "transformasi-geometri", title: "Transformasi Geometri" },
  },
});
