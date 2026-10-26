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

        expect(exams.map(({ examKey }) => examKey)).toEqual(["snbt", "tka"]);
        expect(sets).toHaveLength(81);
        expect(questions).toHaveLength(1875);
        expect(Arr.flatMap(sets, ({ stimuli }) => stimuli)).toHaveLength(159);
        expect(papers).toHaveLength(21);
        expect(
          Arr.reduce(papers, 0, (total, { sections }) =>
            Arr.reduce(
              sections,
              total,
              (sum, { set }) => sum + set.questions.length
            )
          )
        ).toBe(1875);
      }),
    120_000
  );
});
