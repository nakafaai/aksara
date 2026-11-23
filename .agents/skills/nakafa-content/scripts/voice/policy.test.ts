import { assert, it } from "@effect/vitest";

import { isBlockingLessonVoiceIssue } from "#nakafa-content/voice/policy";
import type { LessonVoiceIssue } from "#nakafa-content/voice/types";

const blockingRules = [
  "abstract-concept-question-personification",
  "blockquote-editorial-label",
  "chatbot-artifact",
  "clock-time-math",
  "dollar-math",
  "duplicate-adjacent-word",
  "duplicated-list-ordinal",
  "empty-example-preface",
  "external-link-invalid-placement",
  "forbidden-control-character",
  "german-formal-address",
  "heading-symbol",
  "heading-order",
  "highlight-nesting",
  "indonesian-detached-discussion-passive",
  "indonesian-meta-discussion-classification",
  "indonesian-ambiguous-calculation-reference",
  "indonesian-attached-dimana",
  "indonesian-bare-visibility-adverb",
  "indonesian-dimensional-container-calque",
  "indonesian-floor-division-calque",
  "indonesian-formal-author-self-reference",
  "indonesian-formal-learner-address",
  "indonesian-formal-request",
  "indonesian-heading-dehyphenated-reduplication",
  "indonesian-informal-slang",
  "indonesian-mechanical-input-constraint-calque",
  "indonesian-nonstandard-affix",
  "indonesian-nonstandard-apapun",
  "indonesian-nonstandard-compound",
  "indonesian-nonstandard-mempengaruhi",
  "indonesian-plural-learner-address",
  "indonesian-relative-di-mana",
  "indonesian-stiff-serampangan",
  "indonesian-trailing-bare-range",
  "indonesian-uncertainty-propagation-calque",
  "indonesian-unit-cancellation-calque",
  "indonesian-unexplained-regularization-calque",
  "internal-link-generic-label",
  "jsx-dropped-space",
  "internal-link-navigation-heading",
  "internal-link-only-block",
  "irrelevant-fiction-label",
  "knowledge-cutoff-disclaimer",
  "learner-facing-semicolon",
  "locale-representation-parity",
  "malformed-latex-command",
  "plain-math-label",
  "rhetorical-not-only",
  "source-navigation-filler",
  "sentence-punctuation-emphasis",
  "section-body-highlight",
  "unsupported-evaluative-preface",
];

const reviewOnlyRules = [
  "abrupt-scenario-imperative",
  "chemical-formula-personification",
  "compressed-renewable-timescale-contrast",
  "curriculum-narrator",
  "decorative-picture-to-calculation",
  "evidence-carrying-metaphor",
  "indonesian-causative-modal",
  "indonesian-transformation-image-calque",
  "indonesian-water-ratio-gateway",
  "invented-learning-setting",
  "known-decorative-science-heading",
  "redirected-cell-machinery-metaphor",
  "unexplained-output-scheduling",
  "unqualified-energy-density-claim",
  "unqualified-fuel-storage-claim",
  "vague-benefit-risk-reference",
  "vague-formula-gives-those",
];

/** Builds a minimal issue for policy classification tests. */
function issue(rule: string): LessonVoiceIssue {
  return { column: 1, excerpt: rule, line: 1, rule };
}

it("blocks every reviewed release-gate rule and keeps one-off legacy rules at review tier", () => {
  for (const rule of blockingRules) {
    assert.equal(isBlockingLessonVoiceIssue(issue(rule)), true, rule);
  }
  for (const rule of reviewOnlyRules) {
    assert.equal(isBlockingLessonVoiceIssue(issue(rule)), false, rule);
  }
});
