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
  { items: 8, level: 4.45, raters: 8 },
  { items: 8, level: 4.14, raters: 8 },
  { items: 8, level: 4.19, raters: 8 },
  { items: 8, level: 4.47, raters: 8 },
  { items: 8, level: 4.39, raters: 8 },
  { items: 8, level: 4.17, raters: 8 },
  { items: 8, level: 3.98, raters: 8 },
];

/**
 * The level rating of each Hochschule Kaiserslautern Aufnahmeprüfung set, set
 * 1 to 10 in order: the pooled mean of a four-rater panel, two raters with each
 * of two step-counting prompts, that saw every item of the set with its key.
 * Set 1 was rated on 20 Nov 2026 (3.60 and 3.98, 3.60 and 3.65), then its eight
 * weakest items were rewritten and rated again (3.56 and 3.56, 3.9 and 3.88),
 * then three of those once more (4.0 and 4.17, 4.33 and 4.33). Set 2 was rated
 * on 20 Nov 2026 (3.90 and 3.62, 3.88 and 3.67). Its six weakest items were then
 * rewritten, two of them twice, and rated again (4.08 and 4.0, 4.25 and 4.25).
 * Set 3 was hardened and rated on 21 Nov 2026 (3.88 and 3.58, 4.08 and 3.92),
 * then its four weakest items were rewritten and rated again (4.25 and 4.0,
 * 4.38 and 4.38), bringing the merged panel to 4.05 and 3.78, 4.28 and 4.15.
 */
export const kaiserslauternRatings: readonly SetRating[] = [
  { items: 20, level: 3.98, raters: 4 },
  { items: 20, level: 4.02, raters: 4 },
  { items: 20, level: 4.06, raters: 4 },
];
