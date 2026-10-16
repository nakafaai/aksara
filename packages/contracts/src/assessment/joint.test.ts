import { describe, expect, it } from "@effect/vitest";

import { ItemSchema, ItemVersionSchema } from "#contracts/assessment/item";
import { JointRuleSchema, jointCeiling } from "#contracts/assessment/joint";
import {
  decodeStrict,
  doc,
  failsStrict,
  paragraph,
  place,
  text,
} from "#contracts/test/assessment/document";
import { extendedTextInteraction } from "#contracts/test/assessment/interaction";
import { hash } from "#contracts/test/assessment/item";
import {
  answerInteraction,
  twoTierJoint,
  twoTierVersion,
} from "#contracts/test/assessment/joint";
import { allOrNothing, rubricRule } from "#contracts/test/assessment/scoring";

describe("a joint rule scores the answers of an item together", () => {
  /** Drops the joint rule of a version, to show that the rule is the cause of a refusal. */
  const dropJoint = ({
    joint: _joint,
    ...version
  }: {
    readonly joint?: unknown;
  }) => version;

  it("accepts a two-tier item, whose ceiling is the points of its first level", () => {
    expect(failsStrict(ItemVersionSchema, twoTierVersion)).toBe(false);
    expect(
      failsStrict(ItemSchema, {
        family: { id: twoTierVersion.family },
        versions: [twoTierVersion],
      })
    ).toBe(false);
    expect(jointCeiling(decodeStrict(JointRuleSchema, twoTierJoint))).toBe(2);
  });

  it("refuses a joint rule that names fewer than two interactions, an unknown one, or an extended text", () => {
    const answerOnly = {
      ...twoTierVersion,
      interactions: [answerInteraction],
      joint: { levels: [{ correct: ["answer"], points: 1 }] },
      prompt: doc(paragraph(text("Test-only prompt.")), place("answer")),
    };
    const unknownPart = {
      ...twoTierVersion,
      joint: {
        levels: [
          { correct: ["answer", "missing"], points: 2 },
          { correct: ["answer"], points: 1 },
        ],
      },
    };
    const essay = {
      ...twoTierVersion,
      interactions: [answerInteraction, extendedTextInteraction],
      joint: {
        levels: [
          { correct: ["answer", "essay"], points: 2 },
          { correct: ["answer"], points: 1 },
        ],
      },
      prompt: doc(
        paragraph(text("Test-only prompt.")),
        place("answer"),
        place("essay")
      ),
      scoring: [{ interaction: "essay", rule: rubricRule }],
    };

    expect(failsStrict(ItemVersionSchema, dropJoint(answerOnly))).toBe(false);
    expect(failsStrict(ItemVersionSchema, answerOnly)).toBe(true);
    expect(failsStrict(ItemVersionSchema, unknownPart)).toBe(true);
    expect(failsStrict(ItemVersionSchema, dropJoint(essay))).toBe(false);
    expect(failsStrict(ItemVersionSchema, essay)).toBe(true);
  });

  it("refuses levels that do not descend, repeat an interaction, name none, or score nothing", () => {
    for (const levels of [
      [],
      [
        { correct: ["answer"], points: 1 },
        { correct: ["answer", "reason"], points: 2 },
      ],
      [{ correct: ["answer", "answer"], points: 2 }],
      [{ correct: [], points: 2 }],
      [{ correct: ["answer"], points: 0 }],
    ]) {
      expect(failsStrict(JointRuleSchema, { levels })).toBe(true);
    }
  });

  it("leaves the scoring of a joint item to its one rule, so it sets no scoring override", () => {
    expect(
      failsStrict(ItemVersionSchema, {
        ...twoTierVersion,
        scoring: [{ interaction: "answer", rule: allOrNothing }],
      })
    ).toBe(true);
  });

  it("gives every language of a family the same joint rule", () => {
    const indonesian = {
      ...twoTierVersion,
      deliveryLanguage: "id",
      hash: hash("f"),
    };
    const otherLevels = {
      ...indonesian,
      joint: {
        levels: [
          { correct: ["answer", "reason"], points: 3 },
          { correct: ["answer"], points: 1 },
        ],
      },
    };

    expect(
      failsStrict(ItemSchema, {
        family: { id: twoTierVersion.family },
        versions: [twoTierVersion, indonesian],
      })
    ).toBe(false);
    expect(
      failsStrict(ItemSchema, {
        family: { id: twoTierVersion.family },
        versions: [twoTierVersion, otherLevels],
      })
    ).toBe(true);
  });
});
