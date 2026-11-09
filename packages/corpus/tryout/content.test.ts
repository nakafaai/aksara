import { NodeServices } from "@effect/platform-node";
import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Effect } from "effect";
import { corpusRoot } from "#corpus/test/root";
import { loadTryoutContent } from "#corpus/tryout/content";

/** Loads the whole authored try-out bank of this checkout. */
const content = Effect.flatMap(corpusRoot, loadTryoutContent).pipe(
  Effect.provide(NodeServices.layer)
);

describe("loadTryoutContent", () => {
  it.effect(
    "reads, checks, and plans every question of every active exam",
    () =>
      Effect.gen(function* () {
        const { exams, papers, sets } = yield* content;
        const questions = Arr.flatMap(sets, (set) => set.questions);

        expect(Arr.map(exams, ({ examKey }) => examKey)).toEqual([
          "snbt",
          "tka",
          "entrance-examination",
        ]);
        expect(sets).toHaveLength(87);
        expect(questions).toHaveLength(1974);
        expect(Arr.flatMap(sets, ({ stimuli }) => stimuli)).toHaveLength(348);
        expect(papers).toHaveLength(27);
        expect(
          Arr.reduce(papers, 0, (total, { sections }) =>
            Arr.reduce(
              sections,
              total,
              (sum, { set }) => sum + set.questions.length
            )
          )
        ).toBe(1974);
      }),
    120_000
  );
});
