import type { MaterialLocaleSourceInput } from "#corpus/material/locale";

/** Reviewed German metadata for the stable basic-chemistry-laws lesson. */
export const basicChemistryLawsGermanMaterial = {
  appLocale: "de",
  materialKey: "lesson.chemistry.basic-chemistry-laws",
  routeSlug: "grundgesetze-der-chemie",
  sections: [
    {
      routeSlug: "merkmale-chemischer-reaktionen",
      sectionKey: "chemical-reaction-characteristics",
    },
    {
      routeSlug: "anwendungen-chemischer-gesetze",
      sectionKey: "chemistry-law-applications",
    },
    {
      routeSlug: "gesetz-der-gasvolumina",
      sectionKey: "combining-volumes-law",
    },
    {
      routeSlug: "gesetz-der-konstanten-proportionen",
      sectionKey: "constant-composition-law",
    },
    {
      routeSlug: "gesetz-der-massenerhaltung",
      sectionKey: "mass-conservation-law",
    },
    {
      routeSlug: "gesetz-der-multiplen-proportionen",
      sectionKey: "multiple-proportions-law",
    },
    {
      routeSlug: "arten-chemischer-reaktionen",
      sectionKey: "types-chemical-reaction",
    },
    {
      routeSlug: "chemische-reaktionen-formulieren",
      sectionKey: "writing-chemical-reactions",
    },
  ],
  translation: {
    description: "Erkenne chemische Veränderungen an Beobachtungen.",
    title: "Grundgesetze der Chemie",
  },
} as const satisfies MaterialLocaleSourceInput;
