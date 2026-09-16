import { dirname, relative } from "node:path";

import type { MdxNode } from "#nakafa-content/mdx/parse";
import type {
  LessonVoiceFileIssue,
  LessonVoiceLocale,
} from "#nakafa-content/voice/types";

const HIGHLIGHT_PATTERN = /<Highlight>[\s\S]*?<\/Highlight>/u;

interface LessonSiblingDocument {
  file: string;
  locale: LessonVoiceLocale;
  source: string;
  tree?: MdxNode;
}

/** Detects an authored lesson document by its static metadata declaration. */
function isAuthoredLesson(tree: MdxNode | undefined): boolean {
  return (tree?.children ?? []).some((node) => node.type === "mdxjsEsm");
}

/** Reports the first locale document of a lesson that carries no highlight. */
function lessonHighlightIssue(
  root: string,
  siblings: readonly LessonSiblingDocument[]
): LessonVoiceFileIssue[] {
  const marked = siblings.some(({ source }) => HIGHLIGHT_PATTERN.test(source));
  const [anchor] = siblings;
  const authored = siblings.some(({ tree }) => isAuthoredLesson(tree));
  if (marked || !authored || anchor === undefined) {
    return [];
  }
  return [
    {
      column: 1,
      excerpt: "Lesson carries no <Highlight> phrase",
      file: relative(root, anchor.file),
      line: 1,
      locale: anchor.locale,
      rule: "lesson-without-highlight",
    },
  ];
}

/**
 * Finds every lesson whose locale siblings carry no highlight.
 *
 * A lesson teaches a rule, a decisive condition, or a key term that a learner
 * should be able to scan and remember, so an unmarked lesson has left that
 * teaching step unmarked in every locale.
 */
export function findLessonHighlightIssues(
  root: string,
  documents: readonly LessonSiblingDocument[]
): LessonVoiceFileIssue[] {
  const groups = new Map<string, LessonSiblingDocument[]>();
  for (const document of documents) {
    const key = dirname(document.file);
    const group = groups.get(key);
    if (group === undefined) {
      groups.set(key, [document]);
    } else {
      group.push(document);
    }
  }
  const issues: LessonVoiceFileIssue[] = [];
  for (const siblings of groups.values()) {
    issues.push(...lessonHighlightIssue(root, siblings));
  }
  return issues.sort((left, right) => left.file.localeCompare(right.file));
}
