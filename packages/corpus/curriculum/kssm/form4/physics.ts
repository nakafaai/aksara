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
    key: "form-4-physics-gravitation",
    order: 30,
    translations: {
      de: { routeSlug: "gravitation", title: "Gravitation" },
      en: { routeSlug: "gravitation", title: "Gravitation" },
      id: { routeSlug: "gravitasi", title: "Gravitasi" },
      ms: { routeSlug: "kegravitian", title: "Kegravitian" },
    },
  }),
  unitNode({
    key: "form-4-physics-heat",
    order: 40,
    translations: {
      de: { routeSlug: "waerme", title: "Wärme" },
      en: { routeSlug: "heat", title: "Heat" },
      id: { routeSlug: "kalor", title: "Kalor" },
      ms: { routeSlug: "haba", title: "Haba" },
    },
  }),
  unitNode({
    key: "form-4-physics-waves",
    order: 50,
    translations: {
      de: { routeSlug: "wellen", title: "Wellen" },
      en: { routeSlug: "waves", title: "Waves" },
      id: { routeSlug: "gelombang", title: "Gelombang" },
      ms: { routeSlug: "gelombang", title: "Gelombang" },
    },
  }),
  unitNode({
    key: "form-4-physics-light-and-optics",
    order: 60,
    translations: {
      de: { routeSlug: "licht-und-optik", title: "Licht und Optik" },
      en: { routeSlug: "light-and-optics", title: "Light and Optics" },
      id: { routeSlug: "cahaya-dan-optika", title: "Cahaya dan Optika" },
      ms: { routeSlug: "cahaya-dan-optik", title: "Cahaya dan Optik" },
    },
  }),
];
