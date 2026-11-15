import { assert, it } from "@effect/vitest";
import { Effect } from "effect";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";
import { capture } from "#nakafa-content/points/test/console";
import { findPendingIssues, printPending } from "#nakafa-content/voice/pending";

/** The rule, line, and column of every pending finding in one MDX source. */
function pending(source: string) {
  return findPendingIssues(source, parseLessonMdx(source)).map(
    ({ column, line, rule }) => `${rule} ${line}:${column}`
  );
}

it("finds retired visuals, string visual text, and plain-text math", () => {
  const source = [
    '<LineEquation title="Garis lurus" data={[]} />',
    "",
    '<MathVisual description="Kurva naik" variant="area" {...shared} />',
    "",
    "<>",
    "Luas 3 × 4.",
    "</>",
    "",
    '<MathVisual title={<>Kurva <InlineMath math="x^2" /></>} />',
  ].join("\n");
  assert.deepEqual(pending(source), [
    "plain-math-text 6:8",
    "retired-visual 1:1",
    "string-visual-text 1:15",
    "string-visual-text 3:13",
  ]);
});

it.effect("prints each pending rule's count, fix, and occurrences", () =>
  Effect.gen(function* () {
    const issue = {
      column: 1,
      excerpt: '<LineEquation title="Garis" />',
      file: "id.mdx",
      line: 2,
      locale: "id" as const,
      rule: "retired-visual",
    };
    const { log } = yield* capture(
      Effect.gen(function* () {
        yield* printPending("json", [issue]);
        yield* printPending("text", undefined);
        yield* printPending("text", [issue]);
      })
    );
    assert.deepEqual(log, [
      "1 [retired-visual] pending: draw it with MathVisual, the one math visual (D36)",
      'id.mdx:2:1 [retired-visual] <LineEquation title="Garis" />',
    ]);
  })
);
