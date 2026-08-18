import type { MaterialLocaleSourceInput } from "#corpus/material/locale";

/** Reviewed German metadata for the stable linear systems lesson. */
export const linearEquationInequalityGermanMaterial = {
  appLocale: "de",
  materialKey: "lesson.mathematics.linear-equation-inequality",
  routeSlug: "lineare-gleichungs-und-ungleichungssysteme",
  sections: [
    {
      routeSlug: "lineare-gleichungssysteme",
      sectionKey: "system-linear-equation",
    },
    {
      routeSlug: "lineare-ungleichungssysteme",
      sectionKey: "system-linear-inequality",
    },
  ],
  translation: {
    description: "Löse lineare Systeme durch Einsetzen und Addieren.",
    title: "Lineare Gleichungs- und Ungleichungssysteme",
  },
} as const satisfies MaterialLocaleSourceInput;
