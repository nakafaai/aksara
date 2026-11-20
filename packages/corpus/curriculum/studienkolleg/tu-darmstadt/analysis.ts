import { materialNode, unitNode } from "#corpus/curriculum/schema";
import { darmstadtMathematics } from "#corpus/curriculum/studienkolleg/documents";

/** Darmstadt T-Kurs, Schwerpunkt Der Begriff der Funktion und ihre besonderen Eigenschaften. */
export const tuDarmstadtFunctionsUnit = unitNode({
  children: [
    materialNode({
      key: "tu-darmstadt-t-mathematics-functions-function-composition-inverse-function",
      level: "lesson",
      materialKeys: [
        "lesson.mathematics.function-composition-inverse-function",
      ],
      order: 10,
      outcomes: [
        {
          code: "Schwerpunkt: Der Begriff der Funktion und ihre besonderen Eigenschaften",
          ...darmstadtMathematics,
        },
      ],
    }),
    materialNode({
      key: "tu-darmstadt-t-mathematics-functions-function-transformation",
      level: "lesson",
      materialKeys: ["lesson.mathematics.function-transformation"],
      order: 20,
      outcomes: [
        {
          code: "Schwerpunkt: Der Begriff der Funktion und ihre besonderen Eigenschaften",
          ...darmstadtMathematics,
        },
      ],
    }),
    materialNode({
      key: "tu-darmstadt-t-mathematics-functions-polynomial",
      level: "lesson",
      materialKeys: ["lesson.mathematics.polynomial"],
      order: 30,
      outcomes: [
        {
          code: "Schwerpunkt: Der Begriff der Funktion und ihre besonderen Eigenschaften",
          ...darmstadtMathematics,
        },
      ],
    }),
    materialNode({
      key: "tu-darmstadt-t-mathematics-functions-exponential-logarithm",
      level: "lesson",
      materialKeys: ["lesson.mathematics.exponential-logarithm"],
      order: 40,
      outcomes: [
        {
          code: "Schwerpunkt: Der Begriff der Funktion und ihre besonderen Eigenschaften",
          ...darmstadtMathematics,
        },
      ],
    }),
    materialNode({
      key: "tu-darmstadt-t-mathematics-functions-trigonometric-function",
      level: "lesson",
      materialKeys: ["lesson.mathematics.trigonometric-function"],
      order: 50,
      outcomes: [
        {
          code: "Schwerpunkt: Der Begriff der Funktion und ihre besonderen Eigenschaften",
          ...darmstadtMathematics,
        },
      ],
    }),
    materialNode({
      key: "tu-darmstadt-t-mathematics-functions-function-modeling",
      level: "lesson",
      materialKeys: ["lesson.mathematics.function-modeling"],
      order: 60,
      outcomes: [
        {
          code: "Schwerpunkt: Der Begriff der Funktion und ihre besonderen Eigenschaften",
          ...darmstadtMathematics,
        },
      ],
    }),
  ],
  key: "tu-darmstadt-t-mathematics-functions",
  materialCard: {
    de: {
      description: "Lerne Funktionen kennen und lies ihre Graphen.",
      title: "Der Begriff der Funktion und ihre besonderen Eigenschaften",
    },
    en: {
      description: "Meet each family of functions and read its graph.",
      title: "The function concept and its properties",
    },
    id: {
      description: "Kenali tiap keluarga fungsi dan baca grafiknya.",
      title: "Konsep fungsi dan sifat-sifatnya",
    },
    ms: {
      description: "Kenali setiap keluarga fungsi dan baca grafnya.",
      title: "Konsep fungsi dan sifatnya",
    },
  },
  order: 10,
  translations: {
    de: {
      routeSlug: "begriff-der-funktion",
      title: "Der Begriff der Funktion und ihre besonderen Eigenschaften",
    },
    en: {
      routeSlug: "function-concept",
      title: "The function concept and its properties",
    },
    id: {
      routeSlug: "konsep-fungsi",
      title: "Konsep fungsi dan sifat-sifatnya",
    },
    ms: { routeSlug: "konsep-fungsi", title: "Konsep fungsi dan sifatnya" },
  },
});

/** Darmstadt T-Kurs, Schwerpunkt Differential- und Integralrechnung (mit Anwendungen). */
export const tuDarmstadtCalculusUnit = unitNode({
  children: [
    materialNode({
      key: "tu-darmstadt-t-mathematics-calculus-limit",
      level: "lesson",
      materialKeys: ["lesson.mathematics.limit"],
      order: 10,
      outcomes: [
        {
          code: "Schwerpunkt: Differential- und Integralrechnung (mit Anwendungen)",
          ...darmstadtMathematics,
        },
      ],
    }),
    materialNode({
      key: "tu-darmstadt-t-mathematics-calculus-derivative-function",
      level: "lesson",
      materialKeys: ["lesson.mathematics.derivative-function"],
      order: 20,
      outcomes: [
        {
          code: "Schwerpunkt: Differential- und Integralrechnung (mit Anwendungen)",
          ...darmstadtMathematics,
        },
      ],
    }),
    materialNode({
      key: "tu-darmstadt-t-mathematics-calculus-linear-kinematics",
      level: "lesson",
      materialKeys: ["lesson.mathematics.linear-kinematics"],
      order: 30,
      outcomes: [
        {
          code: "Schwerpunkt: Differential- und Integralrechnung (mit Anwendungen)",
          ...darmstadtMathematics,
        },
      ],
    }),
    materialNode({
      key: "tu-darmstadt-t-mathematics-calculus-integral",
      level: "lesson",
      materialKeys: ["lesson.mathematics.integral"],
      order: 40,
      outcomes: [
        {
          code: "Schwerpunkt: Differential- und Integralrechnung (mit Anwendungen)",
          ...darmstadtMathematics,
        },
      ],
    }),
  ],
  key: "tu-darmstadt-t-mathematics-calculus",
  materialCard: {
    de: {
      description: "Ableitungen geben Steigungen, Integrale geben Flächen.",
      title: "Differential- und Integralrechnung (mit Anwendungen)",
    },
    en: {
      description: "Derivatives give slopes, integrals give areas.",
      title: "Differential and integral calculus with applications",
    },
    id: {
      description: "Turunan memberi kemiringan, integral memberi luas.",
      title: "Kalkulus diferensial dan integral beserta penerapannya",
    },
    ms: {
      description: "Terbitan memberi kecerunan, kamiran memberi luas.",
      title: "Kalkulus pembezaan dan kamiran serta aplikasinya",
    },
  },
  order: 20,
  translations: {
    de: {
      routeSlug: "differential-und-integralrechnung",
      title: "Differential- und Integralrechnung (mit Anwendungen)",
    },
    en: {
      routeSlug: "differential-and-integral-calculus",
      title: "Differential and integral calculus with applications",
    },
    id: {
      routeSlug: "kalkulus-diferensial-dan-integral",
      title: "Kalkulus diferensial dan integral beserta penerapannya",
    },
    ms: {
      routeSlug: "kalkulus-pembezaan-dan-kamiran",
      title: "Kalkulus pembezaan dan kamiran serta aplikasinya",
    },
  },
});
