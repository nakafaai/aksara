import type { SetRating } from "#corpus/tryout/level";

/**
 * The level rating of each SNBT set,
 * set 1 to 10 in order.
 * One rater rated four evenly spaced items of each subtest
 * of the set alone on 13 Nov 2026. A rewritten set replaces its entry with
 * a rating of its new items.
 */
export const snbtRatings: readonly SetRating[] = [
  { items: 28, level: 2.5, raters: 1 },
  { items: 28, level: 2.43, raters: 1 },
  { items: 28, level: 2.64, raters: 1 },
  { items: 28, level: 2.25, raters: 1 },
  { items: 28, level: 2.29, raters: 1 },
  { items: 28, level: 2.57, raters: 1 },
  { items: 28, level: 2.43, raters: 1 },
  { items: 28, level: 2.32, raters: 1 },
  { items: 28, level: 2.54, raters: 1 },
  { items: 28, level: 2.18, raters: 1 },
];
