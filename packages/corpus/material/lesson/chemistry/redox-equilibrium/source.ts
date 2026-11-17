import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonChemistryRedoxEquilibriumMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/chemistry/redox-equilibrium",
  domain: "chemistry",
  key: "lesson.chemistry.redox-equilibrium",
  kind: "lesson",
  routeSlugs: {
    de: "redoxgleichgewicht",
    en: "redox-equilibrium",
    id: "kesetimbangan-redoks",
    ms: "keseimbangan-redoks",
  },
  sections: [
    {
      evidenceUrls: [
        "https://openstax.org/books/chemistry-2e/pages/17-1-review-of-redox-chemistry",
        "https://openstax.org/books/chemistry-2e/pages/17-2-galvanic-cells",
        "https://openstax.org/books/chemistry-2e/pages/17-3-electrode-and-cell-potentials",
        "https://openstax.org/books/chemistry-2e/pages/17-6-corrosion",
        "https://openstax.org/books/chemistry-2e/pages/17-7-electrolysis",
      ],
      routeSlugs: {
        de: "redoxreaktionen-und-zellen",
        en: "redox-reactions-and-cells",
        id: "reaksi-redoks-dan-sel",
        ms: "tindak-balas-redoks-dan-sel",
      },
      slug: "redox-cell",
    },
  ],
  slug: "redox-equilibrium",
  translations: {
    de: {
      description: "Bestimme Oxidationszahlen, baue Zellen, elektrolysiere.",
      title: "Redoxgleichgewicht",
    },
    en: {
      description: "Find oxidation numbers, build cells and electrolyse.",
      title: "Redox Equilibrium",
    },
    id: {
      description: "Hitung bilangan oksidasi dan rakit sel elektrokimia.",
      title: "Kesetimbangan Redoks",
    },
    ms: {
      description: "Kira nombor pengoksidaan dan bina sel elektrokimia.",
      title: "Keseimbangan Redoks",
    },
  },
});
