import {
  coreCurriculum,
  educationStandards,
} from "#corpus/curriculum/gymnasiale-oberstufe/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

const trigonometricThemenfeld = {
  code: "E.5 Trigonometrische Funktionen",
  ...coreCurriculum,
};

/**
 * Themenfeld E.4: growth and decay with f(x) = a·b^x + c, halving and
 * doubling time, and exponential equations solved with the logarithm. Its
 * product and chain rules are cited by the derivative lesson under E.2.
 */
export const introductoryPhaseExponentialUnit = unitNode({
  children: [
    materialNode({
      key: "introductory-phase-mathematics-exponential-functions-exponential-logarithm",
      level: "lesson",
      materialKeys: ["lesson.mathematics.exponential-logarithm"],
      order: 10,
      outcomes: [
        { code: "E.4 Exponentialfunktionen", ...coreCurriculum },
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
  ],
  key: "introductory-phase-mathematics-exponential-functions",
  materialCard: {
    de: {
      description: "Beschreibe Wachstum und Zerfall mit einem festen Faktor.",
      title: "Exponentialfunktionen",
    },
    en: {
      description: "Model growth and decay that repeat one fixed factor.",
      title: "Exponential Functions",
    },
    id: {
      description: "Modelkan pertumbuhan dan peluruhan dengan faktor tetap.",
      title: "Fungsi Eksponensial",
    },
    ms: {
      description: "Modelkan pertumbuhan dan susutan dengan faktor tetap.",
      title: "Fungsi Eksponen",
    },
  },
  order: 40,
  translations: {
    de: { routeSlug: "exponentialfunktionen", title: "Exponentialfunktionen" },
    en: { routeSlug: "exponential-functions", title: "Exponential Functions" },
    id: { routeSlug: "fungsi-eksponensial", title: "Fungsi Eksponensial" },
    ms: { routeSlug: "fungsi-eksponen", title: "Fungsi Eksponen" },
  },
});

/**
 * Themenfeld E.5: radians, sine and cosine as functions with amplitude and
 * period, and simple trigonometric equations. The derivatives of sine and
 * cosine are cited by the derivative lesson under E.2.
 */
export const introductoryPhaseTrigonometricUnit = unitNode({
  children: [
    materialNode({
      key: "introductory-phase-mathematics-trigonometric-functions-trigonometric-function",
      level: "lesson",
      materialKeys: ["lesson.mathematics.trigonometric-function"],
      order: 10,
      outcomes: [
        trigonometricThemenfeld,
        {
          code: "Leitidee L4 Funktionaler Zusammenhang: L4.1",
          ...educationStandards,
        },
      ],
    }),
    materialNode({
      key: "introductory-phase-mathematics-trigonometric-functions-function-modeling",
      level: "lesson",
      materialKeys: ["lesson.mathematics.function-modeling"],
      order: 20,
      outcomes: [
        trigonometricThemenfeld,
        {
          code: "Leitidee L4 Funktionaler Zusammenhang: L4.1",
          ...educationStandards,
        },
      ],
    }),
  ],
  key: "introductory-phase-mathematics-trigonometric-functions",
  materialCard: {
    de: {
      description: "Beschreibe Wellen mit Sinus und Kosinus im Bogenmaß.",
      title: "Trigonometrische Funktionen",
    },
    en: {
      description: "Model repeating waves with sine and cosine in radians.",
      title: "Trigonometric Functions",
    },
    id: {
      description: "Gambarkan gelombang berulang dengan sinus dan kosinus.",
      title: "Fungsi Trigonometri",
    },
    ms: {
      description: "Huraikan gelombang berulang dengan sinus dan kosinus.",
      title: "Fungsi Trigonometri",
    },
  },
  order: 50,
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
