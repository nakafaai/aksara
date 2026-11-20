import { physicsStandards } from "#corpus/curriculum/kssm/documents";
import {
  kssmForm5ElectricityUnit,
  kssmForm5ElectromagnetismUnit,
  kssmForm5ElectronicsUnit,
} from "#corpus/curriculum/kssm/form5/physics/electricity";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** The KSSM Form 5 Physics chapters, in the order of their DSKP. */
export const kssmForm5PhysicsTopicNodes = [
  unitNode({
    children: [
      materialNode({
        key: "form-5-physics-force-and-motion-ii-vector",
        level: "lesson",
        materialKeys: ["lesson.physics.vector"],
        order: 10,
        outcomes: [
          {
            code: "Tingkatan 5, Standard Kandungan 1.1 hingga 1.2",
            ...physicsStandards,
          },
        ],
      }),
    ],
    key: "form-5-physics-force-and-motion-ii",
    materialCard: {
      de: {
        description: "Addiere Kräfte als Vektoren und finde die Resultierende.",
        title: "Kraft und Bewegung II",
      },
      en: {
        description: "Add forces as vectors and find their resultant.",
        title: "Force and Motion II",
      },
      id: {
        description: "Jumlahkan gaya sebagai vektor dan cari resultannya.",
        title: "Gaya dan Gerak II",
      },
      ms: {
        description: "Tambah daya sebagai vektor dan cari daya paduannya.",
        title: "Daya dan Gerakan II",
      },
    },
    order: 10,
    translations: {
      de: {
        routeSlug: "kraft-und-bewegung-ii",
        title: "Kraft und Bewegung II",
      },
      en: { routeSlug: "force-and-motion-ii", title: "Force and Motion II" },
      id: { routeSlug: "gaya-dan-gerak-ii", title: "Gaya dan Gerak II" },
      ms: { routeSlug: "daya-dan-gerakan-ii", title: "Daya dan Gerakan II" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-5-physics-pressure-pressure",
        level: "lesson",
        materialKeys: ["lesson.physics.pressure"],
        order: 10,
        outcomes: [
          {
            code: "Tingkatan 5, Standard Kandungan 2.1 hingga 2.6",
            ...physicsStandards,
          },
        ],
      }),
    ],
    key: "form-5-physics-pressure",
    materialCard: {
      de: {
        description: "Berechne Schweredruck, Hydraulik und Auftrieb.",
        title: "Druck",
      },
      en: {
        description: "Work out liquid pressure, hydraulics and buoyancy.",
        title: "Pressure",
      },
      id: {
        description: "Hitung tekanan hidrostatis, hidrolik, dan gaya apung.",
        title: "Tekanan",
      },
      ms: {
        description: "Kira tekanan cecair, hidraulik dan keapungan.",
        title: "Tekanan",
      },
    },
    order: 20,
    translations: {
      de: { routeSlug: "druck", title: "Druck" },
      en: { routeSlug: "pressure", title: "Pressure" },
      id: { routeSlug: "tekanan", title: "Tekanan" },
      ms: { routeSlug: "tekanan", title: "Tekanan" },
    },
  }),
  kssmForm5ElectricityUnit,
  kssmForm5ElectromagnetismUnit,
  kssmForm5ElectronicsUnit,
  unitNode({
    children: [
      materialNode({
        key: "form-5-physics-nuclear-physics-nuclear-physics",
        level: "lesson",
        materialKeys: ["lesson.physics.nuclear-physics"],
        order: 10,
        outcomes: [
          {
            code: "Tingkatan 5, Standard Kandungan 6.1 hingga 6.2",
            ...physicsStandards,
          },
        ],
      }),
    ],
    key: "form-5-physics-nuclear-physics",
    materialCard: {
      de: {
        description: "Stell Zerfallsgleichungen auf und berechne Kernenergie.",
        title: "Kernphysik",
      },
      en: {
        description: "Write decay equations and calculate nuclear energy.",
        title: "Nuclear Physics",
      },
      id: {
        description: "Tulis persamaan peluruhan dan hitung energi nuklir.",
        title: "Fisika Inti",
      },
      ms: {
        description: "Tulis persamaan reputan dan kira tenaga nuklear.",
        title: "Fizik Nuklear",
      },
    },
    order: 60,
    translations: {
      de: { routeSlug: "kernphysik", title: "Kernphysik" },
      en: { routeSlug: "nuclear-physics", title: "Nuclear Physics" },
      id: { routeSlug: "fisika-inti", title: "Fisika Inti" },
      ms: { routeSlug: "fizik-nuklear", title: "Fizik Nuklear" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-5-physics-quantum-physics-quantum-physics",
        level: "lesson",
        materialKeys: ["lesson.physics.quantum-physics"],
        order: 10,
        outcomes: [
          {
            code: "Tingkatan 5, Standard Kandungan 7.1 hingga 7.3",
            ...physicsStandards,
          },
        ],
      }),
    ],
    key: "form-5-physics-quantum-physics",
    materialCard: {
      de: {
        description: "Berechne Photonenenergien und erklär den Photoeffekt.",
        title: "Quantenphysik",
      },
      en: {
        description: "Work out photon energies and the photoelectric effect.",
        title: "Quantum Physics",
      },
      id: {
        description: "Hitung energi foton dan jelaskan efek fotolistrik.",
        title: "Fisika Kuantum",
      },
      ms: {
        description: "Kira tenaga foton dan terangkan kesan fotoelektrik.",
        title: "Fizik Kuantum",
      },
    },
    order: 70,
    translations: {
      de: { routeSlug: "quantenphysik", title: "Quantenphysik" },
      en: { routeSlug: "quantum-physics", title: "Quantum Physics" },
      id: { routeSlug: "fisika-kuantum", title: "Fisika Kuantum" },
      ms: { routeSlug: "fizik-kuantum", title: "Fizik Kuantum" },
    },
  }),
];
