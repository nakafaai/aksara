import { Array as Arr, Schema } from "effect";

/** One sampled position; a plane curve keeps z at zero. */
export const SamplePointSchema = Schema.Struct({
  x: Schema.Finite,
  y: Schema.Finite,
  z: Schema.Finite,
});
export type SamplePoint = typeof SamplePointSchema.Type;

/** One closed range of values, from its least to its greatest. */
export const SampleRangeSchema = Schema.Struct({
  max: Schema.Finite,
  min: Schema.Finite,
});
export type SampleRange = typeof SampleRangeSchema.Type;

/** The frame a sampled curve is clipped to; a plane frame has no z range. */
export const SampleBoxSchema = Schema.Struct({
  x: SampleRangeSchema,
  y: SampleRangeSchema,
  z: Schema.optionalKey(SampleRangeSchema),
});
export type SampleBox = typeof SampleBoxSchema.Type;

/** The three axes a sampled point has, in order. */
export const AXES = ["x", "y", "z"] as const;

/** Whether every coordinate of a point is finite. */
export function finite(point: SamplePoint) {
  return (
    Number.isFinite(point.x) &&
    Number.isFinite(point.y) &&
    Number.isFinite(point.z)
  );
}

/** The frame's ranges, with a plane frame's z pinned to zero. */
export function ranges(box: SampleBox) {
  return { x: box.x, y: box.y, z: box.z ?? { max: 0, min: 0 } };
}

/** Distance between two points measured in frame spans, so every axis counts alike. */
export function spanDistance(
  box: SampleBox,
  from: SamplePoint,
  to: SamplePoint
) {
  const all = ranges(box);
  return Math.hypot(
    ...Arr.map(AXES, (axis) => {
      const span = all[axis].max - all[axis].min;
      return span > 0 ? (to[axis] - from[axis]) / span : 0;
    })
  );
}

/** Whether a point lies inside the frame, its edges included. */
export function insideBox(box: SampleBox, point: SamplePoint) {
  const all = ranges(box);
  return (
    finite(point) &&
    Arr.every(
      AXES,
      (axis) => point[axis] >= all[axis].min && point[axis] <= all[axis].max
    )
  );
}

/**
 * Where a segment enters and leaves the frame, as fractions along it, or
 * nothing when it misses the frame (Liang and Barsky's clipping).
 */
export function clipSegment(
  box: SampleBox,
  from: SamplePoint,
  to: SamplePoint
) {
  const all = ranges(box);
  let enter = 0;
  let leave = 1;
  for (const axis of AXES) {
    const delta = to[axis] - from[axis];
    const { max, min } = all[axis];
    if (delta === 0) {
      if (from[axis] < min || from[axis] > max) {
        return;
      }
      continue;
    }
    const first = (min - from[axis]) / delta;
    const second = (max - from[axis]) / delta;
    enter = Math.max(enter, Math.min(first, second));
    leave = Math.min(leave, Math.max(first, second));
  }
  return enter <= leave ? { enter, leave } : undefined;
}
