import { Effect, Schema } from "effect";
import {
  ContentLocaleSchema,
  type SignedContentArtifact,
  SignedContentArtifactSchema,
} from "#contracts/content";
import { decodeContract } from "#contracts/decode";
import {
  ContentKeySchema,
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
export const MAX_RUNTIME_REQUEST_BYTES = 4 * 1024;

/** Maximum UTF-8 bytes returned by the server-only runtime endpoint. */
export const MAX_RUNTIME_RESPONSE_BYTES = 1024 * 1024;

/** Exact public route requested by the Nakafa server runtime. */
export const PublicContentRuntimeRequestSchema = Schema.Struct({
  delivery: Schema.Literal("public"),
  locale: ContentLocaleSchema,
  publicPath: PublicPathSchema,
});

/** Checks one protected body selector uses its required delivery class. */
function hasProtectedBodyKind(input: {
  readonly contentKey: string;
  readonly delivery: "authenticated" | "entitled";
}) {
  if (input.delivery === "authenticated") {
    return input.contentKey.endsWith("/question");
  }
  return input.contentKey.endsWith("/answer");
}

/** Exact frozen try-out body requested after product authorization. */
export const ProtectedContentRuntimeRequestSchema = Schema.Struct({
  artifactHash: Sha256HashSchema,
  contentKey: ContentKeySchema,
  delivery: Schema.Literal("authenticated", "entitled"),
  locale: ContentLocaleSchema,
  snapshotId: Sha256HashSchema,
}).pipe(
  Schema.filter(hasProtectedBodyKind, {
    message: () => "Expected authenticated prompts and entitled answer bodies.",
  })
);

/** Complete public and protected server-runtime request vocabulary. */
export const ContentRuntimeRequestSchema = Schema.Union(
  PublicContentRuntimeRequestSchema,
  ProtectedContentRuntimeRequestSchema
);
export type ContentRuntimeRequest = typeof ContentRuntimeRequestSchema.Type;

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
 * Route, head, delivery, and active-pointer membership remain target authority;
 * this envelope is deliberately not a cryptographic inclusion proof.
 */
const ContentRuntimeFoundFields = {
  activeManifestHash: Sha256HashSchema,
  activeReleaseId: ReleaseIdSchema,
  artifact: SignedContentArtifactSchema,
  kind: Schema.Literal("found"),
  release: SignedContentReleaseSchema,
  rendererManifest: RendererManifestEnvelopeSchema,
  sourcePath: CorpusSourcePathSchema,
};

/** Public route body selected from the active indexed read model. */
export const PublicContentRuntimeFoundSchema = Schema.Struct({
  ...ContentRuntimeFoundFields,
  delivery: Schema.Literal("public"),
  projection: RoutedContentProjectionSchema,
  projectionHash: Sha256HashSchema,
}).pipe(
  Schema.filter(hasCoherentContent, {
    message: () =>
      "Expected the runtime artifact and projection to share one identity.",
  })
);

/** Protected frozen body selected from one retained try-out snapshot. */
export const ProtectedContentRuntimeFoundSchema = Schema.Struct({
  ...ContentRuntimeFoundFields,
  delivery: Schema.Literal("authenticated", "entitled"),
  snapshotId: Sha256HashSchema,
});

/** Complete verified artifact response vocabulary for every delivery class. */
export const ContentRuntimeFoundSchema = Schema.Union(
  PublicContentRuntimeFoundSchema,
  ProtectedContentRuntimeFoundSchema
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
