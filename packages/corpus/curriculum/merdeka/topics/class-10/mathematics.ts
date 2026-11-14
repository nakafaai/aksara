import {
  merdekaClass10ProbabilityUnit,
  merdekaClass10StatisticsFoundationsUnit,
} from "#corpus/curriculum/merdeka/topics/class-10/statistics";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

export const merdekaClass10MathematicsTopicNodes = [
  unitNode({
    children: [
      materialNode({
        key: "class-10-mathematics-exponential-logarithm-material",
        level: "lesson",
        materialKeys: ["lesson.mathematics.exponential-logarithm"],
        order: 10,
      }),
    ],
    key: "class-10-mathematics-exponential-logarithm",
    materialCard: {
      de: {
        description: "Leite Potenzen aus wiederholter Multiplikation ab.",
        title: "Potenzen und Logarithmen",
      },
      en: {
        description: "Connect repeated multiplication to exponents.",
        title: "Exponents and Logarithms",
      },
      id: {
        description: "Hubungkan perkalian berulang dan eksponen.",
        title: "Eksponen dan Logaritma",
      },
      ms: {
        description: "Kaitkan pendaraban berulang dengan indeks.",
        title: "Indeks dan Logaritma",
      },
    },
    order: 10,
    translations: {
      de: {
        routeSlug: "potenzen-und-logarithmen",
        title: "Potenzen und Logarithmen",
      },
      en: {
        routeSlug: "exponential-logarithm",
        title: "Exponents and Logarithms",
      },
      id: {
        routeSlug: "eksponen-dan-logaritma",
        title: "Eksponen dan Logaritma",
      },
      ms: { routeSlug: "indeks-dan-logaritma", title: "Indeks dan Logaritma" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "class-10-mathematics-linear-equation-inequality-material",
        level: "lesson",
        materialKeys: ["lesson.mathematics.linear-equation-inequality"],
        order: 10,
      }),
    ],
    key: "class-10-mathematics-linear-equation-inequality",
    materialCard: {
      de: {
        description: "Löse lineare Zusammenhänge mit algebraischen Verfahren.",
        title: "Lineare Gleichungen und Ungleichungen",
      },
      en: {
        description: "Solve linear relations with algebra.",
        title: "Linear Equations and Inequalities",
      },
      id: {
        description: "Selesaikan relasi linear dengan aljabar.",
        title: "Persamaan dan Pertidaksamaan Linear",
      },
      ms: {
        description: "Selesaikan hubungan linear dengan algebra.",
        title: "Persamaan dan Ketaksamaan Linear",
      },
    },
    order: 20,
    translations: {
      de: {
        routeSlug: "lineare-gleichungen-und-ungleichungen",
        title: "Lineare Gleichungen und Ungleichungen",
      },
      en: {
        routeSlug: "linear-equation-inequality",
        title: "Linear Equations and Inequalities",
      },
      id: {
        routeSlug: "sistem-persamaan-dan-pertidaksamaan-linear",
        title: "Persamaan dan Pertidaksamaan Linear",
      },
      ms: {
        routeSlug: "persamaan-dan-ketaksamaan-linear",
        title: "Persamaan dan Ketaksamaan Linear",
      },
    },
  }),
  merdekaClass10ProbabilityUnit,
  unitNode({
    children: [
      materialNode({
        key: "class-10-mathematics-quadratic-function-material",
        level: "lesson",
        materialKeys: ["lesson.mathematics.quadratic-function"],
        order: 10,
      }),
    ],
    key: "class-10-mathematics-quadratic-function",
    materialCard: {
      de: {
        description: "Lies Nullstellen und Veränderungen an Parabeln ab.",
        title: "Quadratische Funktionen",
      },
      en: {
        description: "Read graphs, roots, and quadratic change.",
        title: "Quadratic Functions",
      },
      id: {
        description: "Baca grafik, akar, dan perubahan kuadrat.",
        title: "Fungsi Kuadrat",
      },
      ms: {
        description: "Baca graf, punca dan perubahan kuadratik.",
        title: "Fungsi Kuadratik",
      },
    },
    order: 40,
    translations: {
      de: {
        routeSlug: "quadratische-funktionen",
        title: "Quadratische Funktionen",
      },
      en: { routeSlug: "quadratic-function", title: "Quadratic Functions" },
      id: {
        routeSlug: "persamaan-dan-fungsi-kuadrat",
        title: "Fungsi Kuadrat",
      },
      ms: { routeSlug: "fungsi-kuadratik", title: "Fungsi Kuadratik" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "class-10-mathematics-sequence-series-material",
        level: "lesson",
        materialKeys: ["lesson.mathematics.sequence-series"],
        order: 10,
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
    order: 50,
    translations: {
      de: { routeSlug: "folgen-und-reihen", title: "Folgen und Reihen" },
      en: { routeSlug: "sequence-series", title: "Sequences and Series" },
      id: { routeSlug: "barisan-dan-deret", title: "Barisan dan Deret" },
      ms: { routeSlug: "jujukan-dan-siri", title: "Jujukan dan Siri" },
    },
  }),
  merdekaClass10StatisticsFoundationsUnit,
  unitNode({
    children: [
      materialNode({
        key: "class-10-mathematics-trigonometry-material",
        level: "lesson",
        materialKeys: ["lesson.mathematics.trigonometry"],
        order: 10,
      }),
    ],
    key: "class-10-mathematics-trigonometry",
    materialCard: {
      de: {
        description: "Ordne Dreiecksseiten den passenden Verhältnissen zu.",
        title: "Trigonometrie",
      },
      en: {
        description: "Match triangle sides to ratios.",
        title: "Trigonometry",
      },
      id: {
        description: "Cocokkan sisi segitiga dengan rasio.",
        title: "Trigonometri",
      },
      ms: {
        description: "Padankan sisi segi tiga dengan nisbahnya.",
        title: "Trigonometri",
      },
    },
    order: 70,
    translations: {
      de: { routeSlug: "trigonometrie", title: "Trigonometrie" },
      en: { routeSlug: "trigonometry", title: "Trigonometry" },
      id: { routeSlug: "trigonometri", title: "Trigonometri" },
      ms: { routeSlug: "trigonometri", title: "Trigonometri" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "class-10-mathematics-vector-operations-material",
        level: "lesson",
        materialKeys: ["lesson.mathematics.vector-operations"],
        order: 10,
      }),
    ],
    key: "class-10-mathematics-vector-operations",
    materialCard: {
      de: {
        description: "Arbeite mit Vektorschreibweise, Betrag und Richtung.",
        title: "Vektorrechnung",
      },
      en: {
        description: "Work with vector notation and direction.",
        title: "Vector Operations",
      },
      id: {
        description: "Olah notasi dan arah vektor.",
        title: "Operasi Vektor",
      },
      ms: {
        description: "Guna tatatanda dan arah vektor.",
        title: "Operasi Vektor",
      },
    },
    order: 80,
    translations: {
      de: { routeSlug: "vektorrechnung", title: "Vektorrechnung" },
      en: { routeSlug: "vector-operations", title: "Vector Operations" },
      id: { routeSlug: "vektor-dan-operasinya", title: "Operasi Vektor" },
      ms: { routeSlug: "operasi-vektor", title: "Operasi Vektor" },
    },
  }),
];
