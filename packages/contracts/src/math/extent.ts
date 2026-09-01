import { BigDecimal } from "effect";

import type { PlaneMathFrame, PlaneMathObject } from "#contracts/math/plane";
import { decimal, makeRatio, ratioInRange } from "#contracts/math/rational";
import type { SpaceMathFrame, SpaceMathObject } from "#contracts/math/space";

export type AxisRange = PlaneMathFrame["x"];

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

/** Checks an exact signed offset without rounding it into its origin. */
function axisContainsOffset(
  range: AxisRange,
  origin: number,
  offset: BigDecimal.BigDecimal
) {
  if (!axisContains(range, origin)) {
    return false;
  }
  const center = decimal(origin);
  const clearance = BigDecimal.isNegative(offset)
    ? BigDecimal.subtract(center, decimal(range.min))
    : BigDecimal.subtract(decimal(range.max), center);
  return BigDecimal.isLessThanOrEqualTo(BigDecimal.abs(offset), clearance);
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

/** Resolves an exact cardinal offset or one finite non-cardinal trig offset. */
function arcOffset(
  radius: number,
  angle: number
): { readonly x: BigDecimal.BigDecimal; readonly y: BigDecimal.BigDecimal } {
  const normalized = normalizeDegrees(angle);
  const exactRadius = decimal(radius);
  if (normalized === 0) {
    return { x: exactRadius, y: decimal(0) };
  }
  if (normalized === 90) {
    return { x: decimal(0), y: exactRadius };
  }
  if (normalized === 180) {
    return { x: BigDecimal.negate(exactRadius), y: decimal(0) };
  }
  if (normalized === 270) {
    return { x: decimal(0), y: BigDecimal.negate(exactRadius) };
  }
  const radians = (normalized * Math.PI) / 180;
  return {
    x: decimal(radius * Math.cos(radians)),
    y: decimal(radius * Math.sin(radians)),
  };
}

/** Checks the exact endpoints and cardinal extrema of one directed arc. */
export function arcContained(
  frame: PlaneMathFrame,
  object: Extract<PlaneMathObject, { readonly kind: "arc" }>
) {
  const angles = [
    object.startDegrees,
    object.startDegrees + object.sweepDegrees,
  ];
  for (const angle of [0, 90, 180, 270]) {
    if (arcContainsAngle(object.startDegrees, object.sweepDegrees, angle)) {
      angles.push(angle);
    }
  }
  return angles.every((angle) => {
    const offset = arcOffset(object.radius, angle);
    return (
      axisContainsOffset(frame.x, object.center.x, offset.x) &&
      axisContainsOffset(frame.y, object.center.y, offset.y)
    );
  });
}

/** Checks one circle through exact radius-to-boundary comparisons. */
export function circleContained(
  frame: PlaneMathFrame,
  object: Extract<PlaneMathObject, { readonly kind: "circle" }>
) {
  const radius = decimal(object.radius);
  const negativeRadius = BigDecimal.negate(radius);
  return (
    axisContainsOffset(frame.x, object.center.x, radius) &&
    axisContainsOffset(frame.x, object.center.x, negativeRadius) &&
    axisContainsOffset(frame.y, object.center.y, radius) &&
    axisContainsOffset(frame.y, object.center.y, negativeRadius)
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

/** Checks one cuboid through exact half-extent-to-boundary comparisons. */
export function cuboidContained(
  frame: SpaceMathFrame,
  object: Extract<SpaceMathObject, { readonly kind: "cuboid" }>
) {
  const halfLength = BigDecimal.multiply(
    decimal(object.size.length),
    decimal(0.5)
  );
  const halfHeight = BigDecimal.multiply(
    decimal(object.size.height),
    decimal(0.5)
  );
  const halfWidth = BigDecimal.multiply(
    decimal(object.size.width),
    decimal(0.5)
  );
  const dimensions: ReadonlyArray<
    readonly [AxisRange, number, BigDecimal.BigDecimal]
  > = [
    [frame.x, object.center.x, halfLength],
    [frame.y, object.center.y, halfHeight],
    [frame.z, object.center.z, halfWidth],
  ];
  return dimensions.every(
    ([range, center, extent]) =>
      axisContainsOffset(range, center, extent) &&
      axisContainsOffset(range, center, BigDecimal.negate(extent))
  );
}
