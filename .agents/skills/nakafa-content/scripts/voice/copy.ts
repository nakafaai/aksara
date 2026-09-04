import assert from "node:assert/strict";

import type { MdxNode, SourceRange } from "#nakafa-content/mdx/parse";
import {
  addressAttributeRanges,
  generalAttributeRanges,
  renderedExpressionRanges,
} from "#nakafa-content/mdx/ranges";
import {
  addressRules,
  matchRangeRules,
  matchUnanchoredGermanAddress,
} from "#nakafa-content/voice/match";
import type { InlineQuotationRange } from "#nakafa-content/voice/text";
import type {
  LessonVoiceIssue,
  LessonVoiceLocale,
  LessonVoiceRule,
} from "#nakafa-content/voice/types";

const NEWLINE_PATTERN = /[\r\n]/u;

export interface ProseState {
  germanPersonalAntecedent: boolean;
  germanPossessiveAntecedent: boolean;
  quotationRanges: readonly InlineQuotationRange[];
}

/** Adds only phrase matches that genuinely cross a soft paragraph wrap. */
export function collectParagraphIssues(
  locale: LessonVoiceLocale,
  node: MdxNode,
  rules: readonly LessonVoiceRule[],
  source: string,
  issues: LessonVoiceIssue[],
  state: ProseState
): void {
  const start = node.position?.start?.offset;
  const end = node.position?.end?.offset;
  if (
    node.type === "paragraph" &&
    start !== undefined &&
    end !== undefined &&
    NEWLINE_PATTERN.test(source.slice(start, end))
  ) {
    issues.push(
      ...matchRangeRules(
        locale,
        source,
        node.position,
        rules,
        true,
        state.quotationRanges
      )
    );
  }
}

/** Creates one stable identity for comparing two authored source ranges. */
function rangeKey(range: SourceRange): string {
  return `${String(range.start?.offset)}:${String(range.end?.offset)}`;
}

/** Adds general prose and address-only matches from learner-visible JSX props. */
export function collectAttributeIssues(
  locale: LessonVoiceLocale,
  node: MdxNode,
  rules: readonly LessonVoiceRule[],
  source: string,
  issues: LessonVoiceIssue[],
  state: ProseState
): void {
  if (node.type !== "mdxJsxFlowElement" && node.type !== "mdxJsxTextElement") {
    return;
  }
  const selectedAddressRules = addressRules(rules);
  assert.ok(node.attributes);
  for (const attribute of node.attributes) {
    const generalRanges = generalAttributeRanges(attribute, source);
    for (const range of generalRanges) {
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
          quotationRanges: state.quotationRanges,
        })
      );
    }
    const generalKeys = new Set(generalRanges.map(rangeKey));
    for (const range of addressAttributeRanges(attribute, source)) {
      if (generalKeys.has(rangeKey(range))) {
        continue;
      }
      issues.push(
        ...matchRangeRules(
          locale,
          source,
          range,
          selectedAddressRules,
          false,
          state.quotationRanges
        ),
        ...matchUnanchoredGermanAddress(
          locale,
          source,
          range,
          selectedAddressRules,
          { quotationRanges: state.quotationRanges }
        )
      );
    }
  }
}

/** Adds rule matches from a static expression rendered in the lesson body. */
export function collectRenderedExpressionIssues(
  locale: LessonVoiceLocale,
  node: MdxNode,
  rules: readonly LessonVoiceRule[],
  source: string,
  issues: LessonVoiceIssue[],
  state: ProseState
): void {
  for (const range of renderedExpressionRanges(node, source)) {
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
        quotationRanges: state.quotationRanges,
      })
    );
  }
}
