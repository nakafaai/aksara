import { NodeServices } from "@effect/platform-node";
import { loadTryoutContent } from "@nakafa/aksara-corpus/tryout/content";
import { Array as Arr, Effect } from "effect";
import {
  checkoutRoot,
  publishedQuestionHeads,
  questionEntries,
} from "#test/question/spec";
import { selectTryoutSlice } from "#test/tryout/slice";

const tryoutPrompts = Arr.filter(
  questionEntries,
  ({ bodyKind }) => bodyKind === "question"
);

/**
 * Loads the real try-out fixture inside the calling Effect test runtime: the
 * published question heads, then the placements of the selected slice.
 */
export const tryoutFixtures: Effect.Effect<
  readonly [
    Effect.Success<ReturnType<typeof publishedQuestionHeads>>,
    Effect.Success<ReturnType<typeof selectTryoutSlice>>["placements"],
  ],
  | Effect.Error<ReturnType<typeof loadTryoutContent>>
  | Effect.Error<ReturnType<typeof publishedQuestionHeads>>
  | Effect.Error<ReturnType<typeof selectTryoutSlice>>
> = Effect.gen(function* () {
  const tryoutHeads = yield* publishedQuestionHeads();
  const tryoutContent = yield* loadTryoutContent(checkoutRoot).pipe(
    Effect.provide(NodeServices.layer)
  );
  const { placements: tryoutPlacements } = yield* selectTryoutSlice(
    tryoutContent.projection,
    tryoutPrompts
  );
  return [tryoutHeads, tryoutPlacements];
});
