import type { MaterialLocaleSourceInput } from "#corpus/material/locale";

/** Reviewed German metadata for the stable renewable-energy lesson. */
export const renewableEnergyGermanMaterial = {
  appLocale: "de",
  materialKey: "lesson.physics.renewable-energy",
  routeSlug: "erneuerbare-energien",
  sections: [
    { routeSlug: "energie", sectionKey: "energy" },
    { routeSlug: "energieerhaltung", sectionKey: "energy-conservation" },
    { routeSlug: "energieformen", sectionKey: "energy-forms" },
    {
      routeSlug: "auswirkungen-der-energienutzung",
      sectionKey: "energy-impact",
    },
    {
      routeSlug: "loesungen-fuer-die-energieversorgung",
      sectionKey: "energy-solutions",
    },
    { routeSlug: "energiequellen", sectionKey: "energy-sources" },
    { routeSlug: "energieumwandlung", sectionKey: "energy-transformation" },
    {
      routeSlug: "dringlichkeit-der-energiewende",
      sectionKey: "energy-urgency",
    },
    {
      routeSlug: "nichterneuerbare-energiequellen",
      sectionKey: "non-renewable-sources",
    },
    {
      routeSlug: "erneuerbare-energiequellen",
      sectionKey: "renewable-sources",
    },
  ],
  translation: {
    description: "Verbinde Energie, Arbeit, Leistung und Stromverbrauch.",
    title: "Erneuerbare Energien",
  },
} as const satisfies MaterialLocaleSourceInput;
