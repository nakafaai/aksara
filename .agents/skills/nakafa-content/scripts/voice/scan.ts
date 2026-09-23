import type { QuestionBodyKind } from "@nakafa/aksara-contracts/question/identity";
import { findSectionBodyIssues } from "#nakafa-content/body/section";
import { findEmphasisArtifactIssues } from "#nakafa-content/emphasis/check";
import { exerciseSectionLines } from "#nakafa-content/exercise/context";
import { findUndefinedHeadingAbbreviationIssues } from "#nakafa-content/heading/abbreviation";
import { findMalformedLatexCommandIssues } from "#nakafa-content/math/command";
import { findDisplayedMathCompositionIssues } from "#nakafa-content/math/compose";
import { findPlainMathLabelIssues } from "#nakafa-content/math/label";
import {
  type MdxNode,
  parseLessonMdx,
  type SourceRange,
} from "#nakafa-content/mdx/parse";
import { unanchoredGermanFormalAddressOffset } from "#nakafa-content/voice/address";
import { findStructuralIssues } from "#nakafa-content/voice/heading";
import { UnsupportedLessonLocale } from "#nakafa-content/voice/locale";
import { REPETITIVE_OPENER_RULES } from "#nakafa-content/voice/pedagogy";
import { findVisibleProseRuleIssues } from "#nakafa-content/voice/prose";
import {
  maskRawLineProtectedContent,
  rawLineProtectedRanges,
} from "#nakafa-content/voice/protection";
import { findBlockquoteEditorialLabelIssues } from "#nakafa-content/voice/quote";
import {
  ANSWER_VOICE_RULES,
  ARTICLE_VOICE_RULES,
  LESSON_VOICE_RULES,
} from "#nakafa-content/voice/rules";
import {
  classifyLine,
  createLineState,
  finishLine,
} from "#nakafa-content/voice/state";
import {
  maskInlineQuotations,
  maskMetadataDescriptionQuotations,
  maskMultilineQuotations,
  multilineQuotationRanges,
} from "#nakafa-content/voice/text";
import {
  isLessonVoiceLocale,
  type LessonVoiceGenre,
  type LessonVoiceIssue,
  type LessonVoiceLocale,
  type LessonVoiceRule,
  type LineState,
} from "#nakafa-content/voice/types";

const REPETITIVE_OPENER_LIMIT = 2;

