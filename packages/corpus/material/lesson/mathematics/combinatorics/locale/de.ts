import type { MaterialLocaleSourceInput } from "#corpus/material/locale";

/** Reviewed German metadata for the stable combinatorics lesson. */
export const combinatoricsGermanMaterial = {
  appLocale: "de",
  materialKey: "lesson.mathematics.combinatorics",
  routeSlug: "kombinatorik",
  sections: [
    { routeSlug: "newtonscher-binomialsatz", sectionKey: "binomial-newton" },
    { routeSlug: "kreispermutation", sectionKey: "circular-permutation" },
    { routeSlug: "kombination", sectionKey: "combination" },
    { routeSlug: "zaehlprinzipien", sectionKey: "filling-place-rule" },
    {
      routeSlug: "permutation-aller-objekte",
      sectionKey: "permutation-of-n-items-from-n-objects",
    },
    {
      routeSlug: "permutation-mit-wiederholungen",
      sectionKey: "permutation-with-identical-objects",
    },
    {
      routeSlug: "wahrscheinlichkeit-eines-ereignisses",
      sectionKey: "probability-of-an-event",
    },
    {
      routeSlug: "wahrscheinlichkeit-zusammengesetzter-ereignisse",
      sectionKey: "probability-of-compound-events",
    },
    {
      routeSlug: "bedingte-wahrscheinlichkeit",
      sectionKey: "probability-of-independent-conditional-events",
    },
    {
      routeSlug: "unabhaengige-ereignisse",
      sectionKey: "probability-of-independent-events",
    },
    {
      routeSlug: "unvereinbare-ereignisse",
      sectionKey: "probability-of-mutually-exclusive-events",
    },
  ],
  translation: {
    description: "Zähle Anordnungen und berechne Wahrscheinlichkeiten.",
    title: "Kombinatorik",
  },
} as const satisfies MaterialLocaleSourceInput;
