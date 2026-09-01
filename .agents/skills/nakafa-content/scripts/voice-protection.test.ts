import assert from "node:assert/strict";
import test from "node:test";

import { findLessonVoiceIssues } from "#nakafa-content/voice-scan";

test("preserves parsed quotations comments and non-prose component fields", () => {
  const source = [
    "> Integral tak tentu memuat",
    "keluarga antiturunan.",
    "",
    "{/* Genom virus mengambil alih kerja sel inang. */}",
    "",
    "<CodeBlock",
    '  code={"Genom virus mengambil alih kerja sel inang."}',
    "/>",
    "",
    "<Plot",
    '  config={{ note: "Integral tak tentu memuat keluarga antiturunan." }}',
    "/>",
    "",
    "<InlineMath",
    '  math={"Genom virus mengambil alih kerja sel inang."}',
    "/>",
  ].join("\n");

  assert.deepEqual(findLessonVoiceIssues("id", source), []);
});
