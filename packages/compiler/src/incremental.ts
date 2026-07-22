import {
  type CompileDocumentRequest,
  CompiledContentPayloadSchema,
  ContentLocaleSchema,
  canonicalizeCompiledContentPayload,
} from "@nakafaai/aksara-contracts/content";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  Sha256HashSchema,
} from "@nakafaai/aksara-contracts/ids";
import { RendererDomainSchema } from "@nakafaai/aksara-contracts/renderer/domain";
import { Effect, Either, Schema } from "effect";
import type {
  CompileContentError,
  CompiledContentResult,
} from "#compiler/compile";
import { createCompilerConfigHash } from "#compiler/config";
import {
  compileValidatedContent,
  validateCompileRequest,
} from "#compiler/engine";
import { hashUtf8 } from "#compiler/hash";
import type {
  AuthoredMetadata,
  AuthoredMetadataValue,
} from "#compiler/metadata";

const CACHE_FORMAT = "aksara-local-compile-v1";

const MetadataValueSchema: Schema.Schema<AuthoredMetadataValue> =
  Schema.suspend(() =>
    Schema.Union(
      Schema.Boolean,
      Schema.Null,
      Schema.JsonNumber,
      Schema.String,
      Schema.Array(MetadataValueSchema),
      Schema.Record({ key: Schema.String, value: MetadataValueSchema })
    )
  );

const MetadataSchema: Schema.Schema<AuthoredMetadata> = Schema.Record({
  key: Schema.String,
  value: MetadataValueSchema,
});

/** Complete input identity that decides whether local compilation is reusable. */
const CompileIdentitySchema = Schema.Struct({
  compilerConfigHash: Sha256HashSchema,
  contentKey: ContentKeySchema,
  locale: ContentLocaleSchema,
  rendererDomain: RendererDomainSchema,
  sourceHash: Sha256HashSchema,
  sourcePath: CorpusSourcePathSchema,
});
type CompileIdentity = typeof CompileIdentitySchema.Type;

const CompileResultSchema = Schema.Struct({
  metadata: MetadataSchema,
  payload: CompiledContentPayloadSchema,
});

/** Strict unsigned cache contract for local authoring persistence only. */
const LocalCacheSchema = Schema.Struct({
  format: Schema.Literal(CACHE_FORMAT),
  identity: CompileIdentitySchema,
  identityHash: Sha256HashSchema,
  result: CompileResultSchema,
  resultHash: Sha256HashSchema,
});
export type LocalCache = typeof LocalCacheSchema.Type;

/** Why an incremental invocation had to compile instead of reuse local output. */
export type CompileReason = "changed" | "corrupt" | "missing";

/** Explicit local authoring outcome; publication must still compile exact Git. */
export type IncrementalResult =
  | {
      readonly cache: LocalCache;
      readonly kind: "unchanged";
      readonly result: CompiledContentResult;
    }
  | {
      readonly cache: LocalCache;
      readonly kind: "compiled";
      readonly reason: CompileReason;
      readonly result: CompiledContentResult;
    };

type CacheLookup =
  | { readonly entry: LocalCache; readonly kind: "hit" }
  | { readonly kind: "miss"; readonly reason: CompileReason };

/** Serializes identity fields in one stable cross-machine order. */
function canonicalizeIdentity(identity: CompileIdentity) {
  return JSON.stringify([
    identity.contentKey,
    identity.locale,
    identity.sourcePath,
    identity.sourceHash,
    identity.compilerConfigHash,
    identity.rendererDomain,
  ]);
}

