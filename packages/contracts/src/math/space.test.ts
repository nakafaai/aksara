import { describe, expect, it } from "@effect/vitest";
import { Exit, Schema } from "effect";
import { FastCheck } from "effect/testing";

import { MathVisualSchema } from "#contracts/math/visual";

const spaceFrame = {
  axes: "visible",
  grid: "visible",
  kind: "cartesian",
  x: { max: 10, min: -10 },
  y: { max: 10, min: -10 },
  z: { max: 10, min: -10 },
} as const;

/** Wraps one test object in the smallest complete space scene. */
function spaceScene(mathObject: unknown) {
  return {
    frame: spaceFrame,
    objects: [mathObject],
    space: "space",
    view: { kind: "fit" },
  };
}

/** Returns a stable common object shape for one test primitive. */
function object(kind: string, fields: Record<string, unknown>) {
  return { appearance: "primary", id: `${kind}-fixture`, kind, ...fields };
}

describe("space math visual", () => {
  it("decodes every supported object and semantic view", () => {
    const objects = [
      object("point", { at: { x: 0, y: 0, z: 0 } }),
      object("line", {
        through: [
          { x: -1, y: 0, z: 0 },
          { x: 1, y: 0, z: 0 },
        ],
      }),
      object("ray", {
        from: { x: 0, y: 0, z: 0 },
        through: { x: 1, y: 1, z: 1 },
      }),
      object("segment", {
        from: { x: -1, y: -1, z: -1 },
        to: { x: 1, y: 1, z: 1 },
      }),
      object("polyline", {
        vertices: [
          { x: -2, y: 0, z: 0 },
          { x: 0, y: 1, z: 1 },
          { x: 2, y: 0, z: 2 },
        ],
      }),
      object("polygon", {
        vertices: [
          { x: 0, y: 0, z: 2 },
          { x: 1, y: 0, z: 2 },
          { x: 3, y: 0, z: 2 },
          { x: 0, y: 2, z: 2 },
        ],
      }),
      object("cuboid", {
        center: { x: 0, y: 0, z: 0 },
        size: { height: 4, length: 6, width: 5 },
      }),
    ];

    for (const view of [
      { kind: "fit", padding: 2 },
      { kind: "isometric" },
      { kind: "isometric", target: { x: -10, y: 10, z: 10 } },
      {
        kind: "camera",
        position: { x: 8, y: 6, z: 10 },
        target: { x: 0, y: 0, z: 0 },
      },
    ]) {
      expect(
        Exit.isSuccess(
          Schema.decodeUnknownExit(MathVisualSchema)({
            frame: spaceFrame,
            labels: [{ at: { x: 0, y: 0, z: 0 }, key: "center" }],
            objects,
            space: "space",
            view,
          })
        )
      ).toBe(true);
    }
  });

  it.each(["spline", "closed-spline"] as const)(
    "rejects undefined %s interpolation",
    (kind) => {
      expect(
        Exit.isFailure(
          Schema.decodeUnknownExit(MathVisualSchema)(
            spaceScene(
              object(kind, {
                samples: [
                  { x: -1, y: 0, z: 0 },
                  { x: 0, y: 1, z: 1 },
                  { x: 1, y: 0, z: 0 },
                ],
              })
            )
          )
        )
      ).toBe(true);
    }
  );

  it("rejects non-planar polygons, invalid cuboids, and degenerate cameras", () => {
    const point = object("point", { at: { x: 0, y: 0, z: 0 } });
    const invalidScenes = [
      spaceScene(
        object("polygon", {
          vertices: [
            { x: 0, y: 0, z: 0 },
            { x: 1, y: 0, z: 0 },
            { x: 0, y: 1, z: 0 },
            { x: 1, y: 1, z: 1 },
          ],
        })
      ),
      spaceScene(
        object("polygon", {
          vertices: [
            { x: 0, y: 0, z: 0 },
            { x: 1e-8, y: 0, z: 0 },
            { x: 0, y: 1e-8, z: 0 },
            { x: 0, y: 1e-8, z: 1 },
          ],
        })
      ),
      spaceScene(
        object("polygon", {
          vertices: [
            { x: 0, y: 0, z: 0 },
            { x: 1, y: 1, z: 1 },
            { x: 2, y: 2, z: 2 },
          ],
        })
      ),
      spaceScene(
        object("cuboid", {
          center: { x: 0, y: 0, z: 0 },
          size: { height: 4, length: 0, width: 5 },
        })
      ),
      {
        ...spaceScene(point),
        view: {
          kind: "isometric",
          target: { x: -10.000_000_000_000_002, y: 10, z: 10 },
        },
      },
      {
        ...spaceScene(point),
        view: {
          kind: "camera",
          position: { x: 0, y: 0, z: 0 },
          target: { x: 0, y: 0, z: 0 },
        },
      },
    ];
    for (const invalid of invalidScenes) {
      expect(
        Exit.isFailure(Schema.decodeUnknownExit(MathVisualSchema)(invalid))
      ).toBe(true);
    }
  });

  it("accepts every positive cuboid size with the documented axis mapping", () => {
    const positive = FastCheck.integer({ max: 1_000_000, min: 1 });
    FastCheck.assert(
      FastCheck.property(
        positive,
        positive,
        positive,
        (length, width, height) =>
          Exit.isSuccess(
            Schema.decodeExit(MathVisualSchema)({
              frame: {
                ...spaceFrame,
                x: { max: 2_000_001, min: -2_000_001 },
                y: { max: 2_000_001, min: -2_000_001 },
                z: { max: 2_000_001, min: -2_000_001 },
              },
              objects: [
                {
                  appearance: "primary",
                  center: { x: 0, y: 0, z: 0 },
                  id: "generated-cuboid",
                  kind: "cuboid",
                  size: { height, length, width },
                },
              ],
              space: "space",
              view: { kind: "isometric" },
            })
          )
      )
    );
  });

  it("accepts coplanar polygons across translation and scale", () => {
    const maximum = Number.MAX_VALUE;
    for (const { frame, vertices } of [
      {
        frame: {
          x: { max: 1_000_000_000_002, min: 1_000_000_000_000 },
          y: { max: 1_000_000_000_002, min: 1_000_000_000_000 },
          z: { max: 9, min: 7 },
        },
        vertices: [
          { x: 1_000_000_000_000, y: 1_000_000_000_000, z: 8 },
          { x: 1_000_000_000_001, y: 1_000_000_000_000, z: 8 },
          { x: 1_000_000_000_001, y: 1_000_000_000_001, z: 8 },
          { x: 1_000_000_000_000, y: 1_000_000_000_001, z: 8 },
        ],
      },
      {
        frame: {
          x: { max: 1e-200, min: 0 },
          y: { max: 1e-200, min: 0 },
          z: { max: 1e-200, min: -1e-200 },
        },
        vertices: [
          { x: 0, y: 0, z: 0 },
          { x: 1e-200, y: 0, z: 0 },
          { x: 0, y: 1e-200, z: 0 },
        ],
      },
      ...[
        [
          { x: -maximum, y: 0, z: 0 },
          { x: maximum, y: 0, z: 0 },
          { x: 0, y: maximum, z: 0 },
        ],
        [
          { x: 0, y: -maximum, z: 0 },
          { x: maximum, y: 0, z: 0 },
          { x: 0, y: maximum, z: 0 },
        ],
        [
          { x: 0, y: 0, z: -maximum },
          { x: maximum, y: 0, z: 0 },
          { x: 0, y: 0, z: maximum },
        ],
      ].map((extremeVertices) => ({
        frame: {
          x: { max: maximum, min: -maximum },
          y: { max: maximum, min: -maximum },
          z: { max: maximum, min: -maximum },
        },
        vertices: extremeVertices,
      })),
    ]) {
      expect(
        Exit.isSuccess(
          Schema.decodeUnknownExit(MathVisualSchema)({
            ...spaceScene(object("polygon", { vertices })),
            frame: { ...spaceFrame, ...frame },
          })
        )
      ).toBe(true);
    }
  });
});
