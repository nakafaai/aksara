import { NodeServices } from "@effect/platform-node";
import { describe, expect, it } from "@effect/vitest";
import { Effect, Exit, Schema } from "effect";
import {
  testEnglishSection as english,
  testReasoningSection as reasoning,
  testSubjectTrack as subject,
  testExamInput,
  testSet,
  testSubjectSection,
  testYearTrack as year,
} from "#corpus/test/exam";
import { importCorpusModules } from "#corpus/test/imports";
import { defineExamSource, ExamSourceSchema } from "#corpus/tryout/schema";

const decode = Schema.decodeUnknownExit(ExamSourceSchema, {
  onExcessProperty: "error",
});

/** The test exam input with its year track replaced. */
function withYear(change: Partial<typeof year>) {
  return { ...testExamInput, tracks: [subject, { ...year, ...change }] };
}

describe("exam source", () => {
  it.effect("decodes an exam with its tracks, profiles, and sets", () =>
    Effect.gen(function* () {
      const exam = yield* defineExamSource(testExamInput);

      expect(exam.tracks.map(({ key }) => key)).toEqual([
        "test-subject",
        "2027",
      ]);
      expect(exam.tracks[1]?.profile.sections.map(({ key }) => key)).toEqual([
        "test-reasoning",
        "test-english",
      ]);
    })
  );

  it("routes a visible section and only a visible one", () => {
    const { routeSlugs: _routeSlugs, ...unrouted } = reasoning;

    expect(
      Exit.isFailure(
        decode(
          withYear({
            profile: { ...year.profile, sections: [unrouted, english] },
          })
        )
      )
    ).toBe(true);
    expect(
      Exit.isFailure(
        decode({
          ...testExamInput,
          tracks: [
            {
              ...subject,
              profile: {
                ...subject.profile,
                sections: [
                  { ...testSubjectSection, routeSlugs: reasoning.routeSlugs },
                ],
              },
            },
          ],
        })
      )
    ).toBe(true);
  });

  it("enters a set through one section only when it is the set's only section", () => {
    const internal = testSubjectSection;

    expect(
      Exit.isFailure(
        decode(
          withYear({
            profile: { ...year.profile, sections: [reasoning, internal] },
          })
        )
      )
    ).toBe(true);
    expect(
      Exit.isFailure(
        decode(
          withYear({
            profile: { ...year.profile, sections: [internal, internal] },
          })
        )
      )
    ).toBe(true);
  });

  it.effect("names the first failure of a strict decode", () =>
    Effect.gen(function* () {
      const error = yield* defineExamSource({
        ...testExamInput,
        examKey: "Test Exam",
      }).pipe(Effect.flip);

      expect(error._tag).toBe("ExamSourceDecodeError");
    })
  );

  it.effect("refuses a key repeated among tracks, sets, or sections", () =>
    Effect.gen(function* () {
      const errors = yield* Effect.forEach(
        [
          { ...testExamInput, tracks: [subject, { ...subject, order: 2 }] },
          withYear({ sets: [testSet(1), { ...testSet(1), order: 2 }] }),
          withYear({
            profile: { ...year.profile, sections: [reasoning, reasoning] },
          }),
        ],
        (input) => defineExamSource(input).pipe(Effect.flip)
      );

      expect(errors.map((error) => "scope" in error && error.scope)).toEqual([
        "test-exam:tracks",
        "test-exam:2027:sets",
        "test-exam:2027:sections",
      ]);
    })
  );

  it.effect("loads every authored try-out exam module", () =>
    Effect.gen(function* () {
      const files = yield* importCorpusModules("tryout/**/source.ts");

      expect(files).toHaveLength(2);
    }).pipe(Effect.provide(NodeServices.layer))
  );
});
