import { physicsCoreCurriculum } from "#corpus/curriculum/gymnasiale-oberstufe/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** Einführungsphase Physik: Bewegungen und ihre Beschreibung. */
const introductoryPhasePhysicsUnit1 = unitNode({
  children: [
    materialNode({
      key: "introductory-phase-physics-motion-kinematics",
      level: "lesson",
      materialKeys: ["lesson.physics.kinematics"],
      order: 10,
      outcomes: [
        {
          code: "Physik E.1 Bewegungen und ihre Beschreibung",
          ...physicsCoreCurriculum,
        },
        {
          code: "Physik E.3 Waagerechter Wurf und Kreisbewegung",
          ...physicsCoreCurriculum,
        },
        {
          code: "Physik E.4 Weitere Bewegungen (schiefer Wurf)",
          ...physicsCoreCurriculum,
        },
      ],
    }),
  ],
  key: "introductory-phase-physics-motion",
  materialCard: {
    de: {
      description: "Lies Weg, Tempo und Beschleunigung aus Diagrammen ab.",
      title: "Bewegungen und ihre Beschreibung",
    },
    en: {
      description: "Read distance, speed and acceleration off a graph.",
      title: "Motion and how to describe it",
    },
    id: {
      description: "Baca jarak, kelajuan, dan percepatan dari grafik.",
      title: "Gerak dan cara menggambarkannya",
    },
    ms: {
      description: "Baca jarak, laju dan pecutan daripada graf.",
      title: "Gerakan dan cara menghuraikannya",
    },
  },
  order: 10,
  translations: {
    de: {
      routeSlug: "bewegungen-und-ihre-beschreibung",
      title: "Bewegungen und ihre Beschreibung",
    },
    en: {
      routeSlug: "motion-and-its-description",
      title: "Motion and how to describe it",
    },
    id: {
      routeSlug: "gerak-dan-deskripsinya",
      title: "Gerak dan cara menggambarkannya",
    },
    ms: {
      routeSlug: "gerakan-dan-huraiannya",
      title: "Gerakan dan cara menghuraikannya",
    },
  },
});

/** Einführungsphase Physik: Newton'sche Axiome und Erhaltungssätze. */
const introductoryPhasePhysicsUnit2 = unitNode({
  children: [
    materialNode({
      key: "introductory-phase-physics-newton-momentum",
      level: "lesson",
      materialKeys: ["lesson.physics.momentum"],
      order: 10,
      outcomes: [
        {
          code: "Physik E.2 Newton'sche Axiome und Erhaltungssätze",
          ...physicsCoreCurriculum,
        },
      ],
    }),
  ],
  key: "introductory-phase-physics-newton",
  materialCard: {
    de: {
      description: "Sieh, wie Kräfte Bewegung ändern und Impuls bleibt.",
      title: "Newton'sche Axiome und Erhaltungssätze",
    },
    en: {
      description: "See how forces change motion while momentum is kept.",
      title: "Newton's laws and conservation laws",
    },
    id: {
      description: "Lihat gaya mengubah gerak sementara momentum tetap.",
      title: "Hukum Newton dan hukum kekekalan",
    },
    ms: {
      description: "Lihat daya mengubah gerakan sementara momentum kekal.",
      title: "Hukum Newton dan hukum keabadian",
    },
  },
  order: 20,
  translations: {
    de: {
      routeSlug: "newtonsche-axiome-und-erhaltungssaetze",
      title: "Newton'sche Axiome und Erhaltungssätze",
    },
    en: {
      routeSlug: "newtons-laws-and-conservation",
      title: "Newton's laws and conservation laws",
    },
    id: {
      routeSlug: "hukum-newton-dan-kekekalan",
      title: "Hukum Newton dan hukum kekekalan",
    },
    ms: {
      routeSlug: "hukum-newton-dan-keabadian",
      title: "Hukum Newton dan hukum keabadian",
    },
  },
});

/** Einführungsphase Physik: Gravitation. */
const introductoryPhasePhysicsUnit3 = unitNode({
  children: [
    materialNode({
      key: "introductory-phase-physics-gravitation-gravitation",
      level: "lesson",
      materialKeys: ["lesson.physics.gravitation"],
      order: 10,
      outcomes: [{ code: "Physik E.5 Gravitation", ...physicsCoreCurriculum }],
    }),
  ],
  key: "introductory-phase-physics-gravitation",
  materialCard: {
    de: {
      description: "Warum Monde kreisen und Satelliten nicht fallen.",
      title: "Gravitation",
    },
    en: {
      description: "Why moons circle and satellites never fall down.",
      title: "Gravitation",
    },
    id: {
      description: "Mengapa bulan beredar dan satelit tidak jatuh.",
      title: "Gravitasi",
    },
    ms: {
      description: "Mengapa bulan beredar dan satelit tidak jatuh.",
      title: "Graviti",
    },
  },
  order: 30,
  translations: {
    de: { routeSlug: "gravitation", title: "Gravitation" },
    en: { routeSlug: "gravitation", title: "Gravitation" },
    id: { routeSlug: "gravitasi", title: "Gravitasi" },
    ms: { routeSlug: "graviti", title: "Graviti" },
  },
});

/** Einführungsphase Physik: the Themenfelder of the Hessen Kerncurriculum Physik that a lesson teaches, in its order */
export const introductoryPhasePhysicsUnitNodes = [
  introductoryPhasePhysicsUnit1,
  introductoryPhasePhysicsUnit2,
  introductoryPhasePhysicsUnit3,
];
