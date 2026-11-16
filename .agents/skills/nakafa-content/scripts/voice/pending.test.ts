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

it("finds plain-text math", () => {
  const source = [
    '<MathVisual title="Garis lurus" scene={scene} />',
    "",
    '<MathVisual description="Kurva naik" variant="area" {...shared} />',
    "",
    "<>",
    "Luas 3 × 4.",
    "</>",
    "",
    '<MathVisual title={<>Kurva <InlineMath math="x^2" /></>} />',
  ].join("\n");
  assert.deepEqual(pending(source), ["plain-math-text 6:8"]);
});

it.effect("prints each pending rule's count, fix, and occurrences", () =>
  Effect.gen(function* () {
    const issue = {
      column: 1,
      excerpt: "Luas 3 × 4.",
      file: "id.mdx",
      line: 2,
      locale: "id" as const,
      rule: "plain-math-text",
    };
    const { log } = yield* capture(
      Effect.gen(function* () {
        yield* printPending("json", [issue]);
        yield* printPending("text", undefined);
        yield* printPending("text", [issue]);
      })
    );
    assert.deepEqual(log, [
      '1 [plain-math-text] pending: write it with <InlineMath math="..." /> or <BlockMath math="..." />, chemistry as \\mathrm{H_2O} with \\rightarrow',
      "id.mdx:2:1 [plain-math-text] Luas 3 × 4.",
    ]);
  })
);
