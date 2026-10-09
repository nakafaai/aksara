import { expect, layer } from "@effect/vitest";
import { AppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { Array as Arr, Effect } from "effect";
import { selectQuestionPreviewSources } from "#corpus/preview/question/source";
import { loadQuestionContent } from "#corpus/question-bank/content";
import {
  corpusRoot,
  questionLayer,
  realQuestionCorpusLayer,
  realTryoutSources,
} from "#corpus/test/question";

layer(realQuestionCorpusLayer)("question preview source", (it) => {
  it.effect(
    "batches empty, repeated, active, and missing source ownership",
    () =>
      Effect.gen(function* () {
        const root = yield* corpusRoot;
        const tryoutSources = yield* realTryoutSources;
        const content = yield* loadQuestionContent(root, tryoutSources).pipe(
          Effect.provide(questionLayer)
        );
        const german = yield* Effect.fromOption(
          Arr.findFirst(content.entries, ({ sourcePath }) =>
            sourcePath.endsWith("answer.de.mdx")
          )
        );
        const active = yield* Effect.fromOption(
          Arr.findFirst(
            content.entries,
            ({ bodyKind, questionKey }) =>
              bodyKind === "question" &&
              questionKey.includes("general-reasoning")
          )
        );
        expect(
          yield* selectQuestionPreviewSources(root, [], []).pipe(
            Effect.provide(questionLayer)
          )
        ).toEqual([]);
        const sources = yield* selectQuestionPreviewSources(
          root,
          [
            { appLocale: AppLocaleSchema.make("de"), entry: german },
            { appLocale: AppLocaleSchema.make("de"), entry: german },
            { appLocale: AppLocaleSchema.make("en"), entry: active },
          ],
          content.sources
        ).pipe(Effect.provide(questionLayer));
        const missing = yield* selectQuestionPreviewSources(
          root,
          [{ appLocale: AppLocaleSchema.make("en"), entry: active }],
          []
        ).pipe(Effect.flip, Effect.provide(questionLayer));

        expect(sources).toHaveLength(3);
        expect(sources[0]).toMatchObject({
          appLocale: "de",
          entry: { artifactLocale: "de", bodyKind: "answer" },
          family: "question",
        });
        expect(missing).toMatchObject({ reason: "missing" });
      }),
    { timeout: 30_000 }
  );
});
