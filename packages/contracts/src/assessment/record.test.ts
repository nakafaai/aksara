import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Schema } from "effect";

import { ItemVersionSchema } from "#contracts/assessment/item";
import {
  isWithinRecordLimit,
  MAX_RECORD_BYTES,
} from "#contracts/assessment/record";
import {
  doc,
  failsStrict,
  paragraph,
  place,
  text,
} from "#contracts/test/assessment/document";
import { plainPart } from "#contracts/test/assessment/item";
import { encodedBytes, recordOfBytes } from "#contracts/test/assessment/record";
import { tkaChoice, tkaMultiple } from "#contracts/test/assessment/tka";

/** A record of one string that carries the size check, as every stored record does. */
const SizedSchema = Schema.Struct({ text: Schema.String }).check(
  isWithinRecordLimit
);

/** Builds a record of one string. */
function sized(value: string) {
  return { text: value };
}

describe("the size of a record", () => {
  it("is 1 MiB of encoded JSON text, the size that Convex allows for one stored document", () => {
    expect(MAX_RECORD_BYTES).toBe(1_048_576);
  });

  it("accepts a record of exactly the limit and rejects one byte more", () => {
    const largest = recordOfBytes(sized, MAX_RECORD_BYTES);

    expect(encodedBytes(largest)).toBe(MAX_RECORD_BYTES);
    expect(failsStrict(SizedSchema, largest)).toBe(false);
    expect(
      failsStrict(SizedSchema, recordOfBytes(sized, MAX_RECORD_BYTES + 1))
    ).toBe(true);
  });

  it("counts bytes, not characters", () => {
    // An é is one character and two bytes, so the characters of each record
    // below are fewer than the limit and only their bytes can pass it.
    const fits = Math.floor((MAX_RECORD_BYTES - encodedBytes(sized(""))) / 2);

    expect(encodedBytes(sized("é".repeat(fits)))).toBeLessThanOrEqual(
      MAX_RECORD_BYTES
    );
    expect(failsStrict(SizedSchema, sized("é".repeat(fits)))).toBe(false);
    expect(encodedBytes(sized("é".repeat(fits + 1)))).toBeGreaterThan(
      MAX_RECORD_BYTES
    );
    expect(failsStrict(SizedSchema, sized("é".repeat(fits + 1)))).toBe(true);
  });

  it("measures the whole record, so documents that each fit are refused when together they pass the limit", () => {
    const half = "a".repeat(MAX_RECORD_BYTES / 2);
    const bigPrompt = doc(paragraph(text(half)), place(tkaChoice.id));
    const bigChoice = {
      ...tkaChoice,
      options: Arr.prepend(
        Arr.drop(tkaChoice.options, 1),
        plainPart("option-1", half)
      ),
    };

    /** Builds the TKA item version with the given prompt and choice. */
    const version = (prompt: unknown, choice: object) => ({
      ...tkaMultiple,
      interactions: [choice],
      prompt,
    });

    // Either big document alone leaves the whole version within the limit.
    expect(failsStrict(ItemVersionSchema, version(bigPrompt, tkaChoice))).toBe(
      false
    );
    expect(
      failsStrict(ItemVersionSchema, version(tkaMultiple.prompt, bigChoice))
    ).toBe(false);
    expect(failsStrict(ItemVersionSchema, version(bigPrompt, bigChoice))).toBe(
      true
    );
  });
});