/** Matches all selected prose rules against one masked source line. */
function matchLineRules(
  rules: readonly LessonVoiceRule[],
  locale: LessonVoiceLocale,
  searchableLine: string,
  originalLine: string,
  lineNumber: number,
  quotationMaskedLine = maskInlineQuotations(searchableLine)
): LessonVoiceIssue[] {
  return rules.flatMap((rule) => {
    const ruleLine = rule.protectInlineQuotations
      ? quotationMaskedLine
      : searchableLine;
    const match = rule.patterns[locale]?.exec(ruleLine);
    if (
      match?.index === undefined ||
      (rule.id === "duplicate-adjacent-word" &&
        originalLine.slice(match.index, match.index + match[0].length) !==
          match[0])
    ) {
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

/** Flags formal German address at the start of standalone metadata copy. */
function matchMetadataGermanAddress(
  locale: LessonVoiceLocale,
  searchableLine: string,
  originalLine: string,
  lineNumber: number
): LessonVoiceIssue[] {
  if (locale !== "de") {
    return [];
  }
  const valueStart = searchableLine.indexOf('"') + 1;
  const addressOffset = unanchoredGermanFormalAddressOffset(
    searchableLine.slice(valueStart)
  );
  if (addressOffset === undefined) {
    return [];
  }
  return [
    {
      column: valueStart + addressOffset + 1,
      excerpt: originalLine.trim(),
      line: lineNumber,
      rule: "german-formal-address",
    },
  ];
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

/** Scans one source line and preserves rule order for stable diagnostics. */
function inspectLessonLine(
  locale: LessonVoiceLocale,
  line: string,
  lineNumber: number,
  lineOffset: number,
  protectedRanges: readonly SourceRange[],
  quotationRanges: readonly { end: number; start: number }[],
  state: LineState,
  matchesByRule: Map<string, LessonVoiceIssue[]>,
  bodyKind: QuestionBodyKind | undefined,
  voiceRules: readonly LessonVoiceRule[],
  genre: LessonVoiceGenre
): LessonVoiceIssue[] {
  const context = classifyLine(line, state);
  const issues = findStructuralIssues(
    locale,
    line,
    lineNumber,
    state,
    context.isProtectedRegion,
    bodyKind === undefined && genre === "lesson",
    genre
  );
  if (!context.isProtectedRegion || context.isMetadataDescription) {
    const searchableLine = context.isMetadataDescription
      ? maskMetadataDescriptionQuotations(line)
      : maskRawLineProtectedContent(line, lineOffset, protectedRanges);
    const quotationMaskedLine = context.isMetadataDescription
      ? searchableLine
      : maskInlineQuotations(
          maskMultilineQuotations(searchableLine, lineOffset, quotationRanges)
        );
    issues.push(
      ...matchLineRules(
        voiceRules,
        locale,
        searchableLine,
        line,
        lineNumber,
        quotationMaskedLine
      ),
      ...(context.isMetadataDescription && genre === "lesson"
        ? matchMetadataGermanAddress(locale, searchableLine, line, lineNumber)
        : [])
    );
    if (
      !context.isProtectedRegion &&
      bodyKind !== "answer" &&
      genre === "lesson"
    ) {
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
  tree?: MdxNode,
  bodyKind?: QuestionBodyKind,
  genre: LessonVoiceGenre = "lesson"
): LessonVoiceIssue[] {
  if (!isLessonVoiceLocale(locale)) {
    throw new UnsupportedLessonLocale({ locale });
  }
  const issues: LessonVoiceIssue[] = [];
  const parsedTree = tree ?? parseLessonMdx(source);
  const protectedRanges = rawLineProtectedRanges(parsedTree);
  const quotationRanges = multilineQuotationRanges(source);
  let voiceRules: readonly LessonVoiceRule[] = LESSON_VOICE_RULES;
  if (bodyKind === "answer") {
    voiceRules = ANSWER_VOICE_RULES;
  } else if (genre === "article") {
    voiceRules = ARTICLE_VOICE_RULES;
  }
  const matchesByRule = new Map<string, LessonVoiceIssue[]>(
    REPETITIVE_OPENER_RULES.map(({ id }): [string, LessonVoiceIssue[]] => [
      id,
      [],
    ])
  );
  const state = createLineState();
  let lineOffset = 0;
  for (const [lineIndex, line] of source.split("\n").entries()) {
    issues.push(
      ...inspectLessonLine(
        locale,
        line,
        lineIndex + 1,
        lineOffset,
        protectedRanges,
        quotationRanges,
        state,
        matchesByRule,
        bodyKind,
        voiceRules,
        genre
      )
    );
    lineOffset += line.length + 1;
  }
  for (const matches of matchesByRule.values()) {
    issues.push(...matches.slice(REPETITIVE_OPENER_LIMIT));
  }
  issues.push(
    ...findVisibleProseRuleIssues(locale, source, parsedTree, voiceRules),
    ...findPlainMathLabelIssues(source, parsedTree),
    ...findMalformedLatexCommandIssues(source, parsedTree),
    ...findDisplayedMathCompositionIssues(source, parsedTree),
    ...findBlockquoteEditorialLabelIssues(locale, source, parsedTree),
    ...findEmphasisArtifactIssues(source, parsedTree),
    ...(bodyKind || genre === "article"
      ? []
      : findSectionBodyIssues(source, parsedTree)),
    ...(bodyKind || genre === "article"
      ? []
      : findUndefinedHeadingAbbreviationIssues(source, parsedTree))
  );
  const exerciseLines = exerciseSectionLines(locale, source);
  return deduplicateIssues(issues).filter(
    ({ line, rule }) =>
      rule !== "abrupt-scenario-imperative" || !exerciseLines.has(line)
  );
}
