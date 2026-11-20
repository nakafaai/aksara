import { assert, describe, it } from "@effect/vitest";
import { Array as Arr } from "effect";
import type { SampleBox } from "#contracts/math/formula/box";
import type { SampleField } from "#contracts/math/formula/contour";
import { contourFill, contourLines } from "#contracts/math/formula/contour";
import type { CellValues } from "#contracts/math/formula/scan";
import { someCell } from "#contracts/math/formula/scan";

const box: SampleBox = { x: { max: 3, min: -3 }, y: { max: 3, min: -3 } };
const cells = 24;

/** Whether a cell shades, the way `contourFill` decides it. */
function shades(values: CellValues) {
  return Arr.some(values, (value) => value >= 0);
}

/** Whether a cell holds a crossing, the way `contourLines` decides it. */
function crosses(values: CellValues) {
  return shades(values) && Arr.some(values, (value) => value < 0);
}

/** Wraps a field so a test can count how often the scan reads it. */
function counted(field: SampleField) {
  const reads = { count: 0 };
  /** The field, counting each read. */
  const read: SampleField = (x, y) => {
    reads.count += 1;
    return field(x, y);
  };
  return { read, reads };
}

describe("someCell", () => {
  it("agrees with the contour it stands in for on every kind of field", () => {
    const fields: readonly SampleField[] = [
      (x, y) => 4 - x * x - y * y,
      (x, y) => Math.min(4 - x * x - y * y, x * x + y * y - 1),
      (x, y) => -1 - x * x - y * y,
      (x, y) => Math.min(x - 2.9, y - 2.9),
      (x, y) => Math.min(x - 2.99, y - 2.99),
      (x, y) => (x < 0 ? Number.NaN : 1 - x * x - y * y),
      (x, y) => x * y,
      (x, y) => 1 + x * x + y * y,
      (x, y) => 0.0001 - (x - 2.9) ** 2 - (y + 2.9) ** 2,
      (x, y) => Math.min(x + 3, y + 3) - 0.0001,
      () => Number.NaN,
    ];

    for (const field of fields) {
      assert.strictEqual(
        someCell(field, box, shades, cells),
        Arr.isReadonlyArrayNonEmpty(contourFill(field, box, cells))
      );
      assert.strictEqual(
        someCell(field, box, crosses, cells),
        Arr.isReadonlyArrayNonEmpty(contourLines(field, box, cells))
      );
    }
  });

  it("reads each grid corner at most once and stops at the first passing cell", () => {
    const nothing = counted(() => -1);
    assert.isFalse(someCell(nothing.read, box, shades, cells));
    assert.strictEqual(nothing.reads.count, (cells + 1) ** 2);

    const everywhere = counted(() => 1);
    assert.isTrue(someCell(everywhere.read, box, shades, cells));
    assert.strictEqual(everywhere.reads.count, 2 * (cells + 1));
  });

  it("skips a cell with a corner where the field is undefined", () => {
    const step = (box.x.max - box.x.min) / cells;
    /** Undefined on every other grid column, so every cell touches one. */
    const striped: SampleField = (x) =>
      Math.round((x - box.x.min) / step) % 2 === 0 ? 1 : Number.NaN;

    assert.isFalse(someCell(striped, box, shades, cells));
  });
});
