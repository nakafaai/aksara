import { describe, expect, it } from "@effect/vitest";

import {
  ChoiceInteractionSchema,
  GapMatchInteractionSchema,
  InlineChoiceInteractionSchema,
  MatchInteractionSchema,
  MatrixInteractionSchema,
  OrderInteractionSchema,
} from "#contracts/assessment/choice";
import { failsStrict } from "#contracts/test/assessment/document";
import {
  choiceInteraction,
  gapMatchInteraction,
  inlineChoiceInteraction,
  matchInteraction,
  matrixInteraction,
  orderInteraction,
} from "#contracts/test/assessment/interaction";
import { plainPart } from "#contracts/test/assessment/item";

describe("choice interactions", () => {
  it("accepts a single choice, a multiple choice, and a choice that may stay empty", () => {
    for (const bounds of [
      { maxChoices: 1, minChoices: 1 },
      { maxChoices: 3, minChoices: 2 },
      { maxChoices: 2, minChoices: 0 },
    ]) {
      expect(
        failsStrict(ChoiceInteractionSchema, {
          ...choiceInteraction,
          ...bounds,
        })
      ).toBe(false);
    }
  });

  it("rejects a choice whose maxChoices is below minChoices", () => {
    expect(
      failsStrict(ChoiceInteractionSchema, {
        ...choiceInteraction,
        maxChoices: 1,
        minChoices: 2,
      })
    ).toBe(true);
  });

  it("rejects a most above the number of options, and a most of zero", () => {
    for (const bounds of [
      { maxChoices: 4, minChoices: 1 },
      { maxChoices: 0, minChoices: 0 },
      { maxChoices: 1, minChoices: -1 },
    ]) {
      expect(
        failsStrict(ChoiceInteractionSchema, {
          ...choiceInteraction,
          ...bounds,
        })
      ).toBe(true);
    }
  });

  it("needs two options, each with its own identifier", () => {
    expect(
      failsStrict(ChoiceInteractionSchema, {
        ...choiceInteraction,
        options: [plainPart("option-1", "Bandung")],
      })
    ).toBe(true);
    expect(
      failsStrict(ChoiceInteractionSchema, {
        ...choiceInteraction,
        options: [
          plainPart("option-1", "Bandung"),
          plainPart("option-1", "Jakarta"),
        ],
      })
    ).toBe(true);
  });

  it("rejects an option that places an interaction", () => {
    expect(
      failsStrict(ChoiceInteractionSchema, {
        ...choiceInteraction,
        options: [
          plainPart("option-1", "Bandung"),
          {
            id: "option-2",
            label: {
              content: [
                { attrs: { interaction: "answer" }, type: "interaction" },
              ],
              type: "doc",
            },
          },
        ],
      })
    ).toBe(true);
  });
});

describe("matrix interactions", () => {
  it("needs two columns, and identifiers that no statement and column share", () => {
    expect(failsStrict(MatrixInteractionSchema, matrixInteraction)).toBe(false);
    expect(
      failsStrict(MatrixInteractionSchema, {
        ...matrixInteraction,
        columns: [plainPart("column-1", "Benar")],
      })
    ).toBe(true);
    expect(
      failsStrict(MatrixInteractionSchema, {
        ...matrixInteraction,
        columns: [
          plainPart("statement-1", "Benar"),
          plainPart("column-2", "Salah"),
        ],
      })
    ).toBe(true);
    expect(
      failsStrict(MatrixInteractionSchema, {
        ...matrixInteraction,
        statements: [],
      })
    ).toBe(true);
  });
});

describe("match interactions", () => {
  it("limits each end by its own maximum and keeps every identifier apart", () => {
    const [country] = matchInteraction.sources;

    expect(failsStrict(MatchInteractionSchema, matchInteraction)).toBe(false);
    expect(
      failsStrict(MatchInteractionSchema, {
        ...matchInteraction,
        sources: [{ ...country, maxMatches: 0 }],
      })
    ).toBe(true);
    expect(
      failsStrict(MatchInteractionSchema, {
        ...matchInteraction,
        targets: [{ ...country, maxMatches: 1 }],
      })
    ).toBe(true);
  });
});

describe("order interactions", () => {
  it("orders all items or a subset, within the number of items", () => {
    expect(failsStrict(OrderInteractionSchema, orderInteraction)).toBe(false);
    expect(
      failsStrict(OrderInteractionSchema, {
        ...orderInteraction,
        maxChoices: 3,
        minChoices: 2,
      })
    ).toBe(false);
    for (const bounds of [
      { maxChoices: 2, minChoices: 3 },
      { maxChoices: 4, minChoices: 3 },
      { maxChoices: 3, minChoices: 0 },
    ]) {
      expect(
        failsStrict(OrderInteractionSchema, { ...orderInteraction, ...bounds })
      ).toBe(true);
    }
  });

  it("needs two items, each with its own identifier", () => {
    expect(
      failsStrict(OrderInteractionSchema, {
        ...orderInteraction,
        items: [plainPart("step-1", "Campur")],
      })
    ).toBe(true);
    expect(
      failsStrict(OrderInteractionSchema, {
        ...orderInteraction,
        items: [
          plainPart("step-1", "Campur"),
          plainPart("step-1", "Panaskan"),
          plainPart("step-3", "Dinginkan"),
        ],
      })
    ).toBe(true);
  });
});

describe("inline choice interactions", () => {
  it("needs two options, each with its own identifier", () => {
    const [first] = inlineChoiceInteraction.options;

    expect(
      failsStrict(InlineChoiceInteractionSchema, inlineChoiceInteraction)
    ).toBe(false);
    expect(
      failsStrict(InlineChoiceInteractionSchema, {
        ...inlineChoiceInteraction,
        options: [first],
      })
    ).toBe(true);
    expect(
      failsStrict(InlineChoiceInteractionSchema, {
        ...inlineChoiceInteraction,
        options: [first, first],
      })
    ).toBe(true);
  });
});

describe("gap match interactions", () => {
  it("names each gap and each choice once, with a limit for each choice", () => {
    const [word] = gapMatchInteraction.choices;

    expect(failsStrict(GapMatchInteractionSchema, gapMatchInteraction)).toBe(
      false
    );
    expect(
      failsStrict(GapMatchInteractionSchema, {
        ...gapMatchInteraction,
        gaps: [{ id: "word-1" }],
      })
    ).toBe(true);
    expect(
      failsStrict(GapMatchInteractionSchema, {
        ...gapMatchInteraction,
        choices: [{ ...word, maxMatches: 0 }],
      })
    ).toBe(true);
    expect(
      failsStrict(GapMatchInteractionSchema, {
        ...gapMatchInteraction,
        gaps: [],
      })
    ).toBe(true);
  });
});
