import { materialNode, unitNode } from "#corpus/curriculum/schema";
import {
  energyStandards,
  forceStandards,
  matterStandards,
  wavesStandards,
} from "#corpus/curriculum/united-states/documents";

/** United States high school, NGSS Physical Sciences. */
export const usPhysicalSciencesUnit = unitNode({
  children: [
    materialNode({
      key: "us-high-school-science-physical-sciences-matter",
      level: "lesson",
      materialKeys: ["lesson.chemistry.structure-matter"],
      order: 10,
      outcomes: [
        {
          code: "PS1.A Structure and Properties of Matter",
          ...matterStandards,
        },
      ],
    }),
    materialNode({
      key: "us-high-school-science-physical-sciences-bonding",
      level: "lesson",
      materialKeys: ["lesson.chemistry.chemical-bond"],
      order: 20,
      outcomes: [
        {
          code: "PS1.A Structure and Properties of Matter",
          ...matterStandards,
        },
        { code: "PS2.B Types of Interactions", ...forceStandards },
      ],
    }),
    materialNode({
      key: "us-high-school-science-physical-sciences-periodic",
      level: "lesson",
      materialKeys: ["lesson.chemistry.periodic-groups"],
      order: 30,
      outcomes: [
        {
          code: "PS1.A Structure and Properties of Matter",
          ...matterStandards,
        },
      ],
    }),
    materialNode({
      key: "us-high-school-science-physical-sciences-reactions",
      level: "lesson",
      materialKeys: ["lesson.chemistry.basic-chemistry-laws"],
      order: 40,
      outcomes: [{ code: "PS1.B Chemical Reactions", ...matterStandards }],
    }),
    materialNode({
      key: "us-high-school-science-physical-sciences-moles",
      level: "lesson",
      materialKeys: ["lesson.chemistry.mole-concept"],
      order: 50,
      outcomes: [{ code: "PS1.B Chemical Reactions", ...matterStandards }],
    }),
    materialNode({
      key: "us-high-school-science-physical-sciences-rates",
      level: "lesson",
      materialKeys: ["lesson.chemistry.reaction-rate"],
      order: 60,
      outcomes: [{ code: "PS1.B Chemical Reactions", ...matterStandards }],
    }),
    materialNode({
      key: "us-high-school-science-physical-sciences-energetics",
      level: "lesson",
      materialKeys: ["lesson.chemistry.thermochemistry"],
      order: 70,
      outcomes: [
        { code: "PS1.B Chemical Reactions", ...matterStandards },
        { code: "PS3.D Energy in Chemical Processes", ...energyStandards },
      ],
    }),
    materialNode({
      key: "us-high-school-science-physical-sciences-nuclear",
      level: "lesson",
      materialKeys: ["lesson.physics.nuclear-physics"],
      order: 80,
      outcomes: [{ code: "PS1.C Nuclear Processes", ...matterStandards }],
    }),
    materialNode({
      key: "us-high-school-science-physical-sciences-motion",
      level: "lesson",
      materialKeys: ["lesson.physics.kinematics"],
      order: 90,
      outcomes: [{ code: "PS2.A Forces and Motion", ...forceStandards }],
    }),
    materialNode({
      key: "us-high-school-science-physical-sciences-forces",
      level: "lesson",
      materialKeys: ["lesson.physics.momentum"],
      order: 100,
      outcomes: [{ code: "PS2.A Forces and Motion", ...forceStandards }],
    }),
    materialNode({
      key: "us-high-school-science-physical-sciences-gravitation",
      level: "lesson",
      materialKeys: ["lesson.physics.gravitation"],
      order: 110,
      outcomes: [{ code: "PS2.B Types of Interactions", ...forceStandards }],
    }),
    materialNode({
      key: "us-high-school-science-physical-sciences-electromagnetism",
      level: "lesson",
      materialKeys: ["lesson.physics.electromagnetism"],
      order: 120,
      outcomes: [{ code: "PS2.B Types of Interactions", ...forceStandards }],
    }),
    materialNode({
      key: "us-high-school-science-physical-sciences-energy",
      level: "lesson",
      materialKeys: ["lesson.physics.renewable-energy"],
      order: 130,
      outcomes: [
        { code: "PS3.A Definitions of Energy", ...energyStandards },
        {
          code: "PS3.B Conservation of Energy and Energy Transfer",
          ...energyStandards,
        },
        {
          code: "PS3.C Relationship Between Energy and Forces",
          ...energyStandards,
        },
      ],
    }),
    materialNode({
      key: "us-high-school-science-physical-sciences-heat",
      level: "lesson",
      materialKeys: ["lesson.physics.heat"],
      order: 140,
      outcomes: [
        { code: "PS3.A Definitions of Energy", ...energyStandards },
        {
          code: "PS3.B Conservation of Energy and Energy Transfer",
          ...energyStandards,
        },
      ],
    }),
    materialNode({
      key: "us-high-school-science-physical-sciences-waves",
      level: "lesson",
      materialKeys: ["lesson.physics.waves"],
      order: 150,
      outcomes: [
        { code: "PS4.A Wave Properties", ...wavesStandards },
        { code: "PS4.B Electromagnetic Radiation", ...wavesStandards },
      ],
    }),
    materialNode({
      key: "us-high-school-science-physical-sciences-photons",
      level: "lesson",
      materialKeys: ["lesson.physics.quantum-physics"],
      order: 160,
      outcomes: [
        { code: "PS4.B Electromagnetic Radiation", ...wavesStandards },
      ],
    }),
    materialNode({
      key: "us-high-school-science-physical-sciences-instruments",
      level: "lesson",
      materialKeys: ["lesson.physics.electronics"],
      order: 170,
      outcomes: [
        {
          code: "PS4.C Information Technologies and Instrumentation",
          ...wavesStandards,
        },
      ],
    }),
    materialNode({
      key: "us-high-school-science-physical-sciences-optics",
      level: "lesson",
      materialKeys: ["lesson.physics.light-optics"],
      order: 180,
      outcomes: [
        {
          code: "PS4.C Information Technologies and Instrumentation",
          ...wavesStandards,
        },
      ],
    }),
  ],
  key: "high-school-science-physical-sciences",
  materialCard: {
    de: {
      description: "Verbinde Bewegung, Energie, Stoffe und Reaktionen.",
      title: "Physikalische Wissenschaften",
    },
    en: {
      description: "Connect motion, energy, matter, and reactions.",
      title: "Physical Sciences",
    },
    id: {
      description: "Hubungkan gerak, energi, materi, dan reaksi.",
      title: "Ilmu fisika dan kimia",
    },
    ms: {
      description: "Kaitkan gerakan, tenaga, jirim dan tindak balas.",
      title: "Sains Fizikal",
    },
  },
  order: 10,
  translations: {
    de: {
      routeSlug: "physikalische-wissenschaften",
      title: "Physikalische Wissenschaften",
    },
    en: { routeSlug: "physical-sciences", title: "Physical Sciences" },
    id: { routeSlug: "ilmu-fisika-dan-kimia", title: "Ilmu fisika dan kimia" },
    ms: { routeSlug: "sains-fizikal", title: "Sains Fizikal" },
  },
});
