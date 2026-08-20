import { Effect } from "effect";
import {
  ArtifactRendererComponentMissingError,
  ArtifactRendererDomainUnpublishedError,
  ArtifactRendererVersionUnsupportedError,
  type ArtifactVerificationRequest,
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
  return Effect.gen(function* () {
    const domain = yield* selectRendererDomainCapability(
      manifest,
      payload.rendererDomain
    );
    const supportedComponents = [
      ...manifest.base.supportedComponents,
      ...domain.supportedComponents,
    ];
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

/** Verifies that a deployed live renderer can route and execute one artifact. */
export const verifyContentRendererCompatibility = Effect.fn(
  "AksaraContracts.verifyContentRendererCompatibility"
)(function* ({
  payload,
  rendererContractVersion,
  rendererManifest,
}: {
  readonly payload: CompiledContentPayload;
  readonly rendererContractVersion: ArtifactVerificationRequest["rendererContractVersion"];
  readonly rendererManifest: unknown;
}) {
  const manifest = yield* validateRendererManifestHash(rendererManifest);
  if (!manifest.publishedDomains.includes(payload.rendererDomain)) {
    return yield* new ArtifactRendererDomainUnpublishedError({
      contentKey: payload.contentKey,
      rendererDomain: payload.rendererDomain,
    });
  }
  if (rendererContractVersion !== manifest.rendererContractVersion) {
    return yield* new RendererContractVersionMismatchError({
      actualVersion: rendererContractVersion,
      expectedVersion: manifest.rendererContractVersion,
    });
  }
  yield* validateRendererRequirements(payload, manifest);
  return manifest;
});
