import { materialNode, unitNode } from "#corpus/curriculum/schema";
import { hannoverTechnicalMathematics } from "#corpus/curriculum/studienkolleg/documents";

/** Hannover T-Kurs, Analysis: Funktionen, ihre Darstellung und Eigenschaften. */
export const hannoverTechnicalFunctionsUnit = unitNode({
  children: [
    materialNode({
      key: "hannover-t-mathematics-functions-function-composition-inverse-function",
      level: "lesson",
      materialKeys: [
        "lesson.mathematics.function-composition-inverse-function",
      ],
      order: 10,
      outcomes: [
        {
          code: "Analysis im T-Kurs: Funktionen, ihre Darstellung und Eigenschaften",
          ...hannoverTechnicalMathematics,
        },
      ],
    }),
    materialNode({
      key: "hannover-t-mathematics-functions-function-transformation",
      level: "lesson",
      materialKeys: ["lesson.mathematics.function-transformation"],
      order: 20,
      outcomes: [
        {
          code: "Analysis im T-Kurs: Funktionen, ihre Darstellung und Eigenschaften",
          ...hannoverTechnicalMathematics,
        },
      ],
    }),
    materialNode({
      key: "hannover-t-mathematics-functions-polynomial",
      level: "lesson",
      materialKeys: ["lesson.mathematics.polynomial"],
      order: 30,
      outcomes: [
        {
          code: "Analysis im T-Kurs: Funktionen, ihre Darstellung und Eigenschaften",
          ...hannoverTechnicalMathematics,
        },
      ],
    }),
    materialNode({
      key: "hannover-t-mathematics-functions-exponential-logarithm",
      level: "lesson",
      materialKeys: ["lesson.mathematics.exponential-logarithm"],
      order: 40,
      outcomes: [
        {
          code: "Analysis im T-Kurs: Funktionen, ihre Darstellung und Eigenschaften",
          ...hannoverTechnicalMathematics,
        },
      ],
    }),
    materialNode({
      key: "hannover-t-mathematics-functions-trigonometric-function",
      level: "lesson",
      materialKeys: ["lesson.mathematics.trigonometric-function"],
      order: 50,
      outcomes: [
        {
          code: "Analysis im T-Kurs: Funktionen, ihre Darstellung und Eigenschaften",
          ...hannoverTechnicalMathematics,
        },
      ],
    }),
    materialNode({
      key: "hannover-t-mathematics-functions-function-modeling",
      level: "lesson",
      materialKeys: ["lesson.mathematics.function-modeling"],
      order: 60,
      outcomes: [
        {
          code: "Analysis im T-Kurs: Funktionen, ihre Darstellung und Eigenschaften",
          ...hannoverTechnicalMathematics,
        },
        {
          code: "Analysis im T-Kurs: Kurvendiskussion/Funktionsuntersuchung",
          ...hannoverTechnicalMathematics,
        },
      ],
    }),
  ],
  key: "hannover-t-mathematics-functions",
  materialCard: {
    de: {
      description: "Sieh, wie Parameter den Graphen einer Funktion formen.",
      title: "Funktionen, ihre Darstellung und Eigenschaften",
    },
    en: {
      description: "See how parameters shape the graph of a function.",
      title: "Functions, their graphs and properties",
    },
    id: {
      description: "Lihat cara parameter membentuk grafik fungsi.",
      title: "Fungsi, grafik, dan sifatnya",
    },
    ms: {
      description: "Lihat cara parameter membentuk graf fungsi.",
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

/** Hannover T-Kurs, Analysis: Folgen and Berechnung von Reihen. */
export const hannoverTechnicalSequencesUnit = unitNode({
  children: [
    materialNode({
      key: "hannover-t-mathematics-sequences-sequence-series",
      level: "lesson",
      materialKeys: ["lesson.mathematics.sequence-series"],
      order: 10,
      outcomes: [
        {
          code: "Analysis im T-Kurs: Folgen als Funktionen mit dem Definitionsbereich natürliche Zahlen",
          ...hannoverTechnicalMathematics,
        },
        {
          code: "Analysis im T-Kurs: Berechnung von Reihen",
          ...hannoverTechnicalMathematics,
        },
      ],
    }),
  ],
  key: "hannover-t-mathematics-sequences",
  materialCard: {
    de: {
      description: "Folge den Gliedern einer Folge bis zu ihrer Summe.",
      title: "Folgen und Reihen",
    },
    en: {
      description: "Follow the terms of a sequence all the way to its sum.",
      title: "Sequences and series",
    },
    id: {
      description: "Ikuti suku barisan sampai ke jumlahnya.",
      title: "Barisan dan deret",
    },
    ms: {
      description: "Ikuti sebutan janjang hingga ke hasil tambahnya.",
      title: "Janjang dan siri",
    },
  },
  order: 20,
  translations: {
    de: { routeSlug: "folgen-und-reihen", title: "Folgen und Reihen" },
    en: { routeSlug: "sequences-and-series", title: "Sequences and series" },
    id: { routeSlug: "barisan-dan-deret", title: "Barisan dan deret" },
    ms: { routeSlug: "janjang-dan-siri", title: "Janjang dan siri" },
  },
});
