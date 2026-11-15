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
  { items: 28, level: 3.2, raters: 1 },
  { items: 28, level: 3.23, raters: 1 },
  { items: 28, level: 3.34, raters: 1 },
  { items: 28, level: 3.2, raters: 1 },
  { items: 28, level: 3.39, raters: 1 },
  { items: 28, level: 3.05, raters: 1 },
  { items: 28, level: 2.8, raters: 1 },
  { items: 28, level: 2.86, raters: 1 },
  { items: 28, level: 2.82, raters: 1 },
  { items: 28, level: 2.93, raters: 1 },
];
