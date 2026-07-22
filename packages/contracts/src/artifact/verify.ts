import { Effect, Schema } from "effect";
import { verifySignedContentArtifactIntegrity } from "#contracts/artifact/integrity";
import {
  ArtifactRendererComponentMissingError,
  ArtifactRendererVersionUnsupportedError,
  ArtifactVerificationDecodeError,
  type ArtifactVerificationRequest,
  ArtifactVerificationRequestSchema,
  RendererContractVersionMismatchError,
} from "#contracts/artifact/spec";
import type { CompiledContentPayload } from "#contracts/content";
import {
  type RendererManifestEnvelope,
  selectRendererDomainCapability,
} from "#contracts/renderer/contract";
import { validateRendererManifestHash } from "#contracts/renderer/manifest";

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

/** Authenticates one artifact and its exact renderer compatibility contract. */
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
        const artifact = yield* verifySignedContentArtifactIntegrity(
          request.artifact
        );
        const manifest = yield* validateRendererManifestHash(
          request.rendererManifest
        );
        yield* validateRendererContract(request, manifest);
        return artifact;
      })
    )
  )
);
