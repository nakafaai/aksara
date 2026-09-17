import { assert, it } from "@effect/vitest";

import { findHighlightVariantIssues } from "#nakafa-content/highlight/variant";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";

it("accepts the supported tones and a highlight without one", () => {
  const source = [
    "## Abschnitt",
    "",
    'Ein <Highlight variant="warning">Kriterium</Highlight> gilt.',
    "",
    'Ein <Highlight variant="success">erfülltes Kriterium</Highlight> bleibt markiert.',
    "",
    "Ein <Highlight>Standardkriterium</Highlight> nutzt die Warnfläche.",
    "",
    'Ein <Highlight variant={"success"}>Literal</Highlight> bleibt gültig.',
  ].join("\n");

  assert.deepEqual(findHighlightVariantIssues(source), []);
  assert.deepEqual(
    findHighlightVariantIssues(source, parseLessonMdx(source)),
    []
  );
});

it("flags an unknown tone before it drops the surface", () => {
  const source = [
    "## Abschnitt",
    "",
    'Ein <Highlight variant="succes">Tippfehler</Highlight> gilt.',
  ].join("\n");

  assert.deepEqual(findHighlightVariantIssues(source), [
    {
      column: 16,
      excerpt: 'Ein <Highlight variant="succes">Tippfehler</Highlight> gilt.',
      line: 3,
      rule: "highlight-variant",
    },
  ]);
});

it("flags a tone that is not a static string", () => {
  const source = [
    "## Abschnitt",
    "",
    "Ein <Highlight variant={tone}>dynamischer Ton</Highlight> gilt.",
  ].join("\n");

  assert.deepEqual(
    findHighlightVariantIssues(source).map(({ line, rule }) => ({
      line,
      rule,
    })),
    [{ line: 3, rule: "highlight-variant" }]
  );
});

it("judges only the variant attribute and nothing else", () => {
  const source = [
    "## Abschnitt",
    "",
    'Ein <Highlight className="extra">hervorgehobenes Kriterium</Highlight> gilt.',
  ].join("\n");

  assert.deepEqual(findHighlightVariantIssues(source), []);

  const tree = {
    children: [
      { type: "mdxjsEsm", value: "export const metadata = {};" },
      {
        children: [{ type: "text", value: "Kriterium." }],
        name: "Highlight",
        type: "mdxJsxTextElement",
      },
    ],
    type: "root",
  };

  assert.deepEqual(findHighlightVariantIssues("", tree), []);
});

it("ignores variants on another component and unpositioned attributes", () => {
  const source = [
    "## Abschnitt",
    "",
    'Ein <InlineMath math="x" variant="anders" /> bleibt Mathematik.',
  ].join("\n");

  assert.deepEqual(findHighlightVariantIssues(source), []);
  assert.deepEqual(findHighlightVariantIssues("", { type: "root" }), []);

  const tree = {
    children: [
      { type: "mdxjsEsm", value: "export const metadata = {};" },
      {
        attributes: [{ name: "variant", type: "mdxJsxAttribute" }],
        name: "Highlight",
        type: "mdxJsxTextElement",
      },
    ],
    type: "root",
  };

  assert.deepEqual(findHighlightVariantIssues("", tree), [
    { column: 1, excerpt: "", line: 1, rule: "highlight-variant" },
  ]);
});

it("reports a variant issue positioned beyond the source", () => {
  const tree = {
    children: [
      { type: "mdxjsEsm", value: "export const metadata = {};" },
      {
        attributes: [
          {
            name: "variant",
            position: { start: { column: 5, line: 9 } },
            type: "mdxJsxAttribute",
            value: "succes",
          },
        ],
        name: "Highlight",
        type: "mdxJsxTextElement",
      },
    ],
    type: "root",
  };

  assert.deepEqual(findHighlightVariantIssues("", tree), [
    { column: 5, excerpt: "", line: 9, rule: "highlight-variant" },
  ]);
});
