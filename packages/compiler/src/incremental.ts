import { canonicalizeCompiledContentPayload } from "@nakafa/aksara-contracts/content";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import { ArtifactLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { RendererDomainSchema } from "@nakafa/aksara-contracts/renderer/domain";
import {
  Array as Arr,
  Effect,
  Exit,
  Predicate,
  Record as Rec,
  Schema,
} from "effect";
import {
  type CompileContentError,
  type CompiledContentResult,
  CompiledContentResultSchema,
  compileContent,
} from "#compiler/compile";
import { hashUtf8 } from "#compiler/hash";
import {
  type ContentSourceInspection,
  inspectContentSource,
} from "#compiler/inspect";
import type { AuthoredMetadataValue } from "#compiler/metadata";

const CACHE_FORMAT = "aksara-local-compile";

/** Encodes a value as JSON text with exactly the bytes JSON.stringify writes. */
const encodeJson = Schema.encodeSync(Schema.fromJsonString(Schema.Unknown));

/** Complete input identity that decides whether local compilation is reusable. */
const CompileIdentitySchema = Schema.Struct({
  artifactLocale: ArtifactLocaleSchema,
  compilerConfigHash: Sha256HashSchema,
  contentKey: ContentKeySchema,
  rendererDomain: RendererDomainSchema,
  sourceHash: Sha256HashSchema,
  sourcePath: CorpusSourcePathSchema,
});
type CompileIdentity = typeof CompileIdentitySchema.Type;

/** Strict unsigned cache contract for local authoring persistence only. */
const LocalCacheSchema = Schema.Struct({
  format: Schema.Literal(CACHE_FORMAT),
  identity: CompileIdentitySchema,
  identityHash: Sha256HashSchema,
  result: CompiledContentResultSchema,
  resultHash: Sha256HashSchema,
});
export type LocalCache = typeof LocalCacheSchema.Type;

/** Why an incremental invocation had to compile instead of reuse local output. */
const CompileReasonSchema = Schema.Literals(["changed", "corrupt", "missing"]);
export type CompileReason = typeof CompileReasonSchema.Type;

/** Explicit local authoring outcome; publication must still compile exact Git. */
const IncrementalResultSchema = Schema.Union([
  Schema.Struct({
    cache: LocalCacheSchema,
    kind: Schema.Literal("unchanged"),
    result: CompiledContentResultSchema,
  }),
  Schema.Struct({
    cache: LocalCacheSchema,
    kind: Schema.Literal("compiled"),
    reason: CompileReasonSchema,
    result: CompiledContentResultSchema,
  }),
]);
/** Kind of one local authoring outcome, derived from the result branches. */
export const IncrementalResultKindSchema = Schema.Union(
  IncrementalResultSchema.members.map((member) => member.fields.kind)
);
export type IncrementalResult = typeof IncrementalResultSchema.Type;

/** Serializes identity fields in one stable cross-machine order. */
function canonicalizeIdentity(identity: CompileIdentity) {
  return encodeJson([
    identity.contentKey,
    identity.artifactLocale,
    identity.sourcePath,
    identity.sourceHash,
    identity.compilerConfigHash,
    identity.rendererDomain,
  ]);
}

/** Serializes recursive metadata with stable object-key ordering. */
function canonicalizeMetadata(value: AuthoredMetadataValue): string {
  if (Arr.isArray<AuthoredMetadataValue>(value)) {
    return `[${value.map(canonicalizeMetadata).join(",")}]`;
  }
  if (!Predicate.isObject(value)) {
    return encodeJson(value);
  }
  const fields = Rec.toEntries(value)
    .map(([key, item]) => `${encodeJson(key)}:${canonicalizeMetadata(item)}`)
    .sort();
  return `{${fields.join(",")}}`;
}

/** Hashes every cached compiler result field, including static metadata. */
function hashResult(result: CompiledContentResult) {
  return hashUtf8(
    `${canonicalizeMetadata(result.metadata)}\n${canonicalizeCompiledContentPayload(result.payload)}`
  );
}

/** Derives cache identity from a fully inspected source. */
function makeIdentity(inspection: ContentSourceInspection) {
  return CompileIdentitySchema.make({
    artifactLocale: inspection.artifactLocale,
    compilerConfigHash: inspection.compilerConfigHash,
    contentKey: inspection.contentKey,
    rendererDomain: inspection.rendererDomain,
    sourceHash: inspection.sourceHash,
    sourcePath: inspection.sourcePath,
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
  return encodeJson([
    payload.contentKey,
    payload.artifactLocale,
    payload.rendererDomain,
    payload.sourceHash,
    payload.compilerConfigHash,
    hashUtf8(payload.rawMdx),
  ]);
}

/** Rejects malformed or internally inconsistent cache values as corruption. */
function isIntact(entry: LocalCache) {
  const { identity } = entry;
  const expectedPayloadIdentity = encodeJson([
    identity.contentKey,
    identity.artifactLocale,
    identity.rendererDomain,
    identity.sourceHash,
    identity.compilerConfigHash,
    identity.sourceHash,
  ]);
  return (
    encodeJson([
      entry.identityHash,
      entry.resultHash,
      payloadIdentity(entry),
    ]) ===
    encodeJson([
      hashUtf8(canonicalizeIdentity(identity)),
      hashResult(entry.result),
      expectedPayloadIdentity,
    ])
  );
}

/** Decodes unknown local state and classifies every non-hit for recompilation. */
function lookupCache(
  input: unknown,
  identity: CompileIdentity
):
  | { readonly entry: LocalCache; readonly kind: "hit" }
  | { readonly kind: "miss"; readonly reason: CompileReason } {
  if (input === undefined) {
    return { kind: "miss", reason: "missing" };
  }
  const decoded = Schema.decodeUnknownExit(LocalCacheSchema)(input, {
    onExcessProperty: "error",
  });
  if (Exit.isFailure(decoded) || !isIntact(decoded.value)) {
    return { kind: "miss", reason: "corrupt" };
  }
  if (decoded.value.identityHash !== hashUtf8(canonicalizeIdentity(identity))) {
    return { kind: "miss", reason: "changed" };
  }
  return { entry: decoded.value, kind: "hit" };
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
  inspectContentSource(request).pipe(
    Effect.flatMap((inspection) => {
      const identity = makeIdentity(inspection);
      const lookup = lookupCache(cache, identity);
      if (lookup.kind === "hit") {
        return Effect.succeed<IncrementalResult>({
          cache: lookup.entry,
          kind: "unchanged",
          result: lookup.entry.result,
        });
      }
      return compileContent(request).pipe(
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
