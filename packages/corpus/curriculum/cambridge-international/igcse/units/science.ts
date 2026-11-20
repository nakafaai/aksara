import {
  biologySyllabus,
  chemistrySyllabus,
  physicsSyllabus,
} from "#corpus/curriculum/cambridge-international/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

export const igcseBiologyUnitNodes = [
  unitNode({
    children: [
      materialNode({
        key: "biology-0610-living-organisms-biodiversity",
        level: "lesson",
        materialKeys: ["lesson.biology.biodiversity"],
        order: 10,
        outcomes: [
          {
            code: "1.2 Concept and uses of classification systems",
            ...biologySyllabus,
          },
          { code: "1.3 Features of organisms", ...biologySyllabus },
          { code: "19.2 Food chains and food webs", ...biologySyllabus },
        ],
      }),
    ],
    key: "biology-0610-living-organisms",
    materialCard: {
      de: {
        description: "Ordne Lebewesen ein und vergleiche biologische Systeme.",
        title: "Lebewesen",
      },
      en: {
        description: "Classify organisms and compare living systems.",
        title: "Living organisms",
      },
      id: {
        description: "Klasifikasi makhluk hidup dan sistemnya.",
        title: "Makhluk hidup",
      },
      ms: {
        description: "Kelaskan organisma dan bandingkan sistem hidupan.",
        title: "Organisma hidup",
      },
    },
    order: 10,
    translations: {
      de: { routeSlug: "lebewesen", title: "Lebewesen" },
      en: { routeSlug: "living-organisms", title: "Living organisms" },
      id: { routeSlug: "makhluk-hidup", title: "Makhluk hidup" },
      ms: { routeSlug: "organisma-hidup", title: "Organisma hidup" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "biology-0610-disease-ecosystems-virus",
        level: "lesson",
        materialKeys: ["lesson.biology.virus-role"],
        order: 10,
        outcomes: [{ code: "10.1 Diseases and immunity", ...biologySyllabus }],
      }),
      materialNode({
        key: "biology-0610-disease-ecosystems-climate",
        level: "lesson",
        materialKeys: ["lesson.biology.climate-change"],
        order: 20,
        outcomes: [{ code: "20.3 Pollution", ...biologySyllabus }],
      }),
    ],
    key: "biology-0610-disease-ecosystems",
    materialCard: {
      de: {
        description: "Verbinde Viren, Ökosysteme und Klimafolgen.",
        title: "Krankheiten und Ökosysteme",
      },
      en: {
        description: "Connect viruses, ecosystems, and climate effects.",
        title: "Disease and ecosystems",
      },
      id: {
        description: "Hubungkan virus, ekosistem, dan iklim.",
        title: "Penyakit dan ekosistem",
      },
      ms: {
        description: "Kaitkan virus, ekosistem dan kesan iklim.",
        title: "Penyakit dan ekosistem",
      },
    },
    order: 20,
    translations: {
      de: {
        routeSlug: "krankheiten-und-oekosysteme",
        title: "Krankheiten und Ökosysteme",
      },
      en: {
        routeSlug: "disease-and-ecosystems",
        title: "Disease and ecosystems",
      },
      id: {
        routeSlug: "penyakit-dan-ekosistem",
        title: "Penyakit dan ekosistem",
      },
      ms: {
        routeSlug: "penyakit-dan-ekosistem",
        title: "Penyakit dan ekosistem",
      },
    },
  }),
];

