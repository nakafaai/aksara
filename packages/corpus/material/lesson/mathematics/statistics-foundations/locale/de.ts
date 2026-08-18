import type { MaterialLocaleSourceInput } from "#corpus/material/locale";

/** Reviewed German metadata for the stable statistics foundations lesson. */
export const statisticsFoundationsGermanMaterial = {
  appLocale: "de",
  materialKey: "lesson.mathematics.statistics-foundations",
  routeSlug: "grundlagen-der-statistik",
  sections: [
    {
      routeSlug: "lageparameter-richtig-waehlen",
      sectionKey: "central-tendency-usage",
    },
    { routeSlug: "histogramme", sectionKey: "histogram" },
    { routeSlug: "interquartilsabstand", sectionKey: "interquartile-range" },
    { routeSlug: "arithmetisches-mittel", sectionKey: "mean" },
    {
      routeSlug: "mittelwert-gruppierter-daten",
      sectionKey: "mean-group-data",
    },
    {
      routeSlug: "median-und-modalwert-gruppierter-daten",
      sectionKey: "median-mode-group-data",
    },
    { routeSlug: "modalwert-und-median", sectionKey: "mode-median" },
    {
      routeSlug: "perzentile-gruppierter-daten",
      sectionKey: "percentile-data-group",
    },
    {
      routeSlug: "quartile-gruppierter-daten",
      sectionKey: "quartile-data-group",
    },
    {
      routeSlug: "quartile-einzelner-daten",
      sectionKey: "quartile-data-single",
    },
    { routeSlug: "relative-haeufigkeit", sectionKey: "relative-frequency" },
    {
      routeSlug: "varianz-und-standardabweichung-gruppierter-daten",
      sectionKey: "variance-standard-deviation-data-group",
    },
    {
      routeSlug: "varianz-und-standardabweichung-einzelner-daten",
      sectionKey: "variance-standard-deviation-data-single",
    },
  ],
  translation: {
    description: "Beschreibe Daten mit Kennwerten und Histogrammen.",
    title: "Grundlagen der Statistik",
  },
} as const satisfies MaterialLocaleSourceInput;
