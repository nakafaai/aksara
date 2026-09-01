import { describe, expect, it } from "@effect/vitest";
import { Exit, Schema } from "effect";
import { FastCheck } from "effect/testing";

import { MathVisualSchema } from "#contracts/math/visual";

const planeFrame = {
  axes: "visible",
  grid: "visible",
  kind: "cartesian",
  x: { max: 10, min: -10 },
  y: { max: 10, min: -10 },
} as const;

/** Wraps one test object in the smallest complete plane scene. */
function planeScene(mathObject: unknown) {
  return {
    frame: planeFrame,
    objects: [mathObject],
    space: "plane",
    view: { kind: "fit" },
  };
}

/** Returns a stable common object shape for one test primitive. */
function object(kind: string, fields: Record<string, unknown>) {
  return { appearance: "primary", id: `${kind}-fixture`, kind, ...fields };
}

describe("plane math visual", () => {
  it("decodes every supported object", () => {
    const visual = Schema.decodeUnknownSync(MathVisualSchema)({
      frame: planeFrame,
      labels: [
        { at: { x: 0, y: 0 }, key: "origin", placement: "below" },
        { at: { x: 2, y: 2 }, key: "turning-point" },
      ],
      objects: [
        object("point", { at: { x: 0, y: 0 } }),
        object("line", {
          through: [
            { x: -1, y: 0 },
            { x: 1, y: 0 },
          ],
        }),
        object("ray", {
          from: { x: 0, y: 0 },
          through: { x: 1, y: 1 },
        }),
        object("segment", {
          from: { x: -1, y: -1 },
          to: { x: 1, y: 1 },
        }),
        object("polyline", {
          vertices: [
            { x: -2, y: 0 },
            { x: 0, y: 1 },
            { x: 2, y: 0 },
          ],
        }),
        object("polygon", {
          vertices: [
            { x: 0, y: 0 },
            { x: 3, y: 0 },
            { x: 0, y: 2 },
          ],
        }),
        object("circle", { center: { x: 1, y: 1 }, radius: 3 }),
        object("arc", {
          center: { x: 0, y: 0 },
          radius: 2,
          startDegrees: 30,
          sweepDegrees: -120,
        }),
        object("quadratic", {
          coefficients: { a: 1, b: 0, c: 0 },
          domain: { max: 2, min: -2 },
          inputAxis: "x",
        }),
      ],
      space: "plane",
      view: { kind: "fit", padding: 1 },
    });

    expect(visual.objects.map(({ kind }) => kind)).toEqual([
      "point",
      "line",
      "ray",
      "segment",
      "polyline",
      "polygon",
      "circle",
      "arc",
      "quadratic",
    ]);
  });

  it.each(["spline", "closed-spline"] as const)(
    "rejects undefined %s interpolation",
    (kind) => {
      expect(
        Exit.isFailure(
          Schema.decodeUnknownExit(MathVisualSchema)(
            planeScene(
              object(kind, {
                samples: [
                  { x: -1, y: 0 },
                  { x: 0, y: 1 },
                  { x: 1, y: 0 },
                ],
              })
            )
          )
        )
      ).toBe(true);
    }
  );

  it("rejects degenerate constructions", () => {
    const same = { x: 1, y: 1 };
    const invalidObjects = [
      object("line", { through: [same, same] }),
      object("ray", { from: same, through: same }),
      object("segment", { from: same, to: same }),
      object("polyline", { vertices: [same, same] }),
      object("polygon", {
        vertices: [
          { x: 0, y: 0 },
          { x: 1, y: 1 },
          { x: 2, y: 2 },
        ],
      }),
      object("polygon", {
        vertices: [
          { x: 1_000_000, y: 1_000_000 },
          { x: 1_000_001, y: 1_000_002 },
          { x: 1_000_002, y: 1_000_004 },
        ],
      }),
      object("circle", { center: same, radius: 0 }),
      object("arc", {
        center: same,
        radius: 1,
        startDegrees: 360,
        sweepDegrees: 0,
      }),
      object("arc", {
        center: same,
        radius: 1,
        startDegrees: 0,
        sweepDegrees: 360,
      }),
    ];
    for (const invalidObject of invalidObjects) {
      expect(
        Exit.isFailure(
          Schema.decodeUnknownExit(MathVisualSchema)(planeScene(invalidObject))
        )
      ).toBe(true);
    }
  });

  it("accepts every translated non-degenerate segment", () => {
    const integer = FastCheck.integer({ max: 1_000_000, min: -1_000_000 });
    const positive = FastCheck.integer({ max: 1_000_000, min: 1 });
    FastCheck.assert(
      FastCheck.property(integer, integer, positive, positive, (x, y, dx, dy) =>
        Exit.isSuccess(
          Schema.decodeExit(MathVisualSchema)({
            frame: {
              ...planeFrame,
              x: { max: 2_000_001, min: -2_000_001 },
              y: { max: 2_000_001, min: -2_000_001 },
            },
            objects: [
              {
                appearance: "construction",
                from: { x, y },
                id: "translated-segment",
                kind: "segment",
                to: { x: x + dx, y: y + dy },
              },
            ],
            space: "plane",
            view: { kind: "fit", padding: 0 },
          })
        )
      )
    );
  });

  it("accepts resolvable polygon area across translation and scale", () => {
    const maximum = Number.MAX_VALUE;
    for (const vertices of [
      [
        { x: 1_000_000, y: 1_000_000 },
        { x: 1_000_001, y: 1_000_002 },
        { x: 1_000_002, y: 1_000_004.000_001 },
      ],
      [
        { x: 0, y: 0 },
        { x: 1e-200, y: 0 },
        { x: 0, y: 1e-200 },
      ],
      [
        { x: -maximum, y: 0 },
        { x: maximum, y: 0 },
        { x: 0, y: maximum },
      ],
      [
        { x: 0, y: -maximum },
        { x: maximum, y: 0 },
        { x: 0, y: maximum },
      ],
    ]) {
      expect(
        Exit.isSuccess(
          Schema.decodeUnknownExit(MathVisualSchema)({
            ...planeScene(object("polygon", { vertices })),
            frame: {
              ...planeFrame,
              x: { max: maximum, min: -maximum },
              y: { max: maximum, min: -maximum },
            },
          })
        )
      ).toBe(true);
    }
  });
});
