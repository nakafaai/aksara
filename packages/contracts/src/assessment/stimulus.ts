import { Array as Arr, Schema } from "effect";

import { ContentDocumentSchema } from "#contracts/assessment/document";
import {
  hasDistinctIds,
  StimulusIdSchema,
} from "#contracts/assessment/identity";
import { Sha256HashSchema } from "#contracts/ids";
import { DeliveryLanguageSchema } from "#contracts/locale";

/** The fields of a stimulus version except its hash, which covers all of them. */
const VersionFields = {
  deliveryLanguage: DeliveryLanguageSchema,
  document: ContentDocumentSchema,
  id: StimulusIdSchema,
};

/**
 * One shared reading or figure in one delivery language, without its hash. It
 * is a document that places no interaction.
 */
export const StimulusVersionBodySchema = Schema.Struct(VersionFields);

/**
 * A stimulus version is immutable once published: a change is a new version.
 * Its `hash` is the SHA-256 of the canonical encoding of the body (see
 * `assessment/hash`). Items use the version by identifier and hash and never
 * copy its document into their prompts.
 */
export const StimulusVersionSchema = StimulusVersionBodySchema.mapFields(
  (fields) => ({ ...fields, hash: Sha256HashSchema }),
  { unsafePreserveChecks: true }
);
export type StimulusVersion = typeof StimulusVersionSchema.Type;

const StimulusFieldsSchema = Schema.Struct({
  id: StimulusIdSchema,
  versions: Schema.NonEmptyArray(StimulusVersionSchema),
});

/** Checks that every version names the stimulus, in a language of its own. */
function hasOwnVersions(stimulus: typeof StimulusFieldsSchema.Type) {
  return (
    Arr.every(stimulus.versions, ({ id }) => id === stimulus.id) &&
    hasDistinctIds(
      Arr.map(stimulus.versions, ({ deliveryLanguage }) => deliveryLanguage)
    )
  );
}

/**
 * One stimulus with a version for each delivery language. Its identifier is
 * namespaced, so two sets that both call a reading `passage-1` have two
 * stimuli. A group of items uses one by reference and hash.
 */
export const StimulusSchema = StimulusFieldsSchema.check(
  Schema.makeFilter(hasOwnVersions, {
    message:
      "Expected each version to name the stimulus, in a language of its own.",
  })
);
export type Stimulus = typeof StimulusSchema.Type;
