import { assert, it } from "@effect/vitest";
import type { OutlineHeading } from "#nakafa-content/heading/outline";
import { findWidthFindings } from "#nakafa-content/heading/width";

/** Builds one heading of a depth at a line. */
function heading(depth: number, words: string, line: number): OutlineHeading {
  return { depth, excerpt: words, label: words, line, words };
}

it("reviews an H2 above thirty and an H3 above twenty-four characters", () => {
  const findings = findWidthFindings([
    heading(2, "a".repeat(30), 1),
    heading(2, "a".repeat(31), 2),
    heading(3, "a".repeat(24), 3),
    heading(3, "a".repeat(25), 4),
    heading(4, "a".repeat(60), 5),
  ]);

  assert.deepStrictEqual(
    findings.map(({ blocking, line }) => [blocking, line]),
    [
      [false, 2],
      [false, 4],
    ]
  );
});
