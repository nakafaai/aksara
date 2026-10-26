import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Effect } from "effect";
import { setSourcePath } from "#corpus/question-bank/path";
import { readQuestionPrompts } from "#corpus/question-bank/prompt";
import { readQuestionSets } from "#corpus/question-bank/source";
import {
  CHECKOUT,
  checkoutLayer,
  questionFiles,
  stimulusFiles,
  TEST_ITEM,
  TEST_SET,
} from "#corpus/test/bank";

const files = [
  ...questionFiles(1, { ...TEST_ITEM, stimulus: "passage-1" }, "Pilih satu."),
  ...questionFiles(2, {
    versions: { en: TEST_ITEM.versions.id, id: TEST_ITEM.versions.id },
  }),
  ...stimulusFiles("passage-1", "Bacaan bersama."),
];

describe("readQuestionPrompts", () => {
  it.effect("reads each task with the shared reading before its prompt", () =>
    Effect.gen(function* () {
      const sets = yield* readQuestionSets(CHECKOUT, [TEST_SET]);
      const prompts = yield* readQuestionPrompts(CHECKOUT, sets);

      expect(
        Arr.map(prompts, ({ language, path, rawMdx }) => ({
          language,
          path,
          rawMdx,
        }))
      ).toEqual([
        {
          language: "id",
          path: setSourcePath(TEST_SET, "question-1", "question.id.mdx"),
          rawMdx: "Bacaan bersama.\n\nPilih satu.",
        },
        {
          language: "en",
          path: setSourcePath(TEST_SET, "question-2", "question.en.mdx"),
          rawMdx: "Soal nomor 2.",
        },
        {
          language: "id",
          path: setSourcePath(TEST_SET, "question-2", "question.id.mdx"),
          rawMdx: "Soal nomor 2.",
        },
      ]);
    }).pipe(Effect.provide(checkoutLayer(files)))
  );

  it.effect("names a prompt it cannot read", () =>
    Effect.gen(function* () {
      const sets = yield* readQuestionSets(CHECKOUT, [TEST_SET]).pipe(
        Effect.provide(checkoutLayer(files))
      );
      const error = yield* readQuestionPrompts(CHECKOUT, sets).pipe(
        Effect.provide(checkoutLayer([])),
        Effect.flip
      );

      expect(error).toMatchObject({
        _tag: "QuestionReadError",
        path: setSourcePath(TEST_SET, "question-1", "question.id.mdx"),
      });
    })
  );
});
