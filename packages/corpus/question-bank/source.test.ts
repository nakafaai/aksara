import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Effect } from "effect";
import { CALIBRATION_FILE } from "#corpus/question-bank/calibration";
import type { ItemSource } from "#corpus/question-bank/item";
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

/** An item with one written part, which a calibration file can sit beside. */
const written: ItemSource = {
  versions: {
    id: {
      kind: "parts",
      parts: [
        {
          kind: "extendedText",
          label: "a",
          points: 1,
          rubric: [
            {
              feedback: { earned: "Tepat.", missed: "Belum lengkap." },
              label: "Alasan",
              met: "Menjelaskan alasannya.",
              points: 1,
            },
          ],
        },
      ],
    },
  },
};

/** A calibration of part `a` of `written` whose one sample marks the given criterion. */
const calibration = (part: string) =>
  `import type { Calibration } from "#corpus/question-bank/calibration";\n\nconst calibration: Calibration = {\n  ${part}: [\n    {\n      grade: "good",\n      id: "good-1",\n      marks: [{ criterion: 1, met: true, reason: "Lengkap." }],\n      text: "Karena.",\n    },\n  ],\n};\n\nexport default calibration;\n`;

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

        if (set === undefined) {
          return expect.unreachable("Expected the one test set.");
        }
        expect(set.path).toBe(TEST_SET);
        expect(Arr.map(set.questions, ({ number }) => number)).toEqual([
          1, 2, 3,
        ]);
        expect(set.explanations).toEqual(["en", "id", "de", "ms"]);
        expect(set.questions[0]).toEqual({
          explanations: ["en", "id", "de", "ms"],
          item: onReading,
          number: 1,
          set: TEST_SET,
          sourceRoot: setSourcePath(TEST_SET, "question-1"),
        });
        expect(set.stimuli).toEqual([
          {
            key: "passage-1",
            languages: ["id"],
            set: TEST_SET,
            sourceRoot: setSourcePath(TEST_SET, "passage-1"),
          },
        ]);
      })
  );

  it.effect(
    "reads a calibration file beside an item and checks it against the item",
    () =>
      Effect.gen(function* () {
        const file = setSourcePath(TEST_SET, `question-1/${CALIBRATION_FILE}`);
        const [set] = yield* read([
          ...questionFiles(1, written),
          [file, calibration("a")],
        ]);
        const wrong = yield* reject([
          ...questionFiles(1, written),
          [file, calibration("b")],
        ]);

        expect(set?.questions[0]?.item).toEqual(written);
        expect(wrong).toMatchObject({
          _tag: "CalibrationError",
          problems: ["b is not a written part of the item"],
        });
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
          Arr.filter(questionFiles(1), ([path]) => !path.endsWith("/item.ts"))
        );
        const withoutAnswer = yield* reject([
          ...Arr.filter(
            questionFiles(1),
            ([path]) => !path.endsWith("answer.de.mdx")
          ),
          ...questionFiles(2),
        ]);
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
    "publishes a set in exactly the locales every question explains it in",
    () =>
      Effect.gen(function* () {
        /** The files of one question without its explanations in German and Malay. */
        const unwritten = (number: number) =>
          Arr.filter(
            questionFiles(number),
            ([path]) =>
              !(
                path.endsWith("answer.de.mdx") || path.endsWith("answer.ms.mdx")
              )
          );
        const [set] = yield* read([...unwritten(1), ...unwritten(2)]);
        const partial = yield* reject([...questionFiles(1), ...unwritten(2)]);
        const none = yield* reject(
          Arr.filter(questionFiles(1), ([path]) => !path.includes("/answer."))
        );

        expect(set?.explanations).toEqual(["en", "id"]);
        expect(
          Arr.map(set?.questions ?? [], ({ explanations }) => explanations)
        ).toEqual([
          ["en", "id"],
          ["en", "id"],
        ]);
        expect(partial).toMatchObject({
          _tag: "QuestionFileSetError",
          sourcePath: setSourcePath(TEST_SET, "question-2"),
        });
        expect(none).toMatchObject({
          _tag: "QuestionExplanationError",
          set: TEST_SET,
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
