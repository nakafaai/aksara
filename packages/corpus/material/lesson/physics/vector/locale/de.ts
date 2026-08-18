import type { MaterialLocaleSourceInput } from "#corpus/material/locale";

/** Reviewed German metadata for the stable physics-vector lesson. */
export const vectorPhysicsGermanMaterial = {
  appLocale: "de",
  materialKey: "lesson.physics.vector",
  routeSlug: "vektoren",
  sections: [
    {
      routeSlug: "analytische-addition-und-subtraktion",
      sectionKey: "analytical-addition-subtraction",
    },
    { routeSlug: "komponenten", sectionKey: "component" },
    { routeSlug: "grundbegriff", sectionKey: "concept" },
    { routeSlug: "kosinussatz", sectionKey: "cosine-rule" },
    {
      routeSlug: "graphische-addition-und-subtraktion",
      sectionKey: "graphical-addition-subtraction",
    },
    { routeSlug: "multiplikation", sectionKey: "multiplication" },
    { routeSlug: "schreibweise", sectionKey: "notation" },
    { routeSlug: "eigenschaften", sectionKey: "property" },
    { routeSlug: "sinussatz", sectionKey: "sine-rule" },
    {
      routeSlug: "trigonometrische-zerlegung",
      sectionKey: "trigonometry-decomposition",
    },
  ],
  translation: {
    description: "Bestimme Resultierende aus Komponenten und Richtung.",
    title: "Vektoren",
  },
} as const satisfies MaterialLocaleSourceInput;
