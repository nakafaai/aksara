import type { SourceRange } from "#nakafa-content/mdx/parse";
import {
  establishedGermanFormalSentenceOffset,
  unanchoredGermanFormalAddressOffset,
} from "#nakafa-content/voice/address";
import {
  type InlineQuotationRange,
  maskBalancedQuotations,
  maskMultilineQuotations,
  maskProtectedInlineContent,
} from "#nakafa-content/voice/text";
import type {
  LessonVoiceIssue,
  LessonVoiceLocale,
  LessonVoiceRule,
} from "#nakafa-content/voice/types";

const ADDRESS_RULE_IDS = new Set([
  "german-formal-address",
  "indonesian-formal-author-self-reference",
  "indonesian-formal-learner-address",
  "indonesian-plural-learner-address",
]);
const NEWLINE_PATTERN = /[\r\n]/u;

/** Keeps only rules that enforce Nakafa's direct learner register. */
export function addressRules(
  rules: readonly LessonVoiceRule[]
): LessonVoiceRule[] {
  return rules.filter(({ id }) => ADDRESS_RULE_IDS.has(id));
}

/** Returns one lesson issue at an exact source offset. */
function issueAtOffset(
  source: string,
  offset: number,
  rule: string
): LessonVoiceIssue {
  const lineStart = source.lastIndexOf("\n", offset - 1) + 1;
  const lineEndIndex = source.indexOf("\n", offset);
  const lineEnd = lineEndIndex === -1 ? source.length : lineEndIndex;
  return {
    column: offset - lineStart + 1,
    excerpt: source.slice(lineStart, lineEnd).trim(),
    line: source.slice(0, lineStart).split("\n").length,
    rule,
  };
}

/** Matches every selected rule once inside one learner-visible source range. */
export function matchRangeRules(
  locale: LessonVoiceLocale,
  source: string,
  range: SourceRange | undefined,
  rules: readonly LessonVoiceRule[],
  requireNewline = false,
  quotationRanges: readonly InlineQuotationRange[] = []
): LessonVoiceIssue[] {
  const start = range?.start?.offset;
  const end = range?.end?.offset;
  if (start === undefined || end === undefined) {
    return [];
  }
  const original = source.slice(start, end);
  const searchable = maskProtectedInlineContent(
    maskMultilineQuotations(original, start, quotationRanges)
  );
  return rules.flatMap((rule) => {
    const pattern = rule.patterns[locale];
    if (!pattern) {
      return [];
    }
    const ruleText = rule.protectInlineQuotations
      ? maskBalancedQuotations(searchable)
      : searchable;
    const normalizedRuleText = ruleText.replace(/[\r\n]/gu, " ");
    pattern.lastIndex = 0;
    const match = pattern.exec(normalizedRuleText);
    if (match?.index === undefined) {
      return [];
    }
    if (
      requireNewline &&
      !NEWLINE_PATTERN.test(
        original.slice(match.index, match.index + match[0].length)
      )
    ) {
      return [];
    }
    return [issueAtOffset(source, start + match.index, rule.id)];
  });
}

/** Flags formal German address when a standalone copy range has no antecedent. */
export function matchUnanchoredGermanAddress(
  locale: LessonVoiceLocale,
  source: string,
  range: SourceRange | undefined,
  rules: readonly LessonVoiceRule[],
  options: {
    allowPersonalAddress?: boolean;
    allowPossessiveAddress?: boolean;
    continueEstablishedAddress?: boolean;
    enabled?: boolean;
    quotationRanges?: readonly InlineQuotationRange[];
  } = {}
): LessonVoiceIssue[] {
  if (
    options.enabled === false ||
    locale !== "de" ||
    !rules.some(({ id }) => id === "german-formal-address")
  ) {
    return [];
  }
  const start = range?.start?.offset;
  const end = range?.end?.offset;
  if (start === undefined || end === undefined) {
    return [];
  }
  const original = source.slice(start, end);
  const searchable = maskBalancedQuotations(
    maskProtectedInlineContent(
      maskMultilineQuotations(original, start, options.quotationRanges ?? [])
    )
  ).replace(/[\r\n]/gu, " ");
  const formalPattern = rules.find(({ id }) => id === "german-formal-address")
    ?.patterns.de;
  if (formalPattern) {
    formalPattern.lastIndex = 0;
  }
  const directOffset = unanchoredGermanFormalAddressOffset(
    searchable,
    options.allowPossessiveAddress,
    options.allowPersonalAddress
  );
  const continuedOffset =
    options.continueEstablishedAddress && formalPattern?.test(searchable)
      ? establishedGermanFormalSentenceOffset(searchable)
      : undefined;
  const addressOffset = directOffset ?? continuedOffset;
  return addressOffset === undefined
    ? []
    : [issueAtOffset(source, start + addressOffset, "german-formal-address")];
}
