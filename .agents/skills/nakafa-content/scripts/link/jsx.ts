import assert from "node:assert/strict";

import {
  isDestinationAttribute,
  isSrcSetAttribute,
} from "#nakafa-content/link/destination";
import {
  expressionExternalOffset,
  isProtectedExampleAttribute,
  stringExternalOffset,
} from "#nakafa-content/link/nested";
import {
  asEstreeNode,
  type EstreeNode,
  type MdxAttribute,
  type MdxNode,
} from "#nakafa-content/mdx/parse";
import { isFullyStaticStringExpression } from "#nakafa-content/mdx/static";
import { isFullyStaticValueExpression } from "#nakafa-content/mdx/value";

/** Returns the expression program stored in one MDX JSX attribute. */
function attributeExpression(attribute: MdxAttribute): EstreeNode | undefined {
  if (attribute.data?.estree) {
    return asEstreeNode(attribute.data.estree);
  }
  const { value } = attribute;
  if (value === null || value === undefined || typeof value === "string") {
    return;
  }
  assert.ok(typeof value === "object");
  assert.ok("data" in value);
  const { data } = value;
  assert.ok(data && typeof data === "object");
  assert.ok("estree" in data);
  return asEstreeNode(data.estree);
}

/** Finds one authored offset for an external or unverifiable JSX destination. */
function invalidDestinationOffset(
  attribute: MdxAttribute,
  source: string,
  componentName: string | undefined
): number | undefined {
  const attributeStart = attribute.position?.start?.offset;
  const attributeEnd = attribute.position?.end?.offset;
  assert.ok(attributeStart !== undefined);
  assert.ok(attributeEnd !== undefined);
  const expression = attributeExpression(attribute);
  if (attribute.name === undefined) {
    assert.ok(expression);
    return (
      expressionExternalOffset(expression, source, false, componentName) ??
      (isFullyStaticValueExpression(expression) ? undefined : attributeStart)
    );
  }
  if (isProtectedExampleAttribute(componentName, attribute.name)) {
    return;
  }
  const destinationAttribute = isDestinationAttribute(
    attribute.name,
    componentName
  );
  const srcSetAttribute = isSrcSetAttribute(attribute.name, componentName);
  if (expression) {
    const externalOffset = expressionExternalOffset(
      expression,
      source,
      destinationAttribute,
      componentName,
      srcSetAttribute
    );
    if (externalOffset !== undefined) {
      return externalOffset;
    }
    if (!isFullyStaticStringExpression(expression)) {
      return destinationAttribute ? attributeStart : undefined;
    }
    return;
  }
  if (typeof attribute.value === "string") {
    return stringExternalOffset(
      attribute.value,
      source,
      destinationAttribute,
      attributeStart,
      attributeEnd,
      srcSetAttribute
    );
  }
  return destinationAttribute ? attributeStart : undefined;
}

/** Finds external or unverifiable destinations on one MDX JSX element. */
export function jsxDestinationOffsets(node: MdxNode, source: string): number[] {
  if (node.type !== "mdxJsxFlowElement" && node.type !== "mdxJsxTextElement") {
    return [];
  }
  assert.ok(node.attributes);
  return node.attributes.flatMap((attribute) => {
    const offset = invalidDestinationOffset(attribute, source, node.name);
    return offset === undefined ? [] : [offset];
  });
}
