import { Array as Arr, Effect, Schema } from "effect";

import { ItemVersionSchema } from "#contracts/assessment/item";
import { ItemKeySchema } from "#contracts/assessment/key";
import { PaperSchema, verifyPaperPlaces } from "#contracts/assessment/paper";
import { decodeStrict } from "#contracts/test/assessment/document";
import { tkaPaper, tkaSection } from "#contracts/test/assessment/exam";
import {
  tkaMultiple,
  tkaMultipleEnglish,
} from "#contracts/test/assessment/tka";

/** The multiple-choice question placed in Indonesian and English, the section's two languages. */
export const bilingualPlacement = {
  family: tkaMultiple.family,
  versions: [
    { hash: tkaMultiple.hash, language: "id" },
    { hash: tkaMultipleEnglish.hash, language: "en" },
  ],
};

/** A paper of one section in two languages, whose one place holds both versions. */
export const bilingualPaper = {
  ...tkaPaper,
  sections: [
    {
      ...tkaSection,
      languages: ["id", "en"],
      placements: [bilingualPlacement],
    },
  ],
};

/** The key of one version: the choices that are correct, or the texts a learner may type. */
export function keyOf(version: string, answer: Record<string, unknown>) {
  return { answers: [{ interaction: "statements", ...answer }], version };
}

/** The correct choices of the multiple-choice question, the same in every language. */
export const choice = { correct: ["option-1", "option-3"], kind: "choice" };

/** A typed answer, accepted in the words of one language. */
export function text(acceptedAnswers: readonly string[], ignoreCase = true) {
  return {
    accepted: {
      acceptedAnswers,
      collapseWhitespace: true,
      ignoreCase,
      kind: "text",
    },
    kind: "textEntry",
  };
}

/** Verifies the places of the bilingual paper with the given versions and keys, and returns the reason it fails, if any. */
export function places(
  versions: readonly unknown[],
  keys: readonly Record<string, unknown>[]
) {
  return verifyPaperPlaces(
    decodeStrict(PaperSchema, bilingualPaper),
    Arr.map(versions, (version) =>
      Schema.decodeUnknownSync(ItemVersionSchema)(version)
    ),
    Arr.map(keys, (key) => Schema.decodeUnknownSync(ItemKeySchema)(key))
  ).pipe(
    Effect.as("held"),
    Effect.catchTag("PaperPlaceMismatchError", ({ reason }) =>
      Effect.succeed(reason)
    )
  );
}

/** The two language versions of the multiple-choice question. */
export const bilingualVersions = [tkaMultiple, tkaMultipleEnglish];

/** The keys of both versions, the second the same as the first unless given. */
export function bilingualKeys(
  indonesian: Record<string, unknown>,
  english: Record<string, unknown> = indonesian
) {
  return [
    keyOf(tkaMultiple.hash, indonesian),
    keyOf(tkaMultipleEnglish.hash, english),
  ];
}

/** Keys of two answers that each language lists in another order. */
export function reorderedKeys() {
  const order = {
    interaction: "reading",
    kind: "order",
    sequence: ["step-1", "step-2"],
  };
  const statements = { interaction: "statements", ...choice };
  return [
    { answers: [statements, order], version: tkaMultiple.hash },
    { answers: [order, statements], version: tkaMultipleEnglish.hash },
  ];
}
