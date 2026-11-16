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
 * Eight raters rated all 40 items of set 1 alone on 15 Nov 2026. A rewritten
 * set replaces its entry with a rating of its new items.
 */
export const chemistryRatings: readonly SetRating[] = [
  { items: 40, level: 4.14, raters: 8 },
];

/**
 * The level rating of each SPM Biologi Paper 1 set, set 1 onward in order.
 * Eight raters rated all 40 items of set 1 alone on 15 Nov 2026, and two
 * raters rated all 40 items of set 2 alone on 16 Nov 2026 (3.55 and 3.50).
 * Two raters rated all 40 items of set 3 alone on 16 Nov 2026 (3.89 and
 * 3.90), the five items rewritten after that round rated again. A rewritten
 * set replaces its entry with a rating of its new items.
 */
export const biologyRatings: readonly SetRating[] = [
  { items: 40, level: 4.23, raters: 8 },
  { items: 40, level: 3.53, raters: 2 },
  { items: 40, level: 3.89, raters: 2 },
];
