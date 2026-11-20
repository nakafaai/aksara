import {
  merdekaLearningOutcomes,
  physicsBookXII,
} from "#corpus/curriculum/merdeka/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** The Kurikulum Merdeka Kelas 12 Fisika units, in the chapter order of the Kemendikbudristek Buku Siswa Fisika SMA/MA Kelas XII. */
export const merdekaClass12PhysicsTopicNodes = [
  unitNode({
    children: [
      materialNode({
        key: "class-12-physics-direct-current-material",
        level: "lesson",
        materialKeys: ["lesson.physics.electricity"],
        order: 10,
        outcomes: [
          {
            code: "Fisika, Fase F, elemen Pemahaman Fisika",
            ...merdekaLearningOutcomes,
          },
          {
            code: "Bab 2 Listrik Arus Searah, A sampai D dan F",
            ...physicsBookXII,
          },
        ],
      }),
    ],
    key: "class-12-physics-direct-current",
    materialCard: {
      de: {
        description: "Nutze Ohmsches Gesetz, Schaltungen und Spannung.",
        title: "Gleichstrom",
      },
      en: {
        description: "Use Ohm's law, resistor networks and e.m.f.",
        title: "Direct Current Electricity",
      },
      id: {
        description: "Pakai hukum Ohm, susunan hambatan, dan GGL.",
        title: "Listrik Arus Searah",
      },
      ms: {
        description: "Guna hukum Ohm, susunan perintang dan d.g.e.",
        title: "Elektrik Arus Terus",
      },
    },
    order: 20,
    translations: {
      de: { routeSlug: "gleichstrom", title: "Gleichstrom" },
      en: {
        routeSlug: "direct-current-electricity",
        title: "Direct Current Electricity",
      },
      id: { routeSlug: "listrik-arus-searah", title: "Listrik Arus Searah" },
      ms: { routeSlug: "elektrik-arus-terus", title: "Elektrik Arus Terus" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "class-12-physics-magnetism-material",
        level: "lesson",
        materialKeys: ["lesson.physics.electromagnetism"],
        order: 10,
        outcomes: [
          {
            code: "Fisika, Fase F, elemen Pemahaman Fisika",
            ...merdekaLearningOutcomes,
          },
          {
            code: "Bab 3 Kemagnetan, B, C, E, F dan G",
            ...physicsBookXII,
          },
        ],
      }),
    ],
    key: "class-12-physics-magnetism",
    materialCard: {
      de: {
        description: "Berechne Magnetkraft und elektromagnetische Induktion.",
        title: "Magnetismus",
      },
      en: {
        description: "Work out magnetic force and induction.",
        title: "Magnetism",
      },
      id: {
        description: "Hitung gaya magnet dan induksi elektromagnetik.",
        title: "Kemagnetan",
      },
      ms: {
        description: "Kira daya magnet dan aruhan elektromagnet.",
        title: "Kemagnetan",
      },
    },
    order: 30,
    translations: {
      de: { routeSlug: "magnetismus", title: "Magnetismus" },
      en: { routeSlug: "magnetism", title: "Magnetism" },
      id: { routeSlug: "kemagnetan", title: "Kemagnetan" },
      ms: { routeSlug: "kemagnetan", title: "Kemagnetan" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "class-12-physics-electronics-material",
        level: "lesson",
        materialKeys: ["lesson.physics.electronics"],
        order: 10,
        outcomes: [
          {
            code: "Fisika, Fase F, elemen Pemahaman Fisika",
            ...merdekaLearningOutcomes,
          },
          {
            code: "Bab 6 Pengantar Instrumental Digital, A Sistem Elektronika dan B Semikonduktor",
            ...physicsBookXII,
          },
        ],
      }),
    ],
    key: "class-12-physics-electronics",
    materialCard: {
      de: {
        description: "Lerne Halbleiter, Transistoren und Logikgatter.",
        title: "Einführung in die digitale Messtechnik",
      },
      en: {
        description: "Learn semiconductors, transistors and logic gates.",
        title: "Introduction to Digital Instrumentation",
      },
      id: {
        description: "Pelajari semikonduktor, transistor, dan gerbang logika.",
        title: "Pengantar Instrumental Digital",
      },
      ms: {
        description: "Kaji semikonduktor, transistor dan get logik.",
        title: "Pengenalan Instrumentasi Digital",
      },
    },
    order: 60,
    translations: {
      de: {
        routeSlug: "einfuehrung-in-die-digitale-messtechnik",
        title: "Einführung in die digitale Messtechnik",
      },
      en: {
        routeSlug: "introduction-to-digital-instrumentation",
        title: "Introduction to Digital Instrumentation",
      },
      id: {
        routeSlug: "pengantar-instrumental-digital",
        title: "Pengantar Instrumental Digital",
      },
      ms: {
        routeSlug: "pengenalan-instrumentasi-digital",
        title: "Pengenalan Instrumentasi Digital",
      },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "class-12-physics-quantum-phenomena-material",
        level: "lesson",
        materialKeys: ["lesson.physics.quantum-physics"],
        order: 10,
        outcomes: [
          {
            code: "Fisika, Fase F, elemen Pemahaman Fisika",
            ...merdekaLearningOutcomes,
          },
          {
            code: "Bab 8 Gejala Kuantum, A Konsep Foton dan B Efek Fotolistrik",
            ...physicsBookXII,
          },
        ],
      }),
    ],
    key: "class-12-physics-quantum-phenomena",
    materialCard: {
      de: {
        description: "Berechne Photonenenergie und den Photoeffekt.",
        title: "Quantenphänomene",
      },
      en: {
        description: "Work out photon energy and the photoelectric effect.",
        title: "Quantum Phenomena",
      },
      id: {
        description: "Hitung energi foton dan efek fotolistrik.",
        title: "Gejala Kuantum",
      },
      ms: {
        description: "Kira tenaga foton dan kesan fotoelektrik.",
        title: "Fenomena Kuantum",
      },
    },
    order: 80,
    translations: {
      de: { routeSlug: "quantenphaenomene", title: "Quantenphänomene" },
      en: { routeSlug: "quantum-phenomena", title: "Quantum Phenomena" },
      id: { routeSlug: "gejala-kuantum", title: "Gejala Kuantum" },
      ms: { routeSlug: "fenomena-kuantum", title: "Fenomena Kuantum" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "class-12-physics-nuclear-physics-material",
        level: "lesson",
        materialKeys: ["lesson.physics.nuclear-physics"],
        order: 10,
        outcomes: [
          {
            code: "Fisika, Fase F, elemen Pemahaman Fisika",
            ...merdekaLearningOutcomes,
          },
          {
            code: "Bab 9 Fisika Inti dan Radioaktivitas",
            ...physicsBookXII,
          },
        ],
      }),
    ],
    key: "class-12-physics-nuclear-physics",
    materialCard: {
      de: {
        description: "Berechne Zerfall, Halbwertszeit und Kernenergie.",
        title: "Kernphysik und Radioaktivität",
      },
      en: {
        description: "Work out decay, half-life and nuclear energy.",
        title: "Nuclear Physics and Radioactivity",
      },
      id: {
        description: "Hitung peluruhan, waktu paruh, dan energi inti.",
        title: "Fisika Inti dan Radioaktivitas",
      },
      ms: {
        description: "Kira reputan, separuh hayat dan tenaga nuklear.",
        title: "Fizik Nuklear dan Keradioaktifan",
      },
    },
    order: 90,
    translations: {
      de: {
        routeSlug: "kernphysik-und-radioaktivitaet",
        title: "Kernphysik und Radioaktivität",
      },
      en: {
        routeSlug: "nuclear-physics-and-radioactivity",
        title: "Nuclear Physics and Radioactivity",
      },
      id: {
        routeSlug: "fisika-inti-dan-radioaktivitas",
        title: "Fisika Inti dan Radioaktivitas",
      },
      ms: {
        routeSlug: "fizik-nuklear-dan-keradioaktifan",
        title: "Fizik Nuklear dan Keradioaktifan",
      },
    },
  }),
];
