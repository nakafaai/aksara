import { describe, expect, it } from "@effect/vitest";
import { Array as Arr } from "effect";

import {
  InteractionKindSchema,
  InteractionSchema,
} from "#contracts/assessment/interaction";
import {
  DefaultRuleSchema,
  MarksSchema,
  PerPartRuleSchema,
  pointsForWrongParts,
  RubricRuleSchema,
  ScoreScaleSchema,
  ScoringOverrideSchema,
  ScoringRuleSchema,
  ScoringStrategySchema,
  scoreCeiling,
  supportsRule,
  WrongPartsRuleSchema,
} from "#contracts/assessment/scoring";
import { akmRule } from "#contracts/test/assessment/akm";
import { decodeStrict, failsStrict } from "#contracts/test/assessment/document";
import {
  ALL_INTERACTIONS,
  choiceInteraction,
  extendedTextInteraction,
} from "#contracts/test/assessment/interaction";
import {
  allOrNothing,
  approachCriterion,
  formula,
  missingLevel,
  partialLevel,
  perPart,
  resultCriterion,
  rubricRule,
} from "#contracts/test/assessment/scoring";

describe("scoring rules", () => {
  it("accepts all or nothing, a rule per part, and a rubric", () => {
    for (const rule of [allOrNothing, perPart, rubricRule]) {
      expect(failsStrict(ScoringRuleSchema, rule)).toBe(false);
    }
    expect(
      failsStrict(PerPartRuleSchema, {
        floor: 0,
        kind: "perPart",
        pointsPerPart: 2,
      })
    ).toBe(false);
  });

  it("rejects a per-part rule with a negative floor", () => {
    for (const floor of [-1, 0.5]) {
      expect(failsStrict(PerPartRuleSchema, { ...perPart, floor })).toBe(true);
    }
    expect(failsStrict(PerPartRuleSchema, { ...perPart, floor: 1 })).toBe(
      false
    );
  });

  it("awards whole points above zero for a part and a penalty above zero for a wrong part", () => {
    for (const change of [
      { pointsPerPart: 0 },
      { pointsPerPart: 1.5 },
      { penaltyPerWrongPart: 0 },
      { penaltyPerWrongPart: -1 },
    ]) {
      expect(failsStrict(PerPartRuleSchema, { ...perPart, ...change })).toBe(
        true
      );
    }
  });

  it("needs a rubric with criteria whose levels ascend", () => {
    expect(failsStrict(RubricRuleSchema, { ...rubricRule, criteria: [] })).toBe(
      true
    );
    for (const criteria of [
      [{ ...approachCriterion, levels: [missingLevel] }],
      [{ ...approachCriterion, levels: [partialLevel, missingLevel] }],
      [
        {
          ...approachCriterion,
          levels: [missingLevel, { ...partialLevel, points: 0 }],
        },
      ],
      [
        {
          ...approachCriterion,
          levels: [missingLevel, { ...partialLevel, id: missingLevel.id }],
        },
      ],
      [approachCriterion, { ...resultCriterion, id: approachCriterion.id }],
    ]) {
      expect(failsStrict(RubricRuleSchema, { ...rubricRule, criteria })).toBe(
        true
      );
    }
  });

  it("lets an exam default to all or nothing, a rule per part, or a wrong-parts table, never to a rubric", () => {
    expect(failsStrict(DefaultRuleSchema, allOrNothing)).toBe(false);
    expect(failsStrict(DefaultRuleSchema, perPart)).toBe(false);
    expect(failsStrict(DefaultRuleSchema, akmRule)).toBe(false);
    expect(failsStrict(DefaultRuleSchema, rubricRule)).toBe(true);
  });

  it("lets an item set a rule for one of its interactions", () => {
    expect(
      failsStrict(ScoringOverrideSchema, {
        interaction: "answer",
        rule: perPart,
      })
    ).toBe(false);
    expect(
      failsStrict(ScoringOverrideSchema, {
        interaction: "Answer",
        rule: perPart,
      })
    ).toBe(true);
  });
});

