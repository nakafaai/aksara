import type { MdxNode } from "#nakafa-content/mdx/parse";
import type { ProseState } from "#nakafa-content/voice/copy";
import {
  matchRangeRules,
  matchUnanchoredGermanAddress,
} from "#nakafa-content/voice/match";
import type {
  LessonVoiceIssue,
  LessonVoiceLocale,
  LessonVoiceRule,
} from "#nakafa-content/voice/types";

const GERMAN_LINK_COMMAND_PREFIX_PATTERN =
  /(?:Öffne|Lies|Prüfe|Vergleiche|Sieh dir)\s*$/u;
const SENTENCE_BOUNDARY_PATTERN = /[.!?:]\s*$/u;

/** Allows locally direct link-copy checks without breaking clear anaphora. */
function allowsUnanchoredAddress(
  node: MdxNode,
  paragraphStart: number | undefined,
  source: string
): boolean {
  const linkStart = node.position?.start?.offset;
  if (linkStart === undefined || paragraphStart === undefined) {
    return false;
  }
  const prefix = source.slice(paragraphStart, linkStart);
  return (
    prefix.trim().length === 0 ||
    GERMAN_LINK_COMMAND_PREFIX_PATTERN.test(prefix) ||
    !SENTENCE_BOUNDARY_PATTERN.test(prefix)
  );
}

/** Adds selected address matches from a rendered Markdown link label only. */
export function collectLinkLabelIssues(
  locale: LessonVoiceLocale,
  node: MdxNode,
  rules: readonly LessonVoiceRule[],
  source: string,
  issues: LessonVoiceIssue[],
  state: ProseState,
  paragraphStart: number | undefined
): void {
  const allowUnanchoredAddress = allowsUnanchoredAddress(
    node,
    paragraphStart,
    source
  );
  for (const child of node.children ?? []) {
    issues.push(
      ...matchRangeRules(
        locale,
        source,
        child.position,
        rules,
        false,
        state.quotationRanges
      ),
      ...matchUnanchoredGermanAddress(locale, source, child.position, rules, {
        enabled: allowUnanchoredAddress,
        quotationRanges: state.quotationRanges,
      })
    );
  }
}
