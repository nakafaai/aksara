import { physicsSyllabus } from "#corpus/curriculum/cambridge-international/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** Cambridge IGCSE Physics 0625, topic 4 Electricity and magnetism. */
export const igcseElectricityUnit = unitNode({
  children: [
    materialNode({
      key: "physics-0625-electricity-magnetism-circuits",
      level: "lesson",
      materialKeys: ["lesson.physics.electricity"],
      order: 10,
      outcomes: [
        { code: "4.2.2 Electric current", ...physicsSyllabus },
        {
          code: "4.2.3 Electromotive force and potential difference",
          ...physicsSyllabus,
        },
        { code: "4.2.4 Resistance", ...physicsSyllabus },
        {
          code: "4.2.5 Electrical energy and electrical power",
          ...physicsSyllabus,
        },
        { code: "4.3.2 Series and parallel circuits", ...physicsSyllabus },
        { code: "4.4 Electrical safety", ...physicsSyllabus },
      ],
    }),
    materialNode({
      key: "physics-0625-electricity-magnetism-components",
      level: "lesson",
      materialKeys: ["lesson.physics.electronics"],
      order: 20,
      outcomes: [
        {
          code: "4.3.1 Circuit diagrams and circuit components",
          ...physicsSyllabus,
        },
        {
          code: "4.3.3 Action and use of circuit components",
          ...physicsSyllabus,
        },
      ],
    }),
    materialNode({
      key: "physics-0625-electricity-magnetism-electromagnetism",
      level: "lesson",
      materialKeys: ["lesson.physics.electromagnetism"],
      order: 30,
      outcomes: [
        { code: "4.1 Simple phenomena of magnetism", ...physicsSyllabus },
        { code: "4.5.1 Electromagnetic induction", ...physicsSyllabus },
        { code: "4.5.2 The a.c. generator", ...physicsSyllabus },
        { code: "4.5.3 Magnetic effect of a current", ...physicsSyllabus },
        {
          code: "4.5.4 Force on a current-carrying conductor",
          ...physicsSyllabus,
        },
        { code: "4.5.5 The d.c. motor", ...physicsSyllabus },
        { code: "4.5.6 The transformer", ...physicsSyllabus },
      ],
    }),
  ],
  key: "physics-0625-electricity-magnetism",
  materialCard: {
    de: {
      description: "Baue Stromkreise und nutze magnetische Wirkungen.",
      title: "Elektrizität und Magnetismus",
    },
    en: {
      description: "Build circuits and use magnetic effects.",
      title: "Electricity and magnetism",
    },
    id: {
      description: "Rangkai listrik dan manfaatkan efek magnet.",
      title: "Listrik dan magnet",
    },
    ms: {
      description: "Bina litar dan guna kesan magnet.",
      title: "Elektrik dan kemagnetan",
    },
  },
  order: 40,
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

/** Cambridge IGCSE Physics 0625, topic 5 Nuclear physics. */
export const igcseNuclearUnit = unitNode({
  children: [
    materialNode({
      key: "physics-0625-nuclear-physics-radioactivity",
      level: "lesson",
      materialKeys: ["lesson.physics.nuclear-physics"],
      order: 10,
      outcomes: [
        { code: "5.1.2 The nucleus", ...physicsSyllabus },
        {
          code: "5.2.2 The three types of nuclear emission",
          ...physicsSyllabus,
        },
        { code: "5.2.3 Radioactive decay", ...physicsSyllabus },
        { code: "5.2.4 Half-life", ...physicsSyllabus },
      ],
    }),
  ],
  key: "physics-0625-nuclear-physics",
  materialCard: {
    de: {
      description: "Sage Zerfälle und Halbwertszeiten voraus.",
      title: "Kernphysik",
    },
    en: {
      description: "Predict decays and half-lives.",
      title: "Nuclear physics",
    },
    id: {
      description: "Prediksi peluruhan dan waktu paruh.",
      title: "Fisika inti",
    },
    ms: {
      description: "Ramal reputan dan separuh hayat.",
      title: "Fizik nuklear",
    },
  },
  order: 50,
  translations: {
    de: { routeSlug: "kernphysik", title: "Kernphysik" },
    en: { routeSlug: "nuclear-physics", title: "Nuclear physics" },
    id: { routeSlug: "fisika-inti", title: "Fisika inti" },
    ms: { routeSlug: "fizik-nuklear", title: "Fizik nuklear" },
  },
});
