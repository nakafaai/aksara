import { assert, describe, it } from "@effect/vitest";
import { Array as Arr, Option } from "effect";
import type { SampleBox, SamplePoint } from "#contracts/math/formula/box";
import {
  contourFill,
  contourFilled,
  contourLines,
} from "#contracts/math/formula/contour";

const box: SampleBox = { x: { max: 3, min: -3 }, y: { max: 3, min: -3 } };

/** The area of a simple polygon by the shoelace formula. */
function area(points: readonly SamplePoint[]) {
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
    const ends = Option.all([Arr.head(line), Arr.last(line)]);
    assert.isTrue(
      Option.exists(
        ends,
        ([first, last]) => Math.hypot(first.x - last.x, first.y - last.y) < 1e-9
      )
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

describe("contourFilled", () => {
  it("answers exactly whether contourFill would draw anything", () => {
    const fields: readonly ((x: number, y: number) => number)[] = [
      (x, y) => 4 - x * x - y * y,
      (x, y) => 0.0001 - (x - 2.9) ** 2 - (y + 2.9) ** 2,
      (x, y) => -1 - x * x - y * y,
      (x, y) => (x > 0 ? Number.NaN : 1 - x * x - y * y),
      () => Number.NaN,
      (x, y) => Math.min(x + 3, y + 3) - 0.0001,
    ];
    Arr.forEach(fields, (field) => {
      assert.strictEqual(
        contourFilled(field, box),
        Arr.isReadonlyArrayNonEmpty(contourFill(field, box))
      );
    });
  });

  it("reads far fewer samples than the grid when the region is large", () => {
    let reads = 0;
    /** A disc of radius two that counts every sample it is asked for. */
    const field = (x: number, y: number) => {
      reads += 1;
      return 4 - x * x - y * y;
    };
    assert.isTrue(contourFilled(field, box));
    assert.isBelow(reads, 100);
  });
});
