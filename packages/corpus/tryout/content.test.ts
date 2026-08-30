import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { corpusRoot, questionLayer } from "#corpus/test/question-layer";
import { loadTryoutContent } from "#corpus/tryout/content";

describe("tryout content", () => {
  it.effect(
    "projects one discovered question source set into entries and placements",
    () =>
      Effect.gen(function* () {
        const content = yield* loadTryoutContent(corpusRoot).pipe(
          Effect.provide(questionLayer)
        );

        expect(content.entries).toHaveLength(4840);
        expect(content.projection.placements).toHaveLength(1320);
        expect(
          content.entries.filter(({ bodyKind }) => bodyKind === "question")
        ).toHaveLength(2320);
        expect(
          content.entries.filter(({ bodyKind }) => bodyKind === "answer")
        ).toHaveLength(2520);
      }),
    { timeout: 30_000 }
  );
});
