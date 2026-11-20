import { Schema } from "effect";

import type { RichText } from "#contracts/assessment/inline";
import { PlainTextSchema } from "#contracts/assessment/scalar";
import { atMostVisible } from "#contracts/visual/length";

/**
 * The schema of rich text in one document kind. Every kind decodes rich text
 * to the same inline nodes, whatever form it writes them in: an assessment
 * stores them as they are, and a lesson writes them as elements of its tree.
 */
export type RichSlot<Encoded = unknown> = Schema.Codec<RichText, Encoded>;

/**
 * Plain text a component draws as a string: an axis label, a tab, or the name
 * a screen reader announces. It is trimmed and never empty.
 */
export const TextSchema = PlainTextSchema;

/**
 * The most visible characters a card's footer shows (`visibleLength`): two
 * lines of the footer's text in a card on a 360 px phone.
 */
export const FOOTER_CHARACTERS = 90;

/**
 * The words every card shows, each rich text: its title and description above
 * the visual, and its footer under it. The footer is written for this one
 * visual, never generated: what it shows and what to notice in it, in a
 * sentence or two. In a prompt it describes how to read the figure and never
 * gives its result.
 */
export function cardFields<E>(rich: RichSlot<E>) {
  return {
    description: rich,
    footer: Schema.optionalKey(
      rich.check(
        atMostVisible(
          FOOTER_CHARACTERS,
          `Expected a card footer of at most ${FOOTER_CHARACTERS} visible characters, so it reads in one or two lines on a phone; keep what to notice and leave the rest to the lesson.`
        )
      )
    ),
    title: rich,
  };
}

/**
 * The words of one component for each of its fixed options, such as the
 * samples of a lab: one value for every identifier, and no other key.
 */
export function byIds<
  const Ids extends readonly [string, ...string[]],
  Value extends Schema.Top,
>(ids: Ids, value: Value) {
  return Schema.Record(Schema.Literals(ids), value);
}

/** One fact a lab lists: a plain label and a rich value. */
export function factSchema<E>(rich: RichSlot<E>) {
  return Schema.Struct({ label: TextSchema, value: rich });
}

/** How a kinematics lab writes a decimal number: with a comma or a dot. */
export const DecimalSeparatorSchema = Schema.Literals(["comma", "dot"]);
