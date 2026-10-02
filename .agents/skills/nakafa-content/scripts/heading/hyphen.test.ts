import { assert, it } from "@effect/vitest";

import { findLessonVoiceIssues } from "#nakafa-content/voice/scan";

const SECTION_BODY =
  "The section names the condition that applies and states the operation the learner performs with the quantity introduced above, so the same steps work for every later case.";

/** Builds one lesson page whose title and only heading carry the case. */
function page(title: string, heading: string): string {
  return [
    "export const metadata = {",
    `  title: "${title}",`,
    "};",
    "",
    heading,
    "",
    SECTION_BODY,
  ].join("\n");
}

it("allows required Indonesian reduplication hyphens only", () => {
  const source = [
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
      { line: 3, rule: "heading-symbol" },
      { line: 4, rule: "heading-symbol" },
    ]
  );
  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      page("Kecepatan Rata-rata", "## Jari-jari Lingkaran")
    ),
    []
  );
});

it("allows the hyphen that joins one letter to a word in German and English", () => {
  const cases = [
    {
      allowed: [
        "## Einen Graphen an der x-Achse spiegeln",
        "## Ein regelmäßiges n-Eck",
        "## Die Reichweite von α-Strahlen",
      ],
      locale: "de",
      rejected: [
        "## Spiegelung an der xy-Achse",
        "## Der Term x-y",
        "## Die y- und x-Achse",
        "## Die Achse-y",
      ],
      title: "Spiegelung von Funktionen an der y-Achse",
    },
    {
      allowed: ["## Flipping a Graph Across the x-Axis"],
      locale: "en",
      rejected: ["## A Well-Known Rule", "## The xy-Plane", "## The 3-Axis"],
      title: "Reflecting a Function Across the y-Axis",
    },
  ] as const;

  for (const { allowed, locale, rejected, title } of cases) {
    const headings = [...rejected, ...allowed].join("\n");
    assert.deepEqual(
      findLessonVoiceIssues(locale, headings).map(({ line, rule }) => ({
        line,
        rule,
      })),
      rejected.map((_, index) => ({
        line: index + 1,
        rule: "heading-symbol",
      }))
    );
    assert.deepEqual(
      findLessonVoiceIssues(locale, page(title, allowed[0])),
      []
    );
  }
});

it("keeps the one-letter compound out of Indonesian titles and headings", () => {
  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      page("Refleksi Fungsi terhadap y-Sumbu", "## Menghitung x-Intersep")
    ).map(({ line, rule }) => ({
      line,
      rule,
    })),
    [
      { line: 2, rule: "heading-symbol" },
      { line: 5, rule: "heading-symbol" },
    ]
  );
});
