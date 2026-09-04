import {
  asEstreeNode,
  type EstreeNode,
  estreeRange,
  type SourceRange,
} from "#nakafa-content/mdx/parse";

const MAX_STATIC_CANDIDATES = 32;

export interface StaticStringPart {
  range: SourceRange | undefined;
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
function templateElementText(node: EstreeNode): string | undefined {
  if (node.type !== "TemplateElement") {
    return;
  }
  const { value } = node;
  if (!value || typeof value !== "object") {
    return;
  }
  if ("cooked" in value && typeof value.cooked === "string") {
    return value.cooked;
  }
  return "raw" in value && typeof value.raw === "string"
    ? value.raw
    : undefined;
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
      if (result.length === MAX_STATIC_CANDIDATES) {
        return result;
      }
    }
  }
  return result;
}

/** Evaluates one template only when every rendered segment is static. */
function templateCandidates(node: EstreeNode): StaticStringCandidate[] {
  if (!(Array.isArray(node.quasis) && Array.isArray(node.expressions))) {
    return [];
  }
  if (node.quasis.length !== node.expressions.length + 1) {
    return [];
  }
  let result = [candidate([])];
  for (const [index, quasiValue] of node.quasis.entries()) {
    const quasi = asEstreeNode(quasiValue);
    if (!quasi) {
      return [];
    }
    result = concatenateCandidates(result, staticStringCandidates(quasi));
    if (result.length === 0 || index === node.expressions.length) {
      continue;
    }
    const expression = asEstreeNode(node.expressions[index]);
    if (!expression) {
      return [];
    }
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
  return left && right
    ? concatenateCandidates(
        staticStringCandidates(left),
        staticStringCandidates(right)
      )
    : [];
}

/** Returns both possible strings from a conditional expression. */
function conditionalCandidates(node: EstreeNode): StaticStringCandidate[] {
  const consequent = asEstreeNode(node.consequent);
  const alternate = asEstreeNode(node.alternate);
  return [
    ...(consequent ? staticStringCandidates(consequent) : []),
    ...(alternate ? staticStringCandidates(alternate) : []),
  ].slice(0, MAX_STATIC_CANDIDATES);
}

/** Reads static strings nested inside a program body. */
function programCandidates(node: EstreeNode): StaticStringCandidate[] {
  if (!Array.isArray(node.body)) {
    return [];
  }
  return node.body.flatMap((statement) => {
    const statementNode = asEstreeNode(statement);
    return statementNode ? staticStringCandidates(statementNode) : [];
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
    return expression ? staticStringCandidates(expression) : [];
  }
  if (node.type === "Program") {
    return programCandidates(node);
  }
  if (node.type === "SequenceExpression" && Array.isArray(node.expressions)) {
    const last = asEstreeNode(node.expressions.at(-1));
    return last ? staticStringCandidates(last) : [];
  }
  return [];
}

/** Returns every rendered string that a fully static expression can produce. */
export function staticStringCandidates(
  node: EstreeNode
): StaticStringCandidate[] {
  if (node.type === "Literal" && typeof node.value === "string") {
    return [candidate([{ range: estreeRange(node), text: node.value }])];
  }
  const templateText = templateElementText(node);
  if (templateText !== undefined) {
    return [candidate([{ range: estreeRange(node), text: templateText }])];
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
  SequenceExpression: ["expressions"],
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
  return (
    Array.isArray(values) &&
    values.every((value) => {
      const child = asEstreeNode(value);
      return child ? isFullyStaticStringExpression(child) : false;
    })
  );
}

/** Proves that every segment of one template literal is static. */
function isFullyStaticTemplate(node: EstreeNode): boolean {
  return (
    Array.isArray(node.quasis) &&
    Array.isArray(node.expressions) &&
    node.quasis.length === node.expressions.length + 1 &&
    everyStaticStringNode(node.quasis) &&
    everyStaticStringNode(node.expressions)
  );
}

/** Proves that every possible expression result is a statically known string. */
export function isFullyStaticStringExpression(node: EstreeNode): boolean {
  if (node.type === "Literal") {
    return typeof node.value === "string";
  }
  if (node.type === "TemplateElement") {
    return templateElementText(node) !== undefined;
  }
  if (node.type === "TemplateLiteral") {
    return isFullyStaticTemplate(node);
  }
  if (node.type === "BinaryExpression") {
    const left = asEstreeNode(node.left);
    const right = asEstreeNode(node.right);
    return (
      node.operator === "+" &&
      Boolean(left && isFullyStaticStringExpression(left)) &&
      Boolean(right && isFullyStaticStringExpression(right))
    );
  }
  if (node.type === "ConditionalExpression") {
    const consequent = asEstreeNode(node.consequent);
    const alternate = asEstreeNode(node.alternate);
    return Boolean(
      consequent &&
        alternate &&
        isFullyStaticStringExpression(consequent) &&
        isFullyStaticStringExpression(alternate)
    );
  }
  if (
    node.type === "ExpressionStatement" ||
    node.type === "ParenthesizedExpression" ||
    node.type === "ChainExpression"
  ) {
    const expression = asEstreeNode(node.expression);
    return expression ? isFullyStaticStringExpression(expression) : false;
  }
  if (node.type === "Program" && Array.isArray(node.body)) {
    return node.body.length > 0 && everyStaticStringNode(node.body);
  }
  if (node.type === "SequenceExpression" && Array.isArray(node.expressions)) {
    const last = asEstreeNode(node.expressions.at(-1));
    return last ? isFullyStaticStringExpression(last) : false;
  }
  return false;
}
