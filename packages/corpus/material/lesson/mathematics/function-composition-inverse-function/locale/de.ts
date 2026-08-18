import { MaterialKeySchema } from "@nakafa/aksara-contracts/projection/material";

import { PublicRouteSegmentSchema } from "#corpus/route/schema";

/** Reviewed German metadata for the stable function-composition lesson. */
export const functionCompositionInverseFunctionGermanMaterial = {
  appLocale: "de",
  materialKey: MaterialKeySchema.make(
    "lesson.mathematics.function-composition-inverse-function"
  ),
  routeSlug: PublicRouteSegmentSchema.make(
    "funktionskomposition-und-umkehrfunktion"
  ),
  sections: [
    {
      routeSlug: PublicRouteSegmentSchema.make(
        "addition-und-subtraktion-von-funktionen"
      ),
      sectionKey: PublicRouteSegmentSchema.make(
        "addition-subtraction-function"
      ),
    },
    {
      routeSlug: PublicRouteSegmentSchema.make(
        "definitionsmenge-zielmenge-und-wertebereich"
      ),
      sectionKey: PublicRouteSegmentSchema.make("domain-codomain-range"),
    },
    {
      routeSlug: PublicRouteSegmentSchema.make("funktion-und-nichtfunktion"),
      sectionKey: PublicRouteSegmentSchema.make("function-and-non-function"),
    },
    {
      routeSlug: PublicRouteSegmentSchema.make("funktionskomposition"),
      sectionKey: PublicRouteSegmentSchema.make("function-composition"),
    },
    {
      routeSlug: PublicRouteSegmentSchema.make("funktionsbegriff"),
      sectionKey: PublicRouteSegmentSchema.make("function-concept"),
    },
    {
      routeSlug: PublicRouteSegmentSchema.make(
        "injektive-surjektive-und-bijektive-funktionen"
      ),
      sectionKey: PublicRouteSegmentSchema.make(
        "injective-surjective-bijective-function"
      ),
    },
    {
      routeSlug: PublicRouteSegmentSchema.make("umkehrfunktion"),
      sectionKey: PublicRouteSegmentSchema.make("inverse-function"),
    },
    {
      routeSlug: PublicRouteSegmentSchema.make(
        "multiplikation-und-division-von-funktionen"
      ),
      sectionKey: PublicRouteSegmentSchema.make(
        "multiplication-division-function"
      ),
    },
    {
      routeSlug: PublicRouteSegmentSchema.make(
        "eigenschaften-der-funktionskomposition"
      ),
      sectionKey: PublicRouteSegmentSchema.make(
        "properties-of-function-composition"
      ),
    },
    {
      routeSlug: PublicRouteSegmentSchema.make(
        "eigenschaften-der-umkehrfunktion"
      ),
      sectionKey: PublicRouteSegmentSchema.make(
        "properties-of-inverse-function"
      ),
    },
  ],
  translation: {
    description: "Verknüpfe Funktionen mit passenden Definitionsbereichen.",
    title: "Funktionskomposition und Umkehrfunktion",
  },
} as const;
