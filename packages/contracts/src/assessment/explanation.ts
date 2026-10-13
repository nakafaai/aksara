import { Schema } from "effect";

import { ContentDocumentSchema } from "#contracts/assessment/document";
import { isWithinRecordLimit } from "#contracts/assessment/record";
import { Sha256HashSchema } from "#contracts/ids";

/**
 * The explanation of one item version: its own schema and its own artifact, as
 * the answer key is. A paper bundle carries prompts and stimuli only, never a
 * key and never an explanation, so an explanation reaches a learner after
 * release, under the release policy that Nakafa applies, from this record. The
 * document places no interaction. `version` is the hash of the item version it
 * explains, which also fixes the delivery language it is written in. An item
 * version holds no explanation, and a version without one has no record.
 * Nakafa stores an explanation as one row, so it carries the size check of a
 * record (`assessment/record`).
 */
export const ItemExplanationSchema = Schema.Struct({
  document: ContentDocumentSchema,
  version: Sha256HashSchema,
}).check(isWithinRecordLimit);
export type ItemExplanation = typeof ItemExplanationSchema.Type;
