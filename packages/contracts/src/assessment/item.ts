import { Array as Arr, Schema } from "effect";

import { AssessmentDocumentSchema } from "#contracts/assessment/document";
import {
  hasFittingRules,
  hasPlacedInteractions,
} from "#contracts/assessment/fit";
import {
  hasDistinctIds,
  ItemFamilyIdSchema,
  KebabKeySchema,
  LocalIdSchema,
  StimulusIdSchema,
} from "#contracts/assessment/identity";
import {
  type Interaction,
  InteractionSchema,
} from "#contracts/assessment/interaction";
import { isWithinRecordLimit } from "#contracts/assessment/record";
import { PositiveIntSchema } from "#contracts/assessment/scalar";
import {
  type ScoringOverride,
  ScoringOverrideSchema,
} from "#contracts/assessment/scoring";
import { hasSameStructure } from "#contracts/assessment/structure";
import { Sha256HashSchema } from "#contracts/ids";
import { ContentLanguageSchema } from "#contracts/locale";

/** The editorial facts that place an item in a blueprint. */
export const ItemBlueprintSchema = Schema.Struct({
  cognitiveLevel: KebabKeySchema,
  competency: KebabKeySchema,
  topic: KebabKeySchema,
});

/**
 * One item, whatever its language: a language-neutral identifier, its
 * blueprint, and the shared reading it belongs to, if any.
 */
export const ItemFamilySchema = Schema.Struct({
  blueprint: Schema.optionalKey(ItemBlueprintSchema),
  id: ItemFamilyIdSchema,
  stimulus: Schema.optionalKey(StimulusIdSchema),
});
export type ItemFamily = typeof ItemFamilySchema.Type;

/**
 * A shared reading, pinned to the exact version that this item version was
 * written against. The reading is never copied into the prompt.
 */
export const StimulusReferenceSchema = Schema.Struct({
  hash: Sha256HashSchema,
  id: StimulusIdSchema,
});
export type StimulusReference = typeof StimulusReferenceSchema.Type;

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

/** The fields of an item version except its hash, which covers all of them. */
const VersionFields = {
  deliveryLanguage: ContentLanguageSchema,
  family: ItemFamilyIdSchema,
  interactions: Schema.NonEmptyArray(InteractionSchema),
  joint: Schema.optionalKey(JointRuleSchema),
  prompt: AssessmentDocumentSchema,
  scoring: Schema.Array(ScoringOverrideSchema),
  stimulus: Schema.optionalKey(StimulusReferenceSchema),
};

/**
 * Checks that a joint rule has interactions to join: at least two in the
 * version, and each level names only interactions of the version.
 */
function hasJointParts(version: {
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
function hasOneItemRule(version: {
  readonly joint?: JointRule;
  readonly scoring: readonly ScoringOverride[];
}) {
  return version.joint === undefined || version.scoring.length === 0;
}

/**
 * One item in one delivery language, without its hash: the prompt document,
 * its interactions, the scoring rules that override the exam profile, the joint
 * rule when its answers depend on each other, and the shared reading it was
 * written against, if it has one. The prompt carries no answer key, and the
 * version holds no explanation: the key and the explanation are records of their
 * own (`assessment/key`, `assessment/explanation`).
 */
export const ItemVersionBodySchema = Schema.Struct(VersionFields).check(
  Schema.makeFilter(hasPlacedInteractions, {
    message:
      "Expected the prompt to place each interaction once, as its kind allows, and no other.",
  }),
  Schema.makeFilter(hasFittingRules, {
    message:
      "Expected each scoring rule to fit its interaction, and each extended text to carry a rubric.",
  }),
  Schema.makeFilter(hasJointParts, {
    message:
      "Expected a joint rule to name at least two interactions of the version, each level naming only those.",
  }),
  Schema.makeFilter(hasOneItemRule, {
    message:
      "Expected a joint rule to leave the scoring overrides empty, because one rule scores the item.",
  })
);

/**
 * An item version is immutable once published: a change is a new version. Its
 * `hash` is the SHA-256 of the canonical encoding of the body (see
 * `assessment/hash`), so the hash names the exact content. Its size is limited
 * by `assessment/record`.
 */
export const ItemVersionSchema = ItemVersionBodySchema.mapFields(
  (fields) => ({ ...fields, hash: Sha256HashSchema }),
  { unsafePreserveChecks: true }
).check(isWithinRecordLimit);
export type ItemVersion = typeof ItemVersionSchema.Type;

const ItemFieldsSchema = Schema.Struct({
  family: ItemFamilySchema,
  versions: Schema.NonEmptyArray(ItemVersionSchema),
});

/**
 * Checks that every version of a family has the same interaction structure.
 * The old contract required translations to preserve their format, structure,
 * and answer key, and it still holds: a translation may change words, never
 * the task. If the structure were free to differ, one answer key, one scoring
 * rule, and one calibrated difficulty could not serve every language of an
 * item. The identifiers, counts, bounds, joint rule, and scoring rules must
 * agree; the labels, the text alternatives, and the units are the words of a
 * language.
 */
function hasOneStructure(item: typeof ItemFieldsSchema.Type) {
  return hasSameStructure(
    Arr.map(item.versions, ({ interactions, joint, scoring }) => ({
      interactions,
      joint,
      scoring,
    }))
  );
}

/**
 * Checks that the versions belong to the family: each names its identifier and
 * its shared reading, and no two are written in one language.
 */
function hasFamilyVersions(item: typeof ItemFieldsSchema.Type) {
  return (
    Arr.every(
      item.versions,
      ({ family, stimulus }) =>
        family === item.family.id && stimulus?.id === item.family.stimulus
    ) &&
    hasDistinctIds(
      Arr.map(item.versions, ({ deliveryLanguage }) => deliveryLanguage)
    )
  );
}

/**
 * One item with its versions, one for each delivery language. Every version
 * names the family and the shared reading of the family, is written in its own
 * language, and has the same interaction structure as the others.
 */
export const ItemSchema = ItemFieldsSchema.check(
  Schema.makeFilter(hasFamilyVersions, {
    message:
      "Expected each version to name the family and its shared reading, in a language of its own.",
  }),
  Schema.makeFilter(hasOneStructure, {
    message:
      "Expected every version of a family to have one interaction structure.",
  })
);
export type Item = typeof ItemSchema.Type;
