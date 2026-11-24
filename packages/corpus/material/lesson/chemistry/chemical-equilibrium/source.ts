import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/chemistry/chemical-equilibrium",
  domain: "chemistry",
  key: "lesson.chemistry.chemical-equilibrium",
  kind: "lesson",
  routeSlugs: {
    en: "chemical-equilibrium",
    id: "kesetimbangan-kimia",
    de: "chemisches-gleichgewicht",
    ms: "keseimbangan-kimia",
  },
  sections: ["constant-shift"],
  slug: "chemical-equilibrium",
  translations: {
    en: {
      description: "Use Kc, Kp, the reaction quotient and Le Chatelier.",
      title: "Chemical Equilibrium",
    },
    id: {
      description: "Pakai Kc, Kp, kuosien reaksi, dan asas Le Chatelier.",
      title: "Kesetimbangan Kimia",
    },
    de: {
      description: "Nutze Kc, Kp, Reaktionsquotient und Le Chatelier.",
      title: "Chemisches Gleichgewicht",
    },
    ms: {
      description: "Guna Kc, Kp, hasil bahagi tindak balas dan Le Chatelier.",
      title: "Keseimbangan Kimia",
    },
  },
};

export default lesson;
