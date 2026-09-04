import { sourceOffsetForStaticMatch } from "#nakafa-content/mdx/offset";
import {
  asEstreeNode,
  type EstreeNode,
  estreeRange,
  staticFieldName,
} from "#nakafa-content/mdx/parse";
import { staticStringCandidates } from "#nakafa-content/mdx/static";
import {
  addSemicolonsInRange,
  type SemicolonScanOptions,
} from "#nakafa-content/semicolon/source";

const MATH_COMPONENT_NAMES = new Set(["BlockMath", "InlineMath"]);
const TRAILING_BACKSLASH_PATTERN = /\\+$/u;
const NON_PROSE_FIELD_NAMES = new Set([
  "chart",
  "className",
  "code",
  "color",
  "config",
  "fill",
  "href",
  "lang",
  "language",
  "source",
  "src",
  "stroke",
  "style",
  "url",
]);
const RENDERED_KEYS_BY_TYPE: Readonly<Record<string, readonly string[]>> = {
  ArrayExpression: ["elements"],
  BinaryExpression: ["left", "right"],
  ConditionalExpression: ["consequent", "alternate"],
  ExpressionStatement: ["expression"],
  JSXExpressionContainer: ["expression"],
  JSXFragment: ["children"],
  LogicalExpression: ["left", "right"],
  ObjectExpression: ["properties"],
  ParenthesizedExpression: ["expression"],
  Program: ["body"],
  TemplateLiteral: ["quasis", "expressions"],
};

type BlockStatementNode = EstreeNode & {
  body: EstreeNode[];
  type: "BlockStatement";
};

type ExpressionContainerNode = EstreeNode & {
  expression: EstreeNode;
  type: "JSXExpressionContainer";
};

type FunctionExpressionNode = EstreeNode & {
  body: EstreeNode;
  type: "ArrowFunctionExpression" | "FunctionExpression";
};

type JsxElementNode = EstreeNode & {
  children: EstreeNode[];
  openingElement: JsxOpeningElementNode;
  type: "JSXElement";
};

type JsxOpeningElementNode = EstreeNode & {
  attributes: EstreeNode[];
  type: "JSXOpeningElement";
};

type PropertyNode = EstreeNode & {
  value: EstreeNode;
  type: "Property";
};

/** Narrows one parser-owned block statement. */
function isBlockStatementNode(
  node: EstreeNode | undefined
): node is BlockStatementNode {
  return node?.type === "BlockStatement";
}

/** Narrows one parser-owned expression container. */
function isExpressionContainerNode(
  node: EstreeNode | undefined
): node is ExpressionContainerNode {
  return node?.type === "JSXExpressionContainer";
}

/** Narrows one parser-owned function expression. */
function isFunctionExpressionNode(
  node: EstreeNode
): node is FunctionExpressionNode {
  return (
    node.type === "ArrowFunctionExpression" ||
    node.type === "FunctionExpression"
  );
}

/** Narrows one parser-owned JSX element. */
function isJsxElementNode(node: EstreeNode): node is JsxElementNode {
  return node.type === "JSXElement";
}

/** Narrows one parser-owned object property. */
function isPropertyNode(node: EstreeNode): node is PropertyNode {
  return node.type === "Property";
}

/** Identifies a component whose entire rendered region contains authored code. */
export function isCodeComponentName(name: string | undefined): boolean {
  return name === "CodeBlock";
}

/** Tells the MDX adapter whether an attribute stores non-prose configuration. */
export function isNonProseFieldName(name: string | undefined): boolean {
  return name === undefined || NON_PROSE_FIELD_NAMES.has(name);
}

/** Reads the unqualified name of one JSX component when statically known. */
function jsxComponentName(node: EstreeNode): string | undefined {
  const openingElement = asEstreeNode(node.openingElement);
  const name = asEstreeNode(openingElement?.name);
  return name?.type === "JSXIdentifier" && typeof name.name === "string"
    ? name.name
    : undefined;
}

/** Scans a static string expression in either prose or math mode. */
export function collectStaticStringSemicolons(
  node: EstreeNode,
  offsets: Set<number>,
  source: string,
  options: SemicolonScanOptions = {}
): void {
  for (const candidate of staticStringCandidates(node)) {
    for (const match of candidate.text.matchAll(/;/gu)) {
      if (options.allowLatexSpacing) {
        const preceding = candidate.text.slice(0, match.index);
        const slashCount =
          preceding.match(TRAILING_BACKSLASH_PATTERN)?.[0].length ?? 0;
        if (slashCount % 2 === 1) {
          continue;
        }
      }
      offsets.add(
        Number(
          sourceOffsetForStaticMatch(candidate, match.index, match[0], source)
        )
      );
    }
  }
}

