import { Array as Arr, Order, Schema } from "effect";

import { hasDistinctIds, LocalIdSchema } from "#contracts/assessment/identity";
import type { Interaction } from "#contracts/assessment/interaction";
import { PositiveIntSchema } from "#contracts/assessment/scalar";
import type { ScoringOverride } from "#contracts/assessment/scoring";

/**
 * One level of a joint rule: the interactions that must all be correct for an
 * item to earn the points of the level. An interaction is correct when its key
 * matches it completely. The interactions form a set, so their order in the
 * list carries no meaning.
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

/** Checks that the later list names every interaction of the earlier list. */
function namesEveryOf(later: readonly string[], earlier: readonly string[]) {
  return Arr.every(earlier, (id) => Arr.contains(later, id));
}

/**
 * Checks that every level can score. The item awards the first level whose
 * interactions are all correct, so a later level that names every interaction
 * of an earlier level could never score: each answer that earns it also earns
 * the earlier level, which comes first.
 */
function hasReachableLevels(levels: readonly (typeof JointLevelSchema.Type)[]) {
  return Arr.every(levels, (level, index) =>
    Arr.every(
      Arr.take(levels, index),
      (earlier) => !namesEveryOf(level.correct, earlier.correct)
    )
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
    }),
    Schema.makeFilter(hasReachableLevels, {
      message:
        "Expected no level to name every interaction of an earlier level, because the earlier level would always score first.",
    })
  ),
});
export type JointRule = typeof JointRuleSchema.Type;

/** Returns the most points that a joint rule can award: the points of its first level. */
export function jointCeiling(joint: JointRule) {
  return Arr.headNonEmpty(joint.levels).points;
}

/**
 * Returns a joint rule with the interactions of each level in code-unit order.
 * A level names a set, so the order of its listing is not part of the task: the
 * structure check of a family compares this form, and the hash keeps the exact
 * listing.
 */
export function sortedJoint(joint: JointRule) {
  return {
    levels: Arr.map(joint.levels, ({ correct, points }) => ({
      correct: Arr.sort(correct, Order.String),
      points,
    })),
  };
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
