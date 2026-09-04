import { BigDecimal } from "effect";

import { GEOMETRY_TOLERANCE } from "#contracts/math/base";
import { decimal } from "#contracts/math/rational";

const PI = BigDecimal.fromStringUnsafe(
  "3.1415926535897932384626433832795028841971693993751"
);
const TWO = BigDecimal.fromBigInt(2n);
const NINETY = BigDecimal.fromBigInt(90n);
const ONE_EIGHTY = BigDecimal.fromBigInt(180n);
const THREE_SIXTY = BigDecimal.fromBigInt(360n);
const SEVEN_TWENTY = BigDecimal.fromBigInt(720n);
const TRIGONOMETRIC_ERROR = decimal(GEOMETRY_TOLERANCE);
const MINIMUM_ERROR = decimal(Number.MIN_VALUE);

interface BoundedDecimal {
  readonly error: BigDecimal.BigDecimal;
  readonly value: BigDecimal.BigDecimal;
}

/** Bounds a sine estimate for an angle that may fall below Number.MIN_VALUE. */
function stableSine(
  exactRadians: BigDecimal.BigDecimal,
  numericRadians: number
): BoundedDecimal {
  const value =
    BigDecimal.isZero(exactRadians) || numericRadians === 0
      ? exactRadians
      : decimal(Math.sin(numericRadians));
  const scale = BigDecimal.max(
    BigDecimal.abs(exactRadians),
    BigDecimal.abs(value)
  );
  return {
    error: BigDecimal.max(
      MINIMUM_ERROR,
      BigDecimal.multiply(scale, TRIGONOMETRIC_ERROR)
    ),
    value,
  };
}

/** Multiplies one bounded decimal by an exact scale. */
function scaleBounded(
  bounded: BoundedDecimal,
  scale: BigDecimal.BigDecimal
): BoundedDecimal {
  const magnitude = BigDecimal.abs(scale);
  return {
    error: BigDecimal.multiply(bounded.error, magnitude),
    value: BigDecimal.multiply(bounded.value, scale),
  };
}

/** Squares one bounded decimal with explicit propagated error. */
function squareBounded(bounded: BoundedDecimal): BoundedDecimal {
  return {
    error: BigDecimal.sum(
      BigDecimal.multiply(
        BigDecimal.multiply(TWO, BigDecimal.abs(bounded.value)),
        bounded.error
      ),
      BigDecimal.multiply(bounded.error, bounded.error)
    ),
    value: BigDecimal.multiply(bounded.value, bounded.value),
  };
}

/** Proves that one non-zero bounded measure lies below the threshold. */
function boundedMeasureUnresolved(
  bounded: BoundedDecimal,
  threshold: BigDecimal.BigDecimal
) {
  const magnitude = BigDecimal.abs(bounded.value);
  return (
    !BigDecimal.isZero(magnitude) &&
    BigDecimal.isLessThan(BigDecimal.sum(magnitude, bounded.error), threshold)
  );
}

/** Measures one endpoint's shortest authored offset from a cardinal axis. */
function endpointAxisMeasure(
  radius: number,
  exactDegrees: BigDecimal.BigDecimal,
  numericDegrees: number
) {
  const nearestCardinal = Math.round(numericDegrees / 90);
  const exactDelta = BigDecimal.subtract(
    exactDegrees,
    BigDecimal.multiply(decimal(nearestCardinal), NINETY)
  );
  const exactRadians = BigDecimal.divideUnsafe(
    BigDecimal.multiply(exactDelta, PI),
    ONE_EIGHTY
  );
  const numericDelta = numericDegrees - nearestCardinal * 90;
  return scaleBounded(
    stableSine(exactRadians, numericDelta * (Math.PI / 180)),
    decimal(Math.abs(radius))
  );
}

/** Resolves the endpoint chord and curvature sagitta of one finite arc. */
function arcMeasures(radius: number, sweepDegrees: number) {
  const directedSweep = Math.abs(sweepDegrees);
  const minorSweep = Math.min(directedSweep, 360 - directedSweep);
  const halfRadians = BigDecimal.divideUnsafe(
    BigDecimal.multiply(decimal(minorSweep), PI),
    THREE_SIXTY
  );
  const halfSine = stableSine(halfRadians, minorSweep * (Math.PI / 360));
  const directedQuarterRadians = BigDecimal.divideUnsafe(
    BigDecimal.multiply(decimal(directedSweep), PI),
    SEVEN_TWENTY
  );
  const quarterSine = stableSine(
    directedQuarterRadians,
    directedSweep * (Math.PI / 720)
  );
  const doubledRadius = BigDecimal.multiply(decimal(radius), TWO);
  return {
    chord: scaleBounded(halfSine, doubledRadius),
    sagitta: scaleBounded(squareBounded(quarterSine), doubledRadius),
  };
}

/** Checks the rendered chord separating the two finite ends of one arc. */
export function arcEndpointsUnresolved(
  radius: number,
  sweepDegrees: number,
  threshold: BigDecimal.BigDecimal
) {
  return boundedMeasureUnresolved(
    arcMeasures(Math.abs(radius), sweepDegrees).chord,
    threshold
  );
}

/** Checks whether one arc's non-zero curvature collapses into its chord. */
export function arcCurvatureUnresolved(
  radius: number,
  sweepDegrees: number,
  threshold: BigDecimal.BigDecimal
) {
  return boundedMeasureUnresolved(
    arcMeasures(Math.abs(radius), sweepDegrees).sagitta,
    threshold
  );
}

/** Checks both authored endpoints against their nearest cardinal axes. */
export function arcEndpointAxesUnresolved(
  radius: number,
  startDegrees: number,
  sweepDegrees: number,
  threshold: BigDecimal.BigDecimal
) {
  const exactStart = decimal(startDegrees);
  const exactEnd = BigDecimal.sum(exactStart, decimal(sweepDegrees));
  return [
    endpointAxisMeasure(radius, exactStart, startDegrees),
    endpointAxisMeasure(radius, exactEnd, startDegrees + sweepDegrees),
  ].some((measure) => boundedMeasureUnresolved(measure, threshold));
}
