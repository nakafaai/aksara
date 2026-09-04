import { BigDecimal } from "effect";

/** Exact quotient whose denominator is normalized to a positive value. */
export interface ExactRatio {
  readonly denominator: BigDecimal.BigDecimal;
  readonly numerator: BigDecimal.BigDecimal;
}

const unit = BigDecimal.fromBigInt(1n);

/** Creates one exact decimal from a schema-validated finite number. */
export function decimal(value: number) {
  return BigDecimal.fromNumberUnsafe(value);
}

/** Lifts one exact decimal into the shared rational coordinate form. */
export function decimalRatio(value: BigDecimal.BigDecimal): ExactRatio {
  return { denominator: unit, numerator: value };
}

/** Creates one exact ratio from a known non-zero denominator. */
export function makeRatio(
  numerator: BigDecimal.BigDecimal,
  denominator: BigDecimal.BigDecimal
): ExactRatio {
  return BigDecimal.isNegative(denominator)
    ? {
        denominator: BigDecimal.negate(denominator),
        numerator: BigDecimal.negate(numerator),
      }
    : { denominator, numerator };
}

/** Creates one exact ratio from a finite number. */
export function numberRatio(value: number): ExactRatio {
  return decimalRatio(decimal(value));
}

/** Evaluates one affine coordinate without dividing its exact parameter. */
export function affineRatio(
  start: number,
  through: number,
  parameter: ExactRatio
): ExactRatio {
  const origin = decimal(start);
  return makeRatio(
    BigDecimal.sum(
      BigDecimal.multiply(origin, parameter.denominator),
      BigDecimal.multiply(
        BigDecimal.subtract(decimal(through), origin),
        parameter.numerator
      )
    ),
    parameter.denominator
  );
}

/** Creates the exact path parameter `(boundary - start) / (through - start)`. */
export function differenceRatio(
  boundary: number,
  start: number,
  through: number
): ExactRatio {
  const origin = decimal(start);
  return makeRatio(
    BigDecimal.subtract(decimal(boundary), origin),
    BigDecimal.subtract(decimal(through), origin)
  );
}

/** Compares two exact ratios without division or floating-point overflow. */
export function compareRatios(left: ExactRatio, right: ExactRatio) {
  return BigDecimal.Order(
    BigDecimal.multiply(left.numerator, right.denominator),
    BigDecimal.multiply(right.numerator, left.denominator)
  );
}

/** Checks one exact ratio against inclusive finite numeric boundaries. */
export function ratioInRange(
  ratio: ExactRatio,
  minimum: number,
  maximum: number
) {
  return (
    compareRatios(numberRatio(minimum), ratio) <= 0 &&
    compareRatios(ratio, numberRatio(maximum)) <= 0
  );
}
