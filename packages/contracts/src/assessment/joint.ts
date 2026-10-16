import { Array as Arr, Schema } from "effect";

import { hasDistinctIds, LocalIdSchema } from "#contracts/assessment/identity";
import type { Interaction } from "#contracts/assessment/interaction";
import { PositiveIntSchema } from "#contracts/assessment/scalar";
import type { ScoringOverride } from "#contracts/assessment/scoring";

/**
 * One level of a joint rule: the interactions that must all be correct for an
 * item to earn the points of the level. An interaction is correct when its key
 * matches it completely.
 */
export const JointLevelSchema = Schema.Struct({
  correct: Schema.NonEmptyArray(LocalIdSchema).check(
    Schema.makeFilter(hasDistinctIds, {
      message: "Expected each interaction of a level once.",
    })
  ),
  points: PositiveIntSchema,
});

/** Checks that each level is worth fewer points than the level above it. */
function hasDescendingPoints(
  levels: readonly (typeof JointLevelSchema.Type)[]
) {
  return Arr.every(
    Arr.zip(levels, Arr.drop(levels, 1)),
    ([higher, lower]) => higher.points > lower.points
  );
}

/**
 * One rule for the whole item, for answers that depend on each other, such as an
 * answer and its reason. The item scores the points of the first level whose
 * interactions are all correct, and 0 when none is. Interactions scored together
 * make a composite item, which QTI 3 scores by general response processing, not
 * by a standard template (Best Practices and Implementation Guide, section 3.4.2).
 */
export const JointRuleSchema = Schema.Struct({
  levels: Schema.NonEmptyArray(JointLevelSchema).check(
    Schema.makeFilter(hasDescendingPoints, {
      message: "Expected the points of the levels to descend.",
    })
  ),
});
export type JointRule = typeof JointRuleSchema.Type;

/** Returns the most points that a joint rule can award: the points of its first level. */
export function jointCeiling(joint: JointRule) {
  return Arr.headNonEmpty(joint.levels).points;
}

/**
 * Checks that a joint rule has interactions to join: at least two in the
 * version, and each level names only interactions of the version.
 */
export function hasJointParts(version: {
  readonly interactions: readonly Interaction[];
  readonly joint?: JointRule;
}) {
  if (version.joint === undefined) {
    return true;
  }
  const ids = Arr.map(version.interactions, ({ id }) => id);
  return (
    version.interactions.length >= 2 &&
    Arr.every(version.joint.levels, ({ correct }) =>
      Arr.every(correct, (id) => Arr.contains(ids, id))
    )
  );
}

/**
 * Checks that a version with a joint rule sets no scoring override: one rule
 * scores the item. This also refuses an extended text in a joint item, because
 * an extended text needs a rubric override (`fit`), and a joint item has none. A
 * person judges an extended text, so no key can say that it is correct.
 */
export function hasOneItemRule(version: {
  readonly joint?: JointRule;
  readonly scoring: readonly ScoringOverride[];
}) {
  return version.joint === undefined || version.scoring.length === 0;
}
