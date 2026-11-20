import { physicsStandards } from "#corpus/curriculum/kssm/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** The KSSM Form 4 Physics chapters, in the order of their DSKP. */
export const kssmForm4PhysicsTopicNodes = [
  unitNode({
    children: [
      materialNode({
        key: "form-4-physics-measurement-measurement",
        level: "lesson",
        materialKeys: ["lesson.physics.measurement"],
        order: 10,
        outcomes: [
          {
            code: "Tingkatan 4, Standard Kandungan 1.1",
            document: physicsStandards,
          },
        ],
      }),
    ],
    key: "form-4-physics-measurement",
    materialCard: {
      de: {
        description: "Miss Größen sorgfältig und mit passenden Einheiten.",
        title: "Messen",
      },
      en: {
        description: "Measure quantities with the right units and care.",
        title: "Measurement",
      },
      id: {
        description: "Ukur besaran dengan satuan yang tepat dan teliti.",
        title: "Pengukuran",
      },
      ms: {
        description: "Ukur kuantiti dengan unit yang betul dan teliti.",
        title: "Pengukuran",
      },
    },
    order: 10,
    translations: {
      de: { routeSlug: "messen", title: "Messen" },
      en: { routeSlug: "measurement", title: "Measurement" },
      id: { routeSlug: "pengukuran", title: "Pengukuran" },
      ms: { routeSlug: "pengukuran", title: "Pengukuran" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-4-physics-force-and-motion-i-kinematics",
        level: "lesson",
        materialKeys: ["lesson.physics.kinematics"],
        order: 10,
        outcomes: [
          {
            code: "Tingkatan 4, Standard Kandungan 2.1 hingga 2.3",
            document: physicsStandards,
          },
        ],
      }),
      materialNode({
        key: "form-4-physics-force-and-motion-i-momentum",
        level: "lesson",
        materialKeys: ["lesson.physics.momentum"],
        order: 20,
        outcomes: [
          {
            code: "Tingkatan 4, Standard Kandungan 2.4 hingga 2.8",
            document: physicsStandards,
          },
        ],
      }),
    ],
    key: "form-4-physics-force-and-motion-i",
    materialCard: {
      de: {
        description: "Beschreibe Bewegung mit Weg, Geschwindigkeit und Zeit.",
        title: "Kraft und Bewegung I",
      },
      en: {
        description: "Describe motion with displacement, velocity and time.",
        title: "Force and Motion I",
      },
      id: {
        description: "Jelaskan gerak lewat perpindahan, kecepatan, dan waktu.",
        title: "Gaya dan Gerak I",
      },
      ms: {
        description: "Huraikan gerakan dengan sesaran, halaju dan masa.",
        title: "Daya dan Gerakan I",
      },
    },
    order: 20,
    translations: {
      de: { routeSlug: "kraft-und-bewegung-i", title: "Kraft und Bewegung I" },
      en: { routeSlug: "force-and-motion-i", title: "Force and Motion I" },
      id: { routeSlug: "gaya-dan-gerak-i", title: "Gaya dan Gerak I" },
      ms: { routeSlug: "daya-dan-gerakan-i", title: "Daya dan Gerakan I" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-4-physics-gravitation-gravitation",
        level: "lesson",
        materialKeys: ["lesson.physics.gravitation"],
        order: 10,
        outcomes: [
          {
            code: "Tingkatan 4, Standard Kandungan 3.1 hingga 3.3",
            document: physicsStandards,
          },
        ],
      }),
    ],
    key: "form-4-physics-gravitation",
    materialCard: {
      de: {
        description: "Berechne Schwerkraft, Bahnen und Fluchtgeschwindigkeit.",
        title: "Gravitation",
      },
      en: {
        description: "Calculate gravity, satellite orbits and escape velocity.",
        title: "Gravitation",
      },
      id: {
        description: "Hitung gravitasi, orbit satelit, dan kecepatan lepas.",
        title: "Gravitasi",
      },
      ms: {
        description: "Kira daya graviti, orbit satelit dan halaju lepas.",
        title: "Kegravitian",
      },
    },
    order: 30,
    translations: {
      de: { routeSlug: "gravitation", title: "Gravitation" },
      en: { routeSlug: "gravitation", title: "Gravitation" },
      id: { routeSlug: "gravitasi", title: "Gravitasi" },
      ms: { routeSlug: "kegravitian", title: "Kegravitian" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-4-physics-heat-heat",
        level: "lesson",
        materialKeys: ["lesson.physics.heat"],
        order: 10,
        outcomes: [
          {
            code: "Tingkatan 4, Standard Kandungan 4.1 hingga 4.4",
            document: physicsStandards,
          },
        ],
      }),
    ],
    key: "form-4-physics-heat",
    materialCard: {
      de: {
        description: "Berechne Wärme, latente Wärme und Gasgesetze.",
        title: "Wärme",
      },
      en: {
        description: "Calculate heat, latent heat and the gas laws.",
        title: "Heat",
      },
      id: {
        description: "Hitung kalor, kalor laten, dan hukum gas.",
        title: "Kalor",
      },
      ms: {
        description: "Kira haba, haba pendam dan hukum gas.",
        title: "Haba",
      },
    },
    order: 40,
    translations: {
      de: { routeSlug: "waerme", title: "Wärme" },
      en: { routeSlug: "heat", title: "Heat" },
      id: { routeSlug: "kalor", title: "Kalor" },
      ms: { routeSlug: "haba", title: "Haba" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-4-physics-waves-waves",
        level: "lesson",
        materialKeys: ["lesson.physics.waves"],
        order: 10,
        outcomes: [
          {
            code: "Tingkatan 4, Standard Kandungan 5.1 hingga 5.7",
            document: physicsStandards,
          },
        ],
      }),
    ],
    key: "form-4-physics-waves",
    materialCard: {
      de: {
        description: "Beschreibe Wellen, Resonanz und Interferenz.",
        title: "Wellen",
      },
      en: {
        description: "Describe waves, resonance and interference.",
        title: "Waves",
      },
      id: {
        description: "Jelaskan gelombang, resonansi, dan interferensi.",
        title: "Gelombang",
      },
      ms: {
        description: "Huraikan gelombang, resonans dan interferens.",
        title: "Gelombang",
      },
    },
    order: 50,
    translations: {
      de: { routeSlug: "wellen", title: "Wellen" },
      en: { routeSlug: "waves", title: "Waves" },
      id: { routeSlug: "gelombang", title: "Gelombang" },
      ms: { routeSlug: "gelombang", title: "Gelombang" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-4-physics-light-and-optics-light-optics",
        level: "lesson",
        materialKeys: ["lesson.physics.light-optics"],
        order: 10,
        outcomes: [
          {
            code: "Tingkatan 4, Standard Kandungan 6.1 hingga 6.4",
            document: physicsStandards,
          },
        ],
      }),
    ],
    key: "form-4-physics-light-and-optics",
    materialCard: {
      de: {
        description: "Berechne Brechung, Totalreflexion und Linsenbilder.",
        title: "Licht und Optik",
      },
      en: {
        description: "Work out refraction, total reflection and lens images.",
        title: "Light and Optics",
      },
      id: {
        description: "Hitung pembiasan, pemantulan total, dan bayangan lensa.",
        title: "Cahaya dan Optika",
      },
      ms: {
        description: "Kira pembiasan, pantulan dalam penuh dan imej kanta.",
        title: "Cahaya dan Optik",
      },
    },
    order: 60,
    translations: {
      de: { routeSlug: "licht-und-optik", title: "Licht und Optik" },
      en: { routeSlug: "light-and-optics", title: "Light and Optics" },
      id: { routeSlug: "cahaya-dan-optika", title: "Cahaya dan Optika" },
      ms: { routeSlug: "cahaya-dan-optik", title: "Cahaya dan Optik" },
    },
  }),
];
