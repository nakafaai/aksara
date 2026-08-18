/** Reviewed German copy for every stable SNBT section identity. */
export const snbtGermanSections = {
  "english-language": {
    routeSlug: "englische-sprache",
    title: "Englische Sprache",
  },
  "general-knowledge": {
    routeSlug: "allgemeinwissen",
    title: "Allgemeinwissen",
  },
  "general-reasoning": {
    routeSlug: "allgemeines-logisches-denken",
    title: "Allgemeines logisches Denken",
  },
  "indonesian-language": {
    routeSlug: "indonesische-sprache",
    title: "Indonesische Sprache",
  },
  "mathematical-reasoning": {
    routeSlug: "mathematisches-schlussfolgern",
    title: "Mathematisches Schlussfolgern",
  },
  "quantitative-knowledge": {
    routeSlug: "quantitatives-wissen",
    title: "Quantitatives Wissen",
  },
  "reading-and-writing-skills": {
    routeSlug: "lese-und-schreibkompetenz",
    title: "Lese- und Schreibkompetenz",
  },
} as const;

/** Reviewed German copy for the stable SNBT exam and track nodes. */
export const snbtGermanExam = {
  description:
    "Probetest für das indonesische Auswahlverfahren zur Hochschulzulassung.",
  routeSlug: "snbt",
  title: "SNBT",
  trackRouteSlug: "2027",
  trackTitle: "Jahr 2027",
} as const;

/** Builds reviewed German copy for one stable SNBT set number. */
export function snbtGermanSet(setNumber: number) {
  return {
    routeSlug: `aufgabensatz-${setNumber}`,
    title: `Aufgabensatz ${setNumber}`,
  } as const;
}
