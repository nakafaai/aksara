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
  ReleaseIdSchema,
  Sha256HashSchema,
} from "#contracts/ids";
import { QuestionKeySchema } from "#contracts/question/identity";
import { SignedContentReleaseSchema } from "#contracts/release/spec";
import { RendererManifestEnvelopeSchema } from "#contracts/renderer/contract";
import {
  ContentRuntimeFailureSchema,
  ContentRuntimeMissingSchema,
} from "#contracts/runtime/spec";

/** Maximum protected selectors accepted in one retained-snapshot read. */
export const MAX_PROTECTED_RUNTIME_SELECTORS = 64;

/** Maximum UTF-8 bytes accepted by the protected batch endpoint. */
export const MAX_PROTECTED_RUNTIME_REQUEST_BYTES = 64 * 1024;

/** Maximum UTF-8 bytes returned by the protected batch endpoint. */
export const MAX_PROTECTED_RUNTIME_RESPONSE_BYTES = 4 * 1024 * 1024;

/** Checks one protected body selector uses its required delivery class. */
function hasProtectedBodyKind(input: {
  readonly contentKey: string;
  readonly delivery: "authenticated" | "entitled";
}) {
  const separator = input.contentKey.lastIndexOf("/");
  if (separator < 1) {
    return false;
  }
  const questionKey = input.contentKey.slice(0, separator);
  if (!Schema.is(QuestionKeySchema)(questionKey)) {
    return false;
  }
  if (input.delivery === "authenticated") {
    return input.contentKey.endsWith("/question");
  }
  return input.contentKey.endsWith("/answer");
}

/** One exact frozen try-out body selected after product authorization. */
export const ProtectedContentRuntimeSelectorSchema = Schema.Struct({
  artifactHash: Sha256HashSchema,
  contentKey: ContentKeySchema,
  delivery: Schema.Literal("authenticated", "entitled"),
}).pipe(
  Schema.filter(hasProtectedBodyKind, {
    message: () => "Expected authenticated prompts and entitled answer bodies.",
  })
);
export type ProtectedContentRuntimeSelector =
  typeof ProtectedContentRuntimeSelectorSchema.Type;

/** Checks a batch never requests the same immutable artifact twice. */
function hasUniqueSelectors(
  selectors: readonly ProtectedContentRuntimeSelector[]
) {
  const hashes = selectors.map(({ artifactHash }) => artifactHash);
  return new Set(hashes).size === hashes.length;
}

const ProtectedContentRuntimeSelectorsSchema = Schema.Array(
  ProtectedContentRuntimeSelectorSchema
).pipe(
  Schema.minItems(1),
  Schema.maxItems(MAX_PROTECTED_RUNTIME_SELECTORS),
  Schema.filter(hasUniqueSelectors, {
    message: () => "Expected unique protected runtime artifact selectors.",
  })
);

/** One bounded protected read sharing a retained snapshot and locale. */
export const ProtectedContentRuntimeRequestSchema = Schema.Struct({
  locale: ContentLocaleSchema,
  selectors: ProtectedContentRuntimeSelectorsSchema,
  snapshotId: Sha256HashSchema,
  snapshotReleaseId: ReleaseIdSchema,
});
export type ProtectedContentRuntimeRequest =
  typeof ProtectedContentRuntimeRequestSchema.Type;

/** One selected artifact inside a protected batch response. */
export const ProtectedContentRuntimeItemSchema = Schema.Struct({
  artifact: SignedContentArtifactSchema,
  delivery: Schema.Literal("authenticated", "entitled"),
  sourcePath: CorpusSourcePathSchema,
});
export type ProtectedContentRuntimeItem =
  typeof ProtectedContentRuntimeItemSchema.Type;

/** Checks one protected response never repeats an immutable artifact. */
function hasUniqueArtifacts(
  items: readonly { readonly artifact: SignedContentArtifact }[]
) {
  const hashes = items.map(({ artifact }) => artifact.artifactHash);
  return new Set(hashes).size === hashes.length;
}

const ProtectedContentRuntimeItemsSchema = Schema.Array(
  ProtectedContentRuntimeItemSchema
).pipe(
  Schema.minItems(1),
  Schema.maxItems(MAX_PROTECTED_RUNTIME_SELECTORS),
  Schema.filter(hasUniqueArtifacts, {
    message: () => "Expected unique protected runtime artifacts.",
  })
);

/** Protected frozen bodies selected from one retained try-out snapshot. */
export const ProtectedContentRuntimeFoundSchema = Schema.Struct({
  items: ProtectedContentRuntimeItemsSchema,
  kind: Schema.Literal("found"),
  release: SignedContentReleaseSchema,
  rendererManifest: RendererManifestEnvelopeSchema,
  snapshotId: Sha256HashSchema,
  snapshotManifestHash: Sha256HashSchema,
  snapshotReleaseId: ReleaseIdSchema,
});
export type ProtectedContentRuntimeFound =
  typeof ProtectedContentRuntimeFoundSchema.Type;

/** Complete response vocabulary for the protected batch runtime seam. */
export const ProtectedContentRuntimeResponseSchema = Schema.Union(
  ProtectedContentRuntimeFoundSchema,
  ContentRuntimeMissingSchema,
  ContentRuntimeFailureSchema
);
export type ProtectedContentRuntimeResponse =
  typeof ProtectedContentRuntimeResponseSchema.Type;

/** Strictly decodes one unknown protected batch request. */
export const decodeProtectedContentRuntimeRequest = Effect.fn(
  "AksaraContracts.decodeProtectedContentRuntimeRequest"
)((input: unknown) =>
  decodeContract(
    ProtectedContentRuntimeRequestSchema,
    "ProtectedContentRuntimeRequest",
    input
  )
);

/** Strictly decodes one unknown protected batch response. */
export const decodeProtectedContentRuntimeResponse = Effect.fn(
  "AksaraContracts.decodeProtectedContentRuntimeResponse"
)((input: unknown) =>
  decodeContract(
    ProtectedContentRuntimeResponseSchema,
    "ProtectedContentRuntimeResponse",
    input
  )
);
