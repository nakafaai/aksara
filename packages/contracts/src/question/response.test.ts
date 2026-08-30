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
      label: [{ kind: "text", text: "A" }],
      optionKey: "option-1",
      order: 1,
    },
    {
      isCorrect: false,
      label: [{ kind: "text", text: "B" }],
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

  it("preserves semantic text and mathematics without delimiter parsing", () => {
    const semantic = Schema.decodeSync(QuestionResponseSchema)({
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Nilai " },
            { display: "inline", kind: "math", math: "x + 1" },
            { kind: "text", text: " berasal dari" },
            { display: "block", kind: "math", math: "x = 2" },
          ],
          optionKey: "option-1",
          order: 1,
        },
        single.options[1],
      ],
    });

    expect(canonicalQuestionResponse(semantic)).toEqual(semantic);
    expect(canonicalQuestionResponseStructure(semantic)).toEqual({
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
        options: [{ ...single.options[0], label: [] }, single.options[1]],
      },
      {
        ...single,
        options: [
          {
            ...single.options[0],
            label: [{ display: "inline", kind: "math", math: "" }],
          },
          single.options[1],
        ],
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
          label: [{ kind: "text", text: "C" }],
          optionKey: "option-3",
          order: 3,
        },
      ],
    });
    const category = Schema.decodeSync(QuestionResponseSchema)({
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
          label: [{ kind: "text", text: "Statement" }],
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
            label: [{ kind: "text", text: "Wrong order" }],
            order: 1,
          },
          {
            categoryKey: "category-1",
            label: [{ kind: "text", text: "Wrong order" }],
            order: 2,
          },
        ],
        kind: "category",
        statements: [
          {
            correctCategoryKey: "category-3",
            label: [{ kind: "text", text: "Unknown category" }],
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
