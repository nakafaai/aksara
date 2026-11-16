import { Schema } from "effect";

import type { RichText } from "#contracts/assessment/inline";
import { PlainTextSchema } from "#contracts/assessment/scalar";

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

/** The title and description every card shows, each rich text. */
export function cardFields<E>(rich: RichSlot<E>) {
  return { description: rich, title: rich };
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
