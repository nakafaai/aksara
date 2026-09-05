import { assert, it } from "@effect/vitest";

import { findLearnerFacingSemicolonIssues } from "#nakafa-content/voice/punctuation";

it("rejects semicolons that learners can read", () => {
  const source = [
    "export const metadata = {",
    '  description: "Bandingkan posisi awal; lalu hitung jaraknya.",',
    "};",
    "",
    "Syarat pertama sudah terpenuhi; lanjutkan ke syarat kedua.",
    "",
    '<LineEquation title="Titik awal; titik akhir"',
    "  description={<>Bandingkan posisi; lalu hitung jaraknya.</>} />",
  ].join("\n");

  assert.deepEqual(findLearnerFacingSemicolonIssues(source), [
    {
      column: 39,
      excerpt: 'description: "Bandingkan posisi awal; lalu hitung jaraknya.",',
      line: 2,
      rule: "learner-facing-semicolon",
    },
    {
      column: 31,
      excerpt: "Syarat pertama sudah terpenuhi; lanjutkan ke syarat kedua.",
      line: 5,
      rule: "learner-facing-semicolon",
    },
    {
      column: 32,
      excerpt: '<LineEquation title="Titik awal; titik akhir"',
      line: 7,
      rule: "learner-facing-semicolon",
    },
    {
      column: 35,
      excerpt: "description={<>Bandingkan posisi; lalu hitung jaraknya.</>} />",
      line: 8,
      rule: "learner-facing-semicolon",
    },
  ]);
});

it("allows semicolons required by code math entities and MDX syntax", () => {
  const source = [
    "export const metadata = {",
    '  description: "Gunakan kode dan rumus berikut.",',
    "};",
    "",
    '<InlineMath math="a\\\\;b" />',
    '<CodeBlock code="const value = 1;" />',
    "<CodeBlock>const value = 1;</CodeBlock>",
    "",
    "```js",
    "const value = 1;",
    "```",
    "",
    "Gunakan `value; next` di contoh ini.",
    "Tulis A &amp; B.",
    "",
    "<LineEquation",
    "  data={() => {",
    "    const value = 1;",
    "    return value;",
    "  }}",
    "/>",
    '<a href="https://example.com/a;b">Link</a>',
    '<div style="color: red; display: block">Text</div>',
  ].join("\n");

  assert.deepEqual(findLearnerFacingSemicolonIssues(source), []);
});

it("rejects visible semicolons inside instructional blockquotes", () => {
  assert.deepEqual(
    findLearnerFacingSemicolonIssues(
      "> Bandingkan posisi awal; lalu hitung jaraknya."
    ).map(({ column, line, rule }) => ({ column, line, rule })),
    [{ column: 25, line: 1, rule: "learner-facing-semicolon" }]
  );
});

it("checks learner text nested in component data without scanning code", () => {
  const source = [
    "<ReactionExplorer",
    "  labels={{",
    '    caption: "Amati perubahan; catat hasilnya.",',
    "  }}",
    "  data={[",
    "    {",
    "      helperCaption: <>Endapan terbentuk; larutan berubah.</>,",
    '      code: "const value = 1;",',
    '      math: "a\\\\;b",',
    "    },",
    "  ]}",
    "/>",
  ].join("\n");

  assert.deepEqual(findLearnerFacingSemicolonIssues(source), [
    {
      column: 30,
      excerpt: 'caption: "Amati perubahan; catat hasilnya.",',
      line: 3,
      rule: "learner-facing-semicolon",
    },
    {
      column: 41,
      excerpt: "helperCaption: <>Endapan terbentuk; larutan berubah.</>,",
      line: 7,
      rule: "learner-facing-semicolon",
    },
  ]);
});

it("rejects escaped prose semicolons and semicolon entities", () => {
  const source = [
    "A \\; B.",
    "A &semi; B.",
    "A &#59; B.",
    "A &#x3B; B.",
    "A &amp; B.",
  ].join("\n");

  assert.deepEqual(
    findLearnerFacingSemicolonIssues(source).map(({ line, rule }) => ({
      line,
      rule,
    })),
    [
      { line: 1, rule: "learner-facing-semicolon" },
      { line: 2, rule: "learner-facing-semicolon" },
      { line: 3, rule: "learner-facing-semicolon" },
      { line: 4, rule: "learner-facing-semicolon" },
    ]
  );
});

it("rejects semicolon entities in Markdown alt text and titles", () => {
  const source = [
    '![A &semi; B](https://example.com "Gambar &#59; utama")',
    '[NIST](https://example.com "Baca &#x3B; sumber")',
  ].join("\n");

  assert.deepEqual(
    findLearnerFacingSemicolonIssues(source).map(({ line, rule }) => ({
      line,
      rule,
    })),
    [
      { line: 1, rule: "learner-facing-semicolon" },
      { line: 1, rule: "learner-facing-semicolon" },
      { line: 2, rule: "learner-facing-semicolon" },
    ]
  );
});

