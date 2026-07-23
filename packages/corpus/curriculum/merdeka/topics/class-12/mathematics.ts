import { materialNode, unitNode } from "#corpus/curriculum/schema";

export const merdekaClass12MathematicsTopicNodes = [
  unitNode({
    children: [
      materialNode({
        key: "class-12-mathematics-analytic-geometry-material",
        level: "lesson",
        materialKeys: ["lesson.mathematics.analytic-geometry"],
        order: 10,
      }),
    ],
    key: "class-12-mathematics-analytic-geometry",
    materialCard: {
      en: {
        description: "Derive circle equations from geometry.",
        title: "Analytic Geometry",
      },
      id: {
        description: "Turunkan persamaan lingkaran dari geometri.",
        title: "Geometri Analitik",
      },
    },
    order: 10,
    translations: {
      en: { routeSlug: "analytic-geometry", title: "Analytic Geometry" },
      id: { routeSlug: "geometri-analitik", title: "Geometri Analitik" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "class-12-mathematics-circle-arc-sector-material",
        level: "lesson",
        materialKeys: ["lesson.mathematics.circle-arc-sector"],
        order: 10,
      }),
    ],
    key: "class-12-mathematics-circle-arc-sector",
    materialCard: {
      en: {
        description: "Relate arcs, angles, and sector area.",
        title: "Arcs and Sectors",
      },
      id: {
        description: "Hubungkan busur, sudut, dan luas juring.",
        title: "Busur dan Juring",
      },
    },
    order: 20,
    translations: {
      en: { routeSlug: "circle-arc-sector", title: "Arcs and Sectors" },
      id: {
        routeSlug: "busur-dan-juring-lingkaran",
        title: "Busur dan Juring",
      },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "class-12-mathematics-combinatorics-material",
        level: "lesson",
        materialKeys: ["lesson.mathematics.combinatorics"],
        order: 10,
      }),
    ],
    key: "class-12-mathematics-combinatorics",
    materialCard: {
      en: {
        description: "Expand powers with binomial coefficients.",
        title: "Combinatorics",
      },
      id: {
        description: "Kembangkan pangkat dengan koefisien binomial.",
        title: "Kombinatorika",
      },
    },
    order: 30,
    translations: {
      en: { routeSlug: "combinatorics", title: "Combinatorics" },
      id: { routeSlug: "kombinatorik", title: "Kombinatorika" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "class-12-mathematics-data-analysis-probability-material",
        level: "lesson",
        materialKeys: ["lesson.mathematics.data-analysis-probability"],
        order: 10,
      }),
    ],
    key: "class-12-mathematics-data-analysis-probability",
    materialCard: {
      en: {
        description: "Model repeated success with probability.",
        title: "Data Analysis and Probability",
      },
      id: {
        description: "Modelkan keberhasilan berulang dengan peluang.",
        title: "Analisis Data dan Peluang",
      },
    },
    order: 40,
    translations: {
      en: {
        routeSlug: "data-analysis-probability",
        title: "Data Analysis and Probability",
      },
      id: {
        routeSlug: "analisis-data-dan-peluang",
        title: "Analisis Data dan Peluang",
      },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "class-12-mathematics-derivative-function-material",
        level: "lesson",
        materialKeys: ["lesson.mathematics.derivative-function"],
        order: 10,
      }),
    ],
    key: "class-12-mathematics-derivative-function",
    materialCard: {
      en: {
        description: "Use derivatives for rates and height.",
        title: "Derivatives",
      },
      id: {
        description: "Gunakan turunan untuk laju dan tinggi.",
        title: "Turunan",
      },
    },
    order: 50,
    translations: {
      en: { routeSlug: "derivative-function", title: "Derivatives" },
      id: { routeSlug: "turunan-fungsi", title: "Turunan" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "class-12-mathematics-function-transformation-material",
        level: "lesson",
        materialKeys: ["lesson.mathematics.function-transformation"],
        order: 10,
      }),
    ],
    key: "class-12-mathematics-function-transformation",
    materialCard: {
      en: {
        description: "Shift, stretch, and reflect function graphs.",
        title: "Function Transformations",
      },
      id: {
        description: "Geser, regang, dan cerminkan grafik fungsi.",
        title: "Transformasi Fungsi",
      },
    },
    order: 60,
    translations: {
      en: {
        routeSlug: "function-transformation",
        title: "Function Transformations",
      },
      id: { routeSlug: "transformasi-fungsi", title: "Transformasi Fungsi" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "class-12-mathematics-integral-material",
        level: "lesson",
        materialKeys: ["lesson.mathematics.integral"],
        order: 10,
      }),
    ],
    key: "class-12-mathematics-integral",
    materialCard: {
      en: {
        description: "Find areas from definite integrals.",
        title: "Integrals",
      },
      id: {
        description: "Cari luas dari integral tentu.",
        title: "Integral",
      },
    },
    order: 70,
    translations: {
      en: { routeSlug: "integral", title: "Integrals" },
      id: { routeSlug: "integral", title: "Integral" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "class-12-mathematics-limit-material",
        level: "lesson",
        materialKeys: ["lesson.mathematics.limit"],
        order: 10,
      }),
    ],
    key: "class-12-mathematics-limit",
    materialCard: {
      en: {
        description: "Use limits to read change.",
        title: "Limits",
      },
      id: {
        description: "Gunakan limit untuk membaca perubahan.",
        title: "Limit",
      },
    },
    order: 80,
    translations: {
      en: { routeSlug: "limit", title: "Limits" },
      id: { routeSlug: "limit", title: "Limit" },
    },
  }),
];
