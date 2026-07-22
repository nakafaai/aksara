import { Effect, Schema } from "effect";
import { verifySignedContentArtifact } from "#contracts/artifact/verify";
import {
  ContentLocaleSchema,
  type SignedContentArtifact,
  SignedContentArtifactSchema,
} from "#contracts/content";
import { decodeContract } from "#contracts/decode";
import { ContentDeliveryClassSchema } from "#contracts/delivery";
import {
  PublicPathSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "#contracts/ids";
import { hashMaterialProjection } from "#contracts/projection/hash";
import {
  type MaterialLessonProjection,
  MaterialLessonProjectionSchema,
} from "#contracts/projection/material";
import { RendererContractVersionSchema } from "#contracts/renderer/contract";

/** Maximum UTF-8 bytes accepted by the server-only runtime endpoint. */
export const MAX_RUNTIME_REQUEST_BYTES = 4 * 1024;

/** Maximum UTF-8 bytes returned by the server-only runtime endpoint. */
export const MAX_RUNTIME_RESPONSE_BYTES = 1024 * 1024;

/** Exact route and access class requested by the Nakafa server runtime. */
export const ContentRuntimeRequestSchema = Schema.Struct({
  delivery: ContentDeliveryClassSchema,
  locale: ContentLocaleSchema,
  publicPath: PublicPathSchema,
});
export type ContentRuntimeRequest = typeof ContentRuntimeRequestSchema.Type;

/** Confirms one runtime artifact and projection describe the same document. */
function hasCoherentContent(input: {
  readonly artifact: SignedContentArtifact;
  readonly projection: MaterialLessonProjection;
}) {
  const { payload } = input.artifact;
  return (
    payload.contentKey === input.projection.contentKey &&
    payload.locale === input.projection.locale
  );
}

/** Authenticated server-only content returned from the active release. */
export const ContentRuntimeFoundSchema = Schema.Struct({
  activeManifestHash: Sha256HashSchema,
  activeReleaseId: ReleaseIdSchema,
  artifact: SignedContentArtifactSchema,
  delivery: ContentDeliveryClassSchema,
  kind: Schema.Literal("found"),
  projection: MaterialLessonProjectionSchema,
  projectionHash: Sha256HashSchema,
  rendererContractVersion: RendererContractVersionSchema,
}).pipe(
  Schema.filter(hasCoherentContent, {
    message: () =>
      "Expected the runtime artifact and projection to share one identity.",
  })
);
export type ContentRuntimeFound = typeof ContentRuntimeFoundSchema.Type;

/** Exact absence response distinct from runtime or integrity failures. */
export const ContentRuntimeMissingSchema = Schema.Struct({
  kind: Schema.Literal("missing"),
});

/** Sanitized failure codes exposed by the server-only runtime endpoint. */
export const ContentRuntimeFailureCodeSchema = Schema.Literal(
  "CONTENT_RUNTIME_FORBIDDEN",
  "CONTENT_RUNTIME_INTERNAL",
  "CONTENT_RUNTIME_INVALID",
  "CONTENT_RUNTIME_UNAUTHORIZED"
);

/** Sanitized runtime failure without implementation details or body bytes. */
export const ContentRuntimeFailureSchema = Schema.Struct({
  code: ContentRuntimeFailureCodeSchema,
  kind: Schema.Literal("failure"),
});

/** Complete response vocabulary for the server-authenticated runtime seam. */
export const ContentRuntimeResponseSchema = Schema.Union(
  ContentRuntimeFoundSchema,
  ContentRuntimeMissingSchema,
  ContentRuntimeFailureSchema
);
export type ContentRuntimeResponse = typeof ContentRuntimeResponseSchema.Type;

/** A decoded runtime response does not belong to its initiating request. */
export class ContentRuntimeMismatchError extends Schema.TaggedError<ContentRuntimeMismatchError>()(
  "ContentRuntimeMismatchError",
  {
    reason: Schema.Literal("delivery", "locale", "publicPath"),
  }
) {}

/** A runtime projection hash does not identify its canonical projection body. */
export class ContentRuntimeProjectionHashError extends Schema.TaggedError<ContentRuntimeProjectionHashError>()(
  "ContentRuntimeProjectionHashError",
  {
    actualHash: Sha256HashSchema,
    expectedHash: Sha256HashSchema,
  }
) {}

/** Strictly decodes one unknown server-runtime request. */
export const decodeContentRuntimeRequest = Effect.fn(
  "AksaraContracts.decodeContentRuntimeRequest"
)((input: unknown) =>
  decodeContract(ContentRuntimeRequestSchema, "ContentRuntimeRequest", input)
);

/** Strictly decodes one unknown server-runtime response. */
export const decodeContentRuntimeResponse = Effect.fn(
  "AksaraContracts.decodeContentRuntimeResponse"
)((input: unknown) =>
  decodeContract(ContentRuntimeResponseSchema, "ContentRuntimeResponse", input)
);

/** Decodes and binds one runtime response to its exact initiating request. */
export const verifyContentRuntimeExchange = Effect.fn(
  "AksaraContracts.verifyContentRuntimeExchange"
)(function* (input: {
  readonly rendererManifest: unknown;
  readonly request: unknown;
  readonly response: unknown;
}) {
  const request = yield* decodeContentRuntimeRequest(input.request);
  const response = yield* decodeContentRuntimeResponse(input.response);
  if (response.kind !== "found") {
    return response;
  }
  if (response.delivery !== request.delivery) {
    return yield* new ContentRuntimeMismatchError({ reason: "delivery" });
  }
  if (response.projection.locale !== request.locale) {
    return yield* new ContentRuntimeMismatchError({ reason: "locale" });
  }
  if (response.projection.publicPath !== request.publicPath) {
    return yield* new ContentRuntimeMismatchError({ reason: "publicPath" });
  }
  const projectionHash = hashMaterialProjection(response.projection);
  if (projectionHash !== response.projectionHash) {
    return yield* new ContentRuntimeProjectionHashError({
      actualHash: projectionHash,
      expectedHash: response.projectionHash,
    });
  }
  yield* verifySignedContentArtifact({
    artifact: response.artifact,
    rendererContractVersion: response.rendererContractVersion,
    rendererManifest: input.rendererManifest,
  });
  return response;
});
