import { Exit, Schema } from "effect";
import { describe, expect, it } from "vitest";

import {
  canonicalQuestionResponse,
  canonicalQuestionResponseStructure,
  QuestionResponseSchema,
} from "#contracts/question/response";

const single = {
  kind: "single-choice",
  options: [
    {
      isCorrect: true,
      label: "A",
      optionKey: "option-1",
      order: 1,
    },
    {
      isCorrect: false,
      label: "B",
      optionKey: "option-2",
      order: 2,
    },
  ],
} as const;

describe("question response", () => {
  it("accepts and canonically orders a frozen response", () => {
    const decoded = Schema.decodeSync(QuestionResponseSchema)(single);
    expect(canonicalQuestionResponse(decoded)).toEqual(single);
  });

  it("preserves Markdown labels while structure excludes localized content", () => {
    const response = Schema.decodeSync(QuestionResponseSchema)({
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Nilai $x + 1$ berasal dari$$x = 2$$",
          optionKey: "option-1",
          order: 1,
        },
        single.options[1],
      ],
    });

    expect(canonicalQuestionResponse(response)).toEqual(response);
    expect(canonicalQuestionResponseStructure(response)).toEqual({
      kind: "single-choice",
      options: [
        { isCorrect: true, optionKey: "option-1", order: 1 },
        { isCorrect: false, optionKey: "option-2", order: 2 },
      ],
    });
  });

  it("rejects noncanonical option identity and answer keys", () => {
    for (const response of [
      { ...single, options: [...single.options].reverse() },
      {
        ...single,
        options: single.options.map((option) => ({
          ...option,
          isCorrect: false,
        })),
      },
      { ...single, options: [] },
      {
        ...single,
        options: [{ ...single.options[0], label: "" }, single.options[1]],
      },
      {
        kind: "multiple-choice",
        options: single.options,
      },
    ]) {
      expect(
        Exit.isFailure(
          Schema.decodeUnknownExit(QuestionResponseSchema)(response)
        )
      ).toBe(true);
    }
  });

  it("accepts multiple choice and category responses", () => {
    const multiple = Schema.decodeSync(QuestionResponseSchema)({
      kind: "multiple-choice",
      options: [
        single.options[0],
        { ...single.options[1], isCorrect: true },
        {
          isCorrect: false,
          label: "C",
          optionKey: "option-3",
          order: 3,
        },
      ],
    });
    const category = Schema.decodeSync(QuestionResponseSchema)({
      categories: [
        {
          categoryKey: "category-1",
          label: "True",
          order: 1,
        },
        {
          categoryKey: "category-2",
          label: "False",
          order: 2,
        },
      ],
      kind: "category",
      statements: [
        {
          correctCategoryKey: "category-1",
          label: "Statement",
          order: 1,
          statementKey: "statement-1",
        },
      ],
    });

    expect(canonicalQuestionResponse(multiple)).toEqual(multiple);
    expect(canonicalQuestionResponse(category)).toEqual(category);
    expect(canonicalQuestionResponseStructure(category)).toEqual({
      categories: [
        { categoryKey: "category-1", order: 1 },
        { categoryKey: "category-2", order: 2 },
      ],
      kind: "category",
      statements: [
        {
          correctCategoryKey: "category-1",
          order: 1,
          statementKey: "statement-1",
        },
      ],
    });
  });

  it("rejects noncanonical category and statement identities", () => {
    for (const response of [
      { categories: [], kind: "category", statements: [] },
      {
        categories: [
          {
            categoryKey: "category-2",
            label: "Wrong order",
            order: 1,
          },
          {
            categoryKey: "category-1",
            label: "Wrong order",
            order: 2,
          },
        ],
        kind: "category",
        statements: [
          {
            correctCategoryKey: "category-3",
            label: "Unknown category",
            order: 1,
            statementKey: "statement-1",
          },
        ],
      },
    ]) {
      expect(
        Exit.isFailure(
          Schema.decodeUnknownExit(QuestionResponseSchema)(response)
        )
      ).toBe(true);
    }
  });
});
