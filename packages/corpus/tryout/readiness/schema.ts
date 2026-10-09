import { DateOnlySchema } from "@nakafa/aksara-contracts/date";
import { QuestionResponseKindSchema } from "@nakafa/aksara-contracts/question/response";
import { isHttpsUrl } from "@nakafa/aksara-contracts/text/syntax";
import { TryoutKeySchema } from "@nakafa/aksara-contracts/tryout/key";
import {
  TryoutMarksSchema,
  TryoutSourceRevisionSchema,
} from "@nakafa/aksara-contracts/tryout/spec";
import { Array as Arr, Effect, HashSet, Schema } from "effect";

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

const OfficialProvenanceSchema = Schema.Struct({
  evidenceKey: TryoutKeySchema,
  kind: Schema.Literal("official"),
});
const ExpectationProvenanceSchema = Schema.Union([
  OfficialProvenanceSchema,
  Schema.Struct({ kind: Schema.Literal("editorial") }),
]);
const ScheduleExpectationSchema = Schema.Struct({
  provenance: ExpectationProvenanceSchema,
  value: PositiveCountSchema,
});
/**
 * Penalized marks change a learner's score, so only official evidence may set
 * them.
 */
const MarksExpectationSchema = Schema.Struct({
  provenance: OfficialProvenanceSchema,
  value: TryoutMarksSchema,
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
/**
 * Expected facts for one scheduled section. `marks` records the official
 * evidence for the correct, wrong, and blank marks of a penalized section.
 */
const ReadinessSectionSchema = Schema.Struct({
  blueprint: Schema.optionalKey(SectionBlueprintSchema),
  key: TryoutKeySchema,
  marks: Schema.optionalKey(MarksExpectationSchema),
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
  return (
    HashSet.size(HashSet.fromIterable(Arr.map(values, key))) === values.length
  );
}

/** Checks stable order, unique coverage keys, and complete evidence references. */
function hasCanonicalReadiness(readiness: AssessmentReadinessFields) {
  const evidenceKeys = HashSet.fromIterable(
    Arr.map(readiness.evidence, ({ key }) => key)
  );
  if (!uniqueBy(readiness.evidence, ({ key }) => key)) {
    return false;
  }
  return Arr.every(readiness.sections, (section, index) => {
    const { blueprint } = section;
    const expectations = [
      section.questionCount,
      section.timeLimitSeconds,
      ...(section.marks === undefined ? [] : [section.marks]),
    ];
    const evidenceExists = Arr.every(
      expectations,
      ({ provenance }) =>
        provenance.kind === "editorial" ||
        HashSet.has(evidenceKeys, provenance.evidenceKey)
    );
    return (
      section.order === index + 1 &&
      evidenceExists &&
      (blueprint === undefined ||
        (HashSet.has(evidenceKeys, blueprint.evidenceKey) &&
          uniqueBy(blueprint.contentDomains, ({ key }) => key) &&
          uniqueBy(blueprint.cognitiveLevels, ({ key }) => key) &&
          uniqueBy(blueprint.responseMinimums, ({ kind }) => kind) &&
          uniqueBy(blueprint.topics, ({ key }) => key) &&
          Arr.every(
            blueprint.topics,
            ({ cognitiveLevels, contentDomains }) =>
              uniqueBy(cognitiveLevels, (cognitiveLevel) => cognitiveLevel) &&
              Arr.every(cognitiveLevels, (cognitiveLevel) =>
                Arr.some(
                  blueprint.cognitiveLevels,
                  ({ key }) => key === cognitiveLevel
                )
              ) &&
              uniqueBy(contentDomains, (contentDomain) => contentDomain) &&
              Arr.every(contentDomains, (contentDomain) =>
                Arr.some(
                  blueprint.contentDomains,
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
