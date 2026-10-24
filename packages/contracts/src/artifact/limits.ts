import { Effect } from "effect";
import {
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
  MAX_CONTENT_TREE_BYTES,
  MAX_PLAIN_TEXT_BYTES,
  MAX_RAW_MDX_BYTES,
  MAX_SIGNED_ARTIFACT_BYTES,
} from "#contracts/limits";
import { canonicalizeContentTree } from "#contracts/tree";

/** Rejects a complete signed artifact envelope above its wire ceiling. */
function enforceSignedWireLimit(artifact: SignedContentArtifact) {
  const actualBytes = new TextEncoder().encode(
    canonicalizeSignedContentArtifact(artifact)
  ).byteLength;
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
  field: ArtifactPayloadFieldByteLimitError["field"],
  value: string,
  maxBytes: number
) {
  const actualBytes = new TextEncoder().encode(value).byteLength;
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

/** Verifies the complete wire and every bounded payload field. */
export const validateArtifactByteIntegrity = Effect.fn(
  "AksaraContracts.validateArtifactByteIntegrity"
)(function* (artifact: SignedContentArtifact) {
  yield* enforceSignedWireLimit(artifact);
  const { payload } = artifact;
  yield* enforcePayloadFieldLimit(
    payload,
    "rawMdx",
    payload.rawMdx,
    MAX_RAW_MDX_BYTES
  );
  yield* enforcePayloadFieldLimit(
    payload,
    "contentTree",
    canonicalizeContentTree(payload.contentTree),
    MAX_CONTENT_TREE_BYTES
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
