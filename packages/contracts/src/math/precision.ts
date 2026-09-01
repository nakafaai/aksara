import { BigDecimal, Array as EffectArray } from "effect";

import type { PlanePoint, SpacePoint } from "#contracts/math/base";
import type { AxisRange } from "#contracts/math/extent";
import {
  type AxisTraversal,
  infinitePathInterval,
} from "#contracts/math/intersection";
import { decimal, type ExactRatio, makeRatio } from "#contracts/math/rational";

const FLOAT32_RESOLUTION = BigDecimal.fromStringUnsafe(
  "0.00000011920928955078125"
);
const PI = BigDecimal.fromStringUnsafe(
  "3.1415926535897932384626433832795028841971693993751"
);
const TWO = BigDecimal.fromBigInt(2n);
const FOUR = BigDecimal.fromBigInt(4n);
const THREE_SIXTY = BigDecimal.fromBigInt(360n);

export type RenderThreshold = BigDecimal.BigDecimal;

/** Returns the exact width of one finite authored axis. */
export function axisSpan(range: AxisRange) {
  return BigDecimal.subtract(decimal(range.max), decimal(range.min));
}

/** Checks one exact axis width against the shared render threshold. */
export function spanUnresolved(range: AxisRange, threshold: RenderThreshold) {
  return BigDecimal.isLessThan(axisSpan(range), threshold);
}

/** Checks one non-zero measurement against the shared render threshold. */
export function measureUnresolved(value: number, threshold: RenderThreshold) {
  return decimalMeasureUnresolved(decimal(value), threshold);
}

/** Checks one exact non-zero measurement against the render threshold. */
function decimalMeasureUnresolved(
  value: BigDecimal.BigDecimal,
  threshold: RenderThreshold
) {
  const measure = BigDecimal.abs(value);
  return (
    !BigDecimal.isZero(measure) && BigDecimal.isLessThan(measure, threshold)
  );
}

/** Resolves 2^-23 of the complete translation-invariant render envelope. */
export function renderThreshold(
  ranges: readonly [AxisRange, AxisRange, ...AxisRange[]],
  padding: number,
  envelopePairs: readonly (readonly [number, number])[] = []
) {
  const [firstRange, ...remainingRanges] = ranges;
  let extent = axisSpan(firstRange);
  for (const range of remainingRanges) {
    extent = BigDecimal.max(extent, axisSpan(range));
  }
  for (const [left, right] of envelopePairs) {
    const externalDelta = BigDecimal.abs(
      BigDecimal.subtract(decimal(left), decimal(right))
    );
    extent = BigDecimal.max(extent, externalDelta);
  }
  const padded = BigDecimal.sum(
    extent,
    BigDecimal.multiply(decimal(padding), TWO)
  );
  return BigDecimal.multiply(padded, FLOAT32_RESOLUTION);
}

/** Includes both view coordinates, their separation, and one frame axis. */
export function axisEnvelopePairs(
  range: AxisRange,
  left: number,
  right: number
): readonly (readonly [number, number])[] {
  return [
    [left, right],
    [left, range.min],
    [left, range.max],
    [right, range.min],
    [right, range.max],
  ];
}

/** Subtracts two exact path parameters without dividing either ratio. */
function ratioDifference(left: ExactRatio, right: ExactRatio) {
  return makeRatio(
    BigDecimal.subtract(
      BigDecimal.multiply(left.numerator, right.denominator),
      BigDecimal.multiply(right.numerator, left.denominator)
    ),
    BigDecimal.multiply(left.denominator, right.denominator)
  );
}

/** Checks that the frame-visible portion of one infinite path remains visible. */
export function visiblePathResolvable(
  kind: "line" | "ray",
  axes: readonly AxisTraversal[],
  threshold: RenderThreshold
) {
  const interval = infinitePathInterval(kind, axes);
  if (!(interval?.entry && interval.exit)) {
    return false;
  }
  const parameterSpan = ratioDifference(interval.exit, interval.entry);
  let hasVisibleExtent = false;
  for (const axis of axes) {
    const direction = BigDecimal.abs(
      BigDecimal.subtract(decimal(axis.through), decimal(axis.start))
    );
    const visibleNumerator = BigDecimal.multiply(
      BigDecimal.abs(parameterSpan.numerator),
      direction
    );
    if (BigDecimal.isZero(visibleNumerator)) {
      continue;
    }
    hasVisibleExtent = true;
    if (
      BigDecimal.isLessThan(
        visibleNumerator,
        BigDecimal.multiply(threshold, parameterSpan.denominator)
      )
    ) {
      return false;
    }
  }
  return hasVisibleExtent;
}

