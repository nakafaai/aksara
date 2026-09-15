import { assert, it } from "@effect/vitest";

import { findDisplayedMathCompositionIssues } from "#nakafa-content/math/compose";
import { findLessonVoiceIssues } from "#nakafa-content/voice/scan";

/** Returns the rule ids reported for one authored MDX document. */
function rulesForSource(source: string): string[] {
  return findDisplayedMathCompositionIssues(source).map(({ rule }) => rule);
}

/** Returns the line and rule of every finding in one authored document. */
function locatedIn(source: string): { line: number; rule: string }[] {
  return findDisplayedMathCompositionIssues(source).map(({ line, rule }) => ({
    line,
    rule,
  }));
}

const GLUED = "glued-text-math";
const SPLIT_HEAD = "split-aligned-head";

it("reads direct attribute values with their authored entities", () => {
  const source = [
    '<BlockMath math="\\begin{aligned} &amp;x \\\\ &amp;= 3 \\end{aligned}" />',
    '<InlineMath math="0 \\text{zu} 255" />',
    '<InlineMath math="a &lt; b \\text{ und} c" />',
  ].join("\n");
  const issues = findDisplayedMathCompositionIssues(source);
  assert.deepEqual(
    issues.map(({ line, rule }) => ({ line, rule })),
    [
      { line: 1, rule: SPLIT_HEAD },
      { line: 2, rule: GLUED },
      { line: 2, rule: GLUED },
      { line: 3, rule: GLUED },
    ]
  );
  for (const issue of issues) {
    const line = source.split("\n")[issue.line - 1] ?? "";
    assert.ok(
      line[issue.column - 1] === "\\" || line[issue.column - 1] === "}"
    );
  }
});

it("keeps single-quoted and numeric entities aligned", () => {
  const source = [
    "<InlineMath math='0 \\text{zu} 255' />",
    '<InlineMath math="a &#38; b \\text{ und} c" />',
  ].join("\n");
  assert.deepEqual(locatedIn(source), [
    { line: 1, rule: GLUED },
    { line: 1, rule: GLUED },
    { line: 2, rule: GLUED },
  ]);
});

it("reads a math prop written as an expression", () => {
  const source = `<InlineMath math={${JSON.stringify(String.raw`0 \text{zu} 255`)}} />`;
  assert.deepEqual(locatedIn(source), [
    { line: 1, rule: GLUED },
    { line: 1, rule: GLUED },
  ]);
});

it("ignores math props that carry no static value", () => {
  assert.deepEqual(rulesForSource("<InlineMath math={value} />"), []);
  assert.deepEqual(rulesForSource("<InlineMath math={`0 \\text{zu}`} />"), []);
  assert.deepEqual(rulesForSource("<InlineMath math />"), []);
  assert.deepEqual(rulesForSource('<Chart title="0 \\text{zu} 255" />'), []);
  assert.deepEqual(rulesForSource("<Chart />"), []);
});

it("reads math attributes written with unusual spacing", () => {
  assert.deepEqual(rulesForSource('<InlineMath math="x" />'), []);
  assert.deepEqual(rulesForSource("<InlineMath math='x' />"), []);
  assert.deepEqual(rulesForSource("<InlineMath math={undefined} />"), []);
  assert.deepEqual(rulesForSource('<InlineMath math = "0 \\text{zu} x" />'), [
    GLUED,
    GLUED,
  ]);
  assert.deepEqual(
    rulesForSource('<InlineMath data-x math="0 \\text{zu} x" />'),
    [GLUED, GLUED]
  );
});

it("reports math inside ordinary lesson prose", () => {
  const source = [
    'Der Scheitel liegt bei <InlineMath math="0 \\text{zu} x" /> im Graphen.',
    "",
    '* Punkt <InlineMath math="x \\text{und} y" />',
  ].join("\n");
  assert.deepEqual(locatedIn(source), [
    { line: 1, rule: GLUED },
    { line: 1, rule: GLUED },
    { line: 3, rule: GLUED },
    { line: 3, rule: GLUED },
  ]);
});

it("keeps an unterminated or entity-bearing attribute unreported", () => {
  assert.deepEqual(rulesForSource('<InlineMath math="0 \\text{zu 255" />'), []);
  assert.deepEqual(rulesForSource('<InlineMath math="" />'), []);
  assert.deepEqual(rulesForSource('<InlineMath math="}\\text{ und}" />'), []);
  assert.deepEqual(
    rulesForSource('<InlineMath math="a & b &amp; c \\text{ und} d" />'),
    []
  );
  assert.deepEqual(
    rulesForSource('<InlineMath math="a &NotEqualTilde; b \\text{ und} c" />'),
    []
  );
  assert.deepEqual(
    rulesForSource('<InlineMath math="a &amp; b \\text{ und} c" />'),
    [GLUED]
  );
});

it("reads math nested in a component fragment prop", () => {
  const source = [
    "<LineEquation",
    '  title={<>Graph of <InlineMath math="g(x) = 2^x" /></>}',
    "  description={",
    "    <>",
    '      Shifted by <InlineMath math="5 \\text{Einheiten}" /> upwards.',
    "    </>",
    "  }",
    "/>",
  ].join("\n");
  const issues = findDisplayedMathCompositionIssues(source);
  assert.deepEqual(
    issues.map((issue) => ({ line: issue.line, rule: issue.rule })),
    [{ line: 5, rule: GLUED }]
  );
  const line = source.split("\n")[4] ?? "";
  assert.equal(line[(issues[0]?.column ?? 0) - 1], "\\");
});

it("reads math nested in a component data value", () => {
  const source = [
    "<Chart",
    "  data={[",
    '    { id: "a", labels: [{ text: <InlineMath math="0 \\text{zu} 2" /> }] },',
    "  ]}",
    "/>",
  ].join("\n");
  assert.deepEqual(locatedIn(source), [
    { line: 3, rule: GLUED },
    { line: 3, rule: GLUED },
  ]);
});

it("reads an expression math prop nested in a fragment", () => {
  const math = JSON.stringify(String.raw`5 \text{Einheiten}`);
  const source = `<LineEquation description={<>Shifted by <InlineMath math={${math}} /></>} />`;
  assert.deepEqual(locatedIn(source), [{ line: 1, rule: GLUED }]);
});

it("keeps nested math props without a static value unreported", () => {
  assert.deepEqual(
    rulesForSource(
      "A <LineEquation description={<>x <InlineMath math /></>} />"
    ),
    []
  );
  assert.deepEqual(
    rulesForSource(
      "A <LineEquation description={<>x <InlineMath math={name} /></>} />"
    ),
    []
  );
});

it("keeps nested math props with an unaligned entity unreported", () => {
  assert.deepEqual(
    rulesForSource(
      'A <LineEquation description={<>x <InlineMath math="a &amp; b & c" /></>} />'
    ),
    []
  );
});

it("reports every finding through the lesson voice scan", () => {
  const source = String.raw`<BlockMath math="\text{wenn} x" />`;
  assert.deepEqual(locatedIn(source), [{ line: 1, rule: GLUED }]);
  assert.deepEqual(
    findLessonVoiceIssues("de", source).map(({ line, rule }) => ({
      line,
      rule,
    })),
    [{ line: 1, rule: GLUED }]
  );
});
