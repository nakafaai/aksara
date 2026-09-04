import assert from "node:assert/strict";

import type { MdxNode } from "#nakafa-content/mdx/parse";
import { renderedNodeRange } from "#nakafa-content/mdx/rendered";
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
  contextStart: number,
  source: string
): boolean {
  const linkStart = node.position?.start?.offset;
  assert.ok(linkStart !== undefined);
  const prefix = source.slice(contextStart, linkStart);
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
  contextStart: number | undefined
): void {
  assert.ok(contextStart !== undefined);
  const allowUnanchoredAddress = allowsUnanchoredAddress(
    node,
    contextStart,
    source
  );
  const range = renderedNodeRange(node, source);
  if (!range) {
    return;
  }
  issues.push(
    ...matchRangeRules(
      locale,
      source,
      range,
      rules,
      false,
      state.quotationRanges
    ),
    ...matchUnanchoredGermanAddress(locale, source, range, rules, {
      enabled: allowUnanchoredAddress,
      quotationRanges: state.quotationRanges,
    })
  );
}
