import { Array as Arr, Effect, Schema } from "effect";

import {
  ExamProfileIdSchema,
  hasDistinctIds,
  ItemFamilyIdSchema,
  KebabKeySchema,
  PaperIdSchema,
} from "#contracts/assessment/identity";
import {
  type ItemVersion,
  type StimulusReference,
  StimulusReferenceSchema,
} from "#contracts/assessment/item";
import { Sha256HashSchema } from "#contracts/ids";

/** One place in a section: an item version, named by its family and its hash. */
export const PlacementSchema = Schema.Struct({
  family: ItemFamilyIdSchema,
  hash: Sha256HashSchema,
});

/** One section of a paper: the key of a section of the profile and its places in order. */
export const PaperSectionSchema = Schema.Struct({
  placements: Schema.NonEmptyArray(PlacementSchema),
  section: KebabKeySchema,
});

/**
 * Checks that no section, and no item, appears twice. An item takes one place
 * in a paper, because a paper is written in the languages of its places.
 */
function hasOnePlaceEach(paper: {
  readonly sections: readonly (typeof PaperSectionSchema.Type)[];
}) {
  return (
    hasDistinctIds(Arr.map(paper.sections, ({ section }) => section)) &&
    hasDistinctIds(
      Arr.flatMap(paper.sections, ({ placements }) =>
        Arr.map(placements, ({ family }) => family)
      )
    )
  );
}

/**
 * A frozen paper: the profile it follows, by identifier and hash; the sections
 * with their places in order, each place an item version by family and hash;
 * and the stimulus versions that the items use, by identifier and hash. A
 * paper is frozen and named by its content hash. A paper bundle carries
 * prompts and stimuli only, never an answer key and never an explanation. A
 * paper whose items use no shared reading lists none. The schema cannot see the
 * item versions, so `verifyPaperStimuli` checks that the list is the one the
 * items use.
 */
export const PaperSchema = Schema.Struct({
  id: PaperIdSchema,
  profile: Schema.Struct({ hash: Sha256HashSchema, id: ExamProfileIdSchema }),
  sections: Schema.NonEmptyArray(PaperSectionSchema),
  stimuli: Schema.Array(StimulusReferenceSchema).check(
    Schema.makeFilter(
      (stimuli) =>
        hasDistinctIds(Arr.map(stimuli, ({ hash, id }) => `${id} ${hash}`)),
      { message: "Expected each stimulus version once." }
    )
  ),
}).check(
  Schema.makeFilter(hasOnePlaceEach, {
    message: "Expected each section and each item once.",
  })
);
export type Paper = typeof PaperSchema.Type;

/** Whether two references name one stimulus version: the same identifier and hash. */
function sameReference(left: StimulusReference, right: StimulusReference) {
  return left.id === right.id && left.hash === right.hash;
}

/**
 * A paper does not list the stimulus versions that its item versions use.
 * `missing` are the ones the items use and the paper leaves out, and `unused`
 * are the ones the paper lists and no item uses.
 */
export class PaperStimuliMismatchError extends Schema.TaggedError<PaperStimuliMismatchError>()(
  "PaperStimuliMismatchError",
  {
    missing: Schema.Array(StimulusReferenceSchema),
    unused: Schema.Array(StimulusReferenceSchema),
  }
) {}

/**
 * Requires a paper to list the stimulus versions that its item versions use,
 * each once, and no other: the paper names the readings it uses and its items
 * name theirs, and the two must agree. `versions` are the item versions that
 * the places of the paper name, one for each place. Run it before the paper is
 * frozen.
 */
export const verifyPaperStimuli = Effect.fn(
  "AksaraContracts.verifyPaperStimuli"
)(function* (paper: Paper, versions: readonly ItemVersion[]) {
  const used = Arr.dedupeWith(
    Arr.flatMap(versions, ({ stimulus }) =>
      stimulus === undefined ? [] : [stimulus]
    ),
    sameReference
  );
  const missing = Arr.differenceWith(sameReference)(used, paper.stimuli);
  const unused = Arr.differenceWith(sameReference)(paper.stimuli, used);
  if (missing.length > 0 || unused.length > 0) {
    return yield* new PaperStimuliMismatchError({ missing, unused });
  }
});
