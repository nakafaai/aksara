import { Schema } from "effect";

import { MathAxisRangeSchema } from "#contracts/math/base";
import { axisContains } from "#contracts/math/extent";
import {
  compareRatios,
  differenceRatio,
  type ExactRatio,
  ExactRatioSchema,
  numberRatio,
} from "#contracts/math/rational";

/** One Cartesian slab traversed by the same parametric path. */
export const AxisTraversalSchema = Schema.Struct({
  range: MathAxisRangeSchema,
  start: Schema.Finite,
  through: Schema.Finite,
});
export type AxisTraversal = typeof AxisTraversalSchema.Type;

const InfinitePathKindSchema = Schema.Literals(["line", "ray"]);
export type InfinitePathKind = typeof InfinitePathKindSchema.Type;

/** Exact finite sides of one clipped infinite path parameter interval. */
const InfinitePathIntervalSchema = Schema.Struct({
  entry: Schema.UndefinedOr(ExactRatioSchema),
  exit: Schema.UndefinedOr(ExactRatioSchema),
});
export type InfinitePathInterval = typeof InfinitePathIntervalSchema.Type;

/** Keeps the greater finite side of one lower parameter boundary. */
function later(
  current: ExactRatio | undefined,
  candidate: ExactRatio
): ExactRatio {
  return current === undefined || compareRatios(current, candidate) < 0
    ? candidate
    : current;
}

/** Keeps the lesser finite side of one upper parameter boundary. */
function earlier(
  current: ExactRatio | undefined,
  candidate: ExactRatio
): ExactRatio {
  return current === undefined || compareRatios(candidate, current) < 0
    ? candidate
    : current;
}

/** Clips one infinite line or ray against an inclusive axis-aligned box. */
export function infinitePathInterval(
  kind: InfinitePathKind,
  axes: readonly AxisTraversal[]
): InfinitePathInterval | undefined {
  let entry: ExactRatio | undefined =
    kind === "ray" ? numberRatio(0) : undefined;
  let exit: ExactRatio | undefined;
  for (const axis of axes) {
    if (axis.start === axis.through) {
      if (!axisContains(axis.range, axis.start)) {
        return;
      }
      continue;
    }
    const first = differenceRatio(axis.range.min, axis.start, axis.through);
    const second = differenceRatio(axis.range.max, axis.start, axis.through);
    const near = compareRatios(first, second) <= 0 ? first : second;
    const far = near === first ? second : first;
    entry = later(entry, near);
    exit = earlier(exit, far);
    if (exit !== undefined && compareRatios(entry, exit) > 0) {
      return;
    }
  }
  return { entry, exit };
}

/** Checks whether one infinite line or ray intersects an inclusive axis-aligned box. */
export function infinitePathIntersectsBox(
  kind: InfinitePathKind,
  axes: readonly AxisTraversal[]
) {
  return infinitePathInterval(kind, axes) !== undefined;
}