/** Serializes recursive metadata with stable object-key ordering. */
function canonicalizeMetadata(value: AuthoredMetadataValue): string {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map(canonicalizeMetadata).join(",")}]`;
  }
  const fields = Object.entries(value)
    .map(
      ([key, item]) => `${JSON.stringify(key)}:${canonicalizeMetadata(item)}`
    )
    .sort();
  return `{${fields.join(",")}}`;
}

/** Hashes every cached compiler result field, including static metadata. */
function hashResult(result: CompiledContentResult) {
  return hashUtf8(
    `${canonicalizeMetadata(result.metadata)}\n${canonicalizeCompiledContentPayload(result.payload)}`
  );
}

/** Derives cache identity only from validated source and compiler inputs. */
function makeIdentity(request: CompileDocumentRequest) {
  return CompileIdentitySchema.make({
    compilerConfigHash: createCompilerConfigHash(
      request.rendererManifest,
      request.rendererDomain
    ),
    contentKey: request.contentKey,
    locale: request.locale,
    rendererDomain: request.rendererDomain,
    sourceHash: hashUtf8(request.rawMdx),
    sourcePath: request.sourcePath,
  });
}

/** Creates one unsigned local-only cache value from fresh compiler output. */
function makeCache(
  identity: CompileIdentity,
  result: CompiledContentResult
): LocalCache {
  return LocalCacheSchema.make({
    format: CACHE_FORMAT,
    identity,
    identityHash: hashUtf8(canonicalizeIdentity(identity)),
    result,
    resultHash: hashResult(result),
  });
}

/** Checks that cached payload fields agree with their complete source identity. */
function payloadIdentity(entry: LocalCache) {
  const { payload } = entry.result;
  return JSON.stringify([
    payload.contentKey,
    payload.locale,
    payload.rendererDomain,
    payload.sourceHash,
    payload.compilerConfigHash,
    hashUtf8(payload.rawMdx),
  ]);
}

/** Rejects malformed or internally inconsistent cache values as corruption. */
function isIntact(entry: LocalCache) {
  const { identity } = entry;
  const expectedPayloadIdentity = JSON.stringify([
    identity.contentKey,
    identity.locale,
    identity.rendererDomain,
    identity.sourceHash,
    identity.compilerConfigHash,
    identity.sourceHash,
  ]);
  return (
    JSON.stringify([
      entry.identityHash,
      entry.resultHash,
      payloadIdentity(entry),
    ]) ===
    JSON.stringify([
      hashUtf8(canonicalizeIdentity(identity)),
      hashResult(entry.result),
      expectedPayloadIdentity,
    ])
  );
}

/** Decodes unknown local state and classifies every non-hit for recompilation. */
function lookupCache(input: unknown, identity: CompileIdentity): CacheLookup {
  if (input === undefined) {
    return { kind: "miss", reason: "missing" };
  }
  const decoded = Schema.decodeUnknownEither(LocalCacheSchema)(input, {
    onExcessProperty: "error",
  });
  if (Either.isLeft(decoded) || !isIntact(decoded.right)) {
    return { kind: "miss", reason: "corrupt" };
  }
  if (decoded.right.identityHash !== hashUtf8(canonicalizeIdentity(identity))) {
    return { kind: "miss", reason: "changed" };
  }
  return { entry: decoded.right, kind: "hit" };
}

/**
 * Reuses exact local authoring output or recompiles after any miss.
 * Returned cache values are unsigned and must never enter publication signing.
 */
export const compileIncremental: (
  request: unknown,
  cache?: unknown
) => Effect.Effect<IncrementalResult, CompileContentError> = Effect.fn(
  "AksaraCompiler.compileIncremental"
)((request: unknown, cache?: unknown) =>
  validateCompileRequest(request).pipe(
    Effect.flatMap((decoded) => {
      const identity = makeIdentity(decoded);
      const lookup = lookupCache(cache, identity);
      if (lookup.kind === "hit") {
        return Effect.succeed<IncrementalResult>({
          cache: lookup.entry,
          kind: "unchanged",
          result: lookup.entry.result,
        });
      }
      return compileValidatedContent(decoded).pipe(
        Effect.map(
          (result): IncrementalResult => ({
            cache: makeCache(identity, result),
            kind: "compiled",
            reason: lookup.reason,
            result,
          })
        )
      );
    })
  )
);