/** Checks whether any non-zero polygon altitude collapses in the renderer. */
export function polygonAltitudeUnresolved(
  vertices: readonly [
    PlanePoint | SpacePoint,
    PlanePoint | SpacePoint,
    PlanePoint | SpacePoint,
    ...(PlanePoint | SpacePoint)[],
  ],
  threshold: RenderThreshold
) {
  const exact = vertices.map((point) => ({
    x: decimal(point.x),
    y: decimal(point.y),
    z: decimal("z" in point ? point.z : 0),
  }));
  const thresholdSquared = BigDecimal.multiply(threshold, threshold);
  for (const [index, point] of exact.entries()) {
    const previous = EffectArray.getUnsafe(
      exact,
      (index + exact.length - 1) % exact.length
    );
    const next = EffectArray.getUnsafe(exact, (index + 1) % exact.length);
    const baseline = {
      x: BigDecimal.subtract(next.x, previous.x),
      y: BigDecimal.subtract(next.y, previous.y),
      z: BigDecimal.subtract(next.z, previous.z),
    };
    const offset = {
      x: BigDecimal.subtract(point.x, previous.x),
      y: BigDecimal.subtract(point.y, previous.y),
      z: BigDecimal.subtract(point.z, previous.z),
    };
    const cross = {
      x: BigDecimal.subtract(
        BigDecimal.multiply(baseline.y, offset.z),
        BigDecimal.multiply(baseline.z, offset.y)
      ),
      y: BigDecimal.subtract(
        BigDecimal.multiply(baseline.z, offset.x),
        BigDecimal.multiply(baseline.x, offset.z)
      ),
      z: BigDecimal.subtract(
        BigDecimal.multiply(baseline.x, offset.y),
        BigDecimal.multiply(baseline.y, offset.x)
      ),
    };
    const crossSquared = BigDecimal.sumAll(
      Object.values(cross).map((value) => BigDecimal.multiply(value, value))
    );
    if (BigDecimal.isZero(crossSquared)) {
      continue;
    }
    const baselineSquared = BigDecimal.sumAll(
      Object.values(baseline).map((value) => BigDecimal.multiply(value, value))
    );
    if (
      BigDecimal.isLessThan(
        crossSquared,
        BigDecimal.multiply(thresholdSquared, baselineSquared)
      )
    ) {
      return true;
    }
  }
  return false;
}

/** Returns a stable sine for an angle that may fall below Number.MIN_VALUE. */
function stableSine(
  exactRadians: BigDecimal.BigDecimal,
  numericRadians: number
) {
  return numericRadians === 0
    ? exactRadians
    : decimal(Math.sin(numericRadians));
}

/** Resolves the endpoint chord and curvature sagitta of one finite arc. */
function arcMeasures(radius: number, sweepDegrees: number) {
  const minorSweep = Math.min(
    Math.abs(sweepDegrees),
    360 - Math.abs(sweepDegrees)
  );
  const halfRadians = BigDecimal.divideUnsafe(
    BigDecimal.multiply(decimal(minorSweep), PI),
    THREE_SIXTY
  );
  const numericHalfRadians = minorSweep * (Math.PI / 360);
  const halfSine = stableSine(halfRadians, numericHalfRadians);
  const quarterRadians = BigDecimal.divideUnsafe(halfRadians, TWO);
  const quarterSine = stableSine(quarterRadians, numericHalfRadians / 2);
  const doubledRadius = BigDecimal.multiply(decimal(radius), TWO);
  return {
    chord: BigDecimal.multiply(doubledRadius, halfSine),
    sagitta: BigDecimal.multiply(
      doubledRadius,
      BigDecimal.multiply(quarterSine, quarterSine)
    ),
  };
}

/** Checks the rendered chord separating the two finite ends of one arc. */
export function arcEndpointsUnresolved(
  radius: number,
  sweepDegrees: number,
  threshold: RenderThreshold
) {
  return decimalMeasureUnresolved(
    arcMeasures(Math.abs(radius), sweepDegrees).chord,
    threshold
  );
}

/** Checks whether one arc's non-zero curvature collapses into its chord. */
export function arcCurvatureUnresolved(
  radius: number,
  sweepDegrees: number,
  threshold: RenderThreshold
) {
  return decimalMeasureUnresolved(
    arcMeasures(Math.abs(radius), sweepDegrees).sagitta,
    threshold
  );
}

/** Checks exact quadratic curvature without relying on renderer sampling. */
export function quadraticCurvatureUnresolved(
  coefficient: number,
  domainSpan: BigDecimal.BigDecimal,
  threshold: RenderThreshold
) {
  const curvature = BigDecimal.multiply(
    BigDecimal.abs(decimal(coefficient)),
    BigDecimal.multiply(domainSpan, domainSpan)
  );
  return BigDecimal.isLessThan(curvature, BigDecimal.multiply(threshold, FOUR));
}
