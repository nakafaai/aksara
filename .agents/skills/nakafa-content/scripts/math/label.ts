import { issueAtOffset } from "#nakafa-content/math/finding";
import { type MdxNode, parseLessonMdx } from "#nakafa-content/mdx/parse";
import {
  type VisibleTextScan,
  visibleTextOffsets,
} from "#nakafa-content/mdx/visible";
import type { LessonVoiceIssue } from "#nakafa-content/voice/types";

const PLAIN_MATH_LABEL_PATTERN = /\b(?:QR|LU|SVD|PLU|PCA)\b/gu;
const QR_CODE_PREFIX_PATTERN = /\b(?:code|kode)\s+$/iu;
const QR_CODE_SUFFIX_PATTERN = /^(?:\s+codes?\b|\s*-\s*codes?\b)/iu;

/** The scan of learner text for a bare matrix-method label. */
const PLAIN_MATH_LABEL_SCAN: VisibleTextScan = {
  attributes: new Set([
    "alt",
    "caption",
    "description",
    "helperCaption",
    "label",
    "subtitle",
    "title",
  ]),
  find: (text) =>
    [...text.matchAll(PLAIN_MATH_LABEL_PATTERN)]
      .filter(
        (match) =>
          match[0] !== "QR" ||
          !isQrCodeTerm(text, match.index, match.index + match[0].length)
      )
      .map((match) => match.index),
  protectedTypes: new Set([
    "code",
    "definition",
    "heading",
    "html",
    "image",
    "inlineCode",
    "link",
    "linkReference",
    "mdxjsEsm",
  ]),
};

/** Distinguishes the unrelated QR-code term from matrix QR notation. */
function isQrCodeTerm(text: string, start: number, end: number): boolean {
  const before = text.slice(Math.max(0, start - 12), start);
  const after = text.slice(end, Math.min(text.length, end + 12));
  return (
    QR_CODE_PREFIX_PATTERN.test(before) || QR_CODE_SUFFIX_PATTERN.test(after)
  );
}

/** Finds bare matrix-method labels only in learner-visible MDX content. */
export function findPlainMathLabelIssues(
  source: string,
  tree: MdxNode = parseLessonMdx(source)
): LessonVoiceIssue[] {
  return visibleTextOffsets(source, tree, PLAIN_MATH_LABEL_SCAN).map((offset) =>
    issueAtOffset(source, offset, "plain-math-label")
  );
}
