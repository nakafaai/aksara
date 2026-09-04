import { assert, it } from "@effect/vitest";

import { findLessonVoiceIssues } from "#nakafa-content/voice/scan";
import {
  maskBalancedQuotations,
  maskMetadataDescriptionQuotations,
  maskMultilineQuotations,
  maskProtectedInlineContent,
  multilineQuotationRanges,
  protectedInlineRanges,
} from "#nakafa-content/voice/text";

it("maps and masks protected inline syntax at stable columns", () => {
  const source = 'Read `Sie` and title="Anda".';
  assert.deepEqual(protectedInlineRanges(source), [
    { end: 10, start: 5 },
    { end: 27, start: 15 },
  ]);
  assert.equal(
    maskProtectedInlineContent(source),
    "Read       and             ."
  );
});

it("restarts asymmetric quotations at a nested opener", () => {
  const source = "“outer “nested\nquote”";
  assert.deepEqual(multilineQuotationRanges(source), [
    { end: source.length, start: source.indexOf("“", 1) },
  ]);
});

it("finds and masks straight multiline quotations at source boundaries", () => {
  const source = '"first\nsecond"';
  const ranges = [{ end: source.length, start: 0 }];
  assert.deepEqual(multilineQuotationRanges(source), ranges);
  assert.equal(maskBalancedQuotations(source), " ".repeat(source.length));
  assert.equal(maskMultilineQuotations("outside", 20, ranges), "outside");
});

it("leaves incomplete metadata string syntax unchanged", () => {
  assert.equal(
    maskMetadataDescriptionQuotations("description: value"),
    "description: value"
  );
  assert.equal(
    maskMetadataDescriptionQuotations('description: "value'),
    'description: "value'
  );
});

it("protects multiline typographic quotations and resumes after closing", () => {
  const germanQuote =
    "Der historische Text lautet „Wandeln Sie\ndie Gleichung um“.";
  const indonesianQuote = "Kalimat “Nama saya\nSari” sedang dikutip.";
  assert.deepEqual(findLessonVoiceIssues("de", germanQuote), []);
  assert.deepEqual(findLessonVoiceIssues("id", indonesianQuote), []);

  const germanOutside =
    "Der historische Text lautet „Wandeln Sie\ndie Gleichung um“. Wandeln Sie danach die neue Gleichung um.";
  const indonesianOutside =
    "Kalimat “Nama saya\nSari” sedang dikutip. Sekarang saya jelaskan maknanya.";
  const germanOutsideLine = germanOutside.split("\n").at(1);
  const indonesianOutsideLine = indonesianOutside.split("\n").at(1);
  assert.ok(germanOutsideLine);
  assert.ok(indonesianOutsideLine);
  assert.deepEqual(findLessonVoiceIssues("de", germanOutside), [
    {
      column: germanOutsideLine.indexOf("Sie") + 1,
      excerpt: germanOutsideLine,
      line: 2,
      rule: "german-formal-address",
    },
  ]);
  assert.deepEqual(findLessonVoiceIssues("id", indonesianOutside), [
    {
      column: indonesianOutsideLine.lastIndexOf("saya") + 1,
      excerpt: indonesianOutsideLine,
      line: 2,
      rule: "indonesian-formal-author-self-reference",
    },
  ]);

  const germanUnclosed =
    "Der Text beginnt „Wandeln Sie\nDann sollten Sie die Tabelle ausfüllen.";
  const indonesianUnclosed =
    "Kalimat “Nama saya\nSari belum selesai. Sekarang saya jelaskan.";
  assert.deepEqual(
    findLessonVoiceIssues("de", germanUnclosed).map(({ line, rule }) => ({
      line,
      rule,
    })),
    [
      { line: 1, rule: "german-formal-address" },
      { line: 2, rule: "german-formal-address" },
    ]
  );
  assert.deepEqual(
    findLessonVoiceIssues("id", indonesianUnclosed).map(({ line, rule }) => ({
      line,
      rule,
    })),
    [
      { line: 1, rule: "indonesian-formal-author-self-reference" },
      { line: 2, rule: "indonesian-formal-author-self-reference" },
    ]
  );
});
