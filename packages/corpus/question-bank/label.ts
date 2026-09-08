import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";
import { Effect, Schema } from "effect";
import type { InlineCode, Nodes, Parents, Text } from "mdast";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { EXIT, visit } from "unist-util-visit";

const markdown = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkMath, { singleDollarTextMath: false })
  .freeze();
const UNESCAPED_DOLLAR = /(?<!\\)(?:\\\\)*\$/u;
const UNESCAPED_PERCENT = /(?<!\\)(?:\\\\)*%/u;
const INLINE_MATH = /^\$\$[^\s$](?:[^\n]*[^\s$])?\$\$$/u;
const ALTERNATE_MATH_DELIMITER = /\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]/u;
const MATH_COMPONENT =
  /<math>[\s\S]*?<\/math>|<(?:InlineMath|BlockMath)\s+math=["'][^"']*?["']\s*\/?>/u;
const WRAPPED_CODE_MATH = /^\s*\$[\s\S]*\$\s*$/u;
const CODE_DOLLAR_SPAN = /(^|[^$\\])\$[^$\n]+\$(?!\$)/gu;
const CODE_MATH_NOTATION = /\\[a-zA-Z]+|[=^_{}<>≤≥√∞±×÷∑∫]/u;
const CODE_MATH_OPERATION = /[\p{L}\p{N}]\s*[+\-*/]\s*[\p{L}\p{N}]/u;
const CODE_MATH_VARIABLE = /^[A-Za-z]$/u;
const BACKTICK_MATH_FENCE = /^`{3,}math/u;

/** An authored response would display broken or block-level mathematics. */
export class QuestionLabelError extends Schema.TaggedError<QuestionLabelError>()(
  "QuestionLabelError",
  {
    labelPath: Schema.String,
    reason: Schema.Literals([
      "control",
      "dollar",
      "display",
      "spacing",
      "comment",
      "syntax",
    ]),
    sourcePath: CorpusSourcePathSchema,
  }
) {}

/** Finds mathematical dollar markup embedded inside a code example. */
function hasEmbeddedCodeMath(code: string) {
  for (const match of code.matchAll(CODE_DOLLAR_SPAN)) {
    const [span] = match;
    const content = span.slice(span.indexOf("$") + 1, -1).trim();
    if (
      CODE_MATH_NOTATION.test(content) ||
      CODE_MATH_OPERATION.test(content) ||
      CODE_MATH_VARIABLE.test(content)
    ) {
      return true;
    }
  }
  return false;
}

/** Inspects visible text and inline code before renderer preprocessing. */
function textViolation(
  node: Text | InlineCode,
  raw: string,
  parent: Parents | undefined
): QuestionLabelError["reason"] | undefined {
  if (
    ALTERNATE_MATH_DELIMITER.test(raw) ||
    MATH_COMPONENT.test(raw) ||
    (node.type === "inlineCode" &&
      (WRAPPED_CODE_MATH.test(node.value) ||
        hasEmbeddedCodeMath(node.value) ||
        BACKTICK_MATH_FENCE.test(raw)))
  ) {
    return "syntax";
  }
  if (node.type === "inlineCode" || !node.value.includes("$")) {
    return;
  }
  if (parent?.type === "link" && parent.url === node.value) {
    return;
  }
  const visibleDollars = node.value.split("$").length - 1;
  const escapedDollars = raw.match(/\\\$/gu)?.length ?? 0;
  if (UNESCAPED_DOLLAR.test(raw) || visibleDollars > escapedDollars) {
    return "dollar";
  }
}

/** Classifies one Markdown node against the authored response syntax. */
function nodeViolation(
  node: Nodes,
  label: string,
  parent: Parents | undefined
): QuestionLabelError["reason"] | undefined {
  const raw = label.slice(
    node.position?.start.offset,
    node.position?.end.offset
  );
  if (node.type === "math") {
    return "display";
  }
  if (node.type === "code") {
    if (
      node.lang === "math" ||
      BACKTICK_MATH_FENCE.test(raw) ||
      (!node.lang && WRAPPED_CODE_MATH.test(node.value))
    ) {
      return "display";
    }
    return;
  }
  if (node.type === "inlineMath") {
    if (UNESCAPED_PERCENT.test(node.value)) {
      return "comment";
    }
    if (!INLINE_MATH.test(raw) || raw.includes("\t")) {
      return "spacing";
    }
    return;
  }
  if (node.type === "html") {
    return "syntax";
  }
  if (node.type === "text" || node.type === "inlineCode") {
    return textViolation(node, raw, parent);
  }
}

/** Finds math syntax that the canonical inline response surface cannot use. */
function labelViolation(label: string) {
  for (const character of label) {
    const code = character.charCodeAt(0);
    if ((code < 32 && code !== 9 && code !== 10) || code === 127) {
      return "control";
    }
  }
  const tree = markdown.parse(label);
  let reason: QuestionLabelError["reason"] | undefined;
  visit(tree, (node, _index, parent) => {
    reason = nodeViolation(node, label, parent);
    if (reason !== undefined) {
      return EXIT;
    }
  });
  return reason;
}

/** Rejects malformed math at source ingestion before any signed publication. */
export const validateQuestionLabels = Effect.fn(
  "AksaraCorpus.validateQuestionLabels"
)(function* (
  item: QuestionItem,
  sourcePath: typeof CorpusSourcePathSchema.Type
) {
  for (const [locale, response] of Object.entries(item.responses)) {
    if (response === undefined) {
      continue;
    }
    const labels =
      response.kind === "category"
        ? [
            ...response.categories.map((label, index) => ({
              label,
              path: `categories[${index}]`,
            })),
            ...response.statements.map(({ label }, index) => ({
              label,
              path: `statements[${index}].label`,
            })),
          ]
        : response.options.map(({ label }, index) => ({
            label,
            path: `options[${index}].label`,
          }));
    for (const { label, path } of labels) {
      const reason = labelViolation(label);
      if (reason !== undefined) {
        return yield* new QuestionLabelError({
          labelPath: `responses.${locale}.${path}`,
          reason,
          sourcePath,
        });
      }
    }
  }
});
