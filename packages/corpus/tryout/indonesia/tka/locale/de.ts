/** Reviewed German copy for the stable TKA exam and mathematics track. */
export const tkaGermanExam = {
  description: "Probetest für den indonesischen akademischen Kompetenztest.",
  examRouteSlug: "tka",
  examTitle: "TKA",
  mathematicsRouteSlug: "mathematik",
  mathematicsTitle: "Mathematik",
} as const;

/** Builds reviewed German copy for one stable TKA set number. */
export function tkaGermanSet(setNumber: number) {
  return {
    routeSlug: `aufgabensatz-${setNumber}`,
    title: `Aufgabensatz ${setNumber}`,
  } as const;
}
