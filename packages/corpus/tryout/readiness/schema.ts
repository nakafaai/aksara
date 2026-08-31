import { DateOnlySchema } from "@nakafa/aksara-contracts/date";
import { QuestionResponseKindSchema } from "@nakafa/aksara-contracts/question/response";
import { isHttpsUrl } from "@nakafa/aksara-contracts/text/syntax";
import { TryoutKeySchema } from "@nakafa/aksara-contracts/tryout/key";
import { TryoutSourceRevisionSchema } from "@nakafa/aksara-contracts/tryout/spec";
import { Effect, Schema } from "effect";

import type { TryoutExamSource } from "#corpus/tryout/schema";

const PositiveCountSchema = Schema.Int.pipe(
  Schema.check(Schema.isGreaterThan(0))
);
const NonNegativeCountSchema = Schema.Int.pipe(
  Schema.check(Schema.isGreaterThanOrEqualTo(0))
);

const ReadinessEvidenceSchema = Schema.Struct({
  key: TryoutKeySchema,
  label: Schema.Trimmed.check(Schema.isNonEmpty()),
  retrievedAt: DateOnlySchema,
  url: Schema.String.pipe(Schema.check(Schema.makeFilter(isHttpsUrl))),
});

const ExpectationProvenanceSchema = Schema.Union([
  Schema.Struct({
    evidenceKey: TryoutKeySchema,
    kind: Schema.Literal("official"),
  }),
  Schema.Struct({ kind: Schema.Literal("editorial") }),
]);
const ScheduleExpectationSchema = Schema.Struct({
  provenance: ExpectationProvenanceSchema,
  value: PositiveCountSchema,
});
const CoverageMinimumSchema = Schema.Struct({
  editorialMinimum: PositiveCountSchema,
  key: TryoutKeySchema,
});
const ResponseMinimumSchema = Schema.Struct({
  editorialMinimum: PositiveCountSchema,
  kind: QuestionResponseKindSchema,
});
const TopicMinimumSchema = Schema.Struct({
  contentDomains: Schema.NonEmptyArray(TryoutKeySchema),
  editorialMinimum: PositiveCountSchema,
  key: TryoutKeySchema,
});

const SectionBlueprintSchema = Schema.Struct({
  cognitiveLevels: Schema.NonEmptyArray(CoverageMinimumSchema),
  contentDomains: Schema.NonEmptyArray(CoverageMinimumSchema),
  evidenceKey: TryoutKeySchema,
  groupedStimulusEditorialMinimum: NonNegativeCountSchema,
  responseMinimums: Schema.NonEmptyArray(ResponseMinimumSchema),
  topics: Schema.NonEmptyArray(TopicMinimumSchema),
});
const ReadinessSectionSchema = Schema.Struct({
  blueprint: Schema.optionalKey(SectionBlueprintSchema),
  key: TryoutKeySchema,
  order: PositiveCountSchema,
  questionCount: ScheduleExpectationSchema,
  timeLimitSeconds: ScheduleExpectationSchema,
});
const AssessmentReadinessFieldsSchema = Schema.Struct({
  countryKey: TryoutKeySchema,
  evidence: Schema.NonEmptyArray(ReadinessEvidenceSchema),
  examKey: TryoutKeySchema,
  sections: Schema.NonEmptyArray(ReadinessSectionSchema),
  sourceRevision: TryoutSourceRevisionSchema,
  trackKey: TryoutKeySchema,
});
type AssessmentReadinessFields = typeof AssessmentReadinessFieldsSchema.Type;

/** Checks that one key projection contains no repeated identity. */
function uniqueBy<Value>(
  values: readonly Value[],
  key: (value: Value) => string
) {
  return new Set(values.map(key)).size === values.length;
}

/** Checks stable order, unique coverage keys, and complete evidence references. */
function hasCanonicalReadiness(readiness: AssessmentReadinessFields) {
  const evidenceKeys = new Set(readiness.evidence.map(({ key }) => key));
  if (!uniqueBy(readiness.evidence, ({ key }) => key)) {
    return false;
  }
  return readiness.sections.every((section, index) => {
    const { blueprint } = section;
    const expectations = [section.questionCount, section.timeLimitSeconds];
    const evidenceExists = expectations.every(
      ({ provenance }) =>
        provenance.kind === "editorial" ||
        evidenceKeys.has(provenance.evidenceKey)
    );
    return (
      section.order === index + 1 &&
      evidenceExists &&
      (blueprint === undefined ||
        (evidenceKeys.has(blueprint.evidenceKey) &&
          uniqueBy(blueprint.contentDomains, ({ key }) => key) &&
          uniqueBy(blueprint.cognitiveLevels, ({ key }) => key) &&
          uniqueBy(blueprint.responseMinimums, ({ kind }) => kind) &&
          uniqueBy(blueprint.topics, ({ key }) => key) &&
          blueprint.topics.every(
            ({ contentDomains }) =>
              uniqueBy(contentDomains, (contentDomain) => contentDomain) &&
              contentDomains.every((contentDomain) =>
                blueprint.contentDomains.some(
                  ({ key }) => key === contentDomain
                )
              )
          )))
    );
  });
}

/** Unversioned source-backed release gate for one active assessment track. */
export const AssessmentReadinessSchema = AssessmentReadinessFieldsSchema.pipe(
  Schema.check(
    Schema.makeFilter(hasCanonicalReadiness, {
      message:
        "Assessment readiness must be ordered, unique, and evidence-complete.",
    })
  )
);
type AssessmentReadinessInput = typeof AssessmentReadinessSchema.Encoded;
export type AssessmentReadiness = typeof AssessmentReadinessSchema.Type;
type ReadinessSection = AssessmentReadiness["sections"][number];
type TryoutTrack = TryoutExamSource["tracks"][number];
type TryoutSection = TryoutTrack["sets"][number]["sections"][number];

export class AssessmentReadinessDecodeError extends Schema.TaggedError<AssessmentReadinessDecodeError>()(
  "AssessmentReadinessDecodeError",
  { cause: Schema.Unknown }
) {}

export class AssessmentReadinessMismatchError extends Schema.TaggedError<AssessmentReadinessMismatchError>()(
  "AssessmentReadinessMismatchError",
  {
    actual: Schema.Trimmed.check(Schema.isNonEmpty()),
    expected: Schema.Trimmed.check(Schema.isNonEmpty()),
    field: Schema.Trimmed.check(Schema.isNonEmpty()),
    scope: Schema.Trimmed.check(Schema.isNonEmpty()),
  }
) {}

/** Strictly decodes one source-backed readiness gate. */
export const defineAssessmentReadiness = Effect.fn(
  "AksaraCorpus.defineAssessmentReadiness"
)(function* (input: AssessmentReadinessInput) {
  return yield* Schema.decodeEffect(AssessmentReadinessSchema)(input, {
    onExcessProperty: "error",
  }).pipe(
    Effect.mapError((cause) => new AssessmentReadinessDecodeError({ cause }))
  );
});

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
