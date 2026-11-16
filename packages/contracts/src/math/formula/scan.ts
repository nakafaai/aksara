import { Array as Arr, MutableHashMap, Option } from "effect";
import type { SampleBox } from "#contracts/math/formula/box";
import {
  CONTOUR_CELLS,
  type SampleField,
} from "#contracts/math/formula/contour";

/** The field's values at the four corners of one cell, counterclockwise from the bottom left. */
export type CellValues = readonly [number, number, number, number];

/** The field at every corner of one grid column, bottom to top. */
function columnValues(
  field: SampleField,
  box: SampleBox,
  cells: number,
  column: number
) {
  const dx = (box.x.max - box.x.min) / cells;
  const dy = (box.y.max - box.y.min) / cells;
  const x = box.x.min + column * dx;
  return Arr.makeBy(cells + 1, (row) => field(x, box.y.min + row * dy));
}

/** Whether one cell between two neighboring columns is defined everywhere and passes the test. */
function someCellBetween(
  left: readonly number[],
  right: readonly number[],
  test: (values: CellValues) => boolean
) {
  const rows = Arr.zip(left, right);
  return Arr.some(Arr.zip(rows, Arr.drop(rows, 1)), ([below, above]) => {
    const values: CellValues = [below[0], below[1], above[1], above[0]];
    return Arr.every(values, Number.isFinite) && test(values);
  });
}

/** Column strides from coarse to fine, each half the one before. */
const STRIDES = [128, 64, 32, 16, 8, 4, 2, 1] as const;

/**
 * The cell columns from coarse to fine: every 128th, then the every-64th ones
 * not yet listed, and so on down to every one, so a shape that covers a fair
 * part of the frame is met within the first few columns.
 */
function columnOrder(cells: number) {
  return Arr.flatMap(STRIDES, (stride, level) =>
    Arr.filter(
      Arr.makeBy(Math.ceil(cells / stride), (index) => index * stride),
      (column) => level === 0 || column % (2 * stride) !== 0
    )
  );
}

/**
 * Whether any cell of the contour grid over the frame passes a test of its
 * corner values. It reads the field at the same corners as `contourLines` and
 * `contourFill`, skips a cell where the field is undefined at a corner as they
 * do, reads each corner at most once, and stops at the first cell that
 * passes, so a check can learn whether a contour draws anything without
 * building it.
 */
export function someCell(
  field: SampleField,
  box: SampleBox,
  test: (values: CellValues) => boolean,
  cells: number = CONTOUR_CELLS
) {
  const read = MutableHashMap.empty<number, readonly number[]>();
  /** One column's values, read from the field the first time it is needed. */
  const valuesAt = (column: number) =>
    Option.getOrElse(MutableHashMap.get(read, column), () => {
      const values = columnValues(field, box, cells, column);
      MutableHashMap.set(read, column, values);
      return values;
    });
  return Arr.some(columnOrder(cells), (column) =>
    someCellBetween(valuesAt(column), valuesAt(column + 1), test)
  );
}
