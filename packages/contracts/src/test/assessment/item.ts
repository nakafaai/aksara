import { doc, note, paragraph } from "#contracts/test/assessment/document";

/** Builds a test-only SHA-256 hash from one hexadecimal digit. */
export function hash(digit: string) {
  return `sha256:${digit.repeat(64)}`;
}

/** Builds one option or statement labeled by a document of one paragraph. */
export function part(id: string, ...content: readonly unknown[]) {
  return { id, label: doc(paragraph(...content)) };
}

/** Builds one option labeled by a plain sentence. */
export function plainPart(id: string, value: string) {
  return { id, label: note(value) };
}

/** The accessible name that every test interaction carries. */
export const NAME = "Pilih jawaban";

/** Builds one single-choice interaction of the given options, one correct. */
export function singleChoice<Option extends object>(
  options: readonly Option[]
) {
  return {
    id: "answer",
    kind: "choice",
    label: NAME,
    maxChoices: 1,
    minChoices: 1,
    options,
    shuffle: false,
  };
}
