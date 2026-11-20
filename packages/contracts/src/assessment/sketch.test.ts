import { describe, expect, it } from "@effect/vitest";
import { Array as Arr } from "effect";

import { hasKeyedRubrics } from "#contracts/assessment/fit";
import { InteractionSchema } from "#contracts/assessment/interaction";
import { ItemVersionSchema } from "#contracts/assessment/item";
import { InteractionKeySchema, ItemKeySchema } from "#contracts/assessment/key";
import {
  ScoringOverrideSchema,
  ScoringRuleSchema,
  supportsRule,
} from "#contracts/assessment/scoring";
import { hasSameKeyStructure } from "#contracts/assessment/structure";
import {
  decodeStrict,
  doc,
  failsStrict,
  place,
} from "#contracts/test/assessment/document";
import { sketchInteraction } from "#contracts/test/assessment/interaction";
import { hash } from "#contracts/test/assessment/item";
import {
  choiceKey,
  sketchLeft as left,
  sketchRight as right,
  sketchKey,
  sketchZero as zero,
} from "#contracts/test/assessment/key";
import {
  allOrNothing,
  rubricRule,
  sketchRule,
} from "#contracts/test/assessment/scoring";

/** The sketch key with other criteria. */
function withCriteria(...criteria: readonly object[]) {
  return { ...sketchKey, criteria };
}

/** The sketch key whose zero checks another feature. */
function withFeature(feature: object) {
  return withCriteria(left, right, {
    ...zero,
    check: { feature, kind: "feature" },
  });
}

/** One version of a test item that places the sketch, with the given rules. */
function versionWith(scoring: readonly object[]) {
  return {
    deliveryLanguage: "id",
    family: "test-item",
    hash: hash("1"),
    interactions: [sketchInteraction],
    prompt: doc(place("graph")),
    scoring,
  };
}

