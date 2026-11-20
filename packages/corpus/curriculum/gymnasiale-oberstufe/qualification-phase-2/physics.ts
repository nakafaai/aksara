import {
  physicsCoreCurriculum,
  physicsEducationStandards,
} from "#corpus/curriculum/gymnasiale-oberstufe/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** Q2 Physik: Induktion und elektromagnetische Schwingungen. */
const qualificationPhase2PhysicsUnit1 = unitNode({
  children: [
    materialNode({
      key: "qualification-phase-2-physics-induction-electromagnetism",
      level: "lesson",
      materialKeys: ["lesson.physics.electromagnetism"],
      order: 10,
      outcomes: [
        {
          code: "Physik Q2.2 Induktion und elektromagnetische Schwingungen",
          ...physicsCoreCurriculum,
        },
        {
          code: "Inhaltsbereich 2.6.1 Elektrische und magnetische Felder (Veränderliche elektromagnetische Felder)",
          ...physicsEducationStandards,
        },
      ],
    }),
  ],
  key: "qualification-phase-2-physics-induction",
  materialCard: {
    de: {
      description: "Ein bewegter Magnet erzeugt Strom in einer Spule.",
      title: "Induktion und elektromagnetische Schwingungen",
    },
    en: {
      description: "A moving magnet makes a current flow in a coil.",
      title: "Induction and electromagnetic oscillations",
    },
    id: {
      description: "Magnet yang bergerak membuat arus mengalir di kumparan.",
      title: "Induksi dan osilasi elektromagnetik",
    },
    ms: {
      description: "Magnet yang bergerak menghasilkan arus dalam gegelung.",
      title: "Aruhan dan ayunan elektromagnet",
    },
  },
  order: 10,
  translations: {
    de: {
      routeSlug: "induktion-und-elektromagnetische-schwingungen",
      title: "Induktion und elektromagnetische Schwingungen",
    },
    en: {
      routeSlug: "induction-and-electromagnetic-oscillations",
      title: "Induction and electromagnetic oscillations",
    },
    id: {
      routeSlug: "induksi-dan-osilasi-elektromagnetik",
      title: "Induksi dan osilasi elektromagnetik",
    },
    ms: {
      routeSlug: "aruhan-dan-ayunan-elektromagnet",
      title: "Aruhan dan ayunan elektromagnet",
    },
  },
});

/** Q2 Physik: Mechanische Wellen. */
const qualificationPhase2PhysicsUnit2 = unitNode({
  children: [
    materialNode({
      key: "qualification-phase-2-physics-waves-waves",
      level: "lesson",
      materialKeys: ["lesson.physics.waves"],
      order: 10,
      outcomes: [
        { code: "Physik Q2.3 Mechanische Wellen", ...physicsCoreCurriculum },
        {
          code: "Physik Q2.1 Mechanische Schwingungen (Dämpfung, Resonanz)",
          ...physicsCoreCurriculum,
        },
        {
          code: "Inhaltsbereich 2.6.2 Mechanische und elektromagnetische Schwingungen und Wellen",
          ...physicsEducationStandards,
        },
      ],
    }),
  ],
  key: "qualification-phase-2-physics-waves",
  materialCard: {
    de: {
      description: "Eine Welle trägt Energie, aber keine Materie.",
      title: "Mechanische Wellen",
    },
    en: {
      description: "A wave carries energy but leaves the water in place.",
      title: "Mechanical waves",
    },
    id: {
      description: "Gelombang membawa energi, bukan materi.",
      title: "Gelombang mekanik",
    },
    ms: {
      description: "Gelombang membawa tenaga, bukan jirim.",
      title: "Gelombang mekanik",
    },
  },
  order: 20,
  translations: {
    de: { routeSlug: "mechanische-wellen", title: "Mechanische Wellen" },
    en: { routeSlug: "mechanical-waves", title: "Mechanical waves" },
    id: { routeSlug: "gelombang-mekanik", title: "Gelombang mekanik" },
    ms: { routeSlug: "gelombang-mekanik", title: "Gelombang mekanik" },
  },
});

/** Q2 Physik: the Themenfelder of the Hessen Kerncurriculum Physik that a lesson teaches, in its order */
export const qualificationPhase2PhysicsUnitNodes = [
  qualificationPhase2PhysicsUnit1,
  qualificationPhase2PhysicsUnit2,
];
