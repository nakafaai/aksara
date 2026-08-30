import { describe, expect, it } from "@effect/vitest";
import { Effect, Exit, Schema } from "effect";

import { ArtifactLocaleSchema } from "#contracts/locale";
import {
  canonicalQuestionBlueprint,
  QuestionItemSchema,
  QuestionResponseLocaleMissingError,
  QuestionResponseSourceSchema,
  questionResponseFor,
} from "#contracts/question/item";

const singleChoice = {
  kind: "single-choice",
  options: [
    { isCorrect: true, label: [{ kind: "text", text: "A" }] },
    { isCorrect: false, label: [{ kind: "text", text: "B" }] },
  ],
} as const;
const multipleChoice = {
  kind: "multiple-choice",
  options: [
    { isCorrect: true, label: [{ kind: "text", text: "A" }] },
    { isCorrect: true, label: [{ kind: "text", text: "B" }] },
    { isCorrect: false, label: [{ kind: "text", text: "C" }] },
  ],
} as const;
const category = {
  categories: [
    [{ kind: "text", text: "True" }],
    [{ kind: "text", text: "False" }],
  ],
  kind: "category",
  statements: [
    { correctCategoryOrder: 1, label: [{ kind: "text", text: "Statement A" }] },
    { correctCategoryOrder: 2, label: [{ kind: "text", text: "Statement B" }] },
  ],
} as const;

describe("question item", () => {
  it("canonicalizes the complete editorial blueprint in stable order", () => {
    expect(
      canonicalQuestionBlueprint({
        cognitiveLevel: "reasoning",
        contentDomain: "algebra",
        topic: "functions",
      })
    ).toEqual({
      cognitiveLevel: "reasoning",
      contentDomain: "algebra",
      topic: "functions",
    });
  });

  it("accepts every official response source format", () => {
    for (const response of [singleChoice, multipleChoice, category]) {
      expect(
        Schema.decodeUnknownSync(QuestionResponseSourceSchema)(response)
      ).toEqual(response);
    }
  });

  it("rejects invalid single and multiple choice answer keys", () => {
    for (const response of [
      { kind: "single-choice", options: [singleChoice.options[0]] },
      {
        kind: "single-choice",
        options: singleChoice.options.map((option) => ({
          ...option,
          isCorrect: true,
        })),
      },
      {
        kind: "multiple-choice",
        options: multipleChoice.options.map((option) => ({
          ...option,
          isCorrect: true,
        })),
      },
      { kind: "multiple-choice", options: singleChoice.options },
    ]) {
      expect(
        Exit.isFailure(
          Schema.decodeUnknownExit(QuestionResponseSourceSchema)(response)
        )
      ).toBe(true);
    }
  });

  it("rejects invalid category structure", () => {
    for (const response of [
      { ...category, categories: [[{ kind: "text", text: "Only" }]] },
      { ...category, statements: [] },
      {
        ...category,
        statements: [
          {
            correctCategoryOrder: 3,
            label: [{ kind: "text", text: "Out of range" }],
          },
        ],
      },
    ]) {
      expect(
        Exit.isFailure(
          Schema.decodeUnknownExit(QuestionResponseSourceSchema)(response)
        )
      ).toBe(true);
    }
  });

  it("requires localized responses to preserve format and answer key", () => {
    const valid = Schema.decodeUnknownSync(QuestionItemSchema)({
      responses: {
        en: singleChoice,
        id: {
          ...singleChoice,
          options: [
            { isCorrect: true, label: [{ kind: "text", text: "A (ID)" }] },
            { isCorrect: false, label: [{ kind: "text", text: "B (ID)" }] },
          ],
        },
      },
      stimulusKey: "shared-passage",
    });
    expect(valid.stimulusKey).toBe("shared-passage");

    for (const responses of [
      {},
      { en: singleChoice, id: multipleChoice },
      {
        en: singleChoice,
        id: {
          ...singleChoice,
          options: [...singleChoice.options].reverse(),
        },
      },
    ]) {
      expect(
        Exit.isFailure(
          Schema.decodeUnknownExit(QuestionItemSchema)({ responses })
        )
      ).toBe(true);
    }
  });

  it.effect("freezes option and category identities once", () =>
    Effect.gen(function* () {
      const item = yield* Schema.decodeUnknownEffect(QuestionItemSchema)({
        responses: { en: category },
      });
      const response = yield* questionResponseFor(
        item,
        ArtifactLocaleSchema.make("en")
      );

      expect(response).toEqual({
        categories: [
          {
            categoryKey: "category-1",
            label: [{ kind: "text", text: "True" }],
            order: 1,
          },
          {
            categoryKey: "category-2",
            label: [{ kind: "text", text: "False" }],
            order: 2,
          },
        ],
        kind: "category",
        statements: [
          {
            correctCategoryKey: "category-1",
            label: [{ kind: "text", text: "Statement A" }],
            order: 1,
            statementKey: "statement-1",
          },
          {
            correctCategoryKey: "category-2",
            label: [{ kind: "text", text: "Statement B" }],
            order: 2,
            statementKey: "statement-2",
          },
        ],
      });
    })
  );

  it.effect("returns a typed failure for a missing response locale", () =>
    Effect.gen(function* () {
      const item = yield* Schema.decodeUnknownEffect(QuestionItemSchema)({
        responses: { en: singleChoice },
      });
      const error = yield* questionResponseFor(
        item,
        ArtifactLocaleSchema.make("de")
      ).pipe(Effect.flip);

      expect(error).toBeInstanceOf(QuestionResponseLocaleMissingError);
      expect(error.artifactLocale).toBe("de");
    })
  );
});
