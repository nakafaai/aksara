import { materialNode, unitNode } from "#corpus/curriculum/schema";
import { physicsSyllabus } from "#corpus/curriculum/singapore-moe/documents";

/** Singapore SEC G3 Physics (K323), section V Electricity and Magnetism. */
export const singaporeElectricityUnit = unitNode({
  children: [
    materialNode({
      key: "singapore-secondary-physics-electricity-magnetism-current",
      level: "lesson",
      materialKeys: ["lesson.physics.electricity"],
      order: 10,
      outcomes: [
        { code: "14 Current of Electricity", ...physicsSyllabus },
        { code: "15 D.C. Circuits", ...physicsSyllabus },
        { code: "16 Practical Electricity", ...physicsSyllabus },
      ],
    }),
    materialNode({
      key: "singapore-secondary-physics-electricity-magnetism-components",
      level: "lesson",
      materialKeys: ["lesson.physics.electronics"],
      order: 20,
      outcomes: [{ code: "15 D.C. Circuits", ...physicsSyllabus }],
    }),
    materialNode({
      key: "singapore-secondary-physics-electricity-magnetism-electromagnetism",
      level: "lesson",
      materialKeys: ["lesson.physics.electromagnetism"],
      order: 30,
      outcomes: [
        { code: "18 Electromagnetism", ...physicsSyllabus },
        { code: "19 Electromagnetic Induction", ...physicsSyllabus },
      ],
    }),
  ],
  key: "secondary-physics-electricity-magnetism",
  materialCard: {
    de: {
      description: "Rechne mit Stromkreisen und Induktion.",
      title: "Elektrizität und Magnetismus",
    },
    en: {
      description: "Calculate circuits and electromagnetic induction.",
      title: "Electricity and magnetism",
    },
    id: {
      description: "Hitung rangkaian listrik dan induksi.",
      title: "Listrik dan magnet",
    },
    ms: {
      description: "Kira litar elektrik dan aruhan.",
      title: "Elektrik dan kemagnetan",
    },
  },
  order: 50,
  translations: {
    de: {
      routeSlug: "elektrizitaet-und-magnetismus",
      title: "Elektrizität und Magnetismus",
    },
    en: {
      routeSlug: "electricity-and-magnetism",
      title: "Electricity and magnetism",
    },
    id: { routeSlug: "listrik-dan-magnet", title: "Listrik dan magnet" },
    ms: {
      routeSlug: "elektrik-dan-kemagnetan",
      title: "Elektrik dan kemagnetan",
    },
  },
});

/** Singapore SEC G3 Physics (K323), section VI Radioactivity. */
export const singaporeRadioactivityUnit = unitNode({
  children: [
    materialNode({
      key: "singapore-secondary-physics-radioactivity-decay",
      level: "lesson",
      materialKeys: ["lesson.physics.nuclear-physics"],
      order: 10,
      outcomes: [{ code: "20 Radioactivity", ...physicsSyllabus }],
    }),
  ],
  key: "secondary-physics-radioactivity",
  materialCard: {
    de: {
      description: "Vergleiche Strahlungsarten und ihre Halbwertszeiten.",
      title: "Radioaktivität",
    },
    en: {
      description: "Compare radiation types and their half-lives.",
      title: "Radioactivity",
    },
    id: {
      description: "Bandingkan jenis radiasi dan waktu paruhnya.",
      title: "Radioaktivitas",
    },
    ms: {
      description: "Bandingkan jenis sinaran dan separuh hayatnya.",
      title: "Keradioaktifan",
    },
  },
  order: 60,
  translations: {
    de: { routeSlug: "radioaktivitaet", title: "Radioaktivität" },
    en: { routeSlug: "radioactivity", title: "Radioactivity" },
    id: { routeSlug: "radioaktivitas", title: "Radioaktivitas" },
    ms: { routeSlug: "keradioaktifan", title: "Keradioaktifan" },
  },
});
