import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonChemistryThermochemistryMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/chemistry/thermochemistry",
  domain: "chemistry",
  key: "lesson.chemistry.thermochemistry",
  kind: "lesson",
  routeSlugs: {
    de: "thermochemie",
    en: "thermochemistry",
    id: "termokimia",
    ms: "termokimia",
  },
  sections: [
    {
      evidenceUrls: [
        "https://openstax.org/books/chemistry-2e/pages/5-1-energy-basics",
        "https://openstax.org/books/chemistry-2e/pages/5-2-calorimetry",
        "https://openstax.org/books/chemistry-2e/pages/5-3-enthalpy",
      ],
      routeSlugs: {
        de: "reaktionswaerme",
        en: "heat-of-reaction",
        id: "kalor-reaksi",
        ms: "haba-tindak-balas",
      },
      slug: "heat-of-reaction",
    },
  ],
  slug: "thermochemistry",
  translations: {
    de: {
      description: "Berechne Reaktionswärmen und vergleiche Brennstoffe.",
      title: "Thermochemie",
    },
    en: {
      description: "Calculate heats of reaction and compare fuels.",
      title: "Thermochemistry",
    },
    id: {
      description: "Hitung kalor reaksi dan bandingkan bahan bakar.",
      title: "Termokimia",
    },
    ms: {
      description: "Kira haba tindak balas dan bandingkan bahan api.",
      title: "Termokimia",
    },
  },
});
