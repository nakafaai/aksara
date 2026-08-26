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
  it("batches empty, repeated, active, and missing source ownership", {
    timeout: 30_000,
  }, async () => {
    const content = await Effect.runPromise(
      loadQuestionContent(corpusRoot, realTryoutSources).pipe(
        Effect.provide(questionLayer)
      )
    );
    const german = content.entries.find(({ sourcePath }) =>
      sourcePath.endsWith("answer.de.mdx")
    );
    const active = content.entries.find(
      ({ bodyKind, questionKey }) =>
        bodyKind === "question" && questionKey.includes("general-reasoning")
    );
    if (!(german && active)) {
      throw new Error("Expected English and German question entries.");
    }
    await expect(
      Effect.runPromise(
        selectQuestionPreviewSources(corpusRoot, [], []).pipe(
          Effect.provide(questionLayer)
        )
      )
    ).resolves.toEqual([]);
    const sources = await Effect.runPromise(
      selectQuestionPreviewSources(
        corpusRoot,
        [
          { appLocale: AppLocaleSchema.make("de"), entry: german },
          { appLocale: AppLocaleSchema.make("de"), entry: german },
          { appLocale: AppLocaleSchema.make("en"), entry: active },
        ],
        content.sources
      ).pipe(Effect.provide(questionLayer))
    );
    const missing = await Effect.runPromise(
      selectQuestionPreviewSources(
        corpusRoot,
        [{ appLocale: AppLocaleSchema.make("en"), entry: active }],
        []
      ).pipe(Effect.flip, Effect.provide(questionLayer))
    );

    expect(sources).toHaveLength(3);
    expect(sources[0]).toMatchObject({
      appLocale: "de",
      entry: { artifactLocale: "de", bodyKind: "answer" },
      family: "question",
    });
    expect(missing).toMatchObject({ reason: "missing" });
  });
});
