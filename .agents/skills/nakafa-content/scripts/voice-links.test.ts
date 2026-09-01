import assert from "node:assert/strict";
import test from "node:test";

import { findExternalLinkLabelIssues } from "#nakafa-content/voice-links";
import { findLessonVoiceIssues } from "#nakafa-content/voice-scan";

test("rejects placeholders claims descriptions and linked lesson topics", () => {
  const samples = {
    de: [
      "[Dieser Link](https://example.com)",
      "[Das Ministerium meldete am 2. März 2020 zwei bestätigte Fälle](https://example.com)",
      "[wissenschaftliche Übersichtsarbeit über marine Phagen](https://example.com)",
      "[Messung](https://example.com)",
      "[GBIF-Dokumentation](https://example.com)",
    ].join("\n"),
    en: [
      "[this source link](https://example.com)",
      "[The ministry reported two confirmed cases on 2 March 2020](https://example.com)",
      "[peer-reviewed review of marine phages](https://example.com)",
      "[measurement](https://example.com)",
      "[GBIF documentation](https://example.com)",
    ].join("\n"),
    id: [
      "[tautan sumber](https://example.com)",
      "[Kementerian melaporkan dua kasus terkonfirmasi pada 2 Maret 2020](https://example.com)",
      "[ulasan ilmiah tentang fag laut](https://example.com)",
      "[pengukuran](https://example.com)",
      "[Dokumentasi resmi NumPy](https://example.com)",
    ].join("\n"),
  } as const;

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findExternalLinkLabelIssues(locale as keyof typeof samples, source).map(
        ({ column, line, rule }) => ({ column, line, rule })
      ),
      [
        { column: 1, line: 1, rule: "external-link-placeholder-label" },
        { column: 1, line: 2, rule: "external-link-claim-label" },
        { column: 1, line: 3, rule: "external-link-generic-description" },
        { column: 1, line: 4, rule: "external-link-topic-label" },
        { column: 1, line: 5, rule: "external-link-generic-description" },
      ]
    );
  }
});

test("allows source names internal links and protected Markdown examples", () => {
  const source = [
    "[OpenStax Biology 2e](https://openstax.org/books/biology-2e)",
    "[International Committee on Taxonomy of Viruses](https://ictv.global)",
    "[IPCC AR6 Synthesis Report](https://www.ipcc.ch/report/ar6/syr/)",
    "[penjelasan lengkap](/id/materi/biologi)",
    "`[this source link](https://example.com)`",
    "```md",
    "[this source link](https://example.com)",
    "```",
    '<CodeBlock code="[this source link](https://example.com)" />',
  ].join("\n");

  assert.deepEqual(findExternalLinkLabelIssues("en", source), []);
});

test("rejects prose that points at a link instead of naming the source", () => {
  const samples = {
    de: "Die Quelle kann über diesen Link geöffnet werden.",
    en: "The source can be opened through this link.",
    id: "Sumbernya bisa dibuka melalui tautan ini.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["source-navigation-filler"]
    );
  }
});
