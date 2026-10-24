import { runSync } from "@mdx-js/mdx";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
} from "@nakafa/aksara-contracts/ids";
import { Effect, Predicate, Schema } from "effect";
import {
  ContentTreeEvaluationError,
  MAX_CAUSE_MESSAGE_LENGTH,
} from "#compiler/errors";
import { createTreeRuntime, TreeCall } from "#compiler/tree/runtime";
import { serializeContentTree } from "#compiler/tree/serialize";

/** Inputs that one compiled function body needs to become its content tree. */
export const EvaluateContentTreeInputSchema = Schema.Struct({
  compiledCode: Schema.String,
  componentNames: Schema.Array(Schema.String),
  contentKey: ContentKeySchema,
  sourcePath: CorpusSourcePathSchema,
});
export type EvaluateContentTreeInput =
  typeof EvaluateContentTreeInputSchema.Type;

/**
 * Returns the bounded message of a thrown error or string, so the author sees
 * the expression that failed. Any other thrown value has no message to show.
 */
function causeMessageOf(cause: unknown) {
  if (Predicate.isError(cause)) {
    return cause.message.slice(0, MAX_CAUSE_MESSAGE_LENGTH);
  }
  if (Predicate.isString(cause)) {
    return cause.slice(0, MAX_CAUSE_MESSAGE_LENGTH);
  }
}

/**
 * Evaluates one compiled function body once in Node, after the authored source
 * policy has passed, and signs the element tree it returns. The body runs with
 * the tree runtime, so Nakafa never evaluates code.
 */
export const evaluateContentTree = Effect.fn(
  "AksaraCompiler.evaluateContentTree"
)(function* (input: EvaluateContentTreeInput) {
  const root = yield* Effect.try({
    catch: (cause) =>
      new ContentTreeEvaluationError({
        cause,
        causeMessage: causeMessageOf(cause),
        contentKey: input.contentKey,
        message: "Evaluating the compiled document body failed.",
        sourcePath: input.sourcePath,
      }),
    try: () =>
      runSync(
        input.compiledCode,
        createTreeRuntime(input.componentNames)
      ).default({}),
  });
  if (!(root instanceof TreeCall)) {
    return yield* new ContentTreeEvaluationError({
      cause: root,
      contentKey: input.contentKey,
      message: "The compiled document body must return one element.",
      sourcePath: input.sourcePath,
    });
  }
  return yield* serializeContentTree(root, {
    contentKey: input.contentKey,
    sourcePath: input.sourcePath,
  });
});
