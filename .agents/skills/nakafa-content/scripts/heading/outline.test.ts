import { assert, it } from "@effect/vitest";
import { findOutlineIssues } from "#nakafa-content/heading/outline";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";
import type { LessonVoiceLocale } from "#nakafa-content/voice/types";

const BODY = "A full paragraph teaches the idea before the next heading.";

/** Builds one lesson body from its headings, each followed by a paragraph. */
function lesson(headings: readonly string[]): string {
  return headings.map((heading) => `${heading}\n\n${BODY}`).join("\n\n");
}

/** The rule and line of every outline finding in one lesson. */
function outline(source: string, locale: LessonVoiceLocale = "en"): string[] {
  return findOutlineIssues(source, parseLessonMdx(source), locale).map(
    ({ line, rule }) => `${rule} ${line}`
  );
}

it("accepts a lesson whose sections hold no subsection or at least two", () => {
  assert.deepEqual(
    outline(
      lesson([
        "## Answer",
        "## Method",
        "### First Case",
        "### Second Case",
        "## Common Mistakes",
      ])
    ),
    []
  );
});

it("reports the single subsection of a section at its own line", () => {
  assert.deepEqual(
    outline(
      lesson([
        "## Answer",
        "## Method",
        "### Only Case",
        "## Common Mistakes",
        "### Mistake",
        "#### Deeper Note",
      ])
    ),
    ["lone-subsection 9", "lone-subsection 17"]
  );
});

it("keeps a single worked-solution subsection in every locale", () => {
  const cases = [
    ["en", "## Exercises", "### Worked Solutions"],
    ["id", "## Latihan", "### Pembahasan"],
    ["de", "## Übungen", "### Lösungen"],
    ["ms", "## Latihan", "### Penyelesaian"],
  ] as const;
  for (const [locale, exercise, solutions] of cases) {
    const source = lesson(["## Answer", "## Method", exercise, solutions]);
    assert.deepEqual(outline(source, locale), [], locale);
  }
  assert.deepEqual(
    outline(lesson(["## Answer", "## Example", "### Answers", "## Method"])),
    []
  );
  assert.deepEqual(
    outline(lesson(["## Answer", "## Method", "## Exercises", "### Hint"])),
    ["lone-subsection 13"]
  );
});

it("reports a flat lesson with fewer than three sections at its first section", () => {
  assert.deepEqual(outline(lesson(["## Answer", "## Method"])), [
    "flat-outline 1",
  ]);
  assert.deepEqual(outline(BODY), []);
  assert.deepEqual(findOutlineIssues("", { type: "root" }, "en"), []);
});

it("reports a crowded lesson with more than ten sections at its eleventh", () => {
  const ten = Array.from({ length: 10 }, (_, index) => `## Section ${index}`);
  assert.deepEqual(outline(lesson(ten)), []);
  assert.deepEqual(outline(lesson([...ten, "## Section Extra"])), [
    "crowded-outline 41",
  ]);
});

it("reports a heading whose anchor an earlier heading renders", () => {
  assert.deepEqual(
    outline(
      lesson([
        "## Sudut Pusat",
        '## Nilai <InlineMath math="x" />',
        "## sudut   pusat",
        "## Nilai `x`",
        "## Sudut Keliling",
      ]),
      "id"
    ),
    ["heading-anchor 9", "heading-anchor 13"]
  );
});
