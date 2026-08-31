import { Effect, Schema } from "effect";
import {
  ArtifactRendererComponentMissingError,
  ArtifactRendererDomainUnpublishedError,
  ArtifactRendererVersionUnsupportedError,
  type ArtifactVerificationRequest,
  RendererContractVersionMismatchError,
} from "#contracts/artifact/spec";
import type { CompiledContentPayload } from "#contracts/content";
import {
  type RendererCapability,
  RendererComponentRequirementSchema,
} from "#contracts/renderer/component";
import {
  type RendererManifestEnvelope,
  selectRendererDomainCapability,
} from "#contracts/renderer/contract";
import { RendererDomainSchema } from "#contracts/renderer/domain";
import { validateRendererManifestHash } from "#contracts/renderer/manifest";

const RendererCapabilityScopeSchema = Schema.Union([
  Schema.Literal("base"),
  RendererDomainSchema,
]);

/** A live renderer no longer publishes one domain frozen by a signed release. */
export class RendererManifestDomainUnpublishedError extends Schema.TaggedError<RendererManifestDomainUnpublishedError>()(
  "RendererManifestDomainUnpublishedError",
  { rendererDomain: RendererDomainSchema }
) {}

/** A live renderer no longer supports one exact frozen component version. */
export class RendererManifestComponentUnsupportedError extends Schema.TaggedError<RendererManifestComponentUnsupportedError>()(
  "RendererManifestComponentUnsupportedError",
  {
    componentName: RendererComponentRequirementSchema.fields.name,
    componentVersion: RendererComponentRequirementSchema.fields.version,
    rendererScope: RendererCapabilityScopeSchema,
  }
) {}

/** Requires every frozen runtime component pair from one physical registry. */
const verifyCapabilitySuperset = Effect.fn(
  "AksaraContracts.verifyRendererCapabilitySuperset"
)(function* (
  frozen: RendererCapability,
  live: RendererCapability,
  rendererScope: typeof RendererCapabilityScopeSchema.Type
) {
  const supported = new Set(
    live.supportedComponents.map(({ name, version }) => `${name}:${version}`)
  );
  for (const requirement of frozen.supportedComponents) {
    if (supported.has(`${requirement.name}:${requirement.version}`)) {
      continue;
    }
    return yield* new RendererManifestComponentUnsupportedError({
      componentName: requirement.name,
      componentVersion: requirement.version,
      rendererScope,
    });
  }
});

/** Proves a current live renderer can execute every frozen release capability. */
export const verifyRendererManifestCompatibility = Effect.fn(
  "AksaraContracts.verifyRendererManifestCompatibility"
)(function* (input: {
  readonly frozen: RendererManifestEnvelope;
  readonly live: RendererManifestEnvelope;
}) {
  if (input.frozen.hash === input.live.hash) {
    return input.live;
  }
  yield* verifyCapabilitySuperset(input.frozen.base, input.live.base, "base");
  for (const rendererDomain of input.frozen.publishedDomains) {
    if (!input.live.publishedDomains.includes(rendererDomain)) {
      return yield* new RendererManifestDomainUnpublishedError({
        rendererDomain,
      });
    }
    const frozen = yield* selectRendererDomainCapability(
      input.frozen,
      rendererDomain
    );
    const live = yield* selectRendererDomainCapability(
      input.live,
      rendererDomain
    );
    yield* verifyCapabilitySuperset(frozen, live, rendererDomain);
  }
  return input.live;
});

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
