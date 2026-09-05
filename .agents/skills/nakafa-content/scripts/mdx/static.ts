import assert from "node:assert/strict";

import {
  asEstreeNode,
  type EstreeNode,
  estreeRange,
} from "#nakafa-content/mdx/parse";

const MAX_STATIC_CANDIDATES = 32;

export interface StaticStringPart {
  quoted: boolean;
  range: ReturnType<typeof estreeRange>;
  raw: string;
  text: string;
}

export interface StaticStringCandidate {
  parts: readonly StaticStringPart[];
  text: string;
}

/** Builds one rendered string while preserving its authored source parts. */
function candidate(parts: readonly StaticStringPart[]): StaticStringCandidate {
  return {
    parts,
    text: parts.map(({ text }) => text).join(""),
  };
}

/** Reads the cooked text stored in one template-literal segment. */
function templatePart(node: EstreeNode): StaticStringPart | undefined {
  if (node.type !== "TemplateElement") {
    return;
  }
  const { value } = node;
  assert.ok(value && typeof value === "object");
  assert.ok("cooked" in value && typeof value.cooked === "string");
  assert.ok("raw" in value && typeof value.raw === "string");
  return {
    quoted: false,
    range: estreeRange(node),
    raw: value.raw,
    text: value.cooked,
  };
}

/** Joins every statically possible left and right string. */
function concatenateCandidates(
  left: readonly StaticStringCandidate[],
  right: readonly StaticStringCandidate[]
): StaticStringCandidate[] {
  const result: StaticStringCandidate[] = [];
  for (const leftCandidate of left) {
    for (const rightCandidate of right) {
      result.push(candidate([...leftCandidate.parts, ...rightCandidate.parts]));
      if (result.length > MAX_STATIC_CANDIDATES) {
        return result;
      }
    }
  }
  return result;
}

/** Evaluates one template only when every rendered segment is static. */
function templateCandidates(node: EstreeNode): StaticStringCandidate[] {
  assert.ok(Array.isArray(node.quasis));
  assert.ok(Array.isArray(node.expressions));
  assert.equal(node.quasis.length, node.expressions.length + 1);
  let result = [candidate([])];
  for (const [index, quasiValue] of node.quasis.entries()) {
    const quasi = asEstreeNode(quasiValue);
    assert.ok(quasi);
    result = concatenateCandidates(result, staticStringCandidates(quasi));
    if (index === node.expressions.length) {
      continue;
    }
    const expression = asEstreeNode(node.expressions[index]);
    assert.ok(expression);
    result = concatenateCandidates(result, staticStringCandidates(expression));
    if (result.length === 0) {
      return [];
    }
  }
  return result;
}

/** Evaluates one static string concatenation. */
function binaryCandidates(node: EstreeNode): StaticStringCandidate[] {
  if (node.operator !== "+") {
    return [];
  }
  const left = asEstreeNode(node.left);
  const right = asEstreeNode(node.right);
  assert.ok(left && right);
  return concatenateCandidates(
    staticStringCandidates(left),
    staticStringCandidates(right)
  );
}

/** Returns both possible strings from a conditional expression. */
function conditionalCandidates(node: EstreeNode): StaticStringCandidate[] {
  const consequent = asEstreeNode(node.consequent);
  const alternate = asEstreeNode(node.alternate);
  assert.ok(consequent && alternate);
  return [
    ...staticStringCandidates(consequent),
    ...staticStringCandidates(alternate),
  ].slice(0, MAX_STATIC_CANDIDATES + 1);
}

/** Reads static strings nested inside a program body. */
function programCandidates(node: EstreeNode): StaticStringCandidate[] {
  assert.ok(Array.isArray(node.body));
  return node.body.flatMap((statement) => {
    const statementNode = asEstreeNode(statement);
    assert.ok(statementNode);
    return staticStringCandidates(statementNode);
  });
}

/** Evaluates composite expression shapes without guessing dynamic values. */
function compositeCandidates(node: EstreeNode): StaticStringCandidate[] {
  if (node.type === "BinaryExpression") {
    return binaryCandidates(node);
  }
  if (node.type === "ConditionalExpression") {
    return conditionalCandidates(node);
  }
  if (
    node.type === "ExpressionStatement" ||
    node.type === "ParenthesizedExpression" ||
    node.type === "ChainExpression"
  ) {
    const expression = asEstreeNode(node.expression);
    assert.ok(expression);
    return staticStringCandidates(expression);
  }
  if (node.type === "Program") {
    return programCandidates(node);
  }
  if (node.type === "SequenceExpression") {
    assert.ok(Array.isArray(node.expressions));
    const last = asEstreeNode(node.expressions.at(-1));
    assert.ok(last);
    return staticStringCandidates(last);
  }
  return [];
}

