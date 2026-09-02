import assert from "node:assert/strict";
import test from "node:test";

import { findLessonVoiceIssues } from "#nakafa-content/voice-scan";

test("rejects invisible control characters in source text", () => {
  assert.deepEqual(findLessonVoiceIssues("id", "Nilai \u000Bvektor"), [
    {
      column: 7,
      excerpt: "Nilai \u000Bvektor",
      line: 1,
      rule: "forbidden-control-character",
    },
  ]);
});

test("rejects citation-only headings in every lesson locale", () => {
  const cases = [
    {
      allowed: ["Energy Sources", "Reference Frames"],
      locale: "en",
      rejected: [
        "Source",
        "Sources",
        "Reference",
        "References",
        "Bibliography",
        "Further Reading",
        "Works Cited",
      ],
    },
    {
      allowed: ["Sumber Energi", "Kerangka Acuan"],
      locale: "id",
      rejected: [
        "Sumber",
        "Referensi",
        "Daftar Referensi",
        "Daftar Sumber",
        "Daftar Pustaka",
        "Bacaan Lanjutan",
        "Rujukan",
      ],
    },
    {
      allowed: ["Energiequellen", "Bezugsrahmen"],
      locale: "de",
      rejected: [
        "Quelle",
        "Quellen",
        "Quellenangaben",
        "Quellenverzeichnis",
        "Referenz",
        "Referenzen",
        "Literatur",
        "Literaturverzeichnis",
        "Weiterführende Literatur",
      ],
    },
  ] as const;

  for (const { locale, rejected, allowed } of cases) {
    const source = [...rejected, ...allowed]
      .map((heading) => `## ${heading}`)
      .join("\n");
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ line, rule }) => ({
        line,
        rule,
      })),
      rejected.map((_, index) => ({
        line: index + 1,
        rule: "source-only-heading",
      }))
    );
  }
});

