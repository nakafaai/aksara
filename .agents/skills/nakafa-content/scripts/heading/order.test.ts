import { assert, it } from "@effect/vitest";

import { findHeadingOrderIssues } from "#nakafa-content/heading/order";
import { type MdxNode, parseLessonMdx } from "#nakafa-content/mdx/parse";

const AUTHORED = "export const metadata = {};\n\n";

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

it("keeps real nested answer-key headings valid", () => {
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
    []
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
