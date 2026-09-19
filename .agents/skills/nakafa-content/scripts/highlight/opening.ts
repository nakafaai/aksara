import {
  hasMarkedPhrase,
  isAuthoredLesson,
  splitHighlightSections,
} from "#nakafa-content/highlight/section";
import { type MdxNode, parseLessonMdx } from "#nakafa-content/mdx/parse";
import type { LessonVoiceIssue } from "#nakafa-content/voice/types";

/**
 * Finds authored lesson documents whose opening carries no marked phrase.
 *
 * A learner decides from the first screen whether the page is worth reading,
 * so the opening section marks at least one phrase. `**` counts because both
 * markers render the same marked phrase.
 */
export function findOpeningHighlightIssues(
  source: string,
  tree: MdxNode = parseLessonMdx(source)
): LessonVoiceIssue[] {
  if (!isAuthoredLesson(tree)) {
    return [];
  }
  const [opening] = splitHighlightSections(tree, 2);
  if (!(opening && !opening.nodes.some(hasMarkedPhrase))) {
    return [];
  }
  const line = opening.opener.position?.start?.line ?? 1;
  return [
    {
      column: opening.opener.position?.start?.column ?? 1,
      excerpt: (source.split("\n")[line - 1] ?? "").trim(),
      line,
      rule: "lesson-opening-highlight",
    },
  ];
}
