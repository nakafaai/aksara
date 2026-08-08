import { Effect, Schema } from "effect";
import {
  ContentLocaleSchema,
  type SignedContentArtifact,
  SignedContentArtifactSchema,
} from "#contracts/content";
import { decodeContract } from "#contracts/decode";
import {
  CorpusSourcePathSchema,
  PublicPathSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "#contracts/ids";
import {
  type RoutedContentProjection,
  RoutedContentProjectionSchema,
} from "#contracts/projection/spec";
import { SignedContentReleaseSchema } from "#contracts/release/spec";
import { RendererManifestEnvelopeSchema } from "#contracts/renderer/contract";

/** Maximum UTF-8 bytes accepted by the server-only runtime endpoint. */
export const MAX_PUBLIC_RUNTIME_REQUEST_BYTES = 4 * 1024;

/** Maximum UTF-8 bytes returned by the server-only runtime endpoint. */
export const MAX_PUBLIC_RUNTIME_RESPONSE_BYTES = 1024 * 1024;

/** Exact public route requested by the Nakafa server runtime. */
export const PublicContentRuntimeRequestSchema = Schema.Struct({
  delivery: Schema.Literal("public"),
  locale: ContentLocaleSchema,
  publicPath: PublicPathSchema,
});
export type PublicContentRuntimeRequest =
  typeof PublicContentRuntimeRequestSchema.Type;

/** Confirms one runtime artifact and projection describe the same document. */
function hasCoherentContent(input: {
  readonly artifact: SignedContentArtifact;
  readonly projection: RoutedContentProjection;
}) {
  const { payload } = input.artifact;
  return (
    payload.contentKey === input.projection.contentKey &&
    payload.locale === input.projection.locale
  );
}

/**
 * Server-only content selected by trusted Convex publication state.
 *
 * The signed release, renderer, and artifact are authenticated independently.
 * Public route and head membership or protected snapshot membership remain
 * target authority. This envelope is deliberately not a cryptographic
 * inclusion proof.
 */
const PublicContentRuntimeFoundFields = {
  artifact: SignedContentArtifactSchema,
  kind: Schema.Literal("found"),
  release: SignedContentReleaseSchema,
  rendererManifest: RendererManifestEnvelopeSchema,
  sourcePath: CorpusSourcePathSchema,
};

/** Public route body selected from the active indexed read model. */
export const PublicContentRuntimeFoundSchema = Schema.Struct({
  ...PublicContentRuntimeFoundFields,
  activeManifestHash: Sha256HashSchema,
  activeReleaseId: ReleaseIdSchema,
  delivery: Schema.Literal("public"),
  projection: RoutedContentProjectionSchema,
  projectionHash: Sha256HashSchema,
}).pipe(
  Schema.filter(hasCoherentContent, {
    message: () =>
      "Expected the runtime artifact and projection to share one identity.",
  })
);
export type PublicContentRuntimeFound =
  typeof PublicContentRuntimeFoundSchema.Type;

/** Exact absence response distinct from runtime or integrity failures. */
export const ContentRuntimeMissingSchema = Schema.Struct({
  kind: Schema.Literal("missing"),
});

/** Sanitized failure codes exposed by the server-only runtime endpoint. */
export const ContentRuntimeFailureCodeSchema = Schema.Literal(
  "CONTENT_RUNTIME_INTERNAL",
  "CONTENT_RUNTIME_INVALID",
  "CONTENT_RUNTIME_UNAUTHORIZED"
);

/** Sanitized runtime failure without implementation details or body bytes. */
export const ContentRuntimeFailureSchema = Schema.Struct({
  code: ContentRuntimeFailureCodeSchema,
  kind: Schema.Literal("failure"),
});

/** Complete response vocabulary for the public server-runtime seam. */
export const PublicContentRuntimeResponseSchema = Schema.Union(
  PublicContentRuntimeFoundSchema,
  ContentRuntimeMissingSchema,
  ContentRuntimeFailureSchema
);
export type PublicContentRuntimeResponse =
  typeof PublicContentRuntimeResponseSchema.Type;

/** Strictly decodes one unknown public server-runtime request. */
export const decodePublicContentRuntimeRequest = Effect.fn(
  "AksaraContracts.decodePublicContentRuntimeRequest"
)((input: unknown) =>
  decodeContract(
    PublicContentRuntimeRequestSchema,
    "PublicContentRuntimeRequest",
    input
  )
);

/** Strictly decodes one unknown public server-runtime response. */
export const decodePublicContentRuntimeResponse = Effect.fn(
  "AksaraContracts.decodePublicContentRuntimeResponse"
)((input: unknown) =>
  decodeContract(
    PublicContentRuntimeResponseSchema,
    "PublicContentRuntimeResponse",
    input
  )
);
