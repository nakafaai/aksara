import { Effect, Schema } from "effect";
import {
  type SignedContentArtifact,
  SignedContentArtifactSchema,
} from "#contracts/content";
import { decodeContract } from "#contracts/decode";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  Sha256HashSchema,
} from "#contracts/ids";
import { QuestionKeySchema } from "#contracts/question/identity";
import { RendererManifestEnvelopeSchema } from "#contracts/renderer/contract";
import {
  hasBoundedProtectedRuntimeResponse,
  MAX_PROTECTED_RUNTIME_SELECTORS,
} from "#contracts/runtime/protected/limits";
import {
  ContentRuntimeFailureSchema,
  ContentRuntimeMissingSchema,
} from "#contracts/runtime/result";
import { SignedTryoutRuntimeBundleSchema } from "#contracts/tryout/runtime/spec";

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

/** One bounded protected read bound to a permanent signed runtime bundle. */
export const ProtectedContentRuntimeRequestSchema = Schema.Struct({
  bundleHash: Sha256HashSchema,
  selectors: ProtectedContentRuntimeSelectorsSchema,
  snapshotId: Sha256HashSchema,
});
export type ProtectedContentRuntimeRequest =
  typeof ProtectedContentRuntimeRequestSchema.Type;

/** One selected artifact inside a protected batch response. */
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

/** Protected frozen bodies selected from one retained try-out snapshot. */
export const ProtectedContentRuntimeFoundSchema = Schema.Struct({
  bundle: SignedTryoutRuntimeBundleSchema,
  items: ProtectedContentRuntimeItemsSchema,
  kind: Schema.Literal("found"),
  rendererManifest: RendererManifestEnvelopeSchema,
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

/** Complete response vocabulary for the protected batch runtime seam. */
export const ProtectedContentRuntimeResponseSchema = Schema.Union([
  ProtectedContentRuntimeFoundSchema,
  ContentRuntimeMissingSchema,
  ContentRuntimeFailureSchema,
]);
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
