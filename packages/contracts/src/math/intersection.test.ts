import { assert, describe, it } from "@effect/vitest";

import type { AxisTraversal } from "#contracts/math/intersection";
import { infinitePathIntersectsBox } from "#contracts/math/intersection";

/** Creates one axis traversal through the default unit slab. */
function axis(
  start: number,
  through: number,
  min = -1,
  max = 1
): AxisTraversal {
  return { range: { max, min }, start, through };
}

describe("infinite path intersection", () => {
  it("accepts exact plane and space corner intersections", () => {
    assert.isTrue(infinitePathIntersectsBox("line", [axis(-2, 0), axis(0, 2)]));
    assert.isTrue(
      infinitePathIntersectsBox("line", [axis(-2, 0), axis(0, 2), axis(0, 2)])
    );
  });

  it("accepts crossing, inward, and inside paths", () => {
    assert.isTrue(infinitePathIntersectsBox("line", [axis(-2, 2), axis(0, 0)]));
    assert.isTrue(
      infinitePathIntersectsBox("ray", [axis(-2, -1), axis(-2, -1)])
    );
    assert.isTrue(infinitePathIntersectsBox("ray", [axis(0, 2), axis(0, 2)]));
  });

  it("rejects parallel misses and outward rays", () => {
    assert.isFalse(
      infinitePathIntersectsBox("line", [axis(-2, 2), axis(2, 2)])
    );
    assert.isFalse(
      infinitePathIntersectsBox("ray", [axis(-2, -3), axis(-2, -3)])
    );
  });

  it("accepts a crossing whose floating-point direction would overflow", () => {
    assert.isTrue(
      infinitePathIntersectsBox("line", [
        axis(-Number.MAX_VALUE, Number.MAX_VALUE),
        axis(0, 0),
      ])
    );
  });
});
