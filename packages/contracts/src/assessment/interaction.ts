import { Array as Arr, Match, Schema } from "effect";

import {
  ChoiceInteractionSchema,
  GapMatchInteractionSchema,
  InlineChoiceInteractionSchema,
  MatchInteractionSchema,
  MatrixInteractionSchema,
  OrderInteractionSchema,
} from "#contracts/assessment/choice";
import {
  ExtendedTextInteractionSchema,
  MathEntryInteractionSchema,
  NumericEntryInteractionSchema,
  TextEntryInteractionSchema,
} from "#contracts/assessment/entry";
import {
  GraphPointInteractionSchema,
  HotspotInteractionSchema,
} from "#contracts/assessment/graphic";

/**
 * Every interaction of Assessment v2, aligned with QTI 3.0.1. An interaction
 * holds what the learner sees and does, and never an answer key: the key is a
 * separate record (`assessment/key`). Upload and audio are planned and are not
 * part of this contract.
 */
export const InteractionSchema = Schema.Union([
  ChoiceInteractionSchema,
  MatrixInteractionSchema,
  MatchInteractionSchema,
  OrderInteractionSchema,
  InlineChoiceInteractionSchema,
  TextEntryInteractionSchema,
  NumericEntryInteractionSchema,
  MathEntryInteractionSchema,
  HotspotInteractionSchema,
  GapMatchInteractionSchema,
  GraphPointInteractionSchema,
  ExtendedTextInteractionSchema,
]);
export type Interaction = typeof InteractionSchema.Type;

/**
 * The kind of an interaction. It is read from the union itself, so a new
 * interaction adds its kind here and nowhere else.
 */
export const InteractionKindSchema = Schema.Union(
  Arr.map(InteractionSchema.members, ({ fields }) => fields.kind)
);
export type InteractionKind = typeof InteractionKindSchema.Type;

/**
 * Checks that an interaction of this kind may sit inside a line of text, as a
 * field: an inline choice, a text entry, a numeric entry, or a math entry.
 * Every other kind sits as a block of its own, except a gap match, which sits
 * inside the text once for each of its gaps.
 */
export function canSitInText(kind: InteractionKind) {
  return Match.value(kind).pipe(
    Match.whenOr(
      "inlineChoice",
      "textEntry",
      "numericEntry",
      "mathEntry",
      () => true
    ),
    Match.orElse(() => false)
  );
}
