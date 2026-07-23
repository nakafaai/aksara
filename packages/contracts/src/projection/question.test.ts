import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";
import { ContentKeySchema } from "#contracts/ids";
import {
  canonicalizeQuestionProjection,
  makeQuestionBodyProjection,
  QuestionAnswerProjectionSchema,
  QuestionBodyProjectionSchema,
  QuestionChoicesSchema,
  QuestionKeySchema,
  QuestionPromptProjectionSchema,
  QuestionSetKeySchema,
} from "#contracts/projection/question";

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
function promptProjection(locale: "en" | "id") {
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
function answerProjection(locale: "en" | "id") {
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

  it("rejects mismatched question, peer, set, and numeric identities", () => {
    const prompt = promptProjection("en");
    const answer = answerProjection("en");
    const invalidPrompts = [
      { ...prompt, questionKey: `${setKey}/question-2` },
      { ...prompt, contentKey: `${questionKey}/answer` },
      { ...prompt, peerContentKey: `${questionKey}/question` },
      { ...prompt, questionNumber: 2 },
    ];
    const invalidAnswers = [
      { ...answer, questionKey: `${setKey}/question-2` },
      { ...answer, contentKey: `${questionKey}/question` },
      { ...answer, peerContentKey: `${questionKey}/answer` },
      { ...answer, questionNumber: 2 },
    ];

    for (const value of invalidPrompts) {
      expect(
        Either.isLeft(
          Schema.decodeUnknownEither(QuestionPromptProjectionSchema)(value)
        )
      ).toBe(true);
    }
    for (const value of invalidAnswers) {
      expect(
        Either.isLeft(
          Schema.decodeUnknownEither(QuestionAnswerProjectionSchema)(value)
        )
      ).toBe(true);
    }
    const promptError = Schema.decodeUnknownEither(
      QuestionPromptProjectionSchema
    )(invalidPrompts[0]);
    const answerError = Schema.decodeUnknownEither(
      QuestionAnswerProjectionSchema
    )(invalidAnswers[0]);
    expect(
      Either.isLeft(promptError) ? String(promptError.left) : ""
    ).toContain(
      "Expected question body, peer, set, and number identities to agree."
    );
    expect(
      Either.isLeft(answerError) ? String(answerError.left) : ""
    ).toContain(
      "Expected answer body, peer, set, and number identities to agree."
    );
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
