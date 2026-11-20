import { materialNode, unitNode } from "#corpus/curriculum/schema";
import { hannoverPhysics } from "#corpus/curriculum/studienkolleg/documents";

/** Hannover T-Kurs Physik: Grundlagen. */
const hannoverTechnicalPhysicsUnit1 = unitNode({
  children: [
    materialNode({
      key: "hannover-t-physics-fundamentals-measurement",
      level: "lesson",
      materialKeys: ["lesson.physics.measurement"],
      order: 10,
      outcomes: [
        { code: "T-Kurs, Grundlagen: SI-Maßsystem", ...hannoverPhysics },
        { code: "T-Kurs, Grundlagen: Fehlerrechnung", ...hannoverPhysics },
        {
          code: "T-Kurs, Grundlagen: Durchführung und Auswertung von Experimenten",
          ...hannoverPhysics,
        },
      ],
    }),
  ],
  key: "hannover-t-physics-fundamentals",
  materialCard: {
    de: {
      description: "Miss sauber, rechne mit Einheiten, schätze den Fehler.",
      title: "Grundlagen",
    },
    en: {
      description: "Measure carefully, keep units, and estimate the error.",
      title: "Fundamentals",
    },
    id: {
      description: "Ukur dengan teliti, jaga satuan, dan taksir galat.",
      title: "Dasar-dasar",
    },
    ms: {
      description: "Ukur dengan teliti, jaga unit dan anggarkan ralat.",
      title: "Asas",
    },
  },
  order: 10,
  translations: {
    de: { routeSlug: "grundlagen", title: "Grundlagen" },
    en: { routeSlug: "fundamentals", title: "Fundamentals" },
    id: { routeSlug: "dasar-dasar", title: "Dasar-dasar" },
    ms: { routeSlug: "asas", title: "Asas" },
  },
});

/** Hannover T-Kurs Physik: Mechanik. */
const hannoverTechnicalPhysicsUnit2 = unitNode({
  children: [
    materialNode({
      key: "hannover-t-physics-mechanics-kinematics",
      level: "lesson",
      materialKeys: ["lesson.physics.kinematics"],
      order: 10,
      outcomes: [
        {
          code: "T-Kurs, Mechanik: Kinematik der geradlinigen, gleichförmigen und beschleunigten Bewegung",
          ...hannoverPhysics,
        },
        { code: "T-Kurs, Mechanik: freier Fall und Würfe", ...hannoverPhysics },
        { code: "T-Kurs, Mechanik: Rotationsbewegungen", ...hannoverPhysics },
      ],
    }),
    materialNode({
      key: "hannover-t-physics-mechanics-vector",
      level: "lesson",
      materialKeys: ["lesson.physics.vector"],
      order: 20,
      outcomes: [
        { code: "T-Kurs, Mechanik: Kraftbegriff", ...hannoverPhysics },
        { code: "T-Kurs, Mechanik: Arbeit", ...hannoverPhysics },
      ],
    }),
    materialNode({
      key: "hannover-t-physics-mechanics-momentum",
      level: "lesson",
      materialKeys: ["lesson.physics.momentum"],
      order: 30,
      outcomes: [
        { code: "T-Kurs, Mechanik: Newtons Axiome", ...hannoverPhysics },
        { code: "T-Kurs, Mechanik: Kraftbegriff", ...hannoverPhysics },
        { code: "T-Kurs, Mechanik: Reibungskräfte", ...hannoverPhysics },
      ],
    }),
    materialNode({
      key: "hannover-t-physics-mechanics-gravitation",
      level: "lesson",
      materialKeys: ["lesson.physics.gravitation"],
      order: 40,
      outcomes: [
        { code: "T-Kurs, Mechanik: Gravitationskraft", ...hannoverPhysics },
      ],
    }),
    materialNode({
      key: "hannover-t-physics-mechanics-pressure",
      level: "lesson",
      materialKeys: ["lesson.physics.pressure"],
      order: 50,
      outcomes: [{ code: "T-Kurs, Mechanik: Druck", ...hannoverPhysics }],
    }),
    materialNode({
      key: "hannover-t-physics-mechanics-waves",
      level: "lesson",
      materialKeys: ["lesson.physics.waves"],
      order: 60,
      outcomes: [
        {
          code: "T-Kurs, Mechanik: mechanische Schwingungen",
          ...hannoverPhysics,
        },
        { code: "T-Kurs, Wahlgebiet: Schwingungslehre", ...hannoverPhysics },
      ],
    }),
  ],
  key: "hannover-t-physics-mechanics",
  materialCard: {
    de: {
      description: "Von Bewegung über Kräfte bis zu Schwingungen.",
      title: "Mechanik",
    },
    en: {
      description: "From motion to forces to oscillations.",
      title: "Mechanics",
    },
    id: {
      description: "Dari gerak ke gaya hingga getaran.",
      title: "Mekanika",
    },
    ms: {
      description: "Daripada gerakan kepada daya hingga ayunan.",
      title: "Mekanik",
    },
  },
  order: 20,
  translations: {
    de: { routeSlug: "mechanik", title: "Mechanik" },
    en: { routeSlug: "mechanics", title: "Mechanics" },
    id: { routeSlug: "mekanika", title: "Mekanika" },
    ms: { routeSlug: "mekanik", title: "Mekanik" },
  },
});

