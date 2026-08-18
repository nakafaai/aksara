import type { MaterialLocaleSourceInput } from "#corpus/material/locale";

/** Reviewed German metadata for the stable green-chemistry lesson. */
export const greenChemistryGermanMaterial = {
  appLocale: "de",
  materialKey: "lesson.chemistry.green-chemistry",
  routeSlug: "gruene-chemie",
  sections: [
    {
      routeSlug: "chemische-prozesse-im-alltag",
      sectionKey: "chemical-processes-daily-life",
    },
    { routeSlug: "definition", sectionKey: "definition" },
    {
      routeSlug: "massnahmen-der-gruenen-chemie",
      sectionKey: "green-chemistry-activities",
    },
    { routeSlug: "prinzipien", sectionKey: "principles" },
  ],
  translation: {
    description: "Bewerte Alltagsreaktionen mit grüner Chemie.",
    title: "Grüne Chemie",
  },
} as const satisfies MaterialLocaleSourceInput;
