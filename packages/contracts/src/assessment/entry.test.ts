import { describe, expect, it } from "@effect/vitest";

import {
  ExtendedTextInteractionSchema,
  MathEntryInteractionSchema,
  NumericEntryInteractionSchema,
  TextEntryInteractionSchema,
} from "#contracts/assessment/entry";
import { failsStrict } from "#contracts/test/assessment/document";
import {
  extendedTextInteraction,
  mathEntryInteraction,
  numericEntryInteraction,
  textEntryInteraction,
} from "#contracts/test/assessment/interaction";

describe("entry interactions", () => {
  it("accepts a text entry with or without an expected length", () => {
    const { expectedLength: _expectedLength, ...bare } = textEntryInteraction;

    expect(failsStrict(TextEntryInteractionSchema, textEntryInteraction)).toBe(
      false
    );
    expect(failsStrict(TextEntryInteractionSchema, bare)).toBe(false);
    for (const expectedLength of [0, 1.5, -3]) {
      expect(
        failsStrict(TextEntryInteractionSchema, {
          ...textEntryInteraction,
          expectedLength,
        })
      ).toBe(true);
    }
  });

  it("says whether fractions are typed and which unit follows the field", () => {
    const { unit: _unit, ...bare } = numericEntryInteraction;

    expect(
      failsStrict(NumericEntryInteractionSchema, numericEntryInteraction)
    ).toBe(false);
    expect(failsStrict(NumericEntryInteractionSchema, bare)).toBe(false);
    const { acceptsFractions: _acceptsFractions, ...undecided } =
      numericEntryInteraction;

    expect(failsStrict(NumericEntryInteractionSchema, undecided)).toBe(true);
    expect(
      failsStrict(NumericEntryInteractionSchema, {
        ...numericEntryInteraction,
        unit: " ",
      })
    ).toBe(true);
  });

  it("takes the equivalence policy of a math entry as data", () => {
    for (const equivalence of ["proof", "proofOrSample"]) {
      expect(
        failsStrict(MathEntryInteractionSchema, {
          ...mathEntryInteraction,
          equivalence,
        })
      ).toBe(false);
    }
    for (const equivalence of ["sample", "", undefined]) {
      expect(
        failsStrict(MathEntryInteractionSchema, {
          ...mathEntryInteraction,
          equivalence,
        })
      ).toBe(true);
    }
  });

  it("accepts an extended text with or without an expected height", () => {
    const { expectedLines: _expectedLines, ...bare } = extendedTextInteraction;

    expect(
      failsStrict(ExtendedTextInteractionSchema, extendedTextInteraction)
    ).toBe(false);
    expect(failsStrict(ExtendedTextInteractionSchema, bare)).toBe(false);
    expect(
      failsStrict(ExtendedTextInteractionSchema, {
        ...extendedTextInteraction,
        expectedLines: 0,
      })
    ).toBe(true);
  });
});
