import { assert, it } from "@effect/vitest";

import { findLessonVoiceIssues } from "#nakafa-content/voice/scan";

it("rejects a demonstrative heading that leaves its referent unstated", () => {
  const cases = [
    [
      "id",
      "## Ciri yang Menentukan Matriks Ini",
      "## Ciri Matriks Ortogonal dan Uniter",
    ],
    [
      "en",
      "## What Defines These Matrices",
      "## What Makes a Matrix Orthogonal or Unitary",
    ],
    [
      "en",
      "## Evaluating Such Functions",
      "## Evaluating Reciprocal Functions",
    ],
    [
      "de",
      "## Was diese Matrizen auszeichnet",
      "## Was eine Matrix orthogonal oder unitär macht",
    ],
  ] as const;

  for (const [locale, rejected, allowed] of cases) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, `${rejected}\n\n${allowed}`).map(
        ({ line, rule }) => ({ line, rule })
      ),
      [{ line: 1, rule: "heading-demonstrative-reference" }]
    );
  }
});

it("keeps relative references out of the demonstrative rule", () => {
  const english = [
    "## Objects That Yield Items One at a Time",
    "## Keywords That Cannot Be Used",
    "## A Matrix That Cannot Be Diagonalized",
    "## Nepotism and Its Forms",
    "## Graph of a Function and Its Inverse",
  ].join("\n");

  assert.deepEqual(findLessonVoiceIssues("en", english), []);

  const german = "## Was der Beobachter sieht ist der Unterschied";

  assert.deepEqual(
    findLessonVoiceIssues("de", german).map(({ rule }) => rule),
    ["german-heading-dependent-clause"]
  );
});
