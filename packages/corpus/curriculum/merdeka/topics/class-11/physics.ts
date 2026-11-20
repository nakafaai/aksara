import {
  merdekaLearningOutcomes,
  physicsBookXI,
} from "#corpus/curriculum/merdeka/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** The Kurikulum Merdeka Kelas 11 Fisika units, in the chapter order of the Kemendikbudristek Buku Siswa Fisika SMA/MA Kelas XI (2022). */
export const merdekaClass11PhysicsTopicNodes = [
  unitNode({
    children: [
      materialNode({
        key: "class-11-physics-vector-material",
        level: "lesson",
        materialKeys: ["lesson.physics.vector"],
        order: 10,
        outcomes: [
          {
            code: "Fisika, Fase F, elemen Pemahaman Fisika",
            ...merdekaLearningOutcomes,
          },
          { code: "Bab 1 Vektor", ...physicsBookXI },
        ],
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
      ms: {
        description: "Guna arah vektor dalam soalan gerakan.",
        title: "Vektor dalam Fizik",
      },
    },
    order: 10,
    translations: {
      de: {
        routeSlug: "vektoren-in-der-physik",
        title: "Vektoren in der Physik",
      },
      en: { routeSlug: "vector", title: "Vectors in Physics" },
      id: { routeSlug: "vektor", title: "Vektor dalam Fisika" },
      ms: { routeSlug: "vektor", title: "Vektor dalam Fizik" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "class-11-physics-kinematics-material",
        level: "lesson",
        materialKeys: ["lesson.physics.kinematics"],
        order: 10,
        outcomes: [{ code: "Bab 2 Kinematika", ...physicsBookXI }],
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
      ms: {
        description: "Jejaki kedudukan, laju dan pecutan.",
        title: "Kinematik",
      },
    },
    order: 20,
    translations: {
      de: { routeSlug: "kinematik", title: "Kinematik" },
      en: { routeSlug: "kinematics", title: "Kinematics" },
      id: { routeSlug: "kinematika", title: "Kinematika" },
      ms: { routeSlug: "kinematik", title: "Kinematik" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "class-11-physics-particle-dynamics-material",
        level: "lesson",
        materialKeys: ["lesson.physics.momentum"],
        order: 10,
        outcomes: [
          {
            code: "Fisika, Fase F, elemen Pemahaman Fisika",
            ...merdekaLearningOutcomes,
          },
          {
            code: "Bab 3 Dinamika Gerak Partikel, A Hukum Newton dan C Momentum dan Impuls",
            ...physicsBookXI,
          },
        ],
      }),
    ],
    key: "class-11-physics-particle-dynamics",
    materialCard: {
      de: {
        description: "Wende Newtons Gesetze, Impuls und Kraftstoß an.",
        title: "Dynamik von Massenpunkten",
      },
      en: {
        description: "Apply Newton's laws, momentum and impulse.",
        title: "Particle Dynamics",
      },
      id: {
        description: "Pakai hukum Newton, momentum, dan impuls.",
        title: "Dinamika Gerak Partikel",
      },
      ms: {
        description: "Guna hukum Newton, momentum dan impuls.",
        title: "Dinamik Gerakan Zarah",
      },
    },
    order: 30,
    translations: {
      de: {
        routeSlug: "dynamik-von-massenpunkten",
        title: "Dynamik von Massenpunkten",
      },
      en: { routeSlug: "particle-dynamics", title: "Particle Dynamics" },
      id: {
        routeSlug: "dinamika-gerak-partikel",
        title: "Dinamika Gerak Partikel",
      },
      ms: {
        routeSlug: "dinamik-gerakan-zarah",
        title: "Dinamik Gerakan Zarah",
      },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "class-11-physics-fluid-material",
        level: "lesson",
        materialKeys: ["lesson.physics.pressure"],
        order: 10,
        outcomes: [
          {
            code: "Fisika, Fase F, elemen Pemahaman Fisika",
            ...merdekaLearningOutcomes,
          },
          { code: "Bab 4 Fluida", ...physicsBookXI },
        ],
      }),
    ],
    key: "class-11-physics-fluid",
    materialCard: {
      de: {
        description: "Berechne Druck, Auftrieb und Bernoulli-Strömung.",
        title: "Fluide",
      },
      en: {
        description: "Work out pressure, buoyancy and Bernoulli flow.",
        title: "Fluids",
      },
      id: {
        description: "Hitung tekanan hidrostatis, Archimedes, dan Bernoulli.",
        title: "Fluida",
      },
      ms: {
        description: "Kira tekanan, daya apungan dan aliran Bernoulli.",
        title: "Bendalir",
      },
    },
    order: 40,
    translations: {
      de: { routeSlug: "fluide", title: "Fluide" },
      en: { routeSlug: "fluids", title: "Fluids" },
      id: { routeSlug: "fluida", title: "Fluida" },
      ms: { routeSlug: "bendalir", title: "Bendalir" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "class-11-physics-wave-sound-light-material",
        level: "lesson",
        materialKeys: ["lesson.physics.waves"],
        order: 10,
        outcomes: [
          {
            code: "Fisika, Fase F, elemen Pemahaman Fisika",
            ...merdekaLearningOutcomes,
          },
          {
            code: "Bab 5 Gelombang, Bunyi dan Cahaya, A Gelombang dan C.1 Interferensi",
            ...physicsBookXI,
          },
        ],
      }),
    ],
    key: "class-11-physics-wave-sound-light",
    materialCard: {
      de: {
        description: "Lerne Wellen, Schall und die Interferenz von Licht.",
        title: "Wellen, Schall und Licht",
      },
      en: {
        description: "Study wave behaviour, sound and interference of light.",
        title: "Waves, Sound and Light",
      },
      id: {
        description: "Pelajari gelombang, bunyi, dan interferensi cahaya.",
        title: "Gelombang, Bunyi dan Cahaya",
      },
      ms: {
        description: "Kaji sifat gelombang, bunyi dan interferens cahaya.",
        title: "Gelombang, Bunyi dan Cahaya",
      },
    },
    order: 50,
    translations: {
      de: {
        routeSlug: "wellen-schall-und-licht",
        title: "Wellen, Schall und Licht",
      },
      en: {
        routeSlug: "waves-sound-and-light",
        title: "Waves, Sound and Light",
      },
      id: {
        routeSlug: "gelombang-bunyi-dan-cahaya",
        title: "Gelombang, Bunyi dan Cahaya",
      },
      ms: {
        routeSlug: "gelombang-bunyi-dan-cahaya",
        title: "Gelombang, Bunyi dan Cahaya",
      },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "class-11-physics-heat-material",
        level: "lesson",
        materialKeys: ["lesson.physics.heat"],
        order: 10,
        outcomes: [
          {
            code: "Fisika, Fase F, elemen Pemahaman Fisika",
            ...merdekaLearningOutcomes,
          },
          { code: "Bab 6 Kalor, A Suhu dan B Kalor", ...physicsBookXI },
        ],
      }),
    ],
    key: "class-11-physics-heat",
    materialCard: {
      de: {
        description: "Trenne Wärme und Temperatur, nutze spezifische Wärme.",
        title: "Wärme",
      },
      en: {
        description: "Tell heat from temperature and use specific heat.",
        title: "Heat",
      },
      id: {
        description: "Bedakan kalor dan suhu, lalu hitung kalor jenis.",
        title: "Kalor",
      },
      ms: {
        description: "Bezakan haba dan suhu, kemudian kira muatan haba.",
        title: "Haba",
      },
    },
    order: 60,
    translations: {
      de: { routeSlug: "waerme", title: "Wärme" },
      en: { routeSlug: "heat", title: "Heat" },
      id: { routeSlug: "kalor", title: "Kalor" },
      ms: { routeSlug: "haba", title: "Haba" },
    },
  }),
];
