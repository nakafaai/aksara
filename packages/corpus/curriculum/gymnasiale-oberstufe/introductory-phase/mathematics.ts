import {
  coreCurriculum,
  educationStandards,
} from "#corpus/curriculum/gymnasiale-oberstufe/documents";
import { introductoryPhaseDerivativeConceptUnit } from "#corpus/curriculum/gymnasiale-oberstufe/introductory-phase/derivative";
import { introductoryPhaseFunctionsUnit } from "#corpus/curriculum/gymnasiale-oberstufe/introductory-phase/functions";
import {
  introductoryPhaseExponentialUnit,
  introductoryPhaseTrigonometricUnit,
} from "#corpus/curriculum/gymnasiale-oberstufe/introductory-phase/transcendental";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/**
 * The Themenfelder of the Einführungsphase (E1/E2, Grundlagen der Analysis)
 * that a Nakafa lesson teaches, in the order of the Kerncurriculum. Each lesson
 * stands once, under the Themenfeld it teaches most, and cites the others it
 * teaches; so E.3 has no unit of its own. E.1, E.2, E.4 and E.5 are
 * verbindlich; E.6 and E.7 are optional Themenfelder.
 */
export const introductoryPhaseMathematicsUnitNodes = [
  introductoryPhaseFunctionsUnit,
  introductoryPhaseDerivativeConceptUnit,
  introductoryPhaseExponentialUnit,
  introductoryPhaseTrigonometricUnit,
  unitNode({
    children: [
      materialNode({
        key: "introductory-phase-mathematics-equation-methods-polynomial",
        level: "lesson",
        materialKeys: ["lesson.mathematics.polynomial"],
        order: 10,
        outcomes: [
          {
            code: "E.6 Weitere Verfahren zum Lösen von Gleichungen",
            ...coreCurriculum,
          },
          {
            code: "E.1 Funktionen und ihre Darstellung (ganzrationale Funktionen)",
            ...coreCurriculum,
          },
          {
            code: "Leitidee L1 Algorithmus und Zahl: L1.1",
            ...educationStandards,
          },
          {
            code: "Leitidee L4 Funktionaler Zusammenhang: L4.1",
            ...educationStandards,
          },
        ],
      }),
    ],
    key: "introductory-phase-mathematics-equation-methods",
    materialCard: {
      de: {
        description: "Teile Polynome, bis ihre Nullstellen sichtbar werden.",
        title: "Weitere Verfahren zum Lösen von Gleichungen",
      },
      en: {
        description: "Divide polynomials until their zeros come into view.",
        title: "Further Methods for Solving Equations",
      },
      id: {
        description: "Bagi polinomial sampai akar-akarnya terlihat.",
        title: "Metode Lain untuk Menyelesaikan Persamaan",
      },
      ms: {
        description: "Bahagi polinomial sehingga punca-puncanya kelihatan.",
        title: "Kaedah Lain untuk Menyelesaikan Persamaan",
      },
    },
    order: 60,
    translations: {
      de: {
        routeSlug: "weitere-verfahren-zum-loesen-von-gleichungen",
        title: "Weitere Verfahren zum Lösen von Gleichungen",
      },
      en: {
        routeSlug: "further-methods-for-solving-equations",
        title: "Further Methods for Solving Equations",
      },
      id: {
        routeSlug: "metode-lain-untuk-menyelesaikan-persamaan",
        title: "Metode Lain untuk Menyelesaikan Persamaan",
      },
      ms: {
        routeSlug: "kaedah-lain-untuk-menyelesaikan-persamaan",
        title: "Kaedah Lain untuk Menyelesaikan Persamaan",
      },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "introductory-phase-mathematics-sequences-series-sequence-series",
        level: "lesson",
        materialKeys: ["lesson.mathematics.sequence-series"],
        order: 10,
        outcomes: [{ code: "E.7 Folgen und Reihen", ...coreCurriculum }],
      }),
    ],
    key: "introductory-phase-mathematics-sequences-series",
    materialCard: {
      de: {
        description: "Prüfe, ob Folgen und Reihen einem Grenzwert zustreben.",
        title: "Folgen und Reihen",
      },
      en: {
        description: "Check whether sequences and series settle on a limit.",
        title: "Sequences and Series",
      },
      id: {
        description: "Periksa apakah barisan dan deret menuju suatu limit.",
        title: "Barisan dan Deret",
      },
      ms: {
        description: "Semak sama ada jujukan dan siri menuju suatu had.",
        title: "Jujukan dan Siri",
      },
    },
    order: 70,
    translations: {
      de: { routeSlug: "folgen-und-reihen", title: "Folgen und Reihen" },
      en: { routeSlug: "sequences-and-series", title: "Sequences and Series" },
      id: { routeSlug: "barisan-dan-deret", title: "Barisan dan Deret" },
      ms: { routeSlug: "jujukan-dan-siri", title: "Jujukan dan Siri" },
    },
  }),
];
