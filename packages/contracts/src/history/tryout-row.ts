import { Schema } from "effect";

import { HistoricalAppLocaleSchema } from "#contracts/history/locale";
import {
  HistoricalPrimitive,
  HistoricalSha256HashSchema,
  historicalQuestionKeyParts,
} from "#contracts/history/primitives";

const {
  ContentKeySchema,
  CorpusSourcePathSchema,
  CountryCodeSchema,
  LearningGraphIdentitySchema,
  PublicPathSchema,
  RendererDomainSchema,
  TryoutKeySchema,
} = HistoricalPrimitive;

const OptionKeySchema = Schema.String.pipe(
  Schema.check(Schema.isPattern(/^option-[1-9]\d*$/u))
);
const HistoricalContentHashSchema = Schema.String.pipe(
  Schema.check(Schema.isPattern(/^[a-f\d]{64}$/u))
);
const PositiveCountSchema = Schema.Finite.pipe(
  Schema.check(Schema.isInt()),
  Schema.check(Schema.isGreaterThan(0))
);
const NonNegativeCountSchema = Schema.Finite.pipe(
  Schema.check(Schema.isInt()),
  Schema.check(Schema.isGreaterThanOrEqualTo(0))
);
const HistoricalSourceRevisionSchema = Schema.Trimmed.check(
  Schema.isNonEmpty()
).pipe(Schema.check(Schema.isMaxLength(128)));

const LocalizedFields = {
  description: Schema.optional(Schema.String),
  graph: LearningGraphIdentitySchema,
  locale: HistoricalAppLocaleSchema,
  sourceRevision: HistoricalSourceRevisionSchema,
  title: Schema.String,
};
const ParentFields = {
  countryKey: TryoutKeySchema,
  examKey: TryoutKeySchema,
};

const HistoricalTryoutCountrySchema = Schema.Struct({
  ...LocalizedFields,
  countryCode: CountryCodeSchema,
  countryKey: TryoutKeySchema,
  kind: Schema.Literal("country"),
  order: PositiveCountSchema,
  publicPath: PublicPathSchema,
});
const HistoricalTryoutExamSchema = Schema.Struct({
  ...LocalizedFields,
  countryKey: TryoutKeySchema,
  examKey: TryoutKeySchema,
  kind: Schema.Literal("exam"),
  order: PositiveCountSchema,
  publicPath: PublicPathSchema,
  scoringStrategy: Schema.Literals(["irt", "raw"]),
});
const HistoricalTryoutTrackSchema = Schema.Struct({
  ...LocalizedFields,
  ...ParentFields,
  kind: Schema.Literal("track"),
  order: PositiveCountSchema,
  publicPath: PublicPathSchema,
  questionCount: PositiveCountSchema,
  sectionCount: PositiveCountSchema,
  setCount: PositiveCountSchema,
  trackKey: TryoutKeySchema,
  trackKind: Schema.Literals(["subject", "year"]),
  visibleSectionCount: NonNegativeCountSchema,
}).pipe(
  Schema.check(
    Schema.makeFilter(
      ({ sectionCount, visibleSectionCount }) =>
        visibleSectionCount <= sectionCount,
      { message: "Stored visible sections exceed the track section count." }
    )
  )
);
const HistoricalTryoutSetSchema = Schema.Struct({
  ...LocalizedFields,
  ...ParentFields,
  internalEntrySectionKey: Schema.optional(TryoutKeySchema),
  kind: Schema.Literal("set"),
  order: PositiveCountSchema,
  publicPath: PublicPathSchema,
  questionCount: PositiveCountSchema,
  scoringStrategy: Schema.Literals(["irt", "raw"]),
  sectionCount: PositiveCountSchema,
  setKey: TryoutKeySchema,
  trackKey: TryoutKeySchema,
  visibleSectionCount: NonNegativeCountSchema,
}).pipe(
  Schema.check(
    Schema.makeFilter(
      ({ internalEntrySectionKey, sectionCount, visibleSectionCount }) =>
        internalEntrySectionKey === undefined
          ? visibleSectionCount === sectionCount
          : sectionCount === 1 && visibleSectionCount === 0,
      { message: "Stored set section counts are incoherent." }
    )
  )
);
const HistoricalTryoutSectionSchema = Schema.Struct({
  ...LocalizedFields,
  ...ParentFields,
  kind: Schema.Literal("section"),
  order: PositiveCountSchema,
  publicPath: Schema.optional(PublicPathSchema),
  questionCount: PositiveCountSchema,
  questionSourcePath: CorpusSourcePathSchema,
  sectionKey: TryoutKeySchema,
  setKey: TryoutKeySchema,
  timeLimitSeconds: PositiveCountSchema,
  trackKey: TryoutKeySchema,
  visibility: Schema.Literals(["internal-entry", "visible"]),
}).pipe(
  Schema.check(
    Schema.makeFilter(
      ({ publicPath, visibility }) =>
        visibility === "visible"
          ? publicPath !== undefined
          : publicPath === undefined,
      { message: "Stored section visibility and public path disagree." }
    )
  )
);

