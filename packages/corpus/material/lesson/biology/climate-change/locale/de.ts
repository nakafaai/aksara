import type { MaterialLocaleSourceInput } from "#corpus/material/locale";

/** Reviewed German metadata for the stable climate-change lesson. */
export const climateChangeGermanMaterial = {
  appLocale: "de",
  materialKey: "lesson.biology.climate-change",
  routeSlug: "klimawandel",
  sections: [
    { routeSlug: "ursachen", sectionKey: "causes" },
    {
      routeSlug: "internationale-zusammenarbeit",
      sectionKey: "global-cooperation",
    },
    { routeSlug: "folgen", sectionKey: "impact" },
    {
      routeSlug: "klimaschutz-und-anpassung",
      sectionKey: "mitigation-adaptation",
    },
    { routeSlug: "anzeichen", sectionKey: "symptoms" },
  ],
  translation: {
    description: "Untersuche Ursachen, Anzeichen, Folgen und Antworten.",
    title: "Klimawandel",
  },
} as const satisfies MaterialLocaleSourceInput;
