import assert from "node:assert/strict";
import { Predicate } from "effect";
import {
  isArrayExpressionNode,
  isObjectExpressionNode,
  type ObjectExpressionNode,
} from "#nakafa-content/line/ast";
import { issueAtOffset } from "#nakafa-content/math/finding";
import {
  asEstreeNode,
  attributeEstree,
  type EstreeNode,
  estreeChildren,
  estreeRange,
  type MdxNode,
  staticFieldName,
  visitMdxNodes,
  walkEstreeDeep,
} from "#nakafa-content/mdx/parse";
import type { PointsFinding, PointsRule } from "#nakafa-content/points/finding";

/**
 * Most literal points one array may hold. A named exact point, such as a
 * vertex, an intercept, or a polygon corner, may be typed into the source, and
 * eight corners cover every polygon the corpus names exactly. A sampled curve
 * never fits that budget, so a longer list is a series that a script printed.
 */
const MAX_LITERAL_POINTS = 8;

/**
 * Fewest fractional digits that make a coordinate a long decimal. An exact
 * named coordinate such as 2.5 or 0.125 stays short, while 0.707107 is a
 * computed result that a script rounded when it printed it. Trailing zeros
 * carry no digit, and an exact value with a long expansion is written as the
 * expression that makes it, such as 1 / 16.
 */
const LONG_DECIMAL_DIGITS = 4;

/**
 * Components that chart observed data. An observation has no formula, so its
 * numbers are the lesson's data rather than plotted output, and the gate skips
 * every expression these components own.
 */
const OBSERVED_DATA_COMPONENTS: ReadonlySet<string> = new Set([
  "ScatterDiagram",
]);

/**
 * Components whose props the compiler decodes as a static literal without
 * evaluating code. An irrational named point, such as (sqrt(3), 1), can only be
 * written as a decimal there, so the long-decimal rule cannot apply to them
 * until the component evaluates expressions.
 */
const STATIC_LITERAL_COMPONENTS: ReadonlySet<string> = new Set(["MathVisual"]);

const COORDINATE_NAMES: ReadonlySet<string> = new Set(["x", "y", "z"]);
const DECIMAL_LITERAL = /^\d*\.?(\d*)(?:e([+-]?\d+))?$/iu;
const TRAILING_ZEROS = /0+$/u;

interface ExpressionProgram {
  readonly component: string | undefined;
  readonly node: EstreeNode;
}

interface NumericLiteral {
  readonly offset: number;
  readonly raw: string;
}

/** Builds one finding at an absolute source offset of the document. */
function findingAt(
  source: string,
  offset: number,
  rule: PointsRule,
  message: string
): PointsFinding {
  const { column, line } = issueAtOffset(source, offset, rule);
  return { column, line, message, rule };
}

/** Collects every authored expression that plots numbers, with its component. */
function documentPrograms(tree: MdxNode): ExpressionProgram[] {
  const programs: ExpressionProgram[] = [];
  visitMdxNodes(tree, (node) => {
    if (
      node.type === "mdxFlowExpression" ||
      node.type === "mdxTextExpression"
    ) {
      for (const program of estreeChildren(node.data?.estree)) {
        programs.push({ component: undefined, node: program });
      }
      return;
    }
    if (
      node.type !== "mdxJsxFlowElement" &&
      node.type !== "mdxJsxTextElement"
    ) {
      return;
    }
    if (node.name !== undefined && OBSERVED_DATA_COMPONENTS.has(node.name)) {
      return;
    }
    assert.ok(node.attributes);
    for (const attribute of node.attributes) {
      const program = attributeEstree(attribute);
      if (program) {
        programs.push({ component: node.name, node: program });
      }
    }
  });
  return programs;
}

/** Reads a numeric literal with its optional sign, never a computed value. */
function numericLiteral(
  node: EstreeNode | undefined
): NumericLiteral | undefined {
  if (node?.type === "Literal" && Predicate.isNumber(node.value)) {
    return { offset: estreeRange(node).start.offset, raw: String(node.raw) };
  }
  if (
    node?.type === "UnaryExpression" &&
    (node.operator === "-" || node.operator === "+")
  ) {
    const argument = numericLiteral(asEstreeNode(node.argument));
    return (
      argument && {
        offset: estreeRange(node).start.offset,
        raw: argument.raw,
      }
    );
  }
  return undefined;
}

