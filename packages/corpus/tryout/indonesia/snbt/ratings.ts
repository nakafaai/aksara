import type { SetRating } from "#corpus/tryout/level";

/**
 * The level rating of each SNBT set,
 * set 1 to 10 in order.
 * One rater rated four evenly spaced items of each subtest
 * of the set alone on 15 Nov 2026, after the hard-level rewrites that
 * reached every set. A rewritten set replaces its entry with a rating of its
 * new items.
 */
export const snbtRatings: readonly SetRating[] = [
  { items: 28, level: 3.41, raters: 1 },
  { items: 28, level: 3.7, raters: 1 },
  { items: 28, level: 3.75, raters: 1 },
  { items: 28, level: 3.64, raters: 1 },
  { items: 28, level: 3.46, raters: 1 },
  { items: 28, level: 3.38, raters: 1 },
  { items: 28, level: 3.13, raters: 1 },
  { items: 28, level: 3.13, raters: 1 },
  { items: 28, level: 3, raters: 1 },
  { items: 28, level: 3.04, raters: 1 },
];
