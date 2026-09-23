import { assert, it } from "@effect/vitest";

import { findHeadingOrderIssues } from "#nakafa-content/heading/order";
import { type MdxNode, parseLessonMdx } from "#nakafa-content/mdx/parse";

const AUTHORED = "export const metadata = {};\n\n";

it("keeps a standalone answer inside the app-owned explanation heading", () => {
  const valid = `${AUTHORED}#### Menentukan laju\n\n##### Satuan laju\n\n#### Menghitung waktu`;
  assert.deepEqual(findHeadingOrderIssues(valid, parseLessonMdx(valid), 4), []);
  const invalid = `${AUTHORED}##### Laju\n\n#### Waktu\n\n### Keluar dari pembahasan`;
  assert.deepEqual(
    findHeadingOrderIssues(invalid, parseLessonMdx(invalid), 4).map(
      ({ line }) => line
    ),
    [3, 7]
  );
});

it("rejects a body heading whose level jumps", () => {
  assert.deepEqual(
    findHeadingOrderIssues(
      [
        "export const metadata = {};",
        "",
        "## Latihan",
        "",
        "#### Menghitung nilai fungsi",
        "",
        "Hitung nilai fungsi pada titik yang diberikan.",
      ].join("\n")
    ),
    [
      {
        column: 1,
        excerpt: "#### Menghitung nilai fungsi",
        line: 5,
        rule: "heading-order",
      },
    ]
  );
});

it("rejects a body that opens below the second level", () => {
  assert.deepEqual(
    findHeadingOrderIssues(
      `${AUTHORED}### Perilaku Grafik\n\nGrafik naik.`
    ).map(({ line, rule }) => ({ line, rule })),
    [{ line: 3, rule: "heading-order" }]
  );

  assert.deepEqual(
    findHeadingOrderIssues(`${AUTHORED}# Judul Halaman\n\nTeks.`).map(
      ({ rule }) => rule
    ),
    ["heading-order"]
  );
});

it("rejects deep lesson solutions even when no level is skipped", () => {
  assert.deepEqual(
    findHeadingOrderIssues(
      [
        "export const metadata = {};",
        "",
        "## Latihan",
        "",
        "### Pembahasan",
        "",
        "#### Menghitung nilai fungsi",
        "",
        "##### Kasus khusus",
        "",
        "Hitung pada titik yang diberikan.",
        "",
        "## Penutup",
        "",
        "Ringkasan aturan.",
        "",
        "### Tabel",
        "",
        "| Nilai | Arti |",
        "| --- | --- |",
        "| 1 | satu |",
      ].join("\n")
    ),
    [
      {
        column: 1,
        excerpt: "#### Menghitung nilai fungsi",
        line: 7,
        rule: "heading-order",
      },
      {
        column: 1,
        excerpt: "##### Kasus khusus",
        line: 9,
        rule: "heading-order",
      },
    ]
  );
});

it("ignores documents without authored metadata", () => {
  assert.deepEqual(
    findHeadingOrderIssues("## Bagian\n\n#### Melompat\n\nTeks."),
    []
  );
  assert.deepEqual(findHeadingOrderIssues("", parseLessonMdx("")), []);
  assert.deepEqual(findHeadingOrderIssues("", { type: "root" }), []);
});

it("skips headings without a resolved position and tolerates a missing line", () => {
  const tree: MdxNode = {
    children: [
      { type: "mdxjsEsm", value: "export const metadata = {};" },
      {
        depth: 2,
        position: { start: { column: 1, line: 1 } },
        type: "heading",
      },
      { depth: 4, type: "heading" },
      { name: "h4", type: "mdxJsxFlowElement" },
      { depth: 4, position: {}, type: "heading" },
      { depth: 4, position: { start: { line: 9 } }, type: "heading" },
      {
        depth: 6,
        position: { start: { column: 2, line: 99 } },
        type: "heading",
      },
    ],
    type: "root",
  };

  assert.deepEqual(findHeadingOrderIssues("", tree), [
    {
      column: 2,
      excerpt: "",
      line: 99,
      rule: "heading-order",
    },
  ]);
});

it.each([
  "<h4>Deep solution</h4>",
  "Text <h5>Deep solution</h5>",
  "{<h4>Deep solution</h4>}",
  "<Panel title={<h6>Deep solution</h6>} />",
  "<Panel {...{ title: <h4>Deep solution</h4> }} />",
])("rejects JSX heading escapes: %s", (heading) => {
  const source = `${AUTHORED}## Section\n\n### Subsection\n\n${heading}`;
  assert.deepEqual(
    findHeadingOrderIssues(source).map(({ line }) => line),
    [7]
  );
});

