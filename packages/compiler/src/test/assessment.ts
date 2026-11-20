import {
  ContentKeySchema,
  CorpusSourcePathSchema,
} from "@nakafa/aksara-contracts/ids";
import { Effect } from "effect";
import { compileAssessmentBlocks } from "#compiler/assessment/document";
import type { Field } from "#compiler/assessment/error";

/** The site of the one test question whose prompt the tests compile. */
export const site = {
  contentKey: ContentKeySchema.make("test-bank/test-set/question-1/question"),
  sourcePath: CorpusSourcePathSchema.make(
    "packages/corpus/test-bank/test-set/question-1/question.en.mdx"
  ),
};

/** Compiles one test source into the blocks of its document, placing the given fields. */
export function blocks(rawMdx: string, fields: readonly Field[] = []) {
  return compileAssessmentBlocks({ ...site, rawMdx }, fields);
}

/** Compiles one test source, placing the given fields, and returns the reason it fails. */
export function reason(rawMdx: string, fields: readonly Field[] = []) {
  return blocks(rawMdx, fields).pipe(
    Effect.flip,
    Effect.map((error) => ("reason" in error ? error.reason : error._tag))
  );
}
