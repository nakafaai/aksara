import {
  advancedMathematicsBookXI,
  advancedMathematicsFirstBookXI,
  merdekaLearningOutcomes,
} from "#corpus/curriculum/merdeka/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** The Kurikulum Merdeka class 11 mathematics unit `complex-number`, kept as enrichment (D11). */
export const merdekaClass11ComplexNumberUnit = unitNode({
  children: [
    materialNode({
      key: "class-11-mathematics-complex-number-material",
      level: "lesson",
      materialKeys: ["lesson.mathematics.complex-number"],
      order: 10,
      outcomes: [
        {
          code: "Bab 1 Bilangan Kompleks",
          ...advancedMathematicsFirstBookXI,
        },
      ],
    }),
  ],
  key: "class-11-mathematics-complex-number",
  materialCard: {
    de: {
      description: "Addiere komplexe Zahlen und deute sie geometrisch.",
      title: "Komplexe Zahlen",
    },
    en: {
      description: "Add complex numbers with geometry.",
      title: "Complex Numbers",
    },
    id: {
      description: "Jumlahkan bilangan kompleks lewat geometri.",
      title: "Bilangan Kompleks",
    },
    ms: {
      description: "Tambah nombor kompleks secara geometri.",
      title: "Nombor Kompleks",
    },
  },
  order: 20,
  translations: {
    de: { routeSlug: "komplexe-zahlen", title: "Komplexe Zahlen" },
    en: { routeSlug: "complex-number", title: "Complex Numbers" },
    id: { routeSlug: "bilangan-kompleks", title: "Bilangan Kompleks" },
    ms: { routeSlug: "nombor-kompleks", title: "Nombor Kompleks" },
  },
});

/** The Kurikulum Merdeka class 11 mathematics unit `function-modeling`, a Matematika Tingkat Lanjut chapter. */
export const merdekaClass11FunctionModelingUnit = unitNode({
  children: [
    materialNode({
      key: "class-11-mathematics-function-modeling-material",
      level: "lesson",
      materialKeys: ["lesson.mathematics.function-modeling"],
      order: 10,
      outcomes: [
        {
          code: "Matematika Tingkat Lanjut, Fase F, elemen Aljabar dan Fungsi",
          ...merdekaLearningOutcomes,
        },
        {
          code: "Bab 3 Fungsi Trigonometri",
          ...advancedMathematicsBookXI,
        },
        {
          code: "Bab 6 Fungsi dan Pemodelannya",
          ...advancedMathematicsBookXI,
        },
      ],
    }),
  ],
  key: "class-11-mathematics-function-modeling",
  materialCard: {
    de: {
      description: "Modelliere das Verhalten von Betragsfunktionen.",
      title: "Funktionsmodellierung",
    },
    en: {
      description: "Model absolute value behavior.",
      title: "Function Modeling",
    },
    id: {
      description: "Modelkan perilaku nilai mutlak.",
      title: "Pemodelan Fungsi",
    },
    ms: {
      description: "Modelkan kelakuan nilai mutlak.",
      title: "Pemodelan Fungsi",
    },
  },
  order: 40,
  translations: {
    de: {
      routeSlug: "funktionsmodellierung",
      title: "Funktionsmodellierung",
    },
    en: { routeSlug: "function-modeling", title: "Function Modeling" },
    id: { routeSlug: "fungsi-dan-pemodelannya", title: "Pemodelan Fungsi" },
    ms: { routeSlug: "pemodelan-fungsi", title: "Pemodelan Fungsi" },
  },
});

/** The Kurikulum Merdeka class 11 mathematics unit `geometric-transformation`, a Matematika Tingkat Lanjut chapter. */
export const merdekaClass11GeometricTransformationUnit = unitNode({
  children: [
    materialNode({
      key: "class-11-mathematics-geometric-transformation-material",
      level: "lesson",
      materialKeys: ["lesson.mathematics.geometric-transformation"],
      order: 10,
      outcomes: [
        {
          code: "Matematika Tingkat Lanjut, Fase F, elemen Aljabar dan Fungsi",
          ...merdekaLearningOutcomes,
        },
        {
          code: "Bab 5 Transformasi Geometri",
          ...advancedMathematicsBookXI,
        },
      ],
    }),
  ],
  key: "class-11-mathematics-geometric-transformation",
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
    id: {
      routeSlug: "transformasi-geometri",
      title: "Transformasi Geometri",
    },
    ms: {
      routeSlug: "transformasi-geometri",
      title: "Transformasi Geometri",
    },
  },
});

/** The Kurikulum Merdeka class 11 mathematics unit `matrix`, a Matematika Tingkat Lanjut chapter. */
export const merdekaClass11MatrixUnit = unitNode({
  children: [
    materialNode({
      key: "class-11-mathematics-matrix-material",
      level: "lesson",
      materialKeys: ["lesson.mathematics.matrix"],
      order: 10,
      outcomes: [
        {
          code: "Matematika Tingkat Lanjut, Fase F, elemen Aljabar dan Fungsi",
          ...merdekaLearningOutcomes,
        },
        { code: "Bab 1 Matriks", ...advancedMathematicsBookXI },
      ],
    }),
  ],
  key: "class-11-mathematics-matrix",
  materialCard: {
    de: {
      description: "Berechne Determinanten mithilfe von Minoren.",
      title: "Matrizen",
    },
    en: {
      description: "Compute determinants from minors.",
      title: "Matrices",
    },
    id: { description: "Hitung determinan dari minor.", title: "Matriks" },
    ms: { description: "Kira penentu daripada minor.", title: "Matriks" },
  },
  order: 60,
  translations: {
    de: { routeSlug: "matrizen", title: "Matrizen" },
    en: { routeSlug: "matrix", title: "Matrices" },
    id: { routeSlug: "matriks", title: "Matriks" },
    ms: { routeSlug: "matriks", title: "Matriks" },
  },
});

/** The Kurikulum Merdeka class 11 mathematics unit `polynomial`, a Matematika Tingkat Lanjut chapter. */
export const merdekaClass11PolynomialUnit = unitNode({
  children: [
    materialNode({
      key: "class-11-mathematics-polynomial-material",
      level: "lesson",
      materialKeys: ["lesson.mathematics.polynomial"],
      order: 10,
      outcomes: [
        {
          code: "Matematika Tingkat Lanjut, Fase F, elemen Aljabar dan Fungsi",
          ...merdekaLearningOutcomes,
        },
        { code: "Bab 2 Polinomial", ...advancedMathematicsBookXI },
      ],
    }),
  ],
  key: "class-11-mathematics-polynomial",
  materialCard: {
    de: {
      description: "Fasse gleichartige Terme in Polynomen zusammen.",
      title: "Polynome",
    },
    en: {
      description: "Combine like terms in polynomials.",
      title: "Polynomials",
    },
    id: {
      description: "Gabungkan suku sejenis polinomial.",
      title: "Polinomial",
    },
    ms: {
      description: "Gabungkan sebutan serupa dalam polinomial.",
      title: "Polinomial",
    },
  },
  order: 70,
  translations: {
    de: { routeSlug: "polynome", title: "Polynome" },
    en: { routeSlug: "polynomial", title: "Polynomials" },
    id: { routeSlug: "polinomial", title: "Polinomial" },
    ms: { routeSlug: "polinomial", title: "Polinomial" },
  },
});
