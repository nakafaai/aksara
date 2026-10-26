import { Schema } from "effect";

import { ContentDocumentSchema } from "#contracts/assessment/document";
import { isWithinRecordLimit } from "#contracts/assessment/record";
import { Sha256HashSchema } from "#contracts/ids";
import { ContentLanguageSchema } from "#contracts/locale";

/**
 * The explanation of one item version in one language: its own schema and its
 * own artifact, as the answer key is. A paper bundle carries prompts and
 * stimuli only, never a key and never an explanation, so an explanation
 * reaches a learner after release, under the release policy that Nakafa
 * applies, from this record. The document places no interaction. `version` is
 * the hash of the item version it explains. `language` is the language the
 * explanation is written in, which need not be the delivery language of the
 * version: an item asked in Indonesian is explained to a learner in the
 * language of the learner, and may quote the prompt in its own language. A
 * version has at most one explanation in each language, and a version without
 * one has no record. An item version holds no explanation. Its size is limited
 * by `assessment/record`.
 */
export const ItemExplanationSchema = Schema.Struct({
  document: ContentDocumentSchema,
  language: ContentLanguageSchema,
  version: Sha256HashSchema,
}).check(isWithinRecordLimit);
export type ItemExplanation = typeof ItemExplanationSchema.Type;
