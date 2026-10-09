import { expect, layer } from "@effect/vitest";
import { Effect } from "effect";
import {
  corpusRoot,
  questionLayer,
  realQuestionCorpusLayer,
} from "#corpus/test/question";
import { loadTryoutContent } from "#corpus/tryout/content";

layer(realQuestionCorpusLayer)("tryout content", (it) => {
  it.effect(
    "projects one discovered question source set into entries and placements",
    () =>
      Effect.gen(function* () {
        const repositoryRoot = yield* corpusRoot;
        const content = yield* loadTryoutContent(repositoryRoot).pipe(
          Effect.provide(questionLayer)
        );

        expect(content.entries).toHaveLength(7400);
        expect(content.projection.placements).toHaveLength(5550);
        expect(
          content.entries.filter(({ bodyKind }) => bodyKind === "question")
        ).toHaveLength(1850);
        expect(
          content.entries.filter(({ bodyKind }) => bodyKind === "answer")
        ).toHaveLength(5550);
      }),
    { timeout: 30_000 }
  );
});
