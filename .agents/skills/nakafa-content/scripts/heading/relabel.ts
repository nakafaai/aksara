import { Array as Arr } from "effect";

const HEADING_LINE = /^#{1,6}\s/u;

/** The lines of one source without trailing spaces, split by kind. */
function linesOf(source: string, headings: boolean): string {
  return Arr.join(
    Arr.filter(
      Arr.map(source.split("\n"), (line) => line.trimEnd()),
      (line) => HEADING_LINE.test(line) === headings
    ),
    "\n"
  );
}

/**
 * Tells whether a change edits only heading lines: every other line reads as
 * it did at the base. Renaming headings so a uniqueness or outline check
 * passes leaves the repeated structure and text in place.
 */
export function isHeadingOnlyChange(base: string, head: string): boolean {
  return (
    linesOf(base, false) === linesOf(head, false) &&
    linesOf(base, true) !== linesOf(head, true)
  );
}
