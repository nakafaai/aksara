import { Schema } from "effect";
import { ContentLocaleSchema } from "#contracts/content";
import { LearningGraphIdentitySchema } from "#contracts/graph/spec";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  PublicPathSchema,
  Sha256HashSchema,
} from "#contracts/ids";
import { RendererDomainSchema } from "#contracts/renderer/domain";

const TRYOUT_KEY_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;
const COUNTRY_CODE_PATTERN = /^[A-Z]{2}$/u;
const OPTION_KEY_PATTERN = /^option-[1-9]\d*$/u;
/** Stable lowercase identity for one try-out hierarchy node. */
export const TryoutKeySchema = Schema.String.pipe(
  Schema.pattern(TRYOUT_KEY_PATTERN, {
    description: "Lowercase kebab-case try-out source key.",
    identifier: "TryoutKey",
    message: () => "Invalid try-out key.",
  }),
  Schema.maxLength(128)
);
export type TryoutKey = typeof TryoutKeySchema.Type;
/** ISO 3166-1 alpha-2 code owned by one try-out country. */
export const TryoutCountryCodeSchema = Schema.String.pipe(
  Schema.pattern(COUNTRY_CODE_PATTERN, {
    description: "Uppercase ISO 3166-1 alpha-2 country code.",
    identifier: "TryoutCountryCode",
    message: () => "Invalid country code.",
  })
);
/** Scoring model selected by one authored exam. */
export const TryoutScoringSchema = Schema.Literal("irt", "raw");
export type TryoutScoring = typeof TryoutScoringSchema.Type;
/** Navigation role of one authored track. */
export const TryoutTrackKindSchema = Schema.Literal("subject", "year");
/** Public route behavior of one authored section. */
export const TryoutVisibilitySchema = Schema.Literal(
  "internal-entry",
  "visible"
);

const PositiveCountSchema = Schema.Number.pipe(Schema.int(), Schema.positive());
const NonNegativeCountSchema = Schema.Number.pipe(
  Schema.int(),
  Schema.nonNegative()
);
const SourceRevisionSchema = Schema.NonEmptyTrimmedString.pipe(
  Schema.maxLength(128)
);
const DescriptionSchema = Schema.optional(Schema.String);
const LocalizedFields = {
  description: DescriptionSchema,
  graph: LearningGraphIdentitySchema,
  locale: ContentLocaleSchema,
  sourceRevision: SourceRevisionSchema,
  title: Schema.String,
};
const ParentFields = {
  countryKey: TryoutKeySchema,
  examKey: TryoutKeySchema,
};
/** One localized country row in an immutable try-out catalog. */
export const TryoutCountrySchema = Schema.Struct({
  ...LocalizedFields,
  countryCode: TryoutCountryCodeSchema,
  countryKey: TryoutKeySchema,
  kind: Schema.Literal("country"),
  publicPath: PublicPathSchema,
});
export type TryoutCountry = typeof TryoutCountrySchema.Type;
/** One localized exam row in an immutable try-out catalog. */
export const TryoutExamSchema = Schema.Struct({
  ...LocalizedFields,
  countryKey: TryoutKeySchema,
  examKey: TryoutKeySchema,
  kind: Schema.Literal("exam"),
  publicPath: PublicPathSchema,
  scoringStrategy: TryoutScoringSchema,
});
export type TryoutExam = typeof TryoutExamSchema.Type;
/** One localized track row with exact authored inventory counts. */
export const TryoutTrackSchema = Schema.Struct({
  ...LocalizedFields,
  ...ParentFields,
  kind: Schema.Literal("track"),
  order: PositiveCountSchema,
  publicPath: PublicPathSchema,
  questionCount: PositiveCountSchema,
  sectionCount: PositiveCountSchema,
  setCount: PositiveCountSchema,
  trackKey: TryoutKeySchema,
  trackKind: TryoutTrackKindSchema,
  visibleSectionCount: NonNegativeCountSchema,
}).pipe(
  Schema.filter(
    ({ sectionCount, visibleSectionCount }) =>
      visibleSectionCount <= sectionCount,
    { message: () => "Visible track sections cannot exceed all sections." }
  )
);
export type TryoutTrack = typeof TryoutTrackSchema.Type;

