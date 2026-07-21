import { Buffer } from "node:buffer";
import { createHash } from "node:crypto";
import { Effect, Schema } from "effect";
import {
  ArtifactCompiledByteLengthMismatchError,
  ArtifactHashComputationError,
  ArtifactHashMismatchError,
  ArtifactPayloadFieldByteLimitError,
  ArtifactRendererComponentMissingError,
  ArtifactRendererVersionUnsupportedError,
  ArtifactSourceHashComputationError,
  ArtifactSourceHashMismatchError,
  ArtifactVerificationByteLimitError,
  ArtifactVerificationDecodeError,
  type ArtifactVerificationRequest,
  ArtifactVerificationRequestSchema,
  RendererContractVersionMismatchError,
} from "#contracts/artifact/spec.js";
import {
  type CompiledContentPayload,
  canonicalizeCompiledContentPayload,
  canonicalizeContentArtifactSigningInput,
  canonicalizeSignedContentArtifact,
  type SignedContentArtifact,
} from "#contracts/content.js";
import type { ContentKey, Sha256Hash } from "#contracts/ids.js";
import { Sha256HashSchema } from "#contracts/ids.js";
import {
  MAX_CANONICAL_PAYLOAD_BYTES,
  MAX_COMPILED_CODE_BYTES,
  MAX_PLAIN_TEXT_BYTES,
  MAX_RAW_MDX_BYTES,
  MAX_SIGNED_ARTIFACT_BYTES,
} from "#contracts/limits.js";
import type {
  RendererComponentRequirement,
  RendererManifestEnvelope,
} from "#contracts/renderer/contract.js";
import { validateRendererManifestHash } from "#contracts/renderer/manifest.js";
import { verifyEd25519Signature } from "#contracts/signature/verify.js";

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

function validatePayloadByteIntegrity(payload: CompiledContentPayload) {
  return Effect.gen(function* () {
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
}

/** Computes the immutable identity of one canonical compiled payload. */
export function hashCompiledContentPayload(payload: CompiledContentPayload) {
  return Sha256HashSchema.make(
    `sha256:${createHash("sha256")
      .update(canonicalizeCompiledContentPayload(payload))
      .digest("hex")}`
  );
}

function hashPayload(payload: CompiledContentPayload) {
  return Effect.try({
    catch: () =>
      new ArtifactHashComputationError({ contentKey: payload.contentKey }),
    try: () => hashCompiledContentPayload(payload),
  });
}

function hashAuthoredSource(payload: CompiledContentPayload) {
  return Effect.try({
    catch: () =>
      new ArtifactSourceHashComputationError({
        contentKey: payload.contentKey,
      }),
    try: () =>
      Sha256HashSchema.make(
        `sha256:${createHash("sha256").update(payload.rawMdx).digest("hex")}`
      ),
  });
}

/** Verifies that `sourceHash` identifies the complete authenticated raw MDX. */
export const verifyCompiledContentSourceHash = Effect.fn(
  "AksaraContracts.verifyCompiledContentSourceHash"
)((payload: CompiledContentPayload) =>
  hashAuthoredSource(payload).pipe(
    Effect.flatMap((actualHash) => {
      if (actualHash === payload.sourceHash) {
        return Effect.void;
      }
      return Effect.fail(
        new ArtifactSourceHashMismatchError({
          actualHash,
          contentKey: payload.contentKey,
          expectedHash: payload.sourceHash,
        })
      );
    })
  )
);

function validateArtifactHash(
  artifact: SignedContentArtifact,
  actualHash: Sha256Hash
) {
  if (artifact.artifactHash === actualHash) {
    return Effect.void;
  }
  return Effect.fail(
    new ArtifactHashMismatchError({
      actualHash,
      contentKey: artifact.payload.contentKey,
      expectedHash: artifact.artifactHash,
    })
  );
}

function validateRendererRequirements(
  contentKey: ContentKey,
  required: readonly RendererComponentRequirement[],
  manifest: RendererManifestEnvelope
) {
  return Effect.gen(function* () {
    for (const requirement of required) {
      const versions = manifest.supportedComponents.filter(
        ({ name }) => name === requirement.name
      );
      if (versions.length === 0) {
        return yield* new ArtifactRendererComponentMissingError({
          componentName: requirement.name,
          contentKey,
        });
      }
      if (!versions.some(({ version }) => version === requirement.version)) {
        return yield* new ArtifactRendererVersionUnsupportedError({
          componentName: requirement.name,
          contentKey,
          requiredVersion: requirement.version,
        });
      }
    }
  });
}

function validateRendererContract(
  request: ArtifactVerificationRequest,
  manifest: RendererManifestEnvelope
) {
  if (request.rendererContractVersion !== manifest.rendererContractVersion) {
    return Effect.fail(
      new RendererContractVersionMismatchError({
        actualVersion: request.rendererContractVersion,
        expectedVersion: manifest.rendererContractVersion,
      })
    );
  }
  return validateRendererRequirements(
    request.artifact.payload.contentKey,
    request.artifact.payload.requiredComponents,
    manifest
  );
}

/** Strictly decodes and authenticates one trusted server-side MDX artifact. */
export const verifySignedContentArtifact = Effect.fn(
  "AksaraContracts.verifySignedContentArtifact"
)((input: unknown) =>
  Schema.decodeUnknown(ArtifactVerificationRequestSchema)(input, {
    onExcessProperty: "error",
  }).pipe(
    Effect.mapError(
      () =>
        new ArtifactVerificationDecodeError({
          message:
            "Artifact verification input does not satisfy its exact wire contract.",
        })
    ),
    Effect.flatMap((request) =>
      Effect.gen(function* () {
        yield* enforceSignedWireLimit(request.artifact);
        const actualHash = yield* hashPayload(request.artifact.payload);
        yield* validateArtifactHash(request.artifact, actualHash);
        yield* verifyEd25519Signature({
          keyId: request.artifact.keyId,
          message: canonicalizeContentArtifactSigningInput(
            request.artifact.artifactHash,
            request.artifact.payload
          ),
          signature: request.artifact.signature,
          subject: "artifact",
        });
        yield* validatePayloadByteIntegrity(request.artifact.payload);
        yield* verifyCompiledContentSourceHash(request.artifact.payload);
        const manifest = yield* validateRendererManifestHash(
          request.rendererManifest
        );
        yield* validateRendererContract(request, manifest);
        return request.artifact;
      })
    )
  )
);
