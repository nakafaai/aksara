import { Effect, Schema } from "effect";
import {
  ArtifactRendererComponentMissingError,
  ArtifactRendererDomainUnpublishedError,
} from "#contracts/artifact/spec";
import type { CompiledContentPayload } from "#contracts/content";
import {
  RendererComponentNameSchema,
  type RendererComponents,
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

/** A live renderer no longer supports one required frozen renderer name. */
export class RendererManifestComponentUnsupportedError extends Schema.TaggedError<RendererManifestComponentUnsupportedError>()(
  "RendererManifestComponentUnsupportedError",
  {
    componentName: RendererComponentNameSchema,
    rendererScope: RendererCapabilityScopeSchema,
  }
) {}

/** Requires every frozen renderer name from one physical registry. */
const verifyCapabilitySuperset = Effect.fn(
  "AksaraContracts.verifyRendererCapabilitySuperset"
)(function* (
  frozen: RendererComponents,
  live: RendererComponents,
  rendererScope: typeof RendererCapabilityScopeSchema.Type
) {
  const supported = new Set(live);
  for (const componentName of frozen) {
    if (supported.has(componentName)) {
      continue;
    }
    return yield* new RendererManifestComponentUnsupportedError({
      componentName,
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
    yield* verifyCapabilitySuperset(
      frozen.components,
      live.components,
      rendererDomain
    );
  }
  return input.live;
});

/** Verifies that a deployed live renderer can route and execute one artifact. */
export const verifyContentRendererCompatibility = Effect.fn(
  "AksaraContracts.verifyContentRendererCompatibility"
)(function* ({
  payload,
  rendererManifest,
}: {
  readonly payload: Pick<
    CompiledContentPayload,
    "contentKey" | "rendererDomain" | "requiredComponents"
  >;
  readonly rendererManifest: unknown;
}) {
  const manifest = yield* validateRendererManifestHash(rendererManifest);
  if (!manifest.publishedDomains.includes(payload.rendererDomain)) {
    return yield* new ArtifactRendererDomainUnpublishedError({
      contentKey: payload.contentKey,
      rendererDomain: payload.rendererDomain,
    });
  }
  const domain = yield* selectRendererDomainCapability(
    manifest,
    payload.rendererDomain
  );
  const available = new Set([...manifest.base, ...domain.components]);
  for (const componentName of payload.requiredComponents) {
    if (!available.has(componentName)) {
      return yield* new ArtifactRendererComponentMissingError({
        componentName,
        contentKey: payload.contentKey,
      });
    }
  }
  return manifest;
});
