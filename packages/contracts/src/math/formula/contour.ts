import {
  Array as Arr,
  MutableHashMap,
  MutableHashSet,
  MutableList,
  Option,
  Result,
} from "effect";

import type {
  SampleBox,
  SampleBranch,
  SamplePoint,
} from "#contracts/math/formula/sample";

/** A field over the plane: its value at one point, NaN where it is undefined. */
export type SampleField = (x: number, y: number) => number;

/** Cells per frame side, enough for a smooth outline at the largest card size. */
export const CONTOUR_CELLS = 240;

/** One grid corner: its column, its row, its point, and the field's value there. */
interface Corner {
  readonly key: string;
  readonly point: SamplePoint;
  readonly value: number;
}

/** One crossing on a cell edge: the shared key of that edge and its point. */
interface Crossing {
  readonly key: string;
  readonly point: SamplePoint;
}

/** One segment of an outline, with the order it was found in. */
interface Segment {
  readonly from: Crossing;
  readonly index: number;
  readonly to: Crossing;
}

/** The four corners of one cell, counterclockwise from the bottom left. */
type Cell = readonly [Corner, Corner, Corner, Corner];

/** Reads the field once at every corner of a square grid over the frame. */
function grid(
  field: SampleField,
  box: SampleBox,
  cells: number
): readonly Cell[] {
  const dx = (box.x.max - box.x.min) / cells;
  const dy = (box.y.max - box.y.min) / cells;
  const columns = Arr.makeBy(cells + 1, (column) =>
    Arr.makeBy(cells + 1, (row): Corner => {
      const x = box.x.min + column * dx;
      const y = box.y.min + row * dy;
      return {
        key: `${column}:${row}`,
        point: { x, y, z: 0 },
        value: field(x, y),
      };
    })
  );
  return Arr.flatMap(
    Arr.makeBy(cells, (column) => column),
    (column) =>
      Arr.flatMap(
        Arr.makeBy(cells, (row) => row),
        (row) =>
          Option.toArray(
            Option.all([
              Arr.get(columns, column).pipe(
                Option.flatMap((each) => Arr.get(each, row))
              ),
              Arr.get(columns, column + 1).pipe(
                Option.flatMap((each) => Arr.get(each, row))
              ),
              Arr.get(columns, column + 1).pipe(
                Option.flatMap((each) => Arr.get(each, row + 1))
              ),
              Arr.get(columns, column).pipe(
                Option.flatMap((each) => Arr.get(each, row + 1))
              ),
            ])
          )
      )
  );
}

/** Whether a corner lies where the field is at least zero. */
function inside(corner: Corner) {
  return corner.value >= 0;
}

/** Where the field crosses zero between two corners, if it does. */
function crossing(from: Corner, to: Corner) {
  if (inside(from) === inside(to)) {
    return Option.none<Crossing>();
  }
  const fraction = from.value / (from.value - to.value);
  return Option.some<Crossing>({
    key: from.key < to.key ? `${from.key}|${to.key}` : `${to.key}|${from.key}`,
    point: {
      x: from.point.x + (to.point.x - from.point.x) * fraction,
      y: from.point.y + (to.point.y - from.point.y) * fraction,
      z: 0,
    },
  });
}

/** Whether every corner of a cell has a defined value. */
function defined([a, b, c, d]: Cell) {
  return !Arr.some([a, b, c, d], (corner) => Number.isNaN(corner.value));
}

/**
 * The zero-crossing segments inside one cell. A saddle, where opposite
 * corners agree, is resolved by the field's value at the cell center.
 */
function cellSegments(
  field: SampleField,
  cell: Cell
): readonly (readonly [Crossing, Crossing])[] {
  const [a, b, c, d] = cell;
  const bottom = crossing(a, b);
  const right = crossing(b, c);
  const top = crossing(c, d);
  const left = crossing(d, a);
  return Option.match(Option.all([bottom, right, top, left]), {
    onNone: () =>
      Arr.getSomes(
        Arr.map(
          [
            [bottom, right],
            [right, top],
            [top, left],
            [left, bottom],
            [bottom, top],
            [left, right],
          ] as const,
          ([from, to]) =>
            Option.zipWith(from, to, (start, end) => [start, end] as const)
        )
      ),
    onSome: ([down, east, up, west]) => {
      const center = field(
        (a.point.x + c.point.x) / 2,
        (a.point.y + c.point.y) / 2
      );
      return center >= 0 === inside(a)
        ? [[down, east] as const, [up, west] as const]
        : [[west, down] as const, [east, up] as const];
    },
  });
}

/** Joins segments that share an edge crossing into continuous polylines. */
function join(segments: readonly Segment[]) {
  const byKey = MutableHashMap.empty<string, readonly Segment[]>();
  Arr.forEach(segments, (segment) => {
    for (const key of [segment.from.key, segment.to.key]) {
      const known = Option.getOrElse(MutableHashMap.get(byKey, key), () => []);
      MutableHashMap.set(byKey, key, [...known, segment]);
    }
  });
  const used = MutableHashSet.empty<number>();
  return Arr.filterMap(segments, (start) => {
    if (MutableHashSet.has(used, start.index)) {
      return Result.failVoid;
    }
    MutableHashSet.add(used, start.index);
    const line = MutableList.make<SamplePoint>();
    MutableList.append(line, start.from.point);
    MutableList.append(line, start.to.point);
    let key = start.to.key;
    let next = Option.none<Segment>();
    do {
      next = Arr.findFirst(
        Arr.flatten(Option.toArray(MutableHashMap.get(byKey, key))),
        (segment) => !MutableHashSet.has(used, segment.index)
      );
      if (Option.isSome(next)) {
        const segment = next.value;
        MutableHashSet.add(used, segment.index);
        const forward = segment.from.key === key;
        MutableList.append(
          line,
          forward ? segment.to.point : segment.from.point
        );
        key = forward ? segment.to.key : segment.from.key;
      }
    } while (Option.isSome(next));
    return Result.succeed<SampleBranch>(MutableList.toArray(line));
  });
}

/**
 * Traces every curve where a field is zero inside the frame, the marching
 * squares method, so an equation such as `x^2 + y^2 = 4` draws its circle.
 */
export function contourLines(
  field: SampleField,
  box: SampleBox,
  cells: number = CONTOUR_CELLS
): readonly SampleBranch[] {
  const usable = Arr.filter(grid(field, box, cells), (cell: Cell) =>
    defined(cell)
  );
  const found = Arr.flatMap(usable, (cell: Cell) => cellSegments(field, cell));
  return join(Arr.map(found, ([from, to], index) => ({ from, index, to })));
}

/**
 * Shades the part of the frame where a field is at least zero, one shape per
 * cell: the corners inside and the crossings between them, so a cell wholly
 * inside is its square and a cell the outline cuts keeps only its inner part.
 */
export function contourFill(
  field: SampleField,
  box: SampleBox,
  cells: number = CONTOUR_CELLS
): readonly SampleBranch[] {
  return Arr.filterMap(
    Arr.filter(grid(field, box, cells), (cell) => defined(cell)),
    ([a, b, c, d]) => {
      const outline = Arr.flatMap(
        [
          [a, b],
          [b, c],
          [c, d],
          [d, a],
        ] as const,
        ([from, to]) => [
          ...(inside(from) ? [from.point] : []),
          ...Option.toArray(
            Option.map(crossing(from, to), ({ point }) => point)
          ),
        ]
      );
      return outline.length >= 3 ? Result.succeed(outline) : Result.failVoid;
    }
  );
}
