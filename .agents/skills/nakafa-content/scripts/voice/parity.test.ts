import { assert, it } from "@effect/vitest";

import { parseLessonMdx } from "#nakafa-content/mdx/parse";
import {
  findSiblingRepresentationIssues,
  lessonRepresentationTokens,
  lessonSiblingDocument,
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

it("tracks each learner-facing block representation and ignores inline math", () => {
  const tokens = lessonRepresentationTokens(
    parseLessonMdx(
      [
        "## Steps",
        "",
        "- Read",
        "- Calculate",
        "",
        "> Check the result.",
        "",
        "```text",
        "result",
        "```",
        "",
        '<InlineMath math="x" />',
        "",
        '<Chart title="Result" />',
      ].join("\n")
    )
  );

  assert.deepEqual(
    tokens.map(({ value }) => value),
    ["heading:2", "list:unordered:2", "blockquote", "code", "component:Chart"]
  );
});

it("reports both siblings when a pair has no majority structure", () => {
  const siblings = [
    document("en", "## Steps\n\n- Read\n- Calculate\n"),
    document("de", "## Schritte\n\n1. Lies\n2. Berechne\n"),
  ];

  assert.deepEqual(
    findSiblingRepresentationIssues(ROOT, siblings).map(
      ({ file, locale, rule }) => ({ file, locale, rule })
    ),
    [
      {
        file: "subject/topic/de.mdx",
        locale: "de",
        rule: "locale-representation-parity",
      },
      {
        file: "subject/topic/en.mdx",
        locale: "en",
        rule: "locale-representation-parity",
      },
    ]
  );
});

it("accepts an incomplete locale group and rejects unsupported filenames", () => {
  const source = "## Steps\n";
  const tree = parseLessonMdx(source);
  const english = lessonSiblingDocument("/corpus/topic/en.mdx", source, tree);

  assert.deepEqual(
    findSiblingRepresentationIssues(ROOT, english ? [english] : []),
    []
  );
  assert.deepEqual(english, {
    file: "/corpus/topic/en.mdx",
    locale: "en",
    source,
    tree,
  });
  assert.deepEqual(lessonSiblingDocument("/corpus/topic/id.mdx", source), {
    file: "/corpus/topic/id.mdx",
    locale: "id",
    source,
  });
  assert.equal(
    lessonSiblingDocument("/corpus/topic/fr.mdx", source),
    undefined
  );
});

it("parses source when callers do not already have an MDX tree", () => {
  const siblings = [
    lessonSiblingDocument("/corpus/topic/en.mdx", "## Steps\n"),
    lessonSiblingDocument("/corpus/topic/de.mdx", "## Schritte\n"),
    lessonSiblingDocument(
      "/corpus/topic/id.mdx",
      "## Langkah\n\n- Baca\n- Hitung\n"
    ),
  ].filter((sibling) => sibling !== undefined);

  assert.deepEqual(findSiblingRepresentationIssues(ROOT, siblings), [
    {
      column: 1,
      excerpt:
        "Found list:unordered:2. The en sibling has end of document at the same teaching step.",
      file: "topic/id.mdx",
      line: 3,
      locale: "id",
      rule: "locale-representation-parity",
    },
  ]);
});
