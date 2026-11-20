import {
  advancedMathematicsBookXII,
  merdekaLearningOutcomes,
} from "#corpus/curriculum/merdeka/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** Kurikulum Merdeka Kelas 12 Matematika Tingkat Lanjut, Bab 1 Lingkaran, Elips, dan Garis Singgung Lingkaran. */
const merdekaClass12ConicUnit = unitNode({
  children: [
    materialNode({
      key: "class-12-advanced-mathematics-analytic-geometry-material",
      level: "lesson",
      materialKeys: ["lesson.mathematics.analytic-geometry"],
      order: 10,
      outcomes: [
        {
          code: "Matematika Tingkat Lanjut, Fase F, elemen Geometri",
          ...merdekaLearningOutcomes,
        },
        {
          code: "Bab 1 Lingkaran, Elips, dan Garis Singgung Lingkaran",
          ...advancedMathematicsBookXII,
        },
      ],
    }),
  ],
  key: "class-12-advanced-mathematics-analytic-geometry",
  materialCard: {
    de: {
      description: "Leite Kreisgleichungen aus der Geometrie her.",
      title: "Kreise, Ellipsen und Kreistangenten",
    },
    en: {
      description: "Derive circle equations from geometry.",
      title: "Circles, Ellipses, and Tangent Lines",
    },
    id: {
      description: "Turunkan persamaan lingkaran dari geometri.",
      title: "Lingkaran, Elips, dan Garis Singgung Lingkaran",
    },
    ms: {
      description: "Terbitkan persamaan bulatan daripada geometri.",
      title: "Bulatan, Elips dan Garis Tangen Bulatan",
    },
  },
  order: 10,
  translations: {
    de: {
      routeSlug: "kreise-ellipsen-und-kreistangenten",
      title: "Kreise, Ellipsen und Kreistangenten",
    },
    en: {
      routeSlug: "circles-ellipses-and-tangent-lines",
      title: "Circles, Ellipses, and Tangent Lines",
    },
    id: {
      routeSlug: "lingkaran-elips-dan-garis-singgung-lingkaran",
      title: "Lingkaran, Elips, dan Garis Singgung Lingkaran",
    },
    ms: {
      routeSlug: "bulatan-elips-dan-garis-tangen-bulatan",
      title: "Bulatan, Elips dan Garis Tangen Bulatan",
    },
  },
});

/** Kurikulum Merdeka Kelas 12 Matematika Tingkat Lanjut, Bab 2 Turunan Fungsi, from limits (A.1) to derivatives. */
const merdekaClass12DerivativeUnit = unitNode({
  children: [
    materialNode({
      key: "class-12-advanced-mathematics-limit-material",
      level: "lesson",
      materialKeys: ["lesson.mathematics.limit"],
      order: 10,
      outcomes: [
        {
          code: "Matematika Tingkat Lanjut, elemen Kalkulus (deskripsi elemen)",
          ...merdekaLearningOutcomes,
        },
        {
          code: "Bab 2 Turunan Fungsi, A.1 Limit dan Kontinuitas Fungsi",
          ...advancedMathematicsBookXII,
        },
      ],
    }),
    materialNode({
      key: "class-12-advanced-mathematics-derivative-function-material",
      level: "lesson",
      materialKeys: ["lesson.mathematics.derivative-function"],
      order: 20,
      outcomes: [
        {
          code: "Matematika Tingkat Lanjut, Fase F, elemen Kalkulus",
          ...merdekaLearningOutcomes,
        },
        { code: "Bab 2 Turunan Fungsi", ...advancedMathematicsBookXII },
      ],
    }),
  ],
  key: "class-12-advanced-mathematics-derivative-function",
  materialCard: {
    de: {
      description: "Von Grenzwerten zu Ableitungen und Extremwerten.",
      title: "Ableitungen",
    },
    en: {
      description: "Go from limits to derivatives, rates and extremes.",
      title: "Derivatives",
    },
    id: {
      description: "Dari limit ke turunan, laju, dan nilai ekstrem.",
      title: "Turunan Fungsi",
    },
    ms: {
      description: "Daripada had kepada pembezaan dan nilai ekstrem.",
      title: "Pembezaan",
    },
  },
  order: 20,
  translations: {
    de: { routeSlug: "ableitungen", title: "Ableitungen" },
    en: { routeSlug: "derivative-function", title: "Derivatives" },
    id: { routeSlug: "turunan-fungsi", title: "Turunan Fungsi" },
    ms: { routeSlug: "pembezaan", title: "Pembezaan" },
  },
});

