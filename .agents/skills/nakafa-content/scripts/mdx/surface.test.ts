import { assert, it } from "@effect/vitest";

import { findLessonVoiceIssues } from "#nakafa-content/voice/scan";

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

it("checks learner-visible component copy", () => {
  const source = [
    '<Callout description="Anda dapat mencoba contoh ini." />',
    '<Callout title="Sekarang saya tunjukkan langkahnya." />',
  ].join("\n");

  assert.deepEqual(
    findLessonVoiceIssues("id", source).map(({ line, rule }) => ({
      line,
      rule,
    })),
    [
      { line: 1, rule: "indonesian-formal-learner-address" },
      { line: 2, rule: "indonesian-formal-author-self-reference" },
    ]
  );
});

it("checks expression string props and fragments without duplicates", () => {
  const indonesianLine =
    '<Callout description={"Anda dapat mencoba contoh ini."} />';
  const germanExpressionLine =
    '<Callout description={"Sie können nun beide Seiten vergleichen."} />';
  const germanLine =
    "<Callout description={<>Wandeln Sie die Gleichung um.</>} />";

  assert.deepEqual(findLessonVoiceIssues("id", indonesianLine), [
    {
      column: indonesianLine.indexOf("Anda") + 1,
      excerpt: indonesianLine,
      line: 1,
      rule: "indonesian-formal-learner-address",
    },
  ]);
  assert.deepEqual(findLessonVoiceIssues("de", germanExpressionLine), [
    {
      column: germanExpressionLine.indexOf("Sie") + 1,
      excerpt: germanExpressionLine,
      line: 1,
      rule: "german-formal-address",
    },
  ]);
  assert.deepEqual(findLessonVoiceIssues("de", germanLine), [
    {
      column: germanLine.indexOf("Sie") + 1,
      excerpt: germanLine,
      line: 1,
      rule: "german-formal-address",
    },
  ]);
});

it("checks standalone rendered JSX fragment expressions", () => {
  const indonesianLine = '<> {"Anda dapat mencoba ini."} </>';
  const germanLine = '<> {"Sie sollten die Tabelle ausfüllen."} </>';

  assert.deepEqual(findLessonVoiceIssues("id", indonesianLine), [
    {
      column: indonesianLine.indexOf("Anda") + 1,
      excerpt: indonesianLine,
      line: 1,
      rule: "indonesian-formal-learner-address",
    },
  ]);
  assert.deepEqual(findLessonVoiceIssues("de", germanLine), [
    {
      column: germanLine.indexOf("Sie") + 1,
      excerpt: germanLine,
      line: 1,
      rule: "german-formal-address",
    },
  ]);
});

it("checks Markdown link labels but protects destinations", () => {
  const indonesianLine = "Baca [Panduan Anda](/id/panduan-saya).";
  const germanLine = "Öffne [Ihr Ergebnis](/de/Sie-koennen-starten).";

  assert.deepEqual(findLessonVoiceIssues("id", indonesianLine), [
    {
      column: indonesianLine.indexOf("Anda") + 1,
      excerpt: indonesianLine,
      line: 1,
      rule: "indonesian-formal-learner-address",
    },
  ]);
  assert.deepEqual(findLessonVoiceIssues("de", germanLine), [
    {
      column: germanLine.indexOf("Ihr") + 1,
      excerpt: germanLine,
      line: 1,
      rule: "german-formal-address",
    },
  ]);
  assert.deepEqual(
    findLessonVoiceIssues("id", "Baca [panduan ini](/id/Anda-dan-saya)."),
    []
  );
  assert.deepEqual(
    findLessonVoiceIssues("de", "Öffne [die Übersicht](/de/Sie-koennen)."),
    []
  );
});

it("checks emphasized headings and explicitly labelled table copy", () => {
  const source = [
    "**Sie** können beide Seiten vergleichen.",
    "## Sie können den Wert ablesen",
    "| Hinweis | Sie können die Tabelle ausfüllen |",
  ].join("\n");

  assert.deepEqual(
    findLessonVoiceIssues("de", source)
      .map(({ line, rule }) => ({ line, rule }))
      .sort((left, right) => left.line - right.line),
    [
      { line: 1, rule: "german-formal-address" },
      { line: 2, rule: "german-formal-address" },
      { line: 3, rule: "german-formal-address" },
    ]
  );
  assert.deepEqual(
    findLessonVoiceIssues(
      "de",
      "| Die Matrizen | Sie können anschließend verglichen werden |"
    ),
    []
  );
});

it("checks Markdown image alt copy but protects image destinations", () => {
  const plural = "![Kalian membandingkan hasilnya](/kalian-dan-saya.png)";
  const formal = "![Panduan Anda][gambar-anda]";
  const german = "![Sie können den Wert ablesen](/Sie-koennen.png)";

  assert.deepEqual(findLessonVoiceIssues("id", plural), [
    {
      column: plural.indexOf("Kalian") + 1,
      excerpt: plural,
      line: 1,
      rule: "indonesian-plural-learner-address",
    },
  ]);
  assert.deepEqual(findLessonVoiceIssues("id", formal), [
    {
      column: formal.indexOf("Anda") + 1,
      excerpt: formal,
      line: 1,
      rule: "indonesian-formal-learner-address",
    },
  ]);
  assert.deepEqual(findLessonVoiceIssues("de", german), [
    {
      column: german.indexOf("Sie") + 1,
      excerpt: german,
      line: 1,
      rule: "german-formal-address",
    },
  ]);
});
