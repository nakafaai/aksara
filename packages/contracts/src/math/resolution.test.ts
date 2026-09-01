import { assert, describe, it } from "@effect/vitest";
import { Schema } from "effect";

import {
  PlaneMathFrameSchema,
  PlaneMathObjectSchema,
} from "#contracts/math/plane";
import {
  MATH_VISUAL_RESOLUTION_MESSAGE,
  planeResolutionIssues,
  spaceResolutionIssues,
} from "#contracts/math/resolution";
import {
  SpaceMathFrameSchema,
  SpaceMathObjectSchema,
} from "#contracts/math/space";

const RESOLUTION = 2 ** -23;
const BELOW_RESOLUTION = RESOLUTION / 2;

const planeFrame = Schema.decodeSync(PlaneMathFrameSchema)({
  axes: "visible",
  grid: "visible",
  kind: "cartesian",
  x: { max: 1, min: 0 },
  y: { max: 1, min: 0 },
});
const spaceFrame = Schema.decodeSync(SpaceMathFrameSchema)({
  ...planeFrame,
  z: { max: 1, min: 0 },
});

/** Decodes one plane primitive before scene-level resolution checks. */
function planeObject(kind: string, fields: Record<string, unknown>) {
  return Schema.decodeUnknownSync(PlaneMathObjectSchema)({
    appearance: "primary",
    id: `${kind}-fixture`,
    kind,
    ...fields,
  });
}

/** Decodes one space primitive before scene-level resolution checks. */
function spaceObject(kind: string, fields: Record<string, unknown>) {
  return Schema.decodeUnknownSync(SpaceMathObjectSchema)({
    appearance: "primary",
    id: `${kind}-fixture`,
    kind,
    ...fields,
  });
}

/** Asserts the common contract error and returns only its authored paths. */
function paths(issues: ReturnType<typeof planeResolutionIssues>) {
  return issues.map((candidate) => {
    assert.ok(
      typeof candidate === "object" &&
        "issue" in candidate &&
        "path" in candidate &&
        candidate.issue === MATH_VISUAL_RESOLUTION_MESSAGE
    );
    return candidate.path;
  });
}

/** Asserts issue paths for objects in the standard plane frame and fit view. */
function assertPlanePaths(
  objects: Parameters<typeof planeResolutionIssues>[1],
  expected: ReturnType<typeof paths>
) {
  assert.deepStrictEqual(
    paths(planeResolutionIssues(planeFrame, objects, { kind: "fit" })),
    expected
  );
}

