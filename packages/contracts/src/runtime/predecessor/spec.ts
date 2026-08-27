import { Effect, Schema } from "effect";
import {
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
import { AppLocaleSchema } from "#contracts/locale";
import { QuestionKeySchema } from "#contracts/question/identity";
import { SignedContentReleaseSchema } from "#contracts/release/spec";
import { RendererManifestEnvelopeSchema } from "#contracts/renderer/contract";
import {
  hasBoundedProtectedRuntimeResponse,
  MAX_PROTECTED_RUNTIME_SELECTORS,
} from "#contracts/runtime/protected/limits";
import {
  ContentRuntimeFailureSchema,
  ContentRuntimeMissingSchema,
} from "#contracts/runtime/result";

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

/** One exact frozen try-out body selected by the predecessor client. */
export const ProtectedContentRuntimeSelectorSchema = Schema.Struct({
  artifactHash: Sha256HashSchema,
  contentKey: ContentKeySchema,
  delivery: Schema.Literals(["authenticated", "entitled"]),
}).pipe(
  Schema.check(
    Schema.makeFilter(hasProtectedBodyKind, {
      message: "Expected authenticated prompts and entitled answer bodies.",
    })
  )
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
  Schema.check(Schema.isMinLength(1)),
  Schema.check(Schema.isMaxLength(MAX_PROTECTED_RUNTIME_SELECTORS)),
  Schema.check(
    Schema.makeFilter(hasUniqueSelectors, {
      message: "Expected unique protected runtime artifact selectors.",
    })
  )
);

/** One predecessor read sharing a retained snapshot and locale. */
export const ProtectedContentRuntimeRequestSchema = Schema.Struct({
  appLocale: AppLocaleSchema,
  selectors: ProtectedContentRuntimeSelectorsSchema,
  snapshotId: Sha256HashSchema,
  snapshotReleaseId: ReleaseIdSchema,
});
export type ProtectedContentRuntimeRequest =
  typeof ProtectedContentRuntimeRequestSchema.Type;

/** One selected artifact inside a predecessor batch response. */
export const ProtectedContentRuntimeItemSchema = Schema.Struct({
  artifact: SignedContentArtifactSchema,
  delivery: Schema.Literals(["authenticated", "entitled"]),
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
  Schema.check(Schema.isMinLength(1)),
  Schema.check(Schema.isMaxLength(MAX_PROTECTED_RUNTIME_SELECTORS)),
  Schema.check(
    Schema.makeFilter(hasUniqueArtifacts, {
      message: "Expected unique protected runtime artifacts.",
    })
  )
);

/** Exact response contract deployed before permanent runtime bundles. */
export const ProtectedContentRuntimeFoundSchema = Schema.Struct({
  items: ProtectedContentRuntimeItemsSchema,
  kind: Schema.Literal("found"),
  release: SignedContentReleaseSchema,
  rendererManifest: RendererManifestEnvelopeSchema,
  snapshotId: Sha256HashSchema,
  snapshotManifestHash: Sha256HashSchema,
  snapshotReleaseId: ReleaseIdSchema,
}).pipe(
  Schema.check(
    Schema.makeFilter(hasBoundedProtectedRuntimeResponse, {
      message:
        "Expected the protected runtime response to fit its wire ceiling.",
    })
  )
);
export type ProtectedContentRuntimeFound =
  typeof ProtectedContentRuntimeFoundSchema.Type;

/** Complete response vocabulary for the predecessor protected seam. */
export const ProtectedContentRuntimeResponseSchema = Schema.Union([
  ProtectedContentRuntimeFoundSchema,
  ContentRuntimeMissingSchema,
  ContentRuntimeFailureSchema,
]);
export type ProtectedContentRuntimeResponse =
  typeof ProtectedContentRuntimeResponseSchema.Type;

/** Strictly decodes one predecessor batch request. */
export const decodeProtectedContentRuntimeRequest = Effect.fn(
  "AksaraContracts.decodePredecessorProtectedContentRuntimeRequest"
)((input: unknown) =>
  decodeContract(
    ProtectedContentRuntimeRequestSchema,
    "PredecessorProtectedContentRuntimeRequest",
    input
  )
);

/** Strictly decodes one predecessor batch response. */
export const decodeProtectedContentRuntimeResponse = Effect.fn(
  "AksaraContracts.decodePredecessorProtectedContentRuntimeResponse"
)((input: unknown) =>
  decodeContract(
    ProtectedContentRuntimeResponseSchema,
    "PredecessorProtectedContentRuntimeResponse",
    input
  )
);
