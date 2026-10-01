import { describe, expect, it } from "@effect/vitest";
import { Exit, Schema } from "effect";

import {
  canonicalQuestionResponse,
  canonicalQuestionResponseStructure,
  QuestionResponseSchema,
} from "#contracts/question/response";
import {
  canonicalQuestionRubric,
  canonicalQuestionRubricStructure,
} from "#contracts/question/rubric";
import { rubric } from "#contracts/test/rubric";

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

  it("canonicalizes short answers and keeps only locale-neutral rules as structure", () => {
    const number = Schema.decodeSync(QuestionResponseSchema)({
      answer: {
        acceptsFractions: true,
        kind: "number",
        tolerance: { kind: "absolute", value: "0.01" },
        value: "1.25",
      },
      kind: "short-answer",
    });
    const text = Schema.decodeSync(QuestionResponseSchema)({
      answer: {
        acceptedAnswers: ["fotosintesis"],
        collapseWhitespace: true,
        ignoreCase: true,
        kind: "text",
      },
      kind: "short-answer",
    });

    expect(JSON.stringify(canonicalQuestionResponse(number))).toBe(
      '{"answer":{"acceptsFractions":true,"kind":"number","tolerance":{"kind":"absolute","value":"0.01"},"value":"1.25"},"kind":"short-answer"}'
    );
    expect(canonicalQuestionResponseStructure(number)).toEqual(
      canonicalQuestionResponse(number)
    );
    expect(canonicalQuestionResponse(text)).toEqual(text);
    expect(canonicalQuestionResponseStructure(text)).toEqual({
      answer: { collapseWhitespace: true, ignoreCase: true, kind: "text" },
      kind: "short-answer",
    });
    expect(
      Exit.isFailure(
        Schema.decodeExit(QuestionResponseSchema)({
          answer: { acceptsFractions: false, kind: "number", value: "1.50" },
          kind: "short-answer",
        })
      )
    ).toBe(true);
  });

  it("canonicalizes a rubric through its owning rubric contract", () => {
    const decoded = Schema.decodeSync(QuestionResponseSchema)(rubric);

    expect(canonicalQuestionResponse(decoded)).toEqual(
      canonicalQuestionRubric(rubric)
    );
    expect(canonicalQuestionResponseStructure(decoded)).toEqual(
      canonicalQuestionRubricStructure(rubric)
    );
  });
});
