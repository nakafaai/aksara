import {
  mathematicsBookXII,
  merdekaLearningOutcomes,
} from "#corpus/curriculum/merdeka/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** Kurikulum Merdeka Kelas 12 Matematika, Bab 1 Barisan dan Deret. */
const merdekaClass12SequenceSeriesUnit = unitNode({
  children: [
    materialNode({
      key: "class-12-mathematics-sequence-series-material",
      level: "lesson",
      materialKeys: ["lesson.mathematics.sequence-series"],
      order: 10,
      outcomes: [
        {
          code: "Matematika, Fase F, elemen Bilangan",
          ...merdekaLearningOutcomes,
        },
        { code: "Bab 1 Barisan dan Deret", ...mathematicsBookXII },
      ],
    }),
  ],
  key: "class-12-mathematics-sequence-series",
  materialCard: {
    de: {
      description: "Nutze Formeln für das n-te Glied und Teilsummen.",
      title: "Folgen und Reihen",
    },
    en: {
      description: "Apply nth-term and partial-sum formulas.",
      title: "Sequences and Series",
    },
    id: {
      description: "Pakai rumus suku ke-n dan jumlah n suku pertama.",
      title: "Barisan dan Deret",
    },
    ms: {
      description: "Guna rumus sebutan ke-n dan hasil tambah n sebutan.",
      title: "Jujukan dan Siri",
    },
  },
  order: 10,
  translations: {
    de: { routeSlug: "folgen-und-reihen", title: "Folgen und Reihen" },
    en: { routeSlug: "sequence-series", title: "Sequences and Series" },
    id: { routeSlug: "barisan-dan-deret", title: "Barisan dan Deret" },
    ms: { routeSlug: "jujukan-dan-siri", title: "Jujukan dan Siri" },
  },
});

/** Kurikulum Merdeka Kelas 12 Matematika, Bab 3 Kaidah Pencacahan (the lesson also teaches Bab 4 until it splits). */
const merdekaClass12CountingUnit = unitNode({
  children: [
    materialNode({
      key: "class-12-mathematics-combinatorics-material",
      level: "lesson",
      materialKeys: ["lesson.mathematics.combinatorics"],
      order: 10,
      outcomes: [
        {
          code: "Matematika, Fase F, elemen Analisis Data dan Peluang",
          ...merdekaLearningOutcomes,
        },
        { code: "Bab 3 Kaidah Pencacahan", ...mathematicsBookXII },
        { code: "Bab 4 Peluang", ...mathematicsBookXII },
      ],
    }),
  ],
  key: "class-12-mathematics-combinatorics",
  materialCard: {
    de: {
      description: "Zähle Anordnungen mit Permutationen und Kombinationen.",
      title: "Abzählregeln",
    },
    en: {
      description: "Count arrangements with permutations and combinations.",
      title: "Counting Rules",
    },
    id: {
      description: "Hitung susunan dengan permutasi dan kombinasi.",
      title: "Kaidah Pencacahan",
    },
    ms: {
      description: "Kira susunan dengan pilih atur dan gabungan.",
      title: "Kaedah Pembilangan",
    },
  },
  order: 30,
  translations: {
    de: { routeSlug: "abzaehlregeln", title: "Abzählregeln" },
    en: { routeSlug: "counting-rules", title: "Counting Rules" },
    id: { routeSlug: "kaidah-pencacahan", title: "Kaidah Pencacahan" },
    ms: { routeSlug: "kaedah-pembilangan", title: "Kaedah Pembilangan" },
  },
});

/** The units of Kelas 12 Matematika, in the chapter order of its revised book. */
export const merdekaClass12MathematicsTopicNodes = [
  merdekaClass12SequenceSeriesUnit,
  merdekaClass12CountingUnit,
];