export const HistoricalTryoutCatalogRowSchema = Schema.Union([
  HistoricalTryoutCountrySchema,
  HistoricalTryoutExamSchema,
  HistoricalTryoutTrackSchema,
  HistoricalTryoutSetSchema,
  HistoricalTryoutSectionSchema,
]);
export type HistoricalTryoutCatalogRow =
  typeof HistoricalTryoutCatalogRowSchema.Type;

const HistoricalTryoutChoiceSchema = Schema.Struct({
  isCorrect: Schema.Boolean,
  label: Schema.String,
  optionKey: OptionKeySchema,
  order: PositiveCountSchema,
});
type HistoricalTryoutChoice = typeof HistoricalTryoutChoiceSchema.Type;

/** Checks exact option identities and one correct retained answer. */
function hasCoherentChoices(choices: readonly HistoricalTryoutChoice[]) {
  return (
    choices.filter(({ isCorrect }) => isCorrect).length === 1 &&
    choices.every(
      ({ optionKey, order }, index) =>
        order === index + 1 && optionKey === `option-${order}`
    )
  );
}

const HistoricalTryoutChoiceListSchema = Schema.NonEmptyArray(
  HistoricalTryoutChoiceSchema
).pipe(
  Schema.check(
    Schema.makeFilter(hasCoherentChoices, {
      message: "Stored choices have incoherent option identities.",
    })
  )
);

const HistoricalPlacementFields = {
  ...ParentFields,
  answerContentKey: ContentKeySchema,
  choices: HistoricalTryoutChoiceListSchema,
  locale: HistoricalAppLocaleSchema,
  questionContentKey: ContentKeySchema,
  questionOrder: PositiveCountSchema,
  questionSourcePath: CorpusSourcePathSchema,
  rendererDomain: RendererDomainSchema,
  scope: Schema.Literal("server"),
  sectionKey: TryoutKeySchema,
  setKey: TryoutKeySchema,
  sourceRevision: HistoricalSourceRevisionSchema,
  trackKey: TryoutKeySchema,
};

/** Checks that retained placement identities still share one question root. */
function hasCoherentPlacementKeys(input: {
  readonly answerContentKey: string;
  readonly countryKey: string;
  readonly examKey: string;
  readonly questionContentKey: string;
  readonly questionOrder: number;
  readonly questionSourcePath: string;
  readonly sectionKey: string;
  readonly setKey: string;
}) {
  const suffix = "/question";
  if (!input.questionContentKey.endsWith(suffix)) {
    return false;
  }
  const questionRoot = input.questionContentKey.slice(0, -suffix.length);
  const parts = historicalQuestionKeyParts(questionRoot);
  if (parts === undefined) {
    return false;
  }
  return (
    input.answerContentKey === `${questionRoot}/answer` &&
    parts.countryKey === input.countryKey &&
    parts.examKey === input.examKey &&
    parts.sectionKey === input.sectionKey &&
    parts.setKey === input.setKey &&
    parts.questionNumber === input.questionOrder &&
    input.questionSourcePath === `packages/corpus/${questionRoot}`
  );
}

export const HistoricalTryoutPlacementSchema = Schema.Struct({
  ...HistoricalPlacementFields,
  answerArtifactHash: HistoricalSha256HashSchema,
  contentHash: Schema.optional(HistoricalContentHashSchema),
  questionArtifactHash: HistoricalSha256HashSchema,
  title: Schema.String,
}).pipe(
  Schema.check(
    Schema.makeFilter(hasCoherentPlacementKeys, {
      message: "Stored placement identities are incoherent.",
    })
  )
);
export type HistoricalTryoutPlacement =
  typeof HistoricalTryoutPlacementSchema.Type;

export const HistoricalTryoutCatalogEnvelopeSchema = Schema.Struct({
  family: Schema.Literal("tryout"),
  record: Schema.Struct({
    row: HistoricalTryoutCatalogRowSchema,
    rowHash: HistoricalSha256HashSchema,
  }),
  rowKind: Schema.Literal("catalog"),
});
export type HistoricalTryoutCatalogEnvelope =
  typeof HistoricalTryoutCatalogEnvelopeSchema.Type;

export const HistoricalTryoutPlacementEnvelopeSchema = Schema.Struct({
  family: Schema.Literal("tryout"),
  record: Schema.Struct({
    row: HistoricalTryoutPlacementSchema,
    rowHash: HistoricalSha256HashSchema,
  }),
  rowKind: Schema.Literal("placement"),
});
export type HistoricalTryoutPlacementEnvelope =
  typeof HistoricalTryoutPlacementEnvelopeSchema.Type;

/** Exact retained row envelopes required by immutable try-out attempts. */
export const HistoricalTryoutRowSchema = Schema.Union([
  HistoricalTryoutCatalogEnvelopeSchema,
  HistoricalTryoutPlacementEnvelopeSchema,
]);
export type HistoricalTryoutRow = typeof HistoricalTryoutRowSchema.Type;
