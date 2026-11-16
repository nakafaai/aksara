import { assert, it } from "@effect/vitest";
import { Effect, Path } from "effect";

import { parseLessonMdx } from "#nakafa-content/mdx/parse";
import {
  findSiblingRepresentationIssues,
  lessonRepresentationTokens,
  lessonSiblingDocument,
} from "#nakafa-content/voice/parity";
import type { LessonVoiceLocale } from "#nakafa-content/voice/types";

/** Runs one synchronous test body with Effect's POSIX path service. */
const withPath = (body: (path: Path.Path) => void) =>
  Effect.map(Path.Path, body).pipe(Effect.provide(Path.layer));

const ROOT = "/corpus";

/** The same two-step list in Indonesian and English, as natural locale prose. */
const STEPS_ID = "## Langkah\n\n1. Baca soal\n2. Hitung hasil\n";
const STEPS_EN = "## Steps\n\n1. Read the problem\n2. Calculate the result\n";

/** The files of the parity issues among the siblings, each one locale drift. */
function driftedFiles(
  path: Path.Path,
  siblings: ReturnType<typeof document>[]
) {
  const issues = findSiblingRepresentationIssues(path, ROOT, siblings);
  assert.ok(
    issues.every(({ rule }) => rule === "locale-representation-parity")
  );
  return issues.map(({ file }) => file);
}

/** Builds one parsed locale sibling for parity tests. */
function document(locale: LessonVoiceLocale, source: string) {
  const file = `${ROOT}/subject/topic/${locale}.mdx`;
  return { file, locale, source, tree: parseLessonMdx(source, file) };
}

it.effect("accepts the same teaching structure in natural locale prose", () =>
  withPath((path) => {
    const siblings = [
      document("id", STEPS_ID),
      document("en", STEPS_EN),
      document(
        "de",
        "## Schritte\n\n1. Lies die Aufgabe\n2. Berechne das Ergebnis\n"
      ),
    ];

    assert.deepEqual(findSiblingRepresentationIssues(path, ROOT, siblings), []);
  })
);

it.effect("reports a list flattened in one locale", () =>
  withPath((path) => {
    const siblings = [
      document("id", STEPS_ID),
      document("en", STEPS_EN),
      document(
        "de",
        "## Schritte\n\nLies die Aufgabe. Berechne das Ergebnis.\n"
      ),
    ];

    assert.deepEqual(findSiblingRepresentationIssues(path, ROOT, siblings), [
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
  })
);

it("tracks table shape and learner-facing flow components", () => {
  const tokens = lessonRepresentationTokens(
    parseLessonMdx(
      '| A | B |\n| - | - |\n| 1 | 2 |\n\n<Mermaid chart="graph TD" />\n'
    )
  );

  assert.deepEqual(
    tokens.map(({ value }) => value),
    ["table:2,2", "component:Mermaid"]
  );
});

it.effect("reports one shortened row even when the table maximum matches", () =>
  withPath((path) => {
    const complete = "| A | B |\n| - | - |\n| 1 | 2 |\n| 3 | 4 |\n";
    const siblings = [
      document("id", complete),
      document("en", complete),
      document("de", "| A | B |\n| - | - |\n| 1 | 2 |\n| 3 |\n"),
    ];

    assert.deepEqual(driftedFiles(path, siblings), ["subject/topic/de.mdx"]);
  })
);

it.effect(
  "allows inline math counts to follow the grammar of each locale",
  () =>
    withPath((path) => {
      const siblings = [
        document("id", 'Nilai <InlineMath math="x" /> bertambah.\n'),
        document("en", "The value increases.\n"),
        document("de", "Der Wert steigt.\n"),
      ];

      assert.deepEqual(
        findSiblingRepresentationIssues(path, ROOT, siblings),
        []
      );
    })
);

it.effect("reports a Markdown image missing from one locale", () =>
  withPath((path) => {
    const siblings = [
      document("id", "![Diagram](/diagram.svg)\n"),
      document("en", "![Diagram](/diagram.svg)\n"),
      document("de", "Das Diagramm fehlt.\n"),
    ];

    assert.deepEqual(driftedFiles(path, siblings), ["subject/topic/de.mdx"]);
  })
);

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

it.effect("reports both siblings when a pair has no majority structure", () =>
  withPath((path) => {
    const siblings = [
      document("en", "## Steps\n\n- Read\n- Calculate\n"),
      document("de", "## Schritte\n\n1. Lies\n2. Berechne\n"),
    ];

    assert.deepEqual(
      findSiblingRepresentationIssues(path, ROOT, siblings).map(
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
  })
);

it.effect(
  "accepts an incomplete locale group and rejects unsupported filenames",
  () =>
    withPath((path) => {
      const source = "## Steps\n";
      const tree = parseLessonMdx(source);
      const english = lessonSiblingDocument(
        path,
        "/corpus/topic/en.mdx",
        source,
        tree
      );

      assert.deepEqual(
        findSiblingRepresentationIssues(path, ROOT, english ? [english] : []),
        []
      );
      assert.deepEqual(english, {
        file: "/corpus/topic/en.mdx",
        locale: "en",
        source,
        tree,
      });
      assert.deepEqual(
        lessonSiblingDocument(path, "/corpus/topic/id.mdx", source),
        {
          file: "/corpus/topic/id.mdx",
          locale: "id",
          source,
        }
      );
      assert.equal(
        lessonSiblingDocument(path, "/corpus/topic/fr.mdx", source),
        undefined
      );
    })
);

it.effect("parses source when callers do not already have an MDX tree", () =>
  withPath((path) => {
    const siblings = [
      lessonSiblingDocument(path, "/corpus/topic/en.mdx", "## Steps\n"),
      lessonSiblingDocument(path, "/corpus/topic/de.mdx", "## Schritte\n"),
      lessonSiblingDocument(
        path,
        "/corpus/topic/id.mdx",
        "## Langkah\n\n- Baca\n- Hitung\n"
      ),
    ].filter((sibling) => sibling !== undefined);

    assert.deepEqual(findSiblingRepresentationIssues(path, ROOT, siblings), [
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
  })
);

it.effect(
  "compares answer siblings without borrowing the assessed question structure",
  () =>
    withPath((path) => {
      const documents = [
        {
          file: "/corpus/item/question.en.mdx",
          locale: "en" as const,
          source: "A passage.\n\n- One\n- Two",
        },
        {
          file: "/corpus/item/answer.en.mdx",
          locale: "en" as const,
          source: "#### Calculation\n\nA result.",
        },
        {
          file: "/corpus/item/answer.id.mdx",
          locale: "id" as const,
          source: "#### Perhitungan\n\nHasil.",
        },
        {
          file: "/corpus/item/answer.de.mdx",
          locale: "de" as const,
          source: "#### Rechnung\n\nErgebnis.",
        },
      ];
      assert.deepEqual(
        findSiblingRepresentationIssues(path, "/corpus", documents),
        []
      );
      const divergent = documents.at(2);
      assert.ok(divergent);
      divergent.source += "\n\n- Satu\n- Dua";
      assert.deepEqual(
        findSiblingRepresentationIssues(path, "/corpus", documents).map(
          ({ file }) => file
        ),
        ["item/answer.id.mdx"]
      );
    })
);
