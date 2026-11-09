import assert from "node:assert/strict";
import { Array as Arr, Console, Effect, Predicate } from "effect";
import { issueAtOffset } from "#nakafa-content/math/finding";
import { findPlainMathText } from "#nakafa-content/math/plain";
import {
  type MdxAttribute,
  type MdxNode,
  visitMdxNodes,
} from "#nakafa-content/mdx/parse";
import type { CliOptions } from "#nakafa-content/voice/options";
import type {
  LessonVoiceFileIssue,
  LessonVoiceIssue,
} from "#nakafa-content/voice/types";

/** The visual components that MathVisual replaces (D36). */
const RETIRED_VISUALS = new Set([
  "Inequality",
  "LineEquation",
  "NumberLine",
  "Triangle",
  "UnitCircle",
  "VectorChart",
]);

/** The visual text props that hold rich text: math renders only in JSX. */
const VISUAL_TEXT_PROPS = new Set([
  "description",
  "facts",
  "labels",
  "legend",
  "legends",
  "title",
]);

/**
 * What each rule asks the author to write instead. Every rule here reports its
 * full count and fails nothing until its last occurrence clears; the change
 * that clears it moves the rule into the blocking set (D37, D39).
 */
const PENDING_FIXES = {
  "plain-math-text":
    'write it with <InlineMath math="..." /> or <BlockMath math="..." />, chemistry as \\mathrm{H_2O} with \\rightarrow',
  "retired-visual": "draw it with MathVisual, the one math visual (D36)",
  "string-visual-text":
    'write the prop as JSX, such as description={<>Area <InlineMath math="x^2" /></>}',
};

type JsxMdxNode = MdxNode & {
  attributes: MdxAttribute[];
};

/** Narrows one MDX node to a JSX element, whose attributes are always listed. */
function isJsxElement(node: MdxNode): node is JsxMdxNode {
  return node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement";
}

/** Finds each retired visual and each visual text prop written as a string. */
function findVisualIssues(source: string, tree: MdxNode): LessonVoiceIssue[] {
  const issues: LessonVoiceIssue[] = [];
  visitMdxNodes(tree, (node) => {
    if (!isJsxElement(node)) {
      return;
    }
    if (RETIRED_VISUALS.has(String(node.name))) {
      const start = node.position?.start?.offset;
      assert.ok(start !== undefined);
      issues.push(issueAtOffset(source, start, "retired-visual"));
    }
    for (const attribute of node.attributes) {
      if (
        Predicate.isString(attribute.value) &&
        VISUAL_TEXT_PROPS.has(String(attribute.name))
      ) {
        const offset = attribute.position?.start?.offset;
        assert.ok(offset !== undefined);
        issues.push(issueAtOffset(source, offset, "string-visual-text"));
      }
    }
  });
  return issues;
}

/**
 * Finds every pending finding in one document: math or chemistry written as
 * plain text, a retired visual, and a visual text prop written as a string.
 */
export function findPendingIssues(
  source: string,
  tree: MdxNode
): LessonVoiceIssue[] {
  return [
    ...findPlainMathText(source, tree),
    ...findVisualIssues(source, tree),
  ];
}

/** Prints each pending rule's count, fix, and occurrences in a text report. */
export const printPending = Effect.fn("PendingRules.print")(function* (
  format: CliOptions["format"],
  issues: readonly LessonVoiceFileIssue[] | undefined
) {
  if (format !== "text" || issues === undefined) {
    return;
  }
  for (const [rule, fix] of Object.entries(PENDING_FIXES)) {
    const found = Arr.filter(issues, (issue) => issue.rule === rule);
    if (found.length === 0) {
      continue;
    }
    yield* Console.log(`${found.length} [${rule}] pending: ${fix}`);
    for (const issue of found) {
      yield* Console.log(
        `${issue.file}:${issue.line}:${issue.column} [${rule}] ${issue.excerpt}`
      );
    }
  }
});
