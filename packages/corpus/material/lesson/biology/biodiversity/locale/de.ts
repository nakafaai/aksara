import type { MaterialLocaleSourceInput } from "#corpus/material/locale";

/** Reviewed German metadata for the stable biodiversity lesson. */
export const biodiversityGermanMaterial = {
  appLocale: "de",
  materialKey: "lesson.biology.biodiversity",
  routeSlug: "vielfalt-der-lebewesen",
  sections: [
    { routeSlug: "bakterien", sectionKey: "bacteria" },
    { routeSlug: "klassifikation", sectionKey: "classification" },
    { routeSlug: "pilze", sectionKey: "fungi" },
    { routeSlug: "ebenen-der-vielfalt", sectionKey: "levels" },
    { routeSlug: "lebewesen", sectionKey: "living-organisms" },
  ],
  translation: {
    description: "Untersuche Vielfalt, Ökosysteme, Bakterien und Pilze.",
    title: "Vielfalt der Lebewesen",
  },
} as const satisfies MaterialLocaleSourceInput;
