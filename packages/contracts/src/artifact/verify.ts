import { createHash } from "node:crypto";
import { Effect, Schema } from "effect";
import { validateArtifactByteIntegrity } from "#contracts/artifact/limits";
import { verifyCompiledContentSourceHash } from "#contracts/artifact/source";
import {
  ArtifactHashComputationError,
  ArtifactHashMismatchError,
  ArtifactRendererComponentMissingError,
  ArtifactRendererVersionUnsupportedError,
  ArtifactVerificationDecodeError,
  type ArtifactVerificationRequest,
  ArtifactVerificationRequestSchema,
  RendererContractVersionMismatchError,
} from "#contracts/artifact/spec";
import {
  type CompiledContentPayload,
  canonicalizeCompiledContentPayload,
  canonicalizeContentArtifactSigningInput,
  type SignedContentArtifact,
} from "#contracts/content";
import type { Sha256Hash } from "#contracts/ids";
import { Sha256HashSchema } from "#contracts/ids";
import {
  type RendererManifestEnvelope,
  selectRendererDomainCapability,
} from "#contracts/renderer/contract";
import { validateRendererManifestHash } from "#contracts/renderer/manifest";
import { verifyEd25519Signature } from "#contracts/signature/verify";

/** Computes the immutable identity of one canonical compiled payload. */
export function hashCompiledContentPayload(payload: CompiledContentPayload) {
  return Sha256HashSchema.make(
    `sha256:${createHash("sha256")
      .update(canonicalizeCompiledContentPayload(payload))
      .digest("hex")}`
  );
}

/** Computes an artifact hash while preserving typed computation failures. */
function hashPayload(payload: CompiledContentPayload) {
  return Effect.try({
    catch: () =>
      new ArtifactHashComputationError({ contentKey: payload.contentKey }),
    try: () => hashCompiledContentPayload(payload),
  });
}

/** Confirms that an artifact envelope identifies its canonical payload. */
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

/** Confirms that base plus the selected domain implement every requirement. */
function validateRendererRequirements(
  payload: CompiledContentPayload,
  manifest: RendererManifestEnvelope
) {
  const domain = selectRendererDomainCapability(
    manifest,
    payload.rendererDomain
  );
  const supportedComponents = [
    ...manifest.base.supportedComponents,
    ...domain.supportedComponents,
  ];
  return Effect.gen(function* () {
    for (const requirement of payload.requiredComponents) {
      const versions = supportedComponents.filter(
        ({ name }) => name === requirement.name
      );
      if (versions.length === 0) {
        return yield* new ArtifactRendererComponentMissingError({
          componentName: requirement.name,
          contentKey: payload.contentKey,
        });
      }
      if (!versions.some(({ version }) => version === requirement.version)) {
        return yield* new ArtifactRendererVersionUnsupportedError({
          componentName: requirement.name,
          contentKey: payload.contentKey,
          requiredVersion: requirement.version,
        });
      }
    }
  });
}

/** Confirms that an artifact targets the active renderer contract. */
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
  return validateRendererRequirements(request.artifact.payload, manifest);
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
        yield* validateArtifactByteIntegrity(request.artifact);
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
