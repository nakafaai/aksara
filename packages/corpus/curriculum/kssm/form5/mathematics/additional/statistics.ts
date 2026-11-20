import { additionalMathematicsStandards } from "#corpus/curriculum/kssm/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** The KSSM Form 5 Additional Mathematics statistics chapters, permutation and combination then probability distribution. */
export const kssmForm5AdditionalMathematicsStatisticsNodes = [
  unitNode({
    children: [
      materialNode({
        key: "form-5-additional-mathematics-permutation-and-combination-combinatorics",
        level: "lesson",
        materialKeys: ["lesson.mathematics.combinatorics"],
        order: 10,
        outcomes: [
          {
            code: "Form 5, Content Standards 4.1 to 4.2",
            document: additionalMathematicsStandards,
          },
        ],
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
        outcomes: [
          {
            code: "Form 5, Content Standards 5.1 to 5.3",
            document: additionalMathematicsStandards,
          },
        ],
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
];
