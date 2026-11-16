import type { SetRating } from "#corpus/tryout/level";

/**
 * The level rating of each SPM Fizik Paper 1 set, set 1 onward in order.
 * Eight raters rated all 40 items of set 1 alone on 15 Nov 2026. A rewritten
 * set replaces its entry with a rating of its new items.
 */
export const physicsRatings: readonly SetRating[] = [
  { items: 40, level: 4.33, raters: 8 },
];

/**
 * The level rating of each SPM Kimia Paper 1 set, set 1 onward in order.
 * Eight raters rated all 40 items of set 1 alone on 15 Nov 2026, and two
 * raters rated all 40 items of set 2 alone on 16 Nov 2026 (3.41 and 3.60), and
 * two raters rated all 40 items of set 3 alone the same day (3.28 and 3.13), and
 * two raters rated all 40 items of set 4 alone (3.19 and 3.11), and two
 * raters rated all 40 items of set 5 alone (3.43 and 3.64). A rewritten set
 * replaces its entry with a rating of its new items.
 */
export const chemistryRatings: readonly SetRating[] = [
  { items: 40, level: 4.14, raters: 8 },
  { items: 40, level: 3.51, raters: 2 },
  { items: 40, level: 3.21, raters: 2 },
  { items: 40, level: 4.24, raters: 2 },
  { items: 40, level: 3.53, raters: 2 },
];

/**
 * The level rating of each SPM Biologi Paper 1 set, set 1 onward in order.
 * Eight raters rated all 40 items of set 1 alone on 15 Nov 2026, and two
 * raters rated all 40 items of set 2 alone on 16 Nov 2026 (3.55 and 3.50).
 * Two raters rated all 40 items of set 3 alone on 16 Nov 2026 (3.91 and
 * 3.90), each item rewritten after that round rated again, and two raters
 * rated all 40 items of set 4 the same way (4.00 and 3.96), of set 5 (4.10
 * and 4.04) and of set 6 (4.09 and 3.85). A rewritten set replaces its entry
 * with a rating of its new items.
 */
export const biologyRatings: readonly SetRating[] = [
  { items: 40, level: 4.23, raters: 8 },
  { items: 40, level: 3.53, raters: 2 },
  { items: 40, level: 3.91, raters: 2 },
  { items: 40, level: 3.98, raters: 2 },
  { items: 40, level: 4.07, raters: 2 },
  { items: 40, level: 3.97, raters: 2 },
];
