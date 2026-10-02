import type { ArrayExpressionNode } from "#nakafa-content/line/ast";
import {
  asEstreeNode,
  type EstreeNode,
  estreeChildren,
  staticFieldName,
} from "#nakafa-content/mdx/parse";
import { findingAt, type PointsFinding } from "#nakafa-content/points/finding";
import {
  type NumericLiteral,
  numericLiteral,
  tupleLiterals,
} from "#nakafa-content/points/point";

/**
 * Fewest fractional digits that make a coordinate a long decimal. An exact
 * named coordinate such as 2.5 or 0.125 stays short, while 0.707107 is a
 * computed result that a script rounded when it printed it. Trailing zeros
 * carry no digit, and an exact value with a long expansion is written as the
 * expression that makes it, such as 1 / 16 or Math.sqrt(3).
 */
const LONG_DECIMAL_DIGITS = 4;

const COORDINATE_NAMES: ReadonlySet<string> = new Set(["x", "y", "z"]);
const DECIMAL_LITERAL = /^\d*\.?(\d*)(?:e([+-]?\d+))?$/iu;
const TRAILING_ZEROS = /0+$/u;

/** Counts the fractional digits of a literal once its trailing zeros drop. */
function fractionalDigits(raw: string): number {
  const match: RegExpExecArray | null = DECIMAL_LITERAL.exec(
    raw.replaceAll("_", "")
  );
  const fraction = (match?.[1] ?? "").replace(TRAILING_ZEROS, "");
  return Math.max(0, fraction.length - Number(match?.[2] ?? 0));
}

/** Reports one literal that is a long decimal, naming what it is written as. */
function longDecimals(
  source: string,
  literal: NumericLiteral,
  written: string
): PointsFinding[] {
  if (fractionalDigits(literal.raw) < LONG_DECIMAL_DIGITS) {
    return [];
  }
  return [
    findingAt(
      source,
      literal.offset,
      "long-decimal",
      `${written} is a long decimal written as a coordinate: write the expression that computes it, such as Math.sqrt(3) or 1 / 3`
    ),
  ];
}

/** Reports one x, y, or z property that is written as a long decimal. */
export function propertyFindings(
  source: string,
  property: EstreeNode
): PointsFinding[] {
  const name = staticFieldName(asEstreeNode(property.key));
  const literal = numericLiteral(asEstreeNode(property.value));
  if (
    property.computed === true ||
    name === undefined ||
    !COORDINATE_NAMES.has(name) ||
    literal === undefined
  ) {
    return [];
  }
  return longDecimals(source, literal, `${name}: ${literal.raw}`);
}

/**
 * Reports every long decimal in the point tuples that an array lists. A tuple
 * that stands alone, such as a label offset or a camera position, places
 * something instead of plotting a point, so only a list of tuples counts.
 */
export function tupleFindings(
  source: string,
  array: ArrayExpressionNode
): PointsFinding[] {
  return estreeChildren(array.elements).flatMap((element) =>
    (tupleLiterals(element) ?? []).flatMap((literal) =>
      longDecimals(source, literal, `${literal.raw} in a point tuple`)
    )
  );
}
