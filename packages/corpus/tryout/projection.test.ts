import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Effect } from "effect";
import type { QuestionSet } from "#corpus/question-bank/source";
import { readQuestionSets } from "#corpus/question-bank/source";
import {
  CHECKOUT,
  checkoutLayer,
  questionFiles,
  stimulusFiles,
  TEST_ITEM,
} from "#corpus/test/bank";
import {
  testExam,
  testExamFiles,
  testExamInput,
  testSectionSet,
  testSubjectSection,
  testSubjectTrack,
  testYearTrack,
} from "#corpus/test/exam";
import { examSetPaths, planTryoutPapers } from "#corpus/tryout/projection";
import { defineExamSource } from "#corpus/tryout/schema";

const subjectSet = testSectionSet("test-subject");

/** Reads the bank sets of the test exam from the given files. */
function readSets(files: Iterable<readonly [string, string]>) {
  return Effect.gen(function* () {
    const exam = yield* testExam;
    return yield* readQuestionSets(CHECKOUT, examSetPaths([exam]));
  }).pipe(Effect.provide(checkoutLayer(files)));
}

/** Plans the papers of the test exam over the given bank sets. */
function plan(sets: readonly QuestionSet[]) {
  return Effect.flatMap(testExam, (exam) => planTryoutPapers([exam], sets));
}

/** The test bank with the subject set replaced by the given files. */
function withSubject(files: readonly (readonly [string, string])[]) {
  return [
    ...Arr.filter(testExamFiles, ([path]) => !path.includes(subjectSet)),
    ...files,
  ];
}

describe("examSetPaths", () => {
  it.effect("lists the bank set of every section of every set", () =>
    Effect.gen(function* () {
      expect(examSetPaths([yield* testExam])).toEqual([
        subjectSet,
        testSectionSet("test-reasoning"),
        testSectionSet("test-english"),
      ]);
    })
  );
});

describe("planTryoutPapers", () => {
  it.effect("plans one paper for each set, each section in its language", () =>
    Effect.gen(function* () {
      const papers = yield* plan(yield* readSets(testExamFiles));

      expect(
        Arr.map(papers, ({ id, profile, sections, setKey, trackKey }) => ({
          id,
          profile,
          sections: Arr.map(sections, ({ key, language, set }) => [
            key,
            language,
            set.questions.length,
          ]),
          setKey,
          trackKey,
        }))
      ).toEqual([
        {
          id: "test-country/test-exam/test-subject/set-1",
          profile: "test-country/test-exam/test-subject",
          sections: [["test-subject", "id", 2]],
          setKey: "set-1",
          trackKey: "test-subject",
        },
        {
          id: "test-country/test-exam/2027/set-1",
          profile: "test-country/test-exam/2027",
          sections: [
            ["test-reasoning", "id", 1],
            ["test-english", "en", 1],
          ],
          setKey: "set-1",
          trackKey: "2027",
        },
      ]);
    })
  );

  it.effect(
    "refuses a missing set, a wrong item count, and a missing language",
    () =>
      Effect.gen(function* () {
        const sets = yield* readSets(testExamFiles);
        const missing = yield* plan(
          Arr.filter(sets, ({ path }) => path !== subjectSet)
        ).pipe(Effect.flip);
        const items = yield* plan(
          yield* readSets(
            withSubject(questionFiles(1, TEST_ITEM, "Satu.", subjectSet))
          )
        ).pipe(Effect.flip);
        const language = yield* plan(
          yield* readSets(
            withSubject([
              ...questionFiles(1, TEST_ITEM, "Satu.", subjectSet),
              ...questionFiles(
                2,
                { versions: { en: TEST_ITEM.versions.id } },
                "Two.",
                subjectSet
              ),
            ])
          )
        ).pipe(Effect.flip);

        expect(
          Arr.map([missing, items, language], (error) =>
            "reason" in error ? error.reason : error._tag
          )
        ).toEqual(["missing", "items", "language"]);
      })
  );

  it.effect(
    "requires a shared reading to sit beside two questions or more in a row",
    () =>
      Effect.gen(function* () {
        const onReading = { ...TEST_ITEM, stimulus: "passage-1" };
        const isolated = yield* plan(
          yield* readSets(
            withSubject([
              ...questionFiles(1, onReading, "Satu.", subjectSet),
              ...questionFiles(2, TEST_ITEM, "Dua.", subjectSet),
              ...stimulusFiles("passage-1", "Bacaan.", ["id"], subjectSet),
            ])
          )
        ).pipe(Effect.flip);
        const grouped = yield* plan(
          yield* readSets(
            withSubject([
              ...questionFiles(1, onReading, "Satu.", subjectSet),
              ...questionFiles(2, onReading, "Dua.", subjectSet),
              ...stimulusFiles("passage-1", "Bacaan.", ["id"], subjectSet),
            ])
          )
        );

        expect(isolated).toMatchObject({
          _tag: "StimulusGroupError",
          key: "passage-1",
          reason: "isolated",
        });
        expect(grouped).toHaveLength(2);
      })
  );

  it.effect(
    "requires the questions of a shared reading to follow each other",
    () =>
      Effect.gen(function* () {
        const exam = yield* defineExamSource({
          ...testExamInput,
          tracks: [
            {
              ...testSubjectTrack,
              profile: {
                ...testSubjectTrack.profile,
                sections: [{ ...testSubjectSection, items: 3 }],
              },
            },
            testYearTrack,
          ],
        });
        const onReading = { ...TEST_ITEM, stimulus: "passage-1" };
        const sets = yield* readSets(
          withSubject([
            ...questionFiles(1, onReading, "Satu.", subjectSet),
            ...questionFiles(2, TEST_ITEM, "Dua.", subjectSet),
            ...questionFiles(3, onReading, "Tiga.", subjectSet),
            ...stimulusFiles("passage-1", "Bacaan.", ["id"], subjectSet),
          ])
        );
        const error = yield* planTryoutPapers([exam], sets).pipe(Effect.flip);

        expect(error).toMatchObject({
          _tag: "StimulusGroupError",
          reason: "noncontiguous",
        });
      })
  );
});
