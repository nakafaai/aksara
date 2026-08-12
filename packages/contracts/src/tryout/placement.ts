import { Schema } from "effect";

import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  Sha256HashSchema,
} from "#contracts/ids";
import {
  AppLocaleSchema,
  ArtifactLocaleSchema,
  DeliveryLanguageSchema,
} from "#contracts/locale";
import {
  QuestionKeySchema,
  questionKeyParts,
} from "#contracts/question/identity";
import { RendererDomainSchema } from "#contracts/renderer/domain";
import { TryoutKeySchema } from "#contracts/tryout/key";
import { deliveryLanguageForSection } from "#contracts/tryout/language";
import {
  TryoutChoiceListSchema,
  TryoutContentHashSchema,
  TryoutSourceRevisionSchema,
} from "#contracts/tryout/spec";

const PositiveCountSchema = Schema.Number.pipe(Schema.int(), Schema.positive());

const PlacementV2Fields = {
  answerArtifactLocale: ArtifactLocaleSchema,
  answerContentKey: ContentKeySchema,
  appLocale: AppLocaleSchema,
  choices: TryoutChoiceListSchema,
  countryKey: TryoutKeySchema,
  deliveryLanguage: DeliveryLanguageSchema,
  examKey: TryoutKeySchema,
  questionArtifactLocale: ArtifactLocaleSchema,
  questionContentKey: ContentKeySchema,
  questionOrder: PositiveCountSchema,
  questionSourcePath: CorpusSourcePathSchema,
  rendererDomain: RendererDomainSchema,
  scope: Schema.Literal("server"),
  sectionKey: TryoutKeySchema,
  setKey: TryoutKeySchema,
  sourceRevision: TryoutSourceRevisionSchema,
  trackKey: TryoutKeySchema,
};

/** Checks that v2 content keys, source path, and authored order agree. */
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
  const questionSuffix = "/question";
  if (!input.questionContentKey.endsWith(questionSuffix)) {
    return false;
  }
  const questionRoot = input.questionContentKey.slice(
    0,
    -questionSuffix.length
  );
  if (!Schema.is(QuestionKeySchema)(questionRoot)) {
    return false;
  }
  const parts = questionKeyParts(questionRoot);
  return (
    input.answerContentKey === `${questionRoot}/answer` &&
    parts.countryKey === input.countryKey &&
    parts.examKey === input.examKey &&
    parts.sectionKey === input.sectionKey &&
    parts.setKey === input.setKey &&
    parts.questionNumber === input.questionOrder &&
    input.questionSourcePath === `packages/corpus/${questionRoot}` &&
    input.questionContentKey === `${questionRoot}/question`
  );
}

/** Checks app, delivery, and artifact language identity for one placement. */
function hasCoherentPlacementLanguages(input: {
  readonly answerArtifactLocale: string;
  readonly appLocale: typeof AppLocaleSchema.Type;
  readonly deliveryLanguage: string;
  readonly questionArtifactLocale: string;
  readonly sectionKey: typeof TryoutKeySchema.Type;
}) {
  const expectedDeliveryLanguage = deliveryLanguageForSection(
    input.sectionKey,
    input.appLocale
  );
  return (
    input.deliveryLanguage === expectedDeliveryLanguage &&
    input.questionArtifactLocale === expectedDeliveryLanguage &&
    input.answerArtifactLocale === input.appLocale
  );
}

/** Active v2 placement before immutable artifact hashes are bound. */
export const TryoutPlacementV2SourceSchema = Schema.Struct(
  PlacementV2Fields
).pipe(
  Schema.filter(hasCoherentPlacementKeys, {
    message: () =>
      "Placement source, content keys, and authored order must agree.",
  }),
  Schema.filter(hasCoherentPlacementLanguages, {
    message: () =>
      "Placement app, delivery, question, and answer languages must agree.",
  })
);
export type TryoutPlacementV2Source = typeof TryoutPlacementV2SourceSchema.Type;

/** Artifact-bound v2 placement retained by signed attempt state. */
export const TryoutPlacementV2Schema = Schema.Struct({
  ...PlacementV2Fields,
  answerArtifactHash: Sha256HashSchema,
  contentHash: TryoutContentHashSchema,
  questionArtifactHash: Sha256HashSchema,
  title: Schema.String,
}).pipe(
  Schema.filter(hasCoherentPlacementKeys, {
    message: () =>
      "Placement source, content keys, and authored order must agree.",
  }),
  Schema.filter(hasCoherentPlacementLanguages, {
    message: () =>
      "Placement app, delivery, question, and answer languages must agree.",
  })
);
export type TryoutPlacementV2 = typeof TryoutPlacementV2Schema.Type;

/** Hashed immutable v2 placement accepted by snapshot publication. */
export const TryoutPlacementV2RecordSchema = Schema.Struct({
  row: TryoutPlacementV2Schema,
  rowHash: Sha256HashSchema,
});
export type TryoutPlacementV2Record = typeof TryoutPlacementV2RecordSchema.Type;
