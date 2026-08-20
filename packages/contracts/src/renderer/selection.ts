import { Effect } from "effect";
import { decodeContract } from "#contracts/decode";
import {
  RendererAuthoringComponentDuplicateError,
  RendererAuthoringComponentExtraError,
  RendererAuthoringComponentMissingError,
  RendererAuthoringComponentsSchema,
  RendererAuthoringComponentUnsupportedError,
  RendererAuthoringSelectionNonCanonicalError,
  type RendererCapability,
  RendererCapabilitySchema,
  type RendererComponentRequirement,
  RendererManifestAuthoringComponentsSchema,
  RendererManifestSupportedComponentsSchema,
  RendererSupportedComponentsSchema,
  sortRendererComponentRequirements,
} from "#contracts/renderer/component";
import {
  RendererDomainCapabilitySchema,
  RendererManifestDomainsSchema,
  sortRendererDomains,
} from "#contracts/renderer/contract";
import type { RendererDomain } from "#contracts/renderer/domain";

/** Unnormalized component contract accepted at the manifest boundary. */
export interface RendererCapabilityInput {
  readonly authoringComponents: readonly RendererComponentRequirement[];
  readonly supportedComponents: readonly RendererComponentRequirement[];
}

/** Unnormalized route-domain contract accepted at the manifest boundary. */
export interface RendererDomainInput extends RendererCapabilityInput {
  readonly name: RendererDomain;
}

/** Rejects duplicate component names in one authoring selection. */
const validateUniqueAuthoringNames = Effect.fn(
  "AksaraContracts.validateUniqueAuthoringNames"
)(function* (authoringComponents: readonly RendererComponentRequirement[]) {
  const selectedNames = new Set<string>();
  for (const selection of authoringComponents) {
    if (selectedNames.has(selection.name)) {
      return yield* new RendererAuthoringComponentDuplicateError({
        componentName: selection.name,
      });
    }
    selectedNames.add(selection.name);
  }
  return selectedNames;
});

/** Rejects authoring selections that are not canonically ordered. */
const validateCanonicalAuthoringOrder = Effect.fn(
  "AksaraContracts.validateCanonicalAuthoringOrder"
)(function* (authoringComponents: readonly RendererComponentRequirement[]) {
  const sorted = sortRendererComponentRequirements(authoringComponents);
  for (const [index, selection] of authoringComponents.entries()) {
    const canonical = sorted[index];
    if (
      canonical?.name !== selection.name ||
      canonical.version !== selection.version
    ) {
      return yield* new RendererAuthoringSelectionNonCanonicalError({
        componentName: selection.name,
        index,
      });
    }
  }
});

/** Rejects authoring pins that the selected registry cannot render. */
const validateSupportedAuthoringSelections = Effect.fn(
  "AksaraContracts.validateSupportedAuthoringSelections"
)(function* (
  supportedComponents: readonly RendererComponentRequirement[],
  authoringComponents: readonly RendererComponentRequirement[]
) {
  for (const selection of authoringComponents) {
    const supportedVersions = supportedComponents.filter(
      ({ name }) => name === selection.name
    );
    if (supportedVersions.length === 0) {
      return yield* new RendererAuthoringComponentExtraError({
        componentName: selection.name,
      });
    }
    if (
      !supportedVersions.some(({ version }) => version === selection.version)
    ) {
      return yield* new RendererAuthoringComponentUnsupportedError({
        componentName: selection.name,
        version: selection.version,
      });
    }
  }
});

/** Requires one authoring version for every supported component name. */
const validateCompleteAuthoringNames = Effect.fn(
  "AksaraContracts.validateCompleteAuthoringNames"
)(function* (
  supportedComponents: readonly RendererComponentRequirement[],
  selectedNames: ReadonlySet<string>
) {
  for (const supported of supportedComponents) {
    if (!selectedNames.has(supported.name)) {
      return yield* new RendererAuthoringComponentMissingError({
        componentName: supported.name,
      });
    }
  }
});

/** Normalizes one complete physical registry component contract. */
const normalizeRendererCapability = Effect.fn(
  "AksaraContracts.normalizeRendererCapability"
)(function* (input: RendererCapabilityInput, allowEmpty: boolean) {
  const supportedSchema = allowEmpty
    ? RendererSupportedComponentsSchema
    : RendererManifestSupportedComponentsSchema;
  const authoringSchema = allowEmpty
    ? RendererAuthoringComponentsSchema
    : RendererManifestAuthoringComponentsSchema;
  const supportedComponents = yield* decodeContract(
    supportedSchema,
    "RendererManifestSupportedComponents",
    sortRendererComponentRequirements(input.supportedComponents)
  );
  const selectedNames = yield* validateUniqueAuthoringNames(
    input.authoringComponents
  );
  yield* validateCanonicalAuthoringOrder(input.authoringComponents);
  yield* validateSupportedAuthoringSelections(
    supportedComponents,
    input.authoringComponents
  );
  yield* validateCompleteAuthoringNames(supportedComponents, selectedNames);
  const authoringComponents = yield* decodeContract(
    authoringSchema,
    "RendererManifestAuthoringComponents",
    input.authoringComponents
  );
  if (allowEmpty) {
    return { authoringComponents, supportedComponents };
  }
  return yield* decodeContract(RendererCapabilitySchema, "RendererCapability", {
    authoringComponents,
    supportedComponents,
  });
});

/** Normalizes the exact base plus every canonical route-domain registry. */
export const normalizeRendererSelection = Effect.fn(
  "AksaraContracts.normalizeRendererSelection"
)(function* (input: {
  readonly base: RendererCapabilityInput;
  readonly domains: readonly RendererDomainInput[];
}) {
  const base = yield* normalizeRendererCapability(input.base, false);
  const domains = yield* Effect.forEach(input.domains, (domain) =>
    normalizeRendererCapability(domain, true).pipe(
      Effect.flatMap((capability) =>
        decodeContract(
          RendererDomainCapabilitySchema,
          "RendererDomainCapability",
          { name: domain.name, ...capability }
        )
      )
    )
  );
  const canonicalDomains = yield* decodeContract(
    RendererManifestDomainsSchema,
    "RendererManifestDomains",
    sortRendererDomains(domains)
  );
  return { base, domains: canonicalDomains } satisfies {
    readonly base: RendererCapability;
    readonly domains: typeof canonicalDomains;
  };
});
