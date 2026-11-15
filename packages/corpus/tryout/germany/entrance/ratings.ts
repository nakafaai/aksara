import type { SetRating } from "#corpus/tryout/level";

/**
 * The level rating of each TU Darmstadt Aufnahmeprüfung set,
 * set 1 to 10 in order.
 * A set rated on 15 Nov 2026 carries the mean of an eight-rater pool that saw
 * every item of the set with its key; the other sets carry one rater's rating
 * of 13 Nov 2026. A rewritten set replaces its entry with a rating of its new
 * items.
 */
export const darmstadtRatings: readonly SetRating[] = [
  { items: 8, level: 4.83, raters: 8 },
  { items: 8, level: 4.75, raters: 8 },
  { items: 8, level: 4.45, raters: 8 },
  { items: 8, level: 1.88, raters: 1 },
  { items: 8, level: 2, raters: 1 },
  { items: 8, level: 2, raters: 1 },
  { items: 8, level: 4.47, raters: 8 },
  { items: 8, level: 4.39, raters: 8 },
  { items: 8, level: 4.17, raters: 8 },
  { items: 8, level: 3.98, raters: 8 },
];
