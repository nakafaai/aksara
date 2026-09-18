import { relative } from "node:path";

import { isAuthoredLesson } from "#nakafa-content/highlight/section";
import type { MdxNode } from "#nakafa-content/mdx/parse";
import type {
  LessonVoiceFileIssue,
  LessonVoiceLocale,
} from "#nakafa-content/voice/types";

const HIGHLIGHT_PATTERN = /<Highlight(?:\s[^>]*)?>[\s\S]*?<\/Highlight>/u;

interface LessonSiblingDocument {
  file: string;
  locale: LessonVoiceLocale;
  source: string;
  tree?: MdxNode;
}

/**
 * Finds every authored locale document that carries no highlight.
 *
 * Each locale is rendered on its own, so one locale without `<Highlight>`
 * leaves the lesson's decisive rule, condition, or key term unmarked for the
 * learners reading that language, even when a sibling locale marks it.
 */
export function findLessonHighlightIssues(
  root: string,
  documents: readonly LessonSiblingDocument[]
): LessonVoiceFileIssue[] {
  const issues: LessonVoiceFileIssue[] = [];
  for (const document of documents) {
    if (!isAuthoredLesson(document.tree)) {
      continue;
    }
    if (HIGHLIGHT_PATTERN.test(document.source)) {
      continue;
    }
    issues.push({
      column: 1,
      excerpt: "Lesson carries no <Highlight> phrase",
      file: relative(root, document.file),
      line: 1,
      locale: document.locale,
      rule: "lesson-without-highlight",
    });
  }
  return issues.sort((left, right) => left.file.localeCompare(right.file));
}
