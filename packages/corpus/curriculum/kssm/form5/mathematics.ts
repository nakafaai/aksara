import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** The KSSM Form 5 Mathematics chapters, in the order of their DSKP. */
export const kssmForm5MathematicsTopicNodes = [
  unitNode({
    key: "form-5-mathematics-variation",
    order: 10,
    translations: {
      de: { routeSlug: "proportionalitaet", title: "Proportionalität" },
      en: { routeSlug: "variation", title: "Variation" },
      id: { routeSlug: "variasi", title: "Variasi" },
      ms: { routeSlug: "ubahan", title: "Ubahan" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-5-mathematics-matrices-matrix",
        level: "lesson",
        materialKeys: ["lesson.mathematics.matrix"],
        order: 10,
      }),
    ],
    key: "form-5-mathematics-matrices",
    order: 20,
    translations: {
      de: { routeSlug: "matrizen", title: "Matrizen" },
      en: { routeSlug: "matrices", title: "Matrices" },
      id: { routeSlug: "matriks", title: "Matriks" },
      ms: { routeSlug: "matriks", title: "Matriks" },
    },
  }),
  unitNode({
    key: "form-5-mathematics-consumer-mathematics-insurance",
    order: 30,
    translations: {
      de: {
        routeSlug: "verbrauchermathematik-versicherung",
        title: "Verbrauchermathematik: Versicherung",
      },
      en: {
        routeSlug: "consumer-mathematics-insurance",
        title: "Consumer Mathematics: Insurance",
      },
      id: {
        routeSlug: "matematika-konsumen-asuransi",
        title: "Matematika Konsumen: Asuransi",
      },
      ms: {
        routeSlug: "matematik-pengguna-insurans",
        title: "Matematik Pengguna: Insurans",
      },
    },
  }),
  unitNode({
    key: "form-5-mathematics-consumer-mathematics-taxation",
    order: 40,
    translations: {
      de: {
        routeSlug: "verbrauchermathematik-steuern",
        title: "Verbrauchermathematik: Steuern",
      },
      en: {
        routeSlug: "consumer-mathematics-taxation",
        title: "Consumer Mathematics: Taxation",
      },
      id: {
        routeSlug: "matematika-konsumen-perpajakan",
        title: "Matematika Konsumen: Perpajakan",
      },
      ms: {
        routeSlug: "matematik-pengguna-percukaian",
        title: "Matematik Pengguna: Percukaian",
      },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-5-mathematics-congruency-enlargement-and-combined-transformations-geometric-transformation",
        level: "lesson",
        materialKeys: ["lesson.mathematics.geometric-transformation"],
        order: 10,
      }),
    ],
    key: "form-5-mathematics-congruency-enlargement-and-combined-transformations",
    order: 50,
    translations: {
      de: {
        routeSlug: "kongruenz-streckung-und-verkettete-abbildungen",
        title: "Kongruenz, Streckung und verkettete Abbildungen",
      },
      en: {
        routeSlug: "congruency-enlargement-and-combined-transformations",
        title: "Congruency, Enlargement and Combined Transformations",
      },
      id: {
        routeSlug: "kekongruenan-dilatasi-dan-komposisi-transformasi",
        title: "Kekongruenan, Dilatasi, dan Komposisi Transformasi",
      },
      ms: {
        routeSlug: "kekongruenan-pembesaran-dan-gabungan-transformasi",
        title: "Kekongruenan, Pembesaran dan Gabungan Transformasi",
      },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-5-mathematics-ratios-and-graphs-of-trigonometric-functions-trigonometry",
        level: "lesson",
        materialKeys: ["lesson.mathematics.trigonometry"],
        order: 10,
      }),
    ],
    key: "form-5-mathematics-ratios-and-graphs-of-trigonometric-functions",
    order: 60,
    translations: {
      de: {
        routeSlug: "verhaeltnisse-und-graphen-trigonometrischer-funktionen",
        title: "Verhältnisse und Graphen trigonometrischer Funktionen",
      },
      en: {
        routeSlug: "ratios-and-graphs-of-trigonometric-functions",
        title: "Ratios and Graphs of Trigonometric Functions",
      },
      id: {
        routeSlug: "perbandingan-dan-grafik-fungsi-trigonometri",
        title: "Perbandingan dan Grafik Fungsi Trigonometri",
      },
      ms: {
        routeSlug: "nisbah-dan-graf-fungsi-trigonometri",
        title: "Nisbah dan Graf Fungsi Trigonometri",
      },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-5-mathematics-measures-of-dispersion-for-grouped-data-statistics-foundations",
        level: "lesson",
        materialKeys: ["lesson.mathematics.statistics-foundations"],
        order: 10,
      }),
    ],
    key: "form-5-mathematics-measures-of-dispersion-for-grouped-data",
    order: 70,
    translations: {
      de: {
        routeSlug: "streuungsmasse-fuer-klassierte-daten",
        title: "Streuungsmaße für klassierte Daten",
      },
      en: {
        routeSlug: "measures-of-dispersion-for-grouped-data",
        title: "Measures of Dispersion for Grouped Data",
      },
      id: {
        routeSlug: "ukuran-penyebaran-data-berkelompok",
        title: "Ukuran Penyebaran Data Berkelompok",
      },
      ms: {
        routeSlug: "sukatan-serakan-data-terkumpul",
        title: "Sukatan Serakan Data Terkumpul",
      },
    },
  }),
  unitNode({
    key: "form-5-mathematics-mathematical-modelling",
    order: 80,
    translations: {
      de: {
        routeSlug: "mathematische-modellierung",
        title: "Mathematische Modellierung",
      },
      en: {
        routeSlug: "mathematical-modelling",
        title: "Mathematical Modelling",
      },
      id: { routeSlug: "pemodelan-matematika", title: "Pemodelan Matematika" },
      ms: { routeSlug: "pemodelan-matematik", title: "Pemodelan Matematik" },
    },
  }),
];
