import { Effect, Schema } from "effect";
import { ContractDecodeError } from "#contracts/errors";
import {
  RendererAuthoringComponentDuplicateError,
  RendererAuthoringComponentExtraError,
  RendererAuthoringComponentMissingError,
  RendererAuthoringComponentUnsupportedError,
  RendererAuthoringSelectionNonCanonicalError,
  type RendererCapability,
  RendererCapabilitySchema,
  type RendererComponentRequirement,
  RendererManifestAuthoringComponentsSchema,
  RendererManifestSupportedComponentsSchema,
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

/** Maps one internal selection schema failure into the shared boundary error. */
function decodeSelection<A, I>(
  schema: Schema.Schema<A, I>,
  contract: string,
  input: unknown
) {
  return Schema.decodeUnknown(schema)(input, {
    onExcessProperty: "error",
  }).pipe(
    Effect.mapError(
      (cause) =>
        new ContractDecodeError({ cause, contract, message: String(cause) })
    )
  );
}

/** Rejects duplicate component names in one authoring selection. */
const validateUniqueAuthoringNames = Effect.fn(
  "AksaraContracts.validateUniqueAuthoringNames"
)((authoringComponents: readonly RendererComponentRequirement[]) => {
  const selectedNames = new Set<string>();
  for (const selection of authoringComponents) {
    if (selectedNames.has(selection.name)) {
      return Effect.fail(
        new RendererAuthoringComponentDuplicateError({
          componentName: selection.name,
        })
      );
    }
    selectedNames.add(selection.name);
  }
  return Effect.succeed(selectedNames);
});

/** Rejects authoring selections that are not canonically ordered. */
const validateCanonicalAuthoringOrder = Effect.fn(
  "AksaraContracts.validateCanonicalAuthoringOrder"
)((authoringComponents: readonly RendererComponentRequirement[]) => {
  const sorted = sortRendererComponentRequirements(authoringComponents);
  for (const [index, selection] of authoringComponents.entries()) {
    const canonical = sorted[index];
    if (
      canonical?.name !== selection.name ||
      canonical.version !== selection.version
    ) {
      return Effect.fail(
        new RendererAuthoringSelectionNonCanonicalError({
          componentName: selection.name,
          index,
        })
      );
    }
  }
  return Effect.void;
});

/** Rejects authoring pins that the selected registry cannot render. */
const validateSupportedAuthoringSelections = Effect.fn(
  "AksaraContracts.validateSupportedAuthoringSelections"
)(
  (
    supportedComponents: readonly RendererComponentRequirement[],
    authoringComponents: readonly RendererComponentRequirement[]
  ) => {
    for (const selection of authoringComponents) {
      const supportedVersions = supportedComponents.filter(
        ({ name }) => name === selection.name
      );
      if (supportedVersions.length === 0) {
        return Effect.fail(
          new RendererAuthoringComponentExtraError({
            componentName: selection.name,
          })
        );
      }
      if (
        !supportedVersions.some(({ version }) => version === selection.version)
      ) {
        return Effect.fail(
          new RendererAuthoringComponentUnsupportedError({
            componentName: selection.name,
            version: selection.version,
          })
        );
      }
    }
    return Effect.void;
  }
);

/** Requires one authoring version for every supported component name. */
const validateCompleteAuthoringNames = Effect.fn(
  "AksaraContracts.validateCompleteAuthoringNames"
)(
  (
    supportedComponents: readonly RendererComponentRequirement[],
    selectedNames: ReadonlySet<string>
  ) => {
    for (const supported of supportedComponents) {
      if (!selectedNames.has(supported.name)) {
        return Effect.fail(
          new RendererAuthoringComponentMissingError({
            componentName: supported.name,
          })
        );
      }
    }
    return Effect.void;
  }
);

/** Normalizes one complete physical registry component contract. */
export const normalizeRendererCapability = Effect.fn(
  "AksaraContracts.normalizeRendererCapability"
)(function* (input: RendererCapabilityInput) {
  const supportedComponents = yield* decodeSelection(
    RendererManifestSupportedComponentsSchema,
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
  const authoringComponents = yield* decodeSelection(
    RendererManifestAuthoringComponentsSchema,
    "RendererManifestAuthoringComponents",
    input.authoringComponents
  );
  return yield* decodeSelection(
    RendererCapabilitySchema,
    "RendererCapability",
    {
      authoringComponents,
      supportedComponents,
    }
  );
});

/** Normalizes the exact base plus two real route-domain registries. */
export const normalizeRendererSelection = Effect.fn(
  "AksaraContracts.normalizeRendererSelection"
)(function* (input: {
  readonly base: RendererCapabilityInput;
  readonly domains: readonly RendererDomainInput[];
}) {
  const base = yield* normalizeRendererCapability(input.base);
  const domains = yield* Effect.forEach(input.domains, (domain) =>
    normalizeRendererCapability(domain).pipe(
      Effect.flatMap((capability) =>
        decodeSelection(
          RendererDomainCapabilitySchema,
          "RendererDomainCapability",
          { name: domain.name, ...capability }
        )
      )
    )
  );
  const canonicalDomains = yield* decodeSelection(
    RendererManifestDomainsSchema,
    "RendererManifestDomains",
    sortRendererDomains(domains)
  );
  return { base, domains: canonicalDomains } satisfies {
    readonly base: RendererCapability;
    readonly domains: typeof canonicalDomains;
  };
});
