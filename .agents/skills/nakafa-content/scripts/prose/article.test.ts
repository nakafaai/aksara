import { assert, it } from "@effect/vitest";

import { parseLessonMdx } from "#nakafa-content/mdx/parse";
import { findDocumentIssues } from "#nakafa-content/voice/document";
import { findLessonVoiceIssues } from "#nakafa-content/voice/scan";
import type { LessonVoiceLocale } from "#nakafa-content/voice/types";

const METADATA = 'export const metadata = { title: "Evidence" };\n\n';

/** Runs article rules over one professional source passage. */
function articleRules(locale: LessonVoiceLocale, source: string): string[] {
  return findLessonVoiceIssues(
    locale,
    source,
    undefined,
    undefined,
    "article"
  ).map(({ rule }) => rule);
}

it("requires named provenance instead of vague research attribution", () => {
  const failures = [
    ["de", "Studien zeigen, dass der Wert gestiegen ist."],
    ["en", "Studies show that the value increased."],
    ["id", "Penelitian menunjukkan bahwa nilainya naik."],
  ] as const;
  for (const [locale, source] of failures) {
    assert.deepEqual(
      articleRules(locale, source),
      ["article-vague-attribution"],
      source
    );
  }
});

it("keeps named studies, quotations, and scientific subjects valid", () => {
  const valid = [
    ["de", "Die Studie von Lee et al. (2025) zeigt einen Anstieg des Werts."],
    ["en", "A 2025 study by Lee et al. shows that the value increased."],
    ["id", "Studi Lee et al. (2025) menunjukkan bahwa nilainya naik."],
    ["en", 'The source says, "Studies show that the value increased."'],
  ] as const;
  for (const [locale, source] of valid) {
    assert.deepEqual(articleRules(locale, source), [], source);
  }
});

it("preserves author-written charts and tables as article evidence", () => {
  const source = `${METADATA}## Measured Change

The **measured change** remains visible beside its source.

| Year | Result |
| --- | --- |
| 2025 | 4 percent |

<Chart data={[{ year: 2025, result: 4 }]} />`;
  assert.deepEqual(
    findDocumentIssues(
      "/corpus/articles/topic/article/en.mdx",
      "en",
      source,
      parseLessonMdx(source)
    ),
    []
  );
});
