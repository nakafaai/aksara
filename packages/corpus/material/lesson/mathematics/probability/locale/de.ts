import type { MaterialLocaleSourceInput } from "#corpus/material/locale";

/** Reviewed German metadata for the stable probability lesson. */
export const probabilityGermanMaterial = {
  appLocale: "de",
  materialKey: "lesson.mathematics.probability",
  routeSlug: "wahrscheinlichkeit",
  sections: [
    { routeSlug: "additionssatz", sectionKey: "addition-rule" },
    {
      routeSlug: "wahrscheinlichkeitsverteilung",
      sectionKey: "probability-distribution",
    },
    {
      routeSlug: "zwei-unvereinbare-ereignisse",
      sectionKey: "two-events-mutually-exclusive",
    },
    {
      routeSlug: "zwei-vereinbare-ereignisse",
      sectionKey: "two-events-not-mutually-exclusive",
    },
  ],
  translation: {
    description: "Nutze Additionsregeln für überlappende Ereignisse.",
    title: "Wahrscheinlichkeit",
  },
} as const satisfies MaterialLocaleSourceInput;
