import type { QuestionHead } from "@nakafa/aksara-contracts/release/head";
import type { TryoutPlacementSource } from "@nakafa/aksara-contracts/tryout/placement";
import { Effect, Stream } from "effect";

import { bindTryoutHeads } from "#publisher/tryout/bind";

/** Collects one test-owned head-binding stream as plain readonly values. */
export function collectTryoutHeadBindings(
  placements: readonly TryoutPlacementSource[],
  heads: readonly QuestionHead[]
) {
  return bindTryoutHeads(placements, Stream.fromIterable(heads)).pipe(
    Stream.runCollect,
    Effect.map((rows) => [...rows])
  );
}

/** Returns one typed head-binding failure without a FiberFailure wrapper. */
export function rejectTryoutHeadBindings(
  placements: readonly TryoutPlacementSource[],
  heads: readonly QuestionHead[]
) {
  return bindTryoutHeads(placements, Stream.fromIterable(heads)).pipe(
    Stream.runDrain,
    Effect.flip
  );
}
