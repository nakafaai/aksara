import {
  addSemicolonsInRange,
  type SemicolonScanOptions,
} from "#nakafa-content/semicolon/source";
import {
  asEstreeNode,
  type EstreeNode,
  estreeRange,
  staticFieldName,
} from "#nakafa-content/voice-mdx";

const CODE_COMPONENT_NAMES = new Set(["CodeBlock"]);
const MATH_COMPONENT_NAMES = new Set(["BlockMath", "InlineMath"]);
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
  JSXExpressionContainer: ["expression"],
  JSXFragment: ["children"],
  LogicalExpression: ["left", "right"],
  ObjectExpression: ["properties"],
  ParenthesizedExpression: ["expression"],
  TemplateLiteral: ["quasis", "expressions"],
};

/** Identifies a component whose entire rendered region contains authored code. */
export function isCodeComponentName(name: string | undefined): boolean {
  return CODE_COMPONENT_NAMES.has(name ?? "");
}

/** Tells the MDX adapter whether an attribute stores non-prose configuration. */
export function isNonProseFieldName(name: string | undefined): boolean {
  return name === undefined || NON_PROSE_FIELD_NAMES.has(name);
}

/** Reads the unqualified name of one JSX component when statically known. */
function jsxComponentName(node: EstreeNode): string | undefined {
  if (node.type !== "JSXElement") {
    return;
  }
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
  if (node.type === "Literal" && typeof node.value === "string") {
    addSemicolonsInRange(offsets, source, estreeRange(node), options);
    return;
  }
  if (node.type !== "TemplateLiteral" || !Array.isArray(node.quasis)) {
    return;
  }
  for (const quasi of node.quasis) {
    const quasiNode = asEstreeNode(quasi);
    if (quasiNode) {
      addSemicolonsInRange(offsets, source, estreeRange(quasiNode), options);
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
  if (value?.type !== "JSXExpressionContainer") {
    return;
  }
  const expression = asEstreeNode(value.expression);
  if (!expression) {
    return;
  }
  if (name === "math") {
    collectStaticStringSemicolons(expression, offsets, source, options);
  } else {
    collectStructuredExpressionSemicolons(expression, offsets, source);
  }
}

/** Scans only values returned from a block-bodied render callback. */
function collectReturnedExpressionSemicolons(
  block: EstreeNode,
  offsets: Set<number>,
  source: string
): void {
  if (block.type !== "BlockStatement" || !Array.isArray(block.body)) {
    return;
  }
  for (const statement of block.body) {
    const statementNode = asEstreeNode(statement);
    if (statementNode?.type !== "ReturnStatement") {
      continue;
    }
    const argument = asEstreeNode(statementNode.argument);
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
  node: EstreeNode,
  offsets: Set<number>,
  source: string
): void {
  const componentName = jsxComponentName(node);
  if (isCodeComponentName(componentName)) {
    return;
  }
  const openingElement = asEstreeNode(node.openingElement);
  if (Array.isArray(openingElement?.attributes)) {
    for (const attribute of openingElement.attributes) {
      const attributeNode = asEstreeNode(attribute);
      if (attributeNode) {
        collectAttributeSemicolons(attributeNode, offsets, source);
      }
    }
  }
  if (!MATH_COMPONENT_NAMES.has(componentName ?? "")) {
    collectStructuredValues(node.children, offsets, source);
  }
}

/** Scans the visible value of one statically named object property. */
function collectPropertySemicolons(
  node: EstreeNode,
  offsets: Set<number>,
  source: string
): void {
  const name = staticFieldName(asEstreeNode(node.key));
  if (name !== undefined && isNonProseFieldName(name)) {
    return;
  }
  const value = asEstreeNode(node.value);
  if (!value) {
    return;
  }
  if (name === "math") {
    collectStaticStringSemicolons(value, offsets, source, {
      allowLatexSpacing: true,
    });
    return;
  }
  collectStructuredExpressionSemicolons(value, offsets, source);
}

/** Scans only the rendered result of a callback, never its implementation. */
function collectFunctionSemicolons(
  node: EstreeNode,
  offsets: Set<number>,
  source: string
): void {
  const body = asEstreeNode(node.body);
  if (body?.type === "BlockStatement") {
    collectReturnedExpressionSemicolons(body, offsets, source);
  } else if (body) {
    collectStructuredExpressionSemicolons(body, offsets, source);
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
  if (node.type === "JSXElement") {
    collectJsxElementSemicolons(node, offsets, source);
    return;
  }
  if (node.type === "Property") {
    collectPropertySemicolons(node, offsets, source);
    return;
  }
  if (
    node.type === "ArrowFunctionExpression" ||
    node.type === "FunctionExpression"
  ) {
    collectFunctionSemicolons(node, offsets, source);
    return;
  }
  for (const key of RENDERED_KEYS_BY_TYPE[node.type] ?? []) {
    collectStructuredValues(node[key], offsets, source);
  }
}
