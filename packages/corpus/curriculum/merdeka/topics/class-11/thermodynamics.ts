import {
  merdekaLearningOutcomes,
  physicsBookXI,
} from "#corpus/curriculum/merdeka/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** Kurikulum Merdeka Kelas 11 Fisika, Bab 7 Termodinamika: gas ideal, hukum pertama dan kedua, mesin kalor. */
export const merdekaClass11ThermodynamicsUnit = unitNode({
  children: [
    materialNode({
      key: "class-11-physics-thermodynamics-material",
      level: "lesson",
      materialKeys: ["lesson.physics.thermodynamics"],
      order: 10,
      outcomes: [
        {
          code: "Fisika, Fase F, elemen Pemahaman Fisika",
          ...merdekaLearningOutcomes,
        },
        { code: "Bab 7 Termodinamika", ...physicsBookXI },
      ],
    }),
  ],
  key: "class-11-physics-thermodynamics",
  materialCard: {
    de: {
      description: "Nutze ideale Gase, Hauptsätze und Wärmekraftmaschinen.",
      title: "Thermodynamik",
    },
    en: {
      description: "Use the ideal gas law, both laws and heat engines.",
      title: "Thermodynamics",
    },
    id: {
      description: "Pakai gas ideal, hukum pertama dan kedua, mesin kalor.",
      title: "Termodinamika",
    },
    ms: {
      description: "Guna gas unggul, hukum pertama dan kedua, enjin haba.",
      title: "Termodinamik",
    },
  },
  order: 70,
  translations: {
    de: { routeSlug: "thermodynamik", title: "Thermodynamik" },
    en: { routeSlug: "thermodynamics", title: "Thermodynamics" },
    id: { routeSlug: "termodinamika", title: "Termodinamika" },
    ms: { routeSlug: "termodinamik", title: "Termodinamik" },
  },
});
