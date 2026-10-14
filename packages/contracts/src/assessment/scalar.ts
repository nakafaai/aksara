import { Schema } from "effect";

import { ActiveAppLocaleCodeSchema } from "#contracts/locale";

/** Whole number above zero, such as a count of choices or a number of points. */
export const PositiveIntSchema = Schema.Int.check(Schema.isGreaterThan(0));

/** Whole number from zero up, such as the fewest choices a learner must pick. */
export const NonNegativeIntSchema = Schema.Int.check(
  Schema.isGreaterThanOrEqualTo(0)
);

/**
 * Plain text that a screen reader, a list, or a label can show: trimmed and
 * never empty. Rich content is a document or inline content instead.
 */
export const PlainTextSchema = Schema.Trimmed.check(Schema.isNonEmpty());

/**
 * One LaTeX source string. LaTeX is stored once; MathML is derived at render
 * time (KaTeX 0.19 `output: "htmlAndMathml"`) and is never stored.
 */
export const LatexSchema = PlainTextSchema;

/** Plain text written for every active app locale, such as an official name. */
export const LocalizedTextSchema = Schema.Record(
  ActiveAppLocaleCodeSchema,
  PlainTextSchema
);
export type LocalizedText = typeof LocalizedTextSchema.Type;
