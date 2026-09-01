import type { LessonVoiceIssue } from "#nakafa-content/voice-types";

const BLOCKING_RULES = new Set([
  "compressed-renewable-timescale-contrast",
  "corrective-decoration-metaphor",
  "decorative-picture-to-calculation",
  "duplicate-adjacent-word",
  "evidence-carrying-metaphor",
  "exact-line-smoothing",
  "external-link-claim-label",
  "external-link-generic-description",
  "external-link-placeholder-label",
  "external-link-topic-label",
  "forbidden-control-character",
  "heading-symbol",
  "indonesian-ambiguous-calculation-reference",
  "indonesian-attached-dimana",
  "indonesian-bare-modal-adjective",
  "indonesian-bare-visibility-adverb",
  "indonesian-dimensional-container-calque",
  "indonesian-floor-division-calque",
  "indonesian-heading-dehyphenated-reduplication",
  "indonesian-informal-slang",
  "indonesian-nonstandard-affix",
  "indonesian-nonstandard-apapun",
  "indonesian-nonstandard-compound",
  "indonesian-nonstandard-mempengaruhi",
  "indonesian-relative-di-mana",
  "indonesian-stiff-interpret-instruction",
  "indonesian-stiff-serampangan",
  "indonesian-unit-cancellation-calque",
  "indonesian-water-ratio-gateway",
  "learner-facing-semicolon",
  "locale-representation-parity",
  "plain-math-label",
  "rhetorical-not-only",
  "source-navigation-filler",
  "unexplained-output-scheduling",
  "unqualified-energy-density-claim",
  "unqualified-fuel-storage-claim",
  "vague-benefit-risk-reference",
]);

/** Returns true only for objective constraints and proven regressions. */
export function isBlockingLessonVoiceIssue(issue: LessonVoiceIssue): boolean {
  return BLOCKING_RULES.has(issue.rule);
}
