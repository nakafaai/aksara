import {
  isAddressTextAttribute,
  isGeneralTextAttribute,
  isNestedAddressAttribute,
  isNestedAddressField,
  isProtectedProseComponent,
} from "#nakafa-content/mdx/fields";
import {
  asEstreeNode,
  type EstreeNode,
  estreeRange,
  type MdxAttribute,
  type MdxNode,
  type SourceRange,
  staticFieldName,
} from "#nakafa-content/mdx/parse";

const QUOTED_SOURCE_LITERAL_PATTERN = /^(?:"[\s\S]*"|'[\s\S]*')$/u;
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
  Property: ["value"],
  TemplateLiteral: ["quasis", "expressions"],
};

/** Locates one direct JSX string value inside its authored attribute. */
function directAttributeValueRange(
  attribute: MdxAttribute,
  source: string
): SourceRange | undefined {
  if (typeof attribute.value !== "string") {
    return;
  }
  const start = attribute.position?.start?.offset;
  const end = attribute.position?.end?.offset;
  if (start === undefined || end === undefined) {
    return;
  }
  const localOffset = source.slice(start, end).indexOf(attribute.value);
  return localOffset === -1
    ? undefined
    : {
        end: { offset: start + localOffset + attribute.value.length },
        start: { offset: start + localOffset },
      };
}

/** Reads one statically authored JSX component name. */
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

/** Removes source quote delimiters from one static string range. */
function renderedStringRange(
  node: EstreeNode,
  source: string
): SourceRange | undefined {
  const range = estreeRange(node);
  const start = range?.start?.offset;
  const end = range?.end?.offset;
  if (
    node.type !== "Literal" ||
    start === undefined ||
    end === undefined ||
    !QUOTED_SOURCE_LITERAL_PATTERN.test(source.slice(start, end))
  ) {
    return range;
  }
  return {
    end: { offset: end - 1 },
    start: { offset: start + 1 },
  };
}

/** Traverses selected ESTree fields that can statically render text. */
function collectExpressionRanges(
  node: EstreeNode,
  ranges: SourceRange[],
  source: string,
  include: (fieldName: string | undefined) => boolean,
  fieldName?: string
): void {
  if (
    (node.type === "Literal" && typeof node.value === "string") ||
    node.type === "JSXText" ||
    node.type === "TemplateElement"
  ) {
    const range = renderedStringRange(node, source);
    if (range && include(fieldName)) {
      ranges.push(range);
    }
    return;
  }
  if (node.type === "JSXElement") {
    if (isProtectedProseComponent(jsxComponentName(node))) {
      return;
    }
    collectExpressionValues(node.children, ranges, source, include, fieldName);
    return;
  }
  if (node.type === "Property") {
    const propertyName = staticFieldName(asEstreeNode(node.key));
    collectExpressionValues(
      node.value,
      ranges,
      source,
      include,
      propertyName ?? fieldName
    );
    return;
  }
  for (const key of RENDERED_KEYS_BY_TYPE[node.type] ?? []) {
    collectExpressionValues(node[key], ranges, source, include, fieldName);
  }
}

/** Applies the expression visitor to one or more ESTree values. */
function collectExpressionValues(
  value: unknown,
  ranges: SourceRange[],
  source: string,
  include: (fieldName: string | undefined) => boolean,
  fieldName?: string
): void {
  for (const child of Array.isArray(value) ? value : [value]) {
    const childNode = asEstreeNode(child);
    if (childNode) {
      collectExpressionRanges(childNode, ranges, source, include, fieldName);
    }
  }
}

/** Reads one expression-backed MDX attribute program. */
function attributeEstree(attribute: MdxAttribute): EstreeNode | undefined {
  if (
    !attribute.value ||
    typeof attribute.value !== "object" ||
    !("data" in attribute.value) ||
    !attribute.value.data ||
    typeof attribute.value.data !== "object" ||
    !("estree" in attribute.value.data)
  ) {
    return;
  }
  return asEstreeNode(attribute.value.data.estree);
}

/** Returns current general-purpose learner-copy ranges for one attribute. */
export function generalAttributeRanges(
  attribute: MdxAttribute,
  source: string
): SourceRange[] {
  if (!(attribute.name && isGeneralTextAttribute(attribute.name))) {
    return [];
  }
  const directRange = directAttributeValueRange(attribute, source);
  if (directRange) {
    return [directRange];
  }
  const estree = attributeEstree(attribute);
  const ranges: SourceRange[] = [];
  if (estree) {
    collectExpressionRanges(estree, ranges, source, () => true);
  }
  return ranges;
}

/** Returns every statically authored JSX range covered by address policy. */
export function addressAttributeRanges(
  attribute: MdxAttribute,
  source: string
): SourceRange[] {
  if (!attribute.name) {
    return [];
  }
  if (isAddressTextAttribute(attribute.name)) {
    const directRange = directAttributeValueRange(attribute, source);
    if (directRange) {
      return [directRange];
    }
    const estree = attributeEstree(attribute);
    return estree ? staticExpressionRanges(estree, source) : [];
  }
  if (!isNestedAddressAttribute(attribute.name)) {
    return [];
  }
  const estree = attributeEstree(attribute);
  const ranges: SourceRange[] = [];
  if (estree) {
    collectExpressionRanges(estree, ranges, source, (fieldName) =>
      isNestedAddressField(attribute.name ?? "", fieldName)
    );
  }
  return ranges;
}

/** Returns every static rendered string range below one ESTree expression. */
export function staticExpressionRanges(
  node: EstreeNode,
  source: string
): SourceRange[] {
  const ranges: SourceRange[] = [];
  collectExpressionRanges(node, ranges, source, () => true);
  return ranges;
}

/** Returns static text ranges rendered by a standalone MDX expression. */
export function renderedExpressionRanges(
  node: MdxNode,
  source: string
): SourceRange[] {
  if (
    (node.type !== "mdxFlowExpression" && node.type !== "mdxTextExpression") ||
    !node.data?.estree
  ) {
    return [];
  }
  return staticExpressionRanges(node.data.estree, source);
}

/** Locates accessible alt copy while leaving a Markdown image URL protected. */
export function imageAltRange(
  node: MdxNode,
  source: string
): SourceRange | undefined {
  if (node.type !== "image" && node.type !== "imageReference") {
    return;
  }
  const start = node.position?.start?.offset;
  const end = node.position?.end?.offset;
  if (start === undefined || end === undefined) {
    return;
  }
  const authored = source.slice(start, end);
  const markerOffset = authored.indexOf("![");
  if (markerOffset === -1) {
    return;
  }
  const altStart = markerOffset + 2;
  let depth = 1;
  for (let index = altStart; index < authored.length; index += 1) {
    if (authored[index] === "\\") {
      index += 1;
      continue;
    }
    if (authored[index] === "[") {
      depth += 1;
      continue;
    }
    if (authored[index] !== "]") {
      continue;
    }
    depth -= 1;
    if (depth === 0) {
      return {
        end: { offset: start + index },
        start: { offset: start + altStart },
      };
    }
  }
}
