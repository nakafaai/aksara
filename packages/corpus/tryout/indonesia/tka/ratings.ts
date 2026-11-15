import type { SetRating } from "#corpus/tryout/level";

/**
 * The level rating of each TKA Compulsory Mathematics set,
 * set 1 to 10 in order.
 * One rater rated ten evenly spaced items
 * of the set alone on 15 Nov 2026, after the rewrites that reached every set.
 * A rewritten set replaces its entry with a rating of its new items.
 */
export const compulsoryRatings: readonly SetRating[] = [
  { items: 10, level: 3.7, raters: 1 },
  { items: 10, level: 3.7, raters: 1 },
  { items: 10, level: 3.7, raters: 1 },
  { items: 10, level: 3.8, raters: 1 },
  { items: 10, level: 3.7, raters: 1 },
  { items: 10, level: 3.85, raters: 1 },
  { items: 10, level: 3.6, raters: 1 },
  { items: 10, level: 4.05, raters: 1 },
  { items: 10, level: 3.8, raters: 1 },
  { items: 10, level: 3.85, raters: 1 },
];

/**
 * The level rating of each TKA Advanced Mathematics set,
 * set 1 to 10 in order.
 * One rater rated ten evenly spaced items
 * of the set alone on 13 Nov 2026. A rewritten set replaces its entry with
 * a rating of its new items.
 */
export const advancedRatings: readonly SetRating[] = [
  { items: 10, level: 2.8, raters: 1 },
  { items: 10, level: 2.6, raters: 1 },
  { items: 10, level: 3.2, raters: 1 },
  { items: 10, level: 3.2, raters: 1 },
  { items: 10, level: 3.1, raters: 1 },
  { items: 10, level: 2.7, raters: 1 },
  { items: 10, level: 2.8, raters: 1 },
  { items: 10, level: 2.9, raters: 1 },
  { items: 10, level: 2.8, raters: 1 },
  { items: 10, level: 2.7, raters: 1 },
];

/**
 * The level rating of each TKA English set,
 * set 1 to 10 in order.
 * One rater rated ten evenly spaced items
 * of the set alone on 13 Nov 2026, and set 2 again on 15 Nov 2026 after its
 * rewrite. Sets 3 and 4 were rated on 15 Nov 2026 after their rewrites by two
 * raters each, on all 25 items of the set alone. A rewritten set replaces its
 * entry with a rating of its new items.
 */
export const englishRatings: readonly SetRating[] = [
  { items: 10, level: 2.8, raters: 1 },
  { items: 10, level: 3, raters: 1 },
  { items: 25, level: 3.77, raters: 2 },
  { items: 25, level: 3.6, raters: 2 },
  { items: 10, level: 1.9, raters: 1 },
  { items: 10, level: 1.9, raters: 1 },
  { items: 10, level: 2, raters: 1 },
  { items: 10, level: 1.9, raters: 1 },
  { items: 10, level: 1.9, raters: 1 },
  { items: 10, level: 1.9, raters: 1 },
];

/**
 * The level rating of each TKA Bahasa Indonesia set,
 * set 1 to 10 in order.
 * One rater rated ten evenly spaced items
 * of the set alone on 13 Nov 2026. A rewritten set replaces its entry with
 * a rating of its new items.
 */
export const indonesianRatings: readonly SetRating[] = [
  { items: 10, level: 2.3, raters: 1 },
  { items: 10, level: 2.3, raters: 1 },
  { items: 10, level: 2.3, raters: 1 },
  { items: 10, level: 2.4, raters: 1 },
  { items: 10, level: 2.1, raters: 1 },
  { items: 10, level: 2, raters: 1 },
  { items: 10, level: 2, raters: 1 },
  { items: 10, level: 2, raters: 1 },
  { items: 10, level: 1.8, raters: 1 },
  { items: 10, level: 1.9, raters: 1 },
];