/** One localized set row with exact section and question counts. */
export const TryoutSetSchema = Schema.Struct({
  ...LocalizedFields,
  ...ParentFields,
  internalEntrySectionKey: Schema.optional(TryoutKeySchema),
  kind: Schema.Literal("set"),
  order: PositiveCountSchema,
  publicPath: PublicPathSchema,
  questionCount: PositiveCountSchema,
  scoringStrategy: TryoutScoringSchema,
  sectionCount: PositiveCountSchema,
  setKey: TryoutKeySchema,
  trackKey: TryoutKeySchema,
  visibleSectionCount: NonNegativeCountSchema,
}).pipe(
  Schema.filter(
    ({ internalEntrySectionKey, sectionCount, visibleSectionCount }) =>
      internalEntrySectionKey === undefined
        ? visibleSectionCount === sectionCount
        : sectionCount === 1 && visibleSectionCount === 0,
    { message: () => "Set section counts do not match their visibility." }
  )
);
export type TryoutSet = typeof TryoutSetSchema.Type;

/** One localized section row with exact timing and source ownership. */
export const TryoutSectionSchema = Schema.Struct({
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
  visibility: TryoutVisibilitySchema,
}).pipe(
  Schema.filter(
    ({ publicPath, visibility }) =>
      visibility === "visible"
        ? publicPath !== undefined
        : publicPath === undefined,
    { message: () => "Section visibility does not match its public path." }
  )
);
export type TryoutSection = typeof TryoutSectionSchema.Type;

/** Complete domain-specific hierarchy vocabulary for try-out publication. */
export const TryoutCatalogRowSchema = Schema.Union(
  TryoutCountrySchema,
  TryoutExamSchema,
  TryoutTrackSchema,
  TryoutSetSchema,
  TryoutSectionSchema
);
export type TryoutCatalogRow = typeof TryoutCatalogRowSchema.Type;

/** One frozen localized answer choice owned by server-side attempt state. */
export const TryoutChoiceSchema = Schema.Struct({
  isCorrect: Schema.Boolean,
  label: Schema.String,
  optionKey: Schema.String.pipe(Schema.pattern(OPTION_KEY_PATTERN)),
  order: PositiveCountSchema,
});
export type TryoutChoice = typeof TryoutChoiceSchema.Type;

/** Checks exact option identities and one correct answer without fallback. */
function hasCoherentChoices(choices: readonly TryoutChoice[]) {
  return (
    choices.filter(({ isCorrect }) => isCorrect).length === 1 &&
    choices.every(
      ({ optionKey, order }, index) =>
        order === index + 1 && optionKey === `option-${order}`
    )
  );
}

/** Complete ordered single-answer choices frozen into one attempt placement. */
export const TryoutChoiceListSchema = Schema.NonEmptyArray(
  TryoutChoiceSchema
).pipe(
  Schema.filter(hasCoherentChoices, {
    message: () =>
      "Choices require contiguous option identities and one correct answer.",
  })
);

const PlacementFields = {
  ...ParentFields,
  answerContentKey: ContentKeySchema,
  choices: TryoutChoiceListSchema,
  locale: ContentLocaleSchema,
  questionContentKey: ContentKeySchema,
  questionOrder: PositiveCountSchema,
  questionSourcePath: CorpusSourcePathSchema,
  rendererDomain: RendererDomainSchema,
  scope: Schema.Literal("server"),
  sectionKey: TryoutKeySchema,
  setKey: TryoutKeySchema,
  sourceRevision: SourceRevisionSchema,
  trackKey: TryoutKeySchema,
};