/** Kurikulum Merdeka Kelas 12 Matematika Tingkat Lanjut, Bab 3 Integral. */
const merdekaClass12IntegralUnit = unitNode({
  children: [
    materialNode({
      key: "class-12-advanced-mathematics-integral-material",
      level: "lesson",
      materialKeys: ["lesson.mathematics.integral"],
      order: 10,
      outcomes: [
        {
          code: "Matematika Tingkat Lanjut, Fase F, elemen Kalkulus",
          ...merdekaLearningOutcomes,
        },
        { code: "Bab 3 Integral", ...advancedMathematicsBookXII },
      ],
    }),
  ],
  key: "class-12-advanced-mathematics-integral",
  materialCard: {
    de: {
      description: "Bestimme Flächeninhalte mit bestimmten Integralen.",
      title: "Integrale",
    },
    en: {
      description: "Find areas from definite integrals.",
      title: "Integrals",
    },
    id: { description: "Cari luas dari integral tentu.", title: "Integral" },
    ms: { description: "Cari luas daripada kamiran tentu.", title: "Kamiran" },
  },
  order: 30,
  translations: {
    de: { routeSlug: "integrale", title: "Integrale" },
    en: { routeSlug: "integral", title: "Integrals" },
    id: { routeSlug: "integral", title: "Integral" },
    ms: { routeSlug: "kamiran", title: "Kamiran" },
  },
});

/** Kurikulum Merdeka Kelas 12 Matematika Tingkat Lanjut, Bab 4 Analisis Data dan Peluang. */
const merdekaClass12DataProbabilityUnit = unitNode({
  children: [
    materialNode({
      key: "class-12-advanced-mathematics-data-analysis-probability-material",
      level: "lesson",
      materialKeys: ["lesson.mathematics.data-analysis-probability"],
      order: 10,
      outcomes: [
        {
          code: "Matematika Tingkat Lanjut, Fase F, elemen Analisis Data dan Peluang",
          ...merdekaLearningOutcomes,
        },
        {
          code: "Bab 4 Analisis Data dan Peluang",
          ...advancedMathematicsBookXII,
        },
      ],
    }),
  ],
  key: "class-12-advanced-mathematics-data-analysis-probability",
  materialCard: {
    de: {
      description: "Modelliere wiederholte Erfolge mit Wahrscheinlichkeiten.",
      title: "Datenanalyse und Wahrscheinlichkeit",
    },
    en: {
      description: "Model repeated success with probability.",
      title: "Data Analysis and Probability",
    },
    id: {
      description: "Modelkan keberhasilan berulang dengan peluang.",
      title: "Analisis Data dan Peluang",
    },
    ms: {
      description: "Modelkan kejayaan berulang dengan kebarangkalian.",
      title: "Analisis Data dan Kebarangkalian",
    },
  },
  order: 40,
  translations: {
    de: {
      routeSlug: "datenanalyse-und-wahrscheinlichkeit",
      title: "Datenanalyse und Wahrscheinlichkeit",
    },
    en: {
      routeSlug: "data-analysis-probability",
      title: "Data Analysis and Probability",
    },
    id: {
      routeSlug: "analisis-data-dan-peluang",
      title: "Analisis Data dan Peluang",
    },
    ms: {
      routeSlug: "analisis-data-dan-kebarangkalian",
      title: "Analisis Data dan Kebarangkalian",
    },
  },
});

/** The units of Kelas 12 Matematika Tingkat Lanjut, in the chapter order of its revised book. */
export const merdekaClass12AdvancedMathematicsTopicNodes = [
  merdekaClass12ConicUnit,
  merdekaClass12DerivativeUnit,
  merdekaClass12IntegralUnit,
  merdekaClass12DataProbabilityUnit,
];
