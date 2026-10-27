import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Effect } from "effect";
import type { ItemSource } from "#corpus/question-bank/item";
import { setSourcePath } from "#corpus/question-bank/path";
import { readQuestionSets } from "#corpus/question-bank/source";
import { validateQuestionUniqueness } from "#corpus/question-bank/uniqueness";
import {
  CHECKOUT,
  checkoutLayer,
  questionFiles,
  stimulusFiles,
  TEST_ITEM,
  TEST_SET,
} from "#corpus/test/bank";

/** One question of the test set: its prompt and the item it uses. */
type Question = readonly [prompt: string, item?: ItemSource];

/** Validates the test set that holds the given questions and readings. */
function validate(
  questions: readonly Question[],
  readings: readonly (readonly [string, string])[] = []
) {
  const files = [
    ...Arr.flatMap(questions, ([prompt, item], index) =>
      questionFiles(index + 1, item, prompt)
    ),
    ...Arr.flatMap(readings, ([key, text]) => stimulusFiles(key, text)),
  ];
  return Effect.gen(function* () {
    const sets = yield* readQuestionSets(CHECKOUT, [TEST_SET]);
    return yield* validateQuestionUniqueness(CHECKOUT, sets);
  }).pipe(Effect.provide(checkoutLayer(files)));
}

/** The repository path of the Indonesian prompt of one question. */
function promptPath(number: number) {
  return setSourcePath(TEST_SET, `question-${number}`, "question.id.mdx");
}

const english: ItemSource = { versions: { en: TEST_ITEM.versions.id } };

describe("validateQuestionUniqueness", () => {
  it.effect(
    "accepts distinct prompts and the same words in another locale",
    () =>
      validate([
        ["Berapa suara yang didapat calon A?"],
        ["Siapa calon dengan suara terbanyak?"],
        ["Berapa suara yang didapat calon A?", english],
      ])
  );

  it.effect("tells two questions apart by the readings they are asked on", () =>
    validate(
      [
        ["Apa gagasan utama bacaan?", { ...TEST_ITEM, stimulus: "passage-1" }],
        ["Apa gagasan utama bacaan?", { ...TEST_ITEM, stimulus: "passage-2" }],
      ],
      [
        ["passage-1", "Hutan bakau menahan ombak."],
        ["passage-2", "Kota memilih ketua kelas."],
      ]
    )
  );

  it.effect("rejects prompts that repeat after formatting is removed", () =>
    Effect.gen(function* () {
      const error = yield* validate([
        ["Berapa nilai **x** jika  x + 1 = y?"],
        ["berapa nilai “x” jika x + 1 = y?"],
      ]).pipe(Effect.flip);

      expect(error).toMatchObject({
        _tag: "QuestionDuplicateError",
        repeats: [{ match: "text", paths: [promptPath(1), promptPath(2)] }],
      });
    })
  );

  it.effect("rejects prompts that differ only in numbers", () =>
    Effect.gen(function* () {
      const error = yield* validate([
        ["Hitung $$2,5 + 3$$ dari $$10{.}000$$ suara."],
        ["Hitung $$4 + 7,25$$ dari $$20{.}000$$ suara."],
      ]).pipe(Effect.flip);

      expect(error).toMatchObject({
        repeats: [{ match: "numbers", paths: [promptPath(1), promptPath(2)] }],
      });
    })
  );

  it.effect(
    "reports an exact repeat once and still names its number clone",
    () =>
      Effect.gen(function* () {
        const error = yield* validate([
          ["Ada 3 bola merah."],
          ["Ada 3 bola merah."],
          ["Ada 5 bola merah."],
          ["Bola biru berapa?"],
          ["Bola biru berapa?"],
        ]).pipe(Effect.flip);

        expect(error).toMatchObject({
          _tag: "QuestionDuplicateError",
          repeats: [
            { match: "text", paths: [promptPath(1), promptPath(2)] },
            { match: "text", paths: [promptPath(4), promptPath(5)] },
            {
              match: "numbers",
              paths: [promptPath(1), promptPath(2), promptPath(3)],
            },
          ],
        });
      })
  );
});
