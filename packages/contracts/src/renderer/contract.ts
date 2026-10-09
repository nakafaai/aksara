import { Array as Arr, Effect, HashSet, Option, Order, Schema } from "effect";
import { Sha256HashSchema } from "#contracts/ids";
import {
  type RendererComponents,
  RendererComponentsSchema,
} from "#contracts/renderer/component";
import {
  RENDERER_DOMAINS,
  type RendererDomain,
  RendererDomainSchema,
} from "#contracts/renderer/domain";
import { encodeJsonText } from "#contracts/text/json";

/** Stable format for the one current domain-scoped renderer manifest. */
export const RENDERER_MANIFEST_FORMAT = "nakafa-mdx-renderer";

/** One route-domain component contract with an exact real domain name. */
export const RendererDomainCapabilitySchema = Schema.Struct({
  components: RendererComponentsSchema,
  name: RendererDomainSchema,
});
export type RendererDomainCapability =
  typeof RendererDomainCapabilitySchema.Type;

/** Checks published route domains are unique and ordered by code unit. */
function hasCanonicalPublishedDomains(domains: readonly RendererDomain[]) {
  const canonical = Arr.sort(domains, Order.String);

  return Arr.every(
    domains,
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
  return Arr.sortWith(domains, (domain) => domain.name, Order.String);
}

/** Complete current domain set shared by published and deployed manifests. */
export const RendererManifestDomainsSchema = Schema.Array(
  RendererDomainCapabilitySchema
).check(
  Schema.makeFilter(
    (domains) =>
      domains.length === RENDERER_DOMAINS.length &&
      Arr.every(domains, ({ name }, index) => name === RENDERER_DOMAINS[index]),
    {
      message:
        "Expected every renderer domain exactly once in canonical order.",
    }
  )
);

/** Keeps base component names out of every route-owned registry. */
function hasDistinctBaseComponents(manifest: {
  readonly base: RendererComponents;
  readonly domains: readonly RendererDomainCapability[];
}) {
  const baseNames = HashSet.fromIterable(manifest.base);
  for (const domain of manifest.domains) {
    for (const name of domain.components) {
      if (HashSet.has(baseNames, name)) {
        return false;
      }
    }
  }
  return true;
}

/** Hash-authenticated renderer envelope persisted with one signed release. */
export const RendererManifestEnvelopeSchema = Schema.Struct({
  base: RendererComponentsSchema.check(Schema.isMinLength(1)),
  domains: RendererManifestDomainsSchema,
  format: Schema.Literal(RENDERER_MANIFEST_FORMAT),
  hash: Sha256HashSchema,
  publishedDomains: RendererPublishedDomainsSchema,
}).pipe(
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
  const capability = Arr.findFirst(
    manifest.domains,
    ({ name }) => name === rendererDomain
  );
  if (Option.isNone(capability)) {
    return yield* new RendererDomainCapabilityMissingError({ rendererDomain });
  }
  return capability.value;
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
  readonly base: RendererComponents;
  readonly domains: readonly RendererDomainCapability[];
  readonly publishedDomains: RendererPublishedDomains;
}) {
  return encodeJsonText([
    RENDERER_MANIFEST_FORMAT,
    input.base,
    Arr.map(sortRendererDomains(input.domains), ({ name, components }) => ({
      components,
      name,
    })),
    input.publishedDomains,
  ]);
}
