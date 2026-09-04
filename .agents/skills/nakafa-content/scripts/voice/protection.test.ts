import { assert, it } from "@effect/vitest";

import { findLessonVoiceIssues } from "#nakafa-content/voice/scan";

it("preserves parsed quotations comments and non-prose component fields", () => {
  const source = [
    "> Integral tak tentu memuat",
    "keluarga antiturunan.",
    "",
    "{/* Genom virus mengambil alih kerja sel inang. */}",
    "",
    "<CodeBlock",
    '  code={"Genom virus mengambil alih kerja sel inang."}',
    "/>",
    "",
    "<Plot",
    '  config={{ note: "Integral tak tentu memuat keluarga antiturunan." }}',
    "/>",
    "",
    "<InlineMath",
    '  math={"Genom virus mengambil alih kerja sel inang."}',
    "/>",
  ].join("\n");

  assert.deepEqual(findLessonVoiceIssues("id", source), []);
});

it("protects genuine quotations inside metadata descriptions", () => {
  const quotedOnly = [
    {
      locale: "de",
      source: [
        "export const metadata = {",
        '  description: "Die historische Anweisung lautet „Wandeln Sie die Gleichung um“.",',
        "};",
      ].join("\n"),
    },
    {
      locale: "id",
      source: [
        "export const metadata = {",
        '  description: "Kalimat \\"Nama saya Sari\\" sedang dikutip.",',
        "};",
      ].join("\n"),
    },
    {
      locale: "de",
      source: [
        "export const metadata = {",
        '  description: "Die Anweisung ‚Wandeln Sie die Gleichung um‘ wird zitiert.",',
        "};",
      ].join("\n"),
    },
    {
      locale: "id",
      source: [
        "export const metadata = {",
        '  description: "Kalimat ‘Nama saya Sari’ sedang dikutip.",',
        "};",
      ].join("\n"),
    },
  ];

  for (const { locale, source } of quotedOnly) {
    assert.deepEqual(findLessonVoiceIssues(locale, source), []);
  }

  const descriptionLine =
    '  description: "Sekarang saya jelaskan kutipan \\"Nama saya Sari\\".",';
  const directOutsideQuote = [
    "export const metadata = {",
    descriptionLine,
    "};",
  ].join("\n");
  assert.deepEqual(
    findLessonVoiceIssues("id", directOutsideQuote).map(({ column, rule }) => ({
      column,
      rule,
    })),
    [
      {
        column: descriptionLine.indexOf("saya") + 1,
        rule: "indonesian-formal-author-self-reference",
      },
    ]
  );
});

it("ignores quotations code and non-prose technical fields", () => {
  const german = [
    '> "Wandeln Sie die Gleichung um", lautet die historische Anweisung.',
    "Der Text „Wandeln Sie die Gleichung um“ wird hier nur zitiert.",
    "Der Text ‚Wandeln Sie die Gleichung um‘ wird hier nur zitiert.",
    "`Wandeln Sie die Gleichung um`",
    '<CodeBlock code="Wandeln Sie die Gleichung um." />',
    '<Plot config={{ note: "Wandeln Sie die Gleichung um." }} />',
  ].join("\n");
  const indonesian = [
    '> "Nama saya Sari" adalah kutipan.',
    'Kalimat "Anda dapat mencoba contoh ini" sedang dikutip.',
    "Kalimat ‘Nama saya Sari’ sedang dikutip.",
    "`Nama saya Sari`",
    '<CodeBlock code="Nama saya Sari" />',
    '<Plot config={{ note: "Anda dapat mencoba contoh ini." }} />',
  ].join("\n");

  assert.deepEqual(findLessonVoiceIssues("de", german), []);
  assert.deepEqual(findLessonVoiceIssues("id", indonesian), []);
});
