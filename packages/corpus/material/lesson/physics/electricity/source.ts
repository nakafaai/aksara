import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonPhysicsElectricityMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/physics/electricity",
  domain: "physics",
  key: "lesson.physics.electricity",
  kind: "lesson",
  routeSlugs: {
    de: "elektrizitaet",
    en: "electricity",
    id: "listrik",
    ms: "elektrik",
  },
  sections: [
    {
      evidenceUrls: [
        "https://openstax.org/books/college-physics-2e/pages/20-1-current",
        "https://openstax.org/books/college-physics-2e/pages/20-2-ohms-law-resistance-and-simple-circuits",
        "https://openstax.org/books/college-physics-2e/pages/20-3-resistance-and-resistivity",
        "https://openstax.org/books/college-physics-2e/pages/20-4-electric-power-and-energy",
        "https://openstax.org/books/college-physics-2e/pages/21-1-resistors-in-series-and-parallel",
        "https://openstax.org/books/college-physics-2e/pages/21-2-electromotive-force-terminal-voltage",
      ],
      routeSlugs: {
        de: "stromstaerke-widerstand-und-leistung",
        en: "current-resistance-and-power",
        id: "arus-hambatan-dan-daya",
        ms: "arus-rintangan-dan-kuasa",
      },
      slug: "current-resistance",
    },
  ],
  slug: "electricity",
  translations: {
    de: {
      description: "Berechne Widerstände, Quellenspannung und Leistung.",
      title: "Elektrizität",
    },
    en: {
      description: "Work out resistance, e.m.f. and electrical power.",
      title: "Electricity",
    },
    id: {
      description: "Hitung hambatan, GGL, dan daya listrik.",
      title: "Listrik",
    },
    ms: {
      description: "Kira rintangan, d.g.e. dan kuasa elektrik.",
      title: "Elektrik",
    },
  },
});
