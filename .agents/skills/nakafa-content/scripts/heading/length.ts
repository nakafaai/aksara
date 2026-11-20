import { Array as Arr, HashSet } from "effect";
import type { HeadingFinding } from "#nakafa-content/heading/finding";
import type { MdxNode } from "#nakafa-content/mdx/parse";

/** A leaf section above this many visible words with nothing but text asks for a review. */
export const MOST_SECTION_WORDS = 300;
/** A page above this many visible words usually answers two questions. */
export const MOST_PAGE_WORDS = 1400;
/** Above this many H2 and H3 per thousand visible words, headings mark paragraphs. */
export const MOST_HEADINGS_PER_THOUSAND = 15;

const WORD = /[\p{L}\p{N}]+/gu;

/** Nodes that break a wall of text: a table, code, a formula, or a component. */
const NON_TEXT_TYPES = HashSet.make(
  "code",
  "math",
  "mdxJsxFlowElement",
  "table"
);

/**
 * Counts the words a learner reads in one node: its text in paragraphs,
 * lists, tables, headings, and JSX children, never formulas, code, or props.
 */
export function visibleWords(node: MdxNode): number {
  if (node.type === "text") {
    return String(node.value).match(WORD)?.length ?? 0;
  }
  return Arr.reduce(
    node.children ?? [],
    0,
    (sum, child) => sum + visibleWords(child)
  );
}

/** One run of top-level nodes under a heading, up to the next heading. */
interface Leaf {
  readonly heading: MdxNode;
  readonly nodes: readonly MdxNode[];
}

/** Lists every heading whose body reaches the next heading with no deeper one. */
function leaves(children: readonly MdxNode[]): Leaf[] {
  return Arr.flatMap(children, (node, index) => {
    if (node.type !== "heading") {
      return [];
    }
    const after = children.slice(index + 1);
    const next = after.findIndex(({ type }) => type === "heading");
    const nodes = next < 0 ? after : after.slice(0, next);
    const deeper = Number(after[next]?.depth ?? 0);
    return deeper > Number(node.depth) ? [] : [{ heading: node, nodes }];
  });
}

/**
 * R12 to R14: a leaf section is one chunk, a page answers one main question,
 * and headings mark topics instead of paragraphs. All three ask for a review.
 */
export function findLengthFindings(tree: MdxNode): HeadingFinding[] {
  const children = tree.children ?? [];
  const findings: HeadingFinding[] = Arr.flatMap(
    leaves(children),
    ({ heading, nodes }) => {
      const words = Arr.reduce(
        nodes,
        0,
        (sum, node) => sum + visibleWords(node)
      );
      const plain = !Arr.some(nodes, ({ type }) =>
        HashSet.has(NON_TEXT_TYPES, type)
      );
      return plain && words > MOST_SECTION_WORDS
        ? [
            {
              blocking: false,
              line: heading.position?.start?.line ?? 1,
              message: `This section runs ${words} words of text with no formula, table, or visual. Split it by teaching job, or let a table, a worked example, or a visual carry part of it.`,
              rule: "section-span",
            },
          ]
        : [];
    }
  );
  const total = visibleWords(tree);
  const headings = Arr.filter(
    children,
    ({ depth, type }) => type === "heading" && Number(depth) <= 3
  ).length;
  if (total > MOST_PAGE_WORDS) {
    findings.push({
      blocking: false,
      line: 1,
      message: `The page has ${total} visible words; most pages answer their question in 500 to 1,100. Split it only if it answers two main questions, otherwise cut what repeats.`,
      rule: "lesson-length",
    });
  }
  if (total > 0 && (headings * 1000) / total > MOST_HEADINGS_PER_THOUSAND) {
    findings.push({
      blocking: false,
      line: 1,
      message: `The page has ${headings} headings for ${total} visible words, more than ${MOST_HEADINGS_PER_THOUSAND} per thousand. Headings mark topics, not paragraphs: merge sections that share one idea.`,
      rule: "heading-density",
    });
  }
  return findings;
}
