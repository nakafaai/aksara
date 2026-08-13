import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { corpusRoot, questionLayer } from "#corpus/test/question-layer";
import { loadTryoutContent } from "#corpus/tryout/content";

describe("tryout content", () => {
  it("projects one discovered question source set into entries and placements", {
    timeout: 30_000,
  }, async () => {
    const content = await Effect.runPromise(
      loadTryoutContent(corpusRoot).pipe(Effect.provide(questionLayer))
    );

    expect(content.entries).toHaveLength(3260);
    expect(content.projection.placements).toHaveLength(840);
    expect(
      content.entries.filter(({ bodyKind }) => bodyKind === "question")
    ).toHaveLength(1580);
    expect(
      content.entries.filter(({ bodyKind }) => bodyKind === "answer")
    ).toHaveLength(1680);
  });
});
