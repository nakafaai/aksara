import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** The KSSM Form 5 Additional Mathematics chapters, in the order of their DSKP. */
export const kssmForm5AdditionalMathematicsTopicNodes = [
  unitNode({
    children: [
      materialNode({
        key: "form-5-additional-mathematics-circular-measure-circle-arc-sector",
        level: "lesson",
        materialKeys: ["lesson.mathematics.circle-arc-sector"],
        order: 10,
      }),
    ],
    key: "form-5-additional-mathematics-circular-measure",
    materialCard: {
      de: {
        description: "Nutze Bogenmaß für Bogenlänge und Sektorfläche.",
        title: "Bogenmaß",
      },
      en: {
        description: "Use radians for arc length and sector area.",
        title: "Circular Measure",
      },
      id: {
        description: "Pakai radian untuk panjang busur dan luas juring.",
        title: "Ukuran Radian",
      },
      ms: {
        description: "Guna radian untuk panjang lengkok dan luas sektor.",
        title: "Sukatan Membulat",
      },
    },
    order: 10,
    translations: {
      de: { routeSlug: "bogenmass", title: "Bogenmaß" },
      en: { routeSlug: "circular-measure", title: "Circular Measure" },
      id: { routeSlug: "ukuran-radian", title: "Ukuran Radian" },
      ms: { routeSlug: "sukatan-membulat", title: "Sukatan Membulat" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-5-additional-mathematics-differentiation-derivative-function",
        level: "lesson",
        materialKeys: ["lesson.mathematics.derivative-function"],
        order: 10,
      }),
    ],
    key: "form-5-additional-mathematics-differentiation",
    materialCard: {
      de: {
        description: "Leite Funktionen ab und finde Extrempunkte.",
        title: "Differentialrechnung",
      },
      en: {
        description: "Differentiate functions and find turning points.",
        title: "Differentiation",
      },
      id: {
        description: "Turunkan fungsi dan cari titik stasioner.",
        title: "Turunan",
      },
      ms: {
        description: "Bezakan fungsi dan cari titik pusingan.",
        title: "Pembezaan",
      },
    },
    order: 20,
    translations: {
      de: { routeSlug: "differentialrechnung", title: "Differentialrechnung" },
      en: { routeSlug: "differentiation", title: "Differentiation" },
      id: { routeSlug: "turunan", title: "Turunan" },
      ms: { routeSlug: "pembezaan", title: "Pembezaan" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-5-additional-mathematics-integration-integral",
        level: "lesson",
        materialKeys: ["lesson.mathematics.integral"],
        order: 10,
      }),
    ],
    key: "form-5-additional-mathematics-integration",
    materialCard: {
      de: {
        description: "Integriere Funktionen und berechne Flächen.",
        title: "Integralrechnung",
      },
      en: {
        description: "Integrate functions and find areas under curves.",
        title: "Integration",
      },
      id: {
        description: "Integralkan fungsi dan hitung luas di bawah kurva.",
        title: "Integral",
      },
      ms: {
        description: "Kamirkan fungsi dan cari luas di bawah lengkung.",
        title: "Pengamiran",
      },
    },
    order: 30,
    translations: {
      de: { routeSlug: "integralrechnung", title: "Integralrechnung" },
      en: { routeSlug: "integration", title: "Integration" },
      id: { routeSlug: "integral", title: "Integral" },
      ms: { routeSlug: "pengamiran", title: "Pengamiran" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-5-additional-mathematics-permutation-and-combination-combinatorics",
        level: "lesson",
        materialKeys: ["lesson.mathematics.combinatorics"],
        order: 10,
      }),
    ],
    key: "form-5-additional-mathematics-permutation-and-combination",
    materialCard: {
      de: {
        description: "Zähle Anordnungen und Auswahlen.",
        title: "Permutationen und Kombinationen",
      },
      en: {
        description: "Count arrangements and selections.",
        title: "Permutation and Combination",
      },
      id: {
        description: "Hitung banyak susunan dan pilihan.",
        title: "Permutasi dan Kombinasi",
      },
      ms: {
        description: "Kira bilangan susunan dan pilihan.",
        title: "Pilih Atur dan Gabungan",
      },
    },
    order: 40,
    translations: {
      de: {
        routeSlug: "permutationen-und-kombinationen",
        title: "Permutationen und Kombinationen",
      },
      en: {
        routeSlug: "permutation-and-combination",
        title: "Permutation and Combination",
      },
      id: {
        routeSlug: "permutasi-dan-kombinasi",
        title: "Permutasi dan Kombinasi",
      },
      ms: {
        routeSlug: "pilih-atur-dan-gabungan",
        title: "Pilih Atur dan Gabungan",
      },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-5-additional-mathematics-probability-distribution-data-analysis-probability",
        level: "lesson",
        materialKeys: ["lesson.mathematics.data-analysis-probability"],
        order: 10,
      }),
    ],
    key: "form-5-additional-mathematics-probability-distribution",
    materialCard: {
      de: {
        description: "Nutze Binomial- und Normalverteilung.",
        title: "Wahrscheinlichkeitsverteilungen",
      },
      en: {
        description: "Use the binomial and normal distributions.",
        title: "Probability Distribution",
      },
      id: {
        description: "Pakai distribusi binomial dan distribusi normal.",
        title: "Distribusi Peluang",
      },
      ms: {
        description: "Guna taburan binomial dan taburan normal.",
        title: "Taburan Kebarangkalian",
      },
    },
    order: 50,
    translations: {
      de: {
        routeSlug: "wahrscheinlichkeitsverteilungen",
        title: "Wahrscheinlichkeitsverteilungen",
      },
      en: {
        routeSlug: "probability-distribution",
        title: "Probability Distribution",
      },
      id: { routeSlug: "distribusi-peluang", title: "Distribusi Peluang" },
      ms: {
        routeSlug: "taburan-kebarangkalian",
        title: "Taburan Kebarangkalian",
      },
    },
  }),
  unitNode({
    key: "form-5-additional-mathematics-trigonometric-functions",
    order: 60,
    translations: {
      de: {
        routeSlug: "trigonometrische-funktionen",
        title: "Trigonometrische Funktionen",
      },
      en: {
        routeSlug: "trigonometric-functions",
        title: "Trigonometric Functions",
      },
      id: { routeSlug: "fungsi-trigonometri", title: "Fungsi Trigonometri" },
      ms: { routeSlug: "fungsi-trigonometri", title: "Fungsi Trigonometri" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-5-additional-mathematics-linear-programming-linear-programming",
        level: "lesson",
        materialKeys: ["lesson.mathematics.linear-programming"],
        order: 10,
      }),
    ],
    key: "form-5-additional-mathematics-linear-programming",
    materialCard: {
      de: {
        description: "Schraffiere Bereiche und optimiere an den Ecken.",
        title: "Lineare Optimierung",
      },
      en: {
        description: "Shade feasible regions and optimise at vertices.",
        title: "Linear Programming",
      },
      id: {
        description: "Arsir daerah penyelesaian dan uji titik pojok.",
        title: "Program Linear",
      },
      ms: {
        description: "Lorek rantau tersaur dan uji nilai pada bucu.",
        title: "Pengaturcaraan Linear",
      },
    },
    order: 70,
    translations: {
      de: { routeSlug: "lineare-optimierung", title: "Lineare Optimierung" },
      en: { routeSlug: "linear-programming", title: "Linear Programming" },
      id: { routeSlug: "program-linear", title: "Program Linear" },
      ms: {
        routeSlug: "pengaturcaraan-linear",
        title: "Pengaturcaraan Linear",
      },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-5-additional-mathematics-kinematics-of-linear-motion-linear-kinematics",
        level: "lesson",
        materialKeys: ["lesson.mathematics.linear-kinematics"],
        order: 10,
      }),
    ],
    key: "form-5-additional-mathematics-kinematics-of-linear-motion",
    materialCard: {
      de: {
        description: "Leite Ort ab und integriere Beschleunigung.",
        title: "Kinematik geradliniger Bewegung",
      },
      en: {
        description: "Differentiate displacement, integrate acceleration.",
        title: "Kinematics of Linear Motion",
      },
      id: {
        description: "Turunkan perpindahan, integralkan percepatan.",
        title: "Kinematika Gerak Lurus",
      },
      ms: {
        description: "Bezakan sesaran dan kamirkan pecutan.",
        title: "Kinematik Gerakan Linear",
      },
    },
    order: 80,
    translations: {
      de: {
        routeSlug: "kinematik-geradliniger-bewegung",
        title: "Kinematik geradliniger Bewegung",
      },
      en: {
        routeSlug: "kinematics-of-linear-motion",
        title: "Kinematics of Linear Motion",
      },
      id: {
        routeSlug: "kinematika-gerak-lurus",
        title: "Kinematika Gerak Lurus",
      },
      ms: {
        routeSlug: "kinematik-gerakan-linear",
        title: "Kinematik Gerakan Linear",
      },
    },
  }),
];
