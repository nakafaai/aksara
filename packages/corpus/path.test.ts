import { Schema } from "effect";
import { describe, expect, it } from "vitest";
import { encodeCorpusPath, LogicalCorpusSegmentSchema } from "#corpus/path";

/** Decodes one known-valid logical segment at the Vitest boundary. */
function logicalSegment(value: string) {
  return Schema.decodeUnknownSync(LogicalCorpusSegmentSchema)(value);
}

describe("corpus path", () => {
  it("keeps every physical chunk at two words", () => {
    expect(encodeCorpusPath(logicalSegment("function"))).toEqual(["function"]);
    expect(encodeCorpusPath(logicalSegment("inverse-function"))).toEqual([
      "inverse-function",
    ]);
    expect(
      encodeCorpusPath(logicalSegment("function-composition-inverse-function"))
    ).toEqual(["function-composition", "inverse-function"]);
    expect(
      encodeCorpusPath(
        logicalSegment("injective-surjective-bijective-function")
      )
    ).toEqual(["injective-surjective", "bijective-function"]);
    expect(
      encodeCorpusPath(logicalSegment("properties-of-function-composition"))
    ).toEqual(["properties-of", "function-composition"]);
  });

  it("rejects separators that would make the physical encoding ambiguous", () => {
    expect(() => logicalSegment("function_composition")).toThrow();
    expect(() => logicalSegment("Function-Composition")).toThrow();
    expect(() => logicalSegment("function--composition")).toThrow();
  });
});
