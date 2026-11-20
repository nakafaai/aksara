import { materialNode, unitNode } from "#corpus/curriculum/schema";
import { hannoverMedicalMathematics } from "#corpus/curriculum/studienkolleg/documents";

/** Hannover M-Kurs, Analysis: Differentialrechnung, with the Kurvendiskussion it carries. */
export const hannoverMedicalDerivativesUnit = unitNode({
  children: [
    materialNode({
      key: "hannover-m-mathematics-derivatives-derivative-function",
      level: "lesson",
      materialKeys: ["lesson.mathematics.derivative-function"],
      order: 10,
      outcomes: [
        {
          code: "Analysis im M-Kurs: Differentialrechnung",
          ...hannoverMedicalMathematics,
        },
        {
          code: "Analysis im M-Kurs: Kurvendiskussion/Funktionsuntersuchung",
          ...hannoverMedicalMathematics,
        },
      ],
    }),
    materialNode({
      key: "hannover-m-mathematics-derivatives-linear-kinematics",
      level: "lesson",
      materialKeys: ["lesson.mathematics.linear-kinematics"],
      order: 20,
      outcomes: [
        {
          code: "Analysis im M-Kurs: Differentialrechnung (Anwendung in den Naturwissenschaften)",
          ...hannoverMedicalMathematics,
        },
      ],
    }),
  ],
  key: "hannover-m-mathematics-derivatives",
  materialCard: {
    de: {
      description: "Lies an der Ableitung ab, wo ein Graph steigt.",
      title: "Differentialrechnung",
    },
    en: {
      description: "Read from the derivative where a graph climbs.",
      title: "Differential calculus",
    },
    id: {
      description: "Baca dari turunan di mana grafik naik.",
      title: "Kalkulus diferensial",
    },
    ms: {
      description: "Baca daripada terbitan di mana graf menaik.",
      title: "Kalkulus pembezaan",
    },
  },
  order: 30,
  translations: {
    de: { routeSlug: "differentialrechnung", title: "Differentialrechnung" },
    en: { routeSlug: "differential-calculus", title: "Differential calculus" },
    id: { routeSlug: "kalkulus-diferensial", title: "Kalkulus diferensial" },
    ms: { routeSlug: "kalkulus-pembezaan", title: "Kalkulus pembezaan" },
  },
});

/** Hannover M-Kurs, Analysis: Integralrechnung. */
export const hannoverMedicalIntegralsUnit = unitNode({
  children: [
    materialNode({
      key: "hannover-m-mathematics-integrals-integral",
      level: "lesson",
      materialKeys: ["lesson.mathematics.integral"],
      order: 10,
      outcomes: [
        {
          code: "Analysis im M-Kurs: Integralrechnung",
          ...hannoverMedicalMathematics,
        },
      ],
    }),
  ],
  key: "hannover-m-mathematics-integrals",
  materialCard: {
    de: {
      description: "Berechne Flächen unter Kurven Schritt für Schritt.",
      title: "Integralrechnung",
    },
    en: {
      description: "Work out areas under curves step by step.",
      title: "Integral calculus",
    },
    id: {
      description: "Hitung luas di bawah kurva langkah demi langkah.",
      title: "Kalkulus integral",
    },
    ms: {
      description: "Kira luas di bawah lengkung langkah demi langkah.",
      title: "Kalkulus kamiran",
    },
  },
  order: 40,
  translations: {
    de: { routeSlug: "integralrechnung", title: "Integralrechnung" },
    en: { routeSlug: "integral-calculus", title: "Integral calculus" },
    id: { routeSlug: "kalkulus-integral", title: "Kalkulus integral" },
    ms: { routeSlug: "kalkulus-kamiran", title: "Kalkulus kamiran" },
  },
});
