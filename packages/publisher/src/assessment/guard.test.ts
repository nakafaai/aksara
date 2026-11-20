import { describe, expect, it } from "@effect/vitest";
import { ItemSourceSchema } from "@nakafa/aksara-corpus/question-bank/item";
import {
  SetPathSchema,
  setSourcePath,
} from "@nakafa/aksara-corpus/question-bank/path";
import type { QuestionSet } from "@nakafa/aksara-corpus/question-bank/source";
import { Array as Arr, Effect, Schema } from "effect";
import {
  NAKAFA_SERVES_PARTS,
  requireServableParts,
} from "#publisher/assessment/guard";

const path = SetPathSchema.make("test-country/test-exam/test-section/set-1");
const explanations: QuestionSet["explanations"] = ["id"];

/** A choice that asks a single thing. */
const choice = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "Satu" },
        { correct: false, label: "Dua" },
      ],
    },
  },
};

/** An Aufgabe of two typed parts. */
const aufgabe = {
  versions: {
    de: {
      kind: "parts",
      parts: [
        { expression: "2x", kind: "mathEntry", label: "a", points: 2 },
        { kind: "numericEntry", label: "b", points: 1, value: "4" },
      ],
    },
  },
};

/** One set of the given items, in order. */
function set(items: readonly unknown[]): QuestionSet {
  return {
    explanations,
    path,
    questions: Arr.map(items, (item, index) => ({
      explanations,
      item: Schema.decodeUnknownSync(ItemSourceSchema)(item),
      number: index + 1,
      set: path,
      sourceRoot: setSourcePath(path, `question-${index + 1}`),
    })),
    stimuli: [],
  };
}

describe("requireServableParts", () => {
  it.effect("refuses a release with items that have parts, naming each", () =>
    Effect.gen(function* () {
      const error = yield* requireServableParts(
        [set([choice, aufgabe]), set([aufgabe])],
        false
      ).pipe(Effect.flip);
      const second = `${setSourcePath(path, "question-2")}/item.ts`;
      const first = `${setSourcePath(path, "question-1")}/item.ts`;

      expect(error._tag).toBe("PartsReleaseError");
      expect(error.items).toEqual([second, first]);
      expect(error.message).toBe(
        `2 item(s) with parts cannot be released until Nakafa production serves them (T1's plan B): ${second}, ${first}. Keep them out of the active try-outs, or set NAKAFA_SERVES_PARTS in packages/publisher/src/assessment/guard.ts once plan B is live.`
      );
    })
  );

  it.effect("releases items with parts once Nakafa serves them", () =>
    requireServableParts([set([choice, aufgabe])], true)
  );

  it.effect("releases items that ask a single thing either way", () =>
    Effect.gen(function* () {
      yield* requireServableParts([set([choice, choice])], false);
      yield* requireServableParts([set([choice])], true);
      yield* requireServableParts([], false);
    })
  );

  it("refuses parts until T1 records plan B live on Nakafa production", () => {
    expect(NAKAFA_SERVES_PARTS).toBe(false);
  });
});
