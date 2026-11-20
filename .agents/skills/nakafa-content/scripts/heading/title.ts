import type { HeadingFinding } from "#nakafa-content/heading/finding";
import type { OutlineHeading } from "#nakafa-content/heading/outline";

const NON_WORD = /[^\p{L}\p{N}]+/gu;
const COMBINING_MARK = /\p{M}/gu;

/** The fewest words a title has before a heading that contains it asks for a review. */
const CONTAINED_TITLE_WORDS = 3;

/**
 * Folds case, accents, punctuation, and spacing away, so two labels that read
 * the same compare equal: `Sudut Pusat` and `sudut-pusat` are one label.
 */
export function foldLabel(text: string): string {
  return text
    .normalize("NFKD")
    .replace(COMBINING_MARK, "")
    .toLowerCase()
    .replace(NON_WORD, " ")
    .trim();
}

/**
 * R6: a heading never repeats the page title, which the page already shows as
 * its H1. An exact repeat fails the gate; a heading that contains a title of
 * three or more words asks for a review.
 */
export function findTitleFindings(
  title: string,
  headings: readonly OutlineHeading[]
): HeadingFinding[] {
  const folded = foldLabel(title);
  if (folded === "") {
    return [];
  }
  const long = folded.split(" ").length >= CONTAINED_TITLE_WORDS;
  return headings.flatMap((heading): HeadingFinding[] => {
    const label = foldLabel(heading.words);
    if (label === folded) {
      return [
        {
          blocking: true,
          line: heading.line,
          message: `'${heading.words}' repeats the page title, which the page already shows as its H1. Name the part of the topic this section teaches.`,
          rule: "heading-title",
        },
      ];
    }
    return long && ` ${label} `.includes(` ${folded} `)
      ? [
          {
            blocking: false,
            line: heading.line,
            message: `'${heading.words}' contains the page title '${title}'. Drop the words the H1 already says and keep the part this section teaches.`,
            rule: "heading-title",
          },
        ]
      : [];
  });
}
