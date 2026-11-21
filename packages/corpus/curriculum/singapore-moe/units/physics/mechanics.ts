import { materialNode, unitNode } from "#corpus/curriculum/schema";
import { physicsSyllabus } from "#corpus/curriculum/singapore-moe/documents";

/** Singapore SEC G3 Physics (K323), section I Measurement. */
export const singaporeMeasurementUnit = unitNode({
  children: [
    materialNode({
      key: "singapore-secondary-physics-measurement-measurement",
      level: "lesson",
      materialKeys: ["lesson.physics.measurement"],
      order: 10,
      outcomes: [
        {
          code: "1 Physical Quantities, Units and Measurement",
          ...physicsSyllabus,
        },
      ],
    }),
    materialNode({
      key: "singapore-secondary-physics-measurement-vectors",
      level: "lesson",
      materialKeys: ["lesson.physics.vector"],
      order: 20,
      outcomes: [
        {
          code: "1 Physical Quantities, Units and Measurement",
          ...physicsSyllabus,
        },
        { code: "4 Turning Effect of Forces", ...physicsSyllabus },
      ],
    }),
  ],
  key: "secondary-physics-measurement",
  materialCard: {
    de: {
      description: "Miss Größen genau und addiere Vektoren.",
      title: "Messen",
    },
    en: {
      description: "Measure quantities precisely and add vectors.",
      title: "Measurement",
    },
    id: {
      description: "Ukur besaran dengan teliti dan jumlahkan vektor.",
      title: "Pengukuran",
    },
    ms: {
      description: "Ukur kuantiti dengan tepat dan tambah vektor.",
      title: "Pengukuran",
    },
  },
  order: 10,
  translations: {
    de: { routeSlug: "messen", title: "Messen" },
    en: { routeSlug: "measurement", title: "Measurement" },
    id: { routeSlug: "pengukuran", title: "Pengukuran" },
    ms: { routeSlug: "pengukuran", title: "Pengukuran" },
  },
});

/** Singapore SEC G3 Physics (K323), section II Newtonian Mechanics. */
export const singaporeMechanicsUnit = unitNode({
  children: [
    materialNode({
      key: "singapore-secondary-physics-newtonian-mechanics-kinematics",
      level: "lesson",
      materialKeys: ["lesson.physics.kinematics"],
      order: 10,
      outcomes: [
        { code: "2 Kinematics", ...physicsSyllabus },
        { code: "3 Dynamics", ...physicsSyllabus },
      ],
    }),
    materialNode({
      key: "singapore-secondary-physics-newtonian-mechanics-dynamics",
      level: "lesson",
      materialKeys: ["lesson.physics.momentum"],
      order: 20,
      outcomes: [{ code: "3 Dynamics", ...physicsSyllabus }],
    }),
    materialNode({
      key: "singapore-secondary-physics-newtonian-mechanics-gravitation",
      level: "lesson",
      materialKeys: ["lesson.physics.gravitation"],
      order: 30,
      outcomes: [{ code: "3 Dynamics", ...physicsSyllabus }],
    }),
    materialNode({
      key: "singapore-secondary-physics-newtonian-mechanics-pressure",
      level: "lesson",
      materialKeys: ["lesson.physics.pressure"],
      order: 40,
      outcomes: [{ code: "5 Pressure", ...physicsSyllabus }],
    }),
    materialNode({
      key: "singapore-secondary-physics-newtonian-mechanics-energy",
      level: "lesson",
      materialKeys: ["lesson.physics.renewable-energy"],
      order: 50,
      outcomes: [{ code: "6 Energy", ...physicsSyllabus }],
    }),
  ],
  key: "secondary-physics-newtonian-mechanics",
  materialCard: {
    de: {
      description: "Erkläre Bewegung, Druck und Energie mit Newton.",
      title: "Newtonsche Mechanik",
    },
    en: {
      description: "Explain motion, pressure, and energy with Newton.",
      title: "Newtonian mechanics",
    },
    id: {
      description: "Jelaskan gerak, tekanan, dan energi dengan Newton.",
      title: "Mekanika Newton",
    },
    ms: {
      description: "Terangkan gerakan, tekanan dan tenaga dengan Newton.",
      title: "Mekanik Newton",
    },
  },
  order: 20,
  translations: {
    de: { routeSlug: "newtonsche-mechanik", title: "Newtonsche Mechanik" },
    en: { routeSlug: "newtonian-mechanics", title: "Newtonian mechanics" },
    id: { routeSlug: "mekanika-newton", title: "Mekanika Newton" },
    ms: { routeSlug: "mekanik-newton", title: "Mekanik Newton" },
  },
});
