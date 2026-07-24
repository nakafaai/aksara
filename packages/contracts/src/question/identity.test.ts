import { Either, ParseResult, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  QuestionAnswerIdentitySchema,
  QuestionBodyIdentitySchema,
  QuestionBodyKindSchema,
  QuestionKeySchema,
  QuestionPromptIdentitySchema,
  QuestionSetKeySchema,
  QuestionSourcePathSchema,
  questionBankKey,
  questionKeyParts,
  questionSetKeyParts,
  questionSourcePathParts,
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

/** Formats one expected strict schema failure for message assertions. */
function formatFailure(result: Either.Either<unknown, ParseResult.ParseError>) {
  if (Either.isRight(result)) {
    throw new Error("Expected schema decoding to fail.");
  }
  return ParseResult.TreeFormatter.formatErrorSync(result.left);
}

describe("question body identity", () => {
  it("decodes exact prompt and answer identities", () => {
    expect(
      [prompt, answer].map((identity) =>
        Schema.decodeUnknownSync(QuestionBodyIdentitySchema)(identity)
      )
    ).toEqual([prompt, answer]);
    expect(QuestionBodyKindSchema.literals).toEqual(["question", "answer"]);
    expect(
      questionKeyParts(Schema.decodeUnknownSync(QuestionKeySchema)(questionKey))
    ).toEqual({
      countryKey: "indonesia",
      examKey: "snbt",
      intermediateBankKeys: [],
      questionNumber: 1,
      questionSetKey: setKey,
      sectionKey: "general-reasoning",
      setKey: "set-1",
    });
    expect(
      questionBankKey(
        Schema.decodeUnknownSync(QuestionSetKeySchema)(
          "question-bank/tryout/germany/abitur/gymnasium/mathematics/foundation-set"
        )
      )
    ).toBe("question-bank/tryout/germany/abitur/gymnasium/mathematics");
    expect(
      questionSetKeyParts(
        Schema.decodeUnknownSync(QuestionSetKeySchema)(
          "question-bank/tryout/germany/abitur/gymnasium/mathematics/foundation-set"
        )
      )
    ).toEqual({
      countryKey: "germany",
      examKey: "abitur",
      intermediateBankKeys: ["gymnasium"],
      sectionKey: "mathematics",
      setKey: "foundation-set",
    });
  });

  it("derives body and choice source identities from one grammar", () => {
    const bodyPath = Schema.decodeUnknownSync(QuestionSourcePathSchema)(
      `packages/corpus/${questionKey}/answer.id.mdx`
    );
    const choicePath = Schema.decodeUnknownSync(QuestionSourcePathSchema)(
      `packages/corpus/${questionKey}/choices.ts`
    );

    expect(questionSourcePathParts(bodyPath)).toMatchObject({
      bodyKind: "answer",
      contentKey: `${questionKey}/answer`,
      countryKey: "indonesia",
      examKey: "snbt",
      kind: "body",
      locale: "id",
      questionKey,
      questionNumber: 1,
      sectionKey: "general-reasoning",
      setKey: "set-1",
    });
    expect(questionSourcePathParts(choicePath)).toMatchObject({
      countryKey: "indonesia",
      examKey: "snbt",
      kind: "choices",
      questionKey,
      questionNumber: 1,
      sectionKey: "general-reasoning",
      setKey: "set-1",
    });
  });

  it("rejects malformed question source files through the shared grammar", () => {
    const longHierarchy = Array.from({ length: 5 }, () => "a".repeat(110)).join(
      "/"
    );
    const invalidPaths = [
      "packages/corpus/not-a-question/choices.ts",
      `packages/corpus/${questionKey}/notes.ts`,
      `packages/corpus/${questionKey}/question.mdx`,
      `packages/corpus/${questionKey}/prompt.en.mdx`,
      `packages/corpus/${questionKey}/question.de.mdx`,
      `packages/corpus/question-bank/tryout/germany/abitur/${longHierarchy}/mathematics/set-1/question-1/choices.ts`,
    ];

    for (const sourcePath of invalidPaths) {
      expect(
        Either.isLeft(
          Schema.decodeUnknownEither(QuestionSourcePathSchema)(sourcePath)
        )
      ).toBe(true);
    }
    expect(
      formatFailure(
        Schema.decodeUnknownEither(QuestionSourcePathSchema)(invalidPaths[1])
      )
    ).toContain("Invalid try-out question source path.");
  });

  it("rejects malformed question and set keys", () => {
    expect(
      Schema.decodeUnknownSync(QuestionKeySchema)(
        "question-bank/tryout/germany/abitur/mathematics/foundation-set/question-12"
      )
    ).toBe(
      "question-bank/tryout/germany/abitur/mathematics/foundation-set/question-12"
    );
    expect(
      Schema.decodeUnknownSync(QuestionSetKeySchema)(
        "question-bank/tryout/singapore/a-levels/mathematics/practice-set"
      )
    ).toBe("question-bank/tryout/singapore/a-levels/mathematics/practice-set");
    expect(
      formatFailure(
        Schema.decodeUnknownEither(QuestionKeySchema)(
          "question-bank/tryout/indonesia/snbt/set-1/question-1"
        )
      )
    ).toContain("Invalid try-out question key.");
    expect(
      formatFailure(
        Schema.decodeUnknownEither(QuestionSetKeySchema)(
          "question-bank/tryout/indonesia/snbt/General-Reasoning/set-1"
        )
      )
    ).toContain("Invalid try-out question-set key.");
    expect(
      Either.isLeft(
        Schema.decodeUnknownEither(QuestionSetKeySchema)(
          "other/tryout/indonesia/snbt/general-reasoning/set-1"
        )
      )
    ).toBe(true);
    expect(
      Either.isLeft(
        Schema.decodeUnknownEither(QuestionKeySchema)(
          "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-0"
        )
      )
    ).toBe(true);
    expect(
      Either.isLeft(
        Schema.decodeUnknownEither(QuestionKeySchema)(
          "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-9999999999999999"
        )
      )
    ).toBe(true);
    expect(
      Either.isLeft(
        Schema.decodeUnknownEither(QuestionKeySchema)(
          "question-bank/tryout/indonesia/snbt/general-reasoning/question-1/question-2"
        )
      )
    ).toBe(true);
    expect(
      Either.isLeft(Schema.decodeUnknownEither(QuestionKeySchema)("invalid"))
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
