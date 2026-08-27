import { Effect, Schema } from "effect";

import type { HistoricalCompiledContentPayload } from "#contracts/history/artifact-spec";
import { HistoricalPrimitive } from "#contracts/history/primitives";

interface RendererCapability {
  readonly supportedComponents: readonly RendererRequirement[];
}

interface RendererRequirement {
  readonly name: string;
  readonly version: number;
}

interface RendererCompatibilityDomain extends RendererCapability {
  readonly name: string;
}

interface RendererCompatibilityManifest {
  readonly base: RendererCapability;
  readonly domains: readonly RendererCompatibilityDomain[];
  readonly publishedDomains: readonly string[];
}

/** The retained or live renderer cannot route one old artifact domain. */
export class StoredRendererDomainUnpublishedError extends Schema.TaggedError<StoredRendererDomainUnpublishedError>()(
  "StoredRendererDomainUnpublishedError",
  {
    contentKey: HistoricalPrimitive.ContentKeySchema,
    rendererDomain: HistoricalPrimitive.RendererDomainSchema,
  }
) {}

/** A retained artifact component is absent from the selected renderer. */
export class StoredRendererComponentMissingError extends Schema.TaggedError<StoredRendererComponentMissingError>()(
  "StoredRendererComponentMissingError",
  {
    componentName: HistoricalPrimitive.RendererComponentNameSchema,
    contentKey: HistoricalPrimitive.ContentKeySchema,
  }
) {}

/** A renderer lacks the exact component version required by old bytes. */
export class StoredRendererVersionUnsupportedError extends Schema.TaggedError<StoredRendererVersionUnsupportedError>()(
  "StoredRendererVersionUnsupportedError",
  {
    componentName: HistoricalPrimitive.RendererComponentNameSchema,
    contentKey: HistoricalPrimitive.ContentKeySchema,
    requiredVersion: Schema.Finite.pipe(
      Schema.check(Schema.isInt()),
      Schema.check(Schema.isGreaterThan(0))
    ),
  }
) {}

/** Verifies one authenticated old payload against a hash-validated renderer. */
export const verifyHistoricalRendererCompatibility = Effect.fn(
  "AksaraContracts.verifyHistoricalRendererCompatibility"
)(function* (input: {
  readonly manifest: RendererCompatibilityManifest;
  readonly payload: HistoricalCompiledContentPayload;
}) {
  const { manifest, payload } = input;
  if (!manifest.publishedDomains.includes(payload.rendererDomain)) {
    return yield* new StoredRendererDomainUnpublishedError({
      contentKey: payload.contentKey,
      rendererDomain: payload.rendererDomain,
    });
  }
  const domain = manifest.domains.find(
    ({ name }) => name === payload.rendererDomain
  );
  if (domain === undefined) {
    return yield* new StoredRendererDomainUnpublishedError({
      contentKey: payload.contentKey,
      rendererDomain: payload.rendererDomain,
    });
  }
  const supported = [
    ...manifest.base.supportedComponents,
    ...domain.supportedComponents,
  ];
  for (const requirement of payload.requiredComponents) {
    const versions = supported.filter(({ name }) => name === requirement.name);
    if (versions.length === 0) {
      return yield* new StoredRendererComponentMissingError({
        componentName: requirement.name,
        contentKey: payload.contentKey,
      });
    }
    if (!versions.some(({ version }) => version === requirement.version)) {
      return yield* new StoredRendererVersionUnsupportedError({
        componentName: requirement.name,
        contentKey: payload.contentKey,
        requiredVersion: requirement.version,
      });
    }
  }
});
