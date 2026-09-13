import { Schema } from "effect";
import { compareCodeUnits } from "#contracts/text/order";

const COMPONENT_NAME_PATTERN = /^[A-Za-z][A-Za-z0-9]*$/;

/** Renderer names identify one current implementation, never member paths. */
export const RendererComponentNameSchema = Schema.String.check(
  Schema.isPattern(COMPONENT_NAME_PATTERN)
);
export type RendererComponentName = typeof RendererComponentNameSchema.Type;

/** Checks that each current name occurs once in canonical code-unit order. */
function hasCanonicalNames(names: readonly string[]) {
  let previous: string | undefined;
  for (const name of names) {
    if (previous !== undefined && compareCodeUnits(previous, name) >= 0) {
      return false;
    }
    previous = name;
  }
  return true;
}

/** Canonical current renderer names; an empty document or domain is valid. */
export const RendererComponentsSchema = Schema.Array(
  RendererComponentNameSchema
).check(
  Schema.makeFilter(hasCanonicalNames, {
    message: "Expected unique renderer names in canonical code-unit order.",
  })
);
export type RendererComponents = typeof RendererComponentsSchema.Type;

/** Sorts current names without discarding duplicate input. */
export function sortRendererComponents(names: readonly string[]) {
  return [...names].sort(compareCodeUnits);
}
