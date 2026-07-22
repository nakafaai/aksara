import { Schema } from "effect";
import { describe, expect, it } from "vitest";
import { encodeCorpusPath, LogicalCorpusSegmentSchema } from "#corpus/path";

/** Decodes one known-valid logical segment at the Vitest boundary. */
function logicalSegment(value: string) {
  return Schema.decodeUnknownSync(LogicalCorpusSegmentSchema)(value);
}

describe("corpus path", () => {
  it("marks every non-final chunk and keeps every chunk at two words", () => {
    expect(encodeCorpusPath(logicalSegment("function"))).toEqual(["function"]);
    expect(encodeCorpusPath(logicalSegment("inverse-function"))).toEqual([
      "inverse-function",
    ]);
    expect(
      encodeCorpusPath(logicalSegment("function-composition-inverse-function"))
    ).toEqual(["function-composition_", "inverse-function"]);
    expect(
      encodeCorpusPath(
        logicalSegment("injective-surjective-bijective-function")
      )
    ).toEqual(["injective-surjective_", "bijective-function"]);
    expect(
      encodeCorpusPath(logicalSegment("properties-of-function-composition"))
    ).toEqual(["properties-of_", "function-composition"]);
  });

  it("rejects separators that would make the physical encoding ambiguous", () => {
    expect(() => logicalSegment("function_composition")).toThrow();
    expect(() => logicalSegment("Function-Composition")).toThrow();
    expect(() => logicalSegment("function--composition")).toThrow();
  });
});
