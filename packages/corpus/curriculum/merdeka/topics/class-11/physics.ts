import { materialNode, unitNode } from "#corpus/curriculum/schema";

export const merdekaClass11PhysicsTopicNodes = [
  unitNode({
    children: [
      materialNode({
        key: "class-11-physics-kinematics-material",
        level: "lesson",
        materialKeys: ["lesson.physics.kinematics"],
        order: 10,
      }),
    ],
    key: "class-11-physics-kinematics",
    materialCard: {
      de: {
        description: "Verfolge Ort, Geschwindigkeit und Beschleunigung.",
        title: "Kinematik",
      },
      en: {
        description: "Track position, speed, and acceleration.",
        title: "Kinematics",
      },
      id: {
        description: "Lacak posisi, kecepatan, dan percepatan.",
        title: "Kinematika",
      },
    },
    order: 10,
    translations: {
      de: { routeSlug: "kinematik", title: "Kinematik" },
      en: { routeSlug: "kinematics", title: "Kinematics" },
      id: { routeSlug: "kinematika", title: "Kinematika" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "class-11-physics-vector-material",
        level: "lesson",
        materialKeys: ["lesson.physics.vector"],
        order: 10,
      }),
    ],
    key: "class-11-physics-vector",
    materialCard: {
      de: {
        description: "Nutze Vektorrichtungen in Bewegungsaufgaben.",
        title: "Vektoren in der Physik",
      },
      en: {
        description: "Use vector direction in motion problems.",
        title: "Vectors in Physics",
      },
      id: {
        description: "Gunakan arah vektor dalam soal gerak.",
        title: "Vektor dalam Fisika",
      },
    },
    order: 20,
    translations: {
      de: {
        routeSlug: "vektoren-in-der-physik",
        title: "Vektoren in der Physik",
      },
      en: { routeSlug: "vector", title: "Vectors in Physics" },
      id: { routeSlug: "vektor", title: "Vektor dalam Fisika" },
    },
  }),
];
