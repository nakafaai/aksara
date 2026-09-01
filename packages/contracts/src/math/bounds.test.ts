import { assert, describe, it } from "@effect/vitest";
import { Exit, Schema } from "effect";

import { planeBoundsIssues, spaceBoundsIssues } from "#contracts/math/bounds";
import {
  PlaneMathFrameSchema,
  PlaneMathObjectSchema,
} from "#contracts/math/plane";
import {
  SpaceMathFrameSchema,
  SpaceMathObjectSchema,
} from "#contracts/math/space";
import { MathVisualSchema } from "#contracts/math/visual";

const planeFrame = Schema.decodeSync(PlaneMathFrameSchema)({
  axes: "visible",
  grid: "visible",
  kind: "cartesian",
  x: { max: 10, min: -10 },
  y: { max: 10, min: -10 },
});
const spaceFrame = Schema.decodeSync(SpaceMathFrameSchema)({
  ...planeFrame,
  z: { max: 10, min: -10 },
});

function p2(x: number, y: number) {
  return { x, y };
}

function p3(x: number, y: number, z: number) {
  return { x, y, z };
}

function planeObject(kind: string, fields: Record<string, unknown>) {
  return Schema.decodeUnknownSync(PlaneMathObjectSchema)({
    appearance: "primary",
    id: `${kind}-fixture`,
    kind,
    ...fields,
  });
}

function spaceObject(kind: string, fields: Record<string, unknown>) {
  return Schema.decodeUnknownSync(SpaceMathObjectSchema)({
    appearance: "primary",
    id: `${kind}-fixture`,
    kind,
    ...fields,
  });
}

