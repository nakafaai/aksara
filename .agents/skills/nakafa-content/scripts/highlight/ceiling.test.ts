import { assert, it } from "@effect/vitest";

import { findHighlightCeilingIssues } from "#nakafa-content/highlight/ceiling";
import type { MdxNode } from "#nakafa-content/mdx/parse";

const AUTHORED = "export const metadata = {};\n\n";
/** Wraps one phrase in the authored highlight component. */
const highlight = (text: string): string => `<Highlight>${text}</Highlight>`;

it("rejects a section that carries two highlights", () => {
  const source = [
    "export const metadata = {};",
    "",
    "## Aturan Tanda",
    "",
    `Geser ke kiri ketika ${highlight("x + a")} bertambah dan ke kanan ketika nilainya berkurang.`,
    "",
    `Periksa kembali ${highlight("aturan tanda")} pada grafik.`,
  ].join("\n");

  assert.deepEqual(findHighlightCeilingIssues(source), [
    {
      column: 1,
      excerpt: "## Aturan Tanda",
      line: 3,
      rule: "highlight-ceiling",
    },
  ]);
});

it("rejects two highlights in the introduction before any heading", () => {
  const source = [
    "export const metadata = {};",
    "",
    `Invers ${highlight("ada ketika determinan tidak nol")} dan ${highlight("dihitung dengan adjoin")} pada matriks persegi.`,
    "",
    "## Contoh",
    "",
    `Hitung ${highlight("invers matriks")} dari matriks berikut.`,
  ].join("\n");

  assert.deepEqual(
    findHighlightCeilingIssues(source).map(({ line, rule }) => ({
      line,
      rule,
    })),
    [{ line: 3, rule: "highlight-ceiling" }]
  );
});

it("accepts one highlight per section and several sections in one document", () => {
  const source = [
    AUTHORED.trimEnd(),
    "",
    `Rumus ${highlight("jumlah Riemann")} membagi luasan menjadi persegi panjang.`,
    "",
    "## Aturan Turunan",
    "",
    `Turunan ${highlight("pangkat")} menurunkan pangkat satu tingkat.`,
    "",
    "### Contoh",
    "",
    `Hitung turunan ${highlight("f(x) = x^3")} pada titik yang diberikan.`,
  ].join("\n");

  assert.deepEqual(findHighlightCeilingIssues(source), []);
});

it("counts only authored highlight components", () => {
  const source = [
    AUTHORED.trimEnd(),
    "",
    "## Grafik",
    "",
    `Sudut ${highlight("kemiringan")} menentukan arah garis.`,
    "",
    "<CodeBlock",
    '  data={[{ language: "mdx", code: "<Highlight>contoh kode</Highlight>" }]}',
    " />",
    "",
    'Setelah itu, <InlineMath math="f(x) = mx + c" /> tetap notasi matematika.',
  ].join("\n");

  assert.deepEqual(findHighlightCeilingIssues(source), []);
});

it("counts a highlight passed through a component prop", () => {
  const source = [
    AUTHORED.trimEnd(),
    "",
    "## Atome",
    "",
    "<AncientAtomLab",
    "  labels={{ democritusBody: (<>Für Demokrit <Highlight>endet die Teilung hier</Highlight>.</>) }}",
    " />",
    "",
    "Damit folgt <Highlight>die kleinste Einheit</Highlight> aus dem Argument.",
  ].join("\n");

  assert.deepEqual(findHighlightCeilingIssues(source), [
    {
      column: 1,
      excerpt: "## Atome",
      line: 3,
      rule: "highlight-ceiling",
    },
  ]);

  const single = source.replace(
    "Damit folgt <Highlight>die kleinste Einheit</Highlight> aus dem Argument.",
    "Damit folgt die kleinste Einheit aus dem Argument."
  );
  assert.deepEqual(findHighlightCeilingIssues(single), []);
});

it("reads boolean and spread attributes without counting a highlight", () => {
  const source = [
    AUTHORED.trimEnd(),
    "",
    "## Labor",
    "",
    "<AncientAtomLab flag spread={{ id: 1 }} {...(0, properties)} />",
    "",
    "Die Messung <Highlight>bestimmt den Radius</Highlight> des Atoms.",
  ].join("\n");

  assert.deepEqual(findHighlightCeilingIssues(source), []);
});

it("checks a document whose body has no heading", () => {
  const source = `${AUTHORED}${highlight("satu")} dan ${highlight("dua")} muncul pada paragraf pertama.`;

  assert.deepEqual(findHighlightCeilingIssues(source), [
    {
      column: 1,
      excerpt: `${highlight("satu")} dan ${highlight("dua")} muncul pada paragraf pertama.`,
      line: 3,
      rule: "highlight-ceiling",
    },
  ]);
});

it("ignores documents without authored metadata and unpositioned openers", () => {
  assert.deepEqual(
    findHighlightCeilingIssues(
      `## Grafik\n\n${highlight("satu")} dan ${highlight("dua")} muncul.`
    ),
    []
  );
  assert.deepEqual(findHighlightCeilingIssues("", { type: "root" }), []);

  const tree: MdxNode = {
    children: [
      { type: "mdxjsEsm", value: "export const metadata = {};" },
      {
        children: [
          { name: "Highlight", type: "mdxJsxTextElement" },
          { type: "text", value: " dan " },
          { name: "Highlight", type: "mdxJsxTextElement" },
        ],
        type: "paragraph",
      },
    ],
    type: "root",
  };

  assert.deepEqual(findHighlightCeilingIssues("", tree), [
    { column: 1, excerpt: "", line: 1, rule: "highlight-ceiling" },
  ]);

  const beyondSource: MdxNode = {
    children: [
      { type: "mdxjsEsm", value: "export const metadata = {};" },
      {
        children: [
          { name: "Highlight", type: "mdxJsxTextElement" },
          { type: "text", value: " dan " },
          { name: "Highlight", type: "mdxJsxTextElement" },
        ],
        position: { start: { column: 1, line: 9 } },
        type: "paragraph",
      },
    ],
    type: "root",
  };

  assert.deepEqual(findHighlightCeilingIssues("", beyondSource), [
    { column: 1, excerpt: "", line: 9, rule: "highlight-ceiling" },
  ]);
});
