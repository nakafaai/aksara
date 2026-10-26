import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Effect } from "effect";
import {
  testEnglishSection as english,
  testReasoningSection as reasoning,
  testSubjectTrack as subject,
  testExamInput,
  testYearTrack as year,
} from "#corpus/test/exam";
import {
  type AssessmentReadinessInput,
  defineAssessmentReadiness,
} from "#corpus/tryout/readiness/schema";
import { validateAssessmentSourceReadiness } from "#corpus/tryout/readiness/validation";
import { defineExamSource } from "#corpus/tryout/schema";

/** Binds one fixture value to its fixture-owned official evidence. */
const official = (value: number) => ({
  provenance: { evidenceKey: "official-source", kind: "official" as const },
  value,
});

/** The readiness of the reasoning section, its count and time both official. */
const reasoningReadiness = {
  key: "test-reasoning",
  order: 1,
  questionCount: official(1),
  timeLimitSeconds: official(300),
};

/** The readiness of the English section, its count set editorially. */
const englishReadiness = {
  key: "test-english",
  order: 2,
  questionCount: { provenance: { kind: "editorial" as const }, value: 1 },
  timeLimitSeconds: official(240),
};

const readinessInput: AssessmentReadinessInput = {
  countryKey: "test-country",
  evidence: [
    {
      key: "official-source",
      label: "Official source",
      retrievedAt: "2026-10-26",
      url: "https://example.edu/official",
    },
  ],
  examKey: "test-exam",
  sections: [reasoningReadiness, englishReadiness],
  sourceRevision: "2026-10-26",
  trackKey: "2027",
};

const marks = { blank: 0, correct: 4, wrong: -1 };

/** The test exam with its year track's profile changed. */
function withProfile(change: Partial<typeof year.profile>) {
  return defineExamSource({
    ...testExamInput,
    tracks: [subject, { ...year, profile: { ...year.profile, ...change } }],
  });
}

describe("validateAssessmentSourceReadiness", () => {
  it.effect("accepts a track that matches its readiness gate", () =>
    Effect.gen(function* () {
      const source = yield* defineExamSource(testExamInput);
      const readiness = yield* defineAssessmentReadiness(readinessInput);

      expect(yield* validateAssessmentSourceReadiness(source, readiness)).toBe(
        source
      );
    })
  );

  it.effect(
    "rejects drift in items, seconds, revision, and section count",
    () =>
      Effect.gen(function* () {
        const readiness = yield* defineAssessmentReadiness(readinessInput);
        const sources = yield* Effect.all([
          withProfile({ sections: [{ ...reasoning, items: 2 }, english] }),
          withProfile({ sections: [{ ...reasoning, seconds: 360 }, english] }),
          defineExamSource({ ...testExamInput, sourceRevision: "2026-10-25" }),
          withProfile({
            sections: [
              reasoning,
              english,
              {
                ...english,
                key: "test-extra",
                routeSlugs: {
                  de: "test-extra",
                  en: "test-extra",
                  id: "test-extra",
                },
              },
            ],
          }),
        ]);
        const failures = yield* Effect.forEach(sources, (source) =>
          validateAssessmentSourceReadiness(source, readiness).pipe(Effect.flip)
        );

        expect(
          Arr.map(failures, ({ actual, expected, field }) => [
            field,
            actual,
            expected,
          ])
        ).toEqual([
          ["questionCount", "2", "1"],
          ["timeLimitSeconds", "360", "300"],
          ["sourceRevision", "2026-10-25", "2026-10-26"],
          ["sectionCount", "3", "2"],
        ]);
      })
  );

  it.effect("rejects a missing track, sets, and section", () =>
    Effect.gen(function* () {
      const readiness = yield* defineAssessmentReadiness(readinessInput);
      const sources = yield* Effect.all([
        defineExamSource({
          ...testExamInput,
          tracks: [subject, { ...year, key: "2028" }],
        }),
        defineExamSource({
          ...testExamInput,
          tracks: [subject, { ...year, sets: [] }],
        }),
        withProfile({ sections: [reasoning] }),
        withProfile({ sections: [english, reasoning] }),
      ]);
      const failures = yield* Effect.forEach(sources, (source) =>
        validateAssessmentSourceReadiness(source, readiness).pipe(Effect.flip)
      );

      expect(Arr.map(failures, ({ field }) => field)).toEqual([
        "trackKey",
        "activeSets",
        "sectionKey",
        "sectionKey",
      ]);
    })
  );

  it.effect("validates penalized marks against their readiness evidence", () =>
    Effect.gen(function* () {
      const evidence = { ...official(0), value: marks };
      const marked = yield* defineAssessmentReadiness({
        ...readinessInput,
        sections: [
          { ...reasoningReadiness, marks: evidence },
          { ...englishReadiness, marks: evidence },
        ],
      });
      const unmarked = yield* defineAssessmentReadiness(readinessInput);
      const [penalized, drifted, scaled] = yield* Effect.all([
        withProfile({ scoring: { kind: "penalized", marks } }),
        withProfile({
          scoring: { kind: "penalized", marks: { ...marks, correct: 3 } },
        }),
        defineExamSource(testExamInput),
      ]);
      const failures = yield* Effect.forEach(
        [
          validateAssessmentSourceReadiness(drifted, marked),
          validateAssessmentSourceReadiness(scaled, marked),
          validateAssessmentSourceReadiness(penalized, unmarked),
        ],
        Effect.flip
      );

      expect(yield* validateAssessmentSourceReadiness(penalized, marked)).toBe(
        penalized
      );
      expect(
        Arr.map(failures, ({ actual, expected, field }) => [
          field,
          actual,
          expected,
        ])
      ).toEqual([
        ["marks", "3/-1/0", "4/-1/0"],
        ["marks", "none", "4/-1/0"],
        ["marks", "4/-1/0", "none"],
      ]);
    })
  );
});
