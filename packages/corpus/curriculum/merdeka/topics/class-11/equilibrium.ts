import {
  chemistryBookXI,
  merdekaLearningOutcomes,
} from "#corpus/curriculum/merdeka/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** Chapter VII unit for Kurikulum Merdeka Kelas 11 Kimia: Chemical Equilibrium. */
export const merdekaClass11ChemicalEquilibriumUnit = unitNode({
  children: [
    materialNode({
      key: "class-11-chemistry-chemical-equilibrium-material",
      level: "lesson",
      materialKeys: ["lesson.chemistry.chemical-equilibrium"],
      order: 10,
      outcomes: [
        {
          code: "Kimia, Fase F, elemen Pemahaman Kimia",
          ...merdekaLearningOutcomes,
        },
        { code: "Bab VII Kesetimbangan Kimia", ...chemistryBookXI },
      ],
    }),
  ],
  key: "class-11-chemistry-chemical-equilibrium",
  materialCard: {
    de: {
      description: "Nutze Kc, Kp, Reaktionsquotient und Le Chatelier.",
      title: "Chemisches Gleichgewicht",
    },
    en: {
      description: "Use Kc, Kp, the reaction quotient and Le Chatelier.",
      title: "Chemical Equilibrium",
    },
    id: {
      description: "Pakai Kc, Kp, kuosien reaksi, dan asas Le Chatelier.",
      title: "Kesetimbangan Kimia",
    },
    ms: {
      description: "Guna Kc, Kp, hasil bahagi tindak balas dan Le Chatelier.",
      title: "Keseimbangan Kimia",
    },
  },
  order: 70,
  translations: {
    de: {
      routeSlug: "chemisches-gleichgewicht",
      title: "Chemisches Gleichgewicht",
    },
    en: { routeSlug: "chemical-equilibrium", title: "Chemical Equilibrium" },
    id: { routeSlug: "kesetimbangan-kimia", title: "Kesetimbangan Kimia" },
    ms: { routeSlug: "keseimbangan-kimia", title: "Keseimbangan Kimia" },
  },
});
