import { assert, it } from "@effect/vitest";

import { parseLessonMdx } from "#nakafa-content/mdx/parse";
import {
  findSiblingRepresentationIssues,
  lessonRepresentationTokens,
} from "#nakafa-content/voice/parity";
import type { LessonVoiceLocale } from "#nakafa-content/voice/types";

const ROOT = "/corpus";

/** Builds one parsed locale sibling for parity tests. */
function document(locale: LessonVoiceLocale, source: string) {
  const file = `${ROOT}/subject/topic/${locale}.mdx`;
  return { file, locale, source, tree: parseLessonMdx(source, file) };
}

it("accepts the same teaching structure in natural locale prose", () => {
  const siblings = [
    document("id", "## Langkah\n\n1. Baca soal\n2. Hitung hasil\n"),
    document(
      "en",
      "## Steps\n\n1. Read the problem\n2. Calculate the result\n"
    ),
    document(
      "de",
      "## Schritte\n\n1. Lies die Aufgabe\n2. Berechne das Ergebnis\n"
    ),
  ];

  assert.deepEqual(findSiblingRepresentationIssues(ROOT, siblings), []);
});

it("reports a list flattened in one locale", () => {
  const siblings = [
    document("id", "## Langkah\n\n1. Baca soal\n2. Hitung hasil\n"),
    document(
      "en",
      "## Steps\n\n1. Read the problem\n2. Calculate the result\n"
    ),
    document("de", "## Schritte\n\nLies die Aufgabe. Berechne das Ergebnis.\n"),
  ];

  assert.deepEqual(findSiblingRepresentationIssues(ROOT, siblings), [
    {
      column: 1,
      excerpt:
        "Found end of document. The id sibling has list:ordered:2 at the same teaching step.",
      file: "subject/topic/de.mdx",
      line: 1,
      locale: "de",
      rule: "locale-representation-parity",
    },
  ]);
});

it("tracks table shape and learner-facing flow components", () => {
  const tokens = lessonRepresentationTokens(
    parseLessonMdx(
      '| A | B |\n| - | - |\n| 1 | 2 |\n\n<Mermaid chart="graph TD" />\n'
    )
  );

  assert.deepEqual(
    tokens.map(({ value }) => value),
    ["table:2:2", "component:Mermaid"]
  );
});

it("allows inline math counts to follow the grammar of each locale", () => {
  const siblings = [
    document("id", 'Nilai <InlineMath math="x" /> bertambah.\n'),
    document("en", "The value increases.\n"),
    document("de", "Der Wert steigt.\n"),
  ];

  assert.deepEqual(findSiblingRepresentationIssues(ROOT, siblings), []);
});
