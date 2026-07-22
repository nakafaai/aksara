import { Schema } from "effect";

const COMPONENT_NAME_PATTERN = /^[A-Za-z][A-Za-z0-9]*$/;

/** Renderer names are simple identifiers, never dotted member paths. */
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

/** Orders renderer requirements canonically by name and then version. */
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

/** Checks that requirement pairs are unique and canonically ordered. */
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

/** Checks that each component name selects at most one version. */
function hasOneVersionPerComponent(
  requirements: readonly RendererComponentRequirement[]
) {
  for (let index = 1; index < requirements.length; index += 1) {
    if (requirements[index - 1]?.name === requirements[index]?.name) {
      return false;
    }
  }
  return true;
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

/** Shared schema fields for one physical renderer registry capability. */
export const RendererCapabilityFields = {
  authoringComponents: RendererManifestAuthoringComponentsSchema,
  supportedComponents: RendererManifestSupportedComponentsSchema,
};

const RendererCapabilityStructSchema = Schema.Struct(RendererCapabilityFields);
type RendererCapabilityStruct = typeof RendererCapabilityStructSchema.Type;

/** Checks that authoring pins select every supported component exactly once. */
export function hasCompleteRendererSelection(
  components: RendererCapabilityStruct
) {
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

/** One complete component contract owned by one physical registry scope. */
export const RendererCapabilitySchema = RendererCapabilityStructSchema.pipe(
  Schema.filter(hasCompleteRendererSelection, {
    message: () =>
      "Expected one supported authoring selection for every component name.",
  })
);
export type RendererCapability = typeof RendererCapabilitySchema.Type;

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

/** Serializes one selected compiler component set in canonical order. */
export function canonicalizeRendererAuthoringSelection(
  authoringComponents: readonly RendererComponentRequirement[]
) {
  return JSON.stringify(
    authoringComponents.map(({ name, version }) => ({ name, version }))
  );
}
