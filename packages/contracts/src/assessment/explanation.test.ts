import { describe, expect, it } from "@effect/vitest";
import { Schema } from "effect";

import { ItemExplanationSchema } from "#contracts/assessment/explanation";
import { MAX_RECORD_BYTES } from "#contracts/assessment/record";
import {
  decodeStrict,
  doc,
  failsStrict,
  note,
  paragraph,
  place,
  text,
} from "#contracts/test/assessment/document";
import { hash } from "#contracts/test/assessment/item";
import { recordOfBytes } from "#contracts/test/assessment/record";
import { tkaMultipleExplanation } from "#contracts/test/assessment/tka";

describe("explanations", () => {
  it("decodes the explanation of an item version and encodes it back", () => {
    const decoded = decodeStrict(ItemExplanationSchema, tkaMultipleExplanation);

    expect(Schema.encodeSync(ItemExplanationSchema)(decoded)).toEqual(
      tkaMultipleExplanation
    );
  });

  it("names the item version hash that the explanation belongs to", () => {
    const { version: _version, ...unbound } = tkaMultipleExplanation;

    expect(failsStrict(ItemExplanationSchema, unbound)).toBe(true);
    for (const version of ["1", "sha256:abc", hash("A")]) {
      expect(
        failsStrict(ItemExplanationSchema, {
          ...tkaMultipleExplanation,
          version,
        })
      ).toBe(true);
    }
  });

  it("places no interaction, because only the prompt of an item does", () => {
    expect(
      failsStrict(ItemExplanationSchema, {
        ...tkaMultipleExplanation,
        document: doc(paragraph(text("Karena itu.")), place("answer")),
      })
    ).toBe(true);
    expect(
      failsStrict(ItemExplanationSchema, {
        ...tkaMultipleExplanation,
        document: doc(paragraph(text("Karena itu."))),
      })
    ).toBe(false);
  });

  it("holds its document and the version it explains, and nothing else", () => {
    for (const change of [
      { hash: hash("1") },
      { answers: [] },
      { prompt: note("Pilih satu.") },
    ]) {
      expect(
        failsStrict(ItemExplanationSchema, {
          ...tkaMultipleExplanation,
          ...change,
        })
      ).toBe(true);
    }
  });

  it("is a record that Convex stores as one row, so it fits 1 MiB with its version", () => {
    /** Builds an explanation whose document holds the given text. */
    const explaining = (filler: string) => ({
      document: note(filler),
      version: hash("1"),
    });

    expect(
      failsStrict(
        ItemExplanationSchema,
        recordOfBytes(explaining, MAX_RECORD_BYTES)
      )
    ).toBe(false);
    expect(
      failsStrict(
        ItemExplanationSchema,
        recordOfBytes(explaining, MAX_RECORD_BYTES + 1)
      )
    ).toBe(true);
  });
});
