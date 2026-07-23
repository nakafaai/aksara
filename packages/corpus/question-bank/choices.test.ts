import { Effect, Either, Schema } from "effect";
import { describe, expect, it } from "vitest";

import { QuestionChoicesSchema } from "#corpus/question-bank/choices";
import { importCorpusModules } from "#corpus/test/imports";

const correctChoice = { label: "Correct", value: true };
const incorrectChoice = { label: "Incorrect", value: false };

describe("question choices", () => {
  it("accepts exactly one correct answer for every supported locale", () => {
    const decoded = Schema.decodeUnknownSync(QuestionChoicesSchema)({
      en: [correctChoice, incorrectChoice],
      id: [incorrectChoice, correctChoice],
    });

    expect(decoded.en).toHaveLength(2);
    expect(decoded.id).toHaveLength(2);
  });

  it.each([
    { choices: [incorrectChoice, incorrectChoice], name: "no correct answer" },
    { choices: [correctChoice, correctChoice], name: "two correct answers" },
  ])("rejects $name", ({ choices }) => {
    const result = Schema.decodeUnknownEither(QuestionChoicesSchema)({
      en: choices,
      id: [correctChoice, incorrectChoice],
    });

    expect(Either.isLeft(result)).toBe(true);
  });

  it("requires every locale and reports its answer invariant", () => {
    const incomplete = Schema.decodeUnknownEither(QuestionChoicesSchema)({
      en: [correctChoice, incorrectChoice],
    });
    /** Decodes the deliberately invalid zero-answer locale. */
    const invalid = () =>
      Schema.decodeUnknownSync(QuestionChoicesSchema)({
        en: [incorrectChoice],
        id: [correctChoice, incorrectChoice],
      });

    expect(Either.isLeft(incomplete)).toBe(true);
    expect(invalid).toThrow("Expected exactly one correct choice.");
  });

  it("loads every authored question-choice module", {
    timeout: 30_000,
  }, async () => {
    const files = await Effect.runPromise(
      importCorpusModules("question-bank/**/*.ts", ["question-bank/choices.ts"])
    );

    expect(files).toHaveLength(840);
  });
});
