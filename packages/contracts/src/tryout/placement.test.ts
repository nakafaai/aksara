import { Exit, Schema } from "effect";
import { describe, expect, it } from "vitest";

import {
  TryoutPlacementSchema,
  TryoutPlacementSourceSchema,
} from "#contracts/tryout/placement";

const QUESTION_SUFFIX_PATTERN = /\/question$/u;

const placement = {
  answerArtifactLocale: "de",
  answerContentKey:
    "question-bank/tryout/indonesia/snbt/english-language/set-1/question-1/answer",
  appLocale: "de",
  countryKey: "indonesia",
  deliveryLanguage: "en",
  examKey: "snbt",
  languagePolicy: { kind: "fixed", language: "en" },
  questionArtifactLocale: "en",
  questionContentKey:
    "question-bank/tryout/indonesia/snbt/english-language/set-1/question-1/question",
  questionOrder: 1,
  questionSourcePath:
    "packages/corpus/question-bank/tryout/indonesia/snbt/english-language/set-1/question-1",
  rendererDomain: "snbt-plain",
  response: {
    kind: "single-choice",
    options: [
      {
        isCorrect: true,
        label: "Correct",
        optionKey: "option-1",
        order: 1,
      },
      {
        isCorrect: false,
        label: "Wrong",
        optionKey: "option-2",
        order: 2,
      },
    ],
  },
  scope: "server",
  sectionKey: "english-language",
  setKey: "set-1",
  sourceRevision: "test-revision",
  trackKey: "snbt",
} as const;

describe("try-out placement", () => {
  it("keeps German explanations around assessed English content", () => {
    const decoded = Schema.decodeSync(TryoutPlacementSourceSchema)(placement);
    expect(decoded.appLocale).toBe("de");
    expect(decoded.deliveryLanguage).toBe("en");
    expect(decoded.questionArtifactLocale).toBe("en");
    expect(decoded.answerArtifactLocale).toBe("de");
  });

  it("rejects translated assessed-language questions", () => {
    const result = Schema.decodeExit(TryoutPlacementSourceSchema)({
      ...placement,
      questionArtifactLocale: "de",
    });
    expect(Exit.isFailure(result)).toBe(true);
    expect(String(result)).toContain(
      "Placement app, delivery, question, and answer languages must agree."
    );
  });

  it("rejects an explanation outside the app locale", () => {
    expect(
      Exit.isFailure(
        Schema.decodeExit(TryoutPlacementSourceSchema)({
          ...placement,
          answerArtifactLocale: "en",
        })
      )
    ).toBe(true);
  });

  it("uses the app locale throughout non-language sections", () => {
    const decoded = Schema.decodeSync(TryoutPlacementSourceSchema)({
      ...placement,
      answerContentKey:
        "question-bank/tryout/indonesia/snbt/mathematical-reasoning/set-1/question-1/answer",
      deliveryLanguage: "de",
      languagePolicy: { kind: "app-locale" },
      questionArtifactLocale: "de",
      questionContentKey:
        "question-bank/tryout/indonesia/snbt/mathematical-reasoning/set-1/question-1/question",
      questionSourcePath:
        "packages/corpus/question-bank/tryout/indonesia/snbt/mathematical-reasoning/set-1/question-1",
      sectionKey: "mathematical-reasoning",
    });
    expect(decoded.deliveryLanguage).toBe("de");
  });

  it("rejects malformed question suffixes and roots", () => {
    for (const questionContentKey of [
      placement.questionContentKey.replace(QUESTION_SUFFIX_PATTERN, "/prompt"),
      "invalid/question",
    ]) {
      const result = Schema.decodeExit(TryoutPlacementSourceSchema)({
        ...placement,
        questionContentKey,
      });
      expect(Exit.isFailure(result)).toBe(true);
      expect(String(result)).toContain(
        "Placement source, content keys, and authored order must agree."
      );
    }
  });

  it("enforces both policies after artifact hashes are bound", () => {
    const bound = {
      ...placement,
      answerArtifactHash: `sha256:${"a".repeat(64)}`,
      contentHash: "c".repeat(64),
      questionArtifactHash: `sha256:${"b".repeat(64)}`,
    };
    const keyError = Schema.decodeExit(TryoutPlacementSchema)({
      ...bound,
      questionContentKey: bound.questionContentKey.replace(
        QUESTION_SUFFIX_PATTERN,
        "/prompt"
      ),
    });
    const languageError = Schema.decodeExit(TryoutPlacementSchema)({
      ...bound,
      answerArtifactLocale: "en",
    });

    expect(Exit.isFailure(keyError)).toBe(true);
    expect(String(keyError)).toContain(
      "Placement source, content keys, and authored order must agree."
    );
    expect(Exit.isFailure(languageError)).toBe(true);
    expect(String(languageError)).toContain(
      "Placement app, delivery, question, and answer languages must agree."
    );
  });
});
