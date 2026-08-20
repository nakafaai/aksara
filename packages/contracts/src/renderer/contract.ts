import { Effect, Schema } from "effect";
import { Sha256HashSchema } from "#contracts/ids";
import {
  hasCompleteRendererSelection,
  RendererAuthoringComponentsSchema,
  type RendererCapability,
  RendererCapabilitySchema,
  RendererSupportedComponentsSchema,
} from "#contracts/renderer/component";
import {
  RENDERER_DOMAINS,
  type RendererDomain,
  RendererDomainSchema,
} from "#contracts/renderer/domain";
import { compareCodeUnits } from "#contracts/text/order";

const RENDERER_CONTRACT_VERSION_PATTERN =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;

/** Domain-scoped renderer wire version shared with Nakafa. */
export const RENDERER_CONTRACT_VERSION = "1.0.0";

/** Stable wire format for a domain-scoped Nakafa renderer manifest. */
export const RENDERER_MANIFEST_FORMAT = "nakafa-mdx-renderer-v1";

/** Canonical semantic version carried by a renderer runtime boundary. */
export const RendererContractVersionSchema = Schema.String.pipe(
  Schema.check(Schema.isPattern(RENDERER_CONTRACT_VERSION_PATTERN))
);
export type RendererContractVersion = typeof RendererContractVersionSchema.Type;

/** One route-domain component contract with an exact real domain name. */
export const RendererDomainCapabilitySchema = Schema.Struct({
  authoringComponents: RendererAuthoringComponentsSchema,
  name: RendererDomainSchema,
  supportedComponents: RendererSupportedComponentsSchema,
}).pipe(
  Schema.check(
    Schema.makeFilter(hasCompleteRendererSelection, {
      message:
        "Expected one supported authoring selection for every domain component.",
    })
  )
);
export type RendererDomainCapability =
  typeof RendererDomainCapabilitySchema.Type;

/** Checks published route domains are unique and ordered by code unit. */
function hasCanonicalPublishedDomains(domains: readonly RendererDomain[]) {
  const canonical = [...domains].sort(compareCodeUnits);

  return domains.every(
    (domain, index) =>
      domain === canonical[index] && domain !== domains[index - 1]
  );
}

/** Canonical route domains that the deployed Nakafa app can publish. */
export const RendererPublishedDomainsSchema = Schema.Array(
  RendererDomainSchema
).pipe(
  Schema.check(Schema.isMinLength(1)),
  Schema.check(
    Schema.makeFilter(hasCanonicalPublishedDomains, {
      message: "Expected unique published renderer domains in canonical order.",
    })
  )
);
export type RendererPublishedDomains =
  typeof RendererPublishedDomainsSchema.Type;

/** Sorts route-domain registries with cross-machine code-unit ordering. */
export function sortRendererDomains<T extends RendererDomainCapability>(
  domains: readonly T[]
) {
  return [...domains].sort((left, right) =>
    compareCodeUnits(left.name, right.name)
  );
}

/** Checks persisted route domains are unique and canonically ordered. */
function hasCanonicalRendererDomains(
  domains: readonly RendererDomainCapability[]
) {
  const canonical = sortRendererDomains(domains);
  return domains.every(
    (domain, index) =>
      domain.name === canonical[index]?.name &&
      domain.name !== domains[index - 1]?.name
  );
}

/** Canonical persisted domains, including older known domain subsets. */
export const RendererManifestDomainsSchema = Schema.Array(
  RendererDomainCapabilitySchema
).pipe(
  Schema.check(Schema.isMinLength(1)),
  Schema.check(
    Schema.makeFilter(hasCanonicalRendererDomains, {
      message: "Expected unique renderer domains in canonical order.",
    })
  )
);

/** Complete current domain set required from a newly created live manifest. */
export const LiveRendererManifestDomainsSchema =
  RendererManifestDomainsSchema.pipe(
    Schema.check(
      Schema.makeFilter(
        (domains) =>
          domains.length === RENDERER_DOMAINS.length &&
          domains.every(({ name }, index) => name === RENDERER_DOMAINS[index]),
        {
          message: "Expected every live renderer domain in canonical order.",
        }
      )
    )
  );

/** Keeps base component names out of every route-owned registry. */
function hasDistinctBaseComponents(manifest: {
  readonly base: RendererCapability;
  readonly domains: readonly RendererDomainCapability[];
}) {
  const baseNames = new Set(
    manifest.base.supportedComponents.map(({ name }) => name)
  );
  for (const domain of manifest.domains) {
    for (const { name } of domain.supportedComponents) {
      if (baseNames.has(name)) {
        return false;
      }
    }
  }
  return true;
}

/** Keeps published domains bound to capabilities in the same envelope. */
function hasPublishedDomainCapabilities(manifest: {
  readonly domains: readonly RendererDomainCapability[];
  readonly publishedDomains: readonly RendererDomain[];
}) {
  const capabilities = new Set(manifest.domains.map(({ name }) => name));
  return manifest.publishedDomains.every((domain) => capabilities.has(domain));
}

/** Hash-authenticated renderer envelope persisted with one signed release. */
export const RendererManifestEnvelopeSchema = Schema.Struct({
  base: RendererCapabilitySchema,
  domains: RendererManifestDomainsSchema,
  format: Schema.Literal(RENDERER_MANIFEST_FORMAT),
  hash: Sha256HashSchema,
  publishedDomains: RendererPublishedDomainsSchema,
  rendererContractVersion: Schema.Literal(RENDERER_CONTRACT_VERSION),
}).pipe(
  Schema.check(
    Schema.makeFilter(hasPublishedDomainCapabilities, {
      message: "Expected every published renderer domain to have a capability.",
    })
  ),
  Schema.check(
    Schema.makeFilter(hasDistinctBaseComponents, {
      message: "Expected base and route-domain component names to be disjoint.",
    })
  )
);
export type RendererManifestEnvelope =
  typeof RendererManifestEnvelopeSchema.Type;

/** A persisted renderer envelope does not carry the requested domain. */
export class RendererDomainCapabilityMissingError extends Schema.TaggedError<RendererDomainCapabilityMissingError>()(
  "RendererDomainCapabilityMissingError",
  { rendererDomain: RendererDomainSchema }
) {}

/** Selects the one physical route registry authorized for a document. */
export const selectRendererDomainCapability = Effect.fn(
  "AksaraContracts.selectRendererDomainCapability"
)(function* (
  manifest: RendererManifestEnvelope,
  rendererDomain: RendererDomain
) {
  const capability = manifest.domains.find(
    ({ name }) => name === rendererDomain
  );
  if (!capability) {
    return yield* new RendererDomainCapabilityMissingError({ rendererDomain });
  }
  return capability;
});

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
  readonly publishedDomains: RendererPublishedDomains;
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
    input.publishedDomains,
  ]);
}
