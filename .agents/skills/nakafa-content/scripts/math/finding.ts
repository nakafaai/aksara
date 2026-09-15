import type { LessonVoiceIssue } from "#nakafa-content/voice/types";

/** One composition finding at an offset inside a decoded math value. */
export interface MathFinding {
  readonly offset: number;
  readonly rule: string;
}

/** Returns a diagnostic at one exact source offset. */
export function issueAtOffset(
  source: string,
  offset: number,
  rule: string
): LessonVoiceIssue {
  const lineStart = source.lastIndexOf("\n", offset - 1) + 1;
  const lineEndIndex = source.indexOf("\n", offset);
  const lineEnd = lineEndIndex === -1 ? source.length : lineEndIndex;
  const line = source.slice(0, lineStart).split("\n").length;
  return {
    column: offset - lineStart + 1,
    excerpt: source.slice(lineStart, lineEnd).trim(),
    line,
    rule,
  };
}