/** Hannover T-Kurs Physik: Elektrizitätslehre. */
const hannoverTechnicalPhysicsUnit3 = unitNode({
  children: [
    materialNode({
      key: "hannover-t-physics-electricity-electricity",
      level: "lesson",
      materialKeys: ["lesson.physics.electricity"],
      order: 10,
      outcomes: [
        {
          code: "T-Kurs, Elektrizitätslehre: Gleichstromkreis",
          ...hannoverPhysics,
        },
        { code: "T-Kurs, Elektrizitätslehre: Spannung", ...hannoverPhysics },
        {
          code: "T-Kurs, Elektrizitätslehre: Arbeit und Potential",
          ...hannoverPhysics,
        },
      ],
    }),
    materialNode({
      key: "hannover-t-physics-electricity-electromagnetism",
      level: "lesson",
      materialKeys: ["lesson.physics.electromagnetism"],
      order: 20,
      outcomes: [
        {
          code: "T-Kurs, Elektrizitätslehre: Grundlagen des magnetischen Feldes",
          ...hannoverPhysics,
        },
        {
          code: "T-Kurs, Elektrizitätslehre: Kraftwirkung auf elektrische Ladungen im elektrischen und magnetischen Feld",
          ...hannoverPhysics,
        },
        { code: "T-Kurs, Wahlgebiet: Wechselstromkreis", ...hannoverPhysics },
      ],
    }),
  ],
  key: "hannover-t-physics-electricity",
  materialCard: {
    de: {
      description: "Strom, Spannung und die Kraft von Magnetfeldern.",
      title: "Elektrizitätslehre",
    },
    en: {
      description: "Current, voltage and the push of magnetic fields.",
      title: "Electricity",
    },
    id: {
      description: "Arus, tegangan, dan dorongan medan magnet.",
      title: "Kelistrikan",
    },
    ms: {
      description: "Arus, voltan dan tolakan medan magnet.",
      title: "Keelektrikan",
    },
  },
  order: 30,
  translations: {
    de: { routeSlug: "elektrizitaetslehre", title: "Elektrizitätslehre" },
    en: { routeSlug: "electricity", title: "Electricity" },
    id: { routeSlug: "kelistrikan", title: "Kelistrikan" },
    ms: { routeSlug: "keelektrikan", title: "Keelektrikan" },
  },
});

/** Hannover T-Kurs Physik: the headings of its Prüfungsinhalte list, each with the lessons that teach its items */
export const hannoverTechnicalPhysicsUnitNodes = [
  hannoverTechnicalPhysicsUnit1,
  hannoverTechnicalPhysicsUnit2,
  hannoverTechnicalPhysicsUnit3,
];
