import { NodeServices } from "@effect/platform-node";
import { loadTryoutContent } from "@nakafa/aksara-corpus/tryout/content";
import { Effect } from "effect";
import {
  checkoutRoot,
  publishedQuestionHeads,
  questionEntries,
} from "#test/question/spec";
import { selectTryoutSlice } from "#test/tryout-slice";

const tryoutPrompts = questionEntries.filter(
  ({ bodyKind }) => bodyKind === "question"
);

interface TryoutFixtures {
  readonly tryoutHeads: Awaited<ReturnType<typeof publishedQuestionHeads>>;
  readonly tryoutPlacements: ReturnType<typeof selectTryoutSlice>["placements"];
}

/** Loads the real try-out fixture inside the calling Effect test runtime. */
export const tryoutFixtures: Effect.Effect<
  TryoutFixtures,
  Effect.Error<ReturnType<typeof loadTryoutContent>>
> = Effect.gen(function* () {
  const tryoutHeads = yield* Effect.promise(publishedQuestionHeads);
  const tryoutContent = yield* loadTryoutContent(checkoutRoot).pipe(
    Effect.provide(NodeServices.layer)
  );
  const { placements: tryoutPlacements } = selectTryoutSlice(
    tryoutContent.projection,
    tryoutPrompts
  );
  return { tryoutHeads, tryoutPlacements };
});
