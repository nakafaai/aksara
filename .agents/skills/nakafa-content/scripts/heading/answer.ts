import { Array as Arr } from "effect";
import type { HeadingFinding } from "#nakafa-content/heading/finding";
import { isRequiredHeadingHyphen } from "#nakafa-content/heading/hyphen";
import type { OutlineHeading } from "#nakafa-content/heading/outline";
import { outlineHeadings } from "#nakafa-content/heading/outline";
import type { MdxNode } from "#nakafa-content/mdx/parse";
import type { LessonVoiceLocale } from "#nakafa-content/voice/types";

/** The required four-heading sequence of a worked try-out explanation per locale. */
export const ANSWER_HEADINGS: Readonly<
  Record<LessonVoiceLocale, readonly [string, string, string, string]>
> = {
  de: ["Gegeben", "Gesucht", "Lösung", "Antwort"],
  en: ["Given", "Asked", "Solution", "Answer"],
  id: ["Diketahui", "Ditanyakan", "Penyelesaian", "Jawaban"],
  ms: ["Diberi", "Ditanya", "Penyelesaian", "Jawapan"],
};

/** The localized word opening each top heading of a multi-part try-out answer. */
export const ANSWER_PART_WORDS: Readonly<Record<LessonVoiceLocale, string>> = {
  de: "Teil",
  en: "Part",
  id: "Bagian",
  ms: "Bahagian",
};

const ALLOWED_HEADING_CHARACTER = /[\p{L} ]/u;

/** Checks whether a top heading label is a clean part heading like `Bagian a` or `Part 1.2`. */
export function isCleanPartHeading(
  locale: LessonVoiceLocale,
  label: string
): boolean {
  return new RegExp(
    `^${ANSWER_PART_WORDS[locale]} [a-z0-9]+(?:\\.[a-z0-9]+)*$`,
    "u"
  ).test(label);
}

/** Checks whether a heading contains any disallowed symbol such as a colon. */
function hasForbiddenHeadingSymbol(
  label: string,
  locale: LessonVoiceLocale
): boolean {
  let index = 0;
  for (const character of label) {
    if (
      !(
        ALLOWED_HEADING_CHARACTER.test(character) ||
        isRequiredHeadingHyphen(label, index, locale)
      )
    ) {
      return true;
    }
    index += character.length;
  }
  return false;
}

/** Verifies exact four-heading sequence and sub-step placement inside one scope. */
function checkFourHeadingSequence(
  locale: LessonVoiceLocale,
  headings: readonly OutlineHeading[],
  mainDepth: number,
  scopeLabel: string,
  fallbackLine: number
): HeadingFinding[] {
  const expected = ANSWER_HEADINGS[locale];
  const [, , solutionHeading] = expected;
  const findings: HeadingFinding[] = [];
  const mainHeadings = Arr.filter(headings, ({ depth }) => depth === mainDepth);
  const foundLabels = Arr.map(mainHeadings, ({ label }) => label);
  const sameSequence =
    foundLabels.length === expected.length &&
    Arr.every(expected, (title, index) => foundLabels[index] === title);

  if (!sameSequence) {
    const marker = "#".repeat(mainDepth);
    findings.push({
      blocking: true,
      line: mainHeadings[0]?.line ?? fallbackLine,
      message: `${scopeLabel} must use the exact four headings in order (${Arr.join(
        Arr.map(expected, (title) => `${marker} ${title}`),
        " -> "
      )}); found ${foundLabels.length > 0 ? Arr.join(foundLabels, " -> ") : "none"}.`,
      rule: "answer-heading-structure",
    });
  }

  let currentMain: string | undefined;
  for (const heading of headings) {
    if (heading.depth === mainDepth) {
      currentMain = heading.label;
      continue;
    }
    if (heading.depth === mainDepth + 1) {
      if (currentMain !== solutionHeading) {
        findings.push({
          blocking: true,
          line: heading.line,
          message: `Sub-step heading '${heading.label}' is only allowed inside '${solutionHeading}'.`,
          rule: "answer-heading-depth",
        });
      }
      continue;
    }
    findings.push({
      blocking: true,
      line: heading.line,
      message: `Heading '${heading.label}' exceeds the allowed depth for this try-out answer.`,
      rule: "answer-heading-depth",
    });
  }

  return findings;
}

/** Splits headings of a multi-part answer into sections grouped by each top-level `#` heading. */
function splitByPart(headings: readonly OutlineHeading[]): readonly {
  readonly children: readonly OutlineHeading[];
  readonly header: OutlineHeading;
}[] {
  const groups: {
    children: OutlineHeading[];
    header: OutlineHeading;
  }[] = [];
  for (const heading of headings) {
    if (heading.depth === 1) {
      groups.push({ children: [], header: heading });
    } else {
      const current = groups.at(-1);
      if (current !== undefined) {
        current.children.push(heading);
      }
    }
  }
  return groups;
}

/**
 * Enforces the try-out worked-answer heading contract on changed or new files:
 * - Zero punctuation/symbols (including `:`) in all headings.
 * - Single-question answers use `#` for the four standard headings in exact order,
 *   with optional `##` only under `# Penyelesaian` (`# Solution` / `# Lösung`).
 * - Multi-part answers use `# Bagian a` (no `:`, no extra title) with the four
 *   standard headings at `##` inside each part and optional `###` only under
 *   `## Penyelesaian`.
 */
export function findAnswerStructureFindings(
  locale: LessonVoiceLocale,
  source: string,
  tree: MdxNode,
  isParts: boolean
): HeadingFinding[] {
  const headings = outlineHeadings(source, tree);
  const findings: HeadingFinding[] = [];

  for (const heading of headings) {
    if (
      isParts &&
      heading.depth === 1 &&
      isCleanPartHeading(locale, heading.label)
    ) {
      continue;
    }
    if (hasForbiddenHeadingSymbol(heading.label, locale)) {
      findings.push({
        blocking: true,
        line: heading.line,
        message: `Heading '${heading.label}' contains a forbidden symbol or punctuation (such as ':'). Keep headings natural with letters and ordinary spaces only.`,
        rule: "heading-symbol",
      });
    }
  }

  if (!isParts) {
    findings.push(
      ...checkFourHeadingSequence(locale, headings, 1, "Try-out answer", 1)
    );
    return findings;
  }

  const parts = splitByPart(headings);
  if (parts.length === 0) {
    findings.push({
      blocking: true,
      line: 1,
      message: `Multi-part answer must open each part with '# ${ANSWER_PART_WORDS[locale]} <label>' without a colon.`,
      rule: "answer-heading-structure",
    });
    return findings;
  }

  for (const { header, children } of parts) {
    findings.push(
      ...checkFourHeadingSequence(
        locale,
        children,
        2,
        `Part '${header.label}'`,
        header.line
      )
    );
  }
  return findings;
}
