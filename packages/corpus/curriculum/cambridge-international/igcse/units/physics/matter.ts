import { physicsSyllabus } from "#corpus/curriculum/cambridge-international/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** Cambridge IGCSE Physics 0625, topic 2 Thermal physics. */
export const igcseThermalUnit = unitNode({
  children: [
    materialNode({
      key: "physics-0625-thermal-physics-heat",
      level: "lesson",
      materialKeys: ["lesson.physics.heat"],
      order: 10,
      outcomes: [
        { code: "2.1.1 States of matter", ...physicsSyllabus },
        { code: "2.1.2 Particle model", ...physicsSyllabus },
        {
          code: "2.1.3 Gases and the absolute scale of temperature",
          ...physicsSyllabus,
        },
        { code: "2.2.2 Specific heat capacity", ...physicsSyllabus },
        { code: "2.2.3 Melting, boiling and evaporation", ...physicsSyllabus },
      ],
    }),
  ],
  key: "physics-0625-thermal-physics",
  materialCard: {
    de: {
      description: "Verbinde Temperatur mit der Bewegung von Teilchen.",
      title: "Wärmelehre",
    },
    en: {
      description: "Link temperature to the motion of particles.",
      title: "Thermal physics",
    },
    id: {
      description: "Kaitkan suhu dengan gerak partikel.",
      title: "Fisika termal",
    },
    ms: {
      description: "Kaitkan suhu dengan gerakan zarah.",
      title: "Fizik terma",
    },
  },
  order: 20,
  translations: {
    de: { routeSlug: "waermelehre", title: "Wärmelehre" },
    en: { routeSlug: "thermal-physics", title: "Thermal physics" },
    id: { routeSlug: "fisika-termal", title: "Fisika termal" },
    ms: { routeSlug: "fizik-terma", title: "Fizik terma" },
  },
});

/** Cambridge IGCSE Physics 0625, topic 3 Waves. */
export const igcseWavesUnit = unitNode({
  children: [
    materialNode({
      key: "physics-0625-waves-waves",
      level: "lesson",
      materialKeys: ["lesson.physics.waves"],
      order: 10,
      outcomes: [
        { code: "3.1 General properties of waves", ...physicsSyllabus },
        { code: "3.3 Electromagnetic spectrum", ...physicsSyllabus },
        { code: "3.4 Sound", ...physicsSyllabus },
      ],
    }),
    materialNode({
      key: "physics-0625-waves-light",
      level: "lesson",
      materialKeys: ["lesson.physics.light-optics"],
      order: 20,
      outcomes: [
        { code: "3.2.1 Reflection of light", ...physicsSyllabus },
        { code: "3.2.2 Refraction of light", ...physicsSyllabus },
        { code: "3.2.3 Thin lenses", ...physicsSyllabus },
      ],
    }),
  ],
  key: "physics-0625-waves",
  materialCard: {
    de: {
      description: "Verfolge Wellen, Licht und Schall durch Medien.",
      title: "Wellen",
    },
    en: {
      description: "Follow waves, light, and sound through media.",
      title: "Waves",
    },
    id: {
      description: "Ikuti gelombang, cahaya, dan bunyi lewat medium.",
      title: "Gelombang",
    },
    ms: {
      description: "Ikuti gelombang, cahaya dan bunyi melalui medium.",
      title: "Gelombang",
    },
  },
  order: 30,
  translations: {
    de: { routeSlug: "wellen", title: "Wellen" },
    en: { routeSlug: "waves", title: "Waves" },
    id: { routeSlug: "gelombang", title: "Gelombang" },
    ms: { routeSlug: "gelombang", title: "Gelombang" },
  },
});