/** Counts the fractional digits of a literal once its trailing zeros drop. */
function fractionalDigits(raw: string): number {
  const match: RegExpExecArray | null = DECIMAL_LITERAL.exec(
    raw.replaceAll("_", "")
  );
  const fraction = (match?.[1] ?? "").replace(TRAILING_ZEROS, "");
  return Math.max(0, fraction.length - Number(match?.[2] ?? 0));
}

/** Reads the value of one statically named property of an object literal. */
function propertyValue(
  object: ObjectExpressionNode,
  name: string
): EstreeNode | undefined {
  for (const property of estreeChildren(object.properties)) {
    if (
      property.type === "Property" &&
      property.computed !== true &&
      staticFieldName(asEstreeNode(property.key)) === name
    ) {
      return asEstreeNode(property.value);
    }
  }
  return undefined;
}

/** Identifies an object literal whose x and y are both numeric literals. */
function isLiteralPointObject(node: EstreeNode): boolean {
  return (
    isObjectExpressionNode(node) &&
    ["x", "y"].every(
      (name) => numericLiteral(propertyValue(node, name)) !== undefined
    )
  );
}

/** Identifies an array literal of two or three numeric literals. */
function isLiteralPointTuple(node: EstreeNode): boolean {
  return (
    isArrayExpressionNode(node) &&
    (node.elements.length === 2 || node.elements.length === 3) &&
    node.elements.every(
      (element) => numericLiteral(asEstreeNode(element)) !== undefined
    )
  );
}

/** Reports one array that holds more literal points than a lesson may type. */
function listFinding(
  source: string,
  array: EstreeNode,
  component: string | undefined
): PointsFinding | undefined {
  const count = estreeChildren(array.elements).filter(
    (element) => isLiteralPointObject(element) || isLiteralPointTuple(element)
  ).length;
  if (count <= MAX_LITERAL_POINTS) {
    return undefined;
  }
  const advice =
    component !== undefined && STATIC_LITERAL_COMPONENTS.has(component)
      ? `${component} evaluates no code, so draw a sampled curve with LineEquation and Array.from, and keep only named exact points here`
      : "build the series with Array.from from its formula, and keep only named exact points as literals";
  return findingAt(
    source,
    estreeRange(array).start.offset,
    "literal-points",
    `${count} literal points in one array: ${advice}`
  );
}

/** Reports one x, y, or z property that is written as a long decimal. */
function decimalFinding(
  source: string,
  property: EstreeNode
): PointsFinding | undefined {
  const name = staticFieldName(asEstreeNode(property.key));
  const literal = numericLiteral(asEstreeNode(property.value));
  if (
    property.computed === true ||
    name === undefined ||
    !COORDINATE_NAMES.has(name) ||
    literal === undefined ||
    fractionalDigits(literal.raw) < LONG_DECIMAL_DIGITS
  ) {
    return undefined;
  }
  return findingAt(
    source,
    literal.offset,
    "long-decimal",
    `${name}: ${literal.raw} is a long decimal written as a coordinate: write the expression that computes it, such as Math.sqrt(3) or 1 / 3`
  );
}

/** Applies the rule that fits one node of an expression owned by a component. */
function nodeFinding(
  source: string,
  node: EstreeNode,
  component: string | undefined
): PointsFinding | undefined {
  if (node.type === "ArrayExpression") {
    return listFinding(source, node, component);
  }
  if (
    node.type === "Property" &&
    !(component !== undefined && STATIC_LITERAL_COMPONENTS.has(component))
  ) {
    return decimalFinding(source, node);
  }
  return undefined;
}

/** Finds literal point lists and long decimal coordinates in one document. */
export function findLiteralPoints(
  source: string,
  tree: MdxNode
): PointsFinding[] {
  const findings: PointsFinding[] = [];
  for (const { component, node: program } of documentPrograms(tree)) {
    walkEstreeDeep(program, (node) => {
      const finding = nodeFinding(source, node, component);
      if (finding) {
        findings.push(finding);
      }
    });
  }
  return findings;
}
