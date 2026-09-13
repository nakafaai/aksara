import { Effect, Schema } from "effect";
import {
  ContentReleaseCurrentSchema,
  RecoveryLookupSchema,
  ReleaseVerificationStatusSchema,
  RollbackPageSchema,
  SignedContentArtifactSchema,
} from "#contracts/adoption/schema";
import { decodeContract } from "#contracts/decode";
import { StageArtifactBatchInputSchema as CurrentStageArtifactBatchInputSchema } from "#contracts/transport/batch";
import {
  StageGroupInputSchema as CurrentStageGroupInputSchema,
  StageGroupRequestSchema as CurrentStageGroupRequestSchema,
  StageOperationSchema as CurrentStageOperationSchema,
} from "#contracts/transport/group";
import {
  MAX_ARTIFACT_BATCH_COUNT,
  MAX_STAGE_GROUP_COUNT,
} from "#contracts/transport/limits";
import { PublicationRequestSchema as CurrentPublicationRequestSchema } from "#contracts/transport/request";
import {
  PublicationCurrentSuccessSchema as CurrentPublicationCurrentSuccessSchema,
  PublicationFailureResponseSchema as CurrentPublicationFailureResponseSchema,
  PublicationRecoverySuccessSchema as CurrentPublicationRecoverySuccessSchema,
  PublicationRollbackSuccessSchema as CurrentPublicationRollbackSuccessSchema,
  PublicationSuccessSchema as CurrentPublicationSuccessSchema,
  VerifyReleaseSuccessSchema as CurrentVerifyReleaseSuccessSchema,
} from "#contracts/transport/response";

/** Only artifact staging expands; new release writes remain current-only. */
export const StageArtifactBatchInputSchema =
  CurrentStageArtifactBatchInputSchema.mapFields((fields) => ({
    ...fields,
    artifacts: Schema.NonEmptyArray(SignedContentArtifactSchema).check(
      Schema.isMaxLength(MAX_ARTIFACT_BATCH_COUNT)
    ),
  }));
export type StageArtifactBatchInput = typeof StageArtifactBatchInputSchema.Type;
export const StageArtifactBatchRequestSchema =
  StageArtifactBatchInputSchema.mapFields((fields) => ({
    ...fields,
    operation: Schema.Literal("stageArtifactBatch"),
  }));
export type StageArtifactBatchRequest =
  typeof StageArtifactBatchRequestSchema.Type;
export const StageOperationSchema = Schema.Union([
  StageArtifactBatchRequestSchema,
  CurrentStageOperationSchema,
]);
export type StageOperation = typeof StageOperationSchema.Type;
export const StageGroupInputSchema = CurrentStageGroupInputSchema.mapFields(
  (fields) => ({
    ...fields,
    requests: Schema.NonEmptyArray(StageOperationSchema).check(
      Schema.isMaxLength(MAX_STAGE_GROUP_COUNT)
    ),
  }),
  { unsafePreserveChecks: true }
);
export type StageGroupInput = typeof StageGroupInputSchema.Type;
export const StageGroupRequestSchema = CurrentStageGroupRequestSchema.mapFields(
  (fields) => ({ ...fields, requests: StageGroupInputSchema.fields.requests }),
  { unsafePreserveChecks: true }
);
export type StageGroupRequest = typeof StageGroupRequestSchema.Type;
export const PublicationRequestSchema = Schema.Union([
  CurrentPublicationRequestSchema,
  StageArtifactBatchRequestSchema,
  StageGroupRequestSchema,
]);
export type PublicationRequest = typeof PublicationRequestSchema.Type;
export const PublicationCurrentSuccessSchema =
  CurrentPublicationCurrentSuccessSchema.mapFields((fields) => ({
    ...fields,
    value: ContentReleaseCurrentSchema,
  }));
export const PublicationRecoverySuccessSchema =
  CurrentPublicationRecoverySuccessSchema.mapFields((fields) => ({
    ...fields,
    value: RecoveryLookupSchema,
  }));
export const PublicationRollbackSuccessSchema =
  CurrentPublicationRollbackSuccessSchema.mapFields((fields) => ({
    ...fields,
    value: RollbackPageSchema,
  }));
export const VerifyReleaseSuccessSchema =
  CurrentVerifyReleaseSuccessSchema.mapFields((fields) => ({
    ...fields,
    value: ReleaseVerificationStatusSchema,
  }));
export const PublicationSuccessSchema = Schema.Union([
  CurrentPublicationSuccessSchema,
  PublicationCurrentSuccessSchema,
  PublicationRecoverySuccessSchema,
  PublicationRollbackSuccessSchema,
  VerifyReleaseSuccessSchema,
]);
export type PublicationSuccess = typeof PublicationSuccessSchema.Type;
export const PublicationResponseSchema = Schema.Union([
  PublicationSuccessSchema,
  CurrentPublicationFailureResponseSchema,
]);
export type PublicationResponse = typeof PublicationResponseSchema.Type;

/** Strictly decodes migration ingress without erasing signed legacy fields. */
export const decodePublicationRequest = Effect.fn(
  "AksaraContracts.adoption.decodePublicationRequest"
)((input: unknown) =>
  decodeContract(PublicationRequestSchema, "PublicationRequest", input)
);
/** Strictly decodes mixed authoritative release state before transport use. */
export const decodePublicationResponse = Effect.fn(
  "AksaraContracts.adoption.decodePublicationResponse"
)((input: unknown) =>
  decodeContract(PublicationResponseSchema, "PublicationResponse", input)
);