it("accepts valid Markdown and JSX levels and ignores fenced examples", () => {
  const source = `${AUTHORED}## Section\n\n<h3>Detail</h3>\n\n{<h2>Section</h2>}\n\n<Panel title={<>Label</>} />\n\n<Panel title={2} />\n\n\`\`\`md\n#### Example\n\`\`\``;
  assert.deepEqual(findHeadingOrderIssues(source), []);
});

it("rejects H6 in standalone answers while retaining real H4 and H5", () => {
  const source = `${AUTHORED}#### Answer\n\n##### Subcase\n\n###### Too deep`;
  assert.deepEqual(
    findHeadingOrderIssues(source, parseLessonMdx(source), 4).map(
      ({ line }) => line
    ),
    [7]
  );
});

it("keeps JSX headings in source order when they share a line", () => {
  const source = `${AUTHORED}<><h2>Section</h2><h3>Detail</h3></>`;
  assert.deepEqual(findHeadingOrderIssues(source), []);
});

it.each([
  ["id", "Latihan", "Pembahasan"],
  ["en", "First Exercise", "Solution to First Exercise"],
  ["de", "Zweite Übung", "Lösung zur zweiten Übung"],
] as const)(
  "keeps %s solutions beneath their exercises",
  (locale, exercise, solution) => {
    const source = `${AUTHORED}## ${exercise}\n\nSolve.\n\n## ${solution}\n\nExplain.`;
    assert.deepEqual(
      findHeadingOrderIssues(source, parseLessonMdx(source), 2, locale).map(
        ({ line }) => line
      ),
      [7]
    );
    const nested = source.replace(`## ${solution}`, `### ${solution}`);
    assert.deepEqual(
      findHeadingOrderIssues(nested, parseLessonMdx(nested), 2, locale),
      []
    );
  }
);

it("preserves conceptual solution headings and article structure", () => {
  for (const source of [
    `${AUTHORED}## Exercises\n\nSolve.\n\n## Solution Uniqueness and Numerical Stability`,
    `${AUTHORED}## Concept\n\nExplain.\n\n## Worked Solutions`,
    `${AUTHORED}## Exercises\n\nSolve.\n\n## Summary\n\nSummarize.\n\n## Worked Solutions`,
  ]) {
    assert.deepEqual(
      findHeadingOrderIssues(source, parseLessonMdx(source), 2, "en"),
      []
    );
  }
  const article = `${AUTHORED}## Exercises\n\nAnalysis.\n\n## Worked Solutions`;
  assert.deepEqual(findHeadingOrderIssues(article), []);
});

it.each([
  ["<h2>Exercises</h2>", "<h2>Solutions</h2>"],
  ["## Exercises", "<h2>Solutions</h2>"],
  ["<h2><span>Exercises</span></h2>", "## **Solutions**"],
  ["{<h2>Exercises</h2>}", "{<h2>Solutions</h2>}"],
  ['<h2>{"Exercises"}</h2>', '<h2>{"Solutions"}</h2>'],
  [
    "<Panel title={<h2>Exercises</h2>} />",
    "<Panel title={<h2><span>Solutions</span></h2>} />",
  ],
  ["<h2>Exercises</h2>", "<h2>\n  Worked Solutions\n</h2>"],
])("recognizes parsed heading labels: %s", (exercise, solution) => {
  const source = `${AUTHORED}${exercise}\n\nSolve.\n\n${solution}`;
  assert.deepEqual(
    findHeadingOrderIssues(source, parseLessonMdx(source), 2, "en").map(
      ({ line }) => line
    ),
    [7]
  );
});

it("ignores attributes and nonliteral expression values in heading labels", () => {
  const source = `${AUTHORED}<h2 title="Exercises">Concept</h2>\n\n<h2>Solutions</h2>\n\n{<h2>{3}</h2>}\n\n<h2>{title}</h2>`;
  assert.deepEqual(
    findHeadingOrderIssues(source, parseLessonMdx(source), 2, "en"),
    []
  );
  const tree: MdxNode = {
    children: [
      { type: "mdxjsEsm" },
      {
        children: [{ type: "text", value: 3 }],
        depth: 2,
        position: { start: { column: 1, line: 3 } },
        type: "heading",
      },
    ],
    type: "root",
  };
  assert.deepEqual(findHeadingOrderIssues(source, tree, 2, "en"), []);
});
