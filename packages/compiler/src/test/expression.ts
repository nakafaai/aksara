import { assert } from "@effect/vitest";
import { createProcessor } from "@mdx-js/mdx";
import type { Expression } from "estree-jsx";
import { attributeExpression } from "#compiler/ast/attribute";

/** Parses one JavaScript expression exactly as MDX parses a JSX attribute. */
export function parseExpression(source: string): Expression {
  const root = createProcessor({ format: "mdx" }).parse(
    `<Probe value={${source}} />`
  );
  const [element] = root.children;
  assert.ok(element?.type === "mdxJsxFlowElement");
  const [attribute] = element.attributes;
  assert.ok(attribute?.type === "mdxJsxAttribute");
  const expression = attributeExpression(attribute);
  assert.ok(expression);
  return expression;
}
