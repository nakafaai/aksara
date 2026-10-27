import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { testExam, titled } from "#corpus/test/exam";
import { makeExamProfile, profileId } from "#corpus/tryout/profile";

describe("makeExamProfile", () => {
  it.effect("builds the profile of a raw-scored subject track", () =>
    Effect.gen(function* () {
      const exam = yield* testExam;
      const [subject] = exam.tracks;
      if (subject === undefined) {
        return yield* Effect.die("Expected the subject track.");
      }
      const profile = yield* makeExamProfile(exam, subject);

      expect(profileId(exam, subject)).toBe(
        "test-country/test-exam/test-subject"
      );
      expect(profile).toEqual({
        accommodations: { assigned: [], recorded: [], universal: [] },
        breaks: [],
        defaults: [
          { interaction: "choice", rule: { kind: "allOrNothing" } },
          { interaction: "matrix", rule: { kind: "allOrNothing" } },
        ],
        graceSeconds: 75,
        id: "test-country/test-exam/test-subject",
        names: {
          de: "Test Subject Exam",
          en: "Test Subject Exam",
          id: "Test Subject Exam",
        },
        report: { sections: false, standardError: false, total: true },
        sampledMath: "score",
        scoring: { kind: "raw" },
        sections: [
          {
            id: "test-subject",
            interactions: ["choice", "matrix"],
            items: 2,
            names: {
              de: "Test Subject",
              en: "Test Subject",
              id: "Test Subject",
            },
            navigation: "free",
            seconds: 600,
            tools: ["mark-for-review"],
          },
        ],
        totalSeconds: 600,
        writeAllowanceSeconds: 5,
      });
    })
  );

  it.effect("keeps the scale of a scaled track and sums its sections", () =>
    Effect.gen(function* () {
      const exam = yield* testExam;
      const [, year] = exam.tracks;
      if (year === undefined) {
        return yield* Effect.die("Expected the year track.");
      }
      const profile = yield* makeExamProfile(exam, year);

      expect(profile.scale).toEqual({ maximum: 1000, minimum: 0 });
      expect(profile.totalSeconds).toBe(540);
    })
  );

  it.effect("refuses a track whose names miss a locale", () =>
    Effect.gen(function* () {
      const exam = yield* testExam;
      const [subject] = exam.tracks;
      if (subject === undefined) {
        return yield* Effect.die("Expected the subject track.");
      }
      const { de: _de, ...partial } = titled("Test Subject Exam");
      const error = yield* makeExamProfile(exam, {
        ...subject,
        profile: { ...subject.profile, names: partial },
      }).pipe(Effect.flip);

      expect(error).toMatchObject({
        _tag: "ExamProfileSourceError",
        profile: "test-country/test-exam/test-subject",
      });
    })
  );
});
