import { materialNode, unitNode } from "#corpus/curriculum/schema";
import { physicsSyllabus } from "#corpus/curriculum/singapore-moe/documents";

/** Singapore SEC G3 Physics (K323), section III Thermal Physics. */
export const singaporeThermalUnit = unitNode({
  children: [
    materialNode({
      key: "singapore-secondary-physics-thermal-physics-heat",
      level: "lesson",
      materialKeys: ["lesson.physics.heat"],
      order: 10,
      outcomes: [
        { code: "7 Kinetic Particle Model of Matter", ...physicsSyllabus },
        { code: "8 Thermal Processes", ...physicsSyllabus },
        { code: "9 Thermal Properties of Matter", ...physicsSyllabus },
      ],
    }),
  ],
  key: "secondary-physics-thermal-physics",
  materialCard: {
    de: {
      description: "Verfolge Wärme durch Teilchen und Zustände.",
      title: "Wärmelehre",
    },
    en: {
      description: "Follow heat through particles and states.",
      title: "Thermal physics",
    },
    id: {
      description: "Ikuti kalor lewat partikel dan wujud zat.",
      title: "Fisika termal",
    },
    ms: {
      description: "Ikuti haba melalui zarah dan keadaan jirim.",
      title: "Fizik terma",
    },
  },
  order: 30,
  translations: {
    de: { routeSlug: "waermelehre", title: "Wärmelehre" },
    en: { routeSlug: "thermal-physics", title: "Thermal physics" },
    id: { routeSlug: "fisika-termal", title: "Fisika termal" },
    ms: { routeSlug: "fizik-terma", title: "Fizik terma" },
  },
});

/** Singapore SEC G3 Physics (K323), section IV Waves. */
export const singaporeWavesUnit = unitNode({
  children: [
    materialNode({
      key: "singapore-secondary-physics-waves-waves",
      level: "lesson",
      materialKeys: ["lesson.physics.waves"],
      order: 10,
      outcomes: [
        { code: "10 General Properties of Waves", ...physicsSyllabus },
        { code: "11 Electromagnetic Spectrum", ...physicsSyllabus },
      ],
    }),
    materialNode({
      key: "singapore-secondary-physics-waves-light",
      level: "lesson",
      materialKeys: ["lesson.physics.light-optics"],
      order: 20,
      outcomes: [{ code: "12 Light", ...physicsSyllabus }],
    }),
  ],
  key: "secondary-physics-waves",
  materialCard: {
    de: {
      description: "Beschreibe Wellen, das Spektrum und das Licht.",
      title: "Wellen",
    },
    en: {
      description: "Describe waves, the spectrum, and light.",
      title: "Waves",
    },
    id: {
      description: "Jelaskan gelombang, spektrum, dan cahaya.",
      title: "Gelombang",
    },
    ms: {
      description: "Huraikan gelombang, spektrum dan cahaya.",
      title: "Gelombang",
    },
  },
  order: 40,
  translations: {
    de: { routeSlug: "wellen", title: "Wellen" },
    en: { routeSlug: "waves", title: "Waves" },
    id: { routeSlug: "gelombang", title: "Gelombang" },
    ms: { routeSlug: "gelombang", title: "Gelombang" },
  },
});