describe("score categories", () => {
  it("has the categories 0 and 1 for all or nothing", () => {
    expect(scoreCeiling(decodeStrict(ScoringRuleSchema, allOrNothing), 5)).toBe(
      1
    );
  });

  it("has the points of every part for a rule per part", () => {
    expect(
      scoreCeiling(
        decodeStrict(ScoringRuleSchema, { ...perPart, pointsPerPart: 2 }),
        4
      )
    ).toBe(8);
  });

  it("has the points of the highest level of each criterion for a rubric", () => {
    expect(scoreCeiling(decodeStrict(ScoringRuleSchema, rubricRule), 0)).toBe(
      3
    );
  });
});

describe("which rule scores which interaction", () => {
  const rules = Arr.map([allOrNothing, perPart, rubricRule], (rule) =>
    decodeStrict(ScoringRuleSchema, rule)
  );

  it("scores an extended text by a rubric only, and every other interaction by anything but a rubric", () => {
    /** Tells which of the three rules can score the given interaction. */
    const fits = (input: unknown) =>
      Arr.map(rules, (rule) =>
        supportsRule(decodeStrict(InteractionSchema, input).kind, rule)
      );

    expect(fits(extendedTextInteraction)).toEqual([false, false, true]);
    expect(fits(choiceInteraction)).toEqual([true, true, false]);
    for (const interaction of ALL_INTERACTIONS) {
      expect(fits(interaction)[2]).toBe(interaction.kind === "extendedText");
    }
  });

  it("keeps the floor of a rule per part within the points of a field, whose one part is worth them", () => {
    /** Builds a rule per part that is worth 2 points for a part. */
    const withFloor = (floor: number) =>
      decodeStrict(ScoringRuleSchema, { ...perPart, floor, pointsPerPart: 2 });
    /** Decodes the kind of one interaction. */
    const kindOf = (kind: string) => decodeStrict(InteractionKindSchema, kind);

    for (const field of [
      "inlineChoice",
      "textEntry",
      "numericEntry",
      "mathEntry",
    ]) {
      expect(supportsRule(kindOf(field), withFloor(2))).toBe(true);
      expect(supportsRule(kindOf(field), withFloor(3))).toBe(false);
    }
    // The key counts the parts of every other kind, so the key checks the floor.
    expect(supportsRule(kindOf("choice"), withFloor(3))).toBe(true);
    expect(supportsRule(kindOf("matrix"), withFloor(3))).toBe(true);
  });
});

