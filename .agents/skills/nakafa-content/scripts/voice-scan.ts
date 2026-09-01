import { FLOW_CONTEXT_RULES } from "#nakafa-content/flow-context";
import { FLOW_STYLE_RULES } from "#nakafa-content/flow-style";
import { LANGUAGE_CALQUE_RULES } from "#nakafa-content/language-calque";
import { findMalformedLatexCommandIssues } from "#nakafa-content/math-command";
import { TECHNICAL_METAPHOR_RULES } from "#nakafa-content/metaphor-technical";
import { AMBIGUITY_VOICE_RULES } from "#nakafa-content/voice-ambiguity";
import { CLAIM_VOICE_RULES } from "#nakafa-content/voice-claim";
import { CONTRAST_VOICE_RULES } from "#nakafa-content/voice-contrast";
import { CORE_VOICE_RULES } from "#nakafa-content/voice-core";
import { FLOW_VOICE_RULES } from "#nakafa-content/voice-flow";
import {
  findStructuralIssues,
  HEADING_VOICE_RULES,
} from "#nakafa-content/voice-heading";
import { LANGUAGE_VOICE_RULES } from "#nakafa-content/voice-language";
import { NAVIGATION_VOICE_RULES } from "#nakafa-content/voice-links";
import { findPlainMathLabelIssues } from "#nakafa-content/voice-math";
import { type MdxNode, parseLessonMdx } from "#nakafa-content/voice-mdx";
import { METAPHOR_VOICE_RULES } from "#nakafa-content/voice-metaphor";
import { METHOD_VOICE_RULES } from "#nakafa-content/voice-method";
import {
  PEDAGOGY_VOICE_RULES,
  REPETITIVE_OPENER_RULES,
} from "#nakafa-content/voice-pedagogy";
import { findVisibleProseRuleIssues } from "#nakafa-content/voice-prose";
import { REPORTING_VOICE_RULES } from "#nakafa-content/voice-reporting";
import { maskProtectedInlineContent } from "#nakafa-content/voice-text";
import { TRANSITION_VOICE_RULES } from "#nakafa-content/voice-transition";
import {
  isLessonVoiceLocale,
  type LessonVoiceIssue,
  type LessonVoiceLocale,
  type LessonVoiceRule,
  type LineContext,
  type LineState,
} from "#nakafa-content/voice-types";
import { VISIBILITY_VOICE_RULES } from "#nakafa-content/voice-visibility";

const LESSON_VOICE_RULES = [
  ...CORE_VOICE_RULES,
  ...METAPHOR_VOICE_RULES,
  ...TECHNICAL_METAPHOR_RULES,
  ...METHOD_VOICE_RULES,
  ...TRANSITION_VOICE_RULES,
  ...CLAIM_VOICE_RULES,
  ...CONTRAST_VOICE_RULES,
  ...FLOW_VOICE_RULES,
  ...FLOW_CONTEXT_RULES,
  ...FLOW_STYLE_RULES,
  ...HEADING_VOICE_RULES,
  ...LANGUAGE_VOICE_RULES,
  ...LANGUAGE_CALQUE_RULES,
  ...NAVIGATION_VOICE_RULES,
  ...AMBIGUITY_VOICE_RULES,
  ...REPORTING_VOICE_RULES,
  ...VISIBILITY_VOICE_RULES,
  ...PEDAGOGY_VOICE_RULES,
] satisfies readonly LessonVoiceRule[];