describe("math visual bounds", () => {
  it("accepts every contained plane primitive and clips infinite definitions", () => {
    const objects = [
      planeObject("line", {
        through: [p2(-20, 0), p2(20, 0)],
      }),
      planeObject("ray", {
        from: p2(-20, -20),
        through: p2(-19, -19),
      }),
      planeObject("point", { at: p2(-10, 10) }),
      planeObject("segment", {
        from: p2(-2, -2),
        to: p2(2, 2),
      }),
      planeObject("polyline", {
        vertices: [p2(-2, 0), p2(0, 2)],
      }),
      planeObject("polygon", {
        vertices: [p2(-2, 0), p2(0, 2), p2(2, 0)],
      }),
      planeObject("circle", { center: p2(0, 0), radius: 10 }),
      planeObject("arc", {
        center: p2(0, 0),
        radius: 5,
        startDegrees: 315,
        sweepDegrees: 180,
      }),
      planeObject("arc", {
        center: p2(0, 0),
        radius: 5,
        startDegrees: 45,
        sweepDegrees: -180,
      }),
      planeObject("quadratic", {
        coefficients: { a: 1, b: 0, c: 0 },
        domain: { max: 2, min: -2 },
        inputAxis: "x",
      }),
      planeObject("quadratic", {
        coefficients: { a: 1, b: 6, c: 0 },
        domain: { max: 1, min: -1 },
        inputAxis: "y",
      }),
    ];

    assert.deepStrictEqual(
      planeBoundsIssues(planeFrame, objects, [
        { at: p2(10, -10), key: "boundary" },
      ]),
      []
    );
  });

  it("reports every finite plane escape", () => {
    const frame = {
      ...planeFrame,
      x: { max: 2, min: -2 },
      y: { max: 2, min: -2 },
    };
    const objects = [
      planeObject("line", {
        through: [p2(-20, 20), p2(20, 20)],
      }),
      planeObject("ray", {
        from: p2(-20, -20),
        through: p2(-21, -21),
      }),
      planeObject("point", { at: p2(3, 0) }),
      planeObject("point", { at: p2(0, 3) }),
      planeObject("segment", { from: p2(0, 0), to: p2(0, 3) }),
      planeObject("polyline", {
        vertices: [p2(0, 0), p2(3, 1)],
      }),
      planeObject("polygon", {
        vertices: [p2(0, 0), p2(3, 0), p2(0, 1)],
      }),
      planeObject("circle", { center: p2(3, 0), radius: 1 }),
      planeObject("arc", {
        center: p2(1.5, 0),
        radius: 1,
        startDegrees: 270,
        sweepDegrees: 180,
      }),
      planeObject("quadratic", {
        coefficients: { a: 1, b: 0, c: 0 },
        domain: { max: 1, min: -3 },
        inputAxis: "x",
      }),
      planeObject("quadratic", {
        coefficients: { a: 1, b: 0, c: 0 },
        domain: { max: 2, min: -2 },
        inputAxis: "x",
      }),
      planeObject("quadratic", {
        coefficients: { a: 1, b: 0, c: 0 },
        domain: { max: 2, min: -2 },
        inputAxis: "y",
      }),
    ];

    assert.deepStrictEqual(
      planeBoundsIssues(frame, objects, [{ at: p2(0, 3), key: "outside" }]),
      [
        ...objects.map((_, index) => ({
          issue: "Expected plane geometry visible inside its frame.",
          path: ["objects", index],
        })),
        {
          issue: "Expected a plane label anchor inside the Cartesian frame.",
          path: ["labels", 0, "at"],
        },
      ]
    );
  });

  it("checks every finite space primitive and clips infinite definitions", () => {
    const finite = [
      spaceObject("point", { at: p3(0, 0, 3) }),
      spaceObject("segment", {
        from: p3(0, 0, 0),
        to: p3(0, 3, 0),
      }),
      spaceObject("polyline", {
        vertices: [p3(0, 0, 0), p3(3, 1, 1)],
      }),
      spaceObject("polygon", {
        vertices: [p3(0, 0, 0), p3(3, 0, 0), p3(0, 1, 0)],
      }),
      spaceObject("cuboid", {
        center: p3(0, 0, 0),
        size: { height: 4, length: 6, width: 4 },
      }),
    ];
    const infinite = [
      spaceObject("line", {
        through: [p3(-20, 0, 0), p3(20, 0, 0)],
      }),
      spaceObject("ray", {
        from: p3(-20, -20, -20),
        through: p3(-19, -19, -19),
      }),
    ];
    assert.deepStrictEqual(
      spaceBoundsIssues(spaceFrame, [...infinite, ...finite], []),
      []
    );

    const frame = {
      ...spaceFrame,
      x: { max: 2, min: -2 },
      y: { max: 2, min: -2 },
      z: { max: 2, min: -2 },
    };
    const objects = [
      spaceObject("line", {
        through: [p3(-20, 0, 20), p3(20, 0, 20)],
      }),
      spaceObject("ray", {
        from: p3(-20, -20, -20),
        through: p3(-21, -21, -21),
      }),
      spaceObject("point", { at: p3(3, 0, 0) }),
      spaceObject("point", { at: p3(0, 3, 0) }),
      ...finite,
    ];
    assert.deepStrictEqual(
      spaceBoundsIssues(
        frame,
        [...infinite, ...objects],
        [{ at: p3(0, 0, 3), key: "outside" }]
      ),
      [
        ...objects.map((_, index) => ({
          issue: "Expected space geometry visible inside its frame.",
          path: ["objects", index + infinite.length],
        })),
        {
          issue: "Expected a space label anchor inside the Cartesian frame.",
          path: ["labels", 0, "at"],
        },
      ]
    );
  });

  it("enforces quadratic identity and scene-level containment", () => {
    assert.ok(
      Exit.isFailure(
        Schema.decodeExit(PlaneMathObjectSchema)({
          appearance: "primary",
          coefficients: { a: 0, b: 1, c: 2 },
          domain: { max: 1, min: -1 },
          id: "linear-impostor",
          inputAxis: "x",
          kind: "quadratic",
        })
      )
    );
    assert.ok(
      Exit.isFailure(
        Schema.decodeExit(MathVisualSchema)({
          frame: {
            ...planeFrame,
            x: { max: 2, min: -2 },
            y: { max: 2, min: -2 },
          },
          objects: [planeObject("point", { at: p2(3, 0) })],
          space: "plane",
          view: { kind: "fit" },
        })
      )
    );
  });
});
