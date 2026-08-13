import { Effect, Schema } from "effect";

import { hashText } from "#contracts/hash/text";
import type { HistoricalCompiledContentPayload } from "#contracts/history/artifact-spec";
import {
  compareHistoricalCodeUnits,
  HISTORICAL_RENDERER_DOMAINS,
  HistoricalPrimitive,
  HistoricalSha256HashSchema,
} from "#contracts/history/primitives";

const HISTORICAL_RENDERER_FORMAT = "nakafa-mdx-renderer-v1";
const HISTORICAL_RENDERER_VERSION = "1.0.0";
const HistoricalRendererComponentNameSchema = Schema.String.pipe(
  Schema.pattern(/^[A-Za-z][A-Za-z0-9]*$/u)
);
const HistoricalRendererRequirementSchema = Schema.Struct({
  name: HistoricalRendererComponentNameSchema,
  version: Schema.Number.pipe(Schema.int(), Schema.positive()),
});
type HistoricalRendererRequirement =
  typeof HistoricalRendererRequirementSchema.Type;

/** Orders retained component requirements by exact old wire semantics. */
function compareRequirements(
  left: HistoricalRendererRequirement,
  right: HistoricalRendererRequirement
) {
  return (
    compareHistoricalCodeUnits(left.name, right.name) ||
    left.version - right.version
  );
}

/** Checks retained component requirements are unique and canonical. */
function hasCanonicalRequirements(
  requirements: readonly HistoricalRendererRequirement[]
) {
  for (let index = 1; index < requirements.length; index += 1) {
    const previous = requirements[index - 1];
    const current = requirements[index];
    if (!(previous && current) || compareRequirements(previous, current) >= 0) {
      return false;
    }
  }
  return true;
}

const HistoricalRendererRequirementsSchema = Schema.Array(
  HistoricalRendererRequirementSchema
).pipe(Schema.filter(hasCanonicalRequirements));
const HistoricalRendererAuthoringSchema =
  HistoricalRendererRequirementsSchema.pipe(
    Schema.filter((requirements) =>
      requirements.every(
        ({ name }, index) => name !== requirements[index - 1]?.name
      )
    )
  );
const HistoricalRendererCapabilityStructSchema = Schema.Struct({
  authoringComponents: HistoricalRendererAuthoringSchema,
  supportedComponents: HistoricalRendererRequirementsSchema,
});
type HistoricalRendererCapability =
  typeof HistoricalRendererCapabilityStructSchema.Type;

/** Checks retained authoring selections cover each supported component. */
function hasCompleteSelection(capability: HistoricalRendererCapability) {
  const authoringNames = new Set(
    capability.authoringComponents.map(({ name }) => name)
  );
  const supportedNames = new Set(
    capability.supportedComponents.map(({ name }) => name)
  );
  return (
    authoringNames.size === supportedNames.size &&
    capability.authoringComponents.every((selection) =>
      capability.supportedComponents.some(
        (supported) =>
          supported.name === selection.name &&
          supported.version === selection.version
      )
    )
  );
}

const HistoricalRendererBaseSchema = Schema.Struct({
  authoringComponents: HistoricalRendererAuthoringSchema.pipe(
    Schema.minItems(1)
  ),
  supportedComponents: HistoricalRendererRequirementsSchema.pipe(
    Schema.minItems(1)
  ),
}).pipe(Schema.filter(hasCompleteSelection));
const HistoricalRendererDomainSchema = Schema.Struct({
  ...HistoricalRendererCapabilityStructSchema.fields,
  name: HistoricalPrimitive.RendererDomainSchema,
}).pipe(Schema.filter(hasCompleteSelection));
type HistoricalRendererDomain = typeof HistoricalRendererDomainSchema.Type;

/** Checks retained renderer domains use the exact frozen inventory. */
function hasCompleteDomains(domains: readonly HistoricalRendererDomain[]) {
  return (
    domains.length === HISTORICAL_RENDERER_DOMAINS.length &&
    domains.every(
      ({ name }, index) => name === HISTORICAL_RENDERER_DOMAINS[index]
    )
  );
}

const HistoricalRendererDomainsSchema = Schema.Array(
  HistoricalRendererDomainSchema
).pipe(Schema.filter(hasCompleteDomains));
const HistoricalPublishedDomainsSchema = Schema.Array(
  HistoricalPrimitive.RendererDomainSchema
).pipe(
  Schema.minItems(1),
  Schema.filter((domains) => {
    const canonical = [...domains].sort(compareHistoricalCodeUnits);
    return domains.every(
      (domain, index) =>
        domain === canonical[index] && domain !== domains[index - 1]
    );
  })
);

