import { Schema } from "effect";
import { Sha256HashSchema } from "#contracts/ids";
import {
  hasCompleteRendererSelection,
  type RendererCapability,
  RendererCapabilityFields,
  RendererCapabilitySchema,
} from "#contracts/renderer/component";
import {
  RENDERER_DOMAINS,
  type RendererDomain,
  RendererDomainSchema,
} from "#contracts/renderer/domain";

const RENDERER_CONTRACT_VERSION_PATTERN =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;

/** Domain-scoped renderer wire version shared with Nakafa. */
export const RENDERER_CONTRACT_VERSION = "2.0.0";

/** Stable wire format for a domain-scoped Nakafa renderer manifest. */
export const RENDERER_MANIFEST_FORMAT = "nakafa-mdx-renderer-v2";

/** Canonical semantic version carried by a renderer runtime boundary. */
export const RendererContractVersionSchema = Schema.String.pipe(
  Schema.pattern(RENDERER_CONTRACT_VERSION_PATTERN)
);
export type RendererContractVersion = typeof RendererContractVersionSchema.Type;

/** One route-domain component contract with an exact real domain name. */
export const RendererDomainCapabilitySchema = Schema.Struct({
  name: RendererDomainSchema,
  ...RendererCapabilityFields,
}).pipe(
  Schema.filter(hasCompleteRendererSelection, {
    message: () =>
      "Expected one supported authoring selection for every domain component.",
  })
);
export type RendererDomainCapability =
  typeof RendererDomainCapabilitySchema.Type;

/** Sorts route-domain registries with cross-machine code-unit ordering. */
export function sortRendererDomains<T extends RendererDomainCapability>(
  domains: readonly T[]
) {
  return [...domains].sort((left, right) => {
    if (left.name < right.name) {
      return -1;
    }
    if (left.name > right.name) {
      return 1;
    }
    return 0;
  });
}

/** Exact canonical route-domain registry collection. */
export const RendererManifestDomainsSchema = Schema.Tuple(
  Schema.Struct({
    name: Schema.Literal(RENDERER_DOMAINS[0]),
    ...RendererCapabilityFields,
  }).pipe(
    Schema.filter(hasCompleteRendererSelection, {
      message: () =>
        "Expected one supported authoring selection for every domain component.",
    })
  ),
  Schema.Struct({
    name: Schema.Literal(RENDERER_DOMAINS[1]),
    ...RendererCapabilityFields,
  }).pipe(
    Schema.filter(hasCompleteRendererSelection, {
      message: () =>
        "Expected one supported authoring selection for every domain component.",
    })
  )
);

/** Requires every component name to belong to exactly one registry scope. */
function hasDistinctComponentScopes(manifest: {
  readonly base: RendererCapability;
  readonly domains: readonly RendererDomainCapability[];
}) {
  const owners = new Set<string>();
  for (const capability of [manifest.base, ...manifest.domains]) {
    const localNames = new Set(
      capability.supportedComponents.map(({ name }) => name)
    );
    for (const name of localNames) {
      if (owners.has(name)) {
        return false;
      }
      owners.add(name);
    }
  }
  return true;
}

/** Renderer manifest envelope intended for exact Nakafa integration. */
export const RendererManifestEnvelopeSchema = Schema.Struct({
  base: RendererCapabilitySchema,
  domains: RendererManifestDomainsSchema,
  format: Schema.Literal(RENDERER_MANIFEST_FORMAT),
  hash: Sha256HashSchema,
  rendererContractVersion: Schema.Literal(RENDERER_CONTRACT_VERSION),
}).pipe(
  Schema.filter(hasDistinctComponentScopes, {
    message: () =>
      "Expected every renderer component name to have one registry owner.",
  })
);
export type RendererManifestEnvelope =
  typeof RendererManifestEnvelopeSchema.Type;

/** Selects the one physical route registry authorized for a document. */
export function selectRendererDomainCapability(
  manifest: RendererManifestEnvelope,
  rendererDomain: RendererDomain
) {
  return rendererDomain === RENDERER_DOMAINS[0]
    ? manifest.domains[0]
    : manifest.domains[1];
}

/** SHA-256 could not be calculated for the renderer contract bytes. */
export class RendererManifestHashComputeError extends Schema.TaggedError<RendererManifestHashComputeError>()(
  "RendererManifestHashComputeError",
  { cause: Schema.Unknown }
) {}

/** The renderer envelope hash does not authenticate its canonical tuple. */
export class RendererManifestHashMismatchError extends Schema.TaggedError<RendererManifestHashMismatchError>()(
  "RendererManifestHashMismatchError",
  {
    actualHash: Sha256HashSchema,
    expectedHash: Sha256HashSchema,
  }
) {}

/** Serializes the exact domain-scoped renderer tuple covered by SHA-256. */
export function canonicalizeRendererManifestContract(input: {
  readonly base: RendererCapability;
  readonly domains: readonly RendererDomainCapability[];
}) {
  /** Copies one registry capability into exact canonical wire fields. */
  const capability = (value: RendererCapability) => ({
    authoringComponents: value.authoringComponents.map(({ name, version }) => ({
      name,
      version,
    })),
    supportedComponents: value.supportedComponents.map(({ name, version }) => ({
      name,
      version,
    })),
  });
  return JSON.stringify([
    RENDERER_MANIFEST_FORMAT,
    RENDERER_CONTRACT_VERSION,
    capability(input.base),
    sortRendererDomains(input.domains).map(({ name, ...domain }) => ({
      name,
      ...capability(domain),
    })),
  ]);
}
