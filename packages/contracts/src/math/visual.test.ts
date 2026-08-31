import { describe, expect, it } from "@effect/vitest";
import { Effect, Exit, Schema } from "effect";

import { ContractDecodeError } from "#contracts/errors";
import {
  decodeMathVisual,
  MathVisualSchema,
  mathVisualLabelKeys,
} from "#contracts/math/visual";

const planeFrame = {
  axes: "visible",
  grid: "visible",
  kind: "cartesian",
  x: { max: 10, min: -10 },
  y: { max: 10, min: -10 },
} as const;

const point = {
  appearance: "primary",
  at: { x: 0, y: 0 },
  id: "origin-point",
  kind: "point",
} as const;

/** Builds the smallest complete plane scene for boundary tests. */
function planeScene() {
  return {
    frame: planeFrame,
    objects: [point],
    space: "plane",
    view: { kind: "fit" },
  } as const;
}

describe("math visual boundary", () => {
  it("rejects ambiguous identities, frames, and label keys", () => {
    for (const invalid of [
      { ...planeScene(), objects: [{ ...point, id: "Not Canonical" }] },
      { ...planeScene(), frame: { ...planeFrame, x: { max: 0, min: 0 } } },
      { ...planeScene(), objects: [point, point] },
      {
        ...planeScene(),
        labels: [
          { at: { x: 0, y: 0 }, key: "same" },
          { at: { x: 1, y: 1 }, key: "same" },
        ],
      },
    ]) {
      expect(
        Exit.isFailure(Schema.decodeUnknownExit(MathVisualSchema)(invalid))
      ).toBe(true);
    }
  });

  it.effect("decodes strictly and exposes exact rich-label keys", () =>
    Effect.gen(function* () {
      const visual = yield* decodeMathVisual({
        ...planeScene(),
        labels: [
          { at: { x: 0, y: 0 }, key: "origin", placement: "below" },
          { at: { x: 2, y: 2 }, key: "turning-point" },
        ],
      });
      expect(mathVisualLabelKeys(visual)).toEqual(["origin", "turning-point"]);

      const error = yield* decodeMathVisual({
        ...planeScene(),
        rendererOnly: true,
      }).pipe(Effect.flip);
      expect(error).toBeInstanceOf(ContractDecodeError);
      expect(error.contract).toBe("MathVisual");
      expect(
        mathVisualLabelKeys(yield* decodeMathVisual(planeScene()))
      ).toEqual([]);
    })
  );
});
