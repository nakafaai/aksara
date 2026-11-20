import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { partLabels } from "@nakafa/aksara-corpus/question-bank/item";
import type { QuestionSet } from "@nakafa/aksara-corpus/question-bank/source";
import { Array as Arr, Effect, Result, Schema } from "effect";

/**
 * Whether Nakafa production serves items with parts: it freezes and stores
 * every interaction of a placement, grades each, sums them per placement, and
 * renders each field where the prompt places it, inline gaps and written
 * answers included (T1's plan B). Today it freezes one interaction per
 * question and renders no inline field, so no release may carry an item with
 * parts. T1 sets this to `true` in the change that records plan B live on
 * Nakafa production.
 */
export const NAKAFA_SERVES_PARTS = false;

/** A release would carry items with parts, which Nakafa production cannot serve yet. */
export class PartsReleaseError extends Schema.TaggedError<
  PartsReleaseError,
  { readonly brand: unique symbol }
>()("PartsReleaseError", {
  items: Schema.NonEmptyArray(CorpusSourcePathSchema),
  message: Schema.String,
}) {}

/**
 * Refuses a release whose sets hold an item with parts until Nakafa
 * production serves them, naming every such item. Items that ask a single
 * thing pass either way.
 */
export const requireServableParts = Effect.fn(
  "AksaraPublisher.requireServableParts"
)(function* (sets: readonly QuestionSet[], servesParts: boolean) {
  const items = Arr.flatMap(sets, ({ questions }) =>
    Arr.filterMap(questions, ({ item, sourceRoot }) =>
      Arr.isReadonlyArrayNonEmpty(partLabels(item))
        ? Result.succeed(CorpusSourcePathSchema.make(`${sourceRoot}/item.ts`))
        : Result.failVoid
    )
  );
  if (servesParts || !Arr.isReadonlyArrayNonEmpty(items)) {
    return;
  }
  return yield* new PartsReleaseError({
    items,
    message: `${items.length} item(s) with parts cannot be released until Nakafa production serves them (T1's plan B): ${Arr.join(items, ", ")}. Keep them out of the active try-outs, or set NAKAFA_SERVES_PARTS in packages/publisher/src/assessment/guard.ts once plan B is live.`,
  });
});
