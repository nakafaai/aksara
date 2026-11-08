import { assert, describe, it } from "@effect/vitest";
import { Array as Arr } from "effect";

import { contourFill, contourLines } from "#contracts/math/formula/contour";
import type { SampleBox } from "#contracts/math/formula/sample";

const box: SampleBox = { x: { max: 3, min: -3 }, y: { max: 3, min: -3 } };

/** The area of a simple polygon by the shoelace formula. */
function area(points: readonly { readonly x: number; readonly y: number }[]) {
  return (
    Math.abs(
      Arr.reduce(points, 0, (sum, point, index) => {
        const next = points[(index + 1) % points.length] ?? point;
        return sum + point.x * next.y - next.x * point.y;
      })
    ) / 2
  );
}

describe("contourLines", () => {
  it("traces a circle as one closed line on its radius", () => {
    const lines = contourLines((x, y) => x * x + y * y - 4, box, 120);

    assert.strictEqual(lines.length, 1);
    const [line = []] = lines;
    assert.isAbove(line.length, 100);
    for (const { x, y } of line) {
      assert.closeTo(Math.hypot(x, y), 2, 0.01);
    }
    const first = line[0];
    const last = line.at(-1);
    assert.isTrue(first !== undefined && last !== undefined);
    assert.closeTo(
      Math.hypot(
        (first?.x ?? 0) - (last?.x ?? 0),
        (first?.y ?? 0) - (last?.y ?? 0)
      ),
      0,
      1e-9
    );
  });

  it("resolves a saddle by the cell center and crosses through it", () => {
    const lines = contourLines((x, y) => x * y, box, 5);
    const points = Arr.flatten(lines);

    assert.isTrue(Arr.every(points, ({ x, y }) => Math.abs(x * y) < 1e-9));
    assert.isAbove(lines.length, 1);
  });

  it("takes either pairing at a saddle by the value at its center", () => {
    const positive = contourLines((x, y) => x * y + 0.01, box, 1);
    const negative = contourLines((x, y) => x * y - 0.01, box, 1);

    assert.strictEqual(positive.length, 2);
    assert.strictEqual(negative.length, 2);
  });

  it("skips cells where the field is undefined and draws nothing without a zero", () => {
    const lines = contourLines((x, y) => Math.sqrt(x) - 1 + 0 * y, box, 60);
    assert.isTrue(Arr.every(Arr.flatten(lines), ({ x }) => x >= 0));
    assert.deepStrictEqual(
      contourLines(() => 1, box),
      []
    );
  });
});

describe("contourFill", () => {
  it("shades exactly the part of the frame where the field is not negative", () => {
    const shapes = contourFill((x, y) => 1 - x - y, box, 40);
    const total = Arr.reduce(shapes, 0, (sum, shape) => sum + area(shape));

    assert.closeTo(total, 36 - (5 * 5) / 2 + 0, 1e-6);
  });

  it("shades nothing where the field is negative or undefined everywhere", () => {
    assert.deepStrictEqual(
      contourFill(() => -1, box),
      []
    );
    assert.deepStrictEqual(
      contourFill(() => Number.NaN, box, 8),
      []
    );
  });
});
