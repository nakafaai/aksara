import { Effect, Schema } from "effect";
import {
  RendererManifestEnvelopeSchema,
  SignedContentArtifactSchema,
  SignedContentReleaseSchema,
} from "#contracts/adoption/schema";
import { decodeContract } from "#contracts/decode";
import { MAX_PROTECTED_RUNTIME_SELECTORS } from "#contracts/runtime/protected/limits";
import {
  ProtectedContentRuntimeFoundSchema as CurrentProtectedContentRuntimeFoundSchema,
  ProtectedContentRuntimeItemSchema as CurrentProtectedContentRuntimeItemSchema,
} from "#contracts/runtime/protected/spec";
import {
  ContentRuntimeFailureSchema,
  ContentRuntimeMissingSchema,
} from "#contracts/runtime/result";
import { PublicContentRuntimeFoundSchema as CurrentPublicContentRuntimeFoundSchema } from "#contracts/runtime/spec";

/** Keeps the existing public identity invariant across exact signed schemas. */
export const PublicContentRuntimeFoundSchema =
  CurrentPublicContentRuntimeFoundSchema.mapFields(
    (fields) => ({
      ...fields,
      artifact: SignedContentArtifactSchema,
      release: SignedContentReleaseSchema,
      rendererManifest: RendererManifestEnvelopeSchema,
    }),
    { unsafePreserveChecks: true }
  );
export type PublicContentRuntimeFound =
  typeof PublicContentRuntimeFoundSchema.Type;
export const PublicContentRuntimeResponseSchema = Schema.Union([
  PublicContentRuntimeFoundSchema,
  ContentRuntimeMissingSchema,
  ContentRuntimeFailureSchema,
]);
export type PublicContentRuntimeResponse =
  typeof PublicContentRuntimeResponseSchema.Type;
export const ProtectedContentRuntimeItemSchema =
  CurrentProtectedContentRuntimeItemSchema.mapFields((fields) => ({
    ...fields,
    artifact: SignedContentArtifactSchema,
  }));
export type ProtectedContentRuntimeItem =
  typeof ProtectedContentRuntimeItemSchema.Type;
const ItemsSchema = Schema.Array(ProtectedContentRuntimeItemSchema).check(
  Schema.isMinLength(1),
  Schema.isMaxLength(MAX_PROTECTED_RUNTIME_SELECTORS),
  Schema.makeFilter(
    (items) =>
      new Set(items.map(({ artifact }) => artifact.artifactHash)).size ===
      items.length,
    { message: "Expected unique protected runtime artifacts." }
  )
);
/** Preserves response size and selection bounds while retaining signed bodies. */
export const ProtectedContentRuntimeFoundSchema =
  CurrentProtectedContentRuntimeFoundSchema.mapFields(
    (fields) => ({
      ...fields,
      items: ItemsSchema,
      rendererManifest: RendererManifestEnvelopeSchema,
    }),
    { unsafePreserveChecks: true }
  );
export type ProtectedContentRuntimeFound =
  typeof ProtectedContentRuntimeFoundSchema.Type;
export const ProtectedContentRuntimeResponseSchema = Schema.Union([
  ProtectedContentRuntimeFoundSchema,
  ContentRuntimeMissingSchema,
  ContentRuntimeFailureSchema,
]);
export type ProtectedContentRuntimeResponse =
  typeof ProtectedContentRuntimeResponseSchema.Type;
/** Strictly decodes public evidence with independent signed entity selection. */
export const decodePublicContentRuntimeResponse = Effect.fn(
  "AksaraContracts.adoption.decodePublicRuntimeResponse"
)((input: unknown) =>
  decodeContract(
    PublicContentRuntimeResponseSchema,
    "PublicContentRuntimeResponse",
    input
  )
);
/** Strictly decodes retained protected bodies without mutating authenticated bytes. */
export const decodeProtectedContentRuntimeResponse = Effect.fn(
  "AksaraContracts.adoption.decodeProtectedRuntimeResponse"
)((input: unknown) =>
  decodeContract(
    ProtectedContentRuntimeResponseSchema,
    "ProtectedContentRuntimeResponse",
    input
  )
);
