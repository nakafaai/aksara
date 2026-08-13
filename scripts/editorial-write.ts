import { resolve } from "node:path";
import { parseArgs } from "node:util";

import { NodeContext, NodeRuntime } from "@effect/platform-node";
import { writeEditorialReviewCatalog } from "@nakafa/aksara-publisher/editorial/write";
import { Effect, Schema } from "effect";

/** The editorial writer requires exactly one temporary record-list input. */
export class EditorialReviewArgumentError extends Schema.TaggedError<EditorialReviewArgumentError>()(
  "EditorialReviewArgumentError",
  { positionals: Schema.Array(Schema.String) }
) {}

/** Resolves the one explicit operator input without retaining it as content. */
export const makeEditorialReviewWriteProgram = Effect.fn(
  "AksaraScripts.writeEditorialReview"
)(function* (positionals: readonly string[]) {
  const [inputPath] = positionals;
  if (inputPath === undefined || positionals.length !== 1) {
    return yield* new EditorialReviewArgumentError({ positionals });
  }
  const result = yield* writeEditorialReviewCatalog({
    inputPath: resolve(inputPath),
    repositoryRoot: resolve(import.meta.dirname, ".."),
  });
  yield* Effect.logInfo("Editorial review catalog written", result);
});

const { positionals: commandPositionals } = parseArgs({
  allowPositionals: true,
  strict: true,
});
NodeRuntime.runMain(
  Effect.scoped(makeEditorialReviewWriteProgram(commandPositionals)).pipe(
    Effect.provide(NodeContext.layer)
  )
);
