import type { SetRating } from "#corpus/tryout/level";

/**
 * The level rating of each TU Darmstadt Aufnahmeprüfung set,
 * set 1 to 10 in order.
 * One rater rated all eight items
 * of the set alone on 13 Nov 2026. A rewritten set replaces its entry with
 * a rating of its new items.
 */
export const darmstadtRatings: readonly SetRating[] = [
  { items: 8, level: 3.12, raters: 1 },
  { items: 8, level: 2.88, raters: 1 },
  { items: 8, level: 1.88, raters: 1 },
  { items: 8, level: 1.88, raters: 1 },
  { items: 8, level: 2, raters: 1 },
  { items: 8, level: 2, raters: 1 },
  { items: 8, level: 2, raters: 1 },
  { items: 8, level: 1.75, raters: 1 },
  { items: 8, level: 2.25, raters: 1 },
  { items: 8, level: 1.62, raters: 1 },
];
