import { assert, it } from "@effect/vitest";

import { findLessonVoiceIssues } from "#nakafa-content/voice/scan";

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

it("checks native placeholder and accessible-label copy", () => {
  const placeholder = '<input placeholder="Anda dapat mencoba ini." />';
  const accessible = '<button aria-label="Sie können den Wert prüfen." />';
  const spreadPlaceholder =
    '<input {...{ placeholder: "Anda dapat mencoba ini." }} />';
  const spreadAccessible =
    '<button {...{ "aria-label": "Sie können den Wert prüfen." }} />';
  const nestedSpreadCopy =
    '<Chart {...{ data: { placeholder: "Anda dapat mencoba ini." } }} />';
  const nestedSpreadName =
    '<Chart {...{ data: { name: "Anda dapat mencoba ini." } }} />';
  const unownedSpread = '<Callout {..."Anda dapat mencoba ini."} />';

  assert.deepEqual(
    findLessonVoiceIssues("id", placeholder).map(({ rule }) => rule),
    ["indonesian-formal-learner-address"]
  );
  assert.deepEqual(
    findLessonVoiceIssues("de", accessible).map(({ rule }) => rule),
    ["german-formal-address"]
  );
  assert.deepEqual(
    findLessonVoiceIssues("id", spreadPlaceholder).map(({ rule }) => rule),
    ["indonesian-formal-learner-address"]
  );
  assert.deepEqual(
    findLessonVoiceIssues("de", spreadAccessible).map(({ rule }) => rule),
    ["german-formal-address"]
  );
  assert.deepEqual(findLessonVoiceIssues("id", nestedSpreadCopy), []);
  assert.deepEqual(
    findLessonVoiceIssues("id", nestedSpreadName).map(({ rule }) => rule),
    ["indonesian-formal-learner-address"]
  );
  assert.deepEqual(findLessonVoiceIssues("id", unownedSpread), []);
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

it("checks learner copy in nested JSX, attributes, and static spreads", () => {
  const nested =
    '<Panel content={<Callout href="/safe" title="Sie können den Wert prüfen." />} />';
  const spread =
    '<Panel content={<Callout {...{ title: "Anda dapat mencoba ini." }} />} />';
  const formattedChild =
    "<Callout>Sie **können** nun beide Seiten vergleichen.</Callout>";

  assert.deepEqual(
    findLessonVoiceIssues("de", nested).map(({ column, rule }) => ({
      column,
      rule,
    })),
    [
      {
        column: nested.indexOf("Sie") + 1,
        rule: "german-formal-address",
      },
    ]
  );
  assert.deepEqual(
    findLessonVoiceIssues("id", spread).map(({ column, rule }) => ({
      column,
      rule,
    })),
    [
      {
        column: spread.indexOf("Anda") + 1,
        rule: "indonesian-formal-learner-address",
      },
    ]
  );
  assert.deepEqual(
    findLessonVoiceIssues("de", formattedChild).map(({ rule }) => rule),
    ["german-formal-address"]
  );
});

it("checks parser-decoded HTML entities in direct and nested JSX copy", () => {
  const direct = '<Callout title="&#65;nda &amp; saya menjelaskan." />';
  const singleQuoted = "<Callout title='Anda dapat mencoba ini.' />";
  const spaced = '<Callout title = "Anda dapat mencoba ini." />';
  const nested =
    '<Panel content={<Callout title="&#83;ie können den Wert prüfen." />} />';

  assert.deepEqual(
    findLessonVoiceIssues("id", direct).map(({ column, rule }) => ({
      column,
      rule,
    })),
    [
      {
        column: direct.indexOf("&#65;") + 1,
        rule: "indonesian-formal-learner-address",
      },
      {
        column: direct.indexOf("saya") + 1,
        rule: "indonesian-formal-author-self-reference",
      },
    ]
  );
  assert.deepEqual(findLessonVoiceIssues("de", nested), [
    {
      column: nested.indexOf("&#83;") + 1,
      excerpt: nested,
      line: 1,
      rule: "german-formal-address",
    },
  ]);
  assert.deepEqual(
    findLessonVoiceIssues("id", spaced).map(({ column, rule }) => ({
      column,
      rule,
    })),
    [
      {
        column: spaced.indexOf("Anda") + 1,
        rule: "indonesian-formal-learner-address",
      },
    ]
  );
  assert.deepEqual(
    findLessonVoiceIssues("id", singleQuoted).map(({ column, rule }) => ({
      column,
      rule,
    })),
    [
      {
        column: singleQuoted.indexOf("Anda") + 1,
        rule: "indonesian-formal-learner-address",
      },
    ]
  );
});

it("ignores valueless copy props and sparse expression entries", () => {
  assert.deepEqual(findLessonVoiceIssues("id", "<Callout title data />"), []);

  const sparse = '<Chart labels={{ items: ["Anda", , "pilihan"] }} />';
  assert.deepEqual(findLessonVoiceIssues("id", sparse), [
    {
      column: sparse.indexOf("Anda") + 1,
      excerpt: sparse,
      line: 1,
      rule: "indonesian-formal-learner-address",
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
