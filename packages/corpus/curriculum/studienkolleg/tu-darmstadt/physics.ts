import { materialNode, unitNode } from "#corpus/curriculum/schema";
import { darmstadtPhysics } from "#corpus/curriculum/studienkolleg/documents";

/** Darmstadt T-Kurs Physik: Mechanik. */
const tuDarmstadtTechnicalPhysicsUnit1 = unitNode({
  children: [
    materialNode({
      key: "tu-darmstadt-t-physics-mechanics-kinematics",
      level: "lesson",
      materialKeys: ["lesson.physics.kinematics"],
      order: 10,
      outcomes: [{ code: "Bereich Mechanik", ...darmstadtPhysics }],
    }),
    materialNode({
      key: "tu-darmstadt-t-physics-mechanics-vector",
      level: "lesson",
      materialKeys: ["lesson.physics.vector"],
      order: 20,
      outcomes: [{ code: "Bereich Mechanik", ...darmstadtPhysics }],
    }),
    materialNode({
      key: "tu-darmstadt-t-physics-mechanics-momentum",
      level: "lesson",
      materialKeys: ["lesson.physics.momentum"],
      order: 30,
      outcomes: [{ code: "Bereich Mechanik", ...darmstadtPhysics }],
    }),
    materialNode({
      key: "tu-darmstadt-t-physics-mechanics-gravitation",
      level: "lesson",
      materialKeys: ["lesson.physics.gravitation"],
      order: 40,
      outcomes: [{ code: "Bereich Mechanik", ...darmstadtPhysics }],
    }),
    materialNode({
      key: "tu-darmstadt-t-physics-mechanics-pressure",
      level: "lesson",
      materialKeys: ["lesson.physics.pressure"],
      order: 50,
      outcomes: [{ code: "Bereich Mechanik", ...darmstadtPhysics }],
    }),
  ],
  key: "tu-darmstadt-t-physics-mechanics",
  materialCard: {
    de: {
      description: "Bewegung, Kraft und Druck, wie Ingenieure sie nutzen.",
      title: "Mechanik",
    },
    en: {
      description: "Motion, force and pressure, the way engineers use them.",
      title: "Mechanics",
    },
    id: {
      description: "Gerak, gaya, dan tekanan seperti dipakai insinyur.",
      title: "Mekanika",
    },
    ms: {
      description: "Gerakan, daya dan tekanan seperti digunakan jurutera.",
      title: "Mekanik",
    },
  },
  order: 10,
  translations: {
    de: { routeSlug: "mechanik", title: "Mechanik" },
    en: { routeSlug: "mechanics", title: "Mechanics" },
    id: { routeSlug: "mekanika", title: "Mekanika" },
    ms: { routeSlug: "mekanik", title: "Mekanik" },
  },
});

/** Darmstadt T-Kurs Physik: Elektrizitätslehre. */
const tuDarmstadtTechnicalPhysicsUnit2 = unitNode({
  children: [
    materialNode({
      key: "tu-darmstadt-t-physics-electricity-electricity",
      level: "lesson",
      materialKeys: ["lesson.physics.electricity"],
      order: 10,
      outcomes: [{ code: "Bereich Elektrizitätslehre", ...darmstadtPhysics }],
    }),
    materialNode({
      key: "tu-darmstadt-t-physics-electricity-electromagnetism",
      level: "lesson",
      materialKeys: ["lesson.physics.electromagnetism"],
      order: 20,
      outcomes: [{ code: "Bereich Elektrizitätslehre", ...darmstadtPhysics }],
    }),
  ],
  key: "tu-darmstadt-t-physics-electricity",
  materialCard: {
    de: {
      description: "Stromkreise und Magnetfelder für die Technik.",
      title: "Elektrizitätslehre",
    },
    en: {
      description: "Circuits and magnetic fields for engineering.",
      title: "Electricity",
    },
    id: {
      description: "Rangkaian listrik dan medan magnet untuk teknik.",
      title: "Kelistrikan",
    },
    ms: {
      description: "Litar elektrik dan medan magnet untuk kejuruteraan.",
      title: "Keelektrikan",
    },
  },
  order: 20,
  translations: {
    de: { routeSlug: "elektrizitaetslehre", title: "Elektrizitätslehre" },
    en: { routeSlug: "electricity", title: "Electricity" },
    id: { routeSlug: "kelistrikan", title: "Kelistrikan" },
    ms: { routeSlug: "keelektrikan", title: "Keelektrikan" },
  },
});

/** Darmstadt T-Kurs Physik: the two Bereiche its Physik page names, each with the lessons that teach it */
export const tuDarmstadtTechnicalPhysicsUnitNodes = [
  tuDarmstadtTechnicalPhysicsUnit1,
  tuDarmstadtTechnicalPhysicsUnit2,
];
