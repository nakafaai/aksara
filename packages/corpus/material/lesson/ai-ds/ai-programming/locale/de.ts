import type { MaterialLocaleSourceInput } from "#corpus/material/locale";

/** Reviewed German metadata for the stable AI programming lesson. */
export const aiProgrammingGermanMaterial = {
  appLocale: "de",
  materialKey: "lesson.ai-ds.ai-programming",
  routeSlug: "ki-programmierung",
  sections: [
    { routeSlug: "rechenoperatoren", sectionKey: "arithmetic-operator" },
    { routeSlug: "numpy-arrays", sectionKey: "array-numpy" },
    {
      routeSlug: "array-operationen-mit-numpy",
      sectionKey: "array-operation-numpy",
    },
    {
      routeSlug: "attribute-und-datentypen-in-numpy",
      sectionKey: "attribute-data-type-numpy",
    },
    { routeSlug: "vergleiche-und-logik", sectionKey: "comparison-logic" },
    { routeSlug: "container", sectionKey: "container" },
    { routeSlug: "kontrollfluss", sectionKey: "control-flow" },
    { routeSlug: "dictionaries", sectionKey: "dictionary" },
    { routeSlug: "escape-sequenzen", sectionKey: "escape-sequence" },
    {
      routeSlug: "alles-ist-ein-objekt-in-python",
      sectionKey: "everything-object-python",
    },
    { routeSlug: "datei-ein-und-ausgabe", sectionKey: "file-input-output" },
    { routeSlug: "funktionen", sectionKey: "function" },
    {
      routeSlug: "unveraenderlich-veraenderlich-identitaet",
      sectionKey: "immutable-mutable-identity",
    },
    { routeSlug: "indizierung-und-slicing", sectionKey: "indexing-slicing" },
    {
      routeSlug: "indizierung-und-slicing-in-numpy",
      sectionKey: "indexing-slicing-numpy",
    },
    { routeSlug: "iterierbare-objekte", sectionKey: "iterable" },
    { routeSlug: "markdown-und-kommandozeile", sectionKey: "markdown-cli" },
    { routeSlug: "mathematische-funktionen", sectionKey: "math-function" },
    {
      routeSlug: "zahlen-attribute-und-methoden",
      sectionKey: "number-attribute-method",
    },
    { routeSlug: "zahlen", sectionKey: "numbers" },
    { routeSlug: "print-funktion", sectionKey: "print-function" },
    { routeSlug: "erster-schritt-mit-python", sectionKey: "python-step-1" },
    { routeSlug: "string-formatierung", sectionKey: "string-formatting" },
    { routeSlug: "string-methoden", sectionKey: "string-method" },
    { routeSlug: "strings-als-objekte", sectionKey: "string-object" },
    { routeSlug: "syntaktischer-zucker", sectionKey: "syntactic-sugar" },
    { routeSlug: "variablen", sectionKey: "variable" },
  ],
  translation: {
    description: "Schreibe Python-Code mit sicheren Rechenregeln.",
    title: "KI-Programmierung",
  },
} as const satisfies MaterialLocaleSourceInput;
