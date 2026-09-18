import assert from "node:assert/strict";
import { Predicate } from "effect";

import {
  isAddressTextAttribute,
  isGeneralTextAttribute,
  isNestedAddressAttribute,
  isNestedAddressField,
  isProtectedProseComponent,
} from "#nakafa-content/mdx/fields";
import { RENDERED_COPY_KEYS } from "#nakafa-content/mdx/keys";
import { renderedStaticStringRange } from "#nakafa-content/mdx/offset";
import {
  asEstreeNode,
  attributeEstree,
  type EstreeNode,
  estreeChildren,
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

import {
  isFullyStaticStringExpression,
  staticStringCandidates,
} from "#nakafa-content/mdx/static";

const STATIC_TEXT_NODE_TYPES = new Set([
  "BinaryExpression",
  "Literal",
  "TemplateElement",
  "TemplateLiteral",
]);

/** Reads one statically authored JSX component name. */
function jsxComponentName(node: EstreeNode): string | undefined {
  const openingElement = asEstreeNode(node.openingElement);
  assert.ok(openingElement);
  return staticFieldName(asEstreeNode(openingElement.name));
}

/** Removes source quote delimiters from one static string range. */
function renderedStringRange(node: EstreeNode, source: string): SourceRange {
  const range = estreeRange(node);
  assert.ok(node.type === "Literal" && Predicate.isString(node.value));
  return renderedSourceRange(range, node.value, source, true);
}

/** Traverses learner-copy attributes owned by one nested JSX element. */
function collectNestedAttributeRanges(
  node: EstreeNode,
  source: string
): SourceRange[] {
  const opening = asEstreeNode(node.openingElement);
  assert.ok(opening);
  assert.ok(Array.isArray(opening.attributes));
  return opening.attributes.flatMap((value) => {
    const attribute = asEstreeNode(value);
    assert.ok(attribute);
    if (attribute.type === "JSXSpreadAttribute") {
      return collectExpressionValues(
        attribute.argument,
        source,
        includeSpreadAddressField
      );
    }
    assert.equal(attribute.type, "JSXAttribute");
    const attributeName = staticFieldName(asEstreeNode(attribute.name));
    assert.ok(attributeName);
    if (!isAddressTextAttribute(attributeName)) {
      return [];
    }
    const attributeValue = asEstreeNode(attribute.value);
    if (
      attributeValue?.type === "Literal" &&
      Predicate.isString(attributeValue.value)
    ) {
      return [renderedStringRange(attributeValue, source)];
    }
    return collectExpressionValues(attribute.value, source, () => true);
  });
}

/** Traverses selected ESTree fields that can statically render text. */
function collectExpressionRanges(
  node: EstreeNode,
  source: string,
  include: (
    fieldName: string | undefined,
    rootFieldName: string | undefined
  ) => boolean,
  fieldName?: string,
  rootFieldName?: string
): SourceRange[] {
  if (
    STATIC_TEXT_NODE_TYPES.has(node.type) &&
    isFullyStaticStringExpression(node)
  ) {
    if (!include(fieldName, rootFieldName)) {
      return [];
    }
    return staticStringCandidates(node).map((candidate) =>
      renderedStaticStringRange(candidate, source)
    );
  }
  if (node.type === "JSXText") {
    return include(fieldName, rootFieldName) ? [estreeRange(node)] : [];
  }
  if (node.type === "JSXElement") {
    if (isProtectedProseComponent(jsxComponentName(node))) {
      return [];
    }
    return [
      ...collectNestedAttributeRanges(node, source),
      ...collectExpressionValues(
        node.children,
        source,
        include,
        fieldName,
        rootFieldName
      ),
    ];
  }
  if (node.type === "Property") {
    const propertyName = staticFieldName(asEstreeNode(node.key));
    return collectExpressionValues(
      node.value,
      source,
      include,
      propertyName,
      rootFieldName ?? propertyName
    );
  }
  if (node.type === "SequenceExpression") {
    assert.ok(Array.isArray(node.expressions));
    return collectExpressionValues(
      node.expressions.at(-1),
      source,
      include,
      fieldName,
      rootFieldName
    );
  }
  return (RENDERED_COPY_KEYS[node.type] ?? []).flatMap((key) =>
    collectExpressionValues(
      node[key],
      source,
      include,
      fieldName,
      rootFieldName
    )
  );
}

/** Applies the expression visitor to one or more ESTree values. */
function collectExpressionValues(
  value: unknown,
  source: string,
  include: (
    fieldName: string | undefined,
    rootFieldName: string | undefined
  ) => boolean,
  fieldName?: string,
  rootFieldName?: string
): SourceRange[] {
  return estreeChildren(value).flatMap((childNode) =>
    collectExpressionRanges(
      childNode,
      source,
      include,
      fieldName,
      rootFieldName
    )
  );
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

/** Returns current general-purpose learner-copy ranges for one attribute. */
export function generalAttributeRanges(
  attribute: MdxAttribute,
  source: string
): SourceRange[] {
  if (!attribute.name) {
    const estree = attributeEstree(attribute);
    assert.ok(estree);
    return collectExpressionRanges(
      estree,
      source,
      (_fieldName, rootFieldName) =>
        Boolean(rootFieldName && isGeneralTextAttribute(rootFieldName))
    );
  }
  if (!isGeneralTextAttribute(attribute.name)) {
    return [];
  }
  const directRange = directAttributeRange(attribute, source);
  if (directRange) {
    return [directRange];
  }
  const estree = attributeEstree(attribute);
  return estree ? staticExpressionRanges(estree, source) : [];
}

/** Returns every statically authored JSX range covered by address policy. */
export function addressAttributeRanges(
  attribute: MdxAttribute,
  source: string
): SourceRange[] {
  if (!attribute.name) {
    const estree = attributeEstree(attribute);
    assert.ok(estree);
    return collectExpressionRanges(estree, source, includeSpreadAddressField);
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
  return estree
    ? collectExpressionRanges(estree, source, (fieldName) =>
        isNestedAddressField(attributeName, fieldName)
      )
    : [];
}

/** Returns every static rendered string range below one ESTree expression. */
export function staticExpressionRanges(
  node: EstreeNode,
  source: string
): SourceRange[] {
  return collectExpressionRanges(node, source, () => true);
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
