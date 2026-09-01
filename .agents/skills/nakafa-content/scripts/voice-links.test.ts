import assert from "node:assert/strict";
import test from "node:test";

import {
  findExternalLinkLabelIssues,
  findExternalLinkPlacementIssues,
} from "#nakafa-content/voice-links";
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
    "> [this source link](https://example.com) explains the quoted claim.",
  ].join("\n");

  assert.deepEqual(findExternalLinkLabelIssues("en", source), []);
  assert.deepEqual(
    findExternalLinkPlacementIssues(
      "> [OpenStax](https://example.com) explains the quoted claim."
    ),
    []
  );
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

test("rejects source chips used inside sentence grammar", () => {
  const failures = [
    "[EPA](https://example.com) explains the design goal.",
    "[EPA](https://example.com) Explains the design goal.",
    "[OpenStax](https://example.com) Biology explains cell division.",
    "Menurut [EIA](https://example.com), listrik berasal dari sumber lain.",
    "A [PubChem](https://example.com) record describes the hazard.",
    "The values published by [CIAAW](https://example.com) form a range.",
  ];

  for (const source of failures) {
    assert.deepEqual(
      findExternalLinkPlacementIssues(source).map(({ rule }) => rule),
      ["external-link-chip-in-sentence"]
    );
  }
});

test("allows citations after complete claims and explicit source lists", () => {
  const source = [
    "Electricity is a secondary energy source. [EIA](https://example.com)",
    "The first claim is sourced. [EPA](https://example.com) The explanation continues in a new sentence.",
    "Two claims share evidence. [EPA](https://example.com) [EIA](https://example.org)",
    "## Sources",
    "",
    "- [OpenStax Biology 2e](https://example.com) presents the derivation.",
  ].join("\n\n");

  assert.deepEqual(findExternalLinkPlacementIssues(source), []);
});

test("does not treat an ordinary list as an automatic source list", () => {
  assert.deepEqual(
    findExternalLinkPlacementIssues(
      "- [OpenStax Biology 2e](https://example.com) explains the process."
    ).map(({ rule }) => rule),
    ["external-link-chip-in-sentence"]
  );
});

test("checks reference-style external links", () => {
  const placeholder = [
    "[this source link][source]",
    "",
    "[source]: https://example.com",
  ].join("\n");
  const sentence = [
    "[EPA][source] Explains the design goal.",
    "",
    "[source]: https://example.com",
  ].join("\n");

  assert.deepEqual(
    findExternalLinkLabelIssues("en", placeholder).map(({ rule }) => rule),
    ["external-link-placeholder-label"]
  );
  assert.deepEqual(
    findExternalLinkPlacementIssues(sentence).map(({ rule }) => rule),
    ["external-link-chip-in-sentence"]
  );
  assert.deepEqual(
    findExternalLinkPlacementIssues(
      "[Lesson notes][source]\n\n[source]: /en/material/notes"
    ),
    []
  );
});
