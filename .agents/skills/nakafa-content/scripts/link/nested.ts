import assert from "node:assert/strict";

import {
  externalMatch,
  isDestinationAttribute,
} from "#nakafa-content/link/destination";
import { sourceOffsetForStaticMatch } from "#nakafa-content/mdx/offset";
import {
  asEstreeNode,
  type EstreeNode,
  staticFieldName,
} from "#nakafa-content/mdx/parse";
import {
  isFullyStaticStringExpression,
  nestedStaticStringCandidates,
} from "#nakafa-content/mdx/static";
import { isFullyStaticValueExpression } from "#nakafa-content/mdx/value";

/** Keeps authored code and math examples out of learner-link policy. */
export function isProtectedExampleAttribute(
  componentName: string | undefined,
  attributeName: string | undefined
): boolean {
  return (
    componentName === "CodeBlock" ||
    ((componentName === "BlockMath" || componentName === "InlineMath") &&
      attributeName === "math")
  );
}

/** Locates an external string inside one JSX expression tree. */
export function expressionExternalOffset(
  expression: EstreeNode,
  source: string,
  destinationAttribute: boolean,
  componentName?: string
): number | undefined {
  const offsets = destinationPropertyExternalOffsets(
    expression,
    source,
    componentName
  );
  for (const candidate of nestedStaticStringCandidates(expression)) {
    const match = externalMatch(candidate.text, destinationAttribute);
    if (!match) {
      continue;
    }
    const offset = sourceOffsetForStaticMatch(
      candidate,
      match.index,
      match.value,
      source
    );
    assert.ok(offset !== undefined);
    offsets.push(offset);
  }
  const nestedJsxOffset = nestedJsxExternalOffset(expression, source);
  if (nestedJsxOffset !== undefined) {
    offsets.push(nestedJsxOffset);
  }
  return offsets.length > 0 ? Math.min(...offsets) : undefined;
}

/** Locates destinations stored under static keys inside JSX spread objects. */
function destinationPropertyExternalOffsets(
  node: EstreeNode,
  source: string,
  componentName?: string
): number[] {
  const offsets: number[] = [];
  if (node.type === "Property") {
    const name = staticFieldName(asEstreeNode(node.key));
    const value = asEstreeNode(node.value);
    assert.ok(value);
    if (isDestinationAttribute(name, componentName)) {
      for (const candidate of nestedStaticStringCandidates(value)) {
        const match = externalMatch(candidate.text, true);
        if (!match) {
          continue;
        }
        const offset = sourceOffsetForStaticMatch(
          candidate,
          match.index,
          match.value,
          source
        );
        assert.ok(offset !== undefined);
        offsets.push(offset);
      }
    }
  }
  for (const child of estreeChildren(node)) {
    offsets.push(
      ...destinationPropertyExternalOffsets(child, source, componentName)
    );
  }
  return offsets;
}

/** Locates an external destination inside one string-valued JSX attribute. */
export function stringExternalOffset(
  value: string,
  source: string,
  destinationAttribute: boolean,
  start: number,
  end: number
): number | undefined {
  const match = externalMatch(value, destinationAttribute);
  if (!match) {
    return;
  }
  const localOffset = source.slice(start, end).indexOf(match.value);
  return localOffset === -1 ? start : start + localOffset;
}

/** Returns every ESTree child without interpreting identifiers as content. */
function estreeChildren(node: EstreeNode): EstreeNode[] {
  return Object.values(node).flatMap((value) => {
    if (Array.isArray(value)) {
      return value.flatMap((item) => {
        const child = asEstreeNode(item);
        return child ? [child] : [];
      });
    }
    const child = asEstreeNode(value);
    return child ? [child] : [];
  });
}

/** Locates one external destination in a nested JSX attribute. */
function nestedJsxAttributeOffset(
  attribute: EstreeNode,
  source: string,
  componentName: string | undefined
): number | undefined {
  const { start } = attribute;
  assert.ok(start !== undefined);
  if (attribute.type === "JSXSpreadAttribute") {
    const argument = asEstreeNode(attribute.argument);
    assert.ok(argument);
    return (
      expressionExternalOffset(argument, source, false, componentName) ??
      (isFullyStaticValueExpression(argument) ? undefined : start)
    );
  }
  assert.equal(attribute.type, "JSXAttribute");
  const attributeName = staticFieldName(asEstreeNode(attribute.name));
  assert.ok(attributeName);
  if (isProtectedExampleAttribute(componentName, attributeName)) {
    return;
  }
  const destinationAttribute = isDestinationAttribute(
    attributeName,
    componentName
  );
  const value = asEstreeNode(attribute.value);
  if (!value) {
    return destinationAttribute ? start : undefined;
  }
  if (value.type === "Literal" && typeof value.value === "string") {
    assert.ok(value.start !== undefined);
    assert.ok(value.end !== undefined);
    return stringExternalOffset(
      value.value,
      source,
      destinationAttribute,
      value.start,
      value.end
    );
  }
  assert.equal(value.type, "JSXExpressionContainer");
  const expression = asEstreeNode(value.expression);
  assert.ok(expression);
  const externalOffset = expressionExternalOffset(
    expression,
    source,
    destinationAttribute,
    componentName
  );
  if (externalOffset !== undefined) {
    return externalOffset;
  }
  return destinationAttribute && !isFullyStaticStringExpression(expression)
    ? start
    : undefined;
}

/** Locates the first external destination in one ESTree collection. */
function firstNestedJsxExternalOffset(
  values: readonly unknown[],
  source: string
): number | undefined {
  for (const value of values) {
    const node = asEstreeNode(value);
    assert.ok(node);
    const offset = nestedJsxExternalOffset(node, source);
    if (offset !== undefined) {
      return offset;
    }
  }
}

/** Locates one external destination among nested JSX attributes. */
function nestedJsxAttributesExternalOffset(
  openingElement: EstreeNode,
  source: string,
  componentName: string | undefined
): number | undefined {
  assert.ok(Array.isArray(openingElement.attributes));
  for (const value of openingElement.attributes) {
    const attribute = asEstreeNode(value);
    assert.ok(attribute);
    const offset = nestedJsxAttributeOffset(attribute, source, componentName);
    if (offset !== undefined) {
      return offset;
    }
  }
}

/** Locates one external destination in a nested JSX element tree. */
function nestedJsxExternalOffset(
  node: EstreeNode,
  source: string
): number | undefined {
  if (node.type !== "JSXElement") {
    return firstNestedJsxExternalOffset(estreeChildren(node), source);
  }
  const openingElement = asEstreeNode(node.openingElement);
  assert.ok(openingElement);
  const componentName = staticFieldName(asEstreeNode(openingElement.name));
  if (componentName === "CodeBlock") {
    return;
  }
  assert.ok(Array.isArray(node.children));
  return (
    nestedJsxAttributesExternalOffset(openingElement, source, componentName) ??
    firstNestedJsxExternalOffset(node.children, source)
  );
}
