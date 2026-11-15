import type { SetRating } from "#corpus/tryout/level";

/**
 * The level rating of each SPM Fizik Paper 1 set, set 1 onward in order.
 * Eight raters rated all 40 items of set 1 alone on 15 Nov 2026. A rewritten
 * set replaces its entry with a rating of its new items.
 */
export const physicsRatings: readonly SetRating[] = [
  { items: 40, level: 4.33, raters: 8 },
];
