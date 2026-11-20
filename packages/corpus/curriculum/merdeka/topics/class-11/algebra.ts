import {
  advancedMathematicsBookXI,
  advancedMathematicsFirstBookXI,
  merdekaLearningOutcomes,
} from "#corpus/curriculum/merdeka/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** Kurikulum Merdeka Kelas 11 Matematika Tingkat Lanjut, Bab 1 Matriks. */
export const merdekaClass11MatrixUnit = unitNode({
  children: [
    materialNode({
      key: "class-11-advanced-mathematics-matrix-material",
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
  key: "class-11-advanced-mathematics-matrix",
  materialCard: {
    de: {
      description: "Berechne Determinanten mithilfe von Minoren.",
      title: "Matrizen",
    },
    en: { description: "Compute determinants from minors.", title: "Matrices" },
    id: { description: "Hitung determinan dari minor.", title: "Matriks" },
    ms: { description: "Kira penentu daripada minor.", title: "Matriks" },
  },
  order: 10,
  translations: {
    de: { routeSlug: "matrizen", title: "Matrizen" },
    en: { routeSlug: "matrix", title: "Matrices" },
    id: { routeSlug: "matriks", title: "Matriks" },
    ms: { routeSlug: "matriks", title: "Matriks" },
  },
});

/** Kurikulum Merdeka Kelas 11 Matematika Tingkat Lanjut, Bab 2 Polinomial. */
export const merdekaClass11PolynomialUnit = unitNode({
  children: [
    materialNode({
      key: "class-11-advanced-mathematics-polynomial-material",
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
  key: "class-11-advanced-mathematics-polynomial",
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
  order: 20,
  translations: {
    de: { routeSlug: "polynome", title: "Polynome" },
    en: { routeSlug: "polynomial", title: "Polynomials" },
    id: { routeSlug: "polinomial", title: "Polinomial" },
    ms: { routeSlug: "polinomial", title: "Polinomial" },
  },
});

/** Kurikulum Merdeka Kelas 11 Matematika Tingkat Lanjut, Bab 6 Fungsi dan Pemodelannya. */
export const merdekaClass11FunctionModelingUnit = unitNode({
  children: [
    materialNode({
      key: "class-11-advanced-mathematics-function-modeling-material",
      level: "lesson",
      materialKeys: ["lesson.mathematics.function-modeling"],
      order: 10,
      outcomes: [
        {
          code: "Matematika Tingkat Lanjut, Fase F, elemen Aljabar dan Fungsi",
          ...merdekaLearningOutcomes,
        },
        { code: "Bab 3 Fungsi Trigonometri", ...advancedMathematicsBookXI },
        { code: "Bab 6 Fungsi dan Pemodelannya", ...advancedMathematicsBookXI },
      ],
    }),
  ],
  key: "class-11-advanced-mathematics-function-modeling",
  materialCard: {
    de: {
      description: "Modelliere das Verhalten von Betragsfunktionen.",
      title: "Funktionen und Modellierung",
    },
    en: {
      description: "Model absolute value behavior.",
      title: "Functions and Modeling",
    },
    id: {
      description: "Modelkan perilaku nilai mutlak.",
      title: "Fungsi dan Pemodelannya",
    },
    ms: {
      description: "Modelkan kelakuan nilai mutlak.",
      title: "Fungsi dan Pemodelannya",
    },
  },
  order: 60,
  translations: {
    de: {
      routeSlug: "funktionen-und-modellierung",
      title: "Funktionen und Modellierung",
    },
    en: {
      routeSlug: "functions-and-modeling",
      title: "Functions and Modeling",
    },
    id: {
      routeSlug: "fungsi-dan-pemodelannya",
      title: "Fungsi dan Pemodelannya",
    },
    ms: {
      routeSlug: "fungsi-dan-pemodelannya",
      title: "Fungsi dan Pemodelannya",
    },
  },
});

/** Kurikulum Merdeka Kelas 11 Matematika Tingkat Lanjut, enrichment kept by D11 (first edition, Bab 1). */
export const merdekaClass11ComplexNumberUnit = unitNode({
  children: [
    materialNode({
      key: "class-11-advanced-mathematics-complex-number-material",
      level: "lesson",
      materialKeys: ["lesson.mathematics.complex-number"],
      order: 10,
      outcomes: [
        { code: "Bab 1 Bilangan Kompleks", ...advancedMathematicsFirstBookXI },
      ],
    }),
  ],
  key: "class-11-advanced-mathematics-complex-number",
  materialCard: {
    de: {
      description: "Addiere komplexe Zahlen und deute sie geometrisch.",
      title: "Komplexe Zahlen (Vertiefung)",
    },
    en: {
      description: "Add complex numbers with geometry.",
      title: "Complex Numbers (Enrichment)",
    },
    id: {
      description: "Jumlahkan bilangan kompleks lewat geometri.",
      title: "Bilangan Kompleks (Pengayaan)",
    },
    ms: {
      description: "Tambah nombor kompleks secara geometri.",
      title: "Nombor Kompleks (Pengayaan)",
    },
  },
  order: 70,
  translations: {
    de: { routeSlug: "komplexe-zahlen", title: "Komplexe Zahlen (Vertiefung)" },
    en: { routeSlug: "complex-number", title: "Complex Numbers (Enrichment)" },
    id: {
      routeSlug: "bilangan-kompleks",
      title: "Bilangan Kompleks (Pengayaan)",
    },
    ms: { routeSlug: "nombor-kompleks", title: "Nombor Kompleks (Pengayaan)" },
  },
});