/** Returns every rendered string that a fully static expression can produce. */
export function staticStringCandidates(
  node: EstreeNode
): StaticStringCandidate[] {
  if (node.type === "Literal" && typeof node.value === "string") {
    assert.ok(typeof node.raw === "string");
    return [
      candidate([
        {
          quoted: true,
          range: estreeRange(node),
          raw: node.raw.slice(1, -1),
          text: node.value,
        },
      ]),
    ];
  }
  const template = templatePart(node);
  if (template) {
    return [candidate([template])];
  }
  if (node.type === "TemplateLiteral") {
    return templateCandidates(node);
  }
  return compositeCandidates(node);
}

const NESTED_STRING_KEYS: Readonly<Record<string, readonly string[]>> = {
  ArrayExpression: ["elements"],
  ArrowFunctionExpression: ["body"],
  AssignmentExpression: ["right"],
  AwaitExpression: ["argument"],
  BinaryExpression: ["left", "right"],
  BlockStatement: ["body"],
  CallExpression: ["arguments"],
  ChainExpression: ["expression"],
  ConditionalExpression: ["consequent", "alternate"],
  ExpressionStatement: ["expression"],
  FunctionExpression: ["body"],
  JSXExpressionContainer: ["expression"],
  LogicalExpression: ["left", "right"],
  NewExpression: ["arguments"],
  ObjectExpression: ["properties"],
  ParenthesizedExpression: ["expression"],
  Program: ["body"],
  Property: ["value"],
  ReturnStatement: ["argument"],
  SpreadElement: ["argument"],
  TemplateLiteral: ["quasis", "expressions"],
  VariableDeclaration: ["declarations"],
  VariableDeclarator: ["init"],
};

/** Finds static strings inside structured data without reading property keys. */
export function nestedStaticStringCandidates(
  node: EstreeNode
): StaticStringCandidate[] {
  const direct = staticStringCandidates(node);
  if (direct.length > 0) {
    return direct;
  }
  if (node.type === "SequenceExpression") {
    assert.ok(Array.isArray(node.expressions));
    const result = asEstreeNode(node.expressions.at(-1));
    assert.ok(result);
    return nestedStaticStringCandidates(result);
  }
  const keys = NESTED_STRING_KEYS[node.type] ?? [];
  const nested: StaticStringCandidate[] = [];
  for (const key of keys) {
    const values = Array.isArray(node[key]) ? node[key] : [node[key]];
    for (const value of values) {
      const child = asEstreeNode(value);
      if (!child) {
        continue;
      }
      nested.push(...nestedStaticStringCandidates(child));
    }
  }
  return nested;
}

/** Proves that every item in one ESTree collection is a static string. */
function everyStaticStringNode(values: unknown): boolean {
  assert.ok(Array.isArray(values));
  return values.every((value) => {
    const child = asEstreeNode(value);
    assert.ok(child);
    return isFullyStaticStringStructure(child);
  });
}

/** Proves that every segment of one template literal is static. */
function isFullyStaticTemplate(node: EstreeNode): boolean {
  assert.ok(Array.isArray(node.quasis));
  assert.ok(Array.isArray(node.expressions));
  assert.equal(node.quasis.length, node.expressions.length + 1);
  return (
    everyStaticStringNode(node.quasis) &&
    everyStaticStringNode(node.expressions)
  );
}

/** Proves the static shape of every possible expression result. */
function isFullyStaticStringStructure(node: EstreeNode): boolean {
  if (node.type === "Literal") {
    return typeof node.value === "string";
  }
  if (node.type === "TemplateElement") {
    return templatePart(node) !== undefined;
  }
  if (node.type === "TemplateLiteral") {
    return isFullyStaticTemplate(node);
  }
  if (node.type === "BinaryExpression") {
    const left = asEstreeNode(node.left);
    const right = asEstreeNode(node.right);
    assert.ok(left && right);
    return (
      node.operator === "+" &&
      isFullyStaticStringStructure(left) &&
      isFullyStaticStringStructure(right)
    );
  }
  if (node.type === "ConditionalExpression") {
    const consequent = asEstreeNode(node.consequent);
    const alternate = asEstreeNode(node.alternate);
    assert.ok(consequent && alternate);
    return (
      isFullyStaticStringStructure(consequent) &&
      isFullyStaticStringStructure(alternate)
    );
  }
  if (
    node.type === "ExpressionStatement" ||
    node.type === "ParenthesizedExpression" ||
    node.type === "ChainExpression"
  ) {
    const expression = asEstreeNode(node.expression);
    assert.ok(expression);
    return isFullyStaticStringStructure(expression);
  }
  if (node.type === "Program") {
    assert.ok(Array.isArray(node.body));
    assert.ok(node.body.length > 0);
    return everyStaticStringNode(node.body);
  }
  if (node.type === "SequenceExpression") {
    assert.ok(Array.isArray(node.expressions));
    const last = asEstreeNode(node.expressions.at(-1));
    assert.ok(last);
    return isFullyStaticStringStructure(last);
  }
  return false;
}

/** Proves every result is static without exceeding bounded enumeration. */
export function isFullyStaticStringExpression(node: EstreeNode): boolean {
  return (
    staticStringCandidates(node).length <= MAX_STATIC_CANDIDATES &&
    isFullyStaticStringStructure(node)
  );
}