it("rejects visible math separators but allows LaTeX spacing", () => {
  const source = [
    '<InlineMath math="f(x;y)\\;z" />',
    '<BlockMath math="g(x;y)" />',
    '<Plot data={{ math: "h(x;y)\\\\;z" }} />',
    '<InlineMath math={"x;y"} />',
    "<BlockMath math={`x;y`} />",
    '<InlineMath math={"x" + ";" + "y"} />',
    '<InlineMath math={"x\\\\;" + "y"} />',
  ].join("\n");

  assert.deepEqual(
    findLearnerFacingSemicolonIssues(source).map(({ line, rule }) => ({
      line,
      rule,
    })),
    [
      { line: 1, rule: "learner-facing-semicolon" },
      { line: 2, rule: "learner-facing-semicolon" },
      { line: 3, rule: "learner-facing-semicolon" },
      { line: 4, rule: "learner-facing-semicolon" },
      { line: 5, rule: "learner-facing-semicolon" },
      { line: 6, rule: "learner-facing-semicolon" },
    ]
  );
});

it("reports each visible separator when a JavaScript identity escape removes the backslash", () => {
  const source = '<Plot data={{ math: "h(x;y)\\;z" }} />';
  assert.deepEqual(
    findLearnerFacingSemicolonIssues(source).map(({ column }) => column),
    [source.indexOf(";") + 1, source.lastIndexOf("\\;") + 1]
  );
});

it("checks metadata strings Markdown labels titles and returned JSX", () => {
  const source = [
    "export const metadata = {",
    "  description: `Bandingkan nilai; lalu hitung selisihnya.`,",
    "};",
    "",
    '![Grafik; hasil](https://example.com/a;b "Gambar; utama")',
    '[NIST](https://example.com/a;b "Baca; sumber")',
    "",
    "<Chart",
    "  chart={`graph TD; A --> B`}",
    '  source="https://example.com/a;b"',
    "  label={() => {",
    "    return <>Baca grafik; lalu bandingkan.</>;",
    "  }}",
    "/>",
  ].join("\n");

  assert.deepEqual(
    findLearnerFacingSemicolonIssues(source).map(({ line, rule }) => ({
      line,
      rule,
    })),
    [
      { line: 2, rule: "learner-facing-semicolon" },
      { line: 5, rule: "learner-facing-semicolon" },
      { line: 5, rule: "learner-facing-semicolon" },
      { line: 6, rule: "learner-facing-semicolon" },
      { line: 12, rule: "learner-facing-semicolon" },
    ]
  );
});

it("checks every statically rendered branch of nested JSX expressions", () => {
  const source = [
    "<Chart",
    "  label={condition ? (",
    '    <Panel disabled title="Title; visible"',
    "      subtitle={`Subtitle; visible`}",
    '      href="https://example.com/a;b"',
    "    >",
    "      Body; visible",
    "      <UI.Label>Member; visible</UI.Label>",
    "      <CodeBlock>const hidden = 1;</CodeBlock>",
    '      <InlineMath math={"x;y"} />',
    "      {condition && <>Logical; visible</>}",
    '      {[, "Array; visible", dynamic]}',
    "    </Panel>",
    "  ) : (",
    "    <>Alternate; visible</>",
    "  )}",
    "  callback={() => <>",
    "    Callback; visible",
    "  </>}",
    "  render={function () {",
    '    const hidden = "implementation;";',
    "    return <span>Returned; visible</span>;",
    "  }}",
    "  empty={() => {}}",
    "  missing={() => {",
    "    return;",
    "  }}",
    "  data={{",
    '    caption: "Caption; visible",',
    '    math: "m;n\\\\;p",',
    '    code: "const hidden = 1;",',
    '    ["helperCaption"]: "Help; visible",',
    "  }}",
    "/> ",
  ].join("\n");

  assert.deepEqual(
    findLearnerFacingSemicolonIssues(source).map(({ line, rule }) => ({
      line,
      rule,
    })),
    [3, 4, 7, 8, 10, 11, 12, 15, 18, 22, 29, 30, 32].map((line) => ({
      line,
      rule: "learner-facing-semicolon",
    }))
  );
});

it("ignores module code and non-object metadata", () => {
  const sources = [
    'import Panel from "./panel";',
    'export const helper = "implementation;";',
    'export const helper = "implementation;", metadata = "invalid;";',
  ];

  for (const source of sources) {
    assert.deepEqual(findLearnerFacingSemicolonIssues(source), []);
  }
});
