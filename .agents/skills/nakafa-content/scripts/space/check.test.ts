import { assert, it } from "@effect/vitest";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";
import { findDroppedSpaceIssues } from "#nakafa-content/space/check";

/** The line and column of every dropped space in one MDX source. */
function gaps(source: string) {
  return findDroppedSpaceIssues(source, parseLessonMdx(source)).map(
    ({ column, line }) => `${line}:${column}`
  );
}

it("finds text and an inline element that JSX joins across a line break, in both directions", () => {
  const source = [
    "<Lab",
    "  caption={",
    "    <>",
    "      One molecule reacts with five",
    '      <InlineMath math="\\mathrm{O_2}" />',
    "      molecules, then",
    "      <strong>heat</strong>",
    "    </>",
    "  }",
    "/>",
    "",
    "{<p>",
    "  Read the",
    '  <a href="/x">guide</a>',
    "</p>}",
  ].join("\n");
  assert.deepEqual(gaps(source), ["4:36", "5:41", "6:22", "13:11"]);
});

it("keeps same-line spaces, explicit spaces, brackets, punctuation and Markdown children", () => {
  const source = [
    "<Lab",
    "  caption={",
    "    <>",
    '      One molecule reacts with five <InlineMath math="O_2" /> molecules',
    '      and{" "}',
    '      <InlineMath math="x" />',
    "      , with values (",
    '      <InlineMath math="y" />',
    "      ).",
    "    </>",
    "  }",
    "/>",
    "",
    "<Note>",
    "Five",
    '<InlineMath math="O_2" />',
    "molecules.",
    "</Note>",
  ].join("\n");
  assert.deepEqual(gaps(source), []);
});
