import { assert, it } from "@effect/vitest";

import { findLessonVoiceIssues } from "#nakafa-content/voice/scan";

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
  assert.deepEqual(
    findLessonVoiceIssues("en", "[![Diagram](plot.png)](/lesson)."),
    []
  );
  assert.deepEqual(
    findLessonVoiceIssues("en", "[![Diagram](plot.png)](/lesson)"),
    []
  );
});

it("checks one formal-address frame across formatted link-label children", () => {
  const german = "[**Sie** können den Wert prüfen](/de/ergebnis).";
  const indonesian = "[**Anda** dapat mencoba ini](/id/contoh).";

  assert.deepEqual(findLessonVoiceIssues("de", german), [
    {
      column: german.indexOf("Sie") + 1,
      excerpt: german,
      line: 1,
      rule: "german-formal-address",
    },
  ]);
  assert.deepEqual(findLessonVoiceIssues("id", indonesian), [
    {
      column: indonesian.indexOf("Anda") + 1,
      excerpt: indonesian,
      line: 1,
      rule: "indonesian-formal-learner-address",
    },
  ]);
});

it("checks link labels in headings and GFM table cells", () => {
  const heading = "## [Sie können den Wert prüfen](/de/ergebnis)";
  const anaphoricHeading =
    "## Die Matrizen: [Sie können verglichen werden](/de/matrizen)";
  const table = [
    "| Hinweis | Nächster Schritt |",
    "| --- | --- |",
    "| Ergebnis | [Sie können den Wert prüfen](/de/ergebnis) |",
  ].join("\n");
  const anaphoricTable = [
    "| Hinweis |",
    "| --- |",
    "| Die Matrizen: [Sie können verglichen werden](/de/matrizen) |",
  ].join("\n");
  const formattedAnaphoricTable = [
    "| Hinweis |",
    "| --- |",
    "| **Die Matrizen:** [Sie können verglichen werden](/de/matrizen) |",
  ].join("\n");

  assert.deepEqual(
    findLessonVoiceIssues("de", heading).map(({ rule }) => rule),
    ["heading-symbol", "german-formal-address"]
  );
  assert.deepEqual(
    findLessonVoiceIssues("de", table).map(({ rule }) => rule),
    ["german-formal-address"]
  );
  assert.equal(
    findLessonVoiceIssues("de", anaphoricHeading).some(
      ({ rule }) => rule === "german-formal-address"
    ),
    false
  );
  assert.equal(
    findLessonVoiceIssues("de", anaphoricTable).some(
      ({ rule }) => rule === "german-formal-address"
    ),
    false
  );
  assert.equal(
    findLessonVoiceIssues("de", formattedAnaphoricTable).some(
      ({ rule }) => rule === "german-formal-address"
    ),
    false
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
  const formal = "![Panduan Anda][gambar-anda]\n\n[gambar-anda]: image.png";
  const german = "![Sie können den Wert ablesen](/Sie-koennen.png)";
  const escaped = "![Kalian \\] [membandingkan] c](image.png)";
  const encoded = "![&#65;nda dapat mencoba ini](image.png)";
  const multiline = "> ![Panduan\n> Anda dapat mencoba ini](image.png)";
  const prefixedMultiline =
    "> See ![Panduan\n> Anda dapat mencoba ini](image.png)";
  const plainMultiline = "![Panduan\n&#65;nda dapat mencoba ini](image.png)";

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
      excerpt: "![Panduan Anda][gambar-anda]",
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
  assert.deepEqual(findLessonVoiceIssues("id", escaped), [
    {
      column: escaped.indexOf("Kalian") + 1,
      excerpt: escaped,
      line: 1,
      rule: "indonesian-plural-learner-address",
    },
  ]);
  assert.deepEqual(findLessonVoiceIssues("id", encoded), [
    {
      column: encoded.indexOf("&#65;") + 1,
      excerpt: encoded,
      line: 1,
      rule: "indonesian-formal-learner-address",
    },
  ]);
  assert.deepEqual(
    findLessonVoiceIssues("id", multiline).map(({ rule }) => rule),
    ["indonesian-formal-learner-address"]
  );
  assert.deepEqual(
    findLessonVoiceIssues("id", prefixedMultiline).map(({ rule }) => rule),
    ["indonesian-formal-learner-address"]
  );
  assert.deepEqual(
    findLessonVoiceIssues("id", plainMultiline).map(({ rule }) => rule),
    ["indonesian-formal-learner-address"]
  );
});

it("maps formatted image alt copy through native Markdown source positions", () => {
  const samples = [
    { column: 5, line: 1, source: "![**Anda** dapat mencoba ini](image.png)" },
    {
      column: 6,
      line: 1,
      source: "[![**Anda** dapat mencoba ini](image.png)](/lesson)",
    },
    {
      column: 5,
      line: 1,
      source: "![__&#65;nda__ dapat mencoba ini](image.png)",
    },
    { column: 6, line: 1, source: "![\\* Anda dapat mencoba ini](image.png)" },
    {
      column: 1,
      line: 2,
      source: "![Panduan:  \nAnda dapat mencoba ini](image.png)",
    },
    {
      column: 1,
      line: 2,
      source: "![Panduan:\\\nAnda dapat mencoba ini](image.png)",
    },
    {
      column: 5,
      line: 2,
      source: "> See ![Panduan\r\n> **&#65;nda** dapat mencoba ini](image.png)",
    },
  ];

  for (const { source, line, column } of samples) {
    assert.deepEqual(findLessonVoiceIssues("id", source), [
      {
        column,
        excerpt: source.split("\n")[line - 1]?.trim(),
        line,
        rule: "indonesian-formal-learner-address",
      },
    ]);
  }
  assert.deepEqual(findLessonVoiceIssues("id", "![`Anda`](image.png)"), []);
  assert.deepEqual(
    findLessonVoiceIssues("id", "[![`Anda`](image.png)](/lesson)"),
    []
  );
  assert.deepEqual(findLessonVoiceIssues("id", "![](image.png)"), []);
});
