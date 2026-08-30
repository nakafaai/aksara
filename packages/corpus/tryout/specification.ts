import { DateOnlySchema } from "@nakafa/aksara-contracts/date";
import { isHttpsUrl } from "@nakafa/aksara-contracts/text/syntax";
import { TryoutKeySchema } from "@nakafa/aksara-contracts/tryout/key";
import { Effect, Schema } from "effect";

import type { TryoutExamSource } from "#corpus/tryout/schema";

const PositiveCountSchema = Schema.Int.pipe(
  Schema.check(Schema.isGreaterThan(0))
);

const AssessmentSectionSpecificationSchema = Schema.Struct({
  key: TryoutKeySchema,
  order: PositiveCountSchema,
  questionCount: PositiveCountSchema,
  timeLimitSeconds: PositiveCountSchema,
});

const AssessmentSpecificationFieldsSchema = Schema.Struct({
  basis: Schema.Struct({
    label: Schema.Trimmed.check(Schema.isNonEmpty()),
    retrievedAt: DateOnlySchema,
    url: Schema.String.pipe(Schema.check(Schema.makeFilter(isHttpsUrl))),
  }),
  countryKey: TryoutKeySchema,
  examKey: TryoutKeySchema,
  sections: Schema.NonEmptyArray(AssessmentSectionSpecificationSchema),
  trackKey: TryoutKeySchema,
});

type AssessmentSpecificationFields =
  typeof AssessmentSpecificationFieldsSchema.Type;

/** Checks that one specification has stable unique keys in display order. */
function hasCanonicalSections(specification: AssessmentSpecificationFields) {
  const keys = new Set<string>();
  return specification.sections.every((section, index) => {
    if (keys.has(section.key) || section.order !== index + 1) {
      return false;
    }
    keys.add(section.key);
    return true;
  });
}

/** Source-backed schedule that every active set of one track must satisfy. */
export const AssessmentSpecificationSchema =
  AssessmentSpecificationFieldsSchema.pipe(
    Schema.check(
      Schema.makeFilter(hasCanonicalSections, {
        message:
          "Assessment sections must have unique keys and sequential order.",
      })
    )
  );
type AssessmentSpecificationInput =
  typeof AssessmentSpecificationSchema.Encoded;
export type AssessmentSpecification = typeof AssessmentSpecificationSchema.Type;

/** One authored assessment specification failed strict schema decoding. */
export class AssessmentSpecificationDecodeError extends Schema.TaggedError<AssessmentSpecificationDecodeError>()(
  "AssessmentSpecificationDecodeError",
  { cause: Schema.Unknown, message: Schema.Trimmed.check(Schema.isNonEmpty()) }
) {}

/** One active try-out field drifted from its reviewed source specification. */
export class AssessmentSpecificationMismatchError extends Schema.TaggedError<AssessmentSpecificationMismatchError>()(
  "AssessmentSpecificationMismatchError",
  {
    actual: Schema.Trimmed.check(Schema.isNonEmpty()),
    expected: Schema.Trimmed.check(Schema.isNonEmpty()),
    field: Schema.Trimmed.check(Schema.isNonEmpty()),
    scope: Schema.Trimmed.check(Schema.isNonEmpty()),
  }
) {}

/** Strictly decodes one source-backed assessment specification. */
export const defineAssessmentSpecification = Effect.fn(
  "AksaraCorpus.defineAssessmentSpecification"
)(function* (input: AssessmentSpecificationInput) {
  return yield* Schema.decodeEffect(AssessmentSpecificationSchema)(input, {
    onExcessProperty: "error",
  }).pipe(
    Effect.mapError(
      (cause) =>
        new AssessmentSpecificationDecodeError({
          cause,
          message: "Assessment specification decoding failed.",
        })
    )
  );
});

/** Fails when one actual value differs from its source-backed expectation. */
function validateField(
  actual: string | number,
  expected: string | number,
  field: string,
  scope: string
) {
  if (actual === expected) {
    return Effect.void;
  }
  return new AssessmentSpecificationMismatchError({
    actual: String(actual),
    expected: String(expected),
    field,
    scope,
  });
}

/** Validates every active set in one track against its reviewed schedule. */
export const validateAssessmentSpecification = Effect.fn(
  "AksaraCorpus.validateAssessmentSpecification"
)(function* (source: TryoutExamSource, specification: AssessmentSpecification) {
  yield* validateField(
    source.countryKey,
    specification.countryKey,
    "countryKey",
    source.examKey
  );
  yield* validateField(
    source.examKey,
    specification.examKey,
    "examKey",
    source.examKey
  );

  const track = source.tracks.find(({ key }) => key === specification.trackKey);
  if (track === undefined) {
    return yield* new AssessmentSpecificationMismatchError({
      actual: "missing",
      expected: specification.trackKey,
      field: "trackKey",
      scope: source.examKey,
    });
  }
  if (track.sets.length === 0) {
    return yield* new AssessmentSpecificationMismatchError({
      actual: "0",
      expected: "at least 1",
      field: "activeSetCount",
      scope: `${source.examKey}:${track.key}`,
    });
  }

  for (const set of track.sets) {
    const setScope = `${source.examKey}:${track.key}:${set.key}`;
    for (const [index, expected] of specification.sections.entries()) {
      const actual = set.sections[index];
      if (actual === undefined) {
        return yield* new AssessmentSpecificationMismatchError({
          actual: "missing",
          expected: expected.key,
          field: "sectionKey",
          scope: setScope,
        });
      }
      const sectionScope = `${setScope}:${expected.key}`;
      yield* validateField(
        actual.key,
        expected.key,
        "sectionKey",
        sectionScope
      );
      yield* validateField(actual.order, expected.order, "order", sectionScope);
      yield* validateField(
        actual.questionCount,
        expected.questionCount,
        "questionCount",
        sectionScope
      );
      yield* validateField(
        actual.timeLimitSeconds,
        expected.timeLimitSeconds,
        "timeLimitSeconds",
        sectionScope
      );
    }
    yield* validateField(
      set.sections.length,
      specification.sections.length,
      "sectionCount",
      setScope
    );
  }

  return source;
});
