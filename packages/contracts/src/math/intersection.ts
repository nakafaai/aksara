import { type AxisRange, axisContains } from "#contracts/math/extent";
import type { PlaneMathObject } from "#contracts/math/plane";
import {
  compareRatios,
  differenceRatio,
  type ExactRatio,
  numberRatio,
} from "#contracts/math/rational";

/** One Cartesian slab traversed by the same parametric path. */
export interface AxisTraversal {
  readonly range: AxisRange;
  readonly start: number;
  readonly through: number;
}

type InfinitePathKind = Extract<
  PlaneMathObject,
  { readonly kind: "line" | "ray" }
>["kind"];

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

/** Checks whether one infinite line or ray intersects an inclusive axis-aligned box. */
export function infinitePathIntersectsBox(
  kind: InfinitePathKind,
  axes: readonly AxisTraversal[]
) {
  let entry: ExactRatio | undefined =
    kind === "ray" ? numberRatio(0) : undefined;
  let exit: ExactRatio | undefined;
  for (const axis of axes) {
    if (axis.start === axis.through) {
      if (!axisContains(axis.range, axis.start)) {
        return false;
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
      return false;
    }
  }
  return true;
}
