import type { MaterialLocaleSourceInput } from "#corpus/material/locale";

/** Reviewed German metadata for the stable exponent and logarithm lesson. */
export const exponentialLogarithmGermanMaterial = {
  appLocale: "de",
  materialKey: "lesson.mathematics.exponential-logarithm",
  routeSlug: "potenzen-und-logarithmen",
  sections: [
    { routeSlug: "grundlagen", sectionKey: "basic-concept" },
    { routeSlug: "exponentieller-zerfall", sectionKey: "exponential-decay" },
    { routeSlug: "exponentielles-wachstum", sectionKey: "exponential-growth" },
    { routeSlug: "exponentialfunktionen", sectionKey: "function-definition" },
    {
      routeSlug: "exponentialfunktionen-untersuchen",
      sectionKey: "function-exploration",
    },
    {
      routeSlug: "definition-des-logarithmus",
      sectionKey: "logarithm-definition",
    },
    { routeSlug: "logarithmengesetze", sectionKey: "logarithm-properties" },
    { routeSlug: "potenzgesetze-begruenden", sectionKey: "proof-properties" },
    { routeSlug: "potenzgesetze", sectionKey: "properties" },
    {
      routeSlug: "wurzel-und-potenzschreibweise",
      sectionKey: "radical-form",
    },
    {
      routeSlug: "nenner-rationalisieren",
      sectionKey: "rationalizing-radicals",
    },
  ],
  translation: {
    description: "Von Potenzen und Wurzeln zu Funktionen und Logarithmen.",
    title: "Potenzen und Logarithmen",
  },
} as const satisfies MaterialLocaleSourceInput;
