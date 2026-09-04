import { assert, it } from "@effect/vitest";

import { isBlockingLessonVoiceIssue } from "#nakafa-content/voice/policy";
import type { LessonVoiceIssue } from "#nakafa-content/voice/types";

const blockingRules = [
  "abstract-concept-question-personification",
  "abrupt-scenario-imperative",
  "compressed-renewable-timescale-contrast",
  "corrective-decoration-metaphor",
  "chemical-formula-personification",
  "decorative-picture-to-calculation",
  "duplicate-adjacent-word",
  "empty-example-preface",
  "evidence-carrying-metaphor",
  "exact-line-smoothing",
  "external-link-invalid-placement",
  "forbidden-control-character",
  "german-formal-address",
  "heading-symbol",
  "indonesian-mathematical-family-calque",
  "indonesian-detached-discussion-passive",
  "indonesian-meta-discussion-classification",
  "indonesian-ambiguous-calculation-reference",
  "indonesian-attached-dimana",
  "indonesian-bare-modal-adjective",
  "indonesian-bare-visibility-adverb",
  "indonesian-dimensional-container-calque",
  "indonesian-floor-division-calque",
  "indonesian-formal-author-self-reference",
  "indonesian-formal-learner-address",
  "indonesian-heading-dehyphenated-reduplication",
  "indonesian-informal-slang",
  "indonesian-mechanical-input-constraint-calque",
  "indonesian-nonstandard-affix",
  "indonesian-nonstandard-apapun",
  "indonesian-nonstandard-compound",
  "indonesian-nonstandard-mempengaruhi",
  "indonesian-plural-learner-address",
  "indonesian-relative-di-mana",
  "indonesian-stiff-interpret-instruction",
  "indonesian-stiff-serampangan",
  "indonesian-trailing-bare-range",
  "indonesian-uncertainty-propagation-calque",
  "indonesian-unit-cancellation-calque",
  "indonesian-unexplained-regularization-calque",
  "indonesian-water-ratio-gateway",
  "irrelevant-fiction-label",
  "learner-facing-semicolon",
  "locale-representation-parity",
  "malformed-latex-command",
  "plain-math-label",
  "known-decorative-science-heading",
  "redirected-cell-machinery-metaphor",
  "rhetorical-not-only",
  "source-navigation-filler",
  "unexplained-output-scheduling",
  "unqualified-energy-density-claim",
  "unqualified-fuel-storage-claim",
  "unsupported-evaluative-preface",
  "vague-benefit-risk-reference",
];

/** Builds a minimal issue for policy classification tests. */
function issue(rule: string): LessonVoiceIssue {
  return { column: 1, excerpt: rule, line: 1, rule };
}

it("blocks every reviewed release-gate rule", () => {
  for (const rule of blockingRules) {
    assert.equal(isBlockingLessonVoiceIssue(issue(rule)), true, rule);
  }

  assert.equal(
    isBlockingLessonVoiceIssue(issue("indonesian-transformation-image-calque")),
    false
  );
  assert.equal(
    isBlockingLessonVoiceIssue(issue("indonesian-causative-modal")),
    false
  );
  assert.equal(
    isBlockingLessonVoiceIssue(issue("invented-learning-setting")),
    false
  );
  assert.equal(isBlockingLessonVoiceIssue(issue("curriculum-narrator")), false);
});
