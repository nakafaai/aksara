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
  StimulusIdSchema,
} from "#contracts/assessment/identity";
import { InteractionSchema } from "#contracts/assessment/interaction";
import {
  hasJointParts,
  hasOneItemRule,
  JointRuleSchema,
  sortedJoint,
} from "#contracts/assessment/joint";
import { isWithinRecordLimit } from "#contracts/assessment/record";
import { ScoringOverrideSchema } from "#contracts/assessment/scoring";
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
 * language. The interactions of a joint level are a set, so a language may list
 * them in another order.
 */
function hasOneStructure(item: typeof ItemFieldsSchema.Type) {
  return hasSameStructure(
    Arr.map(item.versions, ({ interactions, joint, scoring }) => ({
      interactions,
      joint: joint === undefined ? undefined : sortedJoint(joint),
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