const METADATA_START_PATTERN = /^export const metadata\s*=\s*\{\s*$/u;
const METADATA_DESCRIPTION_PATTERN = /^\s*description:\s*"[^"]*"\s*,?\s*$/u;
const METADATA_DESCRIPTION_KEY_PATTERN = /^\s*description:\s*$/u;
const METADATA_STRING_VALUE_PATTERN = /^\s*"[^"]*"\s*,?\s*$/u;
const METADATA_END_PATTERN = /^\s*\};\s*$/u;
const CODE_FENCE_PATTERN = /^\s*(```|~~~)/u;
const BLOCKQUOTE_PATTERN = /^\s*>/u;
const UNESCAPED_BACKTICK_PATTERN = /(?<!\\)`/gu;
const REPETITIVE_OPENER_LIMIT = 2;
const SECTION_HEADING_PATTERN = /^(#{2,6})\s+(.+)$/u;
const EXERCISE_HEADING_PATTERNS: Record<LessonVoiceLocale, RegExp> = {
  de: /^(?:Aufgaben|Übung|Übungen)$/iu,
  en: /^(?:Exercise|Exercises|Practice)$/iu,
  id: /^(?:Latihan|Latihan Mandiri)$/iu,
};

/** Collects lines inside an explicit exercise section. */
function exerciseSectionLines(
  locale: LessonVoiceLocale,
  source: string
): ReadonlySet<number> {
  const result = new Set<number>();
  let exerciseDepth: number | undefined;
  for (const [lineIndex, line] of source.split("\n").entries()) {
    const heading = SECTION_HEADING_PATTERN.exec(line);
    if (heading) {
      const [, marker, label] = heading;
      if (!(marker && label)) {
        continue;
      }
      const depth = marker.length;
      if (exerciseDepth !== undefined && depth <= exerciseDepth) {
        exerciseDepth = undefined;
      }
      if (EXERCISE_HEADING_PATTERNS[locale].test(label.trim())) {
        exerciseDepth = depth;
      }
      continue;
    }
    if (exerciseDepth !== undefined) {
      result.add(lineIndex + 1);
    }
  }
  return result;
}

/** Creates the mutable parser state used across lesson source lines. */
function createLineState(): LineState {
  return {
    expectsMetadataDescriptionValue: false,
    inCodeFence: false,
    inMetadata: false,
    inTemplateLiteral: false,
  };
}

/** Classifies one line before prose and structural rules are applied. */
function classifyLine(line: string, state: LineState): LineContext {
  if (METADATA_START_PATTERN.test(line)) {
    state.inMetadata = true;
  }
  const isCodeFence = CODE_FENCE_PATTERN.test(line);
  if (isCodeFence) {
    state.inCodeFence = !state.inCodeFence;
  }
  const hasOddBacktickCount =
    [...line.matchAll(UNESCAPED_BACKTICK_PATTERN)].length % 2 === 1;
  const isTemplateLiteralLine = state.inTemplateLiteral || hasOddBacktickCount;
  const isProtectedRegion =
    state.inMetadata ||
    state.inCodeFence ||
    isCodeFence ||
    isTemplateLiteralLine;
  const isMetadataDescription =
    state.inMetadata &&
    (METADATA_DESCRIPTION_PATTERN.test(line) ||
      (state.expectsMetadataDescriptionValue &&
        METADATA_STRING_VALUE_PATTERN.test(line)));
  return {
    hasOddBacktickCount,
    isMetadataDescription,
    isProtectedRegion,
  };
}

/** Matches all selected prose rules against one masked source line. */
function matchLineRules(
  rules: readonly LessonVoiceRule[],
  locale: LessonVoiceLocale,
  searchableLine: string,
  originalLine: string,
  lineNumber: number
): LessonVoiceIssue[] {
  return rules.flatMap((rule) => {
    const match = rule.patterns[locale]?.exec(searchableLine);
    if (match?.index === undefined) {
      return [];
    }
    return [
      {
        column: match.index + 1,
        excerpt: originalLine.trim(),
        line: lineNumber,
        rule: rule.id,
      },
    ];
  });
}

/** Records repeated opener matches for the lesson-level frequency limit. */
function recordRepetitiveOpeners(
  matchesByRule: Map<string, LessonVoiceIssue[]>,
  locale: LessonVoiceLocale,
  searchableLine: string,
  originalLine: string,
  lineNumber: number
): void {
  for (const issue of matchLineRules(
    REPETITIVE_OPENER_RULES,
    locale,
    searchableLine,
    originalLine,
    lineNumber
  )) {
    matchesByRule.get(issue.rule)?.push(issue);
  }
}

/** Advances metadata and template-literal state after scanning one line. */
function finishLine(
  line: string,
  state: LineState,
  context: LineContext
): void {
  if (context.isMetadataDescription) {
    state.expectsMetadataDescriptionValue = false;
  } else if (state.inMetadata && METADATA_DESCRIPTION_KEY_PATTERN.test(line)) {
    state.expectsMetadataDescriptionValue = true;
  }
  if (state.inMetadata && METADATA_END_PATTERN.test(line)) {
    state.inMetadata = false;
    state.expectsMetadataDescriptionValue = false;
  }
  if (context.hasOddBacktickCount) {
    state.inTemplateLiteral = !state.inTemplateLiteral;
  }
}

/** Scans one source line and preserves rule order for stable diagnostics. */
function inspectLessonLine(
  locale: LessonVoiceLocale,
  line: string,
  lineNumber: number,
  state: LineState,
  matchesByRule: Map<string, LessonVoiceIssue[]>
): LessonVoiceIssue[] {
  const context = classifyLine(line, state);
  const isImmutableBlockquote = BLOCKQUOTE_PATTERN.test(line);
  const issues = findStructuralIssues(
    locale,
    line,
    lineNumber,
    state,
    context.isProtectedRegion
  );
  if (
    !(context.isProtectedRegion || isImmutableBlockquote) ||
    context.isMetadataDescription
  ) {
    const searchableLine = maskProtectedInlineContent(line);
    issues.push(
      ...matchLineRules(
        LESSON_VOICE_RULES,
        locale,
        searchableLine,
        line,
        lineNumber
      )
    );
    if (!(context.isProtectedRegion || isImmutableBlockquote)) {
      recordRepetitiveOpeners(
        matchesByRule,
        locale,
        searchableLine,
        line,
        lineNumber
      );
    }
  }
  finishLine(line, state, context);
  return issues;
}

/** Preserves stable order while merging line and AST findings at one offset. */
function deduplicateIssues(issues: LessonVoiceIssue[]): LessonVoiceIssue[] {
  const keys = new Set<string>();
  return issues.filter((issue) => {
    const key = `${issue.rule}:${issue.line}:${issue.column}`;
    if (keys.has(key)) {
      return false;
    }
    keys.add(key);
    return true;
  });
}

/** Returns deterministic lesson voice issues with exact source locations. */
export function findLessonVoiceIssues(
  locale: string,
  source: string,
  tree?: MdxNode
): LessonVoiceIssue[] {
  if (!isLessonVoiceLocale(locale)) {
    throw new TypeError(`Unsupported lesson locale: ${locale}`);
  }
  const issues: LessonVoiceIssue[] = [];
  const matchesByRule = new Map<string, LessonVoiceIssue[]>(
    REPETITIVE_OPENER_RULES.map(({ id }): [string, LessonVoiceIssue[]] => [
      id,
      [],
    ])
  );
  const state = createLineState();
  for (const [lineIndex, line] of source.split("\n").entries()) {
    issues.push(
      ...inspectLessonLine(locale, line, lineIndex + 1, state, matchesByRule)
    );
  }
  for (const matches of matchesByRule.values()) {
    issues.push(...matches.slice(REPETITIVE_OPENER_LIMIT));
  }
  const parsedTree = tree ?? parseLessonMdx(source);
  issues.push(
    ...findVisibleProseRuleIssues(
      locale,
      source,
      parsedTree,
      LESSON_VOICE_RULES
    ),
    ...findPlainMathLabelIssues(source, parsedTree),
    ...findMalformedLatexCommandIssues(source, parsedTree)
  );
  const exerciseLines = exerciseSectionLines(locale, source);
  return deduplicateIssues(issues).filter(
    ({ line, rule }) =>
      rule !== "abrupt-scenario-imperative" || !exerciseLines.has(line)
  );
}
