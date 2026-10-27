import {
  ContentKeySchema,
  CorpusSourcePathSchema,
} from "@nakafa/aksara-contracts/ids";
import { Effect } from "effect";
import { compileAssessmentBlocks } from "#compiler/assessment/document";

/** The site of the one test question whose prompt the tests compile. */
export const site = {
  contentKey: ContentKeySchema.make("test-bank/test-set/question-1/question"),
  sourcePath: CorpusSourcePathSchema.make(
    "packages/corpus/test-bank/test-set/question-1/question.en.mdx"
  ),
};

/** Compiles one test source into the blocks of its document. */
export function blocks(rawMdx: string) {
  return compileAssessmentBlocks({ ...site, rawMdx });
}

/** Compiles one test source and returns the reason it fails. */
export function reason(rawMdx: string) {
  return blocks(rawMdx).pipe(
    Effect.flip,
    Effect.map((error) => ("reason" in error ? error.reason : error._tag))
  );
}
