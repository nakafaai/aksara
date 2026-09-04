import { assert, it } from "@effect/vitest";

import { findLessonVoiceIssues } from "#nakafa-content/voice/scan";

const UNSUPPORTED_LOCALE_PATTERN = /Unsupported lesson locale/u;

it("rejects formal German learner address in proven direct-address frames", () => {
  const source = [
    "Bearbeite jede Aufgabe selbst, bevor Sie die Lösung lesen.",
    "Wandeln Sie die Kreisgleichung um, indem Sie das Quadrat vervollständigen.",
    "Die Notation ist dieselbe wie die wissenschaftliche Notation, die Sie in der Mathematik gelernt haben.",
  ].join("\n");

  assert.deepEqual(
    findLessonVoiceIssues("de", source).map(({ line, rule }) => ({
      line,
      rule,
    })),
    [
      { line: 1, rule: "german-formal-address" },
      { line: 2, rule: "german-formal-address" },
      { line: 3, rule: "german-formal-address" },
    ]
  );
});

it("preserves German anaphoric Sie and accepts du address", () => {
  const source = [
    "Die erste Antwort heißt Minderung. Sie senkt Treibhausgasemissionen.",
    "Ordne die Maßnahme ein: Sie begrenzt Treibhausgase.",
    "Matrizen beschreiben lineare Abbildungen. Ihre Einträge hängen von der Basis ab.",
    "Die **Matrizen** stehen in der nächsten Zeile.\n\nSie können anschließend verglichen werden.",
    "Die Matrizen  \nstehen bereit.\n\nSie können anschließend verglichen werden.",
    "Die Gleichung steht oberhalb.\n\nIhre Lösung ist bereits angegeben.",
    "Die Lernenden erhalten zwei Werkzeuge. Ihnen stehen zwei Methoden zur Verfügung.",
    "Algorithmen analysieren Daten. Sie können erkennen, ob ein Muster vorliegt.",
    "Die Gleichung hat eine eindeutige Lösung. [Ihre Lösung](/de/loesung) steht in der Tabelle.",
    "Die Programme haben eine gemeinsame Fähigkeit: Sie können Muster erkennen.",
    "Die [Werkzeuge](/de/werkzeuge) stehen bereit.\n\nSie können beide Seiten vergleichen.",
    "Bearbeite jede Aufgabe selbst, bevor du die Lösung liest.",
  ].join("\n");

  assert.deepEqual(findLessonVoiceIssues("de", source), []);
});

it("rejects unanchored formal German address without a local antecedent", () => {
  const samples = [
    "Sie können nun beide Seiten vergleichen.",
    "Hinweis: Sie können nun beide Seiten vergleichen.",
    "Sie sollten die Tabelle ausfüllen.",
    "Sie dürfen die Aufgabe bearbeiten.",
    "Sie schreiben die Antwort in die Tabelle.",
    "Ihnen stehen zwei Methoden zur Verfügung.",
    "Ihr Ergebnis lautet zwölf.",
  ];

  for (const source of samples) {
    const address = ["Sie", "Ihnen", "Ihr"].find((pronoun) =>
      source.includes(pronoun)
    );
    assert.ok(address);
    assert.deepEqual(findLessonVoiceIssues("de", source), [
      {
        column: source.indexOf(address) + 1,
        excerpt: source,
        line: 1,
        rule: "german-formal-address",
      },
    ]);
  }
});

it("checks possessive address against the adjacent antecedent", () => {
  const direct = [
    "Der Graph steht oben.",
    "",
    "Ihr Ergebnis lautet zwölf.",
  ].join("\n");
  const anaphoric = [
    "Die Gleichung steht oben.",
    "",
    "Ihr Ergebnis lautet zwölf.",
  ].join("\n");

  assert.deepEqual(findLessonVoiceIssues("de", direct), [
    {
      column: 1,
      excerpt: "Ihr Ergebnis lautet zwölf.",
      line: 3,
      rule: "german-formal-address",
    },
  ]);
  assert.deepEqual(findLessonVoiceIssues("de", anaphoric), []);
});

it("preserves clear plural anaphora across owned math components", () => {
  const samples = [
    [
      "Da ähnliche Matrizen dieselbe Transformation beschreiben, bleiben ihre Eigenschaften erhalten.",
      "",
      "Sie besitzen dieselben Eigenwerte.",
    ].join("\n"),
    [
      "Normierte Eigenvektoren sind",
      "",
      '<MathContainer><BlockMath math="u_1" /></MathContainer>',
      "",
      'Sie erfüllen <InlineMath math="u_1^Hu_2=0" />.',
    ].join("\n"),
    [
      "Die Normalgleichungen lauten",
      "",
      '<MathContainer><BlockMath math="A^TA" /></MathContainer>',
      "",
      "Ihre Lösung ist eindeutig.",
    ].join("\n"),
    [
      "Die beiden Ereignisse haben keine gemeinsamen Ergebnisse.",
      "",
      '<BlockMath math="A \\cap B=\\varnothing" />',
      "",
      "Sie schließen sich gegenseitig aus.",
    ].join("\n"),
  ];

  for (const source of samples) {
    assert.deepEqual(findLessonVoiceIssues("de", source), []);
  }
});

