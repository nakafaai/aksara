import type { MarksSchema } from "@nakafa/aksara-contracts/assessment/scoring";
import { Array as Arr, Effect, Option, Schema } from "effect";

import type { AssessmentReadiness } from "#corpus/tryout/readiness/schema";
import type {
  ExamSource,
  ProfileSource,
  SectionSource,
} from "#corpus/tryout/schema";

type ReadinessSection = AssessmentReadiness["sections"][number];

/** Writes optional marks as one comparable readiness fact. */
function marksFact(marks: typeof MarksSchema.Type | undefined) {
  return marks === undefined
    ? "none"
    : `${marks.correct}/${marks.wrong}/${marks.blank}`;
}

/** The marks a profile scores with: those of a penalized exam, and none for any other. */
function profileMarks(profile: ProfileSource) {
  return profile.scoring.kind === "penalized"
    ? profile.scoring.marks
    : undefined;
}

export class AssessmentReadinessMismatchError extends Schema.TaggedError<
  AssessmentReadinessMismatchError,
  { readonly brand: unique symbol }
>()("AssessmentReadinessMismatchError", {
  actual: Schema.Trimmed.check(Schema.isNonEmpty()),
  expected: Schema.Trimmed.check(Schema.isNonEmpty()),
  field: Schema.Trimmed.check(Schema.isNonEmpty()),
  scope: Schema.Trimmed.check(Schema.isNonEmpty()),
}) {}

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
)(function* (source: ExamSource, readiness: AssessmentReadiness) {
  const track = Arr.findFirst(
    source.tracks,
    ({ key }) => key === readiness.trackKey
  );
  if (Option.isSome(track)) {
    return track.value;
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
  sections: readonly SectionSource[],
  expected: ReadinessSection,
  index: number,
  scope: string
) {
  return yield* Effect.fromOption(Arr.get(sections, index)).pipe(
    Effect.mapError(
      () =>
        new AssessmentReadinessMismatchError({
          actual: "missing",
          expected: expected.key,
          field: "sectionKey",
          scope,
        })
    )
  );
});

/**
 * Validates one exam source against its readiness: the country, exam, and
 * revision, active sets, and each section of the track's profile with its
 * official items, seconds, and marks.
 */
export const validateAssessmentSourceReadiness = Effect.fn(
  "AksaraCorpus.validateAssessmentSourceReadiness"
)(function* (source: ExamSource, readiness: AssessmentReadiness) {
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
  const trackScope = `${source.examKey}:${track.key}`;
  yield* validateReadinessField(
    track.sets.length > 0 ? "present" : "missing",
    "present",
    "activeSets",
    trackScope
  );
  const { sections } = track.profile;
  yield* Effect.forEach(
    readiness.sections,
    (expected, index) =>
      Effect.gen(function* () {
        const actual = yield* requireReadinessSection(
          sections,
          expected,
          index,
          trackScope
        );
        const scope = `${trackScope}:${expected.key}`;
        yield* validateReadinessField(
          actual.key,
          expected.key,
          "sectionKey",
          scope
        );
        yield* validateReadinessField(
          actual.items,
          expected.questionCount.value,
          "questionCount",
          scope
        );
        yield* validateReadinessField(
          actual.seconds,
          expected.timeLimitSeconds.value,
          "timeLimitSeconds",
          scope
        );
        yield* validateReadinessField(
          marksFact(profileMarks(track.profile)),
          marksFact(expected.marks?.value),
          "marks",
          scope
        );
      }),
    { discard: true }
  );
  yield* validateReadinessField(
    sections.length,
    readiness.sections.length,
    "sectionCount",
    trackScope
  );
  return source;
});
