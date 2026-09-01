import {
  asEstreeNode,
  type EstreeNode,
  estreeRange,
  type MdxAttribute,
  type MdxNode,
  type SourceRange,
} from "#nakafa-content/voice-mdx";
import { maskProtectedInlineContent } from "#nakafa-content/voice-text";
import type {
  LessonVoiceIssue,
  LessonVoiceLocale,
  LessonVoiceRule,
} from "#nakafa-content/voice-types";

const NEWLINE_PATTERN = /[\r\n]/u;
const LEARNER_TEXT_ATTRIBUTES = new Set([
  "alt",
  "caption",
  "description",
  "helperCaption",
  "label",
  "subtitle",
  "title",
]);
const PROTECTED_NODE_TYPES = new Set([
  "blockquote",
  "code",
  "definition",
  "html",
  "image",
  "inlineCode",
  "link",
  "linkReference",
  "mdxjsEsm",
]);
const PROTECTED_COMPONENT_NAMES = new Set([
  "a",
  "BlockMath",
  "CodeBlock",
  "InlineMath",
]);
const RENDERED_KEYS_BY_TYPE: Readonly<Record<string, readonly string[]>> = {
  ArrayExpression: ["elements"],
  BinaryExpression: ["left", "right"],
  ConditionalExpression: ["consequent", "alternate"],
  ExpressionStatement: ["expression"],
  JSXExpressionContainer: ["expression"],
  JSXFragment: ["children"],
  LogicalExpression: ["left", "right"],
  ParenthesizedExpression: ["expression"],
  Program: ["body"],
  TemplateLiteral: ["quasis", "expressions"],
};

/** Returns one lesson issue at an exact source offset. */
function issueAtOffset(
  source: string,
  offset: number,
  rule: string
): LessonVoiceIssue {
  const lineStart = source.lastIndexOf("\n", offset - 1) + 1;
  const lineEndIndex = source.indexOf("\n", offset);
  const lineEnd = lineEndIndex === -1 ? source.length : lineEndIndex;
  return {
    column: offset - lineStart + 1,
    excerpt: source.slice(lineStart, lineEnd).trim(),
    line: source.slice(0, lineStart).split("\n").length,
    rule,
  };
}

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

/** Adds rendered text ranges below one ESTree field. */
function collectExpressionValues(value: unknown, ranges: SourceRange[]): void {
  for (const child of Array.isArray(value) ? value : [value]) {
    const childNode = asEstreeNode(child);
    if (childNode) {
      collectExpressionRanges(childNode, ranges);
    }
  }
}

/** Finds static learner-visible text inside a JSX expression value. */
function collectExpressionRanges(
  node: EstreeNode,
  ranges: SourceRange[]
): void {
  if (
    (node.type === "Literal" && typeof node.value === "string") ||
    node.type === "JSXText" ||
    node.type === "TemplateElement"
  ) {
    const range = estreeRange(node);
    if (range) {
      ranges.push(range);
    }
    return;
  }
  if (node.type === "JSXElement") {
    if (PROTECTED_COMPONENT_NAMES.has(jsxComponentName(node) ?? "")) {
      return;
    }
    collectExpressionValues(node.children, ranges);
    return;
  }
  for (const key of RENDERED_KEYS_BY_TYPE[node.type] ?? []) {
    collectExpressionValues(node[key], ranges);
  }
}

/** Returns the static learner-visible ranges in an expression prop. */
function expressionAttributeRanges(attribute: MdxAttribute): SourceRange[] {
  if (
    !attribute.value ||
    typeof attribute.value !== "object" ||
    !("data" in attribute.value) ||
    !attribute.value.data ||
    typeof attribute.value.data !== "object" ||
    !("estree" in attribute.value.data)
  ) {
    return [];
  }
  const estree = asEstreeNode(attribute.value.data.estree);
  const ranges: SourceRange[] = [];
  if (estree) {
    collectExpressionRanges(estree, ranges);
  }
  return ranges;
}

