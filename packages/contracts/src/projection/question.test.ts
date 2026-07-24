import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";
import type { ContentLocale } from "#contracts/content";
import { ContentKeySchema } from "#contracts/ids";
import {
  canonicalizeQuestionProjection,
  makeQuestionBodyProjection,
  QuestionAnswerProjectionSchema,
  QuestionBodyProjectionSchema,
  QuestionChoicesSchema,
  QuestionPromptProjectionSchema,
} from "#contracts/projection/question";
import {
  QuestionKeySchema,
  QuestionSetKeySchema,
} from "#contracts/question/identity";

const questionKey = QuestionKeySchema.make(
  "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1"
);
const setKey = QuestionSetKeySchema.make(
  "question-bank/tryout/indonesia/snbt/general-reasoning/set-1"
);
const metadata = {
  authors: [{ name: "Nakafa" }],
  date: "2026-07-01",
  title: "Question 1",
};
const choices = Schema.decodeUnknownSync(QuestionChoicesSchema)({
  en: [
    { label: "A", value: true },
    { label: "B", value: false },
  ],
  id: [
    { label: "A", value: false },
    { label: "B", value: true },
  ],
});

/** Builds one strict prompt projection for the selected locale. */
function promptProjection(locale: ContentLocale) {
  return Schema.decodeUnknownSync(QuestionPromptProjectionSchema)(
    makeQuestionBodyProjection({
      bodyKind: "question",
      choices,
      contentKey: ContentKeySchema.make(`${questionKey}/question`),
      locale,
      metadata,
      peerContentKey: ContentKeySchema.make(`${questionKey}/answer`),
      questionKey,
      questionNumber: 1,
      setKey,
    })
  );
}

/** Builds one strict answer projection for the selected locale. */
function answerProjection(locale: ContentLocale) {
  return Schema.decodeUnknownSync(QuestionAnswerProjectionSchema)(
    makeQuestionBodyProjection({
      bodyKind: "answer",
      choices,
      contentKey: ContentKeySchema.make(`${questionKey}/answer`),
      locale,
      metadata,
      peerContentKey: ContentKeySchema.make(`${questionKey}/question`),
      questionKey,
      questionNumber: 1,
      setKey,
    })
  );
}

describe("question projection", () => {
  it("projects only locale choices on prompts and none on answers", () => {
    const prompt = promptProjection("id");
    const answer = answerProjection("en");

    expect(prompt.choices).toEqual(choices.id);
    expect("choices" in answer).toBe(false);
    expect(
      [prompt, answer].map((value) =>
        Schema.decodeUnknownSync(QuestionBodyProjectionSchema)(value)
      )
    ).toEqual([prompt, answer]);
  });

  it("canonically serializes both body variants", () => {
    for (const value of [promptProjection("en"), answerProjection("id")]) {
      expect(JSON.parse(canonicalizeQuestionProjection(value))).toEqual(value);
    }
  });

  it("requires exactly one correct choice in every locale", () => {
    for (const localized of [
      [{ label: "A", value: false }],
      [
        { label: "A", value: true },
        { label: "B", value: true },
      ],
    ]) {
      const result = Schema.decodeUnknownEither(QuestionChoicesSchema)({
        en: localized,
        id: choices.id,
      });
      expect(Either.isLeft(result)).toBe(true);
      expect(Either.isLeft(result) ? String(result.left) : "").toContain(
        "Expected exactly one correct choice."
      );
    }
  });

  it("rejects invented metadata and answer choices", () => {
    const prompt = promptProjection("en");
    const answer = answerProjection("en");
    const decode = Schema.decodeUnknownEither(QuestionBodyProjectionSchema, {
      onExcessProperty: "error",
    });

    expect(Either.isLeft(decode({ ...prompt, description: "Invented" }))).toBe(
      true
    );
    expect(Either.isLeft(decode({ ...answer, choices: choices.en }))).toBe(
      true
    );
  });
});
