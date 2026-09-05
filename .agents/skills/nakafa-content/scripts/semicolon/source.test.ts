import { assert, it } from "@effect/vitest";

import {
  addSemicolonsInRange,
  addStaticMarkdownFieldSemicolons,
} from "#nakafa-content/semicolon/source";
import { findLearnerFacingSemicolonIssues } from "#nakafa-content/voice/punctuation";

it("collects visible punctuation while preserving entities and LaTeX spacing", () => {
  const source = "A; B \\; C &amp; D &semi; E";
  const offsets = new Set<number>();

  addSemicolonsInRange(offsets, source, undefined);
  addSemicolonsInRange(
    offsets,
    source,
    { end: { offset: source.length }, start: { offset: 0 } },
    { allowLatexSpacing: true }
  );

  assert.deepEqual(
    [...offsets],
    [source.indexOf(";"), source.indexOf(";", source.indexOf("&semi;"))]
  );
});

it("maps decoded Markdown fields back to direct and encoded source bytes", () => {
  const direct = "![A; B](https://example.com)";
  const encoded = "![A&semi; B](https://example.com)";
  const directOffsets = new Set<number>();
  const encodedOffsets = new Set<number>();

  addStaticMarkdownFieldSemicolons(
    directOffsets,
    direct,
    { end: { offset: direct.length }, start: { offset: 0 } },
    "A; B"
  );
  addStaticMarkdownFieldSemicolons(
    encodedOffsets,
    encoded,
    { end: { offset: encoded.length }, start: { offset: 0 } },
    "A; B"
  );
  addStaticMarkdownFieldSemicolons(
    encodedOffsets,
    encoded,
    { end: { offset: encoded.length }, start: { offset: 0 } },
    "Missing; label"
  );
  addStaticMarkdownFieldSemicolons(encodedOffsets, encoded, undefined, "A; B");
  addStaticMarkdownFieldSemicolons(
    encodedOffsets,
    encoded,
    { end: { offset: encoded.length }, start: { offset: 0 } },
    undefined
  );

  assert.deepEqual([...directOffsets], [direct.indexOf(";")]);
  assert.deepEqual([...encodedOffsets], [encoded.indexOf(";", 4)]);
});

it("uses rendered JSX text to distinguish known entities from visible terminators", () => {
  const unknown = '<Panel content={<Callout title="A &bogus; B" />} />';
  const encoded = '<Panel content={<Callout title="A &#59; B" />} />';
  const known = '<Panel content={<Callout title="A &amp; B" />} />';
  assert.deepEqual(
    findLearnerFacingSemicolonIssues(unknown).map(({ column }) => column),
    [unknown.indexOf(";") + 1]
  );
  assert.deepEqual(
    findLearnerFacingSemicolonIssues(encoded).map(({ column }) => column),
    [encoded.indexOf("&#59;") + 1]
  );
  assert.deepEqual(findLearnerFacingSemicolonIssues(known), []);
});

it("keeps native JSX backslashes while distinguishing math spacing from line breaks", () => {
  const spacing = '<Panel content={<InlineMath math="x\\;y" />} />';
  const linebreak = '<Panel content={<InlineMath math="x\\\\;y" />} />';
  assert.deepEqual(findLearnerFacingSemicolonIssues(spacing), []);
  assert.deepEqual(
    findLearnerFacingSemicolonIssues(linebreak).map(({ column }) => column),
    [linebreak.indexOf(";") + 1]
  );
});
