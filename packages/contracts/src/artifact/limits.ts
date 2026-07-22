import { Buffer } from "node:buffer";
import { Effect } from "effect";
import {
  ArtifactCompiledByteLengthMismatchError,
  ArtifactPayloadFieldByteLimitError,
  ArtifactVerificationByteLimitError,
} from "#contracts/artifact/spec";
import {
  type CompiledContentPayload,
  canonicalizeCompiledContentPayload,
  canonicalizeSignedContentArtifact,
  type SignedContentArtifact,
} from "#contracts/content";
import {
  MAX_CANONICAL_PAYLOAD_BYTES,
  MAX_COMPILED_CODE_BYTES,
  MAX_PLAIN_TEXT_BYTES,
  MAX_RAW_MDX_BYTES,
  MAX_SIGNED_ARTIFACT_BYTES,
} from "#contracts/limits";

/** Rejects a complete signed artifact envelope above its wire ceiling. */
function enforceSignedWireLimit(artifact: SignedContentArtifact) {
  const actualBytes = Buffer.byteLength(
    canonicalizeSignedContentArtifact(artifact),
    "utf8"
  );
  if (actualBytes <= MAX_SIGNED_ARTIFACT_BYTES) {
    return Effect.void;
  }
  return Effect.fail(
    new ArtifactVerificationByteLimitError({
      actualBytes,
      maxBytes: MAX_SIGNED_ARTIFACT_BYTES,
    })
  );
}

/** Rejects one authenticated payload field above its shared ceiling. */
function enforcePayloadFieldLimit(
  payload: CompiledContentPayload,
  field: "rawMdx" | "compiledCode" | "plainText" | "canonicalPayload",
  value: string,
  maxBytes: number
) {
  const actualBytes = Buffer.byteLength(value, "utf8");
  if (actualBytes <= maxBytes) {
    return Effect.void;
  }
  return Effect.fail(
    new ArtifactPayloadFieldByteLimitError({
      actualBytes,
      contentKey: payload.contentKey,
      field,
      maxBytes,
    })
  );
}

/** Verifies complete wire, declared bytes, and every bounded payload field. */
export const validateArtifactByteIntegrity = Effect.fn(
  "AksaraContracts.validateArtifactByteIntegrity"
)(function* (artifact: SignedContentArtifact) {
  yield* enforceSignedWireLimit(artifact);
  const { payload } = artifact;
  const compiledBytes = Buffer.byteLength(payload.compiledCode, "utf8");
  if (payload.byteLength !== compiledBytes) {
    return yield* new ArtifactCompiledByteLengthMismatchError({
      actualBytes: compiledBytes,
      contentKey: payload.contentKey,
      declaredBytes: payload.byteLength,
    });
  }
  yield* enforcePayloadFieldLimit(
    payload,
    "rawMdx",
    payload.rawMdx,
    MAX_RAW_MDX_BYTES
  );
  yield* enforcePayloadFieldLimit(
    payload,
    "compiledCode",
    payload.compiledCode,
    MAX_COMPILED_CODE_BYTES
  );
  yield* enforcePayloadFieldLimit(
    payload,
    "plainText",
    payload.plainText,
    MAX_PLAIN_TEXT_BYTES
  );
  yield* enforcePayloadFieldLimit(
    payload,
    "canonicalPayload",
    canonicalizeCompiledContentPayload(payload),
    MAX_CANONICAL_PAYLOAD_BYTES
  );
});
