import { materialNode, unitNode } from "#corpus/curriculum/schema";
import { hannoverMedicalMathematics } from "#corpus/curriculum/studienkolleg/documents";

/** Hannover M-Kurs, Analysis: Funktionen, ihre Darstellung und Eigenschaften. */
export const hannoverMedicalFunctionsUnit = unitNode({
  children: [
    materialNode({
      key: "hannover-m-mathematics-functions-function-transformation",
      level: "lesson",
      materialKeys: ["lesson.mathematics.function-transformation"],
      order: 10,
      outcomes: [
        {
          code: "Analysis im M-Kurs: Funktionen, ihre Darstellung und Eigenschaften",
          ...hannoverMedicalMathematics,
        },
      ],
    }),
    materialNode({
      key: "hannover-m-mathematics-functions-polynomial",
      level: "lesson",
      materialKeys: ["lesson.mathematics.polynomial"],
      order: 20,
      outcomes: [
        {
          code: "Analysis im M-Kurs: Funktionen, ihre Darstellung und Eigenschaften",
          ...hannoverMedicalMathematics,
        },
      ],
    }),
    materialNode({
      key: "hannover-m-mathematics-functions-exponential-logarithm",
      level: "lesson",
      materialKeys: ["lesson.mathematics.exponential-logarithm"],
      order: 30,
      outcomes: [
        {
          code: "Analysis im M-Kurs: Funktionen, ihre Darstellung und Eigenschaften",
          ...hannoverMedicalMathematics,
        },
      ],
    }),
    materialNode({
      key: "hannover-m-mathematics-functions-trigonometric-function",
      level: "lesson",
      materialKeys: ["lesson.mathematics.trigonometric-function"],
      order: 40,
      outcomes: [
        {
          code: "Analysis im M-Kurs: Funktionen, ihre Darstellung und Eigenschaften",
          ...hannoverMedicalMathematics,
        },
      ],
    }),
    materialNode({
      key: "hannover-m-mathematics-functions-function-modeling",
      level: "lesson",
      materialKeys: ["lesson.mathematics.function-modeling"],
      order: 50,
      outcomes: [
        {
          code: "Analysis im M-Kurs: Funktionen, ihre Darstellung und Eigenschaften",
          ...hannoverMedicalMathematics,
        },
        {
          code: "Analysis im M-Kurs: Kurvendiskussion/Funktionsuntersuchung",
          ...hannoverMedicalMathematics,
        },
      ],
    }),
  ],
  key: "hannover-m-mathematics-functions",
  materialCard: {
    de: {
      description: "Lerne die Funktionen kennen, die Natur beschreiben.",
      title: "Funktionen, ihre Darstellung und Eigenschaften",
    },
    en: {
      description: "Meet the functions that describe nature.",
      title: "Functions, their graphs and properties",
    },
    id: {
      description: "Kenali fungsi yang menggambarkan alam.",
      title: "Fungsi, grafik, dan sifatnya",
    },
    ms: {
      description: "Kenali fungsi yang menghuraikan alam semula jadi.",
      title: "Fungsi, graf dan sifatnya",
    },
  },
  order: 10,
  translations: {
    de: {
      routeSlug: "funktionen-darstellung-und-eigenschaften",
      title: "Funktionen, ihre Darstellung und Eigenschaften",
    },
    en: {
      routeSlug: "functions-graphs-and-properties",
      title: "Functions, their graphs and properties",
    },
    id: {
      routeSlug: "fungsi-grafik-dan-sifatnya",
      title: "Fungsi, grafik, dan sifatnya",
    },
    ms: {
      routeSlug: "fungsi-graf-dan-sifatnya",
      title: "Fungsi, graf dan sifatnya",
    },
  },
});

/** Hannover M-Kurs, Analysis: Grenzwerte und Stetigkeit von Funktionen. */
export const hannoverMedicalLimitsUnit = unitNode({
  children: [
    materialNode({
      key: "hannover-m-mathematics-limits-limit",
      level: "lesson",
      materialKeys: ["lesson.mathematics.limit"],
      order: 10,
      outcomes: [
        {
          code: "Analysis im M-Kurs: Grenzwerte und Stetigkeit von Funktionen",
          ...hannoverMedicalMathematics,
        },
      ],
    }),
  ],
  key: "hannover-m-mathematics-limits",
  materialCard: {
    de: {
      description: "Sieh nach, wie nah eine Funktion einem Wert kommt.",
      title: "Grenzwerte und Stetigkeit von Funktionen",
    },
    en: {
      description: "See how close a function gets to a value.",
      title: "Limits and continuity of functions",
    },
    id: {
      description: "Lihat seberapa dekat fungsi mendekati suatu nilai.",
      title: "Limit dan kekontinuan fungsi",
    },
    ms: {
      description: "Lihat sejauh mana fungsi menghampiri suatu nilai.",
      title: "Had dan keselanjaran fungsi",
    },
  },
  order: 20,
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
