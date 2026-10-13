import { Array as Arr, HashSet, Schema } from "effect";

import { CONTENT_KEY_MAX_LENGTH } from "#contracts/ids";
import { isLowerKebab } from "#contracts/text/syntax";

const LOCAL_ID_PATTERN = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/u;
const KEY_PATTERN = /^[a-z0-9][a-z0-9._:/-]*$/u;
const NAMESPACED_PATTERN = /^[a-z0-9][a-z0-9._-]*(?:\/[a-z0-9][a-z0-9._-]*)+$/u;

/**
 * Longest local identifier or kebab key. It is the limit that try-out keys
 * already use (`tryout/key`), so one family of identifiers has one bound.
 */
const KEY_MAX_LENGTH = 128;

/**
 * Identifier of one part inside one item version: an interaction, an option, a
 * statement, a column, a gap, an area, a criterion, or a level. It starts with
 * a letter, as QTI identifiers do, and is lower kebab case, such as `option-1`.
 */
export const LocalIdSchema = Schema.String.pipe(
  Schema.check(Schema.isPattern(LOCAL_ID_PATTERN)),
  Schema.check(Schema.isMaxLength(KEY_MAX_LENGTH))
);

/** Lower kebab case key of a section or of a blueprint fact, such as `algebra`. */
export const KebabKeySchema = Schema.String.pipe(
  Schema.check(
    Schema.makeFilter(isLowerKebab, {
      description: "Lowercase kebab-case assessment key.",
      identifier: "AssessmentKey",
      message: "Invalid assessment key.",
    })
  ),
  Schema.check(Schema.isMaxLength(KEY_MAX_LENGTH))
);

const AssessmentKeySchema = Schema.String.pipe(
  Schema.check(Schema.isPattern(KEY_PATTERN)),
  Schema.check(Schema.isMaxLength(CONTENT_KEY_MAX_LENGTH))
);

/** Language-neutral identity of one item, shared by every language version. */
export const ItemFamilyIdSchema = AssessmentKeySchema.pipe(
  Schema.brand("@NakafaAI/AksaraItemFamilyId")
);
export type ItemFamilyId = typeof ItemFamilyIdSchema.Type;

/** Identity of one exam profile, such as a country's SNBT profile. */
export const ExamProfileIdSchema = AssessmentKeySchema.pipe(
  Schema.brand("@NakafaAI/AksaraExamProfileId")
);
export type ExamProfileId = typeof ExamProfileIdSchema.Type;

/** Identity of one frozen paper. */
export const PaperIdSchema = AssessmentKeySchema.pipe(
  Schema.brand("@NakafaAI/AksaraPaperId")
);
export type PaperId = typeof PaperIdSchema.Type;

/**
 * Identity of one uploaded image file. It carries no brand: a document nests
 * it in recursive nodes, whose encoded and decoded types must be the same.
 */
export const AssetIdSchema = AssessmentKeySchema;

/**
 * Identity of one shared reading or figure. It is namespaced, with at least
 * one `/`, so `passage-1` of one set and `passage-1` of another set are two
 * stimuli: `<namespace>/passage-1`.
 */
export const StimulusIdSchema = Schema.String.pipe(
  Schema.check(Schema.isPattern(NAMESPACED_PATTERN)),
  Schema.check(Schema.isMaxLength(CONTENT_KEY_MAX_LENGTH)),
  Schema.brand("@NakafaAI/AksaraStimulusId")
);
export type StimulusId = typeof StimulusIdSchema.Type;

/** Checks that no identifier appears twice in a list. */
export function hasDistinctIds(ids: readonly string[]) {
  return HashSet.size(HashSet.fromIterable(ids)) === ids.length;
}

/** Checks that no two parts of one list share an identifier. */
export function hasUniqueIds<Part extends { readonly id: string }>(
  parts: readonly Part[]
) {
  return hasDistinctIds(Arr.map(parts, ({ id }) => id));
}