/** Scans one JSX attribute with field-specific prose and math handling. */
function collectAttributeSemicolons(
  attribute: EstreeNode,
  offsets: Set<number>,
  source: string
): void {
  const name = staticFieldName(asEstreeNode(attribute.name));
  if (isNonProseFieldName(name)) {
    return;
  }
  const options = { allowLatexSpacing: name === "math" };
  const value = asEstreeNode(attribute.value);
  if (value?.type === "Literal" || value?.type === "TemplateLiteral") {
    collectStaticStringSemicolons(value, offsets, source, options);
    return;
  }
  if (!isExpressionContainerNode(value)) {
    return;
  }
  if (name === "math") {
    collectStaticStringSemicolons(value.expression, offsets, source, options);
  } else {
    collectStructuredExpressionSemicolons(value.expression, offsets, source);
  }
}

/** Scans only values returned from a block-bodied render callback. */
function collectReturnedExpressionSemicolons(
  block: BlockStatementNode,
  offsets: Set<number>,
  source: string
): void {
  for (const statement of block.body) {
    if (statement.type !== "ReturnStatement") {
      continue;
    }
    const argument = asEstreeNode(statement.argument);
    if (argument) {
      collectStructuredExpressionSemicolons(argument, offsets, source);
    }
  }
}

/** Scans every structured expression inside one ESTree field. */
function collectStructuredValues(
  value: unknown,
  offsets: Set<number>,
  source: string
): void {
  for (const child of Array.isArray(value) ? value : [value]) {
    const childNode = asEstreeNode(child);
    if (childNode) {
      collectStructuredExpressionSemicolons(childNode, offsets, source);
    }
  }
}

/** Scans one JSX element without treating code or math as prose. */
function collectJsxElementSemicolons(
  node: JsxElementNode,
  offsets: Set<number>,
  source: string
): void {
  const componentName = jsxComponentName(node);
  if (isCodeComponentName(componentName)) {
    return;
  }
  for (const attribute of node.openingElement.attributes) {
    collectAttributeSemicolons(attribute, offsets, source);
  }
  if (!MATH_COMPONENT_NAMES.has(componentName ?? "")) {
    collectStructuredValues(node.children, offsets, source);
  }
}

/** Scans the visible value of one statically named object property. */
function collectPropertySemicolons(
  node: PropertyNode,
  offsets: Set<number>,
  source: string
): void {
  const name = staticFieldName(asEstreeNode(node.key));
  if (name !== undefined && isNonProseFieldName(name)) {
    return;
  }
  if (name === "math") {
    collectStaticStringSemicolons(node.value, offsets, source, {
      allowLatexSpacing: true,
    });
    return;
  }
  collectStructuredExpressionSemicolons(node.value, offsets, source);
}

/** Scans only the rendered result of a callback, never its implementation. */
function collectFunctionSemicolons(
  node: FunctionExpressionNode,
  offsets: Set<number>,
  source: string
): void {
  if (isBlockStatementNode(node.body)) {
    collectReturnedExpressionSemicolons(node.body, offsets, source);
  } else {
    collectStructuredExpressionSemicolons(node.body, offsets, source);
  }
}

/** Scans rendered values while excluding executable and configuration data. */
export function collectStructuredExpressionSemicolons(
  node: EstreeNode,
  offsets: Set<number>,
  source: string
): void {
  if (
    (node.type === "Literal" && typeof node.value === "string") ||
    node.type === "JSXText" ||
    node.type === "TemplateElement"
  ) {
    addSemicolonsInRange(offsets, source, estreeRange(node));
    return;
  }
  if (isJsxElementNode(node)) {
    collectJsxElementSemicolons(node, offsets, source);
    return;
  }
  if (isPropertyNode(node)) {
    collectPropertySemicolons(node, offsets, source);
    return;
  }
  if (isFunctionExpressionNode(node)) {
    collectFunctionSemicolons(node, offsets, source);
    return;
  }
  for (const key of RENDERED_KEYS_BY_TYPE[node.type] ?? []) {
    collectStructuredValues(node[key], offsets, source);
  }
}
