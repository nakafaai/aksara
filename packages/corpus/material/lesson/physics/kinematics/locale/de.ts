import type { MaterialLocaleSourceInput } from "#corpus/material/locale";

/** Reviewed German metadata for the stable kinematics lesson. */
export const kinematicsGermanMaterial = {
  appLocale: "de",
  materialKey: "lesson.physics.kinematics",
  routeSlug: "kinematik",
  sections: [
    { routeSlug: "beschleunigung", sectionKey: "acceleration" },
    {
      routeSlug: "mittlere-geschwindigkeit-und-schnelligkeit",
      sectionKey: "average-velocity-speed",
    },
    {
      routeSlug: "verschiebung-und-strecke",
      sectionKey: "displacement-distance",
    },
    {
      routeSlug: "momentangeschwindigkeit-und-momentschnelligkeit",
      sectionKey: "instantaneous-velocity-speed",
    },
    {
      routeSlug: "bewegung-und-ortsaenderung",
      sectionKey: "movement-position-change",
    },
    {
      routeSlug: "ungleichfoermige-geradlinige-bewegung",
      sectionKey: "non-uniform-linear-motion",
    },
    {
      routeSlug: "parabelfoermige-bewegung",
      sectionKey: "parabolic-movement",
    },
    {
      routeSlug: "analyse-der-parabelfoermigen-bewegung",
      sectionKey: "parabolic-movement-analysis",
    },
    {
      routeSlug: "bezugssystem-und-position",
      sectionKey: "reference-frame-position",
    },
    { routeSlug: "relativbewegung", sectionKey: "relative-movement" },
    { routeSlug: "anhalteweg", sectionKey: "stopping-distance" },
    {
      routeSlug: "gleichfoermige-kreisbewegung",
      sectionKey: "uniform-circular-motion",
    },
    {
      routeSlug: "gleichfoermige-geradlinige-bewegung",
      sectionKey: "uniform-linear-motion",
    },
    {
      routeSlug: "geschwindigkeit-und-schnelligkeit",
      sectionKey: "velocity-speed",
    },
    { routeSlug: "vertikale-bewegung", sectionKey: "vertical-movement" },
  ],
  translation: {
    description: "Bewegung mit Ort, Geschwindigkeit und Beschleunigung.",
    title: "Kinematik",
  },
} as const satisfies MaterialLocaleSourceInput;
