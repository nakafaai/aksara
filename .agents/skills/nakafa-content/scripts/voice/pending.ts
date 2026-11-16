import { Array as Arr, Console, Effect } from "effect";
import { findPlainMathText } from "#nakafa-content/math/plain";
import type { MdxNode } from "#nakafa-content/mdx/parse";
import type { CliOptions } from "#nakafa-content/voice/options";
import type {
  LessonVoiceFileIssue,
  LessonVoiceIssue,
} from "#nakafa-content/voice/types";

/**
 * What each rule asks the author to write instead. Every rule here reports its
 * full count and fails nothing until its last occurrence clears; the change
 * that clears it moves the rule into the blocking set (D37, D39).
 */
const PENDING_FIXES = {
  "plain-math-text":
    'write it with <InlineMath math="..." /> or <BlockMath math="..." />, chemistry as \\mathrm{H_2O} with \\rightarrow',
};

/**
 * Finds every pending finding in one document: math or chemistry written as
 * plain text.
 */
export function findPendingIssues(
  source: string,
  tree: MdxNode
): LessonVoiceIssue[] {
  return findPlainMathText(source, tree);
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
