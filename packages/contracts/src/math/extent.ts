import { BigDecimal } from "effect";

import { GEOMETRY_TOLERANCE } from "#contracts/math/base";
import type { PlaneMathFrame, PlaneMathObject } from "#contracts/math/plane";
import { decimal, makeRatio, ratioInRange } from "#contracts/math/rational";
import type { SpaceMathFrame, SpaceMathObject } from "#contracts/math/space";

export type AxisRange = PlaneMathFrame["x"];

const ZERO = BigDecimal.fromBigInt(0n);

/** Checks one finite coordinate against its inclusive authored range. */
export function axisContains(range: AxisRange, coordinate: number) {
  return coordinate >= range.min && coordinate <= range.max;
}

/** Checks one exact decimal coordinate against an inclusive authored range. */
function axisContainsDecimal(
  range: AxisRange,
  coordinate: BigDecimal.BigDecimal
) {
  return (
    BigDecimal.isGreaterThanOrEqualTo(coordinate, decimal(range.min)) &&
    BigDecimal.isLessThanOrEqualTo(coordinate, decimal(range.max))
  );
}

/** Checks one translated coordinate within its explicit numeric error envelope. */
function axisContainsTranslated(
  range: AxisRange,
  origin: number,
  offset: BigDecimal.BigDecimal,
  error: BigDecimal.BigDecimal
) {
  const coordinate = BigDecimal.sum(decimal(origin), offset);
  return (
    BigDecimal.isGreaterThanOrEqualTo(
      coordinate,
      BigDecimal.subtract(decimal(range.min), error)
    ) &&
    BigDecimal.isLessThanOrEqualTo(
      coordinate,
      BigDecimal.sum(decimal(range.max), error)
    )
  );
}

/** Normalizes one angle to the canonical half-open degree interval. */
function normalizeDegrees(value: number) {
  return ((value % 360) + 360) % 360;
}

/** Returns whether one cardinal angle lies on the authored directed arc. */
function arcContainsAngle(start: number, sweep: number, angle: number) {
  return sweep > 0
    ? normalizeDegrees(angle - start) <= sweep
    : normalizeDegrees(start - angle) <= -sweep;
}

export interface RadialOffset {
  readonly error: BigDecimal.BigDecimal;
  readonly x: BigDecimal.BigDecimal;
  readonly y: BigDecimal.BigDecimal;
}

/** Resolves exact cardinals or a trig offset with its renderer error envelope. */
function arcOffset(radius: number, angle: number): RadialOffset {
  const normalized = normalizeDegrees(angle);
  const exactRadius = decimal(radius);
  const exact = BigDecimal.fromBigInt(0n);
  if (normalized === 0) {
    return { error: exact, x: exactRadius, y: exact };
  }
  if (normalized === 90) {
    return { error: exact, x: exact, y: exactRadius };
  }
  if (normalized === 180) {
    return { error: exact, x: BigDecimal.negate(exactRadius), y: exact };
  }
  if (normalized === 270) {
    return { error: exact, x: exact, y: BigDecimal.negate(exactRadius) };
  }
  const radians = (normalized * Math.PI) / 180;
  const error = decimal(
    Math.max(Number.MIN_VALUE, radius * GEOMETRY_TOLERANCE)
  );
  return {
    error,
    x: decimal(radius * Math.cos(radians)),
    y: decimal(radius * Math.sin(radians)),
  };
}

/** Returns every endpoint or cardinal offset that bounds one radial object. */
export function radialOffsets(
  object: Extract<PlaneMathObject, { readonly kind: "arc" | "circle" }>
): readonly RadialOffset[] {
  if (object.kind === "circle") {
    return [0, 90, 180, 270].map((angle) => arcOffset(object.radius, angle));
  }
  const angles = [
    object.startDegrees,
    object.startDegrees + object.sweepDegrees,
  ];
  for (const angle of [0, 90, 180, 270]) {
    if (arcContainsAngle(object.startDegrees, object.sweepDegrees, angle)) {
      angles.push(angle);
    }
  }
  return angles.map((angle) => arcOffset(object.radius, angle));
}

