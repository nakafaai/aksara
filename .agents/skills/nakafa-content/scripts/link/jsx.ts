import {
  externalMatch,
  isDestinationAttribute,
} from "#nakafa-content/link/destination";
import { sourceOffsetForStaticMatch } from "#nakafa-content/mdx/offset";
import {
  asEstreeNode,
  type EstreeNode,
  type MdxAttribute,
  type MdxNode,
  staticFieldName,
} from "#nakafa-content/mdx/parse";
import {
  isFullyStaticStringExpression,
  nestedStaticStringCandidates,
} from "#nakafa-content/mdx/static";
import { isFullyStaticValueExpression } from "#nakafa-content/mdx/value";

/** Keeps authored code and math examples out of learner-link policy. */
function isProtectedExampleAttribute(
  componentName: string | undefined,
  attributeName: string | undefined
): boolean {
  return (
    componentName === "CodeBlock" ||
    ((componentName === "BlockMath" || componentName === "InlineMath") &&
      attributeName === "math")
  );
}

/** Returns the expression program stored in one MDX JSX attribute. */
function attributeExpression(attribute: MdxAttribute): EstreeNode | undefined {
  if (attribute.data?.estree) {
    return asEstreeNode(attribute.data.estree);
  }
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

/** Locates an external string inside one JSX expression tree. */
function expressionExternalOffset(
  expression: EstreeNode,
  source: string,
  destinationAttribute: boolean,
  fallback: number | undefined
): number | undefined {
  const offsets: number[] = [];
  for (const candidate of nestedStaticStringCandidates(expression)) {
    const match = externalMatch(candidate.text, destinationAttribute);
    if (!match) {
      continue;
    }
    const offset =
      sourceOffsetForStaticMatch(candidate, match.index, match.value, source) ??
      fallback;
    if (offset !== undefined) {
      offsets.push(offset);
    }
  }
  const nestedJsxOffset = nestedJsxExternalOffset(expression, source);
  if (nestedJsxOffset !== undefined) {
    offsets.push(nestedJsxOffset);
  }
  return offsets.length > 0 ? Math.min(...offsets) : undefined;
}

/** Locates an external destination inside one string-valued JSX attribute. */
function stringExternalOffset(
  value: string,
  source: string,
  destinationAttribute: boolean,
  start: number | undefined,
  end: number | undefined
): number | undefined {
  const match = externalMatch(value, destinationAttribute);
  if (!match || start === undefined || end === undefined) {
    return match ? start : undefined;
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
  if (attribute.type === "JSXSpreadAttribute") {
    const argument = asEstreeNode(attribute.argument);
    if (!argument) {
      return attribute.start;
    }
    return (
      expressionExternalOffset(argument, source, false, attribute.start) ??
      (isFullyStaticValueExpression(argument) ? undefined : attribute.start)
    );
  }
  if (attribute.type !== "JSXAttribute") {
    return;
  }
  const attributeName = staticFieldName(asEstreeNode(attribute.name));
  if (isProtectedExampleAttribute(componentName, attributeName)) {
    return;
  }
  const destinationAttribute = isDestinationAttribute(attributeName);
  const value = asEstreeNode(attribute.value);
  if (!value) {
    return destinationAttribute ? attribute.start : undefined;
  }
  if (value.type === "Literal" && typeof value.value === "string") {
    return stringExternalOffset(
      value.value,
      source,
      destinationAttribute,
      value.start,
      value.end
    );
  }
  const expression =
    value.type === "JSXExpressionContainer"
      ? asEstreeNode(value.expression)
      : value;
  if (!expression) {
    return destinationAttribute ? attribute.start : undefined;
  }
  const externalOffset = expressionExternalOffset(
    expression,
    source,
    destinationAttribute,
    attribute.start
  );
  if (externalOffset !== undefined) {
    return externalOffset;
  }
  return destinationAttribute && !isFullyStaticStringExpression(expression)
    ? attribute.start
    : undefined;
}

/** Locates the first external destination in one ESTree collection. */
function firstNestedJsxExternalOffset(
  values: readonly unknown[],
  source: string
): number | undefined {
  for (const value of values) {
    const node = asEstreeNode(value);
    if (!node) {
      continue;
    }
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
  if (!Array.isArray(openingElement.attributes)) {
    return;
  }
  for (const value of openingElement.attributes) {
    const attribute = asEstreeNode(value);
    if (!attribute) {
      continue;
    }
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
  if (!openingElement) {
    return;
  }
  const componentName = staticFieldName(asEstreeNode(openingElement.name));
  if (componentName === "CodeBlock") {
    return;
  }
  return (
    nestedJsxAttributesExternalOffset(openingElement, source, componentName) ??
    firstNestedJsxExternalOffset(
      Array.isArray(node.children) ? node.children : [],
      source
    )
  );
}

/** Finds one authored offset for an external or unverifiable JSX destination. */
function invalidDestinationOffset(
  attribute: MdxAttribute,
  source: string,
  componentName: string | undefined
): number | undefined {
  const attributeStart = attribute.position?.start?.offset;
  const attributeEnd = attribute.position?.end?.offset;
  const expression = attributeExpression(attribute);
  if (attribute.name === undefined) {
    if (!expression) {
      return attributeStart;
    }
    return (
      expressionExternalOffset(expression, source, false, attributeStart) ??
      (isFullyStaticValueExpression(expression) ? undefined : attributeStart)
    );
  }
  if (isProtectedExampleAttribute(componentName, attribute.name)) {
    return;
  }
  const destinationAttribute = isDestinationAttribute(attribute.name);
  if (expression) {
    const externalOffset = expressionExternalOffset(
      expression,
      source,
      destinationAttribute,
      attributeStart
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
      attributeEnd
    );
  }
  return destinationAttribute ? attributeStart : undefined;
}

/** Finds external or unverifiable destinations on one MDX JSX element. */
export function jsxDestinationOffsets(node: MdxNode, source: string): number[] {
  if (node.type !== "mdxJsxFlowElement" && node.type !== "mdxJsxTextElement") {
    return [];
  }
  return (node.attributes ?? []).flatMap((attribute) => {
    const offset = invalidDestinationOffset(attribute, source, node.name);
    return offset === undefined ? [] : [offset];
  });
}
