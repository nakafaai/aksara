import { describe, expect, it } from "@effect/vitest";
import type { QuestionEntry } from "@nakafa/aksara-corpus/question-bank/content";
import { Effect, Path } from "effect";
import {
  loadQuestionDocument,
  makeQuestionProjectionFromSource,
} from "#publisher/question/document";
import { testFileLayer } from "#test/files";
import {
  checkoutRoot,
  questionChoices,
  questionEntries,
  sourceByPath,
} from "#test/question/spec";

const promptEntry = questionEntries.find(
  ({ bodyKind, artifactLocale }) =>
    bodyKind === "question" && artifactLocale === "en"
);
const answerEntry = questionEntries.find(
  ({ bodyKind, artifactLocale }) =>
    bodyKind === "answer" && artifactLocale === "en"
);

/** Requires the paired English question and answer registry fixtures. */
const requireEntries = Effect.fn("QuestionDocumentTest.requireEntries")(
  function* () {
    const prompt = yield* Effect.fromNullishOr(promptEntry);
    const answer = yield* Effect.fromNullishOr(answerEntry);
    return { answer, prompt };
  }
);

/** Loads one selected question body through the deterministic test filesystem. */
const load = Effect.fn("QuestionDocumentTest.load")((entry: QuestionEntry) =>
  loadQuestionDocument(checkoutRoot, entry, questionChoices).pipe(
    Effect.provide([testFileLayer(sourceByPath), Path.layer])
  )
);

describe("question document", () => {
  it.effect(
    "maps a missing registry-owned source to its typed checkout error",
    () =>
      Effect.gen(function* () {
        const { prompt } = yield* requireEntries();
        const error = yield* loadQuestionDocument(
          checkoutRoot,
          prompt,
          questionChoices
        ).pipe(
          Effect.provide([testFileLayer(new Map()), Path.layer]),
          Effect.flip
        );

        expect(error).toMatchObject({
          _tag: "QuestionSourceError",
          checkoutRoot,
        });
      })
  );

  it.effect("rejects malformed or invented authored metadata", () =>
    Effect.gen(function* () {
      const { prompt } = yield* requireEntries();
      const source = yield* load(prompt);
      const errors = yield* Effect.all(
        [
          {},
          { authors: [], date: "2026-01-01", extra: true, title: "Test" },
        ].map((metadata) =>
          makeQuestionProjectionFromSource(source, metadata).pipe(Effect.flip)
        )
      );

      expect(
        errors.every(
          (error) =>
            error._tag === "QuestionMetadataError" &&
            error.sourcePath === prompt.sourcePath
        )
      ).toBe(true);
    })
  );

  it.effect(
    "keeps canonical artifactLocale choices only on the prompt projection",
    () =>
      Effect.gen(function* () {
        const { answer: answerEntryValue, prompt: promptEntryValue } =
          yield* requireEntries();
        const [promptSource, answerSource] = yield* Effect.all([
          load(promptEntryValue),
          load(answerEntryValue),
        ]);
        const [prompt, answer] = yield* Effect.all([
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
        ]);

        expect(prompt).toMatchObject({
          bodyKind: "question",
          choices: questionChoices.en,
          peerContentKey: answerEntryValue.contentKey,
        });
        expect(answer).toMatchObject({
          bodyKind: "answer",
          peerContentKey: promptEntryValue.contentKey,
        });
        expect("choices" in answer).toBe(false);
      })
  );
});