test("rejects every symbol in headings", () => {
  const source = [
    "## Cuaca Berubah Cepat; Iklim Diukur Selama Puluhan Tahun",
    "## Cuaca, Iklim, dan Pola Musiman",
    "## Mengapa Iklim Diukur dalam Puluhan Tahun?",
    "## Kata Serapan dan Istilah Satu-ke-Satu",
    "## Perubahan Iklim Selama Puluhan Tahun",
    "## Kelajuan Rata-rata dan Jari-jari Lingkaran",
  ].join("\n");

  assert.deepEqual(findLessonVoiceIssues("id", source), [
    {
      column: 23,
      excerpt: "## Cuaca Berubah Cepat; Iklim Diukur Selama Puluhan Tahun",
      line: 1,
      rule: "heading-symbol",
    },
    {
      column: 9,
      excerpt: "## Cuaca, Iklim, dan Pola Musiman",
      line: 2,
      rule: "heading-symbol",
    },
    {
      column: 44,
      excerpt: "## Mengapa Iklim Diukur dalam Puluhan Tahun?",
      line: 3,
      rule: "heading-symbol",
    },
    {
      column: 33,
      excerpt: "## Kata Serapan dan Istilah Satu-ke-Satu",
      line: 4,
      rule: "heading-symbol",
    },
  ]);
});
test("rejects digits and math labels in headings and page titles", () => {
  const source = [
    "export const metadata = {",
    '  title: "SDG 7 Energy Access",',
    "};",
    "",
    "## Inner Product and L2 Error",
  ].join("\n");

  assert.deepEqual(
    findLessonVoiceIssues("en", source).map(({ line, rule }) => ({
      line,
      rule,
    })),
    [
      { line: 2, rule: "heading-symbol" },
      { line: 5, rule: "heading-symbol" },
    ]
  );
});
test("allows only ordinary spaces as heading whitespace", () => {
  const source = [
    "## Cuaca\tIklim",
    "## Cuaca\u00A0Iklim",
    "##\tCuaca Iklim",
    "##\u00A0Cuaca Iklim",
    "## Cuaca Iklim",
  ].join("\n");

  assert.deepEqual(
    findLessonVoiceIssues("id", source).map(({ column, line, rule }) => ({
      column,
      line,
      rule,
    })),
    [
      { column: 9, line: 1, rule: "heading-symbol" },
      { column: 9, line: 2, rule: "heading-symbol" },
      { column: 3, line: 3, rule: "heading-symbol" },
      { column: 3, line: 4, rule: "heading-symbol" },
    ]
  );
});
test("applies the heading rule to the page title", () => {
  const source = [
    "export const metadata = {",
    '  title: "Syarat: Bentuk Akar",',
    "};",
    "",
    "## Syarat Bentuk Akar",
  ].join("\n");

  assert.deepEqual(findLessonVoiceIssues("id", source), [
    {
      column: 17,
      excerpt: 'title: "Syarat: Bentuk Akar",',
      line: 2,
      rule: "heading-symbol",
    },
  ]);
});
test("rejects Indonesian reduplication damaged by the symbol rule", () => {
  const source = [
    "## Menentukan Jari Jari Lingkaran",
    "## Membandingkan Kelajuan Rata Rata",
    "## Menentukan Radius Lingkaran",
    "## Membandingkan Kelajuan Rerata",
  ].join("\n");

  assert.deepEqual(
    findLessonVoiceIssues("id", source).map(({ line, rule }) => ({
      line,
      rule,
    })),
    [
      {
        line: 1,
        rule: "indonesian-heading-dehyphenated-reduplication",
      },
      {
        line: 2,
        rule: "indonesian-heading-dehyphenated-reduplication",
      },
    ]
  );
});
test("allows required Indonesian reduplication hyphens only", () => {
  const source = [
    '  title: "Kecepatan Rata-rata",',
    "## Kecepatan Rata-rata",
    "## Jari-jari Lingkaran",
    "## Istilah Satu-ke-Satu",
    "## Nilai Rata-rata-Akhir",
  ].join("\n");

  assert.deepEqual(
    findLessonVoiceIssues("id", source).map(({ line, rule }) => ({
      line,
      rule,
    })),
    [
      { line: 4, rule: "heading-symbol" },
      { line: 5, rule: "heading-symbol" },
    ]
  );
});
test("requires named matrix factorizations to use math rendering in prose", () => {
  const source = [
    "export const metadata = {",
    '  title: "QR Decomposition",',
    '  description: "Compare the QR algorithm with related factorizations.",',
    "};",
    "",
    "## QR Decomposition",
    "The QR algorithm can use LU, SVD, PLU, or PCA as a comparison.",
    'Use <InlineMath math="\\mathrm{QR}" /> in mathematical prose.',
    "`QR` is a code token.",
    "[QR documentation](https://example.com/QR)",
    "```text",
    "QR LU SVD",
    "```",
    "<CodeBlock data={[{",
    "  code: `PLU",
    "PCA`",
    "}]} />",
  ].join("\n");

  assert.deepEqual(findLessonVoiceIssues("en", source), [
    {
      column: 5,
      excerpt: "The QR algorithm can use LU, SVD, PLU, or PCA as a comparison.",
      line: 7,
      rule: "plain-math-label",
    },
    {
      column: 26,
      excerpt: "The QR algorithm can use LU, SVD, PLU, or PCA as a comparison.",
      line: 7,
      rule: "plain-math-label",
    },
    {
      column: 30,
      excerpt: "The QR algorithm can use LU, SVD, PLU, or PCA as a comparison.",
      line: 7,
      rule: "plain-math-label",
    },
    {
      column: 35,
      excerpt: "The QR algorithm can use LU, SVD, PLU, or PCA as a comparison.",
      line: 7,
      rule: "plain-math-label",
    },
    {
      column: 43,
      excerpt: "The QR algorithm can use LU, SVD, PLU, or PCA as a comparison.",
      line: 7,
      rule: "plain-math-label",
    },
  ]);
});

test("rejects German headings that need forbidden punctuation", () => {
  const source = [
    "## Emissionen sinken wenn sich ihre Quellen verändern",
    "## Details die oft verwechselt werden",
    "## Was der Beobachter sieht ist der Unterschied",
    "## Wenn der Beobachter still steht",
    "## Wie der Leitkoeffizient die Parabel verändert",
  ].join("\n");

  assert.deepEqual(
    findLessonVoiceIssues("de", source).map(({ line, rule }) => ({
      line,
      rule,
    })),
    [
      { line: 1, rule: "german-heading-dependent-clause" },
      { line: 2, rule: "german-heading-dependent-clause" },
      { line: 3, rule: "german-heading-dependent-clause" },
    ]
  );
});