/** Keeps retained base components separate from route-owned components. */
function hasDistinctBaseComponents(manifest: {
  readonly base: HistoricalRendererCapability;
  readonly domains: readonly HistoricalRendererDomain[];
}) {
  const baseNames = new Set(
    manifest.base.supportedComponents.map(({ name }) => name)
  );
  return manifest.domains.every((domain) =>
    domain.supportedComponents.every(({ name }) => !baseNames.has(name))
  );
}

/** Exact frozen renderer envelope authenticated by retained releases. */
export const HistoricalRendererManifestSchema = Schema.Struct({
  base: HistoricalRendererBaseSchema,
  domains: HistoricalRendererDomainsSchema,
  format: Schema.Literal(HISTORICAL_RENDERER_FORMAT),
  hash: HistoricalSha256HashSchema,
  publishedDomains: HistoricalPublishedDomainsSchema,
  rendererContractVersion: Schema.Literal(HISTORICAL_RENDERER_VERSION),
}).pipe(Schema.filter(hasDistinctBaseComponents));
export type HistoricalRendererManifest =
  typeof HistoricalRendererManifestSchema.Type;

/** Unknown retained renderer bytes do not satisfy the frozen contract. */
export class StoredRendererDecodeError extends Schema.TaggedError<StoredRendererDecodeError>()(
  "StoredRendererDecodeError",
  {}
) {}

/** SHA-256 could not be calculated for retained renderer bytes. */
export class StoredRendererHashComputeError extends Schema.TaggedError<StoredRendererHashComputeError>()(
  "StoredRendererHashComputeError",
  { cause: Schema.Unknown }
) {}

/** A retained renderer hash does not authenticate its frozen contract. */
export class StoredRendererHashMismatchError extends Schema.TaggedError<StoredRendererHashMismatchError>()(
  "StoredRendererHashMismatchError",
  {
    actualHash: HistoricalSha256HashSchema,
    expectedHash: HistoricalSha256HashSchema,
  }
) {}

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
    componentName: HistoricalRendererComponentNameSchema,
    contentKey: HistoricalPrimitive.ContentKeySchema,
  }
) {}

/** A renderer lacks the exact component version required by old bytes. */
export class StoredRendererVersionUnsupportedError extends Schema.TaggedError<StoredRendererVersionUnsupportedError>()(
  "StoredRendererVersionUnsupportedError",
  {
    componentName: HistoricalRendererComponentNameSchema,
    contentKey: HistoricalPrimitive.ContentKeySchema,
    requiredVersion: Schema.Number.pipe(Schema.int(), Schema.positive()),
  }
) {}

/** Copies one retained renderer capability into exact canonical fields. */
function canonicalCapability(value: HistoricalRendererCapability) {
  return {
    authoringComponents: value.authoringComponents.map(({ name, version }) => ({
      name,
      version,
    })),
    supportedComponents: value.supportedComponents.map(({ name, version }) => ({
      name,
      version,
    })),
  };
}

/** Serializes the exact frozen renderer tuple covered by its stored hash. */
export function canonicalizeHistoricalRendererManifest(
  manifest: HistoricalRendererManifest
) {
  return JSON.stringify([
    HISTORICAL_RENDERER_FORMAT,
    HISTORICAL_RENDERER_VERSION,
    canonicalCapability(manifest.base),
    manifest.domains.map(({ name, ...domain }) => ({
      name,
      ...canonicalCapability(domain),
    })),
    manifest.publishedDomains,
  ]);
}

/** Strictly decodes and authenticates one retained renderer manifest. */
export const validateHistoricalRendererManifestHash = Effect.fn(
  "AksaraContracts.validateHistoricalRendererManifestHash"
)((input: unknown) =>
  Schema.decodeUnknown(HistoricalRendererManifestSchema)(input, {
    onExcessProperty: "error",
  }).pipe(
    Effect.mapError(() => new StoredRendererDecodeError()),
    Effect.flatMap((manifest) =>
      hashText(canonicalizeHistoricalRendererManifest(manifest)).pipe(
        Effect.mapError(
          ({ cause }) => new StoredRendererHashComputeError({ cause })
        ),
        Effect.filterOrFail(
          (actualHash) => actualHash === manifest.hash,
          (actualHash) =>
            new StoredRendererHashMismatchError({
              actualHash,
              expectedHash: manifest.hash,
            })
        ),
        Effect.as(manifest)
      )
    )
  )
);

interface RendererCompatibilityManifest {
  readonly base: HistoricalRendererCapability;
  readonly domains: readonly HistoricalRendererDomain[];
  readonly publishedDomains: readonly string[];
}

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
