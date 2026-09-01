import { BigDecimal, Array as EffectArray } from "effect";

import type { SpacePoint } from "#contracts/math/base";
import {
  type AxisRange,
  cuboidExtents,
  radialOffsets,
} from "#contracts/math/extent";
import type { PlaneMathObject } from "#contracts/math/plane";
import { decimal } from "#contracts/math/rational";
import type { SpaceMathObject } from "#contracts/math/space";

/** One finite authored number participating in a resolution comparison. */
export interface CollisionEntry {
  readonly value: BigDecimal.BigDecimal | number;
}

export type CollisionPath = Array<number | string>;

/** One finite scene point with its authored schema path. */
export interface CollisionPointEntry {
  readonly path: CollisionPath;
  readonly point: SpacePoint;
}

/** One derived coordinate with the authored path responsible for its value. */
export interface CollisionCoordinateEntry extends CollisionEntry {
  readonly axis: "x" | "y" | "z";
  readonly path: CollisionPath;
}

interface ValueGroup {
  readonly minimumSourceIndex: number;
  readonly value: BigDecimal.BigDecimal;
}

/** Returns the first sorted value for which the predicate is false. */
function lowerBound(
  groups: readonly ValueGroup[],
  target: BigDecimal.BigDecimal,
  includeEqual: boolean
) {
  let start = 0;
  let end = groups.length;
  while (start < end) {
    const middle = Math.floor((start + end) / 2);
    const candidate = EffectArray.getUnsafe(groups, middle);
    const order = BigDecimal.Order(candidate.value, target);
    if (order < 0 || (includeEqual && order === 0)) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
}
/** Builds a range-minimum tree over the earliest source index per value. */
function minimumTree(groups: readonly ValueGroup[]) {
  let base = 1;
  while (base < groups.length) {
    base *= 2;
  }
  const tree = new Array<number>(base * 2).fill(Number.POSITIVE_INFINITY);
  for (const [index, group] of groups.entries()) {
    tree[base + index] = group.minimumSourceIndex;
  }
  for (let index = base - 1; index > 0; index -= 1) {
    tree[index] = Math.min(
      EffectArray.getUnsafe(tree, index * 2),
      EffectArray.getUnsafe(tree, index * 2 + 1)
    );
  }
  return { base, tree };
}
/** Finds the earliest source index in one half-open value-rank interval. */
function rangeMinimum(
  tree: readonly number[],
  base: number,
  start: number,
  end: number
) {
  let left = start + base;
  let right = end + base;
  let minimum = Number.POSITIVE_INFINITY;
  while (left < right) {
    if (left % 2 === 1) {
      minimum = Math.min(minimum, EffectArray.getUnsafe(tree, left));
      left += 1;
    }
    if (right % 2 === 1) {
      right -= 1;
      minimum = Math.min(minimum, EffectArray.getUnsafe(tree, right));
    }
    left = Math.floor(left / 2);
    right = Math.floor(right / 2);
  }
  return minimum;
}

/**
 * Finds later-authored values that sit within the threshold of an earlier,
 * distinct value in O(n log n), without quadratic pair scans.
 */
export function unresolvedCollisionIndexes(
  entries: readonly CollisionEntry[],
  threshold: BigDecimal.BigDecimal
) {
  const ranked = entries
    .map((entry, sourceIndex) => ({
      sourceIndex,
      value:
        typeof entry.value === "number" ? decimal(entry.value) : entry.value,
    }))
    .sort((left, right) => BigDecimal.Order(left.value, right.value));
  const groups: ValueGroup[] = [];
  const rankBySource = new Array<number>(entries.length);
  for (const entry of ranked) {
    const previous = groups.at(-1);
    if (previous && BigDecimal.equals(previous.value, entry.value)) {
      const rank = groups.length - 1;
      groups[rank] = {
        minimumSourceIndex: Math.min(
          previous.minimumSourceIndex,
          entry.sourceIndex
        ),
        value: previous.value,
      };
      rankBySource[entry.sourceIndex] = rank;
      continue;
    }
    rankBySource[entry.sourceIndex] = groups.length;
    groups.push({
      minimumSourceIndex: entry.sourceIndex,
      value: entry.value,
    });
  }
  const { base, tree } = minimumTree(groups);
  const unresolved = new Set<number>();
  for (const [sourceIndex, rank] of rankBySource.entries()) {
    const group = EffectArray.getUnsafe(groups, rank);
    const { value } = group;
    const start = lowerBound(
      groups,
      BigDecimal.subtract(value, threshold),
      true
    );
    const end = lowerBound(groups, BigDecimal.sum(value, threshold), false);
    const earlier = Math.min(
      rangeMinimum(tree, base, start, rank),
      rangeMinimum(tree, base, rank + 1, end)
    );
    if (earlier < sourceIndex) {
      unresolved.add(sourceIndex);
    }
  }
  return unresolved;
}

/** Checks one radial coordinate against frame edges outside its error envelope. */
function radialBoundaryUnresolved(
  range: AxisRange,
  center: number,
  offset: BigDecimal.BigDecimal,
  error: BigDecimal.BigDecimal,
  threshold: BigDecimal.BigDecimal
) {
  const coordinate = BigDecimal.sum(decimal(center), offset);
  return [range.min, range.max].some((boundary) => {
    const distance = BigDecimal.abs(
      BigDecimal.subtract(coordinate, decimal(boundary))
    );
    const certainGap = BigDecimal.subtract(distance, error);
    return (
      BigDecimal.isGreaterThan(certainGap, BigDecimal.fromBigInt(0n)) &&
      BigDecimal.isLessThan(certainGap, threshold)
    );
  });
}

/** Finds curved extrema whose non-zero frame clearance cannot be rendered. */
export function radialBoundaryCollisionPaths(
  frame: { readonly x: AxisRange; readonly y: AxisRange },
  objects: readonly PlaneMathObject[],
  threshold: BigDecimal.BigDecimal
) {
  const paths = objects.flatMap((object, index) => {
    if (object.kind !== "arc" && object.kind !== "circle") {
      return [];
    }
    const path: CollisionPath =
      object.kind === "circle"
        ? ["objects", index, "radius"]
        : ["objects", index];
    return radialOffsets(object).flatMap((offset) =>
      radialBoundaryUnresolved(
        frame.x,
        object.center.x,
        offset.x,
        offset.error,
        threshold
      ) ||
      radialBoundaryUnresolved(
        frame.y,
        object.center.y,
        offset.y,
        offset.error,
        threshold
      )
        ? [path]
        : []
    );
  });
  return [
    ...new Map(paths.map((path) => [JSON.stringify(path), path])).values(),
  ];
}

/** Returns exact cuboid faces for scene-wide collision checks. */
export function cuboidCollisionEntries(
  objects: readonly SpaceMathObject[]
): readonly CollisionCoordinateEntry[] {
  return objects.flatMap((object, index) => {
    if (object.kind !== "cuboid") {
      return [];
    }
    return cuboidExtents(object).flatMap(
      ({ axis, center, dimension, extent }) => [
        {
          axis,
          path: ["objects", index, "size", dimension],
          value: BigDecimal.subtract(decimal(center), extent),
        },
        {
          axis,
          path: ["objects", index, "size", dimension],
          value: BigDecimal.sum(decimal(center), extent),
        },
      ]
    );
  });
}

/** Finds finite coordinates that collapse together or into a frame edge. */
export function coordinateCollisionPaths(
  frame: {
    readonly x: AxisRange;
    readonly y: AxisRange;
    readonly z?: AxisRange;
  },
  entries: readonly CollisionPointEntry[],
  derivedEntries: readonly CollisionCoordinateEntry[],
  threshold: BigDecimal.BigDecimal
) {
  const axes = [
    { axis: "x" as const, range: frame.x },
    { axis: "y" as const, range: frame.y },
    ...(frame.z ? [{ axis: "z" as const, range: frame.z }] : []),
  ];
  const paths = axes.flatMap(({ axis, range }) => {
    const coordinates: readonly CollisionCoordinateEntry[] = [
      ...entries.map(({ path, point }) => ({
        axis,
        path: [...path, axis],
        value: point[axis],
      })),
      ...derivedEntries.filter((entry) => entry.axis === axis),
    ];
    const unresolved = unresolvedCollisionIndexes(
      [{ value: range.min }, { value: range.max }, ...coordinates],
      threshold
    );
    return coordinates.flatMap((entry, index) =>
      unresolved.has(index + 2) ? [entry.path] : []
    );
  });
  return [
    ...new Map(paths.map((path) => [JSON.stringify(path), path])).values(),
  ];
}

/** Finds non-zero radius deltas between concentric circles or arcs. */
export function concentricRadiusCollisionPaths(
  objects: readonly PlaneMathObject[],
  threshold: BigDecimal.BigDecimal
) {
  const byX = new Map<
    number,
    Map<number, Array<{ index: number; value: number }>>
  >();
  for (const [index, object] of objects.entries()) {
    if (object.kind !== "arc" && object.kind !== "circle") {
      continue;
    }
    let byY = byX.get(object.center.x);
    if (!byY) {
      byY = new Map();
      byX.set(object.center.x, byY);
    }
    const group = byY.get(object.center.y) ?? [];
    group.push({ index, value: object.radius });
    byY.set(object.center.y, group);
  }
  const paths: CollisionPath[] = [];
  for (const byY of byX.values()) {
    for (const group of byY.values()) {
      const unresolved = unresolvedCollisionIndexes(group, threshold);
      for (const [entryIndex, entry] of group.entries()) {
        if (unresolved.has(entryIndex)) {
          paths.push(["objects", entry.index, "radius"]);
        }
      }
    }
  }
  return paths;
}
