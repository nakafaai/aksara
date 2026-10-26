import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { setSourcePath } from "#corpus/question-bank/path";
import { readQuestionSets } from "#corpus/question-bank/source";
import {
  CHECKOUT,
  checkoutLayer,
  questionFiles,
  stimulusFiles,
  TEST_ITEM,
  TEST_SET,
} from "#corpus/test/bank";

const onReading = { ...TEST_ITEM, stimulus: "passage-1" };

/** Reads the one test set from a virtual checkout of the given files. */
function read(files: Iterable<readonly [string, string]>) {
  return readQuestionSets(CHECKOUT, [TEST_SET]).pipe(
    Effect.provide(checkoutLayer(files))
  );
}

/** Reads the one test set and returns the failure it reads with. */
function reject(files: Iterable<readonly [string, string]>) {
  return read(files).pipe(Effect.flip);
}

describe("readQuestionSets", () => {
  it.effect(
    "reads the questions of a set in order and the readings they share",
    () =>
      Effect.gen(function* () {
        const [set] = yield* read([
          ...questionFiles(2, onReading),
          ...questionFiles(1, onReading),
          ...questionFiles(3),
          ...stimulusFiles("passage-1", "Bacaan bersama."),
        ]);

        expect(set?.path).toBe(TEST_SET);
        expect(set?.questions.map(({ number }) => number)).toEqual([1, 2, 3]);
        expect(set?.questions[0]).toEqual({
          item: onReading,
          number: 1,
          set: TEST_SET,
          sourceRoot: setSourcePath(TEST_SET, "question-1"),
        });
        expect(set?.stimuli).toEqual([
          {
            key: "passage-1",
            languages: ["id"],
            set: TEST_SET,
            sourceRoot: setSourcePath(TEST_SET, "passage-1"),
          },
        ]);
      })
  );

  it.effect("refuses a set folder that is missing or holds a stray file", () =>
    Effect.gen(function* () {
      const missing = yield* reject([]);
      const stray = yield* reject([
        ...questionFiles(1),
        [setSourcePath(TEST_SET, "notes.md"), "Notes."],
      ]);

      expect(missing._tag).toBe("QuestionReadError");
      expect(stray).toMatchObject({
        _tag: "QuestionBankPathError",
        path: `${TEST_SET}/notes.md`,
      });
    })
  );

  it.effect("requires questions numbered from one without a gap", () =>
    Effect.gen(function* () {
      const gap = yield* reject([...questionFiles(1), ...questionFiles(3)]);
      const none = yield* reject(stimulusFiles("passage-1", "Bacaan."));

      expect(gap).toMatchObject({
        _tag: "QuestionSequenceError",
        numbers: [1, 3],
      });
      expect(none).toMatchObject({
        _tag: "QuestionSequenceError",
        numbers: [],
      });
    })
  );

  it.effect(
    "requires each question to hold exactly the files its item names",
    () =>
      Effect.gen(function* () {
        const withoutItem = yield* reject(
          questionFiles(1).filter(([path]) => !path.endsWith("/item.ts"))
        );
        const withoutAnswer = yield* reject(
          questionFiles(1).filter(([path]) => !path.endsWith("answer.de.mdx"))
        );
        const extraPrompt = yield* reject([
          ...questionFiles(1),
          [setSourcePath(TEST_SET, "question-1", "question.en.mdx"), "Extra."],
        ]);

        expect(withoutItem._tag).toBe("QuestionReadError");
        expect(withoutAnswer._tag).toBe("QuestionFileSetError");
        expect(extraPrompt).toMatchObject({
          _tag: "QuestionFileSetError",
          sourcePath: setSourcePath(TEST_SET, "question-1"),
        });
      })
  );

  it.effect(
    "requires every named reading to exist in each language and to be used",
    () =>
      Effect.gen(function* () {
        const missing = yield* reject(questionFiles(1, onReading));
        const unused = yield* reject([
          ...questionFiles(1),
          ...stimulusFiles("passage-1", "Bacaan."),
        ]);
        const extraLanguage = yield* reject([
          ...questionFiles(1, onReading),
          ...stimulusFiles("passage-1", "Bacaan.", ["en", "id"]),
        ]);

        expect(missing).toMatchObject({
          _tag: "StimulusReferenceError",
          key: "passage-1",
          reason: "missing",
        });
        expect(unused).toMatchObject({
          _tag: "StimulusReferenceError",
          reason: "unused",
        });
        expect(extraLanguage).toMatchObject({
          _tag: "QuestionFileSetError",
          sourcePath: setSourcePath(TEST_SET, "passage-1"),
        });
      })
  );
});
