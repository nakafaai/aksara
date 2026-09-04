import { assert, describe, it } from "@effect/vitest";
import { BigDecimal, Schema } from "effect";

import {
  arcCurvatureUnresolved,
  arcEndpointAxesUnresolved,
  arcEndpointsUnresolved,
} from "#contracts/math/arc-precision";
import {
  PlaneMathFrameSchema,
  PlaneMathObjectSchema,
} from "#contracts/math/plane";
import { planeResolutionIssues } from "#contracts/math/resolution";

const RESOLUTION = 2 ** -23;
const THRESHOLD = BigDecimal.fromNumberUnsafe(RESOLUTION);
const planeFrame = Schema.decodeSync(PlaneMathFrameSchema)({
  axes: "visible",
  grid: "visible",
  kind: "cartesian",
  x: { max: 1, min: 0 },
  y: { max: 1, min: 0 },
});

/** Decodes one finite arc before public resolution checks. */
function arc(startDegrees: number, sweepDegrees: number) {
  return Schema.decodeSync(PlaneMathObjectSchema)({
    appearance: "primary",
    center: { x: 0.5, y: 0.5 },
    id: "arc-fixture",
    kind: "arc",
    radius: 0.25,
    startDegrees,
    sweepDegrees,
  });
}

/** Returns stable authoring paths from public scene-resolution issues. */
function paths(object: ReturnType<typeof arc>) {
  return planeResolutionIssues(planeFrame, [object], [], { kind: "fit" }).map(
    (candidate) =>
      typeof candidate === "object" && "path" in candidate ? candidate.path : []
  );
}

/** Converts one endpoint-axis separation into its authored angle. */
function endpointDegrees(radius: number, separation: number) {
  return (Math.asin(separation / radius) * 180) / Math.PI;
}

describe("arc visual precision", () => {
  it("uses the actual arc chord at the render threshold", () => {
    const radius = 0.25;
    const resolvableSweep =
      (360 * Math.asin((1.25 * RESOLUTION) / (2 * radius))) / Math.PI;
    const unresolvedSweep =
      (360 * Math.asin((0.75 * RESOLUTION) / (2 * radius))) / Math.PI;

    assert.isFalse(arcEndpointsUnresolved(radius, resolvableSweep, THRESHOLD));
    assert.isTrue(arcEndpointsUnresolved(radius, unresolvedSweep, THRESHOLD));
  });

  it("accepts inclusive chord and sagitta thresholds with bounded sine error", () => {
    assert.isFalse(arcEndpointsUnresolved(RESOLUTION / 2, 180, THRESHOLD));
    assert.isTrue(arcEndpointsUnresolved((RESOLUTION * 3) / 8, 180, THRESHOLD));
    assert.isFalse(arcCurvatureUnresolved(RESOLUTION, 180, THRESHOLD));
    assert.isTrue(arcCurvatureUnresolved((RESOLUTION * 3) / 4, 180, THRESHOLD));
  });

  it("accepts the endpoint-axis threshold and rejects immediately below it", () => {
    const radius = 0.25;

    assert.isFalse(
      arcEndpointAxesUnresolved(
        radius,
        endpointDegrees(radius, RESOLUTION),
        90,
        THRESHOLD
      )
    );
    assert.isTrue(
      arcEndpointAxesUnresolved(
        radius,
        endpointDegrees(radius, RESOLUTION - Number.EPSILON),
        90,
        THRESHOLD
      )
    );
  });

  it("rejects curvature that collapses even when endpoints remain distinct", () => {
    const radius = 1e8;
    const sweep = 180 / (Math.PI * radius);

    assert.isFalse(arcEndpointsUnresolved(radius, sweep, THRESHOLD));
    assert.isTrue(arcCurvatureUnresolved(radius, sweep, THRESHOLD));
  });

  it("uses the authored directed sweep for major-arc curvature", () => {
    const radius = 0.4;
    const majorSweep = 359.999_98;

    assert.isFalse(arcEndpointsUnresolved(radius, majorSweep, THRESHOLD));
    assert.isFalse(arcCurvatureUnresolved(radius, majorSweep, THRESHOLD));
    assert.isTrue(arcCurvatureUnresolved(radius, 360 - majorSweep, THRESHOLD));
  });

  it("handles every finite radius and sweep without numeric overflow", () => {
    assert.isTrue(
      arcEndpointsUnresolved(Number.MAX_VALUE, Number.MIN_VALUE, THRESHOLD)
    );
    assert.isTrue(
      arcCurvatureUnresolved(Number.MAX_VALUE, Number.MIN_VALUE, THRESHOLD)
    );
    assert.isFalse(arcEndpointsUnresolved(Number.MAX_VALUE, 180, THRESHOLD));
    assert.isFalse(arcCurvatureUnresolved(Number.MAX_VALUE, 180, THRESHOLD));
  });
});

describe("arc endpoint axis resolution", () => {
  it("accepts exact cardinal starts and ends", () => {
    assert.deepStrictEqual(paths(arc(0, 90)), []);
    assert.deepStrictEqual(paths(arc(90, -90)), []);
  });

  it("retains a Number.MIN_VALUE start delta from the cardinal axis", () => {
    assert.deepStrictEqual(paths(arc(Number.MIN_VALUE, 90)), [["objects", 0]]);
  });

  it("rejects every unresolved near-cardinal start component", () => {
    for (const startDegrees of [Number.EPSILON, 1e-13, 1e-12]) {
      assert.deepStrictEqual(paths(arc(startDegrees, 90)), [["objects", 0]]);
    }
  });

  it("rejects near-cardinal ends reached by either sweep direction", () => {
    assert.deepStrictEqual(paths(arc(0, 90 + 1e-12)), [["objects", 0]]);
    assert.deepStrictEqual(paths(arc(180, -90 - 1e-12)), [["objects", 0]]);
  });

  it("accepts decimal-exact cardinal ends across binary addition drift", () => {
    const above: readonly [number, number] = [
      145.308_487_303_555, -55.308_487_303_555,
    ];
    const below: readonly [number, number] = [
      144.691_512_696_445, -54.691_512_696_445,
    ];

    assert.isAbove(above[0] + above[1], 90);
    assert.isBelow(below[0] + below[1], 90);
    assert.deepStrictEqual(paths(arc(...above)), []);
    assert.deepStrictEqual(paths(arc(...below)), []);
    assert.deepStrictEqual(
      paths(arc(34.691_512_696_445, 55.308_487_303_555)),
      []
    );
  });
});
