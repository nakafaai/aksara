import { describe, expect, it } from "@effect/vitest";
import { Schema } from "effect";

import { InteractionKeySchema, ItemKeySchema } from "#contracts/assessment/key";
import { MAX_RECORD_BYTES } from "#contracts/assessment/record";
import { decodeStrict, failsStrict } from "#contracts/test/assessment/document";
import { hash } from "#contracts/test/assessment/item";
import {
  ALL_KEYS,
  approachKey,
  choiceKey,
  extendedTextKey,
  gapMatchKey,
  graphPointKey,
  hotspotKey,
  lowDescriptor,
  matchKey,
  mathEntryKey,
  matrixKey,
  numericEntryKey,
  orderKey,
  resultKey,
  textEntryKey,
} from "#contracts/test/assessment/key";
import { recordOfBytes } from "#contracts/test/assessment/record";

describe("answer keys", () => {
  it("decodes one key of each of the twelve kinds and encodes it back", () => {
    expect(ALL_KEYS).toHaveLength(12);
    for (const key of ALL_KEYS) {
      const decoded = decodeStrict(InteractionKeySchema, key);

      expect(Schema.encodeSync(InteractionKeySchema)(decoded)).toEqual(key);
    }
  });

  it("names the item version hash that the key belongs to", () => {
    const itemKey = { answers: ALL_KEYS, version: hash("1") };
    const { version: _version, ...unbound } = itemKey;

    expect(failsStrict(ItemKeySchema, itemKey)).toBe(false);
    expect(failsStrict(ItemKeySchema, unbound)).toBe(true);
    for (const version of ["1", "sha256:abc", hash("A")]) {
      expect(failsStrict(ItemKeySchema, { ...itemKey, version })).toBe(true);
    }
  });

  it("is a record that Convex stores as one row, so it fits 1 MiB with its version", () => {
    /** Builds a key whose one answer holds the given expression. */
    const keying = (filler: string) => ({
      answers: [{ ...mathEntryKey, expression: filler }],
      version: hash("1"),
    });

    expect(
      failsStrict(ItemKeySchema, recordOfBytes(keying, MAX_RECORD_BYTES))
    ).toBe(false);
    expect(
      failsStrict(ItemKeySchema, recordOfBytes(keying, MAX_RECORD_BYTES + 1))
    ).toBe(true);
  });

  it("gives one answer to each interaction", () => {
    expect(
      failsStrict(ItemKeySchema, { answers: [], version: hash("1") })
    ).toBe(true);
    expect(
      failsStrict(ItemKeySchema, {
        answers: [choiceKey, choiceKey],
        version: hash("1"),
      })
    ).toBe(true);
  });

  it("names each correct part once", () => {
    for (const key of [
      { ...choiceKey, correct: [] },
      { ...choiceKey, correct: ["option-2", "option-2"] },
      { ...hotspotKey, correct: ["area-1", "area-1"] },
      { ...orderKey, sequence: ["step-1", "step-1"] },
      { ...orderKey, sequence: [] },
      { ...matrixKey, answers: [matrixKey.answers[0], matrixKey.answers[0]] },
      {
        ...matchKey,
        pairs: [
          { source: "country-1", target: "capital-1" },
          { source: "country-1", target: "capital-1" },
        ],
      },
      { ...gapMatchKey, pairs: [gapMatchKey.pairs[0], gapMatchKey.pairs[0]] },
    ]) {
      expect(failsStrict(InteractionKeySchema, key)).toBe(true);
    }
    expect(
      failsStrict(InteractionKeySchema, {
        ...matchKey,
        pairs: [
          { source: "country-1", target: "capital-1" },
          { source: "country-1", target: "capital-2" },
        ],
      })
    ).toBe(false);
  });

  it("keeps the numeric grammar and the text grammar of the answer module", () => {
    const text = textEntryKey.accepted;

    for (const key of [
      { ...numericEntryKey, value: "64.0" },
      { ...numericEntryKey, tolerance: { kind: "absolute", value: "0" } },
      { ...textEntryKey, accepted: { ...text, acceptedAnswers: [] } },
      { ...textEntryKey, accepted: { ...text, acceptedAnswers: ["a", "A"] } },
    ]) {
      expect(failsStrict(InteractionKeySchema, key)).toBe(true);
    }
    expect(
      failsStrict(InteractionKeySchema, {
        ...numericEntryKey,
        tolerance: { kind: "relative", value: "0.01" },
      })
    ).toBe(false);
  });

  it("cannot measure a relative tolerance from zero", () => {
    expect(
      failsStrict(InteractionKeySchema, {
        ...numericEntryKey,
        tolerance: { kind: "relative", value: "0.01" },
        value: "0",
      })
    ).toBe(true);
    expect(
      failsStrict(InteractionKeySchema, {
        ...numericEntryKey,
        tolerance: { kind: "absolute", value: "0.01" },
        value: "0",
      })
    ).toBe(false);
    const { tolerance: _tolerance, ...exact } = numericEntryKey;

    expect(failsStrict(InteractionKeySchema, { ...exact, value: "0" })).toBe(
      false
    );
  });

  it("stores the expression of a math entry as LaTeX once", () => {
    expect(
      failsStrict(InteractionKeySchema, { ...mathEntryKey, expression: "" })
    ).toBe(true);
    expect(
      failsStrict(InteractionKeySchema, {
        ...mathEntryKey,
        mathml: "<math><mi>x</mi></math>",
      })
    ).toBe(true);
  });

  it("targets points or lines of a plane, within a tolerance above zero", () => {
    const line = {
      through: [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
      ],
    };

    for (const target of [
      graphPointKey.target,
      { kind: "lines", lines: [line] },
    ]) {
      expect(
        failsStrict(InteractionKeySchema, { ...graphPointKey, target })
      ).toBe(false);
    }
    for (const change of [
      { tolerance: 0 },
      { target: { kind: "points", points: [] } },
      {
        target: {
          kind: "lines",
          lines: [
            {
              through: [
                { x: 1, y: 1 },
                { x: 1, y: 1 },
              ],
            },
          ],
        },
      },
    ]) {
      expect(
        failsStrict(InteractionKeySchema, { ...graphPointKey, ...change })
      ).toBe(true);
    }
  });

  it("describes each level of each criterion once, in words for a grader", () => {
    for (const criteria of [
      [],
      [approachKey, { ...resultKey, criterion: approachKey.criterion }],
      [{ ...approachKey, levels: [lowDescriptor, lowDescriptor] }],
      [{ ...approachKey, levels: [] }],
      [{ ...approachKey, levels: [{ ...lowDescriptor, descriptor: " " }] }],
    ]) {
      expect(
        failsStrict(InteractionKeySchema, { ...extendedTextKey, criteria })
      ).toBe(true);
    }
  });
});
