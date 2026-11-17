import type { SetRating } from "#corpus/tryout/level";

/**
 * The level rating of each SPM Fizik Paper 1 set, set 1 onward in order.
 * Eight raters rated all 40 items of set 1 alone on 15 Nov 2026, and two
 * raters rated all 40 items of set 2 alone on 16 Nov 2026 (4.15 and 3.99), and
 * two raters rated all 40 items of set 3 alone on 17 Nov 2026 (4.08 and 3.74).
 * A rewritten set replaces its entry with a rating of its new items.
 */
export const physicsRatings: readonly SetRating[] = [
  { items: 40, level: 4.33, raters: 8 },
  { items: 40, level: 4.07, raters: 2 },
  { items: 40, level: 3.91, raters: 2 },
];

/**
 * The level rating of each SPM Kimia Paper 1 set, set 1 onward in order.
 * Eight raters rated all 40 items of set 1 alone on 15 Nov 2026, and two
 * raters rated all 40 items of set 2 alone on 16 Nov 2026 (3.41 and 3.60), and
 * two raters rated all 40 items of set 3 alone the same day (4.04 and 3.89), and
 * two raters rated all 40 items of set 4 alone (3.19 and 3.11), and two
 * raters rated all 40 items of set 5 alone (3.54 and 3.59), and two raters
 * rated all 40 items of set 6 alone (3.81 and 3.99), and four raters rated all
 * 40 items of set 7 alone after its hardening pass, two with each of set 4's
 * step-counting prompts (3.95 and 4.00, 3.19 and 3.28), and four raters rated
 * all 40 items of set 8 alone the same way (4.08 and 3.99, 4.45 and 4.05). A
 * rewritten set replaces its entry with a rating of its new items.
 */
export const chemistryRatings: readonly SetRating[] = [
  { items: 40, level: 4.14, raters: 8 },
  { items: 40, level: 3.51, raters: 2 },
  { items: 40, level: 3.96, raters: 2 },
  { items: 40, level: 4.24, raters: 2 },
  { items: 40, level: 3.56, raters: 2 },
  { items: 40, level: 3.9, raters: 2 },
  { items: 40, level: 3.6, raters: 4 },
  { items: 40, level: 4.14, raters: 4 },
];

/**
 * The level rating of each SPM Biologi Paper 1 set, set 1 onward in order.
 * Eight raters rated all 40 items of set 1 alone on 15 Nov 2026, and two
 * raters rated all 40 items of set 2 alone on 16 Nov 2026 (3.55 and 3.50).
 * Two raters rated all 40 items of set 3 alone on 16 Nov 2026 (3.91 and
 * 3.90), each item rewritten after that round rated again, and two raters
 * rated all 40 items of set 4 the same way (4.00 and 3.96), of set 5 (4.10
 * and 4.04) and of set 6 (4.09 and 3.85). Two raters rated all 40 items of
 * set 9 the same way (4.14 and 3.99) and of set 10 (4.15 and 3.78). A
 * rewritten set replaces its entry with a rating of its new items.
 */
export const biologyRatings: readonly SetRating[] = [
  { items: 40, level: 4.23, raters: 8 },
  { items: 40, level: 3.53, raters: 2 },
  { items: 40, level: 3.91, raters: 2 },
  { items: 40, level: 3.98, raters: 2 },
  { items: 40, level: 4.07, raters: 2 },
  { items: 40, level: 3.97, raters: 2 },
  { items: 40, level: 3.93, raters: 2 },
  { items: 40, level: 4.03, raters: 2 },
  { items: 40, level: 4.06, raters: 2 },
  { items: 40, level: 3.96, raters: 2 },
];
