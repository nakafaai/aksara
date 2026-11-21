import { physicsSyllabus } from "#corpus/curriculum/cambridge-international/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** Cambridge IGCSE Physics 0625, topic 1 Motion, forces and energy. */
export const igcseMotionUnit = unitNode({
  children: [
    materialNode({
      key: "physics-0625-motion-forces-energy-measurement",
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
      key: "physics-0625-motion-forces-energy-vectors",
      level: "lesson",
      materialKeys: ["lesson.physics.vector"],
      order: 20,
      outcomes: [
        {
          code: "1.1 Physical quantities and measurement techniques",
          ...physicsSyllabus,
        },
        { code: "1.5.1 Effects of forces", ...physicsSyllabus },
      ],
    }),
    materialNode({
      key: "physics-0625-motion-forces-energy-kinematics",
      level: "lesson",
      materialKeys: ["lesson.physics.kinematics"],
      order: 30,
      outcomes: [
        { code: "1.2 Motion", ...physicsSyllabus },
        { code: "1.5.1 Effects of forces", ...physicsSyllabus },
      ],
    }),
    materialNode({
      key: "physics-0625-motion-forces-energy-momentum",
      level: "lesson",
      materialKeys: ["lesson.physics.momentum"],
      order: 40,
      outcomes: [
        { code: "1.3 Mass and weight", ...physicsSyllabus },
        { code: "1.5.1 Effects of forces", ...physicsSyllabus },
        { code: "1.6 Momentum", ...physicsSyllabus },
      ],
    }),
    materialNode({
      key: "physics-0625-motion-forces-energy-gravitation",
      level: "lesson",
      materialKeys: ["lesson.physics.gravitation"],
      order: 50,
      outcomes: [
        { code: "1.3 Mass and weight", ...physicsSyllabus },
        { code: "6.1.2 The Solar System", ...physicsSyllabus },
      ],
    }),
    materialNode({
      key: "physics-0625-motion-forces-energy-energy",
      level: "lesson",
      materialKeys: ["lesson.physics.renewable-energy"],
      order: 60,
      outcomes: [
        { code: "1.7.1 Energy", ...physicsSyllabus },
        { code: "1.7.2 Work", ...physicsSyllabus },
        { code: "1.7.3 Energy resources", ...physicsSyllabus },
        { code: "1.7.4 Power", ...physicsSyllabus },
      ],
    }),
    materialNode({
      key: "physics-0625-motion-forces-energy-pressure",
      level: "lesson",
      materialKeys: ["lesson.physics.pressure"],
      order: 70,
      outcomes: [
        { code: "1.8 Pressure", ...physicsSyllabus },
        { code: "1.4 Density", ...physicsSyllabus },
      ],
    }),
  ],
  key: "physics-0625-motion-forces-energy",
  materialCard: {
    de: {
      description: "Miss Bewegungen und erkläre sie mit Kräften.",
      title: "Bewegung, Kräfte und Energie",
    },
    en: {
      description: "Measure motion and explain it with forces.",
      title: "Motion, forces and energy",
    },
    id: {
      description: "Ukur gerak lalu jelaskan dengan gaya.",
      title: "Gerak, gaya, dan energi",
    },
    ms: {
      description: "Ukur gerakan dan terangkan dengan daya.",
      title: "Gerakan, daya dan tenaga",
    },
  },
  order: 10,
  translations: {
    de: {
      routeSlug: "bewegung-kraefte-und-energie",
      title: "Bewegung, Kräfte und Energie",
    },
    en: {
      routeSlug: "motion-forces-and-energy",
      title: "Motion, forces and energy",
    },
    id: {
      routeSlug: "gerak-gaya-dan-energi",
      title: "Gerak, gaya, dan energi",
    },
    ms: {
      routeSlug: "gerakan-daya-dan-tenaga",
      title: "Gerakan, daya dan tenaga",
    },
  },
});