/** Checks the exact endpoints and cardinal extrema of one directed arc. */
export function arcContained(
  frame: PlaneMathFrame,
  object: Extract<PlaneMathObject, { readonly kind: "arc" }>
) {
  return radialOffsets(object).every(
    (offset) =>
      axisContainsTranslated(
        frame.x,
        object.center.x,
        offset.x,
        offset.error
      ) &&
      axisContainsTranslated(frame.y, object.center.y, offset.y, offset.error)
  );
}

/** Checks one circle through exact radius-to-boundary comparisons. */
export function circleContained(
  frame: PlaneMathFrame,
  object: Extract<PlaneMathObject, { readonly kind: "circle" }>
) {
  return radialOffsets(object).every(
    (offset) =>
      axisContainsTranslated(
        frame.x,
        object.center.x,
        offset.x,
        offset.error
      ) &&
      axisContainsTranslated(frame.y, object.center.y, offset.y, offset.error)
  );
}

/** Evaluates one quadratic exactly at a finite authored input. */
function quadraticValue(
  object: Extract<PlaneMathObject, { readonly kind: "quadratic" }>,
  input: number
) {
  const value = decimal(input);
  const { a, b, c } = object.coefficients;
  return BigDecimal.sumAll([
    BigDecimal.multiply(BigDecimal.multiply(decimal(a), value), value),
    BigDecimal.multiply(decimal(b), value),
    decimal(c),
  ]);
}

/** Checks the complete quadratic domain and exact endpoint or vertex range. */
export function quadraticContained(
  frame: PlaneMathFrame,
  object: Extract<PlaneMathObject, { readonly kind: "quadratic" }>
) {
  const inputRange = object.inputAxis === "x" ? frame.x : frame.y;
  const outputRange = object.inputAxis === "x" ? frame.y : frame.x;
  if (
    ![object.domain.min, object.domain.max].every((input) =>
      axisContains(inputRange, input)
    )
  ) {
    return false;
  }
  if (
    ![object.domain.min, object.domain.max].every((input) =>
      axisContainsDecimal(outputRange, quadraticValue(object, input))
    )
  ) {
    return false;
  }
  const a = decimal(object.coefficients.a);
  const b = decimal(object.coefficients.b);
  const c = decimal(object.coefficients.c);
  const fourA = BigDecimal.multiply(decimal(4), a);
  const vertex = makeRatio(
    BigDecimal.negate(b),
    BigDecimal.multiply(decimal(2), a)
  );
  if (!ratioInRange(vertex, object.domain.min, object.domain.max)) {
    return true;
  }
  const vertexValue = makeRatio(
    BigDecimal.subtract(
      BigDecimal.multiply(fourA, c),
      BigDecimal.multiply(b, b)
    ),
    fourA
  );
  return ratioInRange(vertexValue, outputRange.min, outputRange.max);
}

export interface CuboidExtent {
  readonly axis: "x" | "y" | "z";
  readonly center: number;
  readonly dimension: "height" | "length" | "width";
  readonly extent: BigDecimal.BigDecimal;
}

/** Returns the exact positive half-extent on every cuboid axis. */
export function cuboidExtents(
  object: Extract<SpaceMathObject, { readonly kind: "cuboid" }>
): readonly CuboidExtent[] {
  const half = decimal(0.5);
  return [
    {
      axis: "x",
      center: object.center.x,
      dimension: "length",
      extent: BigDecimal.multiply(decimal(object.size.length), half),
    },
    {
      axis: "y",
      center: object.center.y,
      dimension: "height",
      extent: BigDecimal.multiply(decimal(object.size.height), half),
    },
    {
      axis: "z",
      center: object.center.z,
      dimension: "width",
      extent: BigDecimal.multiply(decimal(object.size.width), half),
    },
  ];
}

/** Checks one cuboid through exact half-extent-to-boundary comparisons. */
export function cuboidContained(
  frame: SpaceMathFrame,
  object: Extract<SpaceMathObject, { readonly kind: "cuboid" }>
) {
  return cuboidExtents(object).every(
    ({ axis, center, extent }) =>
      axisContainsTranslated(frame[axis], center, extent, ZERO) &&
      axisContainsTranslated(
        frame[axis],
        center,
        BigDecimal.negate(extent),
        ZERO
      )
  );
}
