import type { MaterialLocaleSourceInput } from "#corpus/material/locale";

/** Reviewed German metadata for the stable virus-role lesson. */
export const virusRoleGermanMaterial = {
  appLocale: "de",
  materialKey: "lesson.biology.virus-role",
  routeSlug: "viren-und-ihre-rolle",
  sections: [
    {
      routeSlug: "wie-viren-sich-vermehren",
      sectionKey: "how-virus-reproduce",
    },
    {
      routeSlug: "ausbreitung-von-viren-verhindern",
      sectionKey: "prevent-virus-spread",
    },
    { routeSlug: "rolle", sectionKey: "role" },
    { routeSlug: "was-ist-ein-virus", sectionKey: "what-is-virus" },
  ],
  translation: {
    description: "Verfolge, wie Viren sich in Wirtszellen vermehren.",
    title: "Viren und ihre Rolle",
  },
} as const satisfies MaterialLocaleSourceInput;
