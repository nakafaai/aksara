import type {
  Expression,
  JSXAttribute,
  JSXElement,
  JSXEmptyExpression,
  JSXFragment,
} from "estree-jsx";
import type { MdxJsxAttribute } from "mdast-util-mdx";
import { readNodeProgram } from "#compiler/ast/program";

/** Reads the sole expression attached to one MDX JSX attribute. */
export function attributeExpression(attribute: MdxJsxAttribute) {
  const { value } = attribute;
  if (!(value && typeof value === "object")) {
    return;
  }
  const program = readNodeProgram(value);
  const [statement] = program?.body ?? [];
  return program?.body.length === 1 && statement?.type === "ExpressionStatement"
    ? statement.expression
    : undefined;
}

/** Checks whether one unknown value is a non-empty static string. */
function isMeaningfulString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/** Static visibility result for one authored rich metadata value. */
export type RichAttributeState = "dynamic" | "empty" | "meaningful";

/** Combines child visibility without treating unknown runtime output as empty. */
function combineStates(
  states: readonly RichAttributeState[]
): RichAttributeState {
  if (states.includes("dynamic")) {
    return "dynamic";
  }
  return states.includes("meaningful") ? "meaningful" : "empty";
}

/** Reads the simple JSX name used by one authored component. */
function jsxName(element: JSXElement) {
  const { name } = element.openingElement;
  return name.type === "JSXIdentifier" ? name.name : undefined;
}

/** Inspects one statically authored string or numeric literal. */
function inspectLiteral(value: unknown): RichAttributeState {
  if (typeof value === "string") {
    return isMeaningfulString(value) ? "meaningful" : "empty";
  }
  if (typeof value === "number" || typeof value === "bigint") {
    return "meaningful";
  }
  if (value === null || typeof value === "boolean") {
    return "empty";
  }
  return "dynamic";
}

/** Inspects a value that must satisfy the math renderer's string contract. */
function inspectString(value: unknown): RichAttributeState {
  if (typeof value !== "string") {
    return "dynamic";
  }
  return isMeaningfulString(value) ? "meaningful" : "empty";
}

/** Inspects a template literal only when every segment is static. */
function inspectTemplate(
  expression: Extract<Expression, { type: "TemplateLiteral" }>
): RichAttributeState {
  if (expression.expressions.length > 0) {
    return "dynamic";
  }
  let rendered = "";
  for (const { value: quasi } of expression.quasis) {
    /* istanbul ignore if -- Acorn rejects invalid escapes in untagged MDX templates. */
    if (quasi.cooked === null) {
      return "dynamic";
    }
    rendered += quasi.cooked;
  }
  return isMeaningfulString(rendered) ? "meaningful" : "empty";
}

/** Inspects an expression that must resolve to one static string. */
function inspectStringExpression(
  expression: Expression | JSXEmptyExpression
): RichAttributeState {
  if ("value" in expression) {
    return inspectString(expression.value);
  }
  if ("quasis" in expression) {
    return inspectTemplate(expression);
  }
  return expression.type === "JSXEmptyExpression" ? "empty" : "dynamic";
}

/** Inspects the string value of one math prop. */
function inspectMathAttribute(attribute: JSXAttribute): RichAttributeState {
  const { value } = attribute;
  if (!value) {
    return "empty";
  }
  if (value.type === "Literal") {
    return inspectString(value.value);
  }
  if (value.type === "JSXExpressionContainer") {
    return inspectStringExpression(value.expression);
  }
  return "dynamic";
}

/** Inspects the renderer's alternative static string-child contract. */
function inspectMathChild(
  child: JSXElement["children"][number]
): RichAttributeState {
  if (child.type === "JSXText") {
    return inspectString(child.value);
  }
  if (child.type === "JSXExpressionContainer") {
    return inspectStringExpression(child.expression);
  }
  return "dynamic";
}

/** Inspects whether a math component contains statically renderable math. */
function inspectMath(element: JSXElement): RichAttributeState | undefined {
  if (
    !(jsxName(element) === "InlineMath" || jsxName(element) === "BlockMath")
  ) {
    return;
  }
  const { attributes } = element.openingElement;
  if (attributes.some(({ type }) => type === "JSXSpreadAttribute")) {
    return "dynamic";
  }
  const sources = attributes.filter(
    (attribute): attribute is JSXAttribute =>
      attribute.type === "JSXAttribute" &&
      attribute.name.type === "JSXIdentifier" &&
      (attribute.name.name === "math" || attribute.name.name === "children")
  );
  if (sources.length > 1) {
    return "dynamic";
  }
  const [source] = sources;
  if (source) {
    return element.children.length === 0
      ? inspectMathAttribute(source)
      : "dynamic";
  }
  const [child, ...additionalChildren] = element.children;
  if (!child) {
    return "empty";
  }
  return additionalChildren.length === 0 ? inspectMathChild(child) : "dynamic";
}

/** Inspects whether one rich JSX child contributes visible content. */
function inspectChild(
  child: JSXElement["children"][number] | JSXFragment["children"][number]
): RichAttributeState {
  switch (child.type) {
    case "JSXText":
      return isMeaningfulString(child.value) ? "meaningful" : "empty";
    case "JSXExpressionContainer":
      return inspectExpression(child.expression);
    case "JSXElement":
      return inspectElement(child);
    case "JSXFragment":
      return combineStates(child.children.map(inspectChild));
    /* istanbul ignore next -- the MDX parser rejects JSX spread children. */
    default:
      return "dynamic";
  }
}

/** Inspects whether one JSX element contributes text or static math. */
function inspectElement(element: JSXElement): RichAttributeState {
  const math = inspectMath(element);
  if (math) {
    return math;
  }
  const name = jsxName(element);
  if (!(name && name === name.toLowerCase())) {
    return "dynamic";
  }
  return combineStates(element.children.map(inspectChild));
}

/** Inspects the static expression forms allowed in visible rich metadata. */
function inspectExpression(
  expression: Expression | JSXEmptyExpression
): RichAttributeState {
  if ("value" in expression) {
    return inspectLiteral(expression.value);
  }
  if ("quasis" in expression) {
    return inspectTemplate(expression);
  }
  if ("openingElement" in expression) {
    return inspectElement(expression);
  }
  if ("openingFragment" in expression) {
    return combineStates(expression.children.map(inspectChild));
  }
  return expression.type === "JSXEmptyExpression" ? "empty" : "dynamic";
}

/** Inspects authored rich metadata without evaluating authored JavaScript. */
export function inspectRichAttribute(
  attribute: MdxJsxAttribute
): RichAttributeState {
  if (typeof attribute.value === "string") {
    return isMeaningfulString(attribute.value) ? "meaningful" : "empty";
  }
  if (attribute.value === null) {
    return "empty";
  }
  const expression = attributeExpression(attribute);
  /* istanbul ignore next -- the MDX parser rejects empty attribute expressions. */
  return expression ? inspectExpression(expression) : "dynamic";
}
