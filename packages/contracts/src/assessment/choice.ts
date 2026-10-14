import { Array as Arr, Schema } from "effect";

import { hasUniqueIds, LocalIdSchema } from "#contracts/assessment/identity";
import {
  DocumentPartSchema,
  hasSelectionBounds,
  InteractionFields,
  TextPartSchema,
} from "#contracts/assessment/part";
import {
  NonNegativeIntSchema,
  PositiveIntSchema,
} from "#contracts/assessment/scalar";

const UNIQUE_IDS_MESSAGE = "Expected each part to have its own identifier.";
const SELECTION_MESSAGE =
  "Expected the fewest choices to be at most the most choices, and the most choices to be at most the number of parts.";

/**
 * Pick one option, or several. Single choice is `maxChoices` 1. Maps to
 * `qti-choice-interaction` with `min-choices`, `max-choices`, and `shuffle`.
 */
export const ChoiceInteractionSchema = Schema.Struct({
  ...InteractionFields,
  kind: Schema.Literal("choice"),
  maxChoices: PositiveIntSchema,
  minChoices: NonNegativeIntSchema,
  options: Schema.Array(DocumentPartSchema).check(Schema.isMinLength(2)),
  shuffle: Schema.Boolean,
}).check(
  Schema.makeFilter(({ options }) => hasUniqueIds(options), {
    message: UNIQUE_IDS_MESSAGE,
  }),
  Schema.makeFilter(
    (choice) => hasSelectionBounds(choice, choice.options.length),
    { message: SELECTION_MESSAGE }
  )
);

/**
 * Statements by columns, one column for each statement. True or False for each
 * statement is two columns. Maps to `qti-match-interaction`, whose first set
 * is the statements and whose second set is the columns.
 */
export const MatrixInteractionSchema = Schema.Struct({
  ...InteractionFields,
  columns: Schema.Array(DocumentPartSchema).check(Schema.isMinLength(2)),
  kind: Schema.Literal("matrix"),
  shuffle: Schema.Boolean,
  statements: Schema.NonEmptyArray(DocumentPartSchema),
}).check(
  Schema.makeFilter(
    ({ columns, statements }) =>
      hasUniqueIds(Arr.appendAll(statements, columns)),
    { message: UNIQUE_IDS_MESSAGE }
  )
);

/** One end of a match: a part that can be paired up to `maxMatches` times. */
const MatchPartSchema = Schema.Struct({
  ...DocumentPartSchema.fields,
  maxMatches: PositiveIntSchema,
});

/**
 * Two sets and directed pairs from a source to a target, each end with its
 * own limit. Maps to `qti-match-interaction` with `qti-simple-match-set` and
 * `match-max` on every `qti-simple-associable-choice`.
 */
export const MatchInteractionSchema = Schema.Struct({
  ...InteractionFields,
  kind: Schema.Literal("match"),
  shuffle: Schema.Boolean,
  sources: Schema.NonEmptyArray(MatchPartSchema),
  targets: Schema.NonEmptyArray(MatchPartSchema),
}).check(
  Schema.makeFilter(
    ({ sources, targets }) => hasUniqueIds(Arr.appendAll(sources, targets)),
    { message: UNIQUE_IDS_MESSAGE }
  )
);

/**
 * Put items in order: all of them, or a subset of `minChoices` to `maxChoices`.
 * Maps to `qti-order-interaction`.
 */
export const OrderInteractionSchema = Schema.Struct({
  ...InteractionFields,
  items: Schema.Array(DocumentPartSchema).check(Schema.isMinLength(2)),
  kind: Schema.Literal("order"),
  maxChoices: PositiveIntSchema,
  minChoices: PositiveIntSchema,
  shuffle: Schema.Boolean,
}).check(
  Schema.makeFilter(({ items }) => hasUniqueIds(items), {
    message: UNIQUE_IDS_MESSAGE,
  }),
  Schema.makeFilter((order) => hasSelectionBounds(order, order.items.length), {
    message: SELECTION_MESSAGE,
  })
);

/** A drop-down inside a line of text. Maps to `qti-inline-choice-interaction`. */
export const InlineChoiceInteractionSchema = Schema.Struct({
  ...InteractionFields,
  kind: Schema.Literal("inlineChoice"),
  options: Schema.Array(TextPartSchema).check(Schema.isMinLength(2)),
  shuffle: Schema.Boolean,
}).check(
  Schema.makeFilter(({ options }) => hasUniqueIds(options), {
    message: UNIQUE_IDS_MESSAGE,
  })
);

/**
 * Fill the gaps of a text from a shared set of choices, each used up to its
 * own limit. Each gap sits in the prompt as an inline interaction that names
 * it. Maps to `qti-gap-match-interaction` with `qti-gap-text` (`match-max`)
 * and one `qti-gap` for each gap.
 */
export const GapMatchInteractionSchema = Schema.Struct({
  ...InteractionFields,
  choices: Schema.NonEmptyArray(
    Schema.Struct({ ...TextPartSchema.fields, maxMatches: PositiveIntSchema })
  ),
  gaps: Schema.NonEmptyArray(Schema.Struct({ id: LocalIdSchema })),
  kind: Schema.Literal("gapMatch"),
  shuffle: Schema.Boolean,
}).check(
  Schema.makeFilter(
    ({ choices, gaps }) => hasUniqueIds(Arr.appendAll(choices, gaps)),
    { message: UNIQUE_IDS_MESSAGE }
  )
);
