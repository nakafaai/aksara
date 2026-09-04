import type { MdxNode } from "#nakafa-content/mdx/parse";
import { renderedNodeRange } from "#nakafa-content/mdx/rendered";
import type { ProseState } from "#nakafa-content/voice/copy";
import {
  addressRules,
  matchRangeRules,
  matchUnanchoredGermanAddress,
} from "#nakafa-content/voice/match";
import type {
  LessonVoiceIssue,
  LessonVoiceLocale,
  LessonVoiceRule,
} from "#nakafa-content/voice/types";

/** Checks one JSX child range after combining its rendered text leaves. */
export function collectJsxChildAddressIssues(
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
  const range = renderedNodeRange(node, source);
  if (!range) {
    return;
  }
  const selectedAddressRules = addressRules(rules);
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
      {
        allowPersonalAddress: !state.germanPersonalAntecedent,
        allowPossessiveAddress: !state.germanPossessiveAntecedent,
        quotationRanges: state.quotationRanges,
      }
    )
  );
}
