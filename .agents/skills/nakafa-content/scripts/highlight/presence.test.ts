import { assert, it } from "@effect/vitest";

import { findLessonHighlightIssues } from "#nakafa-content/highlight/presence";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";

const ROOT = "/lesson";

const authored = (body: string): string =>
  `export const metadata = {};\n\n${body}`;

const lesson = (sources: Record<string, string>) =>
  Object.entries(sources).map(([locale, source]) => ({
    file: `${ROOT}/topic/lesson/${locale}.mdx`,
    locale: locale as "en" | "id" | "de",
    source,
    tree: parseLessonMdx(source),
  }));

it("flags a lesson whose locales carry no highlight", () => {
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
    ]
  );
});

it("accepts a lesson once one locale carries a highlight", () => {
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
    ),
    []
  );
});

it("reports once per lesson, not once per locale file", () => {
  assert.deepEqual(
    findLessonHighlightIssues(ROOT, [
      ...lesson({
        de: authored("## Alpha\n\nText."),
        en: authored("## Alpha\n\nText."),
      }),
      ...lesson({ id: authored("## Alpha\n\nTeks.") }),
    ]).length,
    1
  );
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
