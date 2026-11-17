import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** The KSSM Form 4 Additional Mathematics chapters, in the order of their DSKP. */
export const kssmForm4AdditionalMathematicsTopicNodes = [
  unitNode({
    children: [
      materialNode({
        key: "form-4-additional-mathematics-functions-function-composition-inverse-function",
        level: "lesson",
        materialKeys: [
          "lesson.mathematics.function-composition-inverse-function",
        ],
        order: 10,
      }),
    ],
    key: "form-4-additional-mathematics-functions",
    materialCard: {
      de: {
        description: "Verkette Funktionen und bilde Umkehrfunktionen.",
        title: "Funktionen",
      },
      en: {
        description: "Compose functions and find inverse functions.",
        title: "Functions",
      },
      id: {
        description: "Susun fungsi komposisi dan cari fungsi invers.",
        title: "Fungsi",
      },
      ms: {
        description: "Gubah fungsi gubahan dan cari fungsi songsang.",
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
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-4-additional-mathematics-quadratic-functions-quadratic-function",
        level: "lesson",
        materialKeys: ["lesson.mathematics.quadratic-function"],
        order: 10,
      }),
    ],
    key: "form-4-additional-mathematics-quadratic-functions",
    materialCard: {
      de: {
        description: "Finde Nullstellen, deute die Diskriminante, zeichne.",
        title: "Quadratische Funktionen",
      },
      en: {
        description: "Find roots, read the discriminant, sketch parabolas.",
        title: "Quadratic Functions",
      },
      id: {
        description: "Cari akar, baca diskriminan, dan gambar parabola.",
        title: "Fungsi Kuadrat",
      },
      ms: {
        description: "Cari punca, baca pembeza layan, lakar parabola.",
        title: "Fungsi Kuadratik",
      },
    },
    order: 20,
    translations: {
      de: {
        routeSlug: "quadratische-funktionen",
        title: "Quadratische Funktionen",
      },
      en: { routeSlug: "quadratic-functions", title: "Quadratic Functions" },
      id: { routeSlug: "fungsi-kuadrat", title: "Fungsi Kuadrat" },
      ms: { routeSlug: "fungsi-kuadratik", title: "Fungsi Kuadratik" },
    },
  }),
  unitNode({
    key: "form-4-additional-mathematics-systems-of-equations",
    order: 30,
    translations: {
      de: { routeSlug: "gleichungssysteme", title: "Gleichungssysteme" },
      en: { routeSlug: "systems-of-equations", title: "Systems of Equations" },
      id: { routeSlug: "sistem-persamaan", title: "Sistem Persamaan" },
      ms: { routeSlug: "sistem-persamaan", title: "Sistem Persamaan" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-4-additional-mathematics-indices-surds-and-logarithms-exponential-logarithm",
        level: "lesson",
        materialKeys: ["lesson.mathematics.exponential-logarithm"],
        order: 10,
      }),
    ],
    key: "form-4-additional-mathematics-indices-surds-and-logarithms",
    materialCard: {
      de: {
        description: "Vereinfache Potenzen und Wurzeln, löse Logarithmen.",
        title: "Potenzen, Wurzeln und Logarithmen",
      },
      en: {
        description: "Simplify indices and surds, solve log equations.",
        title: "Indices, Surds and Logarithms",
      },
      id: {
        description: "Sederhanakan eksponen dan akar, selesaikan logaritma.",
        title: "Eksponen, Bentuk Akar, dan Logaritma",
      },
      ms: {
        description: "Permudah indeks dan surd, selesaikan logaritma.",
        title: "Indeks, Surd dan Logaritma",
      },
    },
    order: 40,
    translations: {
      de: {
        routeSlug: "potenzen-wurzeln-und-logarithmen",
        title: "Potenzen, Wurzeln und Logarithmen",
      },
      en: {
        routeSlug: "indices-surds-and-logarithms",
        title: "Indices, Surds and Logarithms",
      },
      id: {
        routeSlug: "eksponen-bentuk-akar-dan-logaritma",
        title: "Eksponen, Bentuk Akar, dan Logaritma",
      },
      ms: {
        routeSlug: "indeks-surd-dan-logaritma",
        title: "Indeks, Surd dan Logaritma",
      },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-4-additional-mathematics-progressions-sequence-series",
        level: "lesson",
        materialKeys: ["lesson.mathematics.sequence-series"],
        order: 10,
      }),
    ],
    key: "form-4-additional-mathematics-progressions",
    materialCard: {
      de: {
        description: "Berechne Glieder und Summen von Folgen und Reihen.",
        title: "Folgen und Reihen",
      },
      en: {
        description: "Find terms and sums of arithmetic and geometric series.",
        title: "Progressions",
      },
      id: {
        description: "Hitung suku dan jumlah barisan dan deret.",
        title: "Barisan dan Deret",
      },
      ms: {
        description: "Kira sebutan dan hasil tambah janjang.",
        title: "Janjang",
      },
    },
    order: 50,
    translations: {
      de: { routeSlug: "folgen-und-reihen", title: "Folgen und Reihen" },
      en: { routeSlug: "progressions", title: "Progressions" },
      id: { routeSlug: "barisan-dan-deret", title: "Barisan dan Deret" },
      ms: { routeSlug: "janjang", title: "Janjang" },
    },
  }),
  unitNode({
    key: "form-4-additional-mathematics-linear-law",
    order: 60,
    translations: {
      de: { routeSlug: "linearisierung", title: "Linearisierung" },
      en: { routeSlug: "linear-law", title: "Linear Law" },
      id: { routeSlug: "hukum-linear", title: "Hukum Linear" },
      ms: { routeSlug: "hukum-linear", title: "Hukum Linear" },
    },
  }),
  unitNode({
    key: "form-4-additional-mathematics-coordinate-geometry",
    order: 70,
    translations: {
      de: { routeSlug: "koordinatengeometrie", title: "Koordinatengeometrie" },
      en: { routeSlug: "coordinate-geometry", title: "Coordinate Geometry" },
      id: { routeSlug: "geometri-koordinat", title: "Geometri Koordinat" },
      ms: { routeSlug: "geometri-koordinat", title: "Geometri Koordinat" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-4-additional-mathematics-vectors-vector-operations",
        level: "lesson",
        materialKeys: ["lesson.mathematics.vector-operations"],
        order: 10,
      }),
    ],
    key: "form-4-additional-mathematics-vectors",
    materialCard: {
      de: {
        description: "Addiere, subtrahiere und skaliere Vektoren.",
        title: "Vektoren",
      },
      en: {
        description: "Add, subtract and scale vectors.",
        title: "Vectors",
      },
      id: {
        description: "Jumlahkan, kurangkan, dan skalakan vektor.",
        title: "Vektor",
      },
      ms: {
        description: "Tambah, tolak dan darab vektor dengan skalar.",
        title: "Vektor",
      },
    },
    order: 80,
    translations: {
      de: { routeSlug: "vektoren", title: "Vektoren" },
      en: { routeSlug: "vectors", title: "Vectors" },
      id: { routeSlug: "vektor", title: "Vektor" },
      ms: { routeSlug: "vektor", title: "Vektor" },
    },
  }),
  unitNode({
    key: "form-4-additional-mathematics-solution-of-triangles",
    order: 90,
    translations: {
      de: { routeSlug: "dreiecksberechnung", title: "Dreiecksberechnung" },
      en: {
        routeSlug: "solution-of-triangles",
        title: "Solution of Triangles",
      },
      id: {
        routeSlug: "penyelesaian-segitiga",
        title: "Penyelesaian Segitiga",
      },
      ms: {
        routeSlug: "penyelesaian-segi-tiga",
        title: "Penyelesaian Segi Tiga",
      },
    },
  }),
  unitNode({
    key: "form-4-additional-mathematics-index-numbers",
    order: 100,
    translations: {
      de: { routeSlug: "indexzahlen", title: "Indexzahlen" },
      en: { routeSlug: "index-numbers", title: "Index Numbers" },
      id: { routeSlug: "angka-indeks", title: "Angka Indeks" },
      ms: { routeSlug: "nombor-indeks", title: "Nombor Indeks" },
    },
  }),
];
