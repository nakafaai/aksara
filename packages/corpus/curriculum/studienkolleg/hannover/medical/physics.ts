import { materialNode, unitNode } from "#corpus/curriculum/schema";
import { hannoverPhysics } from "#corpus/curriculum/studienkolleg/documents";

/** Hannover M-Kurs Physik: Grundlagen. */
const hannoverMedicalPhysicsUnit1 = unitNode({
  children: [
    materialNode({
      key: "hannover-m-physics-fundamentals-measurement",
      level: "lesson",
      materialKeys: ["lesson.physics.measurement"],
      order: 10,
      outcomes: [
        { code: "M-Kurs, Grundlagen: SI-Maßsystem", ...hannoverPhysics },
        { code: "M-Kurs, Grundlagen: Fehlerrechnung", ...hannoverPhysics },
        {
          code: "M-Kurs, Grundlagen: Durchführung und Auswertung von physikalischen Experimenten",
          ...hannoverPhysics,
        },
      ],
    }),
  ],
  key: "hannover-m-physics-fundamentals",
  materialCard: {
    de: {
      description: "Einheiten, Messfehler und gute Versuche.",
      title: "Grundlagen",
    },
    en: {
      description: "Units, measurement errors and good experiments.",
      title: "Fundamentals",
    },
    id: {
      description: "Satuan, galat ukur, dan percobaan yang baik.",
      title: "Dasar-dasar",
    },
    ms: {
      description: "Unit, ralat pengukuran dan eksperimen yang baik.",
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

/** Hannover M-Kurs Physik: Wärmelehre. */
const hannoverMedicalPhysicsUnit2 = unitNode({
  children: [
    materialNode({
      key: "hannover-m-physics-heat-heat",
      level: "lesson",
      materialKeys: ["lesson.physics.heat"],
      order: 10,
      outcomes: [
        { code: "M-Kurs, Wärmelehre: Temperatur", ...hannoverPhysics },
        { code: "M-Kurs, Wärmelehre: Gasgesetze", ...hannoverPhysics },
        { code: "M-Kurs, Wärmelehre: Wärmeenergie", ...hannoverPhysics },
        { code: "M-Kurs, Wärmelehre: Mischungsversuche", ...hannoverPhysics },
        { code: "M-Kurs, Wärmelehre: Schmelzen-Erstarren", ...hannoverPhysics },
        {
          code: "M-Kurs, Wärmelehre: Verdampfen-Kondensieren",
          ...hannoverPhysics,
        },
      ],
    }),
  ],
  key: "hannover-m-physics-heat",
  materialCard: {
    de: {
      description: "Wärme fließt, Stoffe schmelzen, Gase dehnen sich aus.",
      title: "Wärmelehre",
    },
    en: {
      description: "Heat flows, solids melt and gases expand.",
      title: "Heat",
    },
    id: {
      description: "Kalor mengalir, zat mencair, gas memuai.",
      title: "Kalor",
    },
    ms: {
      description: "Haba mengalir, pepejal melebur, gas mengembang.",
      title: "Haba",
    },
  },
  order: 20,
  translations: {
    de: { routeSlug: "waermelehre", title: "Wärmelehre" },
    en: { routeSlug: "heat", title: "Heat" },
    id: { routeSlug: "kalor", title: "Kalor" },
    ms: { routeSlug: "haba", title: "Haba" },
  },
});

/** Hannover M-Kurs Physik: Elektrizitätslehre. */
const hannoverMedicalPhysicsUnit3 = unitNode({
  children: [
    materialNode({
      key: "hannover-m-physics-electricity-electricity",
      level: "lesson",
      materialKeys: ["lesson.physics.electricity"],
      order: 10,
      outcomes: [
        { code: "M-Kurs, Elektrizitätslehre: Spannung", ...hannoverPhysics },
        { code: "M-Kurs, Elektrizitätslehre: Stromstärke", ...hannoverPhysics },
        { code: "M-Kurs, Elektrizitätslehre: Widerstand", ...hannoverPhysics },
        { code: "M-Kurs, Elektrizitätslehre: Arbeit", ...hannoverPhysics },
        { code: "M-Kurs, Elektrizitätslehre: Leistung", ...hannoverPhysics },
        {
          code: "M-Kurs, Elektrizitätslehre: Gleichstromkreis",
          ...hannoverPhysics,
        },
      ],
    }),
  ],
  key: "hannover-m-physics-electricity",
  materialCard: {
    de: {
      description: "Baue Stromkreise und berechne Leistung.",
      title: "Elektrizitätslehre",
    },
    en: {
      description: "Build circuits and work out their power.",
      title: "Electricity",
    },
    id: {
      description: "Rakit rangkaian dan hitung dayanya.",
      title: "Kelistrikan",
    },
    ms: { description: "Bina litar dan kira kuasanya.", title: "Keelektrikan" },
  },
  order: 30,
  translations: {
    de: { routeSlug: "elektrizitaetslehre", title: "Elektrizitätslehre" },
    en: { routeSlug: "electricity", title: "Electricity" },
    id: { routeSlug: "kelistrikan", title: "Kelistrikan" },
    ms: { routeSlug: "keelektrikan", title: "Keelektrikan" },
  },
});

/** Hannover M-Kurs Physik: Mechanik. */
const hannoverMedicalPhysicsUnit4 = unitNode({
  children: [
    materialNode({
      key: "hannover-m-physics-mechanics-kinematics",
      level: "lesson",
      materialKeys: ["lesson.physics.kinematics"],
      order: 10,
      outcomes: [
        {
          code: "M-Kurs, Mechanik: Gleichförmige und beschleunigte geradlinige Bewegung",
          ...hannoverPhysics,
        },
        { code: "M-Kurs, Mechanik: freier Fall", ...hannoverPhysics },
        { code: "M-Kurs, Mechanik: Würfe", ...hannoverPhysics },
      ],
    }),
    materialNode({
      key: "hannover-m-physics-mechanics-vector",
      level: "lesson",
      materialKeys: ["lesson.physics.vector"],
      order: 20,
      outcomes: [{ code: "M-Kurs, Mechanik: Kraft", ...hannoverPhysics }],
    }),
    materialNode({
      key: "hannover-m-physics-mechanics-momentum",
      level: "lesson",
      materialKeys: ["lesson.physics.momentum"],
      order: 30,
      outcomes: [
        { code: "M-Kurs, Mechanik: Newtons Axiome", ...hannoverPhysics },
        { code: "M-Kurs, Mechanik: Kraft", ...hannoverPhysics },
        { code: "M-Kurs, Mechanik: Impuls", ...hannoverPhysics },
        {
          code: "M-Kurs, Mechanik: elastischer und unelastischer zentraler Stoß",
          ...hannoverPhysics,
        },
      ],
    }),
    materialNode({
      key: "hannover-m-physics-mechanics-pressure",
      level: "lesson",
      materialKeys: ["lesson.physics.pressure"],
      order: 40,
      outcomes: [{ code: "M-Kurs, Mechanik: Druck", ...hannoverPhysics }],
    }),
  ],
  key: "hannover-m-physics-mechanics",
  materialCard: {
    de: {
      description: "Bewegung, Kraft, Druck und Stöße im Alltag.",
      title: "Mechanik",
    },
    en: {
      description: "Motion, force, pressure and collisions around you.",
      title: "Mechanics",
    },
    id: {
      description: "Gerak, gaya, tekanan, dan tumbukan di sekitarmu.",
      title: "Mekanika",
    },
    ms: {
      description: "Gerakan, daya, tekanan dan perlanggaran di sekeliling.",
      title: "Mekanik",
    },
  },
  order: 40,
  translations: {
    de: { routeSlug: "mechanik", title: "Mechanik" },
    en: { routeSlug: "mechanics", title: "Mechanics" },
    id: { routeSlug: "mekanika", title: "Mekanika" },
    ms: { routeSlug: "mekanik", title: "Mekanik" },
  },
});

/** Hannover M-Kurs Physik: Optik. */
const hannoverMedicalPhysicsUnit5 = unitNode({
  children: [
    materialNode({
      key: "hannover-m-physics-optics-light-optics",
      level: "lesson",
      materialKeys: ["lesson.physics.light-optics"],
      order: 10,
      outcomes: [{ code: "M-Kurs, Optik: Geometr. Optik", ...hannoverPhysics }],
    }),
    materialNode({
      key: "hannover-m-physics-optics-waves",
      level: "lesson",
      materialKeys: ["lesson.physics.waves"],
      order: 20,
      outcomes: [
        { code: "M-Kurs, Optik: Wellenoptik", ...hannoverPhysics },
        {
          code: "M-Kurs, Mechanik: mechanische Schwingungen",
          ...hannoverPhysics,
        },
      ],
    }),
  ],
  key: "hannover-m-physics-optics",
  materialCard: {
    de: {
      description: "Licht wird gebrochen, gebündelt und überlagert.",
      title: "Optik",
    },
    en: {
      description: "Light gets bent, focused and overlapped.",
      title: "Optics",
    },
    id: {
      description: "Cahaya dibiaskan, difokuskan, dan bertumpang tindih.",
      title: "Optika",
    },
    ms: {
      description: "Cahaya dibias, difokus dan bertindih.",
      title: "Optik",
    },
  },
  order: 50,
  translations: {
    de: { routeSlug: "optik", title: "Optik" },
    en: { routeSlug: "optics", title: "Optics" },
    id: { routeSlug: "optika", title: "Optika" },
    ms: { routeSlug: "optik", title: "Optik" },
  },
});

/** Hannover M-Kurs Physik: the headings of its Prüfungsinhalte list, each with the lessons that teach its items */
export const hannoverMedicalPhysicsUnitNodes = [
  hannoverMedicalPhysicsUnit1,
  hannoverMedicalPhysicsUnit2,
  hannoverMedicalPhysicsUnit3,
  hannoverMedicalPhysicsUnit4,
  hannoverMedicalPhysicsUnit5,
];
