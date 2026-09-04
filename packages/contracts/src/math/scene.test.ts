import { assert, describe, it } from "@effect/vitest";
import { Schema } from "effect";

import {
  PlaneMathFrameSchema,
  PlaneMathObjectSchema,
} from "#contracts/math/plane";
import { planeResolutionIssues } from "#contracts/math/resolution";

const RESOLUTION = 2 ** -23;
const BELOW_RESOLUTION = RESOLUTION / 2;

const planeFrame = Schema.decodeSync(PlaneMathFrameSchema)({
  axes: "visible",
  grid: "visible",
  kind: "cartesian",
  x: { max: 1, min: 0 },
  y: { max: 1, min: 0 },
});

/** Decodes one plane object before scene-coordinate checks. */
function planeObject(kind: string, fields: Record<string, unknown>) {
  return Schema.decodeUnknownSync(PlaneMathObjectSchema)({
    appearance: "primary",
    id: `${kind}-fixture`,
    kind,
    ...fields,
  });
}

/** Returns authored paths from stable resolution issues. */
function paths(issues: ReturnType<typeof planeResolutionIssues>) {
  return issues.map((candidate) =>
    typeof candidate === "object" && "path" in candidate ? candidate.path : []
  );
}

describe("ordered mathematical scene coordinates", () => {
  it("compares exact radial extrema with later finite scene coordinates", () => {
    const objects = [
      planeObject("circle", {
        center: { x: 0.5, y: 0.5 },
        radius: 0.25,
      }),
      planeObject("point", {
        at: { x: 0.75 + BELOW_RESOLUTION, y: 0.5 },
      }),
    ];

    assert.deepStrictEqual(
      paths(planeResolutionIssues(planeFrame, objects, [], { kind: "fit" })),
      [["objects", 1, "at", "x"]]
    );
  });

  it("compares bounded non-cardinal arc endpoints with exact coordinates", () => {
    const endpointX = 0.5 + 0.25 * Math.cos(Math.PI / 4);
    const objects = [
      planeObject("arc", {
        center: { x: 0.5, y: 0.5 },
        radius: 0.25,
        startDegrees: 45,
        sweepDegrees: 45,
      }),
      planeObject("point", {
        at: { x: endpointX + BELOW_RESOLUTION, y: 0.1 },
      }),
    ];

    assert.deepStrictEqual(
      paths(planeResolutionIssues(planeFrame, objects, [], { kind: "fit" })),
      [["objects", 1, "at", "x"]]
    );
  });

  it("compares quadratic endpoints and vertices with frame edges", () => {
    const endpoint = planeObject("quadratic", {
      coefficients: { a: 0.5, b: 0, c: 0.5 - BELOW_RESOLUTION },
      domain: { max: 1, min: 0 },
      inputAxis: "x",
    });
    const vertex = planeObject("quadratic", {
      coefficients: {
        a: -0.5,
        b: 0.5,
        c: 0.875 - BELOW_RESOLUTION,
      },
      domain: { max: 1, min: 0 },
      inputAxis: "y",
    });

    assert.deepStrictEqual(
      paths(planeResolutionIssues(planeFrame, [endpoint], [], { kind: "fit" })),
      [["objects", 0]]
    );
    assert.deepStrictEqual(
      paths(planeResolutionIssues(planeFrame, [vertex], [], { kind: "fit" })),
      [["objects", 0]]
    );
  });

  it("compares canonical clipped coordinates across parallel lines", () => {
    const objects = [
      planeObject("line", {
        through: [
          { x: 0, y: 0.5 },
          { x: 1, y: 0.5 },
        ],
      }),
      planeObject("line", {
        through: [
          { x: 0, y: 0.5 + BELOW_RESOLUTION },
          { x: 1, y: 0.5 + BELOW_RESOLUTION },
        ],
      }),
    ];

    assert.deepStrictEqual(
      paths(planeResolutionIssues(planeFrame, objects, [], { kind: "fit" })),
      [["objects", 1]]
    );
  });

  it("keeps clipped path coordinates invariant under direction scaling", () => {
    const tinyDirection = RESOLUTION / 1024;
    const objects = [
      planeObject("line", {
        through: [
          { x: 0, y: 0 },
          { x: tinyDirection, y: tinyDirection },
        ],
      }),
      planeObject("ray", {
        from: { x: 0, y: 0 },
        through: { x: tinyDirection, y: tinyDirection },
      }),
    ];

    assert.deepStrictEqual(
      planeResolutionIssues(planeFrame, objects, [], { kind: "fit" }),
      []
    );
  });

  it("projects only the visible clipped interval of an exterior ray", () => {
    const ray = planeObject("ray", {
      from: { x: -BELOW_RESOLUTION, y: 0.25 },
      through: { x: 1, y: 0.25 },
    });

    assert.deepStrictEqual(
      planeResolutionIssues(planeFrame, [ray], [], { kind: "fit" }),
      []
    );
  });

  it("owns one stable path for each radial boundary failure", () => {
    const circle = planeObject("circle", {
      center: { x: 0.5, y: 0.5 },
      radius: 0.5 - BELOW_RESOLUTION,
    });
    assert.deepStrictEqual(
      paths(planeResolutionIssues(planeFrame, [circle], [], { kind: "fit" })),
      [["objects", 0, "radius"]]
    );

    const arc = planeObject("arc", {
      center: { x: 0.5, y: 0.5 },
      radius: 0.5 - BELOW_RESOLUTION,
      startDegrees: 45,
      sweepDegrees: 45,
    });
    assert.deepStrictEqual(
      paths(planeResolutionIssues(planeFrame, [arc], [], { kind: "fit" })),
      [["objects", 0]]
    );
  });
});
