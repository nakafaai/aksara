import {
  physicsCoreCurriculum,
  physicsEducationStandards,
} from "#corpus/curriculum/gymnasiale-oberstufe/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** Q3 Physik: Elektromagnetische Wellen. */
const qualificationPhase3PhysicsUnit1 = unitNode({
  children: [
    materialNode({
      key: "qualification-phase-3-physics-electromagnetic-waves-light-optics",
      level: "lesson",
      materialKeys: ["lesson.physics.light-optics"],
      order: 10,
      outcomes: [
        {
          code: "Physik Q3.1 Elektromagnetische Wellen (Totalreflexion, Glasfaser, Brechung)",
          ...physicsCoreCurriculum,
        },
        {
          code: "Inhaltsbereich 2.6.2 Mechanische und elektromagnetische Schwingungen und Wellen",
          ...physicsEducationStandards,
        },
      ],
    }),
    materialNode({
      key: "qualification-phase-3-physics-electromagnetic-waves-waves",
      level: "lesson",
      materialKeys: ["lesson.physics.waves"],
      order: 20,
      outcomes: [
        {
          code: "Physik Q3.1 Elektromagnetische Wellen (Spektrum, Doppelspalt)",
          ...physicsCoreCurriculum,
        },
        {
          code: "Inhaltsbereich 2.6.2 Mechanische und elektromagnetische Schwingungen und Wellen (Überlagerung von Wellen)",
          ...physicsEducationStandards,
        },
      ],
    }),
  ],
  key: "qualification-phase-3-physics-electromagnetic-waves",
  materialCard: {
    de: {
      description: "Licht bricht, spiegelt sich und zeigt Interferenz.",
      title: "Elektromagnetische Wellen",
    },
    en: {
      description: "Light bends, reflects and makes interference fringes.",
      title: "Electromagnetic waves",
    },
    id: {
      description: "Cahaya dibiaskan, dipantulkan, dan berinterferensi.",
      title: "Gelombang elektromagnetik",
    },
    ms: {
      description: "Cahaya dibias, dipantul dan menghasilkan interferens.",
      title: "Gelombang elektromagnet",
    },
  },
  order: 10,
  translations: {
    de: {
      routeSlug: "elektromagnetische-wellen",
      title: "Elektromagnetische Wellen",
    },
    en: { routeSlug: "electromagnetic-waves", title: "Electromagnetic waves" },
    id: {
      routeSlug: "gelombang-elektromagnetik",
      title: "Gelombang elektromagnetik",
    },
    ms: {
      routeSlug: "gelombang-elektromagnet",
      title: "Gelombang elektromagnet",
    },
  },
});

/** Q3 Physik: Welle-Teilchen-Dualismus. */
const qualificationPhase3PhysicsUnit2 = unitNode({
  children: [
    materialNode({
      key: "qualification-phase-3-physics-duality-quantum-physics",
      level: "lesson",
      materialKeys: ["lesson.physics.quantum-physics"],
      order: 10,
      outcomes: [
        {
          code: "Physik Q3.2 Welle-Teilchen-Dualismus",
          ...physicsCoreCurriculum,
        },
        {
          code: "Physik Q3.3 Atomvorstellungen (Energieniveaus, Linienspektren)",
          ...physicsCoreCurriculum,
        },
        {
          code: "Inhaltsbereich 2.6.3 Quantenphysik und Materie",
          ...physicsEducationStandards,
        },
      ],
    }),
  ],
  key: "qualification-phase-3-physics-duality",
  materialCard: {
    de: {
      description: "Licht kommt in Paketen und Elektronen als Wellen.",
      title: "Welle-Teilchen-Dualismus",
    },
    en: {
      description: "Light comes in packets, and electrons act as waves.",
      title: "Wave-particle duality",
    },
    id: {
      description: "Cahaya datang dalam paket, elektron bersifat gelombang.",
      title: "Dualisme gelombang-partikel",
    },
    ms: {
      description: "Cahaya datang berpaket, elektron bersifat gelombang.",
      title: "Dualiti gelombang-zarah",
    },
  },
  order: 20,
  translations: {
    de: {
      routeSlug: "welle-teilchen-dualismus",
      title: "Welle-Teilchen-Dualismus",
    },
    en: { routeSlug: "wave-particle-duality", title: "Wave-particle duality" },
    id: {
      routeSlug: "dualisme-gelombang-partikel",
      title: "Dualisme gelombang-partikel",
    },
    ms: {
      routeSlug: "dualiti-gelombang-zarah",
      title: "Dualiti gelombang-zarah",
    },
  },
});

/** Q3 Physik: the Themenfelder of the Hessen Kerncurriculum Physik that a lesson teaches, in its order */
export const qualificationPhase3PhysicsUnitNodes = [
  qualificationPhase3PhysicsUnit1,
  qualificationPhase3PhysicsUnit2,
];