describe("a sketch", () => {
  it("opens on a frame, with a grid step and the marks it may place", () => {
    const { grid: _grid, ...gridless } = sketchInteraction;

    for (const interaction of [
      sketchInteraction,
      gridless,
      { ...sketchInteraction, marks: [] },
    ]) {
      expect(failsStrict(InteractionSchema, interaction)).toBe(false);
    }
    for (const interaction of [
      { ...sketchInteraction, marks: ["point", "point"] },
      { ...sketchInteraction, marks: ["line"] },
      { ...sketchInteraction, grid: 0 },
    ]) {
      expect(failsStrict(InteractionSchema, interaction)).toBe(true);
    }
  });

  it("is keyed by features, each a criterion that may require earlier ones", () => {
    expect(failsStrict(InteractionKeySchema, sketchKey)).toBe(false);
    for (const key of [
      withCriteria(),
      withCriteria(left, left),
      withCriteria({ ...left, requires: ["right"] }, right),
      withCriteria(left, { ...right, requires: ["nowhere"] }),
      withCriteria(left, { ...right, requires: ["right"] }),
      withCriteria(left, { ...right, feedback: { earned: "Tepat." } }),
    ]) {
      expect(failsStrict(InteractionKeySchema, key)).toBe(true);
    }
  });

  it("writes every feature exactly, and an interval left to right", () => {
    for (const feature of [
      { contact: "touch", kind: "zero", x: "0" },
      { kind: "extremum", turn: "maximum", x: "-1", y: "2" },
      {
        kind: "asymptote",
        line: { intercept: "0", kind: "sloped", slope: "1" },
      },
      { direction: "falling", from: null, kind: "interval", to: null },
      { direction: "falling", from: "-1.5", kind: "interval", to: "-1" },
      { kind: "inflection", x: "0", y: "0" },
      { kind: "point", x: "2", y: "3" },
      { end: "open", kind: "point", x: "-2", y: "1" },
    ]) {
      expect(
        failsStrict(InteractionKeySchema, {
          ...withFeature(feature),
          tolerances: {
            ...sketchKey.tolerances,
            extremum: "0.5",
            inflection: "0.5",
            point: "0.25",
          },
        })
      ).toBe(false);
    }
    for (const feature of [
      { contact: "cross", kind: "zero", x: 1 },
      { contact: "near", kind: "zero", x: "1" },
      { kind: "yIntercept", y: "0.50" },
      { direction: "rising", from: "1", kind: "interval", to: "1" },
      { direction: "rising", from: "2", kind: "interval", to: "-2" },
      { direction: "level", from: null, kind: "interval", to: null },
      { kind: "end", limit: "infinity", side: "right" },
      { end: "half", kind: "point", x: "0", y: "0" },
      { kind: "inflection", x: "0" },
    ]) {
      expect(failsStrict(InteractionKeySchema, withFeature(feature))).toBe(
        true
      );
    }
  });

  it("needs a positive tolerance for each kind it checks, but none for an end without bound", () => {
    const { zero: _zero, ...noZero } = sketchKey.tolerances;
    const towardsValue = withFeature({
      kind: "end",
      limit: "1",
      side: "right",
    });

    expect(
      failsStrict(InteractionKeySchema, { ...sketchKey, tolerances: noZero })
    ).toBe(true);
    for (const tolerance of ["0", "-0.25", "0.250"]) {
      expect(
        failsStrict(InteractionKeySchema, {
          ...sketchKey,
          tolerances: { ...sketchKey.tolerances, zero: tolerance },
        })
      ).toBe(true);
    }
    expect(failsStrict(InteractionKeySchema, towardsValue)).toBe(true);
    expect(
      failsStrict(InteractionKeySchema, {
        ...towardsValue,
        tolerances: { ...sketchKey.tolerances, end: "0.5" },
      })
    ).toBe(false);
  });

  it("lets languages change the feedback of a criterion, never its feature", () => {
    const translated = withCriteria(
      ...Arr.map(sketchKey.criteria, (criterion) => ({
        ...criterion,
        feedback: { earned: "Exactly right.", missed: "Look again." },
      }))
    );

    expect(hasSameKeyStructure([sketchKey, translated])).toBe(true);
    expect(
      hasSameKeyStructure([
        sketchKey,
        withFeature({ contact: "touch", kind: "zero", x: "1" }),
      ])
    ).toBe(false);
  });

  it("is scored by a rubric of its own, each criterion missed or earned", () => {
    const rule = decodeStrict(ScoringRuleSchema, sketchRule);
    expect(supportsRule("sketch", rule)).toBe(true);
    for (const other of [
      allOrNothing,
      rubricRule,
      {
        ...sketchRule,
        criteria: [
          {
            id: "left",
            label: "left",
            levels: [
              { id: "missed", label: "Missed", points: 1 },
              { id: "earned", label: "Earned", points: 2 },
            ],
          },
        ],
      },
    ]) {
      expect(
        supportsRule("sketch", decodeStrict(ScoringRuleSchema, other))
      ).toBe(false);
    }
    expect(
      failsStrict(
        ItemVersionSchema,
        versionWith([{ interaction: "graph", rule: sketchRule }])
      )
    ).toBe(false);
    expect(failsStrict(ItemVersionSchema, versionWith([]))).toBe(true);
  });
});

/** The key of one item version that holds one answer. */
function itemKey(answer: object) {
  return { answers: [answer], version: hash("1") };
}

/** Decodes one scoring override. */
function decodeOverride(override: unknown) {
  return decodeStrict(ScoringOverrideSchema, override);
}

describe("a sketch's key and its rubric", () => {
  const version = {
    scoring: [decodeOverride({ interaction: "graph", rule: sketchRule })],
  };

  it("meet when the key checks exactly the criteria the rubric scores", () => {
    expect(
      hasKeyedRubrics(version, decodeStrict(ItemKeySchema, itemKey(sketchKey)))
    ).toBe(true);
    expect(
      hasKeyedRubrics(
        { scoring: [] },
        decodeStrict(ItemKeySchema, itemKey(choiceKey))
      )
    ).toBe(true);
  });

  it("refuse a feature worth no points, and points with no feature", () => {
    const unscored = withCriteria(...sketchKey.criteria, {
      ...zero,
      criterion: "extra",
    });
    const unchecked = withCriteria(
      ...Arr.filter(sketchKey.criteria, ({ criterion }) => criterion !== "end")
    );

    for (const [scoring, key] of [
      [[{ interaction: "graph", rule: sketchRule }], unscored],
      [[{ interaction: "graph", rule: sketchRule }], unchecked],
      [[], sketchKey],
      [[{ interaction: "other", rule: sketchRule }], sketchKey],
    ] as const) {
      expect(
        hasKeyedRubrics(
          { scoring: Arr.map(scoring, decodeOverride) },
          decodeStrict(ItemKeySchema, itemKey(key))
        )
      ).toBe(false);
    }
  });
});
