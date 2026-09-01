import { Effect, Schema } from "effect";

import type { AssessmentReadiness } from "#corpus/tryout/readiness/schema";
import type { TryoutExamSource } from "#corpus/tryout/schema";

type ReadinessSection = AssessmentReadiness["sections"][number];
type TryoutTrack = TryoutExamSource["tracks"][number];
type TryoutSection = TryoutTrack["sets"][number]["sections"][number];

export class AssessmentReadinessMismatchError extends Schema.TaggedError<AssessmentReadinessMismatchError>()(
  "AssessmentReadinessMismatchError",
  {
    actual: Schema.Trimmed.check(Schema.isNonEmpty()),
    expected: Schema.Trimmed.check(Schema.isNonEmpty()),
    field: Schema.Trimmed.check(Schema.isNonEmpty()),
    scope: Schema.Trimmed.check(Schema.isNonEmpty()),
  }
) {}

/** Compares one readiness fact and returns a typed mismatch on drift. */
export function validateReadinessField(
  actual: string | number,
  expected: string | number,
  field: string,
  scope: string
) {
  return actual === expected
    ? Effect.void
    : new AssessmentReadinessMismatchError({
        actual: String(actual),
        expected: String(expected),
        field,
        scope,
      });
}

/** Resolves the one active track named by the readiness contract. */
export const requireReadinessTrack = Effect.fn(
  "AksaraCorpus.requireReadinessTrack"
)(function* (source: TryoutExamSource, readiness: AssessmentReadiness) {
  const track = source.tracks.find(({ key }) => key === readiness.trackKey);
  if (track !== undefined) {
    return track;
  }
  return yield* new AssessmentReadinessMismatchError({
    actual: "missing",
    expected: readiness.trackKey,
    field: "trackKey",
    scope: source.examKey,
  });
});

/** Resolves one scheduled section without silently skipping source drift. */
export const requireReadinessSection = Effect.fn(
  "AksaraCorpus.requireReadinessSection"
)(function* (
  sections: readonly TryoutSection[],
  expected: ReadinessSection,
  index: number,
  scope: string
) {
  const section = sections[index];
  if (section !== undefined) {
    return section;
  }
  return yield* new AssessmentReadinessMismatchError({
    actual: "missing",
    expected: expected.key,
    field: "sectionKey",
    scope,
  });
});

/** Validates active hierarchy, source revision, and every scheduled set. */
export const validateAssessmentSourceReadiness = Effect.fn(
  "AksaraCorpus.validateAssessmentSourceReadiness"
)(function* (source: TryoutExamSource, readiness: AssessmentReadiness) {
  yield* validateReadinessField(
    source.countryKey,
    readiness.countryKey,
    "countryKey",
    source.examKey
  );
  yield* validateReadinessField(
    source.examKey,
    readiness.examKey,
    "examKey",
    source.examKey
  );
  yield* validateReadinessField(
    source.sourceRevision,
    readiness.sourceRevision,
    "sourceRevision",
    source.examKey
  );
  const track = yield* requireReadinessTrack(source, readiness);
  yield* validateReadinessField(
    track.sets.length > 0 ? "present" : "missing",
    "present",
    "activeSets",
    `${source.examKey}:${track.key}`
  );
  for (const set of track.sets) {
    const setScope = `${source.examKey}:${track.key}:${set.key}`;
    for (const [index, expected] of readiness.sections.entries()) {
      const actual = yield* requireReadinessSection(
        set.sections,
        expected,
        index,
        setScope
      );
      const scope = `${setScope}:${expected.key}`;
      yield* validateReadinessField(
        actual.key,
        expected.key,
        "sectionKey",
        scope
      );
      yield* validateReadinessField(
        actual.order,
        expected.order,
        "order",
        scope
      );
      yield* validateReadinessField(
        actual.questionCount,
        expected.questionCount.value,
        "questionCount",
        scope
      );
      yield* validateReadinessField(
        actual.timeLimitSeconds,
        expected.timeLimitSeconds.value,
        "timeLimitSeconds",
        scope
      );
    }
    yield* validateReadinessField(
      set.sections.length,
      readiness.sections.length,
      "sectionCount",
      setScope
    );
  }
  return source;
});
