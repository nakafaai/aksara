import { assert, describe, it } from "@effect/vitest";
import { Array as Arr } from "effect";

import {
  MINIMUM_BRANCH_SAMPLES,
  type SampleBox,
  type SamplePoint,
  sampleCurve,
} from "#contracts/math/formula/sample";

const plane: SampleBox = { x: { max: 5, min: -5 }, y: { max: 5, min: -5 } };

/** Traces y = f(x) in the plane. */
function graph(f: (x: number) => number) {
  return (x: number): SamplePoint => ({ x, y: f(x), z: 0 });
}

/** Whether a point lies inside the plane frame, edges included. */
function inside({ x, y }: SamplePoint) {
  return x >= -5 && x <= 5 && y >= -5 && y <= 5;
}

describe("sampleCurve", () => {
  it("samples a smooth curve as one dense branch with its named points exact", () => {
    const branches = sampleCurve(
      graph((x) => x * x - 4),
      plane,
      { max: 5, min: -5 },
      [0, 1 / 3]
    );

    assert.strictEqual(branches.length, 1);
    const [branch = []] = branches;
    assert.isAtLeast(branch.length, MINIMUM_BRANCH_SAMPLES);
    assert.isTrue(Arr.every(branch, inside));
    assert.isTrue(Arr.some(branch, ({ x, y }) => x === 0 && y === -4));
    assert.isTrue(Arr.some(branch, ({ x }) => x === 1 / 3));
    assert.closeTo(branch[0]?.y ?? 0, 5, 1e-9);
    assert.closeTo(branch.at(-1)?.y ?? 0, 5, 1e-9);
  });

  it("splits at an asymptote and keeps every branch dense", () => {
    const branches = sampleCurve(graph(Math.tan), plane, { max: 5, min: -5 });

    assert.strictEqual(branches.length, 5);
    for (const branch of branches) {
      assert.isAtLeast(branch.length, MINIMUM_BRANCH_SAMPLES);
      assert.isTrue(Arr.every(branch, inside));
    }
  });

  it("splits at a jump and ends where the curve is undefined", () => {
    const steps = sampleCurve(graph(Math.floor), plane, {
      max: 2.5,
      min: -2.5,
    });
    assert.strictEqual(steps.length, 6);

    const root = sampleCurve(graph(Math.sqrt), plane, { max: 4, min: -4 });
    assert.strictEqual(root.length, 1);
    assert.isTrue(Arr.every(root[0] ?? [], ({ x }) => x >= 0));
  });

  it("cuts a curve that leaves the frame exactly at the frame edge", () => {
    const branches = sampleCurve(
      graph((x) => 8 * Math.sin(x)),
      plane,
      { max: 5, min: -5 }
    );

    assert.isAbove(branches.length, 1);
    for (const branch of branches) {
      assert.isTrue(Arr.every(branch, inside));
    }
    assert.isTrue(
      Arr.some(
        Arr.flatten(branches),
        ({ y }) => Math.abs(Math.abs(y) - 5) < 1e-12
      )
    );
  });

  it("draws nothing for a curve outside the frame or undefined everywhere", () => {
    assert.deepStrictEqual(
      sampleCurve(
        graph((x) => x + 20),
        plane,
        { max: 5, min: -5 }
      ),
      []
    );
    assert.deepStrictEqual(
      sampleCurve(
        graph(() => Number.NaN),
        plane,
        { max: 5, min: -5 }
      ),
      []
    );
  });

  it("clips a space curve to all three ranges", () => {
    const space: SampleBox = { ...plane, z: { max: 2, min: 0 } };
    const branches = sampleCurve(
      (t) => ({ x: Math.cos(t), y: Math.sin(t), z: t / 4 }),
      space,
      { max: 12, min: 0 }
    );

    assert.strictEqual(branches.length, 1);
    const [branch = []] = branches;
    assert.closeTo(branch.at(-1)?.z ?? 0, 2, 1e-9);
    assert.isTrue(Arr.every(branch, ({ z }) => z >= 0 && z <= 2));
  });

  it("stops sampling an endlessly oscillating curve and still draws it", () => {
    const branches = sampleCurve(
      graph((x) => 4 * Math.sin(1e6 * x)),
      plane,
      { max: 5, min: -5 }
    );

    assert.isAbove(branches.length, 0);
    assert.isTrue(Arr.every(Arr.flatten(branches), inside));
  });

  it("keeps a straight piece that only cuts a corner of the frame", () => {
    const branches = sampleCurve((t) => ({ x: t, y: 9.95 - t, z: 0 }), plane, {
      max: 99.8,
      min: -100.2,
    });

    assert.strictEqual(branches.length, 1);
    assert.isTrue(Arr.every(Arr.flatten(branches), inside));
  });

  it("samples a vertical segment that a frame axis does not cross", () => {
    const branches = sampleCurve((t) => ({ x: 1, y: t, z: 0 }), plane, {
      max: 3,
      min: -3,
    });

    assert.strictEqual(branches.length, 1);
    assert.deepStrictEqual(
      sampleCurve((t) => ({ x: 9, y: t, z: 0 }), plane, { max: 3, min: -3 }),
      []
    );
  });
});
