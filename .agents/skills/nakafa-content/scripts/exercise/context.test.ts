import { assert, it } from "@effect/vitest";

import { exerciseSectionLines } from "#nakafa-content/exercise/context";
import type { LessonVoiceLocale } from "#nakafa-content/voice/types";

it("tracks exercise prose through nested sections in every locale", () => {
  const cases: readonly [LessonVoiceLocale, string][] = [
    ["de", "Übungen"],
    ["en", "Practice Problems"],
    ["id", "Latihan Mandiri"],
  ];

  for (const [locale, heading] of cases) {
    const source = [
      "Introduction",
      `## ${heading}`,
      "Solve the problem.",
      "### Method",
      "Compare the result.",
      "## Summary",
      "Review the idea.",
    ].join("\n");

    assert.deepEqual([...exerciseSectionLines(locale, source)], [3, 5]);
  }
});

it("does not classify similarly named prose as an exercise section", () => {
  const source = [
    "## Practice with Units",
    "This section explains unit conversion.",
    "## Worked Example",
    "The example continues.",
  ].join("\n");

  assert.deepEqual([...exerciseSectionLines("en", source)], []);
});
