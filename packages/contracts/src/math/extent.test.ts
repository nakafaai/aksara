import { assert, describe, it } from "@effect/vitest";

import {
  arcContained,
  circleContained,
  cuboidContained,
  quadraticContained,
} from "#contracts/math/extent";
import type { PlaneMathFrame, PlaneMathObject } from "#contracts/math/plane";
import type { SpaceMathFrame, SpaceMathObject } from "#contracts/math/space";

type Arc = Extract<PlaneMathObject, { readonly kind: "arc" }>;
type Circle = Extract<PlaneMathObject, { readonly kind: "circle" }>;
type Quadratic = Extract<PlaneMathObject, { readonly kind: "quadratic" }>;
type Cuboid = Extract<SpaceMathObject, { readonly kind: "cuboid" }>;

const planeFrame: PlaneMathFrame = {
  axes: "visible",
  grid: "visible",
  kind: "cartesian",
  x: { max: 2, min: -2 },
  y: { max: 2, min: -2 },
};
const spaceFrame: SpaceMathFrame = {
  ...planeFrame,
  z: { max: 2, min: -2 },
};

/** Creates one typed arc fixture for exact extent checks. */
function arc(
  startDegrees: number,
  sweepDegrees: number,
  center = { x: 0, y: 0 },
  radius = 1
): Arc {
  return {
    appearance: "primary",
    center,
    id: "arc",
    kind: "arc",
    radius,
    startDegrees,
    sweepDegrees,
  };
}

/** Creates one typed circle fixture for exact extent checks. */
function circle(center: Circle["center"], radius: number): Circle {
  return {
    appearance: "primary",
    center,
    id: "circle",
    kind: "circle",
    radius,
  };
}

describe("finite curved extents", () => {
  it("accepts both exact directed cardinal boundaries", () => {
    const frame = {
      ...planeFrame,
      x: { max: 1, min: -9 },
      y: { max: 10, min: -10 },
    };
    assert.isTrue(arcContained(frame, arc(90, 180, { x: 1, y: 0 }, 10)));
    assert.isTrue(arcContained(frame, arc(270, -180, { x: 1, y: 0 }, 10)));
  });

  it("rejects an outward cardinal extremum", () => {
    const frame = {
      ...planeFrame,
      x: { max: 1, min: -1 },
      y: { max: 1, min: -1 },
    };
    assert.isFalse(arcContained(frame, arc(0, 90, { x: 1, y: 0 })));
  });

  it("accepts a contained arc whose circle center is outside the frame", () => {
    const frame = {
      ...planeFrame,
      x: { max: 10, min: -10 },
      y: { max: 10, min: -10 },
    };
    assert.isTrue(arcContained(frame, arc(150, 60, { x: 11, y: 0 }, 2)));
  });

  it("bounds non-cardinal trig residue without hiding real escapes", () => {
    const boundary = { ...planeFrame, x: { max: 1, min: -2 } };
    assert.isTrue(arcContained(boundary, arc(60, 30, { x: 0, y: 0 }, 2)));
    assert.isFalse(
      arcContained(
        { ...boundary, x: { max: 0.99, min: -2 } },
        arc(60, 30, { x: 0, y: 0 }, 2)
      )
    );
    assert.isFalse(
      arcContained(
        { ...boundary, x: { max: 1e308, min: -1e308 } },
        arc(60, 30, { x: 1e308, y: 0 }, 1)
      )
    );
  });

  it("accepts an exact circle boundary", () => {
    assert.isTrue(circleContained(planeFrame, circle({ x: 0, y: 0 }, 2)));
  });

  it("rejects radii hidden by floating-point addition", () => {
    const hugeFrame = { ...planeFrame, x: { max: 1e308, min: -1e308 } };
    assert.isFalse(circleContained(hugeFrame, circle({ x: 1e308, y: 0 }, 1)));
    assert.isFalse(
      circleContained(
        { ...planeFrame, x: { max: 1, min: -1 } },
        circle({ x: 2 ** -54, y: 0 }, 1)
      )
    );
  });
});

describe("finite polynomial and solid extents", () => {
  it("rejects an overflow-hidden quadratic vertex", () => {
    const object: Quadratic = {
      appearance: "primary",
      coefficients: { a: 1e308, b: 1e308, c: 0 },
      domain: { max: 0, min: -1 },
      id: "quadratic",
      inputAxis: "x",
      kind: "quadratic",
    };
    assert.isFalse(quadraticContained(planeFrame, object));
  });

  it("checks exact cuboid half-extents", () => {
    const boundary: Cuboid = {
      appearance: "primary",
      center: { x: 0, y: 0, z: 0 },
      id: "boundary",
      kind: "cuboid",
      size: { height: 4, length: 4, width: 4 },
    };
    const hidden: Cuboid = {
      ...boundary,
      center: { x: 2, y: 0, z: 0 },
      id: "hidden",
      size: { height: 1, length: Number.MIN_VALUE, width: 1 },
    };
    assert.isTrue(cuboidContained(spaceFrame, boundary));
    assert.isFalse(cuboidContained(spaceFrame, hidden));
  });
});
