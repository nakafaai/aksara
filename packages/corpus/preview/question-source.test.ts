import { describe, expect, it } from "@effect/vitest";
import { AppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { Effect } from "effect";
import { selectQuestionPreviewSources } from "#corpus/preview/question-source";
import { loadQuestionContent } from "#corpus/question-bank/content";
import {
  corpusRoot,
  questionLayer,
  realTryoutSources,
} from "#corpus/test/question-layer";

describe("question preview source", () => {
  it.effect(
    "batches empty, repeated, active, and missing source ownership",
    () =>
      Effect.gen(function* () {
        const content = yield* loadQuestionContent(
          corpusRoot,
          realTryoutSources
        ).pipe(Effect.provide(questionLayer));
        const german = yield* Effect.fromNullishOr(
          content.entries.find(({ sourcePath }) =>
            sourcePath.endsWith("answer.de.mdx")
          )
        );
        const active = yield* Effect.fromNullishOr(
          content.entries.find(
            ({ bodyKind, questionKey }) =>
              bodyKind === "question" &&
              questionKey.includes("general-reasoning")
          )
        );
        expect(
          yield* selectQuestionPreviewSources(corpusRoot, [], []).pipe(
            Effect.provide(questionLayer)
          )
        ).toEqual([]);
        const sources = yield* selectQuestionPreviewSources(
          corpusRoot,
          [
            { appLocale: AppLocaleSchema.make("de"), entry: german },
            { appLocale: AppLocaleSchema.make("de"), entry: german },
            { appLocale: AppLocaleSchema.make("en"), entry: active },
          ],
          content.sources
        ).pipe(Effect.provide(questionLayer));
        const missing = yield* selectQuestionPreviewSources(
          corpusRoot,
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
