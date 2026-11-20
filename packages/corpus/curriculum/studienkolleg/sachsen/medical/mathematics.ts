import { materialNode, unitNode } from "#corpus/curriculum/schema";
import { sachsenMedicalMathematics } from "#corpus/curriculum/studienkolleg/documents";

/** Sachsen M-Kurs, Stoffgebiet Funktionen. */
const sachsenMedicalFunctionsUnit = unitNode({
  children: [
    materialNode({
      key: "sachsen-m-mathematics-functions-quadratic-function",
      level: "lesson",
      materialKeys: ["lesson.mathematics.quadratic-function"],
      order: 10,
      outcomes: [
        {
          code: "Stoffgebiet Funktionen: lineare und quadratische Funktionen",
          ...sachsenMedicalMathematics,
        },
      ],
    }),
    materialNode({
      key: "sachsen-m-mathematics-functions-polynomial",
      level: "lesson",
      materialKeys: ["lesson.mathematics.polynomial"],
      order: 20,
      outcomes: [
        {
          code: "Stoffgebiet Funktionen: andere ganzrationale Funktionen",
          ...sachsenMedicalMathematics,
        },
      ],
    }),
    materialNode({
      key: "sachsen-m-mathematics-functions-exponential-logarithm",
      level: "lesson",
      materialKeys: ["lesson.mathematics.exponential-logarithm"],
      order: 30,
      outcomes: [
        {
          code: "Stoffgebiet Funktionen: Exponentialfunktionen, Logarithmusfunktionen",
          ...sachsenMedicalMathematics,
        },
      ],
    }),
    materialNode({
      key: "sachsen-m-mathematics-functions-trigonometric-function",
      level: "lesson",
      materialKeys: ["lesson.mathematics.trigonometric-function"],
      order: 40,
      outcomes: [
        {
          code: "Stoffgebiet Funktionen: Winkelfunktionen",
          ...sachsenMedicalMathematics,
        },
      ],
    }),
    materialNode({
      key: "sachsen-m-mathematics-functions-function-modeling",
      level: "lesson",
      materialKeys: ["lesson.mathematics.function-modeling"],
      order: 50,
      outcomes: [
        {
          code: "Stoffgebiet Funktionen: gebrochenrationale Funktionen, Wurzelfunktionen",
          ...sachsenMedicalMathematics,
        },
      ],
    }),
    materialNode({
      key: "sachsen-m-mathematics-functions-sequence-series",
      level: "lesson",
      materialKeys: ["lesson.mathematics.sequence-series"],
      order: 60,
      outcomes: [
        {
          code: "Stoffgebiet Funktionen: Zahlenfolgen",
          ...sachsenMedicalMathematics,
        },
      ],
    }),
  ],
  key: "sachsen-m-mathematics-functions",
  materialCard: {
    de: {
      description: "Beschreibe Wachstum und Zerfall mit Funktionen.",
      title: "Funktionen",
    },
    en: {
      description: "Describe growth and decay with functions.",
      title: "Functions",
    },
    id: {
      description: "Gambarkan pertumbuhan dan peluruhan dengan fungsi.",
      title: "Fungsi",
    },
    ms: {
      description: "Huraikan pertumbuhan dan susutan dengan fungsi.",
      title: "Fungsi",
    },
  },
  order: 10,
  translations: {
    de: { routeSlug: "funktionen", title: "Funktionen" },
    en: { routeSlug: "functions", title: "Functions" },
    id: { routeSlug: "fungsi", title: "Fungsi" },
    ms: { routeSlug: "fungsi", title: "Fungsi" },
  },
});

/** Sachsen M-Kurs, Stoffgebiet Differentialrechnung. */
const sachsenMedicalDerivativesUnit = unitNode({
  children: [
    materialNode({
      key: "sachsen-m-mathematics-derivatives-limit",
      level: "lesson",
      materialKeys: ["lesson.mathematics.limit"],
      order: 10,
      outcomes: [
        {
          code: "Stoffgebiet Differentialrechnung: Grenzwertbegriff",
          ...sachsenMedicalMathematics,
        },
      ],
    }),
    materialNode({
      key: "sachsen-m-mathematics-derivatives-derivative-function",
      level: "lesson",
      materialKeys: ["lesson.mathematics.derivative-function"],
      order: 20,
      outcomes: [
        {
          code: "Stoffgebiet Differentialrechnung: Differenzen- und Differentialquotient, Ableitung, Kurvendiskussion, Extremwertaufgaben",
          ...sachsenMedicalMathematics,
        },
      ],
    }),
  ],
  key: "sachsen-m-mathematics-derivatives",
  materialCard: {
    de: {
      description: "Berechne Änderungsraten und finde das Optimum.",
      title: "Differentialrechnung",
    },
    en: {
      description: "Work out rates of change and find the best value.",
      title: "Differential calculus",
    },
    id: {
      description: "Hitung laju perubahan dan cari nilai terbaik.",
      title: "Kalkulus diferensial",
    },
    ms: {
      description: "Kira kadar perubahan dan cari nilai terbaik.",
      title: "Kalkulus pembezaan",
    },
  },
  order: 20,
  translations: {
    de: { routeSlug: "differentialrechnung", title: "Differentialrechnung" },
    en: { routeSlug: "differential-calculus", title: "Differential calculus" },
    id: { routeSlug: "kalkulus-diferensial", title: "Kalkulus diferensial" },
    ms: { routeSlug: "kalkulus-pembezaan", title: "Kalkulus pembezaan" },
  },
});

/** Sachsen M-Kurs, Stoffgebiet Integralrechnung. */
const sachsenMedicalIntegralsUnit = unitNode({
  children: [
    materialNode({
      key: "sachsen-m-mathematics-integrals-integral",
      level: "lesson",
      materialKeys: ["lesson.mathematics.integral"],
      order: 10,
      outcomes: [
        {
          code: "Stoffgebiet Integralrechnung: Stammfunktion, unbestimmtes und bestimmtes Integral, Integration nach Substitution, Flächenberechnungen",
          ...sachsenMedicalMathematics,
        },
      ],
    }),
  ],
  key: "sachsen-m-mathematics-integrals",
  materialCard: {
    de: {
      description: "Summiere Änderungen zu Flächen unter Kurven.",
      title: "Integralrechnung",
    },
    en: {
      description: "Add up changes into areas under curves.",
      title: "Integral calculus",
    },
    id: {
      description: "Jumlahkan perubahan menjadi luas di bawah kurva.",
      title: "Kalkulus integral",
    },
    ms: {
      description: "Jumlahkan perubahan menjadi luas di bawah lengkung.",
      title: "Kalkulus kamiran",
    },
  },
  order: 30,
  translations: {
    de: { routeSlug: "integralrechnung", title: "Integralrechnung" },
    en: { routeSlug: "integral-calculus", title: "Integral calculus" },
    id: { routeSlug: "kalkulus-integral", title: "Kalkulus integral" },
    ms: { routeSlug: "kalkulus-kamiran", title: "Kalkulus kamiran" },
  },
});

/** The units of Mathematik in the M-Kurs of the Studienkolleg Sachsen: the Stoffgebiete of its Feststellungsprüfung sheet, in sheet order. */
export const sachsenMedicalMathematicsUnitNodes = [
  sachsenMedicalFunctionsUnit,
  sachsenMedicalDerivativesUnit,
  sachsenMedicalIntegralsUnit,
];