/** Checks that question, answer, source, and authored order share one root. */
function hasCoherentPlacementKeys(input: {
  readonly answerContentKey: string;
  readonly questionContentKey: string;
  readonly questionOrder: number;
  readonly questionSourcePath: string;
}) {
  const questionSuffix = "/question";
  if (!input.questionContentKey.endsWith(questionSuffix)) {
    return false;
  }
  const questionRoot = input.questionContentKey.slice(
    0,
    -questionSuffix.length
  );
  const physicalTail = questionRoot.split("/").slice(-2).join("/");
  return (
    input.answerContentKey === `${questionRoot}/answer` &&
    questionRoot.endsWith(`/question-${input.questionOrder}`) &&
    input.questionSourcePath.endsWith(`/${physicalTail}`)
  );
}

/** Active locale placement before immutable artifact hashes are bound. */
export const TryoutPlacementSourceSchema = Schema.Struct(PlacementFields).pipe(
  Schema.filter(hasCoherentPlacementKeys, {
    message: () =>
      "Placement source, content keys, and authored order must agree.",
  })
);
export type TryoutPlacementSource = typeof TryoutPlacementSourceSchema.Type;

/** Active locale placement bound to reviewed question and answer artifacts. */
export const TryoutPlacementSchema = Schema.Struct({
  ...PlacementFields,
  answerArtifactHash: Sha256HashSchema,
  questionArtifactHash: Sha256HashSchema,
  title: Schema.String,
}).pipe(
  Schema.filter(hasCoherentPlacementKeys, {
    message: () =>
      "Placement source, content keys, and authored order must agree.",
  })
);
export type TryoutPlacement = typeof TryoutPlacementSchema.Type;

/** Hashed immutable hierarchy row accepted by publication storage. */
export const TryoutCatalogRecordSchema = Schema.Struct({
  row: TryoutCatalogRowSchema,
  rowHash: Sha256HashSchema,
});
export type TryoutCatalogRecord = typeof TryoutCatalogRecordSchema.Type;

/** Hashed immutable placement row accepted by publication storage. */
export const TryoutPlacementRecordSchema = Schema.Struct({
  row: TryoutPlacementSchema,
  rowHash: Sha256HashSchema,
});
export type TryoutPlacementRecord = typeof TryoutPlacementRecordSchema.Type;

/** Signed per-kind hierarchy counts for one immutable try-out snapshot. */
export const TryoutCatalogCountsSchema = Schema.Struct({
  country: NonNegativeCountSchema,
  exam: NonNegativeCountSchema,
  section: NonNegativeCountSchema,
  set: NonNegativeCountSchema,
  track: NonNegativeCountSchema,
});
export type TryoutCatalogCounts = typeof TryoutCatalogCountsSchema.Type;

const SnapshotFields = {
  catalogDigest: Sha256HashSchema,
  counts: TryoutCatalogCountsSchema,
  format: Schema.Literal("tryout-v1"),
  locales: Schema.Tuple(Schema.Literal("en"), Schema.Literal("id")),
  placementCount: NonNegativeCountSchema,
  placementDigest: Sha256HashSchema,
  routeCount: NonNegativeCountSchema,
};

/** Canonical snapshot facts authenticated by the global content release. */
export const TryoutSnapshotInputSchema = Schema.Struct(SnapshotFields);
export type TryoutSnapshotInput = typeof TryoutSnapshotInputSchema.Type;

/** Content-addressed try-out snapshot selected by one global release. */
export const TryoutSnapshotSchema = Schema.Struct({
  ...SnapshotFields,
  snapshotId: Sha256HashSchema,
});
export type TryoutSnapshot = typeof TryoutSnapshotSchema.Type;

/** Builds the deterministic hierarchy identity used for sorting and dedupe. */
export function tryoutCatalogIdentity(row: TryoutCatalogRow) {
  const keys = [
    row.locale,
    row.kind,
    row.countryKey,
    "examKey" in row ? row.examKey : "",
    "trackKey" in row ? row.trackKey : "",
    "setKey" in row ? row.setKey : "",
    "sectionKey" in row ? row.sectionKey : "",
  ];
  return keys.join("\0");
}

/** Compares immutable hierarchy rows by their stable locale identity. */
export function compareTryoutCatalog(
  left: TryoutCatalogRow,
  right: TryoutCatalogRow
) {
  return tryoutCatalogIdentity(left).localeCompare(
    tryoutCatalogIdentity(right)
  );
}
