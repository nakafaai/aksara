import type { LessonVoiceLocale } from "#nakafa-content/voice/types";

const LEADING_LETTERS_PATTERN = /^\p{L}+/u;
const SINGLE_LETTER_PATTERN = /^\p{L}$/u;
const TRAILING_LETTERS_PATTERN = /\p{L}+$/u;

/**
 * Accepts only a heading hyphen that standard word formation requires.
 * Indonesian keeps its reduplication hyphen, as in `rata-rata`. German and
 * English keep the hyphen that joins one letter to a word, as in `y-Achse` or
 * `x-axis`; the German rules list `y-Achse` under § 40(1). A single letter on
 * both sides, as in `x-y`, is notation and stays out of a heading.
 * @see https://www.rechtschreibrat.com/regeln-und-woerterverzeichnis/
 */
export function isRequiredHeadingHyphen(
  heading: string,
  index: number,
  locale: LessonVoiceLocale
): boolean {
  if (heading[index] !== "-") {
    return false;
  }
  const left = heading.slice(0, index).match(TRAILING_LETTERS_PATTERN)?.[0];
  const right = heading.slice(index + 1).match(LEADING_LETTERS_PATTERN)?.[0];
  if (!(left && right)) {
    return false;
  }
  if (locale === "id") {
    return left.localeCompare(right, "id", { sensitivity: "base" }) === 0;
  }
  return SINGLE_LETTER_PATTERN.test(left) && right.length > 1;
}
