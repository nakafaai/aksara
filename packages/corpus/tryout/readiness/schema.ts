import { CatalogRevisionSchema } from "@nakafa/aksara-contracts/assessment/catalog";
import { KebabKeySchema } from "@nakafa/aksara-contracts/assessment/identity";
import { DateOnlySchema } from "@nakafa/aksara-contracts/date";
import { isHttpsUrl } from "@nakafa/aksara-contracts/text/syntax";
import { Array as Arr, Effect, HashSet, Schema } from "effect";
import {
  ExcludedPartSchema,
  hasWholeWeights,
  isCited,
  ReadinessSectionSchema,
  readinessExpectations,
} from "#corpus/tryout/readiness/section";

const ReadinessEvidenceSchema = Schema.Struct({
  key: KebabKeySchema,
  label: Schema.Trimmed.check(Schema.isNonEmpty()),
  retrievedAt: DateOnlySchema,
  url: Schema.String.pipe(Schema.check(Schema.makeFilter(isHttpsUrl))),
});

/**
 * The readiness of one track: the evidence it cites, its scheduled sections,
 * and the parts of the official exam that the try-out leaves out, such as the
 * oral exam, each with its weight.
 */
const AssessmentReadinessFieldsSchema = Schema.Struct({
  countryKey: KebabKeySchema,
  evidence: Schema.NonEmptyArray(ReadinessEvidenceSchema),
  examKey: KebabKeySchema,
  excluded: Schema.optionalKey(Schema.NonEmptyArray(ExcludedPartSchema)),
  sections: Schema.NonEmptyArray(ReadinessSectionSchema),
  sourceRevision: CatalogRevisionSchema,
  trackKey: KebabKeySchema,
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
  const evidenceExists = Arr.every(
    readinessExpectations(readiness.sections, readiness.excluded),
    (expectation) => isCited(evidenceKeys, expectation)
  );
  return (
    evidenceExists &&
    Arr.every(readiness.sections, (section, index) => {
      const { blueprint } = section;
      return (
        section.order === index + 1 &&
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
    })
  );
}

/** Unversioned source-backed release gate for one active assessment track. */
export const AssessmentReadinessSchema = AssessmentReadinessFieldsSchema.pipe(
  Schema.check(
    Schema.makeFilter(hasCanonicalReadiness, {
      message:
        "Assessment readiness must be ordered, unique, and evidence-complete.",
    }),
    Schema.makeFilter(
      (readiness: AssessmentReadinessFields) =>
        hasWholeWeights(readiness.sections, readiness.excluded),
      {
        message:
          "Expected a weight on every section once the result is weighed, and each part left out named once, apart from the sections.",
      }
    )
  )
);
export type AssessmentReadinessInput = typeof AssessmentReadinessSchema.Encoded;
export type AssessmentReadiness = typeof AssessmentReadinessSchema.Type;

export class AssessmentReadinessDecodeError extends Schema.TaggedError<
  AssessmentReadinessDecodeError,
  { readonly brand: unique symbol }
>()("AssessmentReadinessDecodeError", { cause: Schema.Unknown }) {}

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
