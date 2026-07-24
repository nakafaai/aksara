import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  QuestionAnswerIdentitySchema,
  QuestionBodyIdentitySchema,
  QuestionBodyKindSchema,
  QuestionKeySchema,
  QuestionPromptIdentitySchema,
  QuestionSetKeySchema,
} from "#contracts/question/identity";

const setKey = "question-bank/tryout/indonesia/snbt/general-reasoning/set-1";
const questionKey = `${setKey}/question-1`;
const prompt = {
  bodyKind: "question",
  contentKey: `${questionKey}/question`,
  locale: "en",
  peerContentKey: `${questionKey}/answer`,
  questionKey,
  questionNumber: 1,
  setKey,
} as const;
const answer = {
  ...prompt,
  bodyKind: "answer",
  contentKey: `${questionKey}/answer`,
  peerContentKey: `${questionKey}/question`,
} as const;

describe("question body identity", () => {
  it("decodes exact prompt and answer identities", () => {
    expect(
      [prompt, answer].map((identity) =>
        Schema.decodeUnknownSync(QuestionBodyIdentitySchema)(identity)
      )
    ).toEqual([prompt, answer]);
    expect(QuestionBodyKindSchema.literals).toEqual(["question", "answer"]);
  });

  it("rejects malformed question and set keys", () => {
    expect(
      Either.isLeft(
        Schema.decodeUnknownEither(QuestionKeySchema)(
          "question-bank/tryout/indonesia/snbt/set-1/question-1"
        )
      )
    ).toBe(true);
    expect(
      Either.isLeft(
        Schema.decodeUnknownEither(QuestionSetKeySchema)(
          "question-bank/tryout/indonesia/snbt/general-reasoning/set-0"
        )
      )
    ).toBe(true);
  });

  it("rejects every incoherent prompt identity field", () => {
    const invalid = [
      { ...prompt, contentKey: answer.contentKey },
      { ...prompt, peerContentKey: prompt.contentKey },
      { ...prompt, questionKey: `${setKey}/question-2` },
      { ...prompt, questionNumber: 2 },
    ];

    for (const identity of invalid) {
      expect(
        Either.isLeft(
          Schema.decodeUnknownEither(QuestionPromptIdentitySchema)(identity)
        )
      ).toBe(true);
    }
    expect(
      String(
        Schema.decodeUnknownEither(QuestionPromptIdentitySchema)(invalid[0])
      )
    ).toContain(
      "Expected question body, peer, set, and number identities to agree."
    );
  });

  it("rejects every incoherent answer identity field", () => {
    const invalid = [
      { ...answer, contentKey: prompt.contentKey },
      { ...answer, peerContentKey: answer.contentKey },
      { ...answer, questionKey: `${setKey}/question-2` },
      { ...answer, questionNumber: 2 },
    ];

    for (const identity of invalid) {
      expect(
        Either.isLeft(
          Schema.decodeUnknownEither(QuestionAnswerIdentitySchema)(identity)
        )
      ).toBe(true);
    }
    expect(
      String(
        Schema.decodeUnknownEither(QuestionAnswerIdentitySchema)(invalid[0])
      )
    ).toContain(
      "Expected answer body, peer, set, and number identities to agree."
    );
  });

  it("rejects invented identity fields under strict decoding", () => {
    expect(
      Either.isLeft(
        Schema.decodeUnknownEither(QuestionBodyIdentitySchema, {
          onExcessProperty: "error",
        })({ ...prompt, questionLanguage: "en" })
      )
    ).toBe(true);
  });
});
