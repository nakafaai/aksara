import { assert, it } from "@effect/vitest";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";
import { findStringVisualText } from "#nakafa-content/voice/visual";

/** The rule, line, and column of every string visual text prop in one source. */
function found(source: string) {
  return findStringVisualText(source, parseLessonMdx(source)).map(
    ({ column, line, rule }) => `${rule} ${line}:${column}`
  );
}

it("finds a visual text prop written as a string and leaves JSX and other props alone", () => {
  const source = [
    '<MathVisual description="Kurva naik" variant="area" {...shared} />',
    "",
    '<MathVisual title={<>Kurva <InlineMath math="x^2" /></>} />',
    "",
    "Plain text.",
  ].join("\n");
  assert.deepEqual(found(source), ["string-visual-text 1:13"]);
});
