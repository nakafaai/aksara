import { DateOnlySchema } from "@nakafa/aksara-contracts/date";
import { QuestionResponseKindSchema } from "@nakafa/aksara-contracts/question/response";
import { isHttpsUrl } from "@nakafa/aksara-contracts/text/syntax";
import { TryoutKeySchema } from "@nakafa/aksara-contracts/tryout/key";
import { TryoutSourceRevisionSchema } from "@nakafa/aksara-contracts/tryout/spec";
import { Effect, Schema } from "effect";

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
  cognitiveLevels: Schema.NonEmptyArray(TryoutKeySchema),
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
            ({ cognitiveLevels, contentDomains }) =>
              uniqueBy(cognitiveLevels, (cognitiveLevel) => cognitiveLevel) &&
              cognitiveLevels.every((cognitiveLevel) =>
                blueprint.cognitiveLevels.some(
                  ({ key }) => key === cognitiveLevel
                )
              ) &&
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

export class AssessmentReadinessDecodeError extends Schema.TaggedError<AssessmentReadinessDecodeError>()(
  "AssessmentReadinessDecodeError",
  { cause: Schema.Unknown }
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
