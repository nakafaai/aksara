import type { SetRating } from "#corpus/tryout/level";

/**
 * The level rating of each TU Darmstadt Feststellungsprüfung Mathematik set,
 * set 1 in order. Set 1 is not rated yet: its entry is a placeholder at the
 * floor of the scale, written on 20 Nov 2026 so the held track decodes, and
 * it measures nothing. The four-rater panel rates the set with its keys,
 * rubrics and calibration solutions before the track's hold lifts, and its
 * mean replaces this entry.
 */
export const darmstadtFspRatings: readonly SetRating[] = [
  { items: 3, level: 1, raters: 1 },
];
