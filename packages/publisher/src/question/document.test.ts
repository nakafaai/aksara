import { Path } from "@effect/platform";
import type { QuestionEntry } from "@nakafa/aksara-corpus/question-bank/registry";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import {
  loadQuestionDocument,
  makeQuestionProjectionFromSource,
} from "#publisher/question/document";
import { testFileLayer } from "#test/files";
import { checkoutRoot, questionEntries, sourceByPath } from "#test/question";

const promptEntry = questionEntries.find(
  ({ bodyKind, locale }) => bodyKind === "question" && locale === "en"
);
const answerEntry = questionEntries.find(
  ({ bodyKind, locale }) => bodyKind === "answer" && locale === "en"
);
if (!(promptEntry && answerEntry)) {
  throw new Error("Expected the real English question and answer entries.");
}

/** Loads one selected question body through the deterministic test filesystem. */
function load(entry: QuestionEntry) {
  return loadQuestionDocument(checkoutRoot, entry).pipe(
    Effect.provide(testFileLayer(sourceByPath)),
    Effect.provide(Path.layer)
  );
}

describe("question document", () => {
  it("maps a missing registry-owned source to its typed checkout error", async () => {
    const error = await Effect.runPromise(
      loadQuestionDocument(checkoutRoot, promptEntry).pipe(
        Effect.provide(testFileLayer(new Map())),
        Effect.provide(Path.layer),
        Effect.flip
      )
    );

    expect(error).toMatchObject({
      _tag: "QuestionSourceError",
      checkoutRoot,
    });
  });

  it("rejects malformed or invented authored metadata", async () => {
    const source = await Effect.runPromise(load(promptEntry));
    const errors = await Promise.all(
      [{}, { authors: [], date: "2026-01-01", extra: true, title: "Test" }].map(
        (metadata) =>
          Effect.runPromise(
            makeQuestionProjectionFromSource(source, metadata).pipe(Effect.flip)
          )
      )
    );

    expect(
      errors.every(
        (error) =>
          error._tag === "QuestionMetadataError" &&
          error.sourcePath === promptEntry.sourcePath
      )
    ).toBe(true);
  });

  it("keeps canonical locale choices only on the prompt projection", async () => {
    const [promptSource, answerSource] = await Effect.runPromise(
      Effect.all([load(promptEntry), load(answerEntry)])
    );
    const [prompt, answer] = await Effect.runPromise(
      Effect.all([
        makeQuestionProjectionFromSource(promptSource, {
          authors: [{ name: "Nabil Akbarazzima Fatih" }],
          date: "2026-01-01",
          title: "Problem 1",
        }),
        makeQuestionProjectionFromSource(answerSource, {
          authors: [{ name: "Nabil Akbarazzima Fatih" }],
          date: "2026-01-01",
          title: "Solution to Problem 1",
        }),
      ])
    );

    expect(prompt).toMatchObject({
      bodyKind: "question",
      choices: promptEntry.choices.en,
      peerContentKey: answerEntry.contentKey,
    });
    expect(answer).toMatchObject({
      bodyKind: "answer",
      peerContentKey: promptEntry.contentKey,
    });
    expect("choices" in answer).toBe(false);
  });
});