/** Matches every selected rule once inside one learner-visible source range. */
function matchRangeRules(
  locale: LessonVoiceLocale,
  source: string,
  range: SourceRange | undefined,
  rules: readonly LessonVoiceRule[],
  requireNewline: boolean
): LessonVoiceIssue[] {
  const start = range?.start?.offset;
  const end = range?.end?.offset;
  if (start === undefined || end === undefined) {
    return [];
  }
  const original = source.slice(start, end);
  const normalized = original.replace(/[\r\n]/gu, " ");
  const searchable = maskProtectedInlineContent(normalized);
  return rules.flatMap((rule) => {
    const pattern = rule.patterns[locale];
    if (!pattern) {
      return [];
    }
    pattern.lastIndex = 0;
    const match = pattern.exec(searchable);
    if (match?.index === undefined) {
      return [];
    }
    if (
      requireNewline &&
      !NEWLINE_PATTERN.test(
        original.slice(match.index, match.index + match[0].length)
      )
    ) {
      return [];
    }
    return [issueAtOffset(source, start + match.index, rule.id)];
  });
}

/** Adds only phrase matches that genuinely cross a soft paragraph wrap. */
function collectParagraphIssues(
  locale: LessonVoiceLocale,
  node: MdxNode,
  rules: readonly LessonVoiceRule[],
  source: string,
  issues: LessonVoiceIssue[]
): void {
  const start = node.position?.start?.offset;
  const end = node.position?.end?.offset;
  if (
    node.type !== "paragraph" ||
    start === undefined ||
    end === undefined ||
    !NEWLINE_PATTERN.test(source.slice(start, end))
  ) {
    return;
  }
  issues.push(...matchRangeRules(locale, source, node.position, rules, true));
}

/** Adds phrase matches from direct learner-visible JSX string props. */
function collectAttributeIssues(
  locale: LessonVoiceLocale,
  node: MdxNode,
  rules: readonly LessonVoiceRule[],
  source: string,
  issues: LessonVoiceIssue[]
): void {
  if (node.type !== "mdxJsxFlowElement" && node.type !== "mdxJsxTextElement") {
    return;
  }
  for (const attribute of node.attributes ?? []) {
    if (
      attribute.name === undefined ||
      !LEARNER_TEXT_ATTRIBUTES.has(attribute.name)
    ) {
      continue;
    }
    const directRange = directAttributeValueRange(attribute, source);
    const ranges = directRange
      ? [directRange]
      : expressionAttributeRanges(attribute);
    for (const range of ranges) {
      issues.push(...matchRangeRules(locale, source, range, rules, false));
    }
  }
}

/** Recognizes source and component regions that must remain untouched. */
function isProtectedNode(node: MdxNode, inherited: boolean): boolean {
  if (inherited || PROTECTED_NODE_TYPES.has(node.type ?? "")) {
    return true;
  }
  return (
    (node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") &&
    PROTECTED_COMPONENT_NAMES.has(node.name ?? "")
  );
}

/** Collects multiline paragraph and direct learner-prop rule matches. */
function collectNodeIssues(
  locale: LessonVoiceLocale,
  node: MdxNode,
  rules: readonly LessonVoiceRule[],
  source: string,
  issues: LessonVoiceIssue[],
  isProtected = false
): void {
  const protectedHere = isProtectedNode(node, isProtected);
  if (!protectedHere) {
    collectParagraphIssues(locale, node, rules, source, issues);
    collectAttributeIssues(locale, node, rules, source, issues);
  }
  for (const child of node.children ?? []) {
    collectNodeIssues(locale, child, rules, source, issues, protectedHere);
  }
}

/** Adds AST-scoped matches that the source-line pass cannot see safely. */
export function findVisibleProseRuleIssues(
  locale: LessonVoiceLocale,
  source: string,
  tree: MdxNode,
  rules: readonly LessonVoiceRule[]
): LessonVoiceIssue[] {
  const issues: LessonVoiceIssue[] = [];
  collectNodeIssues(locale, tree, rules, source, issues);
  return issues;
}
