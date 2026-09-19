import { assert, it } from "@effect/vitest";

import { findLessonHighlightIssues } from "#nakafa-content/highlight/presence";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";
import type { LessonVoiceLocale } from "#nakafa-content/voice/types";

const ROOT = "/lesson";

/** Wraps a lesson body in the static metadata declaration. */
const authored = (body: string): string =>
  `export const metadata = {};\n\n${body}`;

/** Builds one locale-qualified lesson document per source entry. */
const lesson = (sources: Record<string, string>) =>
  Object.entries(sources).map(([locale, source]) => ({
    file: `${ROOT}/topic/lesson/${locale}.mdx`,
    locale: locale as LessonVoiceLocale,
    source,
    tree: parseLessonMdx(source),
  }));

it("flags every authored locale that carries no highlight", () => {
  assert.deepEqual(
    findLessonHighlightIssues(
      ROOT,
      lesson({
        de: authored("## Abschnitt\n\nText."),
        en: authored("## Section\n\nText."),
        id: authored("## Bagian\n\nTeks."),
      })
    ).map(({ file, line, locale, rule }) => ({ file, line, locale, rule })),
    [
      {
        file: "topic/lesson/de.mdx",
        line: 1,
        locale: "de",
        rule: "lesson-without-highlight",
      },
      {
        file: "topic/lesson/en.mdx",
        line: 1,
        locale: "en",
        rule: "lesson-without-highlight",
      },
      {
        file: "topic/lesson/id.mdx",
        line: 1,
        locale: "id",
        rule: "lesson-without-highlight",
      },
    ]
  );
});

it("flags only the locale sibling that carries no highlight", () => {
  assert.deepEqual(
    findLessonHighlightIssues(
      ROOT,
      lesson({
        de: authored("## Abschnitt\n\nText."),
        en: authored(
          "## Section\n\nThe <Highlight>decisive condition</Highlight> decides."
        ),
        id: authored("## Bagian\n\nTeks."),
      })
    ).map(({ file, locale }) => ({ file, locale })),
    [
      { file: "topic/lesson/de.mdx", locale: "de" },
      { file: "topic/lesson/id.mdx", locale: "id" },
    ]
  );
});

it("accepts a lesson whose locales all carry a highlight", () => {
  assert.deepEqual(
    findLessonHighlightIssues(
      ROOT,
      lesson({
        de: authored(
          "## Abschnitt\n\nDas <Highlight>Kriterium</Highlight> gilt."
        ),
        en: authored(
          "## Section\n\nThe <Highlight>condition</Highlight> decides."
        ),
        id: authored(
          "## Bagian\n\nSyarat <Highlight>tersebut</Highlight> berlaku."
        ),
      })
    ),
    []
  );
});

it("accepts a floor carried by a highlight variant", () => {
  assert.deepEqual(
    findLessonHighlightIssues(
      ROOT,
      lesson({
        en: authored(
          '## Section\n\nThe <Highlight variant="success">met condition</Highlight> holds.'
        ),
        id: authored(
          '## Bagian\n\nSyarat <Highlight variant="warning">tersebut</Highlight> berlaku.'
        ),
      })
    ),
    []
  );
});

it("counts Markdown emphasis and rendered JSX but not marker text inside code", () => {
  const sources = [
    "The **denominator** counts every student.",
    "<Lab labels={{ body: <>The <Highlight>denominator</Highlight> counts every student.</> }} />",
    "{<Highlight>denominator</Highlight>}",
  ];
  for (const body of sources) {
    assert.deepEqual(
      findLessonHighlightIssues(ROOT, lesson({ en: authored(body) })),
      []
    );
  }
  for (const body of [
    "`<Highlight>code example</Highlight>`",
    "```mdx\n<Highlight>code example</Highlight>\n```",
    '<CodeBlock flag {...properties} data={[{ code: "<Highlight>example</Highlight>" }]} />',
    '<Lab label="unmarked" body={<>Text</>} />',
  ]) {
    assert.deepEqual(
      findLessonHighlightIssues(ROOT, lesson({ en: authored(body) })).map(
        ({ rule }) => rule
      ),
      ["lesson-without-highlight"]
    );
  }
});

it("ignores a document that declares no lesson metadata", () => {
  assert.deepEqual(
    findLessonHighlightIssues(
      ROOT,
      lesson({
        de: "## Abschnitt\n\nText.",
        en: "## Section\n\nText.",
        id: "## Bagian\n\nTeks.",
      })
    ),
    []
  );
});

it("ignores an empty document set", () => {
  assert.deepEqual(findLessonHighlightIssues(ROOT, []), []);
});

it("tolerates a sibling document without a parsed tree", () => {
  assert.deepEqual(
    findLessonHighlightIssues(ROOT, [
      {
        file: `${ROOT}/topic/lesson/en.mdx`,
        locale: "en",
        source: "## Section\n\nText.",
      },
    ]),
    []
  );
});

it("orders issues across lessons by file", () => {
  const documents = ["beta", "alpha"].map((topic) => {
    const source = authored(`## ${topic}\n\nText.`);
    return {
      file: `${ROOT}/topic/${topic}/en.mdx`,
      locale: "en" as const,
      source,
      tree: parseLessonMdx(source),
    };
  });

  assert.deepEqual(
    findLessonHighlightIssues(ROOT, documents).map(({ file }) => file),
    ["topic/alpha/en.mdx", "topic/beta/en.mdx"]
  );
});
