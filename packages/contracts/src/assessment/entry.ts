import { Schema } from "effect";

import { InteractionFields } from "#contracts/assessment/part";
import {
  PlainTextSchema,
  PositiveIntSchema,
} from "#contracts/assessment/scalar";

/**
 * A short typed answer. `expectedLength` is a hint for the width of the field.
 * Maps to `qti-text-entry-interaction` (`expected-length`).
 */
export const TextEntryInteractionSchema = Schema.Struct({
  ...InteractionFields,
  expectedLength: Schema.optionalKey(PositiveIntSchema),
  kind: Schema.Literal("textEntry"),
});

/**
 * A typed number. `acceptsFractions` says whether `3/4` may be typed beside
 * `0.75`, and `unit` is the text shown beside the field, so the learner types
 * the number only. The value and its tolerance are in the key. Maps to
 * `qti-text-entry-interaction` with a float response.
 */
export const NumericEntryInteractionSchema = Schema.Struct({
  ...InteractionFields,
  acceptsFractions: Schema.Boolean,
  kind: Schema.Literal("numericEntry"),
  unit: Schema.optionalKey(PlainTextSchema),
});

/**
 * An expression typed as LaTeX. The equivalence policy is data. `proof` accepts
 * a deterministic proof only: Compute Engine canonical simplification then
 * `isSame`, or `isEqual` returning true. `proofOrSample` also accepts
 * `isIdenticallyEqual` returning true without a proof, which is a sample at up
 * to 50 points, not a proof, and which the grader records as sampled. QTI has
 * no interaction for a typed expression, so it maps to
 * `qti-portable-custom-interaction`, the way QTI adds a kind of its own.
 */
export const MathEntryInteractionSchema = Schema.Struct({
  ...InteractionFields,
  equivalence: Schema.Literals(["proof", "proofOrSample"]),
  kind: Schema.Literal("mathEntry"),
});

/**
 * A long answer that a rubric scores. `expectedLines` is a hint for the height
 * of the field. Maps to `qti-extended-text-interaction` (`expected-lines`);
 * QTI leaves the scoring of this interaction outside its scope.
 */
export const ExtendedTextInteractionSchema = Schema.Struct({
  ...InteractionFields,
  expectedLines: Schema.optionalKey(PositiveIntSchema),
  kind: Schema.Literal("extendedText"),
});
