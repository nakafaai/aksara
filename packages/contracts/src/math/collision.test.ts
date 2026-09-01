import { assert, describe, it } from "@effect/vitest";
import { BigDecimal, Schema } from "effect";

import { unresolvedCollisionIndexes } from "#contracts/math/collision";
import {
  PlaneMathFrameSchema,
  PlaneMathObjectSchema,
} from "#contracts/math/plane";
import {
  planeResolutionIssues,
  spaceResolutionIssues,
} from "#contracts/math/resolution";
import {
  SpaceMathFrameSchema,
  SpaceMathObjectSchema,
} from "#contracts/math/space";

const THRESHOLD = BigDecimal.fromStringUnsafe("0.00000011920928955078125");
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

/** Decodes one plane object before collision checks. */
function planeObject(kind: string, fields: Record<string, unknown>) {
  return Schema.decodeUnknownSync(PlaneMathObjectSchema)({
    appearance: "primary",
    id: `${kind}-fixture`,
    kind,
    ...fields,
  });
}

/** Decodes one space object before collision checks. */
function spaceObject(kind: string, fields: Record<string, unknown>) {
  return Schema.decodeUnknownSync(SpaceMathObjectSchema)({
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

describe("mathematical visual collisions", () => {
  it("preserves authored-order attribution across sorted coordinate values", () => {
    const unresolved = unresolvedCollisionIndexes(
      [{ value: 1.8 * RESOLUTION }, { value: 0 }, { value: 0.9 * RESOLUTION }],
      THRESHOLD
    );

    assert.deepStrictEqual([...unresolved], [2]);
  });

  it("allows exact reuse while rejecting later distinct values", () => {
    const unresolved = unresolvedCollisionIndexes(
      [{ value: 0 }, { value: 0 }, { value: RESOLUTION / 2 }],
      THRESHOLD
    );

    assert.deepStrictEqual([...unresolved], [2]);
  });

  it("scales to detailed scenes without pairwise scans", () => {
    const entries = Array.from({ length: 10_000 }, (_, index) => ({
      value: index * RESOLUTION * 2,
    }));

    assert.strictEqual(unresolvedCollisionIndexes(entries, THRESHOLD).size, 0);
  });

  it("checks frame edges, label anchors, and radial extrema together", () => {
    const objects = [
      planeObject("point", {
        at: { x: 1 - BELOW_RESOLUTION, y: 0.75 },
      }),
      planeObject("circle", {
        center: { x: 0.5, y: 0.5 },
        radius: 0.25,
      }),
      planeObject("arc", {
        center: { x: 0.5, y: 0.5 },
        radius: 0.25 + BELOW_RESOLUTION,
        startDegrees: 0,
        sweepDegrees: 90,
      }),
    ];
    const labels = [
      { at: { x: 0.1, y: 0.1 }, key: "first" },
      { at: { x: 0.1 + BELOW_RESOLUTION, y: 0.1 }, key: "second" },
    ];

    assert.deepStrictEqual(
      paths(
        planeResolutionIssues(planeFrame, objects, labels, { kind: "fit" })
      ),
      [
        ["objects", 0, "at", "x"],
        ["labels", 1, "at", "x"],
        ["objects", 2, "radius"],
      ]
    );
  });

  it("rejects curved extrema that collapse into a frame boundary", () => {
    const circle = planeObject("circle", {
      center: { x: 0.5, y: 0.5 },
      radius: 0.5 - BELOW_RESOLUTION,
    });

    assert.deepStrictEqual(
      paths(planeResolutionIssues(planeFrame, [circle], [], { kind: "fit" })),
      [["objects", 0, "radius"]]
    );
  });

  it("rejects sub-threshold face separation between coincident cuboids", () => {
    const objects = [
      spaceObject("cuboid", {
        center: { x: 0.5, y: 0.5, z: 0.5 },
        size: { height: 0.5, length: 0.5, width: 0.5 },
      }),
      spaceObject("cuboid", {
        center: { x: 0.5, y: 0.5, z: 0.5 },
        size: {
          height: 0.5,
          length: 0.5 + BELOW_RESOLUTION,
          width: 0.5,
        },
      }),
    ];

    assert.deepStrictEqual(
      paths(spaceResolutionIssues(spaceFrame, objects, [], { kind: "fit" })),
      [["objects", 1, "size", "length"]]
    );
  });

  it("includes semantic targets and distant cameras in the envelope", () => {
    const point = spaceObject("point", {
      at: { x: 0.5, y: 0.5, z: 0.5 },
    });
    assert.deepStrictEqual(
      paths(
        spaceResolutionIssues(spaceFrame, [point], [], {
          kind: "isometric",
          target: { x: 0.5 + BELOW_RESOLUTION, y: 0.5, z: 0.5 },
        })
      ),
      [["objects", 0, "at", "x"]]
    );

    const distant = paths(
      spaceResolutionIssues(spaceFrame, [point], [], {
        kind: "camera",
        position: { x: 1e9 + 1, y: 0, z: 0 },
        target: { x: 1e9, y: 0, z: 0 },
      })
    );
    for (const path of [
      ["frame", "x"],
      ["frame", "y"],
      ["frame", "z"],
    ]) {
      assert.deepInclude(distant, path);
    }
  });
});
