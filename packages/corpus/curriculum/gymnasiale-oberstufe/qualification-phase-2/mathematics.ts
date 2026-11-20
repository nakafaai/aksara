import {
  coreCurriculum,
  educationStandards,
} from "#corpus/curriculum/gymnasiale-oberstufe/documents";
import {
  qualificationPhase2MappingUnit,
  qualificationPhase2TransitionUnit,
} from "#corpus/curriculum/gymnasiale-oberstufe/qualification-phase-2/matrices";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

const analysisThemenfeld = {
  code: "Q2.1 Vertiefung der Analysis",
  ...coreCurriculum,
};

/**
 * The Themenfelder of Q2 (Analytische Geometrie, Lineare Algebra und
 * Vertiefung der Analysis) that a Nakafa lesson teaches, in the order of the
 * Kerncurriculum. Q2.1 and Q2.2 are verbindlich, Q2.4 and Q2.5 optional; Q2.3
 * Geraden und Ebenen im Raum waits for a lesson on lines and planes in space.
 */
export const qualificationPhase2MathematicsUnitNodes = [
  unitNode({
    children: [
      materialNode({
        key: "qualification-phase-2-mathematics-analysis-deepening-function-modeling",
        level: "lesson",
        materialKeys: ["lesson.mathematics.function-modeling"],
        order: 10,
        outcomes: [
          analysisThemenfeld,
          {
            code: "Leitidee L4 Funktionaler Zusammenhang: L4.1",
            ...educationStandards,
          },
        ],
      }),
      materialNode({
        key: "qualification-phase-2-mathematics-analysis-deepening-function-transformation",
        level: "lesson",
        materialKeys: ["lesson.mathematics.function-transformation"],
        order: 20,
        outcomes: [
          analysisThemenfeld,
          {
            code: "Leitidee L4 Funktionaler Zusammenhang: L4.1",
            ...educationStandards,
          },
        ],
      }),
      materialNode({
        key: "qualification-phase-2-mathematics-analysis-deepening-function-composition-inverse-function",
        level: "lesson",
        materialKeys: [
          "lesson.mathematics.function-composition-inverse-function",
        ],
        order: 30,
        outcomes: [
          analysisThemenfeld,
          {
            code: "Leitidee L4 Funktionaler Zusammenhang: L4.2",
            ...educationStandards,
          },
        ],
      }),
    ],
    key: "qualification-phase-2-mathematics-analysis-deepening",
    materialCard: {
      de: {
        description: "Verschiebe, strecke, verkette und kehre Funktionen um.",
        title: "Vertiefung der Analysis",
      },
      en: {
        description: "Shift, stretch, chain and invert familiar functions.",
        title: "Deepening Calculus",
      },
      id: {
        description: "Geser, regangkan, komposisikan, dan balik fungsi.",
        title: "Pendalaman Kalkulus",
      },
      ms: {
        description: "Anjak, regang, gubah dan songsangkan fungsi.",
        title: "Pendalaman Kalkulus",
      },
    },
    order: 10,
    translations: {
      de: {
        routeSlug: "vertiefung-der-analysis",
        title: "Vertiefung der Analysis",
      },
      en: { routeSlug: "deepening-calculus", title: "Deepening Calculus" },
      id: { routeSlug: "pendalaman-kalkulus", title: "Pendalaman Kalkulus" },
      ms: { routeSlug: "pendalaman-kalkulus", title: "Pendalaman Kalkulus" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "qualification-phase-2-mathematics-space-orientation-vector-operations",
        level: "lesson",
        materialKeys: ["lesson.mathematics.vector-operations"],
        order: 10,
        outcomes: [
          {
            code: "Q2.2 Orientieren und Bewegen im Raum",
            ...coreCurriculum,
          },
          {
            code: "Leitidee L1 Algorithmus und Zahl: L1.4",
            ...educationStandards,
          },
          { code: "Leitidee L2 Messen: L2.1", ...educationStandards },
          {
            code: "Leitidee L3 Raum und Form: L3.1, L3.2, L3.3",
            ...educationStandards,
          },
        ],
      }),
    ],
    key: "qualification-phase-2-mathematics-space-orientation",
    materialCard: {
      de: {
        description: "Setze Punkte in den Raum und rechne mit Vektoren.",
        title: "Orientieren und Bewegen im Raum",
      },
      en: {
        description: "Place points in 3D space and calculate with vectors.",
        title: "Orienting and Moving in Space",
      },
      id: {
        description: "Letakkan titik di ruang 3D dan berhitung dengan vektor.",
        title: "Orientasi dan Bergerak dalam Ruang",
      },
      ms: {
        description: "Letak titik dalam ruang 3D dan mengira dengan vektor.",
        title: "Orientasi dan Pergerakan dalam Ruang",
      },
    },
    order: 20,
    translations: {
      de: {
        routeSlug: "orientieren-und-bewegen-im-raum",
        title: "Orientieren und Bewegen im Raum",
      },
      en: {
        routeSlug: "orienting-and-moving-in-space",
        title: "Orienting and Moving in Space",
      },
      id: {
        routeSlug: "orientasi-dan-bergerak-dalam-ruang",
        title: "Orientasi dan Bergerak dalam Ruang",
      },
      ms: {
        routeSlug: "orientasi-dan-pergerakan-dalam-ruang",
        title: "Orientasi dan Pergerakan dalam Ruang",
      },
    },
  }),
  qualificationPhase2TransitionUnit,
  qualificationPhase2MappingUnit,
];
