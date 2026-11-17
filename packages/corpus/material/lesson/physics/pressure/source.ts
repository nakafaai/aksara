import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonPhysicsPressureMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/physics/pressure",
  domain: "physics",
  key: "lesson.physics.pressure",
  kind: "lesson",
  routeSlugs: {
    de: "druck",
    en: "pressure",
    id: "tekanan",
    ms: "tekanan",
  },
  sections: [
    {
      evidenceUrls: [
        "https://openstax.org/books/college-physics-2e/pages/11-3-pressure",
        "https://openstax.org/books/college-physics-2e/pages/11-4-variation-of-pressure-with-depth-in-a-fluid",
        "https://openstax.org/books/college-physics-2e/pages/11-5-pascals-principle",
        "https://openstax.org/books/college-physics-2e/pages/11-6-gauge-pressure-absolute-pressure-and-pressure-measurement",
        "https://openstax.org/books/college-physics-2e/pages/11-7-archimedes-principle",
        "https://openstax.org/books/college-physics-2e/pages/12-2-bernoullis-equation",
      ],
      routeSlugs: {
        de: "druck-in-fluessigkeiten-und-gasen",
        en: "pressure-in-liquids-and-gases",
        id: "tekanan-zat-cair-dan-gas",
        ms: "tekanan-cecair-dan-gas",
      },
      slug: "fluid-pressure",
    },
  ],
  slug: "pressure",
  translations: {
    de: {
      description: "Berechne Schweredruck, Hydraulik und Auftrieb.",
      title: "Druck",
    },
    en: {
      description: "Work out liquid pressure, hydraulics and buoyancy.",
      title: "Pressure",
    },
    id: {
      description: "Hitung tekanan hidrostatis, hidrolik, dan gaya apung.",
      title: "Tekanan",
    },
    ms: {
      description: "Kira tekanan cecair, hidraulik dan keapungan.",
      title: "Tekanan",
    },
  },
});
