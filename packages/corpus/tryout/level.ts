import type { SetLevel } from "@nakafa/aksara-contracts/assessment/catalog";
import { Schema } from "effect";

/**
 * The difficulty rubric rates a typical real exam item 3 and the hardest real
 * items 5. Nakafa's scale starts at the real exam: a set rated below 3.5 reads
 * like the real exam and is easy, which no rewritten set falls under.
 */
const MEDIUM_FROM = 3.5;

/** A panel mean from 4 reads among the hardest real items: hard. */
const HARD_FROM = 4;

/** A panel mean from 4.5 reads beyond the hardest real items: cooked. */
const COOKED_FROM = 4.5;

/**
 * The difficulty panel's measurement of one set: the mean level its raters
 * gave the rated items, from 1 to 5 against the real exam (3 a typical real
 * item, 5 the hardest), how many raters, and how many items they rated. The
 * content skill's difficulty reference owns how a panel rates a set.
 */
export const SetRatingSchema = Schema.Struct({
  items: Schema.Int.check(Schema.isGreaterThan(0)),
  level: Schema.Finite.check(Schema.isBetween({ maximum: 5, minimum: 1 })),
  raters: Schema.Int.check(Schema.isGreaterThan(0)),
});
export type SetRating = typeof SetRatingSchema.Type;

/** Publishes the level of one set from its panel rating, never by hand. */
export function setLevel({ level }: SetRating): SetLevel {
  if (level >= COOKED_FROM) {
    return "cooked";
  }
  if (level >= HARD_FROM) {
    return "hard";
  }
  if (level >= MEDIUM_FROM) {
    return "medium";
  }
  return "easy";
}
