import {
  coreCurriculum,
  educationStandards,
} from "#corpus/curriculum/gymnasiale-oberstufe/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

const conceptThemenfeld = {
  code: "E.2 Einführung des Ableitungsbegriffs",
  ...coreCurriculum,
};

/**
 * Themenfeld E.2: the derivative as local rate of change and tangent slope,
 * reached from the difference quotient on a propaedeutic idea of the limit,
 * with speed as the rate of change of position, and the factor and sum rules.
 * The derivative lesson stands here once for the whole Einführungsphase, so it
 * also cites the derivative parts of E.3, E.4 and E.5 that it teaches.
 */
export const introductoryPhaseDerivativeConceptUnit = unitNode({
  children: [
    materialNode({
      key: "introductory-phase-mathematics-derivative-concept-derivative-function",
      level: "lesson",
      materialKeys: ["lesson.mathematics.derivative-function"],
      order: 10,
      outcomes: [
        conceptThemenfeld,
        {
          code: "E.3 Anwendungen des Ableitungsbegriffs (Funktionsuntersuchung bei ganzrationalen Funktionen)",
          ...coreCurriculum,
        },
        {
          code: "E.4 Exponentialfunktionen (Produkt- und Kettenregel)",
          ...coreCurriculum,
        },
        {
          code: "E.5 Trigonometrische Funktionen (Ableitung der Sinus- und der Kosinusfunktion)",
          ...coreCurriculum,
        },
        {
          code: "Leitidee L1 Algorithmus und Zahl: L1.3",
          ...educationStandards,
        },
        { code: "Leitidee L2 Messen: L2.2, L2.3", ...educationStandards },
        {
          code: "Leitidee L4 Funktionaler Zusammenhang: L4.3, L4.4, L4.5, L4.6, L4.7, L4.14 (eA)",
          ...educationStandards,
        },
      ],
    }),
    materialNode({
      key: "introductory-phase-mathematics-derivative-concept-limit",
      level: "lesson",
      materialKeys: ["lesson.mathematics.limit"],
      order: 20,
      outcomes: [
        conceptThemenfeld,
        {
          code: "Leitidee L1 Algorithmus und Zahl: L1.3",
          ...educationStandards,
        },
      ],
    }),
    materialNode({
      key: "introductory-phase-mathematics-derivative-concept-linear-kinematics",
      level: "lesson",
      materialKeys: ["lesson.mathematics.linear-kinematics"],
      order: 30,
      outcomes: [
        conceptThemenfeld,
        { code: "Leitidee L2 Messen: L2.3", ...educationStandards },
        {
          code: "Leitidee L4 Funktionaler Zusammenhang: L4.3",
          ...educationStandards,
        },
      ],
    }),
  ],
  key: "introductory-phase-mathematics-derivative-concept",
  materialCard: {
    de: {
      description: "Mach die Sekante zur Tangente und lies die Steigung ab.",
      title: "Einführung des Ableitungsbegriffs",
    },
    en: {
      description: "Turn a secant into a tangent and read off the slope.",
      title: "Introduction to the Derivative",
    },
    id: {
      description: "Jadikan sekan garis singgung, lalu baca kemiringannya.",
      title: "Pengenalan Konsep Turunan",
    },
    ms: {
      description: "Jadikan sekan sebagai tangen untuk dapat kecerunannya.",
      title: "Pengenalan Konsep Terbitan",
    },
  },
  order: 20,
  translations: {
    de: {
      routeSlug: "einfuehrung-des-ableitungsbegriffs",
      title: "Einführung des Ableitungsbegriffs",
    },
    en: {
      routeSlug: "introduction-to-the-derivative",
      title: "Introduction to the Derivative",
    },
    id: {
      routeSlug: "pengenalan-konsep-turunan",
      title: "Pengenalan Konsep Turunan",
    },
    ms: {
      routeSlug: "pengenalan-konsep-terbitan",
      title: "Pengenalan Konsep Terbitan",
    },
  },
});
