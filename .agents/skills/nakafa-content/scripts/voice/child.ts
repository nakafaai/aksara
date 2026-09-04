import type { MdxNode } from "#nakafa-content/mdx/parse";
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

/** Checks learner-visible text children that line scanning cannot anchor. */
export function collectTextAddressIssues(
  locale: LessonVoiceLocale,
  node: MdxNode,
  rules: readonly LessonVoiceRule[],
  source: string,
  issues: LessonVoiceIssue[],
  state: ProseState
): void {
  if (node.type !== "text") {
    return;
  }
  const selectedAddressRules = addressRules(rules);
  issues.push(
    ...matchRangeRules(
      locale,
      source,
      node.position,
      selectedAddressRules,
      false,
      state.quotationRanges
    ),
    ...matchUnanchoredGermanAddress(
      locale,
      source,
      node.position,
      selectedAddressRules,
      {
        allowPersonalAddress: !state.germanPersonalAntecedent,
        allowPossessiveAddress: !state.germanPossessiveAntecedent,
        quotationRanges: state.quotationRanges,
      }
    )
  );
}
