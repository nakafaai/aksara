import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Effect, HashSet } from "effect";

import {
  testExamInput,
  testSubjectTrack,
  testYearTrack,
} from "#corpus/test/exam";
import { servedExams, servedPaperIds } from "#corpus/tryout/held";
import { defineExamSource } from "#corpus/tryout/schema";
import { paperId } from "#corpus/tryout/track";

describe("servedExams", () => {
  it.effect(
    "leaves out held tracks, groups left with no track, and exams left with no group",
    () =>
      Effect.gen(function* () {
        const open = yield* defineExamSource(testExamInput);
        const partly = yield* defineExamSource({
          ...testExamInput,
          examKey: "partly-held",
          tracks: [{ ...testSubjectTrack, held: true }, testYearTrack],
        });
        const whole = yield* defineExamSource({
          ...testExamInput,
          examKey: "all-held",
          tracks: [
            { ...testSubjectTrack, held: true },
            { ...testYearTrack, held: true },
          ],
        });

        const served = servedExams([open, partly, whole]);

        expect(Arr.map(served, ({ examKey }) => examKey)).toEqual([
          "test-exam",
          "partly-held",
        ]);
        expect(served[0]).toEqual(open);
        expect(Arr.map(served[1]?.tracks ?? [], ({ key }) => key)).toEqual([
          "2027",
        ]);
        expect(
          Arr.map(served[1]?.grouping.groups ?? [], ({ key }) => key)
        ).toEqual(["test-upper"]);
      })
  );
});

describe("servedPaperIds", () => {
  it.effect("names the paper of every set of every served track", () =>
    Effect.gen(function* () {
      const exam = yield* defineExamSource(testExamInput);
      const ids = servedPaperIds([exam]);

      expect(HashSet.size(ids)).toBe(2);
      for (const track of exam.tracks) {
        for (const set of track.sets) {
          expect(HashSet.has(ids, paperId(exam, track, set))).toBe(true);
        }
      }
    })
  );
});
