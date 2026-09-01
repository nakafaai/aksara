import { assert, describe, it } from "@effect/vitest";
import { BigDecimal } from "effect";

import {
  arcCurvatureUnresolved,
  arcEndpointsUnresolved,
} from "#contracts/math/precision";

const RESOLUTION = 2 ** -23;
const THRESHOLD = BigDecimal.fromNumberUnsafe(RESOLUTION);

describe("mathematical visual precision", () => {
  it("uses the actual arc chord at the render threshold", () => {
    const radius = 0.25;
    const resolvableSweep =
      (360 * Math.asin((1.25 * RESOLUTION) / (2 * radius))) / Math.PI;
    const unresolvedSweep =
      (360 * Math.asin((0.75 * RESOLUTION) / (2 * radius))) / Math.PI;

    assert.isFalse(arcEndpointsUnresolved(radius, resolvableSweep, THRESHOLD));
    assert.isTrue(arcEndpointsUnresolved(radius, unresolvedSweep, THRESHOLD));
  });

  it("rejects curvature that collapses even when endpoints remain distinct", () => {
    const radius = 1e8;
    const sweep = 180 / (Math.PI * radius);

    assert.isFalse(arcEndpointsUnresolved(radius, sweep, THRESHOLD));
    assert.isTrue(arcCurvatureUnresolved(radius, sweep, THRESHOLD));
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
