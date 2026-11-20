import { materialNode, unitNode } from "#corpus/curriculum/schema";
import { sachsenTechnicalMathematics } from "#corpus/curriculum/studienkolleg/documents";

/** Sachsen T-Kurs, Stoffgebiet Differentialrechnung. */
export const sachsenTechnicalDerivativesUnit = unitNode({
  children: [
    materialNode({
      key: "sachsen-t-mathematics-derivatives-limit",
      level: "lesson",
      materialKeys: ["lesson.mathematics.limit"],
      order: 10,
      outcomes: [
        {
          code: "Stoffgebiet Differentialrechnung: Grenzwertbegriff",
          ...sachsenTechnicalMathematics,
        },
      ],
    }),
    materialNode({
      key: "sachsen-t-mathematics-derivatives-derivative-function",
      level: "lesson",
      materialKeys: ["lesson.mathematics.derivative-function"],
      order: 20,
      outcomes: [
        {
          code: "Stoffgebiet Differentialrechnung: Differenzen- und Differentialquotient, Ableitung, Kurvendiskussion",
          ...sachsenTechnicalMathematics,
        },
      ],
    }),
  ],
  key: "sachsen-t-mathematics-derivatives",
  materialCard: {
    de: {
      description: "Finde Hoch- und Tiefpunkte mit der Ableitung.",
      title: "Differentialrechnung",
    },
    en: {
      description: "Find peaks and valleys with the derivative.",
      title: "Differential calculus",
    },
    id: {
      description: "Temukan titik puncak dan lembah dengan turunan.",
      title: "Kalkulus diferensial",
    },
    ms: {
      description: "Cari titik puncak dan lembah dengan terbitan.",
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

/** Sachsen T-Kurs, Stoffgebiet Integralrechnung. */
export const sachsenTechnicalIntegralsUnit = unitNode({
  children: [
    materialNode({
      key: "sachsen-t-mathematics-integrals-integral",
      level: "lesson",
      materialKeys: ["lesson.mathematics.integral"],
      order: 10,
      outcomes: [
        {
          code: "Stoffgebiet Integralrechnung: Stammfunktion, unbestimmtes und bestimmtes Integral, Integration nach Substitution, Flächenberechnungen",
          ...sachsenTechnicalMathematics,
        },
      ],
    }),
  ],
  key: "sachsen-t-mathematics-integrals",
  materialCard: {
    de: {
      description: "Kehre das Ableiten um und berechne Flächen.",
      title: "Integralrechnung",
    },
    en: {
      description: "Undo differentiation and work out areas.",
      title: "Integral calculus",
    },
    id: {
      description: "Balik proses turunan lalu hitung luas.",
      title: "Kalkulus integral",
    },
    ms: {
      description: "Songsangkan pembezaan lalu kira luas.",
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
