import { materialNode, unitNode } from "#corpus/curriculum/schema";

export const merdekaClass10PhysicsTopicNodes = [
  unitNode({
    children: [
      materialNode({
        key: "class-10-physics-measurement-material",
        level: "lesson",
        materialKeys: ["lesson.physics.measurement"],
        order: 10,
      }),
    ],
    key: "class-10-physics-measurement",
    materialCard: {
      de: {
        description: "Verwende Einheiten und Messgeräte sachgerecht.",
        title: "Messen",
      },
      en: {
        description: "Use units and measuring tools well.",
        title: "Measurement",
      },
      id: {
        description: "Gunakan satuan dan alat ukur dengan tepat.",
        title: "Pengukuran",
      },
    },
    order: 10,
    translations: {
      de: {
        routeSlug: "messen-im-naturwissenschaftlichen-arbeiten",
        title: "Messen",
      },
      en: { routeSlug: "measurement", title: "Measurement" },
      id: { routeSlug: "pengukuran-dalam-kerja-ilmiah", title: "Pengukuran" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "class-10-physics-renewable-energy-material",
        level: "lesson",
        materialKeys: ["lesson.physics.renewable-energy"],
        order: 10,
      }),
    ],
    key: "class-10-physics-renewable-energy",
    materialCard: {
      de: {
        description: "Vergleiche Energiequellen und ihre Auswirkungen.",
        title: "Erneuerbare Energien",
      },
      en: {
        description: "Compare energy sources and impacts.",
        title: "Renewable Energy",
      },
      id: {
        description: "Bandingkan sumber energi dan dampaknya.",
        title: "Energi Terbarukan",
      },
    },
    order: 20,
    translations: {
      de: { routeSlug: "erneuerbare-energien", title: "Erneuerbare Energien" },
      en: { routeSlug: "renewable-energy", title: "Renewable Energy" },
      id: { routeSlug: "energi-terbarukan", title: "Energi Terbarukan" },
    },
  }),
];
