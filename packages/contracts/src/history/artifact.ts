import { Effect, Schema } from "effect";

import { hashText } from "#contracts/hash/text";
import {
  HISTORICAL_ARTIFACT_LIMITS,
  type HistoricalCompiledContentPayload,
  type HistoricalSignedContentArtifact,
  HistoricalSignedContentArtifactSchema,
  StoredArtifactCompiledByteLengthMismatchError,
  StoredArtifactDecodeError,
  StoredArtifactFieldByteLimitError,
  StoredArtifactHashComputeError,
  StoredArtifactHashMismatchError,
  StoredArtifactSourceHashComputeError,
  StoredArtifactSourceHashMismatchError,
  StoredArtifactWireByteLimitError,
} from "#contracts/history/artifact-spec";
import type { HistoricalSha256HashSchema } from "#contracts/history/primitives";
import { verifyEd25519Signature } from "#contracts/signature/verify";

/** Reconstructs exact canonical payload bytes from the old wire. */
export function canonicalizeHistoricalContentPayload(
  payload: HistoricalCompiledContentPayload
) {
  return JSON.stringify({
    byteLength: payload.byteLength,
    compiledCode: payload.compiledCode,
    compilerConfigHash: payload.compilerConfigHash,
    compilerVersion: payload.compilerVersion,
    contentKey: payload.contentKey,
    format: payload.format,
    locale: payload.locale,
    mdxCompilerVersion: payload.mdxCompilerVersion,
    plainText: payload.plainText,
    rawMdx: payload.rawMdx,
    rendererDomain: payload.rendererDomain,
    requiredComponents: payload.requiredComponents.map(({ name, version }) => ({
      name,
      version,
    })),
    sourceHash: payload.sourceHash,
  });
}

/** Reconstructs the old domain-separated artifact signature input. */
export function historicalArtifactSigningInput(
  artifactHash: typeof HistoricalSha256HashSchema.Type,
  payload: HistoricalCompiledContentPayload
) {
  return `nakafa.aksara.content-artifact.v1\n${artifactHash}\n${canonicalizeHistoricalContentPayload(payload)}`;
}

/** Reconstructs one complete old signed artifact for its wire limit. */
function canonicalizeHistoricalArtifact(
  artifact: HistoricalSignedContentArtifact
) {
  return `{"artifactHash":${JSON.stringify(artifact.artifactHash)},"keyId":${JSON.stringify(artifact.keyId)},"payload":${canonicalizeHistoricalContentPayload(artifact.payload)},"signature":${JSON.stringify(artifact.signature)}}`;
}

/** Measures UTF-8 text without depending on Node Buffer. */
function utf8Bytes(value: string) {
  return new TextEncoder().encode(value).byteLength;
}

/** Rejects one retained payload field above its established ceiling. */
function enforceFieldLimit(
  payload: HistoricalCompiledContentPayload,
  field: "rawMdx" | "compiledCode" | "plainText" | "canonicalPayload",
  value: string,
  maxBytes: number
) {
  const actualBytes = utf8Bytes(value);
  return actualBytes <= maxBytes
    ? Effect.void
    : Effect.fail(
        new StoredArtifactFieldByteLimitError({
          actualBytes,
          contentKey: payload.contentKey,
          field,
          maxBytes,
        })
      );
}

/** Verifies every retained artifact byte ceiling and declared code length. */
function verifyHistoricalArtifactBytes(
  artifact: HistoricalSignedContentArtifact
) {
  return Effect.gen(function* () {
    const wireBytes = utf8Bytes(canonicalizeHistoricalArtifact(artifact));
    if (wireBytes > HISTORICAL_ARTIFACT_LIMITS.signedArtifact) {
      return yield* new StoredArtifactWireByteLimitError({
        actualBytes: wireBytes,
        maxBytes: HISTORICAL_ARTIFACT_LIMITS.signedArtifact,
      });
    }
    const { payload } = artifact;
    const compiledBytes = utf8Bytes(payload.compiledCode);
    if (compiledBytes !== payload.byteLength) {
      return yield* new StoredArtifactCompiledByteLengthMismatchError({
        actualBytes: compiledBytes,
        contentKey: payload.contentKey,
        declaredBytes: payload.byteLength,
      });
    }
    yield* enforceFieldLimit(
      payload,
      "rawMdx",
      payload.rawMdx,
      HISTORICAL_ARTIFACT_LIMITS.rawMdx
    );
    yield* enforceFieldLimit(
      payload,
      "compiledCode",
      payload.compiledCode,
      HISTORICAL_ARTIFACT_LIMITS.compiledCode
    );
    yield* enforceFieldLimit(
      payload,
      "plainText",
      payload.plainText,
      HISTORICAL_ARTIFACT_LIMITS.plainText
    );
    yield* enforceFieldLimit(
      payload,
      "canonicalPayload",
      canonicalizeHistoricalContentPayload(payload),
      HISTORICAL_ARTIFACT_LIMITS.canonicalPayload
    );
  });
}

/** Authenticates one exact historical artifact without a current wire union. */
export const authenticateHistoricalArtifact = Effect.fn(
  "AksaraContracts.authenticateHistoricalArtifact"
)(function* (input: unknown) {
  const artifact = yield* Schema.decodeUnknownEffect(
    HistoricalSignedContentArtifactSchema
  )(input, { onExcessProperty: "error" }).pipe(
    Effect.mapError(() => new StoredArtifactDecodeError())
  );
  const actualHash = yield* hashText(
    canonicalizeHistoricalContentPayload(artifact.payload)
  ).pipe(
    Effect.mapError(
      () =>
        new StoredArtifactHashComputeError({
          contentKey: artifact.payload.contentKey,
        })
    )
  );
  if (actualHash !== artifact.artifactHash) {
    return yield* new StoredArtifactHashMismatchError({
      actualHash,
      contentKey: artifact.payload.contentKey,
      expectedHash: artifact.artifactHash,
    });
  }
  yield* verifyEd25519Signature({
    keyId: artifact.keyId,
    message: historicalArtifactSigningInput(
      artifact.artifactHash,
      artifact.payload
    ),
    signature: artifact.signature,
    subject: "artifact",
  });
  yield* verifyHistoricalArtifactBytes(artifact);
  const sourceHash = yield* hashText(artifact.payload.rawMdx).pipe(
    Effect.mapError(
      () =>
        new StoredArtifactSourceHashComputeError({
          contentKey: artifact.payload.contentKey,
        })
    )
  );
  if (sourceHash !== artifact.payload.sourceHash) {
    return yield* new StoredArtifactSourceHashMismatchError({
      actualHash: sourceHash,
      contentKey: artifact.payload.contentKey,
      expectedHash: artifact.payload.sourceHash,
    });
  }
  return artifact;
});