describe("wrong-parts tables", () => {
  it("accepts bands that rise in wrong parts and fall in points, with at least one band", () => {
    expect(failsStrict(WrongPartsRuleSchema, akmRule)).toBe(false);
    expect(
      failsStrict(WrongPartsRuleSchema, {
        bands: [{ points: 1, wrong: 0 }],
        kind: "wrongParts",
      })
    ).toBe(false);
  });

  it("rejects a table without a band, and bands that do not step down", () => {
    for (const bands of [
      [],
      [{ points: 1, wrong: -1 }],
      [{ points: 0, wrong: 0 }],
      [{ points: 1, wrong: 0.5 }],
      [
        { points: 2, wrong: 2 },
        { points: 1, wrong: 0 },
      ],
      [
        { points: 1, wrong: 0 },
        { points: 1, wrong: 2 },
      ],
      [
        { points: 2, wrong: 0 },
        { points: 3, wrong: 2 },
      ],
      [
        { points: 2, wrong: 0 },
        { points: 1, wrong: 0 },
      ],
    ]) {
      expect(
        failsStrict(WrongPartsRuleSchema, { bands, kind: "wrongParts" })
      ).toBe(true);
    }
  });

  it("scores an answer by the first band that holds its wrong parts, and 0 when none does", () => {
    const rule = decodeStrict(WrongPartsRuleSchema, akmRule);

    expect(
      Arr.map([0, 1, 2, 3], (wrong) => pointsForWrongParts(rule, wrong))
    ).toEqual([2, 1, 1, 0]);
  });

  it("has the points of its first band as its ceiling, whatever the number of parts", () => {
    expect(scoreCeiling(decodeStrict(ScoringRuleSchema, akmRule), 6)).toBe(2);
    expect(scoreCeiling(decodeStrict(ScoringRuleSchema, akmRule), 0)).toBe(2);
  });

  it("fits every kind but an extended text and a field, and a field only with one band for no wrong part", () => {
    const table = decodeStrict(ScoringRuleSchema, akmRule);
    const fieldTable = decodeStrict(ScoringRuleSchema, {
      bands: [{ points: 1, wrong: 0 }],
      kind: "wrongParts",
    });
    const stepsOnAWrongPart = decodeStrict(ScoringRuleSchema, {
      bands: [
        { points: 2, wrong: 0 },
        { points: 1, wrong: 1 },
      ],
      kind: "wrongParts",
    });
    const pointForAWrongPart = decodeStrict(ScoringRuleSchema, {
      bands: [{ points: 1, wrong: 1 }],
      kind: "wrongParts",
    });
    /** The kinds that sit inside a line of text, each a field with one part. */
    const fields = ["inlineChoice", "textEntry", "numericEntry", "mathEntry"];
    /** Decodes the kind of one interaction. */
    const kindOf = (kind: string) => decodeStrict(InteractionKindSchema, kind);

    for (const interaction of ALL_INTERACTIONS) {
      const { kind } = decodeStrict(InteractionSchema, interaction);
      expect(supportsRule(kind, table)).toBe(
        kind !== "extendedText" && !Arr.contains(fields, kind)
      );
    }
    for (const field of fields) {
      expect(supportsRule(kindOf(field), fieldTable)).toBe(true);
      expect(supportsRule(kindOf(field), stepsOnAWrongPart)).toBe(false);
      expect(supportsRule(kindOf(field), pointForAWrongPart)).toBe(false);
    }
  });
});

describe("scoring strategies", () => {
  it("accepts the four strategies, with marks for a penalized exam and a formula for a composite", () => {
    for (const strategy of [
      { kind: "irt" },
      { kind: "raw" },
      { kind: "penalized", marks: { blank: 0, correct: 4, wrong: -1 } },
      { formula, kind: "composite" },
    ]) {
      expect(failsStrict(ScoringStrategySchema, strategy)).toBe(false);
    }
  });

  it("rejects a penalized exam without marks, and a composite without a formula in every language", () => {
    const { de: _de, ...partial } = formula;

    for (const strategy of [
      { kind: "penalized" },
      { formula: partial, kind: "composite" },
      { formula: { ...formula, en: "" }, kind: "composite" },
      { kind: "composite" },
    ]) {
      expect(failsStrict(ScoringStrategySchema, strategy)).toBe(true);
    }
  });

  it("orders marks: wrong at or below blank, blank below correct", () => {
    for (const marks of [
      { blank: 0, correct: 4, wrong: -1 },
      { blank: -1, correct: 1, wrong: -1 },
    ]) {
      expect(failsStrict(MarksSchema, marks)).toBe(false);
    }
    for (const marks of [
      { blank: 0, correct: 0, wrong: -1 },
      { blank: -2, correct: 4, wrong: -1 },
      { blank: 4, correct: 4, wrong: -1 },
      { blank: 0, correct: 4, wrong: 0 },
    ]) {
      expect(failsStrict(MarksSchema, marks)).toBe(true);
    }
  });

  it("runs a scale upward", () => {
    expect(failsStrict(ScoreScaleSchema, { maximum: 1600, minimum: 400 })).toBe(
      false
    );
    expect(failsStrict(ScoreScaleSchema, { maximum: 400, minimum: 400 })).toBe(
      true
    );
  });
});
