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

/** Loads the real try-out fixture inside the calling Effect test runtime. */
export const tryoutFixtures: Effect.Effect<
  {
    readonly tryoutHeads: Awaited<ReturnType<typeof publishedQuestionHeads>>;
    readonly tryoutPlacements: ReturnType<
      typeof selectTryoutSlice
    >["placements"];
  },
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
