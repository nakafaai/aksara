import { KebabKeySchema } from "@nakafa/aksara-contracts/assessment/identity";
import { MarksSchema } from "@nakafa/aksara-contracts/assessment/scoring";
import { Array as Arr, HashSet, Predicate, Schema } from "effect";
import { AidsSchema } from "#corpus/tryout/schema";

/**
 * The response formats of the official frameworks: a single choice, a choice
 * of several answers, a category table, a short answer, and an extended
 * response. An authored choice with one correct option is a single choice,
 * with several a multiple choice, a matrix is a category table, a typed
 * number, text, or expression is a short answer, and a written answer that a
 * rubric scores is an extended response.
 */
export const ResponseFormatSchema = Schema.Literals([
  "category",
  "extended-response",
  "multiple-choice",
  "short-answer",
  "single-choice",
]);
export type ResponseFormat = typeof ResponseFormatSchema.Type;

const PositiveCountSchema = Schema.Int.pipe(
  Schema.check(Schema.isGreaterThan(0))
);
const NonNegativeCountSchema = Schema.Int.pipe(
  Schema.check(Schema.isGreaterThanOrEqualTo(0))
);

const OfficialProvenanceSchema = Schema.Struct({
  evidenceKey: KebabKeySchema,
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
  value: MarksSchema,
});
const AidsExpectationSchema = Schema.Struct({
  provenance: ExpectationProvenanceSchema,
  value: AidsSchema,
});
const PointsExpectationSchema = Schema.Struct({
  provenance: ExpectationProvenanceSchema,
  value: Schema.NonEmptyArray(PositiveCountSchema),
});
const CoverageMinimumSchema = Schema.Struct({
  editorialMinimum: PositiveCountSchema,
  key: KebabKeySchema,
});
const ResponseMinimumSchema = Schema.Struct({
  editorialMinimum: PositiveCountSchema,
  kind: ResponseFormatSchema,
});
/**
 * One topic a section may ask, with the levels and domains it belongs to. A
 * topic with a minimum of zero is allowed in every set without being required,
 * because a section such as a reading test varies its topics from set to set.
 */
const TopicMinimumSchema = Schema.Struct({
  cognitiveLevels: Schema.NonEmptyArray(KebabKeySchema),
  contentDomains: Schema.NonEmptyArray(KebabKeySchema),
  editorialMinimum: NonNegativeCountSchema,
  key: KebabKeySchema,
});

const SectionBlueprintSchema = Schema.Struct({
  cognitiveLevels: Schema.NonEmptyArray(CoverageMinimumSchema),
  contentDomains: Schema.NonEmptyArray(CoverageMinimumSchema),
  evidenceKey: KebabKeySchema,
  groupedStimulusEditorialMinimum: NonNegativeCountSchema,
  responseMinimums: Schema.NonEmptyArray(ResponseMinimumSchema),
  topics: Schema.NonEmptyArray(TopicMinimumSchema),
});

/**
 * Expected facts for one scheduled section. `marks` records the official
 * evidence for the correct, wrong, and blank marks of a penalized section.
 * `aids` records what the exam allows, such as a scientific calculator and a
 * formula sheet, or an empty list for no aids. `questionPoints` records the
 * points of each question in order, such as each Aufgabe of a
 * Feststellungsprüfung, and `totalPoints` their sum, alone when only the sum
 * is published. `weight` is the section's share of the official result,
 * relative to the other sections and to the parts the try-out leaves out.
 */
const SectionFieldsSchema = Schema.Struct({
  aids: Schema.optionalKey(AidsExpectationSchema),
  blueprint: Schema.optionalKey(SectionBlueprintSchema),
  key: KebabKeySchema,
  marks: Schema.optionalKey(MarksExpectationSchema),
  order: PositiveCountSchema,
  questionCount: ScheduleExpectationSchema,
  questionPoints: Schema.optionalKey(PointsExpectationSchema),
  timeLimitSeconds: ScheduleExpectationSchema,
  totalPoints: Schema.optionalKey(ScheduleExpectationSchema),
  weight: Schema.optionalKey(ScheduleExpectationSchema),
});

/**
 * Checks that the points of a section fit it: one for each question, adding
 * up to the total when both are recorded.
 */
function hasFittingPoints({
  questionCount,
  questionPoints,
  totalPoints,
}: typeof SectionFieldsSchema.Type) {
  return (
    questionPoints === undefined ||
    (questionPoints.value.length === questionCount.value &&
      (totalPoints === undefined ||
        Arr.reduce(questionPoints.value, 0, (sum, points) => sum + points) ===
          totalPoints.value))
  );
}

/** One scheduled section of a readiness gate, its points fitting its questions. */
export const ReadinessSectionSchema = SectionFieldsSchema.check(
  Schema.makeFilter(hasFittingPoints, {
    message:
      "Expected the points of a section to list each question once and to add up to its total.",
  })
);
export type ReadinessSection = typeof ReadinessSectionSchema.Type;

/**
 * One part of the official exam that the try-out leaves out, such as the oral
 * exam, with its share of the official result, relative to the sections.
 */
export const ExcludedPartSchema = Schema.Struct({
  key: KebabKeySchema,
  weight: ScheduleExpectationSchema,
});
type ExcludedPart = typeof ExcludedPartSchema.Type;

/**
 * Every expectation that may cite evidence: each of every section, and the
 * weight of each part the try-out leaves out.
 */
export function readinessExpectations(
  sections: readonly ReadinessSection[],
  excluded: readonly ExcludedPart[] | undefined
) {
  return [
    ...Arr.flatMap(sections, (section) =>
      Arr.filter(
        [
          section.questionCount,
          section.timeLimitSeconds,
          section.marks,
          section.aids,
          section.questionPoints,
          section.totalPoints,
          section.weight,
        ],
        Predicate.isNotUndefined
      )
    ),
    ...Arr.map(excluded ?? [], ({ weight }) => weight),
  ];
}

/** Checks that an expectation is editorial or cites one of the given evidence keys. */
export function isCited(
  evidenceKeys: HashSet.HashSet<string>,
  { provenance }: ReturnType<typeof readinessExpectations>[number]
) {
  return (
    provenance.kind === "editorial" ||
    HashSet.has(evidenceKeys, provenance.evidenceKey)
  );
}

/**
 * Checks that the weights describe the whole official result: once a section
 * has a weight or a part is left out, every section has its weight, and each
 * part left out is named once, apart from the sections.
 */
export function hasWholeWeights(
  sections: readonly ReadinessSection[],
  excluded: readonly ExcludedPart[] | undefined
) {
  const parts = excluded ?? [];
  const keys = Arr.map(parts, ({ key }) => key);
  const sectionKeys = Arr.map(sections, ({ key }) => key);
  const weighed = Arr.some(sections, ({ weight }) => weight !== undefined);
  return (
    HashSet.size(HashSet.fromIterable(keys)) === keys.length &&
    Arr.every(keys, (key) => !Arr.contains(sectionKeys, key)) &&
    (!(weighed || parts.length > 0) ||
      Arr.every(sections, ({ weight }) => weight !== undefined))
  );
}
