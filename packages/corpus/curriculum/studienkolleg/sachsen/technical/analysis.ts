import { materialNode, unitNode } from "#corpus/curriculum/schema";
import { sachsenTechnicalMathematics } from "#corpus/curriculum/studienkolleg/documents";

/** Sachsen T-Kurs, Stoffgebiet Zahlenbereiche: Menge C der komplexen Zahlen. */
export const sachsenTechnicalComplexNumbersUnit = unitNode({
  children: [
    materialNode({
      key: "sachsen-t-mathematics-complex-numbers-complex-number",
      level: "lesson",
      materialKeys: ["lesson.mathematics.complex-number"],
      order: 10,
      outcomes: [
        {
          code: "Stoffgebiet Zahlenbereiche: Menge C der komplexen Zahlen, Grundrechenoperationen",
          ...sachsenTechnicalMathematics,
        },
      ],
    }),
  ],
  key: "sachsen-t-mathematics-complex-numbers",
  materialCard: {
    de: {
      description: "Rechne mit Zahlen, deren Quadrat negativ ist.",
      title: "Komplexe Zahlen",
    },
    en: {
      description: "Calculate with numbers whose square is negative.",
      title: "Complex numbers",
    },
    id: {
      description: "Berhitung dengan bilangan yang kuadratnya negatif.",
      title: "Bilangan kompleks",
    },
    ms: {
      description: "Kira dengan nombor yang kuasa duanya negatif.",
      title: "Nombor kompleks",
    },
  },
  order: 10,
  translations: {
    de: { routeSlug: "komplexe-zahlen", title: "Komplexe Zahlen" },
    en: { routeSlug: "complex-numbers", title: "Complex numbers" },
    id: { routeSlug: "bilangan-kompleks", title: "Bilangan kompleks" },
    ms: { routeSlug: "nombor-kompleks", title: "Nombor kompleks" },
  },
});

/** Sachsen T-Kurs, Stoffgebiet Funktionen. */
export const sachsenTechnicalFunctionsUnit = unitNode({
  children: [
    materialNode({
      key: "sachsen-t-mathematics-functions-function-composition-inverse-function",
      level: "lesson",
      materialKeys: [
        "lesson.mathematics.function-composition-inverse-function",
      ],
      order: 10,
      outcomes: [
        {
          code: "Stoffgebiet Funktionen: Funktionsbegriff, allgemeine Eigenschaften von Funktionen, Umkehrfunktionen",
          ...sachsenTechnicalMathematics,
        },
      ],
    }),
    materialNode({
      key: "sachsen-t-mathematics-functions-quadratic-function",
      level: "lesson",
      materialKeys: ["lesson.mathematics.quadratic-function"],
      order: 20,
      outcomes: [
        {
          code: "Stoffgebiet Funktionen: lineare und quadratische Funktionen",
          ...sachsenTechnicalMathematics,
        },
      ],
    }),
    materialNode({
      key: "sachsen-t-mathematics-functions-polynomial",
      level: "lesson",
      materialKeys: ["lesson.mathematics.polynomial"],
      order: 30,
      outcomes: [
        {
          code: "Stoffgebiet Funktionen: andere ganzrationale Funktionen",
          ...sachsenTechnicalMathematics,
        },
      ],
    }),
    materialNode({
      key: "sachsen-t-mathematics-functions-exponential-logarithm",
      level: "lesson",
      materialKeys: ["lesson.mathematics.exponential-logarithm"],
      order: 40,
      outcomes: [
        {
          code: "Stoffgebiet Funktionen: Exponentialfunktionen, Logarithmusfunktionen",
          ...sachsenTechnicalMathematics,
        },
      ],
    }),
    materialNode({
      key: "sachsen-t-mathematics-functions-trigonometric-function",
      level: "lesson",
      materialKeys: ["lesson.mathematics.trigonometric-function"],
      order: 50,
      outcomes: [
        {
          code: "Stoffgebiet Funktionen: Winkelfunktionen",
          ...sachsenTechnicalMathematics,
        },
      ],
    }),
    materialNode({
      key: "sachsen-t-mathematics-functions-function-modeling",
      level: "lesson",
      materialKeys: ["lesson.mathematics.function-modeling"],
      order: 60,
      outcomes: [
        {
          code: "Stoffgebiet Funktionen: gebrochenrationale Funktionen, Wurzelfunktionen",
          ...sachsenTechnicalMathematics,
        },
      ],
    }),
    materialNode({
      key: "sachsen-t-mathematics-functions-sequence-series",
      level: "lesson",
      materialKeys: ["lesson.mathematics.sequence-series"],
      order: 70,
      outcomes: [
        {
          code: "Stoffgebiet Funktionen: Zahlenfolgen, Partialsummen",
          ...sachsenTechnicalMathematics,
        },
      ],
    }),
  ],
  key: "sachsen-t-mathematics-functions",
  materialCard: {
    de: {
      description: "Lerne jede Funktionsart an ihrem Graphen kennen.",
      title: "Funktionen",
    },
    en: {
      description: "Get to know each kind of function by its graph.",
      title: "Functions",
    },
    id: {
      description: "Kenali tiap jenis fungsi lewat grafiknya.",
      title: "Fungsi",
    },
    ms: {
      description: "Kenali setiap jenis fungsi melalui grafnya.",
      title: "Fungsi",
    },
  },
  order: 20,
  translations: {
    de: { routeSlug: "funktionen", title: "Funktionen" },
    en: { routeSlug: "functions", title: "Functions" },
    id: { routeSlug: "fungsi", title: "Fungsi" },
    ms: { routeSlug: "fungsi", title: "Fungsi" },
  },
});
