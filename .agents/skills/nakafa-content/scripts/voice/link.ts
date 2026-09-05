import assert from "node:assert/strict";

import type { MdxNode } from "#nakafa-content/mdx/parse";
import { renderedNodeRange } from "#nakafa-content/mdx/rendered";
import { unanchoredGermanFormalAddressOffset } from "#nakafa-content/voice/address";
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
  context: MdxNode,
  source: string
): boolean {
  const linkStart = node.position?.start?.offset;
  const linkEnd = node.position?.end?.offset;
  assert.ok(linkStart !== undefined);
  assert.ok(linkEnd !== undefined);
  const rendered = renderedNodeRange(context, source)?.rendered;
  assert.ok(rendered);
  const prefix = rendered.text
    .split("")
    .filter((_character, index) => {
      const offset = rendered.offsets[index];
      assert.ok(offset !== undefined);
      return offset < linkStart;
    })
    .join("");
  const directAddress = unanchoredGermanFormalAddressOffset(rendered.text);
  const directSourceOffset =
    directAddress === undefined ? undefined : rendered.offsets[directAddress];
  return (
    (directSourceOffset !== undefined &&
      directSourceOffset >= linkStart &&
      directSourceOffset < linkEnd) ||
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
  context: MdxNode | undefined
): void {
  const range = renderedNodeRange(node, source);
  if (!range) {
    return;
  }
  assert.ok(context);
  const allowUnanchoredAddress = allowsUnanchoredAddress(node, context, source);
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
