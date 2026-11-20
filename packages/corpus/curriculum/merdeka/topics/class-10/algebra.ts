import {
  mathematicsBookX,
  merdekaLearningOutcomes,
} from "#corpus/curriculum/merdeka/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** Kurikulum Merdeka Kelas 10 Matematika, Bab 1 Eksponen. */
export const merdekaClass10ExponentUnit = unitNode({
  children: [
    materialNode({
      key: "class-10-mathematics-exponential-logarithm-material",
      level: "lesson",
      materialKeys: ["lesson.mathematics.exponential-logarithm"],
      order: 10,
      outcomes: [
        {
          code: "Matematika, Fase E, elemen Bilangan",
          ...merdekaLearningOutcomes,
        },
        {
          code: "Matematika, Fase E, elemen Aljabar dan Fungsi",
          ...merdekaLearningOutcomes,
        },
        { code: "Bab 1 Eksponen", ...mathematicsBookX },
      ],
    }),
  ],
  key: "class-10-mathematics-exponential-logarithm",
  materialCard: {
    de: {
      description: "Leite Potenzen aus wiederholter Multiplikation ab.",
      title: "Potenzen",
    },
    en: {
      description: "Connect repeated multiplication to exponents.",
      title: "Exponents",
    },
    id: {
      description: "Hubungkan perkalian berulang dan eksponen.",
      title: "Eksponen",
    },
    ms: {
      description: "Kaitkan pendaraban berulang dengan indeks.",
      title: "Indeks",
    },
  },
  order: 10,
  translations: {
    de: { routeSlug: "potenzen", title: "Potenzen" },
    en: { routeSlug: "exponents", title: "Exponents" },
    id: { routeSlug: "eksponen", title: "Eksponen" },
    ms: { routeSlug: "indeks", title: "Indeks" },
  },
});

/** Kurikulum Merdeka Kelas 10 Matematika, Bab 2 Barisan dan Deret. */
export const merdekaClass10SequenceSeriesUnit = unitNode({
  children: [
    materialNode({
      key: "class-10-mathematics-sequence-series-material",
      level: "lesson",
      materialKeys: ["lesson.mathematics.sequence-series"],
      order: 10,
      outcomes: [{ code: "Bab 2 Barisan dan Deret", ...mathematicsBookX }],
    }),
  ],
  key: "class-10-mathematics-sequence-series",
  materialCard: {
    de: {
      description: "Bestimme Muster, Glieder und Summen.",
      title: "Folgen und Reihen",
    },
    en: {
      description: "Find patterns, terms, and sums.",
      title: "Sequences and Series",
    },
    id: {
      description: "Temukan pola, suku, dan jumlah.",
      title: "Barisan dan Deret",
    },
    ms: {
      description: "Cari pola, sebutan dan hasil tambah.",
      title: "Jujukan dan Siri",
    },
  },
  order: 20,
  translations: {
    de: { routeSlug: "folgen-und-reihen", title: "Folgen und Reihen" },
    en: { routeSlug: "sequence-series", title: "Sequences and Series" },
    id: { routeSlug: "barisan-dan-deret", title: "Barisan dan Deret" },
    ms: { routeSlug: "jujukan-dan-siri", title: "Jujukan dan Siri" },
  },
});

/** Kurikulum Merdeka Kelas 10 Matematika, Bab 4 Sistem Persamaan dan Pertidaksamaan Linear. */
export const merdekaClass10LinearSystemUnit = unitNode({
  children: [
    materialNode({
      key: "class-10-mathematics-linear-equation-inequality-material",
      level: "lesson",
      materialKeys: ["lesson.mathematics.linear-equation-inequality"],
      order: 10,
      outcomes: [
        {
          code: "Matematika, Fase E, elemen Aljabar dan Fungsi",
          ...merdekaLearningOutcomes,
        },
        {
          code: "Bab 4 Sistem Persamaan dan Pertidaksamaan Linear",
          ...mathematicsBookX,
        },
      ],
    }),
  ],
  key: "class-10-mathematics-linear-equation-inequality",
  materialCard: {
    de: {
      description: "Löse lineare Zusammenhänge mit algebraischen Verfahren.",
      title: "Lineare Gleichungs- und Ungleichungssysteme",
    },
    en: {
      description: "Solve linear relations with algebra.",
      title: "Systems of Linear Equations and Inequalities",
    },
    id: {
      description: "Selesaikan relasi linear dengan aljabar.",
      title: "Sistem Persamaan dan Pertidaksamaan Linear",
    },
    ms: {
      description: "Selesaikan hubungan linear dengan algebra.",
      title: "Sistem Persamaan dan Ketaksamaan Linear",
    },
  },
  order: 40,
  translations: {
    de: {
      routeSlug: "lineare-gleichungs-und-ungleichungssysteme",
      title: "Lineare Gleichungs- und Ungleichungssysteme",
    },
    en: {
      routeSlug: "systems-of-linear-equations-and-inequalities",
      title: "Systems of Linear Equations and Inequalities",
    },
    id: {
      routeSlug: "sistem-persamaan-dan-pertidaksamaan-linear",
      title: "Sistem Persamaan dan Pertidaksamaan Linear",
    },
    ms: {
      routeSlug: "sistem-persamaan-dan-ketaksamaan-linear",
      title: "Sistem Persamaan dan Ketaksamaan Linear",
    },
  },
});

/** Kurikulum Merdeka Kelas 10 Matematika, Bab 5 Persamaan dan Fungsi Kuadrat. */
export const merdekaClass10QuadraticUnit = unitNode({
  children: [
    materialNode({
      key: "class-10-mathematics-quadratic-function-material",
      level: "lesson",
      materialKeys: ["lesson.mathematics.quadratic-function"],
      order: 10,
      outcomes: [
        {
          code: "Matematika, Fase E, elemen Aljabar dan Fungsi",
          ...merdekaLearningOutcomes,
        },
        { code: "Bab 5 Persamaan dan Fungsi Kuadrat", ...mathematicsBookX },
      ],
    }),
  ],
  key: "class-10-mathematics-quadratic-function",
  materialCard: {
    de: {
      description: "Lies Nullstellen und Veränderungen an Parabeln ab.",
      title: "Quadratische Gleichungen und Funktionen",
    },
    en: {
      description: "Read graphs, roots, and quadratic change.",
      title: "Quadratic Equations and Functions",
    },
    id: {
      description: "Baca grafik, akar, dan perubahan kuadrat.",
      title: "Persamaan dan Fungsi Kuadrat",
    },
    ms: {
      description: "Baca graf, punca dan perubahan kuadratik.",
      title: "Persamaan dan Fungsi Kuadratik",
    },
  },
  order: 50,
  translations: {
    de: {
      routeSlug: "quadratische-gleichungen-und-funktionen",
      title: "Quadratische Gleichungen und Funktionen",
    },
    en: {
      routeSlug: "quadratic-equations-and-functions",
      title: "Quadratic Equations and Functions",
    },
    id: {
      routeSlug: "persamaan-dan-fungsi-kuadrat",
      title: "Persamaan dan Fungsi Kuadrat",
    },
    ms: {
      routeSlug: "persamaan-dan-fungsi-kuadratik",
      title: "Persamaan dan Fungsi Kuadratik",
    },
  },
});
