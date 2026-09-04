import { assert, describe, it } from "@effect/vitest";
import { BigDecimal, Schema } from "effect";

import {
  PlaneMathFrameSchema,
  PlaneMathObjectSchema,
} from "#contracts/math/plane";
import { unresolvedProximityIndexes } from "#contracts/math/proximity";
import { numberRatio } from "#contracts/math/rational";
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

/** Lifts finite test values into exact rational proximity entries. */
function proximityEntries(values: readonly number[]) {
  return values.map((value) => ({ value: numberRatio(value) }));
}

describe("mathematical visual collisions", () => {
  it("preserves authored-order attribution across sorted coordinate values", () => {
    const unresolved = unresolvedProximityIndexes(
      proximityEntries([1.8 * RESOLUTION, 0, 0.9 * RESOLUTION]),
      THRESHOLD
    );

    assert.deepStrictEqual([...unresolved], [2]);
  });

  it("allows exact reuse while rejecting later distinct values", () => {
    const unresolved = unresolvedProximityIndexes(
      proximityEntries([0, 0, RESOLUTION / 2]),
      THRESHOLD
    );

    assert.deepStrictEqual([...unresolved], [2]);
  });

  it("uses explicit error bounds without treating estimates as exact", () => {
    const error = BigDecimal.fromNumberUnsafe(RESOLUTION / 16);
    const bounded = { error, value: numberRatio(0) };

    assert.deepStrictEqual(
      [
        ...unresolvedProximityIndexes(
          [bounded, { value: numberRatio(RESOLUTION / 2) }],
          THRESHOLD
        ),
      ],
      [1]
    );
    assert.strictEqual(
      unresolvedProximityIndexes(
        [bounded, { value: numberRatio(RESOLUTION / 32) }],
        THRESHOLD
      ).size,
      0
    );
  });

  it("scales to detailed scenes without pairwise scans", () => {
    const entries = proximityEntries(
      Array.from({ length: 10_000 }, (_, index) => index * RESOLUTION * 2)
    );

    assert.strictEqual(unresolvedProximityIndexes(entries, THRESHOLD).size, 0);
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
        ["objects", 2],
        ["labels", 1, "at", "x"],
      ]
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
