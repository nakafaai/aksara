import { assert, it } from "@effect/vitest";
import { findLessonVoiceIssues } from "#nakafa-content/voice/scan";

it("starts blockquotes with their teaching message", () => {
  const samples = {
    de: "> Kurzer Check: Verfolge den Energiefluss.",
    en: "> Quick check: trace the energy flow.",
    id: "> Cek cepat: telusuri aliran energi.",
  } as const;

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["blockquote-editorial-label"]
    );
  }
});

it("rejects editorial labels split across inline Markdown formatting", () => {
  const samples = {
    de: {
      label: "Kurzer",
      source: "> **Kurzer Check:** Verfolge den Energiefluss.",
    },
    en: {
      label: "Quick",
      source: "> *Quick check:* trace the energy flow.",
    },
    id: {
      label: "Cek",
      source: "> **Cek** *cepat:* telusuri aliran energi.",
    },
  } as const;

  for (const [locale, { label, source }] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ column, rule }) => ({
        column,
        rule,
      })),
      [
        {
          column: source.indexOf(label) + 1,
          rule: "blockquote-editorial-label",
        },
      ]
    );
  }
});

it("maps an encoded label through a lazy blockquote continuation", () => {
  const source = "> Cek &#99;epat: mulai\nlanjutkan perhitungan.";

  assert.deepEqual(findLessonVoiceIssues("id", source), [
    {
      column: source.indexOf("Cek") + 1,
      excerpt: "> Cek &#99;epat: mulai",
      line: 1,
      rule: "blockquote-editorial-label",
    },
  ]);
});

it("allows a blockquote to state its message directly", () => {
  const samples = {
    de: "> Verfolge den Energiefluss von der Quelle zum Verbraucher.",
    en: "> Trace the energy flow from the source to the consumer.",
    id: "> Telusuri aliran energi dari sumber menuju konsumen.",
  } as const;

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(findLessonVoiceIssues(locale, source), []);
  }
});
