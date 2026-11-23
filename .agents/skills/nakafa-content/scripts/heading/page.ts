import { Array as Arr } from "effect";
import { findBudgetFindings } from "#nakafa-content/heading/budget";
import type { HeadingFinding } from "#nakafa-content/heading/finding";
import { isGenericHeading } from "#nakafa-content/heading/generic";
import { findLengthFindings } from "#nakafa-content/heading/length";
import type { OutlineHeading } from "#nakafa-content/heading/outline";
import { findTitleFindings } from "#nakafa-content/heading/title";
import { findWidthFindings } from "#nakafa-content/heading/width";
import { findBloatedInlineMathFindings } from "#nakafa-content/math/bloated";
import type { MdxNode } from "#nakafa-content/mdx/parse";
import { findBlockquoteFindings } from "#nakafa-content/prose/blockquote";
import { findCohesionFindings } from "#nakafa-content/prose/cohesion";
import { findDescriptionFindings } from "#nakafa-content/prose/description";
import type { LessonVoiceLocale } from "#nakafa-content/voice/types";

/** One page the outline rules read: a lesson section or an article. */
export interface OutlinePage {
  readonly headings: readonly OutlineHeading[];
  readonly kind: "article" | "lesson";
  readonly locale: LessonVoiceLocale;
  readonly title: string;
  readonly tree: MdxNode;
}

/**
 * R10: a heading names its topic. A scaffold label alone, such as `Latihan`
 * or `Common Mistakes`, or a section about the visual, names none.
 */
function findGenericFindings(page: OutlinePage): HeadingFinding[] {
  return Arr.flatMap(page.headings, (heading) =>
    isGenericHeading(page.locale, heading.words)
      ? [
          {
            blocking: true,
            line: heading.line,
            message: `'${heading.words}' names no topic. Name what this section teaches about the page's own topic. If it is a scaffold every lesson carries, restructure instead of renaming: a mistake, an example, or a check belongs inside the section it teaches, and a visual inside the section whose idea it models.`,
            rule: "generic-heading",
          },
        ]
      : []
  );
}

/**
 * Every rule that reads one page alone: the outline budget and cohesion rules
 * for a lesson, clean metadata descriptions, title repeats, scaffold labels,
 * label widths, and length signals.
 */
export function findPageFindings(page: OutlinePage): HeadingFinding[] {
  return [
    ...(page.kind === "lesson"
      ? findBudgetFindings(page.locale, page.headings)
      : []),
    ...findDescriptionFindings(page.tree),
    ...findTitleFindings(page.title, page.headings),
    ...findGenericFindings(page),
    ...findWidthFindings(page.headings),
    ...(page.kind === "lesson" ? findLengthFindings(page.tree) : []),
    ...(page.kind === "lesson"
      ? [
          ...findCohesionFindings(page.locale, page.tree),
          ...findBlockquoteFindings(page.tree),
          ...findBloatedInlineMathFindings(page.tree),
        ]
      : []),
  ];
}
