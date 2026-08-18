import type { MaterialLocaleSourceInput } from "#corpus/material/locale";

/** Reviewed German metadata for the stable atomic-structure lesson. */
export const atomicStructureGermanMaterial = {
  appLocale: "de",
  materialKey: "lesson.chemistry.structure-matter",
  routeSlug: "atombau",
  sections: [
    { routeSlug: "antike-atomvorstellung", sectionKey: "ancient-atom-concept" },
    { routeSlug: "elektronenhuelle", sectionKey: "atom-shell" },
    { routeSlug: "atomsymbol", sectionKey: "atom-symbol" },
    {
      routeSlug: "elektronenkonfiguration",
      sectionKey: "electron-configuration",
    },
    { routeSlug: "ionen", sectionKey: "ion" },
    { routeSlug: "isotope", sectionKey: "isotope" },
    {
      routeSlug: "modernes-periodensystem",
      sectionKey: "modern-periodic-table",
    },
    {
      routeSlug: "periodische-eigenschaften",
      sectionKey: "periodic-properties",
    },
    {
      routeSlug: "entwicklung-des-atommodells",
      sectionKey: "reconceptualization-atom",
    },
    { routeSlug: "subatomare-teilchen", sectionKey: "subatomic-particles" },
    {
      routeSlug: "eigenschaften-subatomarer-teilchen",
      sectionKey: "subatomic-particles-properties",
    },
    { routeSlug: "valenzelektronen", sectionKey: "valence-electron" },
  ],
  translation: {
    description: "Erkenne, wie Atommodelle unsichtbare Stoffe erklären.",
    title: "Atombau",
  },
} as const satisfies MaterialLocaleSourceInput;
