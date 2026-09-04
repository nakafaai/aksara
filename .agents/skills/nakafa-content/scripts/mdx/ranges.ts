import assert from "node:assert/strict";

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
import {
  directAttributeRange,
  renderedSourceRange,
} from "#nakafa-content/mdx/rendered";

const RENDERED_KEYS_BY_TYPE: Readonly<Record<string, readonly string[]>> = {
  ArrayExpression: ["elements"],
  BinaryExpression: ["left", "right"],
  ConditionalExpression: ["consequent", "alternate"],
  ExpressionStatement: ["expression"],
  JSXExpressionContainer: ["expression"],
  JSXFragment: ["children"],
  JSXSpreadAttribute: ["argument"],
  LogicalExpression: ["left", "right"],
  ObjectExpression: ["properties"],
  ParenthesizedExpression: ["expression"],
  Program: ["body"],
  Property: ["value"],
  SpreadElement: ["argument"],
  TemplateLiteral: ["quasis", "expressions"],
};

/** Reads one statically authored JSX component name. */
function jsxComponentName(node: EstreeNode): string | undefined {
  const openingElement = asEstreeNode(node.openingElement);
  assert.ok(openingElement);
  return staticFieldName(asEstreeNode(openingElement.name));
}

/** Removes source quote delimiters from one static string range. */
function renderedStringRange(node: EstreeNode, source: string): SourceRange {
  const range = estreeRange(node);
  return node.type === "Literal" && typeof node.value === "string"
    ? renderedSourceRange(range, node.value, source, true)
    : range;
}

/** Traverses learner-copy attributes owned by one nested JSX element. */
function collectNestedAttributeRanges(
  node: EstreeNode,
  ranges: SourceRange[],
  source: string
): void {
  const opening = asEstreeNode(node.openingElement);
  assert.ok(opening);
  assert.ok(Array.isArray(opening.attributes));
  for (const value of opening.attributes) {
    const attribute = asEstreeNode(value);
    assert.ok(attribute);
    if (attribute.type === "JSXSpreadAttribute") {
      collectExpressionValues(
        attribute.argument,
        ranges,
        source,
        includeSpreadAddressField
      );
      continue;
    }
    assert.equal(attribute.type, "JSXAttribute");
    const attributeName = staticFieldName(asEstreeNode(attribute.name));
    assert.ok(attributeName);
    if (isAddressTextAttribute(attributeName)) {
      collectExpressionValues(attribute.value, ranges, source, () => true);
    }
  }
}

/** Traverses selected ESTree fields that can statically render text. */
function collectExpressionRanges(
  node: EstreeNode,
  ranges: SourceRange[],
  source: string,
  include: (
    fieldName: string | undefined,
    rootFieldName: string | undefined
  ) => boolean,
  fieldName?: string,
  rootFieldName?: string
): void {
  if (
    (node.type === "Literal" && typeof node.value === "string") ||
    node.type === "JSXText" ||
    node.type === "TemplateElement"
  ) {
    const range = renderedStringRange(node, source);
    if (include(fieldName, rootFieldName)) {
      ranges.push(range);
    }
    return;
  }
  if (node.type === "JSXElement") {
    if (isProtectedProseComponent(jsxComponentName(node))) {
      return;
    }
    collectNestedAttributeRanges(node, ranges, source);
    collectExpressionValues(
      node.children,
      ranges,
      source,
      include,
      fieldName,
      rootFieldName
    );
    return;
  }
  if (node.type === "Property") {
    const propertyName = staticFieldName(asEstreeNode(node.key));
    collectExpressionValues(
      node.value,
      ranges,
      source,
      include,
      propertyName,
      rootFieldName ?? propertyName
    );
    return;
  }
  if (node.type === "SequenceExpression") {
    assert.ok(Array.isArray(node.expressions));
    collectExpressionValues(
      node.expressions.at(-1),
      ranges,
      source,
      include,
      fieldName,
      rootFieldName
    );
    return;
  }
  for (const key of RENDERED_KEYS_BY_TYPE[node.type] ?? []) {
    collectExpressionValues(
      node[key],
      ranges,
      source,
      include,
      fieldName,
      rootFieldName
    );
  }
}

/** Applies the expression visitor to one or more ESTree values. */
function collectExpressionValues(
  value: unknown,
  ranges: SourceRange[],
  source: string,
  include: (
    fieldName: string | undefined,
    rootFieldName: string | undefined
  ) => boolean,
  fieldName?: string,
  rootFieldName?: string
): void {
  for (const child of Array.isArray(value) ? value : [value]) {
    const childNode = asEstreeNode(child);
    if (childNode) {
      collectExpressionRanges(
        childNode,
        ranges,
        source,
        include,
        fieldName,
        rootFieldName
      );
    }
  }
}

/** Selects learner copy from one top-level JSX spread property. */
function includeSpreadAddressField(
  fieldName: string | undefined,
  rootFieldName: string | undefined
): boolean {
  if (!rootFieldName) {
    return false;
  }
  if (isAddressTextAttribute(rootFieldName)) {
    return true;
  }
  return (
    isNestedAddressAttribute(rootFieldName) &&
    isNestedAddressField(rootFieldName, fieldName)
  );
}

/** Reads one expression-backed MDX attribute program. */
function attributeEstree(attribute: MdxAttribute): EstreeNode | undefined {
  if (attribute.data?.estree) {
    return attribute.data.estree;
  }
  const { value } = attribute;
  if (value === null || value === undefined) {
    return;
  }
  assert.ok(typeof value === "object");
  assert.ok("data" in value);
  const { data } = value;
  assert.ok(data && typeof data === "object");
  assert.ok("estree" in data);
  return asEstreeNode(data.estree);
}

/** Returns current general-purpose learner-copy ranges for one attribute. */
export function generalAttributeRanges(
  attribute: MdxAttribute,
  source: string
): SourceRange[] {
  if (!attribute.name) {
    const ranges: SourceRange[] = [];
    const estree = attributeEstree(attribute);
    assert.ok(estree);
    collectExpressionRanges(
      estree,
      ranges,
      source,
      (_fieldName, rootFieldName) =>
        Boolean(rootFieldName && isGeneralTextAttribute(rootFieldName))
    );
    return ranges;
  }
  if (!isGeneralTextAttribute(attribute.name)) {
    return [];
  }
  const directRange = directAttributeRange(attribute, source);
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
    const ranges: SourceRange[] = [];
    const estree = attributeEstree(attribute);
    assert.ok(estree);
    collectExpressionRanges(estree, ranges, source, includeSpreadAddressField);
    return ranges;
  }
  const attributeName = attribute.name;
  if (isAddressTextAttribute(attributeName)) {
    const directRange = directAttributeRange(attribute, source);
    if (directRange) {
      return [directRange];
    }
    const estree = attributeEstree(attribute);
    return estree ? staticExpressionRanges(estree, source) : [];
  }
  if (!isNestedAddressAttribute(attributeName)) {
    return [];
  }
  const estree = attributeEstree(attribute);
  const ranges: SourceRange[] = [];
  if (estree) {
    collectExpressionRanges(estree, ranges, source, (fieldName) =>
      isNestedAddressField(attributeName, fieldName)
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
