import { Array as Arr, Schema } from "effect";

import {
  ExamProfileIdSchema,
  hasDistinctIds,
  ItemFamilyIdSchema,
  KebabKeySchema,
  PaperIdSchema,
  StimulusIdSchema,
} from "#contracts/assessment/identity";
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
 * and the stimulus versions that the items use, by identifier and hash. The
 * signed paper bundle carries no answer key.
 */
export const PaperSchema = Schema.Struct({
  id: PaperIdSchema,
  profile: Schema.Struct({ hash: Sha256HashSchema, id: ExamProfileIdSchema }),
  sections: Schema.NonEmptyArray(PaperSectionSchema),
  stimuli: Schema.Array(
    Schema.Struct({ hash: Sha256HashSchema, id: StimulusIdSchema })
  ).check(
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
