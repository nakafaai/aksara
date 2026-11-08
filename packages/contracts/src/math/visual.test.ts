import { describe, expect, it } from "@effect/vitest";
import { Effect, Exit, Schema } from "effect";

import { ContractDecodeError } from "#contracts/errors";
import { MATH_VISUAL_RESOLUTION_MESSAGE } from "#contracts/math/resolution";
import {
  decodeMathVisual,
  MathVisualSchema,
  mathVisualLabelKeys,
} from "#contracts/math/visual";

const BELOW_RENDER_RESOLUTION = 2 ** -24;

const planeFrame = {
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
          { at: { x: 0, y: 0 }, key: "same", objectId: "origin-point" },
          { at: { x: 1, y: 1 }, key: "same", objectId: "origin-point" },
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
          {
            at: { x: 0, y: 0 },
            key: "origin",
            objectId: "origin-point",
            placement: "below",
          },
          {
            at: { x: 2, y: 2 },
            key: "turning-point",
            objectId: "origin-point",
          },
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

  it.effect(
    "rejects a missing or unresolved label owner with an exact contract error",
    () =>
      Effect.gen(function* () {
        for (const label of [
          { at: { x: 0, y: 0 }, key: "unbound" },
          { at: { x: 0, y: 0 }, key: "unknown", objectId: "absent-object" },
        ]) {
          const error = yield* decodeMathVisual({
            ...planeScene(),
            labels: [label],
          }).pipe(Effect.flip);
          expect(error).toBeInstanceOf(ContractDecodeError);
          expect(error.message).toContain("objectId");
        }
      })
  );

  it.effect("surfaces one tagged contract error for unresolved scenes", () =>
    Effect.gen(function* () {
      const error = yield* decodeMathVisual({
        ...planeScene(),
        objects: [
          {
            appearance: "primary",
            from: { x: 0, y: 0 },
            id: "unresolved-segment",
            kind: "segment",
            to: { x: BELOW_RENDER_RESOLUTION, y: 0 },
          },
        ],
      }).pipe(Effect.flip);

      expect(error).toBeInstanceOf(ContractDecodeError);
      expect(error.contract).toBe("MathVisual");
      expect(error.message).toContain(MATH_VISUAL_RESOLUTION_MESSAGE);
    })
  );

  it.effect(
    "draws a unit circle whose point, labels, and values follow a slider",
    () =>
      Effect.gen(function* () {
        const circle = {
          frame: {
            kind: "cartesian",
            x: { max: 1.5, min: -1.5 },
            y: { max: 1.5, min: -1.5 },
          },
          labels: [
            {
              at: { x: "cos(a)", y: "sin(a)" },
              key: "point",
              objectId: "point",
              placement: "above-right",
            },
            {
              at: { x: "cos(a) / 2", y: "0" },
              key: "cosine",
              objectId: "legs",
            },
            { at: { x: 1, y: 0 }, key: "one", objectId: "circle" },
          ],
          objects: [
            {
              angle: { max: 2 * Math.PI, min: 0 },
              appearance: "reference",
              id: "circle",
              kind: "polar",
              radius: "1",
            },
            {
              appearance: "primary",
              id: "point",
              kind: "marker",
              x: "cos(a)",
              y: "sin(a)",
            },
            {
              appearance: "secondary",
              closed: true,
              id: "legs",
              kind: "path",
              points: [
                { x: "0", y: "0" },
                { x: "cos(a)", y: "0" },
                { x: "cos(a)", y: "sin(a)" },
              ],
            },
            {
              appearance: "construction",
              formula: "x",
              id: "diagonal",
              kind: "function",
            },
          ],
          parameters: [
            {
              label: "angle",
              max: 2 * Math.PI,
              min: 0,
              name: "a",
              value: Math.PI / 6,
            },
          ],
          readouts: [
            { formula: "cos(a)", key: "cosine" },
            { formula: "sin(a)", key: "sine" },
          ],
          space: "plane",
          view: { kind: "fit" },
        } as const;

        const visual = yield* decodeMathVisual(circle);
        expect(mathVisualLabelKeys(visual)).toEqual([
          "point",
          "cosine",
          "one",
          "sine",
          "angle",
        ]);

        for (const at of [
          { x: "cos(a) + 2", y: "0" },
          { x: "1 / 0", y: "0" },
        ]) {
          const error = yield* decodeMathVisual({
            ...circle,
            labels: [{ at, key: "point", objectId: "diagonal" }],
          }).pipe(Effect.flip);
          expect(error.message).toContain("inside the Cartesian frame");
        }
        const unread = yield* decodeMathVisual({
          ...circle,
          labels: [
            { at: { x: "cos(", y: "0" }, key: "point", objectId: "point" },
          ],
        }).pipe(Effect.flip);
        expect(unread.message).not.toContain("inside the Cartesian frame");
      })
  );

  it.effect("names a space scene's anchors and slider labels", () =>
    Effect.gen(function* () {
      const visual = yield* decodeMathVisual({
        frame: {
          kind: "cartesian",
          x: { max: 2, min: -2 },
          y: { max: 2, min: -2 },
          z: { max: 2, min: -2 },
        },
        labels: [{ at: { x: 0, y: 0, z: 0 }, key: "peak", objectId: "bowl" }],
        objects: [
          {
            appearance: "primary",
            formula: "a (x^2 + y^2) / 4",
            id: "bowl",
            kind: "function",
          },
        ],
        parameters: [{ label: "depth", max: 1, min: -1, name: "a", value: 1 }],
        space: "space",
        view: { kind: "fit" },
      });
      expect(mathVisualLabelKeys(visual)).toEqual(["peak", "depth"]);
    })
  );
});
