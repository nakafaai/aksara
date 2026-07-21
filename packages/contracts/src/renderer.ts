import { Schema } from "effect";
import { Sha256HashSchema } from "./ids.js";

const COMPONENT_NAME_PATTERN = /^[A-Za-z][A-Za-z0-9]*$/;
const RENDERER_CONTRACT_VERSION_PATTERN =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;

/** Current global renderer contract implemented by Nakafa. */
export const RENDERER_CONTRACT_VERSION = "1.0.0";

/** Canonical semantic version carried by a renderer runtime boundary. */
export const RendererContractVersionSchema = Schema.String.pipe(
  Schema.pattern(RENDERER_CONTRACT_VERSION_PATTERN)
);
export type RendererContractVersion = typeof RendererContractVersionSchema.Type;

/** V1 renderer names are simple identifiers, never dotted member paths. */
export const RendererComponentNameSchema = Schema.String.pipe(
  Schema.filter((name) => COMPONENT_NAME_PATTERN.test(name), {
    message: () =>
      "Expected a component name matching /^[A-Za-z][A-Za-z0-9]*$/.",
  })
);

/** One named renderer capability and its positive contract version. */
export const RendererComponentRequirementSchema = Schema.Struct({
  name: RendererComponentNameSchema,
  version: Schema.Number.pipe(Schema.int(), Schema.positive()),
});
export type RendererComponentRequirement =
  typeof RendererComponentRequirementSchema.Type;

function compareRequirements(
  left: RendererComponentRequirement,
  right: RendererComponentRequirement
) {
  if (left.name < right.name) {
    return -1;
  }
  if (left.name > right.name) {
    return 1;
  }
  return left.version - right.version;
}

function hasCanonicalRequirementPairs(
  requirements: readonly RendererComponentRequirement[]
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

function hasOneVersionPerComponent(
  requirements: readonly RendererComponentRequirement[]
) {
  for (let index = 1; index < requirements.length; index += 1) {
    const previous = requirements[index - 1];
    const current = requirements[index];
    if (previous?.name === current?.name) {
      return false;
    }
  }
  return true;
}

function hasCompleteAuthoringSelection(components: {
  readonly authoringComponents: readonly RendererComponentRequirement[];
  readonly supportedComponents: readonly RendererComponentRequirement[];
}) {
  const authoringNames = new Set(
    components.authoringComponents.map(({ name }) => name)
  );
  const supportedNames = new Set(
    components.supportedComponents.map(({ name }) => name)
  );
  if (authoringNames.size !== supportedNames.size) {
    return false;
  }
  return components.authoringComponents.every((selection) =>
    components.supportedComponents.some(
      (supported) =>
        supported.name === selection.name &&
        supported.version === selection.version
    )
  );
}

/** Canonically sorts component requirements by name and then version. */
export function sortRendererComponentRequirements(
  requirements: readonly RendererComponentRequirement[]
) {
  return [...requirements].sort(compareRequirements);
}

const CanonicalRendererRequirementsSchema = Schema.Array(
  RendererComponentRequirementSchema
).pipe(
  Schema.filter(hasCanonicalRequirementPairs, {
    message: () =>
      "Expected unique renderer requirement pairs sorted by name and version.",
  })
);

/** Canonical runtime capabilities; multiple versions per name are allowed. */
export const RendererManifestSupportedComponentsSchema =
  CanonicalRendererRequirementsSchema.pipe(Schema.minItems(1));

/** Canonical compiler choices; exactly one version exists for every name. */
export const RendererManifestAuthoringComponentsSchema =
  CanonicalRendererRequirementsSchema.pipe(
    Schema.minItems(1),
    Schema.filter(hasOneVersionPerComponent, {
      message: () =>
        "Expected exactly one authoring version for each component name.",
    })
  );

/** Canonical artifact requirements; an artifact chooses one version per name. */
export const CompiledContentRequirementsSchema =
  CanonicalRendererRequirementsSchema.pipe(
    Schema.filter(hasOneVersionPerComponent, {
      message: () =>
        "Expected at most one version for each required component.",
    })
  );

const RendererManifestComponentFields = {
  authoringComponents: RendererManifestAuthoringComponentsSchema,
  supportedComponents: RendererManifestSupportedComponentsSchema,
};

/** Renderer manifest envelope shared verbatim with Nakafa. */
export const RendererManifestEnvelopeSchema = Schema.Struct({
  format: Schema.Literal("nakafa-mdx-renderer-v1"),
  hash: Sha256HashSchema,
  rendererContractVersion: Schema.Literal(RENDERER_CONTRACT_VERSION),
  ...RendererManifestComponentFields,
}).pipe(
  Schema.filter(hasCompleteAuthoringSelection, {
    message: () =>
      "Expected one supported authoring selection for every component name.",
  })
);
export type RendererManifestEnvelope =
  typeof RendererManifestEnvelopeSchema.Type;

/** More than one authoring version was selected for one component name. */
export class RendererAuthoringComponentDuplicateError extends Schema.TaggedError<RendererAuthoringComponentDuplicateError>()(
  "RendererAuthoringComponentDuplicateError",
  { componentName: RendererComponentNameSchema }
) {}

/** A runtime-supported component has no pinned authoring version. */
export class RendererAuthoringComponentMissingError extends Schema.TaggedError<RendererAuthoringComponentMissingError>()(
  "RendererAuthoringComponentMissingError",
  { componentName: RendererComponentNameSchema }
) {}

/** Authoring selected a component name absent from runtime support. */
export class RendererAuthoringComponentExtraError extends Schema.TaggedError<RendererAuthoringComponentExtraError>()(
  "RendererAuthoringComponentExtraError",
  { componentName: RendererComponentNameSchema }
) {}

/** Authoring selected a version absent from runtime support. */
export class RendererAuthoringComponentUnsupportedError extends Schema.TaggedError<RendererAuthoringComponentUnsupportedError>()(
  "RendererAuthoringComponentUnsupportedError",
  {
    componentName: RendererComponentNameSchema,
    version: Schema.Number.pipe(Schema.int(), Schema.positive()),
  }
) {}

/** Authoring selections were not sorted by canonical component order. */
export class RendererAuthoringSelectionNonCanonicalError extends Schema.TaggedError<RendererAuthoringSelectionNonCanonicalError>()(
  "RendererAuthoringSelectionNonCanonicalError",
  {
    componentName: RendererComponentNameSchema,
    index: Schema.Number.pipe(Schema.int(), Schema.nonNegative()),
  }
) {}

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

/** Serializes the pinned compiler component selection in canonical order. */
export function canonicalizeRendererAuthoringSelection(
  authoringComponents: readonly RendererComponentRequirement[]
) {
  return JSON.stringify(
    authoringComponents.map(({ name, version }) => ({ name, version }))
  );
}

/** Serializes the exact renderer tuple covered by its SHA-256 hash. */
export function canonicalizeRendererManifestContract(
  supportedComponents: readonly RendererComponentRequirement[],
  authoringComponents: readonly RendererComponentRequirement[]
) {
  return JSON.stringify({
    authoringComponents: authoringComponents.map(({ name, version }) => ({
      name,
      version,
    })),
    format: "nakafa-mdx-renderer-v1",
    rendererContractVersion: RENDERER_CONTRACT_VERSION,
    supportedComponents: supportedComponents.map(({ name, version }) => ({
      name,
      version,
    })),
  });
}
