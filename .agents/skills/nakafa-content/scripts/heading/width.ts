import type { HeadingFinding } from "#nakafa-content/heading/finding";
import type { OutlineHeading } from "#nakafa-content/heading/outline";

/**
 * The characters one outline line holds before the panel cuts the label:
 * about 224 pixels for an H2 and 175 for an indented H3 at the type size of
 * nakafa.com's outline panel, which is 256 pixels wide.
 */
const LINE_CHARACTERS: Readonly<Record<number, number>> = { 2: 30, 3: 24 };

/** R11: each outline label fits its line, so the reader sees all of it. */
export function findWidthFindings(
  headings: readonly OutlineHeading[]
): HeadingFinding[] {
  return headings.flatMap((heading) => {
    const limit = LINE_CHARACTERS[heading.depth];
    const { length } = [...heading.words];
    return limit === undefined || length <= limit
      ? []
      : [
          {
            blocking: false,
            line: heading.line,
            message: `'${heading.words}' runs ${length} characters, but its outline line holds about ${limit}, so the panel cuts it. Front-load the specific word and drop words the H1 already says.`,
            rule: "heading-width",
          },
        ];
  });
}
