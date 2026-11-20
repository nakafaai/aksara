import {
  coreCurriculum,
  educationStandards,
} from "#corpus/curriculum/gymnasiale-oberstufe/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/**
 * The Themenfelder of Q1 (Analysis) that a Nakafa lesson teaches, in the order
 * of the Kerncurriculum. The integral lesson stands once, under Q1.1 where most
 * of its sections teach, and cites the areas and reconstructed totals of Q1.2,
 * so Q1.2 has no unit of its own; Q1.3 to Q1.5 wait for lessons.
 */
export const qualificationPhase1MathematicsUnitNodes = [
  unitNode({
    children: [
      materialNode({
        key: "qualification-phase-1-mathematics-integral-introduction-integral",
        level: "lesson",
        materialKeys: ["lesson.mathematics.integral"],
        order: 10,
        outcomes: [
          {
            code: "Q1.1 Einführung in die Integralrechnung",
            ...coreCurriculum,
          },
          {
            code: "Q1.2 Anwendungen der Integralrechnung (Flächeninhaltsberechnung, rekonstruierter Bestand)",
            ...coreCurriculum,
          },
          {
            code: "Leitidee L1 Algorithmus und Zahl: L1.3",
            ...educationStandards,
          },
          { code: "Leitidee L2 Messen: L2.4, L2.5", ...educationStandards },
          {
            code: "Leitidee L4 Funktionaler Zusammenhang: L4.9, L4.10, L4.11",
            ...educationStandards,
          },
        ],
      }),
    ],
    key: "qualification-phase-1-mathematics-integral-introduction",
    materialCard: {
      de: {
        description: "Schätze Flächen mit Rechtecken und lerne den Hauptsatz.",
        title: "Einführung in die Integralrechnung",
      },
      en: {
        description: "Add up thin strips, then link them to antiderivatives.",
        title: "Introduction to Integral Calculus",
      },
      id: {
        description: "Jumlahkan pita tipis, lalu kaitkan dengan antiturunan.",
        title: "Pengantar Kalkulus Integral",
      },
      ms: {
        description: "Tambah jalur nipis, kemudian kaitkan dengan kamiran.",
        title: "Pengenalan Kalkulus Kamiran",
      },
    },
    order: 10,
    translations: {
      de: {
        routeSlug: "einfuehrung-in-die-integralrechnung",
        title: "Einführung in die Integralrechnung",
      },
      en: {
        routeSlug: "introduction-to-integral-calculus",
        title: "Introduction to Integral Calculus",
      },
      id: {
        routeSlug: "pengantar-kalkulus-integral",
        title: "Pengantar Kalkulus Integral",
      },
      ms: {
        routeSlug: "pengenalan-kalkulus-kamiran",
        title: "Pengenalan Kalkulus Kamiran",
      },
    },
  }),
];
