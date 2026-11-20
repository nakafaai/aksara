import {
  coreCurriculum,
  educationStandards,
} from "#corpus/curriculum/gymnasiale-oberstufe/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

const themenfeld = {
  code: "E.1 Funktionen und ihre Darstellung",
  ...coreCurriculum,
};

/**
 * Themenfeld E.1: ganzrationale Funktionen with their graphs, end behaviour,
 * shifts and stretches, their axis intercepts and the points where two graphs
 * meet, and modelling with linear and quadratic functions. The polynomial
 * lesson stands under E.6, where most of its sections teach, and cites E.1.
 */
export const introductoryPhaseFunctionsUnit = unitNode({
  children: [
    materialNode({
      key: "introductory-phase-mathematics-functions-function-transformation",
      level: "lesson",
      materialKeys: ["lesson.mathematics.function-transformation"],
      order: 10,
      outcomes: [
        themenfeld,
        {
          code: "Leitidee L4 Funktionaler Zusammenhang: L4.1",
          ...educationStandards,
        },
      ],
    }),
    materialNode({
      key: "introductory-phase-mathematics-functions-quadratic-function",
      level: "lesson",
      materialKeys: ["lesson.mathematics.quadratic-function"],
      order: 20,
      outcomes: [
        themenfeld,
        {
          code: "Leitidee L1 Algorithmus und Zahl: L1.1",
          ...educationStandards,
        },
        {
          code: "Leitidee L4 Funktionaler Zusammenhang: L4.1",
          ...educationStandards,
        },
      ],
    }),
    materialNode({
      key: "introductory-phase-mathematics-functions-simultaneous-equation",
      level: "lesson",
      materialKeys: ["lesson.mathematics.simultaneous-equation"],
      order: 30,
      outcomes: [
        themenfeld,
        {
          code: "Leitidee L1 Algorithmus und Zahl: L1.1",
          ...educationStandards,
        },
      ],
    }),
  ],
  key: "introductory-phase-mathematics-functions",
  materialCard: {
    de: {
      description: "Lies Graphen und finde Nullstellen und Schnittpunkte.",
      title: "Funktionen und ihre Darstellung",
    },
    en: {
      description: "Read graphs, then find zeros and where two graphs meet.",
      title: "Functions and Their Representation",
    },
    id: {
      description: "Baca grafik, lalu cari titik nol dan titik potongnya.",
      title: "Fungsi dan Representasinya",
    },
    ms: {
      description: "Baca graf, kemudian cari punca dan titik persilangan.",
      title: "Fungsi dan Perwakilannya",
    },
  },
  order: 10,
  translations: {
    de: {
      routeSlug: "funktionen-und-ihre-darstellung",
      title: "Funktionen und ihre Darstellung",
    },
    en: {
      routeSlug: "functions-and-their-representation",
      title: "Functions and Their Representation",
    },
    id: {
      routeSlug: "fungsi-dan-representasinya",
      title: "Fungsi dan Representasinya",
    },
    ms: {
      routeSlug: "fungsi-dan-perwakilannya",
      title: "Fungsi dan Perwakilannya",
    },
  },
});