export const igcseChemistryUnitNodes = [
  unitNode({
    children: [
      materialNode({
        key: "chemistry-0620-matter-reactions-atomic-structure",
        level: "lesson",
        materialKeys: ["lesson.chemistry.structure-matter"],
        order: 10,
        outcomes: [
          {
            code: "2.2 Atomic structure and the Periodic Table",
            ...chemistrySyllabus,
          },
          { code: "2.3 Isotopes", ...chemistrySyllabus },
        ],
      }),
      materialNode({
        key: "chemistry-0620-matter-reactions-basic-laws",
        level: "lesson",
        materialKeys: ["lesson.chemistry.basic-chemistry-laws"],
        order: 20,
        outcomes: [{ code: "3.1 Formulae", ...chemistrySyllabus }],
      }),
    ],
    key: "chemistry-0620-matter-reactions",
    materialCard: {
      de: {
        description: "Modelliere Atome, Reaktionen und chemische Gesetze.",
        title: "Stoffe und Reaktionen",
      },
      en: {
        description: "Model atoms, reactions, and chemical laws.",
        title: "Matter and reactions",
      },
      id: {
        description: "Modelkan atom, reaksi, dan hukum kimia.",
        title: "Materi dan reaksi",
      },
      ms: {
        description: "Bina model atom, tindak balas dan hukum kimia.",
        title: "Jirim dan tindak balas",
      },
    },
    order: 10,
    translations: {
      de: {
        routeSlug: "stoffe-und-reaktionen",
        title: "Stoffe und Reaktionen",
      },
      en: { routeSlug: "matter-and-reactions", title: "Matter and reactions" },
      id: { routeSlug: "materi-dan-reaksi", title: "Materi dan reaksi" },
      ms: {
        routeSlug: "jirim-dan-tindak-balas",
        title: "Jirim dan tindak balas",
      },
    },
  }),
];

export const igcsePhysicsUnitNodes = [
  unitNode({
    children: [
      materialNode({
        key: "physics-0625-measurement-motion-measurement",
        level: "lesson",
        materialKeys: ["lesson.physics.measurement"],
        order: 10,
        outcomes: [
          {
            code: "1.1 Physical quantities and measurement techniques",
            ...physicsSyllabus,
          },
        ],
      }),
      materialNode({
        key: "physics-0625-measurement-motion-kinematics",
        level: "lesson",
        materialKeys: ["lesson.physics.kinematics"],
        order: 20,
        outcomes: [{ code: "1.2 Motion", ...physicsSyllabus }],
      }),
      materialNode({
        key: "physics-0625-measurement-motion-vector",
        level: "lesson",
        materialKeys: ["lesson.physics.vector"],
        order: 30,
        outcomes: [
          {
            code: "1.1 Physical quantities and measurement techniques",
            ...physicsSyllabus,
          },
        ],
      }),
    ],
    key: "physics-0625-measurement-motion",
    materialCard: {
      de: {
        description: "Miss Bewegung und beschreibe Vektoren und Kräfte.",
        title: "Messung, Bewegung und Kräfte",
      },
      en: {
        description: "Measure motion, vectors, and forces clearly.",
        title: "Measurement, motion, and forces",
      },
      id: {
        description: "Ukur gerak, vektor, dan gaya dengan jelas.",
        title: "Pengukuran, gerak, dan gaya",
      },
      ms: {
        description: "Ukur gerakan, vektor dan daya dengan jelas.",
        title: "Pengukuran, gerakan dan daya",
      },
    },
    order: 10,
    translations: {
      de: {
        routeSlug: "messung-bewegung-und-kraefte",
        title: "Messung, Bewegung und Kräfte",
      },
      en: {
        routeSlug: "measurement-motion-and-forces",
        title: "Measurement, motion, and forces",
      },
      id: {
        routeSlug: "pengukuran-gerak-dan-gaya",
        title: "Pengukuran, gerak, dan gaya",
      },
      ms: {
        routeSlug: "pengukuran-gerakan-dan-daya",
        title: "Pengukuran, gerakan dan daya",
      },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "physics-0625-energy-renewable-energy",
        level: "lesson",
        materialKeys: ["lesson.physics.renewable-energy"],
        order: 10,
        outcomes: [{ code: "1.7 Energy, work and power", ...physicsSyllabus }],
      }),
    ],
    key: "physics-0625-energy",
    materialCard: {
      de: {
        description: "Vergleiche Energiequellen und ihre Vor- und Nachteile.",
        title: "Energie",
      },
      en: {
        description: "Compare energy sources and their tradeoffs.",
        title: "Energy",
      },
      id: {
        description: "Bandingkan sumber energi dan dampaknya.",
        title: "Energi",
      },
      ms: {
        description: "Timbang kelebihan dan kekurangan setiap sumber tenaga.",
        title: "Tenaga",
      },
    },
    order: 20,
    translations: {
      de: { routeSlug: "energie", title: "Energie" },
      en: { routeSlug: "energy", title: "Energy" },
      id: { routeSlug: "energi", title: "Energi" },
      ms: { routeSlug: "tenaga", title: "Tenaga" },
    },
  }),
];
