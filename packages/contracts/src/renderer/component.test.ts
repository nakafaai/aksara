import { describe, expect, it } from "@effect/vitest";
import { Exit, Schema } from "effect";
import {
  RendererComponentsSchema,
  sortRendererComponents,
} from "#contracts/renderer/component";

describe("renderer components", () => {
  it("orders names by code unit without mutating or silently deduplicating", () => {
    const input = ["p", "InlineMath", "BlockMath", "InlineMath"];
    expect(sortRendererComponents(input)).toEqual([
      "BlockMath",
      "InlineMath",
      "InlineMath",
      "p",
    ]);
    expect(input).toEqual(["p", "InlineMath", "BlockMath", "InlineMath"]);
  });

  it.each([[], ["BlockMath"], ["BlockMath", "InlineMath", "p"]])(
    "accepts a canonical current component set: %j",
    (...names) => {
      expect(
        Exit.isSuccess(Schema.decodeExit(RendererComponentsSchema)(names))
      ).toBe(true);
    }
  );

  it.each([
    ["InlineMath", "BlockMath"],
    ["BlockMath", "BlockMath"],
    ["Chart.Axis"],
    ["block-math"],
    ["Block_Math"],
    ["$Block"],
    [""],
    [{ name: "BlockMath", version: 1 }],
  ])(
    "rejects malformed, duplicated, unordered, or versioned requirements: %j",
    (...names) => {
      expect(
        Exit.isFailure(
          Schema.decodeUnknownExit(RendererComponentsSchema)(names)
        )
      ).toBe(true);
    }
  );
});
