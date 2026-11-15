import { Array as Arr, Effect, HashMap, Option, Order, Schema } from "effect";

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
  versionStructure,
} from "#contracts/assessment/item";
import type { ItemKey } from "#contracts/assessment/key";
import {
  hasSameKeyStructure,
  hasSameStructure,
} from "#contracts/assessment/structure";
import { Sha256HashSchema } from "#contracts/ids";
import { ContentLanguageSchema } from "#contracts/locale";

/** One language of a place: the language a learner reads it in and that item version's hash. */
export const PlacedVersionSchema = Schema.Struct({
  hash: Sha256HashSchema,
  language: ContentLanguageSchema,
});

/**
 * One place in a section: an item family and its version in each language of
 * the section, in the section's order. A learner answers the place once, and
 * may read it in any of those languages.
 */
export const PlacementSchema = Schema.Struct({
  family: ItemFamilyIdSchema,
  versions: Schema.NonEmptyArray(PlacedVersionSchema),
});

/** Checks that every place of a section holds a version in each of its languages, in its order. */
function hasSectionLanguages(section: {
  readonly languages: readonly string[];
  readonly placements: readonly (typeof PlacementSchema.Type)[];
}) {
  const languages = Arr.join(section.languages, ",");
  return Arr.every(
    section.placements,
    ({ versions }) =>
      Arr.join(
        Arr.map(versions, ({ language }) => language),
        ","
      ) === languages
  );
}

/**
 * One section of a paper: the key of a section of the profile, the languages
 * its questions are written in, the first being the one a learner starts in,
 * and its places in order.
 */
export const PaperSectionSchema = Schema.Struct({
  languages: Schema.NonEmptyArray(ContentLanguageSchema).check(
    Schema.makeFilter(hasDistinctIds, {
      message: "Expected each section language once.",
    })
  ),
  placements: Schema.NonEmptyArray(PlacementSchema),
  section: KebabKeySchema,
}).check(
  Schema.makeFilter(hasSectionLanguages, {
    message:
      "Expected every place to hold a version in each language of its section, in its order.",
  })
);

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
 * with their languages and their places in order, each place an item family
 * with its version in every language of the section;
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
export class PaperStimuliMismatchError extends Schema.TaggedError<
  PaperStimuliMismatchError,
  { readonly brand: unique symbol }
>()("PaperStimuliMismatchError", {
  missing: Schema.Array(StimulusReferenceSchema),
  unused: Schema.Array(StimulusReferenceSchema),
}) {}

/**
 * Requires a paper to list the stimulus versions that its item versions use,
 * each once, and no other: the paper names the readings it uses and its items
 * name theirs, and the two must agree. `versions` are the item versions that
 * the places of the paper name, every language of every place. Run it before
 * the paper is frozen.
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

/** Why a place of a paper does not hold one item in every language of its section. */
export const PaperPlaceReasonSchema = Schema.Literals([
  "key",
  "structure",
  "version",
]);

/**
 * A place names a version that is not of its family or not in the language it
 * claims (`version`), its versions differ in more than words (`structure`), or
 * their answer keys do (`key`).
 */
export class PaperPlaceMismatchError extends Schema.TaggedError<
  PaperPlaceMismatchError,
  { readonly brand: unique symbol }
>()("PaperPlaceMismatchError", {
  family: ItemFamilyIdSchema,
  reason: PaperPlaceReasonSchema,
}) {}

/** The answers of a key in the order of their interactions, as two languages are compared. */
function sortedAnswers(key: ItemKey) {
  return Arr.sort(
    key.answers,
    Order.mapInput(
      Order.String,
      (answer: ItemKey["answers"][number]) => answer.interaction
    )
  );
}

/**
 * Requires every place of a paper to hold one item in every language of its
 * section: each placed version is of the place's family and written in the
 * language it is placed for, the versions share one interaction structure, and
 * their answer keys agree on every answer apart from the texts a learner may
 * type and the words of a rubric. A learner answers a place once, so a switch
 * of language never changes what is asked or how it is graded. `versions` and
 * `keys` are the item versions and keys that the places name.
 */
export const verifyPaperPlaces = Effect.fn("AksaraContracts.verifyPaperPlaces")(
  function* (
    paper: Paper,
    versions: readonly ItemVersion[],
    keys: readonly ItemKey[]
  ) {
    const versionOf = HashMap.fromIterable(
      Arr.map(versions, (version) => [version.hash, version] as const)
    );
    const keyOf = HashMap.fromIterable(
      Arr.map(keys, (key) => [key.version, key] as const)
    );
    for (const { placements } of paper.sections) {
      for (const { family, versions: placed } of placements) {
        const found = Arr.getSomes(
          Arr.map(placed, ({ hash, language }) =>
            Option.filter(
              HashMap.get(versionOf, hash),
              (version) =>
                version.family === family &&
                version.deliveryLanguage === language
            )
          )
        );
        if (
          !Arr.isReadonlyArrayNonEmpty(found) ||
          found.length !== placed.length
        ) {
          return yield* new PaperPlaceMismatchError({
            family,
            reason: "version",
          });
        }
        if (!hasSameStructure(Arr.map(found, versionStructure))) {
          return yield* new PaperPlaceMismatchError({
            family,
            reason: "structure",
          });
        }
        const answers = Arr.getSomes(
          Arr.map(found, ({ hash }) =>
            Option.map(HashMap.get(keyOf, hash), sortedAnswers)
          )
        );
        if (
          !Arr.isReadonlyArrayNonEmpty(answers) ||
          answers.length !== found.length ||
          !hasSameKeyStructure(answers)
        ) {
          return yield* new PaperPlaceMismatchError({ family, reason: "key" });
        }
      }
    }
  }
);