describe("math visual render resolution", () => {
  it("accepts exact-threshold and intentionally axis-aligned plane deltas", () => {
    const objects = [
      planeObject("segment", {
        from: { x: 0, y: 0 },
        to: { x: RESOLUTION, y: 0 },
      }),
      planeObject("line", {
        through: [
          { x: 0, y: 0 },
          { x: 1, y: 0 },
        ],
      }),
      planeObject("circle", {
        center: { x: 0.5, y: 0.5 },
        radius: RESOLUTION,
      }),
      planeObject("quadratic", {
        coefficients: { a: 4 * RESOLUTION, b: 0, c: 0 },
        domain: { max: 1, min: 0 },
        inputAxis: "x",
      }),
    ];

    assert.deepStrictEqual(
      planeResolutionIssues(planeFrame, objects, { kind: "fit", padding: 0 }),
      []
    );
  });

  it("reports plane frames, view measures, objects, and exact curve identity", () => {
    const skinnyFrame = Schema.decodeSync(PlaneMathFrameSchema)({
      ...planeFrame,
      x: { max: BELOW_RESOLUTION, min: 0 },
    });
    const point = planeObject("point", { at: { x: 0, y: 0 } });
    assert.deepStrictEqual(
      paths(planeResolutionIssues(skinnyFrame, [point], { kind: "fit" })),
      [["frame", "x"]]
    );
    assert.deepStrictEqual(
      paths(
        planeResolutionIssues(planeFrame, [point], {
          kind: "fit",
          padding: BELOW_RESOLUTION,
        })
      ),
      [["view", "padding"]]
    );

    const objects = [
      planeObject("segment", {
        from: { x: 0, y: 0 },
        to: { x: BELOW_RESOLUTION, y: 0 },
      }),
      planeObject("circle", {
        center: { x: 0.5, y: 0.5 },
        radius: BELOW_RESOLUTION,
      }),
      planeObject("arc", {
        center: { x: 0.5, y: 0.5 },
        radius: 0.25,
        startDegrees: 0,
        sweepDegrees: BELOW_RESOLUTION,
      }),
      planeObject("quadratic", {
        coefficients: { a: 2 * RESOLUTION, b: 0, c: 0 },
        domain: { max: 1, min: 0 },
        inputAxis: "x",
      }),
      planeObject("quadratic", {
        coefficients: { a: 1, b: 0, c: 0 },
        domain: { max: BELOW_RESOLUTION, min: 0 },
        inputAxis: "x",
      }),
    ];
    assertPlanePaths(objects, [
      ["objects", 0, "to", "x"],
      ["objects", 1, "radius"],
      ["objects", 2, "sweepDegrees"],
      ["objects", 3, "coefficients", "a"],
      ["objects", 4, "domain"],
      ["objects", 4, "coefficients", "a"],
    ]);
  });

  it("rejects plane line visibility below the exact corner threshold", () => {
    /** Builds a diagonal whose frame-visible span is the requested value. */
    const line = (visible: number) =>
      planeObject("line", {
        through: [
          { x: 0, y: 1 - visible },
          { x: 1, y: 2 - visible },
        ],
      });

    assertPlanePaths([line(BELOW_RESOLUTION)], [["objects", 0]]);
    assert.deepStrictEqual(
      planeResolutionIssues(planeFrame, [line(RESOLUTION)], { kind: "fit" }),
      []
    );
    assertPlanePaths(
      [
        planeObject("line", {
          through: [
            { x: 0, y: 2 },
            { x: 1, y: 2 },
          ],
        }),
      ],
      [["objects", 0]]
    );
  });

  it("keeps infinite-path resolution invariant under direction scaling", () => {
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

    assertPlanePaths(objects, []);
  });

  it("uses the actual arc chord at the render threshold", () => {
    const radius = 0.25;
    const resolvableSweep =
      (360 * Math.asin((1.25 * RESOLUTION) / (2 * radius))) / Math.PI;
    const unresolvedSweep =
      (360 * Math.asin((0.75 * RESOLUTION) / (2 * radius))) / Math.PI;
    const objects = [
      planeObject("arc", {
        center: { x: 0.5, y: 0.5 },
        radius,
        startDegrees: 0,
        sweepDegrees: resolvableSweep,
      }),
      planeObject("arc", {
        center: { x: 0.5, y: 0.5 },
        radius,
        startDegrees: 0,
        sweepDegrees: unresolvedSweep,
      }),
    ];

    assertPlanePaths(objects, [["objects", 1, "sweepDegrees"]]);
  });

  it("rejects unresolved coordinates across separate finite objects", () => {
    const objects = [
      planeObject("point", { at: { x: 0, y: 0 } }),
      planeObject("point", { at: { x: BELOW_RESOLUTION, y: 0 } }),
    ];

    assertPlanePaths(objects, [["objects", 1, "at", "x"]]);
  });

  it("accepts axis-aligned cameras and rejects unresolved space semantics", () => {
    const point = spaceObject("point", { at: { x: 0, y: 0, z: 0 } });
    assert.deepStrictEqual(
      spaceResolutionIssues(spaceFrame, [point], {
        kind: "camera",
        position: { x: 1, y: 0, z: 0 },
        target: { x: 0, y: 0, z: 0 },
      }),
      []
    );
    assert.deepStrictEqual(
      paths(
        spaceResolutionIssues(spaceFrame, [point], {
          kind: "camera",
          position: { x: 1, y: BELOW_RESOLUTION, z: 0 },
          target: { x: 0, y: 0, z: 0 },
        })
      ),
      [["view", "target", "y"]]
    );

    const objects = [
      spaceObject("polyline", {
        vertices: [
          { x: 0, y: 0, z: 0 },
          { x: BELOW_RESOLUTION, y: 1, z: 0 },
        ],
      }),
      spaceObject("cuboid", {
        center: { x: 0.5, y: 0.5, z: 0.5 },
        size: { height: 0.5, length: BELOW_RESOLUTION, width: 0.5 },
      }),
    ];
    assert.deepStrictEqual(
      paths(spaceResolutionIssues(spaceFrame, objects, { kind: "isometric" })),
      [
        ["objects", 0, "vertices", 1, "x"],
        ["objects", 1, "size", "length"],
      ]
    );
  });

  it("rejects a space ray whose exact visible corner span collapses", () => {
    /** Builds a space diagonal whose frame-visible span is the requested value. */
    const ray = (visible: number) =>
      spaceObject("ray", {
        from: { x: 0, y: 1 - visible, z: 1 - visible },
        through: { x: 1, y: 2 - visible, z: 2 - visible },
      });

    assert.deepStrictEqual(
      paths(
        spaceResolutionIssues(spaceFrame, [ray(BELOW_RESOLUTION)], {
          kind: "fit",
        })
      ),
      [["objects", 0]]
    );
    assert.deepStrictEqual(
      spaceResolutionIssues(spaceFrame, [ray(RESOLUTION)], { kind: "fit" }),
      []
    );
  });
});
