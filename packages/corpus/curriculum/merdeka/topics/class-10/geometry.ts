import {
  advancedMathematicsBookXI,
  mathematicsBookX,
  merdekaLearningOutcomes,
} from "#corpus/curriculum/merdeka/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** The Kurikulum Merdeka class 10 mathematics unit `trigonometry`. */
export const merdekaClass10TrigonometryUnit = unitNode({
  children: [
    materialNode({
      key: "class-10-mathematics-trigonometry-material",
      level: "lesson",
      materialKeys: ["lesson.mathematics.trigonometry"],
      order: 10,
      outcomes: [
        {
          code: "Matematika, Fase E, elemen Geometri",
          document: merdekaLearningOutcomes,
        },
        {
          code: "Bab 3 Perbandingan Trigonometri",
          document: mathematicsBookX,
        },
      ],
    }),
  ],
  key: "class-10-mathematics-trigonometry",
  materialCard: {
    de: {
      description: "Ordne Dreiecksseiten den passenden Verhältnissen zu.",
      title: "Trigonometrie",
    },
    en: {
      description: "Match triangle sides to ratios.",
      title: "Trigonometry",
    },
    id: {
      description: "Cocokkan sisi segitiga dengan rasio.",
      title: "Trigonometri",
    },
    ms: {
      description: "Padankan sisi segi tiga dengan nisbahnya.",
      title: "Trigonometri",
    },
  },
  order: 70,
  translations: {
    de: { routeSlug: "trigonometrie", title: "Trigonometrie" },
    en: { routeSlug: "trigonometry", title: "Trigonometry" },
    id: { routeSlug: "trigonometri", title: "Trigonometri" },
    ms: { routeSlug: "trigonometri", title: "Trigonometri" },
  },
});

/** The Kurikulum Merdeka class 10 mathematics unit `vector-operations`, a Matematika Tingkat Lanjut chapter until D11 moves it. */
export const merdekaClass10VectorOperationsUnit = unitNode({
  children: [
    materialNode({
      key: "class-10-mathematics-vector-operations-material",
      level: "lesson",
      materialKeys: ["lesson.mathematics.vector-operations"],
      order: 10,
      outcomes: [
        {
          code: "Matematika Tingkat Lanjut, Fase F, elemen Geometri",
          document: merdekaLearningOutcomes,
        },
        { code: "Bab 4 Vektor", document: advancedMathematicsBookXI },
      ],
    }),
  ],
  key: "class-10-mathematics-vector-operations",
  materialCard: {
    de: {
      description: "Arbeite mit Vektorschreibweise, Betrag und Richtung.",
      title: "Vektorrechnung",
    },
    en: {
      description: "Work with vector notation and direction.",
      title: "Vector Operations",
    },
    id: {
      description: "Olah notasi dan arah vektor.",
      title: "Operasi Vektor",
    },
    ms: {
      description: "Guna tatatanda dan arah vektor.",
      title: "Operasi Vektor",
    },
  },
  order: 80,
  translations: {
    de: { routeSlug: "vektorrechnung", title: "Vektorrechnung" },
    en: { routeSlug: "vector-operations", title: "Vector Operations" },
    id: { routeSlug: "vektor-dan-operasinya", title: "Operasi Vektor" },
    ms: { routeSlug: "operasi-vektor", title: "Operasi Vektor" },
  },
});
