import { Schema } from "effect";

import { CountryCodeSchema } from "#contracts/country";
import { LearningGraphIdentitySchema } from "#contracts/graph/spec";
import {
  CorpusSourcePathSchema,
  PublicPathSchema,
  Sha256HashSchema,
} from "#contracts/ids";
import { AppLocaleSchema } from "#contracts/locale";
import { TryoutKeySchema } from "#contracts/tryout/key";
import {
  TryoutScoringSchema,
  TryoutSourceRevisionSchema,
  TryoutTrackKindSchema,
  TryoutVisibilitySchema,
} from "#contracts/tryout/spec";

const PositiveCountSchema = Schema.Number.pipe(Schema.int(), Schema.positive());
const NonNegativeCountSchema = Schema.Number.pipe(
  Schema.int(),
  Schema.nonNegative()
);
const LocalizedFields = {
  appLocale: AppLocaleSchema,
  description: Schema.optional(Schema.String),
  graph: LearningGraphIdentitySchema,
  sourceRevision: TryoutSourceRevisionSchema,
  title: Schema.String,
};
const ParentFields = {
  countryKey: TryoutKeySchema,
  examKey: TryoutKeySchema,
};

/** One localized country row. */
export const TryoutCountrySchema = Schema.Struct({
  ...LocalizedFields,
  countryCode: CountryCodeSchema,
  countryKey: TryoutKeySchema,
  kind: Schema.Literal("country"),
  order: PositiveCountSchema,
  publicPath: PublicPathSchema,
});
export type TryoutCountry = typeof TryoutCountrySchema.Type;

/** One localized exam row. */
export const TryoutExamSchema = Schema.Struct({
  ...LocalizedFields,
  countryKey: TryoutKeySchema,
  examKey: TryoutKeySchema,
  kind: Schema.Literal("exam"),
  order: PositiveCountSchema,
  publicPath: PublicPathSchema,
  scoringStrategy: TryoutScoringSchema,
});
export type TryoutExam = typeof TryoutExamSchema.Type;

/** One localized track row with exact inventory counts. */
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

/** One localized set row with exact inventory counts. */
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

/** One localized section row with source ownership. */
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

/** Complete hierarchy vocabulary for try-out publication. */
export const TryoutCatalogRowSchema = Schema.Union(
  TryoutCountrySchema,
  TryoutExamSchema,
  TryoutTrackSchema,
  TryoutSetSchema,
  TryoutSectionSchema
);
export type TryoutCatalogRow = typeof TryoutCatalogRowSchema.Type;

/** One hierarchy row bound to its deterministic hash. */
export const TryoutCatalogRecordSchema = Schema.Struct({
  row: TryoutCatalogRowSchema,
  rowHash: Sha256HashSchema,
});
export type TryoutCatalogRecord = typeof TryoutCatalogRecordSchema.Type;
