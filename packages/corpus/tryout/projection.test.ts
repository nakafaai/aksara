import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Effect } from "effect";
import type { TaskSource } from "#corpus/question-bank/item";
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
  it.effect("plans one paper for each set, each section in its languages", () =>
    Effect.gen(function* () {
      const papers = yield* plan(yield* readSets(testExamFiles));

      expect(
        Arr.map(papers, ({ id, profile, sections, setKey, trackKey }) => ({
          id,
          profile,
          sections: Arr.map(sections, ({ key, languages, set }) => [
            key,
            languages,
            set.questions.length,
          ]),
          setKey,
          trackKey,
        }))
      ).toEqual([
        {
          id: "test-country/test-exam/test-subject/set-1",
          profile: "test-country/test-exam/test-subject",
          sections: [["test-subject", ["id"], 2]],
          setKey: "set-1",
          trackKey: "test-subject",
        },
        {
          id: "test-country/test-exam/2027/set-1",
          profile: "test-country/test-exam/2027",
          sections: [
            ["test-reasoning", ["id"], 1],
            ["test-english", ["en"], 1],
          ],
          setKey: "set-1",
          trackKey: "2027",
        },
      ]);
    })
  );

  it.effect(
    "refuses a missing set, a wrong item count, a missing language, and a kind or a part kind its section does not allow",
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

        const kinds = yield* Effect.forEach(
          [
            { kind: "numericEntry", value: "2" },
            {
              kind: "parts",
              parts: [
                { expression: "2", kind: "mathEntry", label: "a", points: 1 },
              ],
            },
          ] satisfies TaskSource[],
          (task) =>
            Effect.flatMap(
              readSets(
                withSubject([
                  ...questionFiles(1, TEST_ITEM, "Satu.", subjectSet),
                  ...questionFiles(
                    2,
                    { versions: { id: task } },
                    "Dua.",
                    subjectSet
                  ),
                ])
              ),
              (read) => Effect.flip(plan(read))
            )
        );

        expect(
          Arr.map([missing, items, language, ...kinds], (error) =>
            "reason" in error ? error.reason : error._tag
          )
        ).toEqual([
          "missing",
          "items",
          "language",
          "interaction",
          "interaction",
        ]);
      })
  );

  it.effect(
    "plans a section in two languages only when every item is written in both",
    () =>
      Effect.gen(function* () {
        const exam = yield* defineExamSource({
          ...testExamInput,
          tracks: [
            {
              ...testSubjectTrack,
              profile: {
                ...testSubjectTrack.profile,
                sections: [{ ...testSubjectSection, languages: ["id", "en"] }],
              },
            },
            testYearTrack,
          ],
        });
        const both = {
          versions: { en: TEST_ITEM.versions.id, id: TEST_ITEM.versions.id },
        };
        /** Plans the bilingual exam over the subject set written in the given files. */
        const planBilingual = (files: readonly (readonly [string, string])[]) =>
          Effect.gen(function* () {
            const sets = yield* readQuestionSets(
              CHECKOUT,
              examSetPaths([exam])
            ).pipe(Effect.provide(checkoutLayer(withSubject(files))));
            return yield* planTryoutPapers([exam], sets);
          });
        const [paper] = yield* planBilingual([
          ...questionFiles(1, both, "Satu.", subjectSet),
          ...questionFiles(2, both, "Dua.", subjectSet),
        ]);
        const missing = yield* planBilingual([
          ...questionFiles(1, both, "Satu.", subjectSet),
          ...questionFiles(2, TEST_ITEM, "Dua.", subjectSet),
        ]).pipe(Effect.flip);

        expect(
          Arr.map(paper?.sections ?? [], ({ languages }) => languages)
        ).toEqual([["id", "en"]]);
        expect(missing).toMatchObject({ reason: "language", set: subjectSet });
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
