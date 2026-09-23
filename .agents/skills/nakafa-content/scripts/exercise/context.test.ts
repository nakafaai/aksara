import { assert, it } from "@effect/vitest";

import {
  exerciseSectionLines,
  isExerciseHeading,
  isSolutionHeading,
} from "#nakafa-content/exercise/context";
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

it("recognizes the current corpus exercise and solution titles without broad matching", () => {
  const cases: readonly [LessonVoiceLocale, string, string][] = [
    ["id", "Periksa Pemahamanmu", "Pembahasan"],
    ["id", "Latihan dengan Pembahasan Lengkap", "Pembahasan Lengkap"],
    ["id", "Latihan Merasionalkan", "Pembahasan Rasionalisasi Penyebut"],
    ["id", "Latihan", "Pembahasan Terperinci"],
    ["en", "Practice with Complete Solutions", "Worked Solutions"],
    [
      "en",
      "Rationalization Exercises",
      "Solutions for Rationalizing Denominators",
    ],
    ["de", "Überprüfe dein Verständnis", "Ausführliche Lösungen"],
    ["de", "Übungen mit vollständigen Lösungen", "Ausgearbeitete Lösungen"],
    [
      "de",
      "Aufgaben zum Rationalisieren",
      "Lösungen zum Rationalisieren von Nennern",
    ],
  ];
  for (const [locale, exercise, solution] of cases) {
    assert.ok(isExerciseHeading(locale, exercise));
    assert.ok(isSolutionHeading(locale, solution));
  }
  assert.isFalse(isExerciseHeading("en", "Practice with Units"));
  assert.isFalse(isSolutionHeading("en", "Solutions of Quadratic Equations"));
});
