import {
  coreCurriculum,
  educationStandards,
} from "#corpus/curriculum/gymnasiale-oberstufe/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

const distributionThemenfeld = {
  code: "Q3.2 Wahrscheinlichkeitsverteilungen",
  ...coreCurriculum,
};

/**
 * The Themenfelder of Q3 (Stochastik) that a Nakafa lesson teaches, in the
 * order of the Kerncurriculum. Q3.1 and Q3.2 are verbindlich and Q3.5 is
 * optional; Q3.3 Hypothesentests and Q3.4 wait for lessons that teach them.
 */
export const qualificationPhase3MathematicsUnitNodes = [
  unitNode({
    children: [
      materialNode({
        key: "qualification-phase-3-mathematics-stochastics-foundations-combinatorics",
        level: "lesson",
        materialKeys: ["lesson.mathematics.combinatorics"],
        order: 10,
        outcomes: [
          {
            code: "Q3.1 Grundlegende Begriffe und Methoden der Stochastik",
            ...coreCurriculum,
          },
          {
            code: "Leitidee L5 Daten und Zufall: L5.2, L5.3",
            ...educationStandards,
          },
        ],
      }),
    ],
    key: "qualification-phase-3-mathematics-stochastics-foundations",
    materialCard: {
      de: {
        description: "Zähle Ausgänge und prüfe, ob Ereignisse abhängen.",
        title: "Grundlegende Begriffe und Methoden der Stochastik",
      },
      en: {
        description: "Count outcomes and check if two events are independent.",
        title: "Basic Concepts and Methods of Stochastics",
      },
      id: {
        description: "Hitung banyak hasil dan uji apakah kejadian bebas.",
        title: "Konsep dan Metode Dasar Stokastik",
      },
      ms: {
        description: "Kira kesudahan dan uji sama ada peristiwa bersandar.",
        title: "Konsep dan Kaedah Asas Stokastik",
      },
    },
    order: 10,
    translations: {
      de: {
        routeSlug: "grundlegende-begriffe-und-methoden-der-stochastik",
        title: "Grundlegende Begriffe und Methoden der Stochastik",
      },
      en: {
        routeSlug: "basic-concepts-and-methods-of-stochastics",
        title: "Basic Concepts and Methods of Stochastics",
      },
      id: {
        routeSlug: "konsep-dan-metode-dasar-stokastik",
        title: "Konsep dan Metode Dasar Stokastik",
      },
      ms: {
        routeSlug: "konsep-dan-kaedah-asas-stokastik",
        title: "Konsep dan Kaedah Asas Stokastik",
      },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "qualification-phase-3-mathematics-probability-distributions-probability",
        level: "lesson",
        materialKeys: ["lesson.mathematics.probability"],
        order: 10,
        outcomes: [
          distributionThemenfeld,
          {
            code: "Leitidee L4 Funktionaler Zusammenhang: L4.12",
            ...educationStandards,
          },
        ],
      }),
      materialNode({
        key: "qualification-phase-3-mathematics-probability-distributions-data-analysis-probability",
        level: "lesson",
        materialKeys: ["lesson.mathematics.data-analysis-probability"],
        order: 20,
        outcomes: [
          distributionThemenfeld,
          { code: "Leitidee L2 Messen: L2.7", ...educationStandards },
          {
            code: "Leitidee L4 Funktionaler Zusammenhang: L4.12",
            ...educationStandards,
          },
          {
            code: "Leitidee L5 Daten und Zufall: L5.4, L5.9 (eA)",
            ...educationStandards,
          },
        ],
      }),
    ],
    key: "qualification-phase-3-mathematics-probability-distributions",
    materialCard: {
      de: {
        description: "Verteile Wahrscheinlichkeiten binomial und normal.",
        title: "Wahrscheinlichkeitsverteilungen",
      },
      en: {
        description: "Give each value its probability, binomial or normal.",
        title: "Probability Distributions",
      },
      id: {
        description: "Beri tiap nilai peluangnya, binomial atau normal.",
        title: "Distribusi Peluang",
      },
      ms: {
        description: "Agihkan kebarangkalian secara binomial dan normal.",
        title: "Taburan Kebarangkalian",
      },
    },
    order: 20,
    translations: {
      de: {
        routeSlug: "wahrscheinlichkeitsverteilungen",
        title: "Wahrscheinlichkeitsverteilungen",
      },
      en: {
        routeSlug: "probability-distributions",
        title: "Probability Distributions",
      },
      id: { routeSlug: "distribusi-peluang", title: "Distribusi Peluang" },
      ms: {
        routeSlug: "taburan-kebarangkalian",
        title: "Taburan Kebarangkalian",
      },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "qualification-phase-3-mathematics-statistics-distributions-statistics-foundations",
        level: "lesson",
        materialKeys: ["lesson.mathematics.statistics-foundations"],
        order: 10,
        outcomes: [
          {
            code: "Q3.5 Statistik und weitere Wahrscheinlichkeitsverteilungen",
            ...coreCurriculum,
          },
          { code: "Leitidee L2 Messen: L2.6", ...educationStandards },
        ],
      }),
    ],
    key: "qualification-phase-3-mathematics-statistics-distributions",
    materialCard: {
      de: {
        description: "Beurteile Daten mit Mittelwert und Standardabweichung.",
        title: "Statistik und weitere Wahrscheinlichkeitsverteilungen",
      },
      en: {
        description: "Judge your own data by its mean and standard deviation.",
        title: "Statistics and Further Probability Distributions",
      },
      id: {
        description: "Nilai datamu lewat rata-rata dan simpangan baku.",
        title: "Statistika dan Distribusi Peluang Lainnya",
      },
      ms: {
        description: "Nilai data kamu melalui min dan sisihan piawai.",
        title: "Statistik dan Taburan Kebarangkalian Lain",
      },
    },
    order: 50,
    translations: {
      de: {
        routeSlug: "statistik-und-weitere-wahrscheinlichkeitsverteilungen",
        title: "Statistik und weitere Wahrscheinlichkeitsverteilungen",
      },
      en: {
        routeSlug: "statistics-and-further-probability-distributions",
        title: "Statistics and Further Probability Distributions",
      },
      id: {
        routeSlug: "statistika-dan-distribusi-peluang-lainnya",
        title: "Statistika dan Distribusi Peluang Lainnya",
      },
      ms: {
        routeSlug: "statistik-dan-taburan-kebarangkalian-lain",
        title: "Statistik dan Taburan Kebarangkalian Lain",
      },
    },
  }),
];
