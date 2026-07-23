import { Schema } from "effect";
import { Sha256HashSchema } from "#contracts/ids";
import {
  hasCompleteRendererSelection,
  RendererAuthoringComponentsSchema,
  type RendererCapability,
  RendererCapabilitySchema,
  type RendererComponentRequirement,
  RendererSupportedComponentsSchema,
} from "#contracts/renderer/component";
import {
  RENDERER_DOMAINS,
  type RendererDomain,
  RendererDomainSchema,
} from "#contracts/renderer/domain";

const RENDERER_CONTRACT_VERSION_PATTERN =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;

/** Domain-scoped renderer wire version shared with Nakafa. */
export const RENDERER_CONTRACT_VERSION = "1.0.0";

/** Stable wire format for a domain-scoped Nakafa renderer manifest. */
export const RENDERER_MANIFEST_FORMAT = "nakafa-mdx-renderer-v1";

/** Canonical semantic version carried by a renderer runtime boundary. */
export const RendererContractVersionSchema = Schema.String.pipe(
  Schema.pattern(RENDERER_CONTRACT_VERSION_PATTERN)
);
export type RendererContractVersion = typeof RendererContractVersionSchema.Type;

/** One route-domain component contract with an exact real domain name. */
export const RendererDomainCapabilitySchema = Schema.Struct({
  authoringComponents: RendererAuthoringComponentsSchema,
  name: RendererDomainSchema,
  supportedComponents: RendererSupportedComponentsSchema,
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

/** Builds every canonical domain from explicit same-version component sets. */
export function rendererDomains(
  components: Readonly<
    Partial<Record<RendererDomain, readonly RendererComponentRequirement[]>>
  >
) {
  return RENDERER_DOMAINS.map((name) => {
    const selected = components[name] ?? [];
    return {
      authoringComponents: selected,
      name,
      supportedComponents: selected,
    };
  });
}

/** Exact canonical route-domain registry collection. */
export const RendererManifestDomainsSchema = Schema.Array(
  RendererDomainCapabilitySchema
).pipe(
  Schema.filter(
    (domains) =>
      domains.length === RENDERER_DOMAINS.length &&
      domains.every(({ name }, index) => name === RENDERER_DOMAINS[index]),
    { message: () => "Expected every renderer domain in canonical order." }
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

/** Renderer manifest envelope intended for exact Nakafa integration. */
export const RendererManifestEnvelopeSchema = Schema.Struct({
  base: RendererCapabilitySchema,
  domains: RendererManifestDomainsSchema,
  format: Schema.Literal(RENDERER_MANIFEST_FORMAT),
  hash: Sha256HashSchema,
  rendererContractVersion: Schema.Literal(RENDERER_CONTRACT_VERSION),
}).pipe(
  Schema.filter(hasDistinctBaseComponents, {
    message: () =>
      "Expected base and route-domain component names to be disjoint.",
  })
);
export type RendererManifestEnvelope =
  typeof RendererManifestEnvelopeSchema.Type;

/** Selects the one physical route registry authorized for a document. */
export function selectRendererDomainCapability(
  manifest: RendererManifestEnvelope,
  rendererDomain: RendererDomain
) {
  return Schema.decodeUnknownSync(RendererDomainCapabilitySchema)(
    manifest.domains.find(({ name }) => name === rendererDomain)
  );
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
