import type { MaterialLocaleSourceInput } from "#corpus/material/locale";

/** Reviewed German metadata for the stable sequences and series lesson. */
export const sequenceSeriesGermanMaterial = {
  appLocale: "de",
  materialKey: "lesson.mathematics.sequence-series",
  routeSlug: "folgen-und-reihen",
  sections: [
    { routeSlug: "begriff-der-folge", sectionKey: "sequence-concept" },
    { routeSlug: "arithmetische-folge", sectionKey: "arithmetic-sequence" },
    { routeSlug: "geometrische-folge", sectionKey: "geometric-sequence" },
    {
      routeSlug: "arithmetische-und-geometrische-folgen",
      sectionKey: "difference-arithmetic-geometric-sequence",
    },
    {
      routeSlug: "folge-und-reihe-im-vergleich",
      sectionKey: "difference-sequence-series",
    },
    { routeSlug: "begriff-der-reihe", sectionKey: "series-concept" },
    { routeSlug: "arithmetische-reihe", sectionKey: "arithmetic-series" },
    { routeSlug: "geometrische-reihe", sectionKey: "geometric-series" },
    {
      routeSlug: "unendliche-geometrische-reihe",
      sectionKey: "infinite-geometric-series",
    },
    {
      routeSlug: "arithmetische-und-geometrische-reihen",
      sectionKey: "difference-arithmetic-geometric-series",
    },
    {
      routeSlug: "konvergenz-und-divergenz",
      sectionKey: "convergence-divergence",
    },
  ],
  translation: {
    description: "Finde Muster, Folgenglieder und Summen.",
    title: "Folgen und Reihen",
  },
} as const satisfies MaterialLocaleSourceInput;
