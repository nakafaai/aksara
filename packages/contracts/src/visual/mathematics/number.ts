import { Schema } from "effect";
import { cardFields, type RichSlot } from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/** The two ends of one segment; a missing end is a ray to the edge of the axis. */
interface SegmentEnds {
  readonly end?: number;
  readonly start?: number;
}

/** Checks that a segment that has two ends does not end before it starts. */
function isOrderedSegment({ end, start }: SegmentEnds) {
  return start === undefined || end === undefined || start <= end;
}

/**
 * One segment of a number line. A segment without a start or an end is a ray
 * to the edge of the axis, as the renderer draws it. The corpus sets a
 * background only to transparent, and an arbitrary color is not part of this
 * contract, because no meaning may ride on color.
 */
function segment<E>(rich: RichSlot<E>) {
  return Schema.Struct({
    backgroundColor: Schema.optionalKey(Schema.Literal("transparent")),
    end: Schema.optionalKey(Schema.Finite),
    endInclusive: Schema.optionalKey(Schema.Boolean),
    endLabel: Schema.optionalKey(rich),
    label: Schema.optionalKey(rich),
    shaded: Schema.optionalKey(Schema.Boolean),
    showPoints: Schema.optionalKey(Schema.Boolean),
    start: Schema.optionalKey(Schema.Finite),
    startInclusive: Schema.optionalKey(Schema.Boolean),
    startLabel: Schema.optionalKey(rich),
  }).check(
    Schema.makeFilter(isOrderedSegment, {
      message: "Expected a segment that does not end before it starts.",
    })
  );
}

/** The visible range of a number line, each end optional. */
interface VisibleRange {
  readonly max?: number;
  readonly min?: number;
}

/** Checks that the visible range of a number line runs upward. */
function isOrderedRange({ max, min }: VisibleRange) {
  return min === undefined || max === undefined || min < max;
}

/** Props of `NumberLine`: segments on a line, with an optional visible range. */
export function numberLine<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      max: Schema.optionalKey(Schema.Finite),
      min: Schema.optionalKey(Schema.Finite),
      segments: Schema.NonEmptyArray(segment(rich)),
    }).check(
      Schema.makeFilter(isOrderedRange, {
        message: "Expected a visible range whose minimum is below its maximum.",
      })
    )
  );
}
