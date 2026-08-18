import type { MaterialLocaleSourceInput } from "#corpus/material/locale";

/** Reviewed German metadata for the stable complex numbers lesson. */
export const complexNumberGermanMaterial = {
  appLocale: "de",
  materialKey: "lesson.mathematics.complex-number",
  routeSlug: "komplexe-zahlen",
  sections: [
    {
      routeSlug: "addition-komplexer-zahlen",
      sectionKey: "addition-complex-numbers",
    },
    {
      routeSlug: "grundidee-komplexer-zahlen",
      sectionKey: "complex-number-concept",
    },
    {
      routeSlug: "darstellungsformen-komplexer-zahlen",
      sectionKey: "complex-number-form",
    },
    {
      routeSlug: "konjugiert-komplexe-zahlen",
      sectionKey: "conjugate-complex-numbers",
    },
    {
      routeSlug: "kehrwerte-komplexer-zahlen",
      sectionKey: "inverse-complex-numbers",
    },
    {
      routeSlug: "betrag-und-argument-komplexer-zahlen",
      sectionKey: "modulus-argument-complex-numbers",
    },
    {
      routeSlug: "multiplikation-komplexer-zahlen",
      sectionKey: "multiplication-complex-numbers",
    },
    {
      routeSlug: "hauptwert-des-arguments",
      sectionKey: "principal-argument-complex-numbers",
    },
    {
      routeSlug: "eigenschaften-der-addition",
      sectionKey: "properties-addition-complex-numbers",
    },
    {
      routeSlug: "eigenschaften-des-betrags",
      sectionKey: "properties-modulus-complex-numbers",
    },
    {
      routeSlug: "eigenschaften-der-multiplikation",
      sectionKey: "properties-multiplication-complex-numbers",
    },
    {
      routeSlug: "eigenschaften-des-hauptarguments",
      sectionKey: "properties-principal-argument-complex-numbers",
    },
    {
      routeSlug: "skalare-multiplikation",
      sectionKey: "scalar-multiplication-complex-numbers",
    },
  ],
  translation: {
    description: "Komplexe Zahlen algebraisch und polar darstellen.",
    title: "Komplexe Zahlen",
  },
} as const satisfies MaterialLocaleSourceInput;
