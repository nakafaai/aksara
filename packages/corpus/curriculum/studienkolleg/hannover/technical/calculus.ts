import { materialNode, unitNode } from "#corpus/curriculum/schema";
import { hannoverTechnicalMathematics } from "#corpus/curriculum/studienkolleg/documents";

/** Hannover T-Kurs, Analysis: Grenzwerte und Stetigkeit von Funktionen. */
export const hannoverTechnicalLimitsUnit = unitNode({
  children: [
    materialNode({
      key: "hannover-t-mathematics-limits-limit",
      level: "lesson",
      materialKeys: ["lesson.mathematics.limit"],
      order: 10,
      outcomes: [
        {
          code: "Analysis im T-Kurs: Grenzwerte und Stetigkeit von Funktionen",
          ...hannoverTechnicalMathematics,
        },
      ],
    }),
  ],
  key: "hannover-t-mathematics-limits",
  materialCard: {
    de: {
      description: "Prüfe, wohin eine Funktion strebt und wo sie springt.",
      title: "Grenzwerte und Stetigkeit von Funktionen",
    },
    en: {
      description: "Check where a function heads and where it jumps.",
      title: "Limits and continuity of functions",
    },
    id: {
      description: "Periksa ke mana fungsi menuju dan di mana ia melompat.",
      title: "Limit dan kekontinuan fungsi",
    },
    ms: {
      description: "Semak ke mana fungsi menuju dan di mana ia melompat.",
      title: "Had dan keselanjaran fungsi",
    },
  },
  order: 30,
  translations: {
    de: {
      routeSlug: "grenzwerte-und-stetigkeit",
      title: "Grenzwerte und Stetigkeit von Funktionen",
    },
    en: {
      routeSlug: "limits-and-continuity",
      title: "Limits and continuity of functions",
    },
    id: {
      routeSlug: "limit-dan-kekontinuan",
      title: "Limit dan kekontinuan fungsi",
    },
    ms: {
      routeSlug: "had-dan-keselanjaran",
      title: "Had dan keselanjaran fungsi",
    },
  },
});

/** Hannover T-Kurs, Analysis: Differentialrechnung, with the Kurvendiskussion it carries. */
export const hannoverTechnicalDerivativesUnit = unitNode({
  children: [
    materialNode({
      key: "hannover-t-mathematics-derivatives-derivative-function",
      level: "lesson",
      materialKeys: ["lesson.mathematics.derivative-function"],
      order: 10,
      outcomes: [
        {
          code: "Analysis im T-Kurs: Differentialrechnung",
          ...hannoverTechnicalMathematics,
        },
        {
          code: "Analysis im T-Kurs: Kurvendiskussion/Funktionsuntersuchung",
          ...hannoverTechnicalMathematics,
        },
      ],
    }),
    materialNode({
      key: "hannover-t-mathematics-derivatives-linear-kinematics",
      level: "lesson",
      materialKeys: ["lesson.mathematics.linear-kinematics"],
      order: 20,
      outcomes: [
        {
          code: "Analysis im T-Kurs: Differentialrechnung (Anwendung in den Naturwissenschaften)",
          ...hannoverTechnicalMathematics,
        },
      ],
    }),
  ],
  key: "hannover-t-mathematics-derivatives",
  materialCard: {
    de: {
      description: "Miss, wie schnell sich etwas gerade ändert.",
      title: "Differentialrechnung",
    },
    en: {
      description: "Measure how fast something is changing right now.",
      title: "Differential calculus",
    },
    id: {
      description: "Ukur seberapa cepat sesuatu berubah saat ini.",
      title: "Kalkulus diferensial",
    },
    ms: {
      description: "Ukur betapa pantas sesuatu berubah sekarang.",
      title: "Kalkulus pembezaan",
    },
  },
  order: 40,
  translations: {
    de: { routeSlug: "differentialrechnung", title: "Differentialrechnung" },
    en: { routeSlug: "differential-calculus", title: "Differential calculus" },
    id: { routeSlug: "kalkulus-diferensial", title: "Kalkulus diferensial" },
    ms: { routeSlug: "kalkulus-pembezaan", title: "Kalkulus pembezaan" },
  },
});

/** Hannover T-Kurs, Analysis: Integralrechnung. */
export const hannoverTechnicalIntegralsUnit = unitNode({
  children: [
    materialNode({
      key: "hannover-t-mathematics-integrals-integral",
      level: "lesson",
      materialKeys: ["lesson.mathematics.integral"],
      order: 10,
      outcomes: [
        {
          code: "Analysis im T-Kurs: Integralrechnung",
          ...hannoverTechnicalMathematics,
        },
      ],
    }),
  ],
  key: "hannover-t-mathematics-integrals",
  materialCard: {
    de: {
      description: "Addiere kleine Streifen zu einer ganzen Fläche.",
      title: "Integralrechnung",
    },
    en: {
      description: "Add up thin strips into a whole area.",
      title: "Integral calculus",
    },
    id: {
      description: "Jumlahkan pita tipis menjadi satu luas utuh.",
      title: "Kalkulus integral",
    },
    ms: {
      description: "Tambah jalur nipis menjadi satu luas penuh.",
      title: "Kalkulus kamiran",
    },
  },
  order: 50,
  translations: {
    de: { routeSlug: "integralrechnung", title: "Integralrechnung" },
    en: { routeSlug: "integral-calculus", title: "Integral calculus" },
    id: { routeSlug: "kalkulus-integral", title: "Kalkulus integral" },
    ms: { routeSlug: "kalkulus-kamiran", title: "Kalkulus kamiran" },
  },
});