it("does not borrow an antecedent from an earlier paragraph", () => {
  const source = [
    "Die Gleichung steht in der ersten Zeile.",
    "",
    "Sie können nun beide Seiten vergleichen.",
  ].join("\n");

  assert.deepEqual(findLessonVoiceIssues("de", source), [
    {
      column: 1,
      excerpt: "Sie können nun beide Seiten vergleichen.",
      line: 3,
      rule: "german-formal-address",
    },
  ]);
});

it("keeps soft-wrapped anaphora inside one paragraph", () => {
  const sameParagraph =
    "Die Lernenden erhalten Aufgaben.\nSie sollten die Tabelle ausfüllen.";
  const separateParagraphs =
    "Die Lernenden erhalten Aufgaben.\n\nSie sollten die Tabelle ausfüllen.";

  assert.deepEqual(findLessonVoiceIssues("de", sameParagraph), []);
  assert.deepEqual(findLessonVoiceIssues("de", separateParagraphs), [
    {
      column: 1,
      excerpt: "Sie sollten die Tabelle ausfüllen.",
      line: 3,
      rule: "german-formal-address",
    },
  ]);
});

it("rejects Indonesian formal and plural learner address", () => {
  const source = [
    "Anda bisa menjumlahkan kedua matriks lebih dahulu.",
    "Sekarang saya tunjukkan langkah berikutnya.",
    "Kalian dapat membandingkan kedua hasilnya.",
  ].join("\n");

  assert.deepEqual(
    findLessonVoiceIssues("id", source).map(({ line, rule }) => ({
      line,
      rule,
    })),
    [
      { line: 1, rule: "indonesian-formal-learner-address" },
      { line: 2, rule: "indonesian-formal-author-self-reference" },
      { line: 3, rule: "indonesian-plural-learner-address" },
    ]
  );
});

it("accepts aku kamu and genuinely inclusive kita", () => {
  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Aku akan menunjukkan polanya. Kamu dapat memeriksa hasilnya. Setelah itu, kita bandingkan kedua nilai bersama-sama."
    ),
    []
  );
});

it("checks learner-visible metadata descriptions", () => {
  const samples = [
    {
      locale: "de",
      rule: "german-formal-address",
      source: [
        "export const metadata = {",
        '  description: "Wandeln Sie die Gleichung um.",',
        "};",
      ].join("\n"),
    },
    {
      locale: "id",
      rule: "indonesian-formal-learner-address",
      source: [
        "export const metadata = {",
        '  description: "Anda dapat mencoba contoh ini.",',
        "};",
      ].join("\n"),
    },
    {
      locale: "id",
      rule: "indonesian-formal-author-self-reference",
      source: [
        "export const metadata = {",
        "  description:",
        '    "Sekarang saya tunjukkan langkah berikutnya.",',
        "};",
      ].join("\n"),
    },
  ];

  for (const { locale, rule, source } of samples) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map((issue) => issue.rule),
      [rule]
    );
  }
});

it("checks formal German address at the start of metadata copy", () => {
  const source = [
    "export const metadata = {",
    '  description: "Sie können den Wert prüfen.",',
    "};",
  ].join("\n");
  assert.deepEqual(
    findLessonVoiceIssues("de", source).map(({ rule }) => rule),
    ["german-formal-address"]
  );
});

it("rejects unsupported lesson locales", () => {
  assert.throws(
    () => findLessonVoiceIssues("fr", "Texte"),
    UNSUPPORTED_LOCALE_PATTERN
  );
});

it("rejects unambiguous formal German instructions in the du register", () => {
  assert.deepEqual(
    findLessonVoiceIssues(
      "de",
      "Berechnen Sie den Wert.\nStellen Sie anschließend die Gleichung auf.\nSubtrahieren oder addieren Sie volle Umdrehungen.\nWenn Sie den Wert einsetzen, erhalten Sie das Ergebnis.\nSie können beide Seiten vergleichen."
    ).map(({ rule }) => rule),
    [
      "german-formal-address",
      "german-formal-address",
      "german-formal-address",
      "german-formal-address",
      "german-formal-address",
    ]
  );

  assert.deepEqual(
    findLessonVoiceIssues(
      "de",
      "Die Matrizen stehen in der nächsten Zeile. Sie können anschließend verglichen werden."
    ),
    []
  );

  assert.deepEqual(
    findLessonVoiceIssues(
      "de",
      "Berechne den Wert.\nStelle anschließend die Gleichung auf."
    ),
    []
  );

  assert.deepEqual(
    findLessonVoiceIssues(
      "de",
      "<Callout>Sie können nun beide Seiten vergleichen.</Callout>"
    ).map(({ rule }) => rule),
    ["german-formal-address"]
  );

  assert.deepEqual(
    findLessonVoiceIssues(
      "de",
      "<Callout>Die Matrizen stehen bereit. Sie können nun verglichen werden.</Callout>"
    ),
    []
  );
});
