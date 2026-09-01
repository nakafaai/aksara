import assert from "node:assert/strict";
import test from "node:test";

import { isBlockingLessonVoiceIssue } from "#nakafa-content/voice-policy";
import type { LessonVoiceIssue } from "#nakafa-content/voice-types";

const blockingRules = [
  "compressed-renewable-timescale-contrast",
  "indonesian-bare-modal-adjective",
  "indonesian-dimensional-container-calque",
  "indonesian-floor-division-calque",
  "indonesian-stiff-interpret-instruction",
  "indonesian-stiff-serampangan",
  "indonesian-unit-cancellation-calque",
  "indonesian-water-ratio-gateway",
  "locale-representation-parity",
  "rhetorical-not-only",
];

/** Builds a minimal issue for policy classification tests. */
function issue(rule: string): LessonVoiceIssue {
  return { column: 1, excerpt: rule, line: 1, rule };
}

test("blocks only proven contrast stiffness and calque regressions", () => {
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
});
