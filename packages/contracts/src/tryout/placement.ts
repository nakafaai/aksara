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

const PlacementFields = {
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

/** Checks that content keys, source path, and authored order agree. */
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

/** Active placement before immutable artifact hashes are bound. */
export const TryoutPlacementSourceSchema = Schema.Struct(PlacementFields).pipe(
  Schema.filter(hasCoherentPlacementKeys, {
    message: () =>
      "Placement source, content keys, and authored order must agree.",
  }),
  Schema.filter(hasCoherentPlacementLanguages, {
    message: () =>
      "Placement app, delivery, question, and answer languages must agree.",
  })
);
export type TryoutPlacementSource = typeof TryoutPlacementSourceSchema.Type;

/** Artifact-bound placement retained by signed attempt state. */
export const TryoutPlacementSchema = Schema.Struct({
  ...PlacementFields,
  answerArtifactHash: Sha256HashSchema,
  contentHash: TryoutContentHashSchema,
  questionArtifactHash: Sha256HashSchema,
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
export type TryoutPlacement = typeof TryoutPlacementSchema.Type;

/** Hashed immutable placement accepted by snapshot publication. */
export const TryoutPlacementRecordSchema = Schema.Struct({
  row: TryoutPlacementSchema,
  rowHash: Sha256HashSchema,
});
export type TryoutPlacementRecord = typeof TryoutPlacementRecordSchema.Type;
