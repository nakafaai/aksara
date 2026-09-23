import assert from "node:assert/strict";
import { Predicate } from "effect";
import { issueAtOffset } from "#nakafa-content/math/finding";
import {
  estreeChildren,
  type MdxNode,
  parseLessonMdx,
} from "#nakafa-content/mdx/parse";
import type { LessonVoiceIssue } from "#nakafa-content/voice/types";

/** Identifies JSX fragments, which add no rendered layout boundary. */
function isFragment(node: MdxNode): boolean {
  return (
    (node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") &&
    !node.name
  );
}

/** Flattens only transparent fragments, preserving real prose boundaries. */
function renderedChildren(node: MdxNode): MdxNode[] {
  const children = node.children ?? [];
  if (node.name === "MathContainer") {
    return children;
  }
  return children.flatMap((child) =>
    isFragment(child) ? renderedChildren(child) : [child]
  );
}

/** Whitespace and comment-only expressions cannot separate rendered cards. */
function isEmpty(node: MdxNode): boolean {
  if (node.type === "text" && Predicate.isString(node.value)) {
    return node.value.trim() === "";
  }
  return (
    (node.type === "mdxFlowExpression" || node.type === "mdxTextExpression") &&
    node.data?.estree !== undefined &&
    estreeChildren(node.data.estree.body).length === 0
  );
}

/** Enforces formula-only stacks and groups adjacent authored math cards. */
export function findMathStackIssues(
  source: string,
  tree: MdxNode = parseLessonMdx(source)
): LessonVoiceIssue[] {
  const issues: LessonVoiceIssue[] = [];

  /** Checks each rendered parent independently, including nested MDX blocks. */
  function inspect(parent: MdxNode): void {
    let previousMath = false;
    for (const child of renderedChildren(parent)) {
      if (isEmpty(child)) {
        continue;
      }
      const math = child.name === "BlockMath";
      const mixedStack = parent.name === "MathContainer" && !math;
      const unwrapped = math && previousMath && parent.name !== "MathContainer";
      if (mixedStack || unwrapped) {
        const offset = child.position?.start?.offset;
        assert.ok(offset !== undefined);
        issues.push(
          issueAtOffset(
            source,
            offset,
            mixedStack ? "math-stack-content" : "unwrapped-math-stack"
          )
        );
      }
      previousMath = math;
      if (!mixedStack) {
        inspect(child);
      }
    }
  }

  inspect(tree);
  return issues;
}
